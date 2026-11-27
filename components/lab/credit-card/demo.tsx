"use client";

import {
  CreditCard,
  CreditCardBack,
  CreditCardChip,
  CreditCardCvv,
  CreditCardExpiry,
  CreditCardFlipper,
  CreditCardFront,
  CreditCardLogo,
  CreditCardMagStripe,
  CreditCardName,
  CreditCardNumber,
  CreditCardServiceProvider,
} from "./CreditCard";

/* Hover the card to flip it; on touch it flips on tap.
 *
 * safeArea is 12 instead of the stock 20/16 — the component is drawn for a
 * 384px card and the tile gives it 272, where the default margin leaves the
 * number and the scheme badge fighting for the same corner. The type sizes
 * are set here for the same reason: the card's own `@xs:` steps never fire
 * below a 320px container. */
export default function CreditCardDemo() {
  return (
    <CreditCard>
      <CreditCardFlipper>
        <CreditCardFront className="bg-[#1d1d1f]" safeArea={12}>
          <span className="absolute top-0 left-0 font-semibold text-[10px] text-white/70 uppercase tracking-[0.2em]">
            Studio Flores
          </span>
          <CreditCardLogo className="size-1/5">
            <svg
              aria-hidden="true"
              className="size-full text-[#026edb]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="9.5" cy="12" r="6.5" stroke="currentColor" strokeWidth="2" />
              <circle cx="14.5" cy="12" r="6.5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </CreditCardLogo>
          <CreditCardChip />
          <CreditCardServiceProvider type="Visa" />
          <CreditCardName className="absolute bottom-0 left-0 text-[11px] tracking-wide">
            Ricardo G. Flores
          </CreditCardName>
        </CreditCardFront>

        <CreditCardBack className="bg-[#1d1d1f]" safeArea={12}>
          <CreditCardMagStripe className="bg-white/15" />
          <div className="absolute top-[55%] flex gap-5 text-[10px] text-white/70">
            <CreditCardExpiry>09/29</CreditCardExpiry>
            <CreditCardCvv>412</CreditCardCvv>
          </div>
          <CreditCardNumber className="absolute bottom-0 left-0 text-[13px] tracking-tight">
            4024 0071 5820 3391
          </CreditCardNumber>
        </CreditCardBack>
      </CreditCardFlipper>
    </CreditCard>
  );
}
