"use client";

import Folder from "./Folder";

const ITEMS = [
  { title: "Brand audit", description: "Naming, type and colour review" },
  { title: "Onboarding flow", description: "Seven screens, two experiments" },
  { image: "/designs/analytics.png", alt: "Analytics dashboard" },
];

export default function FolderDemo() {
  return (
    <div className="flex h-[240px] w-full items-center justify-center overflow-hidden">
      <Folder items={ITEMS} label="Case studies" size={0.75} theme="light" />
    </div>
  );
}
