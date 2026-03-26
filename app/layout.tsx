// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import BlogNav from "@/components/BlogNav";
import BlogFooter from "@/components/BlogFooter";

export const metadata: Metadata = {
  title: {
    default: "How to React Hooks",
    template: "%s · How to React Hooks",
  },
  description: "Visual, example-driven guides to every React hook.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{ display: "flex", minHeight: "100vh", background: "#ffffff" }}
        >
          <BlogNav />
          <main className="main-content">
            {children}
            <BlogFooter />
          </main>
        </div>
      </body>
    </html>
  );
}
