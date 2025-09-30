import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { metaHandlers } from "@/lib/data";
import { getCmsPageDataByHref, normalizeCMSPageMeta } from "@/utils";

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

  const cmsPageData = await getCmsPageDataByHref(pageHref);
  if (!cmsPageData) return { title: "404" };

  const {
    attributes: { meta },
  } = cmsPageData;

  return normalizeCMSPageMeta(meta, metaHandlers);
};

export default async function Page({ params }: { params: TParams }) {
  const { page } = await params;

  const pageHref = getPageHref(page);

  const cmsPageData = await getCmsPageDataByHref(pageHref);

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
