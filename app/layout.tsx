import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabor & Brasa | Cardápio",
  description: "Cardápio digital demonstrativo para restaurantes."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
