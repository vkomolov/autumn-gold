import { type Metadata } from "next";
import { getCmsPageData, metaHandlers, normalizeCMSPageMeta } from "@/lib/data";
import { notFound } from "next/navigation";

type TParams = Promise<{ page?: string[] }>;

const getPageHref = (page?: string[]) => {
  return "/" + (page?.join("/") || "");
};

export const generateMetadata = async ({
  params,
}: {
  params: TParams;
}): Promise<Metadata> => {
  const { page } = await params;
  const pageHref = getPageHref(page);

  const cmsPageData = await getCmsPageData(pageHref);
  if (!cmsPageData) return { title: "404" };

  const {
    attributes: { meta },
  } = cmsPageData;

  console.log("meta before: ", meta);
  console.log("meta after: ", normalizeCMSPageMeta(meta, metaHandlers));

  return normalizeCMSPageMeta(meta, metaHandlers);
};

export default async function Page({ params }: { params: TParams }) {
  const { page } = await params;

  const pageHref = getPageHref(page);

  const cmsPageData = await getCmsPageData(pageHref);

  if (!cmsPageData) {
    console.log(`not found page data with href: ${pageHref}`);
    notFound();
  }

  const {
    attributes: { label },
  } = cmsPageData;

  return (
    <div>
      <h1>Page:{label}</h1>
    </div>
  );
}
