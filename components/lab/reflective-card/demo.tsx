"use client";

import ReflectiveCard from "./ReflectiveCard";

export default function ReflectiveCardDemo() {
  return (
    <ReflectiveCard
      theme="light"
      name="Ricardo González"
      role="Product Designer, Guanajuato"
      badge="Available"
      status="Open to work"
      idLabel="Portfolio"
      idValue="2027 0001 0042"
      width={280}
      height={360}
    />
  );
}
