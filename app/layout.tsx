import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "נוסח",
  description: "יצירת מכתבים, ערעורים ובקשות רשמיות",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}