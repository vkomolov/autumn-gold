"use client";

import s from "./sloganCarousel.module.scss";
import React from "react";

import type { TSloganCarouselProps } from "@/types";

export default function SloganCarousel({ slogans }: TSloganCarouselProps) {
  console.log("slogans", slogans);
  //const elems = slogans[0] || [];
  //const sloganElems = elems.map((elem, i) => {});

  //return <div className={s.sloganWrapper}>{sloganElems}</div>;
  return <div className={s.sloganWrapper}>Slogan</div>;
}
