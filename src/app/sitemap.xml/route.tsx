import { type NextRequest } from "next/server";
import { getLocalEnv } from "@/utils";
import { cmsPageDataList, defaultBaseUrl } from "@/lib/data";
import type { IPageCms, TSitemapEntry, TSitemapVideoEntry } from "@/types";

// Helper to build <image:image> tags
function generateImageTags(images: string[] | undefined, baseUrl: string): string {
  if (!images || images.length === 0) return "";

  return images
    .map(
      img => `
    <image:image>
      <image:loc>${baseUrl}${img.trim()}</image:loc>
    </image:image>`,
    )
    .join("");
}

// Helper to build <video:video> tags
function generateVideoTags(
  videos: TSitemapVideoEntry[] | undefined,
  baseUrl: string,
): string {
  if (!videos || videos.length === 0) return "";

  return videos
    .map(video => {
      const { title, thumbnail_loc, description, ...rest } = video;

      if (!title || !thumbnail_loc) {
        console.warn(
          `[generateVideoTags]: title: "${title}", thumbnail_loc: ${thumbnail_loc} not found`,
        );
        return "";
      }

      const fullThumbnail_loc = thumbnail_loc.startsWith("http")
        ? thumbnail_loc
        : `${baseUrl}${thumbnail_loc}`;

      const extraFields = Object.entries(rest)
        .map(([key, value]) => `<video:${key}>${value}</video:${key}>`)
        .join("");

      return `
    <video:video>
      <video:title><![CDATA[${title}]]></video:title>
      <video:thumbnail_loc>${fullThumbnail_loc}</video:thumbnail_loc>
      ${description ? `<video:description><![CDATA[${description}]]></video:description>` : ""}
      ${extraFields}
    </video:video>`;
    })
    .join("");
}

async function getSiteMapData(cmsPageDataList: IPageCms[]): Promise<TSitemapEntry[]> {
  //imitating async response...
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cmsPageDataList.map(page => page.attributes.sitemapEntry));
    }, 0);
  });
}

function generateNamespaces({
  hasImages,
  hasVideos,
}: {
  hasImages: boolean;
  hasVideos: boolean;
}) {
  return [
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    hasImages && 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
    hasVideos && 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"',
  ]
    .filter(Boolean)
    .join(" ");
}

// Helper to build a single <url> block
function generateUrlEntry(entry: TSitemapEntry, baseUrl: string): string {
  const { url, lastModified, changeFrequency, priority, images, videos } = entry;

  if (!url) {
    console.warn("Missing 'url' in sitemap entry");
    return "";
  }

  const fullUrl = new URL(url.trim(), baseUrl).toString();

  const imageTags = generateImageTags(images, baseUrl);
  const videoTags = generateVideoTags(videos, baseUrl);

  const isoDate =
    typeof lastModified === "string" ? lastModified : lastModified?.toISOString();

  // In the future, implement revalidation via cache tags or timestamps

  return `
  <url>
    <loc>${fullUrl}</loc>
    ${isoDate ? `<lastmod>${isoDate}</lastmod>` : ""}
    ${changeFrequency ? `<changefreq>${changeFrequency}</changefreq>` : ""}
    ${priority ? `<priority>${priority}</priority>` : ""}
    ${imageTags}
    ${videoTags}
  </url>`.trim(); // убираем лишние пробелы;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const baseUrl = getLocalEnv("NEXT_PUBLIC_URL") || defaultBaseUrl;

  // Extract sitemapEntry from CMS data
  const entries = await getSiteMapData(cmsPageDataList);

  // Determine which namespaces are needed
  const hasImages = entries.some(entry => entry.images?.length);
  const hasVideos = entries.some(entry => entry.videos?.length);

  const namespaces = generateNamespaces({ hasImages, hasVideos });

  // Build <url> entries
  const urlEntries = entries.map(entry => generateUrlEntry(entry, baseUrl)).join("\n");

  // Assemble full sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${namespaces}>
${urlEntries}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      // "Cache-Control": "public, max-age=3600", // optional
    },
  });
}
