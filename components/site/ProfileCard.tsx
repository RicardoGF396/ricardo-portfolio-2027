import Image from "next/image";
import { PROFILE } from "@/lib/cv";

export default function ProfileCard() {
  const COVER: string | null = null;
  const AVATAR = "/images/its me.jpeg";

  return (
    <section className="overflow-hidden rounded-2xl bg-card">
      {/* Banner. `relative` so the <Image fill> has something to fill, and so
       * the avatar below can be pulled up over its bottom edge. */}
      <div className="relative h-36 w-full bg-[linear-gradient(135deg,#0071E3_0%,#026edb_45%,#8EC5FF_100%)]">
        {COVER && (
          <Image
            src={COVER}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        )}
      </div>

      <div className="px-6 pb-6">
        {/* -mt-14 lifts the avatar half-way onto the banner; the ring is the
         * page background, which is what reads as the usual cut-out. */}
        <div className="relative -mt-14 size-28 overflow-hidden rounded-full ring-4 ring-bg">
          <Image
            src={AVATAR}
            alt={PROFILE.name}
            fill
            priority
            className="object-cover"
            sizes="112px"
          />
        </div>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tighter text-black">
          {PROFILE.name}
        </h1>
        <p className="mt-0.5 text-lg text-[#42413F]">{PROFILE.title}</p>
      </div>
    </section>
  );
}
