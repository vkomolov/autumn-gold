//import { type NextRequest } from "next/server";
import { getLocalEnv } from "@/utils";
import { defaultBaseUrl } from "@/lib/data";

//! robots.txt route handler — dynamically generates robots.txt with sitemap reference

// robots.txt route handler — dynamically generates robots.txt with sitemap reference
export async function GET() {
  const baseUrl = getLocalEnv("NEXT_PUBLIC_URL") || defaultBaseUrl;

  // Read env var to determine if indexing is allowed
  const allowIndexing = getLocalEnv("ROBOTS_ALLOW_INDEXING", value => value === "true");

  const disallowRule = allowIndexing ? "" : "/";

  const content = `
User-agent: *
Disallow: ${disallowRule}

Sitemap: ${baseUrl}/sitemap.xml
  `.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
