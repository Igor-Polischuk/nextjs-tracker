import "@/styles/globals.scss";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import "./app.scss";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased flex justify-center",
          fontSans.variable
        )}
      >
        <div className="app-wrapper min-h-screen max-w-5xl">
          <main className="container mx-auto max-w-7xl flex-grow">
            <Providers
              themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
              {children}
            </Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
