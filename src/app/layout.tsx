import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mutant Pizza Builder",
  description: "An interactive web app that combines pizza creation with mutation testing education. Build your perfect pizza while learning software testing concepts!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased pizza-background">
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
