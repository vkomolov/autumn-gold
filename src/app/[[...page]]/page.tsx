import { type Metadata } from "next";
import { notFound } from "next/navigation";
//import Video from "next-video";
import BackgroundVideo from "next-video/background-video";

import { metaHandlers } from "@/lib/data";
import { getCmsPageDataByHref, normalizeCMSPageMeta } from "@/utils";

//import PlanningLandscape from "@v/planning_landscape.mp4";
/**
 *! to generate a poster image and blur up image at the specified time in the video
 *! (limited to usage with the mux provider)
 */
// @ts-expect-error query for mux
import mainHeroVideo from "@v/planning_landscape.mp4?thumbnailTime=0";

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

  /**
   * Video from "next-video" can be used:
   * @example <Video src={PlanningLandscape} autoplay muted loop playsInline controls={false} />
   */

  return (
    <div>
      <BackgroundVideo src={mainHeroVideo}>
        <h1>Page:{label}</h1>
        <p>Here is the hero text paragraph</p>
      </BackgroundVideo>
    </div>
  );
}
