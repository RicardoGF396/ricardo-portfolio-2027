"use client";

import { CheckCircleIcon, UsersIcon, XIcon } from "lucide-react";
import {
  Pill,
  PillAvatar,
  PillAvatarGroup,
  PillButton,
  PillDelta,
  PillIcon,
  PillIndicator,
  PillStatus,
} from "./Pill";

/* The avatars are inline SVG data URIs rather than files: PillAvatar is 16px
 * across, where initials in the Avatar fallback clip, and the lab tiles take
 * no remote images. */
const face = (bg: string, initials: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${bg}"/><text x="16" y="22" fill="#fff" font-family="system-ui,sans-serif" font-size="15" font-weight="600" text-anchor="middle">${initials}</text></svg>`,
  )}`;

export default function PillDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
      <Pill>
        <PillAvatar fallback="RF" src={face("#026edb", "R")} />
        @ricardogf
      </Pill>
      <Pill>
        <PillStatus>
          <CheckCircleIcon className="text-emerald-500" size={12} />
          Shipped
        </PillStatus>
        Solaris board
      </Pill>
      <Pill>
        #motion
        <PillButton aria-label="Remove tag">
          <XIcon size={12} />
        </PillButton>
      </Pill>
      <Pill>
        <PillIndicator pulse variant="success" />
        Open for work
      </Pill>
      <Pill>
        <PillDelta delta={18} />
        Signups 18%
      </Pill>
      <Pill>
        <PillDelta delta={-4} />
        Bounce 4%
      </Pill>
      <Pill>
        <PillDelta delta={0} />
        Churn flat
      </Pill>
      <Pill>
        <PillIcon icon={UsersIcon} />
        12 clients
      </Pill>
      <Pill>
        <PillAvatarGroup>
          <PillAvatar fallback="RF" src={face("#026edb", "R")} />
          <PillAvatar fallback="MA" src={face("#1d1d1f", "M")} />
          <PillAvatar fallback="LC" src={face("#86868b", "L")} />
        </PillAvatarGroup>
        Reviewed by 3
      </Pill>
    </div>
  );
}
