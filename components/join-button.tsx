"use client";

import { useWaitlist } from "./waitlist-provider";

const base =
  "border px-8 py-[18px] text-[14px] font-bold tracking-[.04em] text-center transition-opacity duration-200 ease-in-out hover:opacity-[.88] mobile:w-full mobile:px-5 mobile:py-4";

const variants = {
  oxblood: "bg-oxblood text-gold border-oxblood",
  gold: "bg-gold text-oxblood-deep border-gold",
};

export function JoinButton({ variant = "oxblood" }: { variant?: keyof typeof variants }) {
  const { open } = useWaitlist();
  return (
    <button type="button" onClick={open} className={`${base} ${variants[variant]}`}>
      JOIN THE WAITLIST
    </button>
  );
}

export function NavJoinButton() {
  const { open } = useWaitlist();
  return (
    <button
      type="button"
      onClick={open}
      className="bg-gold px-[22px] py-3 text-[12.5px] font-bold tracking-[.03em] text-oxblood-deep transition-opacity duration-200 ease-in-out hover:opacity-[.88] mobile:px-4 mobile:py-2.5 mobile:text-[11.5px]"
    >
      JOIN THE WAITLIST
    </button>
  );
}
