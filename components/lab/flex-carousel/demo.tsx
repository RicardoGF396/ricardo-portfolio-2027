"use client";

import FlexCarousel from "./FlexCarousel";

const ITEMS = [
  { src: "/designs/analytics.png", alt: "Analytics dashboard", title: "Analytics", subtitle: "Revenue and rhythm" },
  { src: "/designs/send-money.png", alt: "Send money flow", title: "Send money", subtitle: "Three taps to transfer" },
  { src: "/designs/digital-assets.png", alt: "Digital assets library", title: "Digital assets", subtitle: "Folders and tables" },
  { src: "/designs/messages.png", alt: "Messages inbox", title: "Messages", subtitle: "Threads at a glance" },
];

export default function FlexCarouselDemo() {
  return (
    <div className="h-[260px] w-full overflow-hidden">
      {/* autoplay, because a tile nobody has touched should still be moving;
          captureWheel off so the page keeps scrolling under the pointer. */}
      <FlexCarousel
        items={ITEMS}
        gap={8}
        cardHeight={0.55}
        captureWheel={false}
        autoplay
        interval={3}
      />
    </div>
  );
}
