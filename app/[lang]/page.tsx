import type { ReactNode } from "react";
import Image from "next/image";
import VoiceMobileSheet from "@/components/voice/VoiceMobileSheet";
import VoiceChatInput from "@/components/voice/VoiceChatInput";
import TransferCard from "@/components/wave/TransferCard";
import AddCreditsCard from "@/components/wave/AddCreditsCard";
import { waveThemes, type WaveTheme } from "@/components/wave/ui";
import WeatherDaySwitcher from "@/components/weather/WeatherDaySwitcher";
import FocusTimeSlider from "@/components/focus/FocusTimeSlider";
import WalletCardStack from "@/components/wallet/WalletCardStack";
import HeartRateMonitor from "@/components/heart/HeartRateMonitor";
import LogoGlow from "@/components/glow/LogoGlow";
import EventCard from "@/components/event/EventCard";
import InviteCard from "@/components/invite/InviteCard";
import ChartCard from "@/components/chart/ChartCard";

import InView from "@/components/lab/InView";
/* Kibo UI (kibo-ui.com) */
import CreditCardDemo from "@/components/lab/credit-card/demo";
import AnnouncementDemo from "@/components/lab/announcement/demo";
import ColorPickerDemo from "@/components/lab/color-picker/demo";
import PillDemo from "@/components/lab/pill/demo";
/* MagicUI (magicui.design) */
import MarqueeDemo from "@/components/lab/marquee/demo";
import TerminalDemo from "@/components/lab/terminal/demo";
import BentoGridDemo from "@/components/lab/bento-grid/demo";
import AnimatedListDemo from "@/components/lab/animated-list/demo";
import GlobeDemo from "@/components/lab/globe/demo";
import ShineBorderDemo from "@/components/lab/shine-border/demo";
import MorphingTextDemo from "@/components/lab/morphing-text/demo";
/* React Bits (reactbits.dev) */
import TechTextDemo from "@/components/lab/tech-text/demo";
import ASCIITextDemo from "@/components/lab/ascii-text/demo";
import LogoLoopDemo from "@/components/lab/logo-loop/demo";
import StarBorderDemo from "@/components/lab/star-border/demo";
import DitherVeilDemo from "@/components/lab/dither-veil/demo";
import LaserFlowDemo from "@/components/lab/laser-flow/demo";
import StrandsDemo from "@/components/lab/strands/demo";
import FluidGlassDemo from "@/components/lab/fluid-glass/demo";
import HoloCardDemo from "@/components/lab/holo-card/demo";
import ReflectiveCardDemo from "@/components/lab/reflective-card/demo";
import TiltedCardDemo from "@/components/lab/tilted-card/demo";
import GlassSurfaceDemo from "@/components/lab/glass-surface/demo";
import FlexCarouselDemo from "@/components/lab/flex-carousel/demo";
import FolderDemo from "@/components/lab/folder/demo";
import PixelCardDemo from "@/components/lab/pixel-card/demo";
import ClickSparkDemo from "@/components/lab/click-spark/demo";
import ElasticSliderDemo from "@/components/lab/elastic-slider/demo";
import VoicePillDemo from "@/components/lab/voice-pill/demo";
import StatusMarkDemo from "@/components/lab/status-mark/demo";

const WAVE_THEME: WaveTheme = "light";

/* The home route is just the grid now — the sidebar moved to app/layout.tsx so
 * it stays mounted while the centre column swaps between routes. */
