"use client";

import { VoiceBeam, useMicrophone } from "voice-glow";
import {
  IconChevronDown,
  IconMicrophone,
  IconMicrophoneOff,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useDemoLevel } from "@/lib/useDemoLevel";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Pill, RoundButton } from "./ui";

/* Design 2 — the chat input bar: "Listening…" placeholder + controls, voice
 * beam blooming along the rounded bottom edge. No background/padding of its
 * own — the container (GridItem) owns those. */
export default function VoiceChatInput() {
  const { theme } = useTheme();
  const mic = useMicrophone();
  const level = useDemoLevel(1);
  const live = mic.state === "live";

  return (
    <VoiceBeam
      type="default"
      theme={theme}
      colorVariant="colorful"
      stream={mic.stream}
      level={level}
      className="block w-full bg-white"
    >
      <div className="flex flex-col gap-4 rounded-3xl p-4">
        <div className="px-2 pt-1.5 text-[16px] text-muted">Listening…</div>

        <div className="flex items-center justify-between">
          <RoundButton className="size-8.5" label="Add">
            <IconPlus size={18} stroke={2} />
          </RoundButton>
          <div className="flex items-center gap-2">
            <Pill>
              <span>Agent</span>
              <IconChevronDown size={14} stroke={2} />
            </Pill>
            <RoundButton
              className="size-[34px]"
              label={live ? "Stop" : "Listen"}
              onClick={live ? mic.stop : mic.start}
            >
              {live ? (
                <IconMicrophoneOff size={17} stroke={1.8} />
              ) : (
                <IconMicrophone size={17} stroke={1.8} />
              )}
            </RoundButton>
            <RoundButton className="size-[34px]" label="Close">
              <IconX size={17} stroke={1.8} />
            </RoundButton>
          </div>
        </div>
      </div>
    </VoiceBeam>
  );
}
