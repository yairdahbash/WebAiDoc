export default function sitemap() {
  const baseUrl = "https://web-ai-doc.vercel.app";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/bituach-leumi-refund`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/appeal-parking-ticket`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/insurance-complaint-letter`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/official-request-letter`,
      lastModified: new Date(),
    },
  ];
}