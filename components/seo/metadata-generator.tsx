import { Metadata } from "next";

interface GenerateMetadataProps {
  title: string;
  description: string;
  keywords: string[];
}

export function generateMetadata({
  title,
  description,
  keywords,
}: GenerateMetadataProps): Metadata {
  const metadataBase = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return {
    metadataBase: new URL(metadataBase),
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      images: [{ url: "/flowerwine.png" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/flowerwine.png"],
    },
    icons: {
      shortcut: "/favicon.ico",
      icon: "/flowerwine.png",
    },
  };
}
