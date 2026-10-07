import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { ThemeRegistry } from "@/theme/ThemeRegistry";
import appCss from "../styles.css?url";

const APP_NAME = "Pulse Kit";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: "Tokens, primitives, and reconstructed patterns from Plexus Pulse." },
      { name: "theme-color", content: "#090a0b" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <HeadContent />
        <InitColorSchemeScript attribute="class" defaultMode="light" />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <ThemeRegistry>
            <Outlet />
          </ThemeRegistry>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
