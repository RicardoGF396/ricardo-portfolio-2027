"use client";

import TiltedCard from "./TiltedCard";

export default function TiltedCardDemo() {
  return (
    <TiltedCard
      imageSrc="/work/naveo/naveo-1.png"
      altText="Naveo delivery tracking landing page"
      captionText="Naveo — Product design, Next.js"
      containerWidth="100%"
      containerHeight="260px"
      imageWidth="280px"
      imageHeight="180px"
      rotateAmplitude={14}
      scaleOnHover={1.06}
      flipOnClick={false}
      gyroscope={false}
    />
  );
}
