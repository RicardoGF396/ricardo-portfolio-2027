import { ArrowUpRightIcon } from "lucide-react";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "./Announcement";

/* Four of them, read as a changelog: one plain pill and three `themed` ones,
 * which push the tag chip onto a translucent background so the pill can take
 * a single tint. */
export default function AnnouncementDemo() {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <Announcement>
        <AnnouncementTag>New</AnnouncementTag>
        <AnnouncementTitle>
          Solaris board case study
          <ArrowUpRightIcon
            className="shrink-0 text-muted-foreground"
            size={14}
          />
        </AnnouncementTitle>
      </Announcement>

      <Announcement className="bg-[#026edb]/10 text-[#026edb]" themed>
        <AnnouncementTag>Shipped</AnnouncementTag>
        <AnnouncementTitle>
          Wallet stack v2
          <ArrowUpRightIcon className="shrink-0 opacity-70" size={14} />
        </AnnouncementTitle>
      </Announcement>

      <Announcement className="bg-emerald-100 text-emerald-700" themed>
        <AnnouncementTag>Open</AnnouncementTag>
        <AnnouncementTitle>
          Two slots for Q1 2027
          <ArrowUpRightIcon className="shrink-0 opacity-70" size={14} />
        </AnnouncementTitle>
      </Announcement>

      <Announcement className="bg-amber-100 text-amber-700" themed>
        <AnnouncementTag>Talk</AnnouncementTag>
        <AnnouncementTitle>
          Motion in product UI
          <ArrowUpRightIcon className="shrink-0 opacity-70" size={14} />
        </AnnouncementTitle>
      </Announcement>
    </div>
  );
}
