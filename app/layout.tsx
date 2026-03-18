// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import BlogNav from "@/components/BlogNav";

export const metadata: Metadata = {
  title: {
    default: "How to React Hooks",
    template: "%s · How to React Hooks",
  },
  description:
    "Visual, example-driven guides to every React hook.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh", background: "#ffffff" }}>

          {/* Fixed sidebar */}
          <BlogNav />

          {/* Main content — offset by sidebar width on desktop */}
          <main style={{
            flex: 1,
            marginLeft: "220px",
            minHeight: "100vh",
            overflowX: "hidden",
          }}>
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