export default function Home() {
  return (
    /* Two knobs here, and the sidebar track in layout.tsx is the third.
     *
     * `zoom` is what buys three columns next to a 600px sidebar. The widest
     * cards are a fixed 320px, so at 1470px there is no honest way to fit
     * three without making them smaller — zoom does that, and unlike a
     * transform it shrinks layout, so nothing is left overlapping. Fluid
     * tiles keep their look: their column grows by 1/zoom first.
     *
     * `columns-[344px]` is a floor in ZOOMED pixels: 320 for the card plus
     * the tiles' p-3. Lower the zoom to fit more columns, raise it to make
     * everything bigger and fewer fit.
     *
     * The zoom steps with the shell, and each step is the largest that still
     * fits a 344px column in what the screen leaves:
     *   base  0.9   one column on a phone. Not 1: a 360px screen minus
     *               padding is 336px, and the 320px cards need 344.
     *   sm    0.85  two columns from 640px, the shell still stacked.
     *   lg    0.75  beside the sidebar — two columns, three from xl. */
    <div className="columns-[344px] gap-5 p-3 [zoom:0.9] sm:p-4 sm:[zoom:0.85] lg:[zoom:0.75]">
      {/* First two tiles: the Voice effects from libraries.dev.
          Each GridItem is the container — set its background and padding here. */}
      <GridItem className="bg-tile px-6 pb-4">
        <VoiceMobileSheet />
      </GridItem>

      {/* Distortion-wave cards — gradient-bordered, interactive. Their look
          (card + the container behind it) follows WAVE_THEME above. */}
      <GridItem className={`${waveThemes[WAVE_THEME].stage} p-6`}>
        <TransferCard theme={WAVE_THEME} />
      </GridItem>
      <GridItem className={`${waveThemes[WAVE_THEME].stage} p-6`}>
        <AddCreditsCard theme={WAVE_THEME} />
      </GridItem>

      {/* Weather Day Switcher (transitions.dev). Self-contained card with its
          own sky surface + shadow, so the GridItem just centers it. */}
      <GridItem className="grid place-items-center bg-tile p-3">
        <WeatherDaySwitcher />
      </GridItem>

      {/* Focus Time Slider (transitions.dev). Self-contained card with its
          own pink surface + shadow, so the GridItem just centers it. */}
      <GridItem className="grid place-items-center bg-tile p-3">
        <FocusTimeSlider />
      </GridItem>

      {/* Wallet Card Stack (transitions.dev), in light mode: its --stage-*
          tokens are mapped to the app's --color-* tokens. */}
      <GridItem className="grid place-items-center bg-tile p-3">
        <WalletCardStack />
      </GridItem>

      {/* Heart Rate Monitor (transitions.dev), in light mode: its --stage-*
          tokens are mapped to the app's --color-* tokens. */}
      <GridItem className="grid place-items-center bg-tile p-3">
        <HeartRateMonitor />
      </GridItem>

      {/* Logo Glow — tap a brand badge and a 5-colour glow bursts out and
          returns to center. Self-contained card, so the GridItem just centers it. */}
      {/* overflow-hidden because the pill is drawn to bleed off the right
          edge — no pr, rounded only on the left — so in a narrow column it
          would otherwise spill into the one beside it. */}
      <GridItem className="grid overflow-hidden bg-tile py-6 pl-6">
        <LogoGlow />
      </GridItem>

      {/* Event Card With Attendees (transitions.dev), in light mode: its
          --stage-* tokens are mapped to the app's --color-* tokens and the
          map pin is blue (--pin) instead of the original red. */}
      <GridItem className="grid place-items-center bg-tile p-3">
        <EventCard />
      </GridItem>

      {/* Invite People — avatar carousel looping through a center spotlight,
          search and an invite list (untitledui.com avatars). */}
      <GridItem className="grid place-items-center bg-tile p-3">
        <InviteCard />
      </GridItem>

      {/* Chart card (transitions.dev), in light mode: its --stage-* tokens
          are mapped to the app's --color-* tokens. */}
      <GridItem className="grid place-items-center bg-tile p-3">
        <ChartCard />
      </GridItem>

      <GridItem className="bg-tile p-6">
        <VoiceChatInput />
      </GridItem>

      {/* ═══ Registry components ═══════════════════════════════════════
          Thirty components vendored from three registries. Each folder
          under components/lab holds the component exactly as it ships
          plus a demo.tsx — the demo is what the tile shows, so content
          goes there and the container goes here, same as above.

          InView wraps the ones that animate on their own. Without it
          this page ran a dozen canvases and rAF loops at once, nearly
          all of them off screen; it mounts a demo when its tile comes
          near and drops it again once it is past, so only what you can
          see is doing work. `minHeight` is the space the tile holds
          while the demo is unmounted — if a column jumps as you scroll,
          that number is the one to fix. */}


      {/* ── Kibo UI — kibo-ui.com ── */}

      <GridItem className="grid place-items-center bg-tile p-3">
        <CreditCardDemo />
      </GridItem>

      <GridItem className="bg-tile px-5 py-8">
        <AnnouncementDemo />
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <ColorPickerDemo />
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-5">
        <PillDemo />
      </GridItem>


      {/* ── MagicUI — magicui.design ── */}

      <GridItem className="overflow-hidden bg-tile py-6">
        <MarqueeDemo />
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <InView minHeight={300}>
          <TerminalDemo />
        </InView>
      </GridItem>

      <GridItem className="bg-tile p-3">
        <InView minHeight={380}>
          <BentoGridDemo />
        </InView>
      </GridItem>

      <GridItem className="overflow-hidden bg-tile p-3">
        <InView minHeight={340}>
          <AnimatedListDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <InView minHeight={296}>
          <GlobeDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <ShineBorderDemo />
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <InView minHeight={184}>
          <MorphingTextDemo />
        </InView>
      </GridItem>


      {/* ── React Bits — reactbits.dev ── */}

      <GridItem className="grid place-items-center bg-tile p-3">
        <InView minHeight={200}>
          <TechTextDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <InView minHeight={220}>
          <ASCIITextDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <InView minHeight={111}>
          <LogoLoopDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <InView minHeight={168}>
          <StarBorderDemo />
        </InView>
      </GridItem>

      <GridItem className="overflow-hidden">
        <InView minHeight={280}>
          <DitherVeilDemo />
        </InView>
      </GridItem>

      <GridItem className="overflow-hidden">
        <InView minHeight={300}>
          <LaserFlowDemo />
        </InView>
      </GridItem>

      <GridItem className="overflow-hidden">
        <InView minHeight={280}>
          <StrandsDemo />
        </InView>
      </GridItem>

      <GridItem className="overflow-hidden">
        <InView minHeight={260}>
          <FluidGlassDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile">
        <InView minHeight={332}>
          <HoloCardDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <InView minHeight={360}>
          <ReflectiveCardDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile">
        <InView minHeight={260}>
          <TiltedCardDemo />
        </InView>
      </GridItem>

      <GridItem className="overflow-hidden">
        <GlassSurfaceDemo />
      </GridItem>

      <GridItem className="overflow-hidden bg-tile">
        <InView minHeight={260}>
          <FlexCarouselDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile">
        <InView minHeight={240}>
          <FolderDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <InView minHeight={220}>
          <PixelCardDemo />
        </InView>
      </GridItem>

      <GridItem className="grid place-items-center bg-tile p-3">
        <ClickSparkDemo />
      </GridItem>

      <GridItem className="bg-tile">
        <ElasticSliderDemo />
      </GridItem>

      {/* overflow-hidden: the pill paints its slide-to-cancel track outside
          its own box, which spilled past the tile on a phone. */}
      <GridItem className="overflow-hidden bg-tile">
        <InView minHeight={178}>
          <VoicePillDemo />
        </InView>
      </GridItem>

      <GridItem className="bg-tile">
        <InView minHeight={247}>
          <StatusMarkDemo />
        </InView>
      </GridItem>

      {/* ─── Dashboard details ──────────────────────────────────────────
          The four full-screen exports were unreadable at 269px — a 2053px
          dashboard shrunk to a column is decoration, not work. Each is cut
          into three regions at native resolution instead, so the type stays
          sharp. Every tile is `overflow-hidden` with no padding, so the crop
          runs edge to edge. The four originals are still in public/designs
          if you want a full one back. */}

      {/* analytics.png */}
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/analytics-revenue.png"
          w={725}
          h={455}
          alt="Revenue chart at $248,610 for Q4, with a Dec 3 tooltip comparing $22.6k against last quarter"
        />
      </GridItem>
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/analytics-shipped.png"
          w={760}
          h={440}
          alt="Tasks shipped panel: 1,516 over 26 weeks and a dot-grid heatmap of daily output"
        />
      </GridItem>
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/analytics-rhythm.png"
          w={760}
          h={520}
          alt="Weekday rhythm and cycle time bar charts above a weekly throughput line chart"
        />
      </GridItem>

      {/* users-panel.png */}
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/users-panel-active.png"
          w={773}
          h={418}
          alt="Active top users card: 2,184 this month with a cluster of member avatars"
        />
      </GridItem>
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/users-panel-plans.png"
          w={374}
          h={418}
          alt="Users by plan as nested bubbles: 1,412 free, 806 pro, 482 team, 147 enterprise"
        />
      </GridItem>
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/users-panel-cards.png"
          w={512}
          h={330}
          alt="Customer card for Sofia Marin at Ledgerly, on the Team plan with 142 sessions"
        />
      </GridItem>

      {/* solaris-board.png */}
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/solaris-board-nav.png"
          w={280}
          h={330}
          alt="Acme Studio sidebar with Search, Inbox, Assigned, Activity and AI Notetaker"
        />
      </GridItem>
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/solaris-board-card.png"
          w={326}
          h={235}
          alt="Design System board card dated May 22, with a 2 of 16 subtask list expanded"
        />
      </GridItem>
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/solaris-board-progress.png"
          w={256}
          h={429}
          alt="In Progress column with Keyboard, User Dashboard, Logo, Payment Flow and Checkout cards"
        />
      </GridItem>

      {/* digital-assets.png */}
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/digital-assets-nav.png"
          w={297}
          h={430}
          alt="slashpro sidebar with Digital Assets selected and a count of 214 products"
        />
      </GridItem>
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/digital-assets-folders.png"
          w={600}
          h={290}
          alt="Digital Assets header — 48,920 assets, 312 GB — above the asset-type tabs and folder cards"
        />
      </GridItem>
      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/digital-assets-table.png"
          w={560}
          h={374}
          alt="Asset table rows with thumbnails for front, back, hero video and lifestyle files"
        />
      </GridItem>

      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/escalation-reports.png"
          w={713}
          h={752}
          alt="Dark Reports / Escalation panel with an insight breakdown bar and a list of unresolved issues"
        />
      </GridItem>

      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/sleep-tracking.png"
          w={995}
          h={858}
          alt="Sleep tracking card: 5 hr 48 min total, a 63 score and a hypnogram split into deep, REM, light and awake"
        />
      </GridItem>

      {/* Cropped to the card (362x560 of 812x665 — 62% of the file was empty
          margin). Hard edges, no shadow, so the cut hugs it exactly. Unlike
          the phones this one floats rather than bleeding, so it keeps padding
          on all four sides and is sized by width. Original untouched. */}
      <GridItem className="bg-tile p-6">
        <Shot
          src="/designs/orders-trim.png"
          w={362}
          h={560}
          alt="Orders card with a dotted globe, a New York tooltip and a per-city breakdown"
        />
      </GridItem>

      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/cart.png"
          w={1638}
          h={2048}
          alt="Dark phone checkout for Cafe Nora with a delivery estimate and two cart items"
        />
      </GridItem>

      {/* `messages-phone.png` is messages.png cropped to the phone itself
          (513x636 of a 990x712 canvas). The original is still there, but it
          carried 260px of empty margin on the left and 217 on the right,
          which scale with the image — so they fought every padding set here.
          Cropped, the padding is yours: px/pt on this tile, and none at the
          bottom because the export already ends flush there.

          The shot is sized by HEIGHT (`h-full w-auto`), not width — that is
          what makes it grow when you change `h-[...]`. */}
      <GridItem className="grid h-105 items-end justify-items-center bg-tile px-6 pt-6">
        <Shot
          src="/designs/messages-phone.png"
          w={513}
          h={636}
          sizes="400px"
          className="block h-full w-auto"
          cap={false}
          alt="Dark phone messages list with a pinned conversation and a row swiped open to reveal Delete"
        />
      </GridItem>

      {/* Cropped to 352x671 of 518x753. The cut follows the wide alpha box
          rather than the phone body, because this export has a faint shadow
          — hugging the body at a>64 would have shaved it off. This phone is
          whole, not bled, so padding stays on all four sides. */}
      <GridItem className="bg-tile p-6">
        <Shot
          src="/designs/spaces-trim.png"
          w={352}
          h={671}
          alt="Phone Spaces screen with a carousel of coloured space cards above today's task list"
        />
      </GridItem>

      {/* Same crop as the other two phones. This export has a soft drop
          shadow that fades all the way to the canvas edges, so the cut keeps
          24px around the phone body (588x798 at 340,85) instead of hugging
          it — hug it and the shadow gets a hard edge. Original untouched. */}
      <GridItem className="grid h-105 items-end justify-items-center bg-tile px-6 pt-6">
        <Shot
          src="/designs/send-money-phone.png"
          w={636}
          h={798}
          sizes="400px"
          className="block h-full w-auto"
          cap={false}
          alt="Phone send-money screen with a $248.00 amount, a recipient row and a slide-to-send control"
        />
      </GridItem>

      {/* Cropped to the phone (560x782 of a 1240x879 canvas) for the same
          reason as messages: 346px of empty margin on the left and 334 on
          the right — 55% of the file's width — scaled with the image and
          fought the padding set here. Original split-bill.png is untouched. */}
      <GridItem className="grid h-105 items-end justify-items-center bg-tile px-6 pt-6">
        <Shot
          src="/designs/split-bill-phone.png"
          w={560}
          h={782}
          sizes="400px"
          className="block h-full w-auto"
          cap={false}
          alt="Phone split-bill screen for a $186.40 dinner shared equally between four people"
        />
      </GridItem>

      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/nutrition-rings.png"
          w={1600}
          h={1600}
          alt="Close-up of a calorie ring at 1,438 of 1,950 kcal with protein and carb progress cards"
        />
      </GridItem>

      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/meals-today.png"
          w={1600}
          h={1600}
          alt="Close-up of a logged lunch, an empty Add dinner slot and a floating tab bar"
        />
      </GridItem>

      <GridItem className="overflow-hidden">
        <Shot
          src="/designs/services.png"
          w={1805}
          h={1600}
          alt="Close-up of two service rows, Geico Auto tracking competitors and PG&E Electric"
        />
      </GridItem>

      {/* Cropped to the three rows (298x206 of 493x502 — 75% of the file was
          empty, the most of the set). It is a small detail shot, so it gets
          generous padding rather than filling the column. */}
      <GridItem className="bg-tile p-10">
        <Shot
          src="/designs/checkbox-trim.png"
          w={298}
          h={206}
          alt="Three checkbox states: All channels indeterminate, Email empty and Push checked"
        />
      </GridItem>

      <GridItem className="bg-[#0b0b0b] p-6">
        <Shot
          src="/designs/composer.png"
          w={3078}
          h={946}
          alt="Dark prompt composer reading Build anything, with Agent and Auto chips and a send button"
        />
      </GridItem>

      <GridItem className="bg-[#0b0b0b] p-6">
        <Shot
          src="/designs/saved-to-library.png"
          w={3074}
          h={1051}
          alt="Dark Saved to library toast with a green check and a green glow along its top edge"
        />
      </GridItem>

      <GridItem className="bg-[#0b0b0b] p-6">
        <Shot
          src="/designs/plan-pro.png"
          w={2423}
          h={1051}
          alt="Dark Pro plan card at $19 a month with a Popular badge and a Get started button"
        />
      </GridItem>

      {/* More containers go here — each can have its own bg (color, gradient
          or image) and padding, e.g.:
          <GridItem className="bg-tile p-6 h-[300px]" />
          <GridItem className="overflow-hidden p-0 h-[300px] bg-[url('/x.jpg')] bg-cover" />
      */}
    </div>
  );
}

