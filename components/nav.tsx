"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NavJoinButton } from "./join-button";

const links = [
  { href: "#features", label: "How it works" },
  { href: "#preview", label: "Profiles" },
  { href: "#testimonials", label: "Is it you?" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1001px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const bar = "block h-[1.5px] w-6 bg-gold transition-transform duration-300 ease-in-out";

  return (
    <nav className="absolute inset-x-0 top-0 z-10 py-[30px] mobile:py-[22px]">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-10 tablet:px-8 mobile:px-[22px]">
        <a href="#top" className="flex items-center" aria-label="Luuv&">
          <Image
            src="/logo.png"
            alt="Luuv&"
            width={123}
            height={89}
            preload
            className="block h-14 w-auto mobile:h-10"
          />
        </a>
        <div className="flex gap-10 text-[13.5px] font-normal text-white/[.82] tablet:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-[22px] mobile:gap-4">
          <NavJoinButton />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="hidden h-6 w-6 flex-col items-center justify-center gap-[5px] tablet:flex"
          >
            <span className={`${bar} ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`${bar} ${open ? "opacity-0" : ""}`} />
            <span className={`${bar} ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full hidden origin-top bg-oxblood-deep/[.97] px-8 backdrop-blur transition-all duration-300 ease-out tablet:block mobile:px-[22px] ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="flex flex-col py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 text-[15px] text-white/90 last:border-b-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
