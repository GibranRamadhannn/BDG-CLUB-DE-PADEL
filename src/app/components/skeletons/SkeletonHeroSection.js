"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonHeroSection() {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center mx-5 pt-10 pb-18 gap-20 animate-pulse bg-muted/40">
      <div className="w-full flex flex-col justify-center gap-4">
        <Skeleton width={100} height={20} />
        <Skeleton height={70} count={1} />
        <Skeleton width={`80%`} height={50} count={2} />
      </div>
      <div className="w-full flex flex-col justify-center gap-4">
        <Skeleton height={300} width={`80%`} />
      </div>
    </div>
  );
}
