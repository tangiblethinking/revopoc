function sliceBalanced(text: string, openIndex: number, open: string, close: string) {
  let depth = 0;
  let quote: string | null = null;
  for (let i = openIndex; i < text.length; i++) {
    const char = text[i];
    if (quote) {
      if (char === "\\") {
        i += 1;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === open) depth += 1;
    else if (char === close) {
      depth -= 1;
      if (depth === 0) return text.slice(openIndex, i + 1);
    }
  }
  return text.slice(openIndex);
}

function findFunction(source: string, name: string) {
  const match = new RegExp(`(?:export )?function ${name}\\b`).exec(source);
  if (!match) return null;
  let index = match.index + match[0].length;
  while (source[index] === " " || source[index] === "\n") index += 1;
  if (source[index] === "(") {
    index += sliceBalanced(source, index, "(", ")").length;
  }
  while (index < source.length && source[index] !== "{") index += 1;
  return source.slice(match.index, index) + sliceBalanced(source, index, "{", "}");
}

function findConst(source: string, name: string) {
  const match = new RegExp(`const ${name} = `).exec(source);
  if (!match) return null;
  const bracket = source.slice(match.index).search(/[\[{]/);
  if (bracket < 0) return null;
  const openAt = match.index + bracket;
  const open = source[openAt];
  const close = open === "[" ? "]" : "}";
  return source.slice(match.index, openAt) + sliceBalanced(source, openAt, open, close) + ";";
}

function previewExpression(source: string, id: string) {
  const marker = `"${id}": `;
  const start = source.indexOf(marker);
  if (start < 0) return "";
  const from = start + marker.length;
  const arrow = source.indexOf("=>", from);
  const after = source.slice(arrow + 2).trimStart();
  if (after.startsWith("(")) {
    const parenAt = source.indexOf("(", arrow);
    const wrapped = sliceBalanced(source, parenAt, "(", ")");
    return wrapped.slice(1, -1).trim();
  }
  const lineEnd = source.indexOf("\n", arrow);
  return source.slice(arrow + 2, lineEnd).replace(/,\s*$/, "").trim();
}

function localNames(code: string) {
  return [...code.matchAll(/\b([A-Z][A-Za-z0-9]*)\b/g)].map((match) => match[1]);
}

function usesData(block: string, name: string) {
  const bare = block.replace(/"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`/g, '""');
  return new RegExp(`\\b${name}\\s*[.\\[]`).test(bare) || new RegExp(`\\{${name}\\b`).test(bare);
}

const dataNames = ["team", "months", "forecast", "mix", "regions", "segments"];

export function buildComponentSource(source: string, id: string) {
  const usage = previewExpression(source, id);
  const blocks: string[] = [];
  const seen = new Set<string>();

  function addFunction(name: string) {
    if (seen.has(name)) return;
    const code = findFunction(source, name);
    if (!code) return;
    seen.add(name);
    blocks.push(code);
    for (const ref of localNames(code)) addFunction(ref);
  }

  for (const ref of localNames(usage)) addFunction(ref);

  const data = dataNames
    .filter((name) => blocks.some((block) => usesData(block, name)))
    .map((name) => findConst(source, name))
    .filter((value): value is string => Boolean(value));

  return [usage, ...data, ...blocks].filter(Boolean).join("\n\n");
}