/* Container for a grid item. Owns layout only; background, padding and
 * rounding come from `className` so every container can look different. */
function GridItem({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-5 w-full break-inside-avoid rounded-3xl ${className}`}>
      {children}
    </div>
  );
}

/* One static Figma export. Only the props that differ per image live at the
 * call site; the rest is the same every time.
 *
 * `sizes` is roughly one grid column, so the optimizer serves a file that
 * size instead of the 3000px original. `quality` is 90 rather than the
 * default 75 because these are screenshots full of small type — 75 smears
 * it. 90 only works because next.config.ts lists it under images.qualities;
 * Next 16 silently coerces any value not on that list. */
function Shot({
  src,
  alt,
  w,
  h,
  className = "mx-auto block h-auto w-full",
  sizes = "(max-width: 480px) 100vw, 400px",
  cap = true,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  /* Override when a shot is NOT one column wide — a height-driven one can
   * render far wider than that, and too small a `sizes` is served a file
   * too small to be sharp. */
  sizes?: string;
  /* Height-driven shots opt out of the width cap below: with `h-full w-auto`
   * a max-width does not shrink the image, it squashes it. */
  cap?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      quality={90}
      sizes={sizes}
      className={className}
      /* Never draw a shot larger than its own pixels. Several crops come from
       * exports that were already small — the Solaris board column is 256px
       * at source — and a 407px column was stretching them past 2x, which is
       * what turned their type to mush.
       *
       * Two thirds, not the full width, because of the grid: lengths here are
       * in the [zoom:0.75] space, so `w` CSS px lands on 0.75w of the screen,
       * and a 2x display then wants 1.5w real pixels — still more than the
       * file has. 2/3 of w lands on exactly w device pixels at lg, and
       * oversamples slightly at the larger zooms below it.
       *
       * So these tiles now hold a smaller image with space around it. That is
       * the ceiling of the file, not a setting: the only way to fill the tile
       * sharply is a bigger export from Figma. The large shots are nowhere
       * near the cap and do not move. */
      style={cap ? { maxWidth: Math.round((w * 2) / 3) } : undefined}
    />
  );
}
