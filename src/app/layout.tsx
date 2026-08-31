import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zunia — Multi-chain Cosmos wallet",
  description:
    "Browser extension and mobile wallet for the Cosmos ecosystem. IBC-native. Non-custodial.",
  metadataBase: new URL("https://zuniawallet.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
