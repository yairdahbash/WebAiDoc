export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://web-ai-doc.vercel.app/sitemap.xml",
  };
}