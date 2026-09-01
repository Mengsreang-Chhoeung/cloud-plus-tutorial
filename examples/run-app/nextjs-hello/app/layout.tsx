import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "run-app-nextjs-hello",
  description: "Minimal Next.js app for Run App",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
