"use client";

import { VoiceBeam, useMicrophone } from "voice-glow";
import {
  IconChevronDown,
  IconMicrophone,
  IconMicrophoneOff,
  IconX,
} from "@tabler/icons-react";
import { useDemoLevel } from "@/lib/useDemoLevel";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Pill, RoundButton } from "./ui";

/* Design 1 — the "mobile" sheet: centered prompt + controls, voice beam
 * blooming along the rounded bottom edge. No background/padding of its own —
 * the container (GridItem) owns those. */
export default function VoiceMobileSheet() {
  const { theme } = useTheme();
  const mic = useMicrophone();
  const level = useDemoLevel(0);
  const live = mic.state === "live";

  return (
    <VoiceBeam
      type="mobile"
      theme={theme}
      colorVariant="colorful"
      stream={mic.stream}
      level={level}
      reach={2}
      glowHeight={1.4}
      className="block w-[90%] mx-auto bg-white rounded-t-none!"
      borderRadius={36}
    >
      <div className="flex h-90 flex-col p-2">
        <div className="flex flex-1 items-center justify-center">
          <p className="m-0 max-w-[240px] text-center text-[17px] font-[450] leading-snug text-fg">
            Set a timer for ten minutes and remind me to water the plants
          </p>
        </div>

        <div className="flex items-center justify-between pb-8">
          <Pill>
            <span>Agent (auto)</span>
            <IconChevronDown size={14} stroke={2} />
          </Pill>
          <div className="flex gap-2">
            <RoundButton
              label={live ? "Stop" : "Listen"}
              onClick={live ? mic.stop : mic.start}
            >
              {live ? (
                <IconMicrophoneOff size={18} stroke={1.8} />
              ) : (
                <IconMicrophone size={18} stroke={1.8} />
              )}
            </RoundButton>
            <RoundButton label="Close">
              <IconX size={18} stroke={1.8} />
            </RoundButton>
          </div>
        </div>
      </div>
    </VoiceBeam>
  );
}
