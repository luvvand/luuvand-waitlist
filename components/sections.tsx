import Image from "next/image";
import { JoinButton } from "./join-button";

const wrap = "mx-auto max-w-[1180px] px-10 tablet:px-8 mobile:px-[22px]";
const kicker = "mb-3.5 text-[13px] font-bold tracking-[.02em] text-mauve";
const sideBtn = "absolute w-[3px] bg-gradient-to-r from-[#4a4a4c] to-[#232325]";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-bg relative flex min-h-[760px] items-center overflow-hidden pb-20 pt-[140px] tablet:min-h-0 tablet:pb-[70px] tablet:pt-[150px] mobile:pb-14 mobile:pt-[110px]"
    >
      <div className={`${wrap} flex w-full items-center justify-end gap-14 tablet:flex-col tablet:justify-center tablet:gap-[50px]`}>
        <div className="max-w-[480px] flex-[0_1_480px] tablet:max-w-full tablet:basis-auto">
          <h1 className="mb-[22px] text-[56px] font-light leading-[1.14] text-white tablet:text-[44px] mobile:text-[32px] mobile:leading-[1.2]">
            Meet people worth <em className="font-normal not-italic text-gold">rearranging your calendar for.</em>
          </h1>
          <p className="mb-[34px] max-w-[440px] text-[17px] font-light leading-[1.7] text-white/[.82] mobile:text-[14.5px]">
            Luuv& is opening by invitation. Join the waitlist for early access to AI matchmaking, curated introductions and in-person events, built for people who&apos;ve outgrown swiping.
          </p>
          <div className="flex flex-wrap items-center gap-4 mobile:flex-col mobile:items-stretch">
            <JoinButton />
          </div>
          <div className="mt-[22px] max-w-[420px] text-[11.5px] leading-[1.6] text-white/50">
            Spots are limited and reviewed individually to keep the community curated. By continuing you agree to our{" "}
            <a href="#" className="text-white/75 underline">Terms</a> and{" "}
            <a href="#" className="text-white/75 underline">Privacy Policy</a>.
          </div>
        </div>

        <div className="flex justify-end tablet:order-first">
          <div className="iphone-frame relative aspect-[9/19.5] w-[290px] rounded-[54px] p-3.5 tablet:w-[240px] mobile:w-[220px] mobile:rounded-[44px] mobile:p-3">
            <div className={`${sideBtn} -left-[3px] top-[100px] h-[26px] rounded-l-sm`} />
            <div className={`${sideBtn} -left-[3px] top-[150px] h-11 rounded-l-sm`} />
            <div className={`${sideBtn} -left-[3px] top-[204px] h-11 rounded-l-sm`} />
            <div className={`${sideBtn} -right-[3px] top-[160px] h-16 rounded-r-sm`} />
            <div className="iphone-scrim relative h-full w-full overflow-hidden rounded-[42px] bg-black mobile:rounded-[34px]">
              <div className="absolute left-1/2 top-4 z-[5] h-6 w-1/3 -translate-x-1/2 rounded-2xl bg-black" />
              <Image
                src="/hero-photo.jpg"
                alt="Couple laughing together outdoors"
                fill
                preload
                sizes="(max-width: 640px) 220px, (max-width: 1000px) 240px, 290px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section className="border-b border-hairline bg-ivory py-14 mobile:py-9">
      <div className={`${wrap} flex flex-wrap items-center justify-between gap-10 mobile:flex-col mobile:items-start mobile:gap-[22px]`}>
        <div className="flex items-center gap-[18px]">
          <div className="text-[20px] tracking-[3px] text-gold">★★★★★</div>
          <div>
            <div className="text-[15px] font-bold text-espresso">4.9 average, 12,400+ member reviews</div>
            <div className="text-[12.5px] text-taupe">Every profile is verified before it goes live</div>
          </div>
        </div>
        <div className="flex items-center gap-11 mobile:flex-wrap mobile:gap-[26px]">
          {["FORBES", "VOGUE", "WSJ", "BLOOMBERG"].map((p) => (
            <div key={p} className="text-[14px] font-semibold tracking-[.09em] text-[#b7ab9f]">{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pin = (
  <>
    <path d="M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
);
const badge = (
  <>
    <path d="M9 3.5h6" />
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <circle cx="12" cy="10.5" r="2" />
    <path d="M8 16.5c.7-1.6 2.1-2.5 4-2.5s3.3.9 4 2.5" />
  </>
);

function SmallCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden border border-hairline bg-white px-[34px] py-9 mobile:px-[22px] mobile:py-[26px]">
      <div className="relative z-[2] mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-oxblood">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </div>
      <h3 className="relative z-[2] mb-2.5 text-[18px] font-semibold text-espresso">{title}</h3>
      <p className="relative z-[2] max-w-[78%] text-[13.5px] font-normal leading-[1.65] text-taupe mobile:max-w-[70%]">{children}</p>
      <svg
        className="pointer-events-none absolute -right-[18px] -top-[18px] z-[1] h-[120px] w-[120px] text-oxblood opacity-[.07] mobile:h-[90px] mobile:w-[90px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        {icon}
      </svg>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-ivory py-[110px] mobile:py-[70px]">
      <div className={wrap}>
        <div className="mx-auto mb-16 max-w-[620px] text-center mobile:mb-10 mobile:text-left">
          <div className={kicker}>How it works</div>
          <h2 className="text-[38px] font-light leading-[1.3] text-espresso tablet:text-[32px] mobile:text-[26px]">
            Matchmaking that <em className="font-semibold not-italic text-oxblood">actually knows you</em>, not just your photos.
          </h2>
        </div>

        <div className="grid grid-cols-[1.15fr_.85fr] grid-rows-[auto_auto] gap-[22px] tablet:grid-cols-1">
          <div className="relative row-span-2 flex flex-col justify-center overflow-hidden bg-espresso px-[42px] py-12 text-white tablet:row-auto mobile:px-[26px] mobile:py-8">
            <div className="relative z-[2] mb-[26px] flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold text-[22px] text-gold">✦</div>
            <h3 className="relative z-[2] mb-3.5 text-[24px] font-semibold">AI Matchmaking</h3>
            <p className="relative z-[2] max-w-[400px] text-[15px] font-light leading-[1.75] text-white/[.72] mobile:max-w-[74%]">
              Our matching engine weighs shared values, emotional intelligence, lifestyle and long-term compatibility, not just who swiped first. Built from a short personality and values assessment, not a scroll.
            </p>
            <svg
              className="pointer-events-none absolute -bottom-[30px] -right-[30px] z-[1] h-[280px] w-[280px] mobile:-bottom-5 mobile:-right-5 mobile:h-[170px] mobile:w-[170px]"
              viewBox="0 0 280 280"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="140" cy="140" r="110" stroke="#E8BA71" strokeOpacity="0.12" strokeWidth="1" />
              <circle cx="140" cy="140" r="70" stroke="#E8BA71" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="4 6" />
              <line x1="90" y1="90" x2="170" y2="120" stroke="#E8BA71" strokeOpacity="0.35" strokeWidth="1" />
              <line x1="170" y1="120" x2="150" y2="190" stroke="#E8BA71" strokeOpacity="0.35" strokeWidth="1" />
              <line x1="150" y1="190" x2="210" y2="160" stroke="#E8BA71" strokeOpacity="0.35" strokeWidth="1" />
              <line x1="90" y1="90" x2="150" y2="190" stroke="#E8BA71" strokeOpacity="0.2" strokeWidth="1" />
              <circle cx="90" cy="90" r="5" fill="#E8BA71" fillOpacity="0.8" />
              <circle cx="170" cy="120" r="4" fill="#E8BA71" fillOpacity="0.6" />
              <circle cx="150" cy="190" r="6" fill="#E8BA71" fillOpacity="0.9" />
              <circle cx="210" cy="160" r="3.5" fill="#E8BA71" fillOpacity="0.5" />
            </svg>
          </div>
          <SmallCard icon={pin} title="Match Anywhere">
            Open your search beyond your city. We factor in travel, lifestyle and goals to find compatibility, not just proximity.
          </SmallCard>
          <SmallCard icon={badge} title="Curated Events">
            Members get limited profile access to fellow attendees before and after each gathering. Connection that starts in person.
          </SmallCard>
        </div>

        <div className="mt-[22px] flex items-center gap-[18px] border border-oxblood px-[34px] py-[26px] mobile:flex-col mobile:items-start mobile:p-[22px]">
          <div className="shrink-0 text-[26px] text-oxblood">⛨</div>
          <div className="text-[14px] leading-[1.6] text-espresso">
            <b className="font-bold text-oxblood">Privacy and safety, built in.</b> Optional background checks and a discreet SOS feature for every in-person meeting.
          </div>
        </div>
      </div>
    </section>
  );
}

export function Preview() {
  const tag = "rounded-[20px] border border-[#e3d9cf] px-[9px] py-1 text-[9px] text-taupe";
  return (
    <section id="preview" className="bg-espresso py-[120px] mobile:py-[70px]">
      <div className={`${wrap} grid grid-cols-2 items-center gap-[60px] tablet:grid-cols-1 tablet:gap-[50px] tablet:text-center mobile:text-left`}>
        <div>
          <div className={`${kicker} !text-gold`}>A look inside</div>
          <h2 className="mb-5 text-[38px] font-light leading-[1.3] text-white tablet:text-[32px] mobile:text-[26px]">
            Profiles built for <em className="font-normal not-italic text-gold">substance</em>
          </h2>
          <p className="mb-2 max-w-[420px] text-[15px] font-light leading-[1.75] text-white/[.62] tablet:mx-auto mobile:mx-0">
            Prompts surface values and love languages before physical stats. It changes what a first impression is built on.
          </p>
        </div>
        <div className="mx-auto w-[260px] rounded-[30px] bg-[#0f0a08] p-[9px] shadow-[0_40px_80px_rgba(0,0,0,.55)]">
          <div className="overflow-hidden rounded-[21px] bg-white">
            <div className="ps-scrim relative flex h-[180px] items-end overflow-hidden p-3.5">
              <Image
                src="/kim-profile.jpg"
                alt="Kim, 46"
                fill
                sizes="242px"
                className="z-0 object-cover [object-position:52%_18%]"
              />
              <div className="relative z-[2] text-white">
                <span className="block text-[19px] font-bold">Kim, 46</span>
                <span className="text-[10.5px] opacity-80">New York, NY · Marketing Manager</span>
              </div>
            </div>
            <div className="p-3.5">
              <div className="mb-3 flex flex-wrap gap-1.5">
                <span className={tag}>Woman</span>
                <span className={tag}>Straight</span>
                <span className={tag}>5&apos;4&quot;</span>
              </div>
              <div className="mb-0.5 text-[10px] font-bold text-espresso">My love language is…</div>
              <div className="mb-[9px] text-[10.5px] text-taupe">Acts of service, quality time</div>
              <div className="mt-1.5 bg-oxblood p-[9px] text-center text-[10px] font-bold text-gold">94% COMPATIBILITY MATCH</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const check = <path d="M20 6 9 17l-5-5" />;
const cross = <path d="M18 6 6 18M6 6l12 12" />;

function FitPanel({ yes, title, items }: { yes?: boolean; title: string; items: string[] }) {
  return (
    <div className={`px-10 py-11 mobile:px-[26px] mobile:py-8 ${yes ? "bg-espresso" : "border border-hairline bg-white"}`}>
      <h3 className={`mb-[26px] text-[20px] font-semibold ${yes ? "text-white" : "text-espresso"}`}>{title}</h3>
      <ul className="flex list-none flex-col gap-[18px]">
        {items.map((t) => (
          <li key={t} className={`flex items-start gap-3.5 text-[15px] leading-[1.55] ${yes ? "text-white/85" : "text-taupe"}`}>
            <span
              className={`mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${
                yes ? "bg-gold/15 text-gold" : "bg-taupe/[.12] text-taupe"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {yes ? check : cross}
              </svg>
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FitCheck() {
  return (
    <section id="testimonials" className="bg-ivory py-[120px] mobile:py-[70px]">
      <div className={wrap}>
        <div className="mx-auto mb-[70px] max-w-[600px] text-center mobile:mb-10 mobile:text-left">
          <div className={kicker}>Not for everyone</div>
          <h2 className="text-[38px] font-light leading-[1.3] text-espresso tablet:text-[32px] mobile:text-[26px]">
            Is Luuv&amp; <em className="font-semibold not-italic text-oxblood">right for you?</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6 tablet:grid-cols-1 tablet:gap-11">
          <FitPanel
            yes
            title="This is for you if"
            items={[
              "Quality over quantity, always.",
              "You want vetted matches, not guesses.",
              "You're ready to meet, not just text.",
              "You're done playing the numbers game.",
            ]}
          />
          <FitPanel
            title="It's probably not for you if"
            items={[
              "You're after something casual.",
              "You love an endless swipe feed.",
              "You'd rather stay anonymous.",
              "You're browsing, not ready to meet.",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-bg bg-oxblood-deep pb-[60px] pt-[120px] text-center mobile:pb-10 mobile:pt-[70px]">
      <div className={wrap}>
        <h2 className="mx-auto mb-[18px] max-w-[680px] text-[44px] font-light leading-[1.28] text-white mobile:text-[28px]">
          Your next chapter <em className="font-normal not-italic text-gold">doesn&apos;t start with a swipe.</em>
        </h2>
        <p className="mb-[38px] text-[15px] font-light text-white/65">
          Join the waitlist. Founding members get priority matching and early access when we launch in your city.
        </p>
        <div className="mb-[60px] flex flex-wrap items-center justify-center gap-4 mobile:flex-col mobile:items-stretch">
          <JoinButton variant="gold" />
        </div>
        <div className="mb-[50px] flex justify-center gap-3.5 mobile:flex-col mobile:items-center">
          {[
            { icon: "", store: "App Store" },
            { icon: "▷", store: "Google Play" },
          ].map((b) => (
            <div key={b.store} className="flex items-center gap-2.5 border border-gold/40 px-[22px] py-[11px]">
              <span className="text-[20px] text-gold">{b.icon}</span>
              <span className="text-left text-white">
                <span className="block text-[9px] text-white/60">Launching soon on</span>
                <span className="block text-[14px] font-semibold">{b.store}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mb-4 flex justify-center gap-[30px] border-t border-white/[.12] pt-7 text-[12px] text-white/50 mobile:flex-wrap mobile:gap-x-[22px] mobile:gap-y-4">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
          <span>Safety</span>
        </div>
        <div className="text-[11px] text-white/35">© 2026 Luuv&amp;. All rights reserved.</div>
      </div>
    </section>
  );
}
