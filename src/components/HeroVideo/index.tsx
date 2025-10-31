import React from "react";
import { mergeStyles } from "@/utils";
import BackgroundVideo from "next-video/background-video";

type HeroVideoProps = {
  style?: React.CSSProperties;
};

const auxStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
};

export default function HeroVideo({ style }: HeroVideoProps) {
  return (
    <div style={mergeStyles(auxStyle, style)}>
      <BackgroundVideo></BackgroundVideo>
    </div>
  );
}
