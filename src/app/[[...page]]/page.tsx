import { type Metadata } from "next";
import { notFound } from "next/navigation";
//import Video from "next-video";
//import BackgroundVideo from "next-video/background-video";

import { metaHandlers } from "@/lib/data";
import {
  getCmsPageDataByHref,
  normalizeCMSPageMeta,
  getPageHrefFromSlugParams,
} from "@/utils";

//import PlanningLandscape from "@v/planning_landscape.mp4";

type TParams = Promise<{ page?: string[] }>;

export const generateMetadata = async ({
  params,
}: {
  params: TParams;
}): Promise<Metadata> => {
  const { page } = await params;
  const pageHref = getPageHrefFromSlugParams(page);

  const cmsPageData = await getCmsPageDataByHref(pageHref);
  if (!cmsPageData) return { title: "404" };

  const {
    attributes: { meta },
  } = cmsPageData;

  return normalizeCMSPageMeta(meta, metaHandlers);
};

export default async function Page({ params }: { params: TParams }) {
  const { page } = await params;
  const pageHref = getPageHrefFromSlugParams(page);
  const cmsPageData = await getCmsPageDataByHref(pageHref);

  if (!cmsPageData) {
    console.log(`not found page data with href: ${pageHref}`);
    notFound();
  }

  const {
    attributes: { label },
    blocks,
  } = cmsPageData;

  console.log("blocks: ", blocks);

  return (
    <div>
      <h1>Page:{label}</h1>
      {/*      <BackgroundVideo src={mainHeroVideo}>
        <h1>Page:{label}</h1>
        <p>Here is the hero text paragraph</p>
      </BackgroundVideo>*/}
      {/*<Video src={PlanningLandscape} autoplay muted loop playsInline controls={false} />*/}
    </div>
  );
}
