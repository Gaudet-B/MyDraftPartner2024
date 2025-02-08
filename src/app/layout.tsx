import "~/styles/globals.css";
import { Provider } from "jotai";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "MyDraft Partner 2024",
  description: "2024 Fantasy Football draft hub",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  /** @TODO add additional metadata (SEO, etc.) */
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Provider>{children}</Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
