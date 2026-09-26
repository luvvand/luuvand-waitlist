"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const field =
  "w-full border border-espresso/20 bg-white px-4 py-3.5 text-[15px] text-espresso outline-none transition-colors duration-200 placeholder:text-taupe/70 focus:border-oxblood";
const label = "mb-1.5 block text-[12.5px] font-semibold text-espresso";

export function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => nameRef.current?.focus(), 150);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
      // Reset once the close transition has finished
      setTimeout(() => {
        setStatus("idle");
        setError("");
      }, 300);
    };
  }, [isOpen, onClose]);

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setError(json?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div
      inert={!isOpen}
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center p-5 transition-all duration-300 ease-out ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-espresso/70 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        className={`relative max-h-full w-full max-w-[440px] overflow-y-auto bg-ivory px-9 py-10 shadow-[0_40px_80px_rgba(0,0,0,.4)] transition-transform duration-300 ease-out mobile:px-6 mobile:py-9 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[.97]"
        }`}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-taupe transition-colors hover:text-oxblood"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="py-6 text-center" role="status">
            <div className="mx-auto mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold text-gold">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 id="waitlist-title" className="mb-3 text-[26px] font-light text-espresso">You&apos;re on the list.</h2>
            <p className="mb-7 text-[14.5px] leading-[1.7] text-taupe">
              Thanks for joining. We review every spot individually and will be in touch by email when your invitation is ready.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-oxblood px-8 py-3.5 text-[13px] font-bold tracking-[.04em] text-gold transition-opacity duration-200 hover:opacity-[.88]"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h2 id="waitlist-title" className="mb-2 text-[26px] font-light leading-[1.25] text-espresso">Join the waitlist</h2>
            <p className="mb-6 text-[14px] leading-[1.6] text-taupe">Spots are limited and reviewed individually.</p>

            <div className="mb-4">
              <label htmlFor="wl-name" className={label}>Full name</label>
              <input ref={nameRef} id="wl-name" name="name" type="text" required maxLength={120} autoComplete="name" className={field} />
            </div>
            <div className="mb-4">
              <label htmlFor="wl-email" className={label}>Email</label>
              <input id="wl-email" name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
            </div>
            <div className="mb-5">
              <label htmlFor="wl-city" className={label}>City <span className="font-normal text-taupe">(optional)</span></label>
              <input id="wl-city" name="city" type="text" maxLength={120} autoComplete="address-level2" className={field} />
            </div>

            {/* Honeypot: hidden from people, tempting to bots */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="wl-website">Website</label>
              <input id="wl-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {status === "error" && (
              <p role="alert" className="mb-4 border border-oxblood/30 bg-oxblood/5 px-3.5 py-2.5 text-[13px] text-oxblood">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-oxblood px-5 py-4 text-[14px] font-bold tracking-[.04em] text-gold transition-opacity duration-200 hover:opacity-[.88] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? "JOINING..." : "JOIN THE WAITLIST"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
