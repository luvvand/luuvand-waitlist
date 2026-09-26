# Build the Luuv& waitlist landing page

Build a production-ready marketing landing page for **Luuv&**, an invite-only dating platform for affluent singles aged 30-65. This is a single-page, responsive waitlist site.

## Source of truth

I'm attaching four reference files:

- `luuv-landing-responsive.html` — the finished, working mockup. **This is the primary source of truth.** It's a real, self-contained HTML/CSS file (view it in a browser, or open it directly) with exact colors, spacing, typography, breakpoints, markup structure, and copy already worked out. Match it pixel-for-pixel rather than reinterpreting the design. Read the actual CSS values out of this file (hex colors, font sizes, padding, gaps, border-radius, breakpoint widths) instead of eyeballing them from the screenshots.
- `luuv-landing-desktop.png` (1440px wide), `luuv-landing-tablet.png` (834px wide), `luuv-landing-mobile.png` (412px wide) — full-page screenshots of that same HTML file at each breakpoint, for quick visual QA as you build.

If anything is ambiguous, defer to the HTML file's actual computed styles over the PNGs, the PNGs are just for a fast visual check.

## Tech stack

- **Next.js**, latest stable version, App Router, TypeScript
- **Tailwind CSS** for styling (port the reference file's CSS custom properties into Tailwind theme tokens rather than leaving raw CSS variables scattered around)
- `next/image` for all images
- `next/font` to load **Open Sans** (weights 300, 400, 600, 700, plus italic 300/400) — this is the only typeface used, headline/body/button distinctions come from weight and size, not a second font
- No UI component library — build every component from scratch to match the reference
- Deployable to Vercel with zero extra config

## Provided image assets

Place these in `/public/` and reference them with `next/image`:

- `logo.png` — the Luuv& wordmark (transparent background). Nav, top-left, no background chip or box around it, sits directly on the hero photo.
- `hero-photo.jpg` — the couple photo inside the hero's iPhone mockup.
- `kim-profile.jpg` — the profile photo in the "Kim, 46" card in the "A look inside" section.

## Design system

**Colors** (pull exact hex values from the `:root` block in the reference HTML):
- `oxblood`: `#550000`
- `oxblood-deep`: `#3d0000`
- `gold`: `#E8BA71`
- `ivory`: `#FBF7F1`
- `espresso`: `#1F1512`
- `taupe`: `#8A7368`
- `mauve`: `#B98080`

**Typography**: Open Sans throughout.
- Hero/section headlines: weight 300, large size, tight line-height
- Kicker labels above headlines (e.g. "How it works", "Not for everyone"): weight 700, small size, mauve color
- Body copy: weight 400
- Buttons: weight 700 with slight letter-spacing, uppercase

**Brand voice**: casual, punchy, no em dashes anywhere in copy or generated content (including form success/error states).

## Page sections (top to bottom)

1. **Nav** — transparent, absolutely positioned over the hero. Logo image top-left (no background). Center nav links: "How it works", "Profiles", "Is it you?" (these scroll-link to their sections via anchor IDs). Single "JOIN THE WAITLIST" button top-right that opens the waitlist form. Nav links are hidden below 1000px in the reference file, **but the reference has no working mobile menu to replace them**, that's a real gap, not an intentional design choice. Build a proper mobile nav menu (hamburger icon that opens a slide-down or overlay menu with the same links) rather than pixel-matching the reference's dead/hidden state.

2. **Hero** — dark background gradient that's lighter on the left (behind the logo and headline) and deepens toward the right, giving the dark logo and white headline text each enough contrast against their side of the gradient. Headline and CTA copy are grouped together and anchored toward the right side of the section (not spread across two even columns), sitting immediately next to an iPhone 17 Pro frame mockup: titanium bezel (multi-tone metallic gradient), dynamic island, action button + volume rocker + power button on the edges, `hero-photo.jpg` filling the screen with a bottom scrim. Headline: "Meet people worth **rearranging your calendar for.**" (second clause in gold). Sub-copy about opening by invitation, joining the waitlist for early access. One primary CTA button, "JOIN THE WAITLIST", no secondary/login button, this is a single-path conversion page. Fine print about limited, reviewed spots with Terms/Privacy links.

3. **Trust strip** — star rating (4.9, "12,400+ member reviews"), "Every profile is verified before it goes live", plus a row of press wordmarks (Forbes, Vogue, WSJ, Bloomberg — plain text wordmarks, not logos).

4. **Features ("How it works")** — kicker + headline, then an asymmetric grid: one large dark card (AI Matchmaking, spans full height) beside two stacked white cards (Match Anywhere with a map-pin icon, Curated Events with an ID-badge icon — build these as inline SVGs, line-icon style, exactly matching the paths in the reference file). Add the decorative artwork exactly as in the reference:
   - The AI Matchmaking card has an abstract "constellation" graphic (connected nodes + orbit rings, gold linework) bottom-right, bleeding off the card edges, filling what would otherwise be dead space below the copy.
   - Match Anywhere and Curated Events each have a large, faint ghost-outline watermark of their own icon in the top-right corner (low opacity, oxblood).
   - On narrow mobile widths, constrain the paragraph text width in these cards so it doesn't run under the decorative art, the reference file handles this with a `max-width` on the paragraph inside its mobile media query, match that behavior.
   Below the grid, a bordered safety strip about background checks and an SOS feature.

5. **App preview ("A look inside")** — dark section, kicker + headline + supporting copy on the left, an iPhone frame mockup on the right showing the "Kim, 46" profile card (`kim-profile.jpg`, name/location overlay, trait pills, "My love language is…" prompt, "94% COMPATIBILITY MATCH" bar). No caption text below the phone.

6. **"Is Luuv& right for you?" (replaces testimonials)** — kicker "Not for everyone" + headline. Two side-by-side panels:
   - Left, dark (espresso) panel, "This is for you if", four list items each with a small gold checkmark icon in a circular chip.
   - Right, white/bordered panel, "It's probably not for you if", four list items each with a muted taupe x icon in a circular chip (intentionally less visually aggressive than the checkmarks, this list is gently filtering people out, not calling them out).
   Exact copy:

   **This is for you if**
   - Quality over quantity, always.
   - You want vetted matches, not guesses.
   - You're ready to meet, not just text.
   - You're done playing the numbers game.

   **It's probably not for you if**
   - You're after something casual.
   - You love an endless swipe feed.
   - You'd rather stay anonymous.
   - You're browsing, not ready to meet.

   Stacks to a single column on tablet/mobile.

7. **Final CTA** — dark closing section, headline, supporting copy about founding members getting priority access, "JOIN THE WAITLIST" button, "Launching soon on App Store / Google Play" badges (static, non-functional, this is a pre-launch waitlist so nothing should imply the app is downloadable yet), footer links (Privacy, Terms, Contact, Safety), copyright line.

## Waitlist form + Google Sheets integration

The "JOIN THE WAITLIST" buttons should open a modal collecting:
- Full name (required)
- Email (required, validated)
- City (optional)

On submit, POST to a Next.js API route (`app/api/waitlist/route.ts`) that appends a new row to a Google Sheet I will create myself:

- Use the `googleapis` npm package and a **Google service account** for auth (not OAuth user login).
- Read credentials from environment variables: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `GOOGLE_SHEET_ID`.
- Append a row with: timestamp, name, email, city.
- Server-side validation (valid email format, required fields) before writing to the sheet.
- Simple honeypot field to cut down on bot submissions.
- Clear success/error JSON response from the API route.

Include a `.env.local.example` file listing the three required variables, and a short `README.md` section explaining how I connect it to my own sheet:

1. Create a Google Cloud project and a service account.
2. Enable the Google Sheets API.
3. Generate a JSON key for the service account.
4. Share my Google Sheet with the service account's email address (Editor access).
5. Copy the values into `.env.local`.

## Animations and interactions

The reference HTML is a static mockup, but it does define these, replicate them exactly:

- `scroll-behavior: smooth` on the page, so the nav anchor links scroll smoothly to their sections.
- Button hover states: the primary (solid) button fades to ~88% opacity on hover, the outline button's border brightens to full white on hover. Both use a short `0.2s ease` transition, not an instant snap.

Beyond replicating those exactly, this is now a real, functional product rather than a flat mockup, so build working versions of the interactive elements the static reference only implies:

- **Waitlist modal**: smooth open/close transition (fade + slight scale or slide is fine), closes on backdrop click, Escape key, and an explicit close button. Submit button shows a loading state while the request is in flight, then the form content is replaced with a success message ("You're on the list.") or an inline error, don't just alert() it.
- **Mobile nav menu**: the hamburger toggle needs an actual open/close animation (slide down or overlay fade), since the reference doesn't implement this at all.
- Keep every other visual detail, layout, spacing, and copy exactly as in the reference, don't add scroll-triggered reveal animations, parallax, or other motion that isn't described above unless you flag it as a suggestion for me to approve first.

## Responsiveness

Match the three breakpoints defined in the reference file's media queries exactly (1000px and 640px are the two breakpoints used):
- **Desktop (1000px+)**: full nav links visible, hero groups headline/CTA and phone mockup together anchored toward the right of the section, feature grid is the asymmetric 3-card layout, fit-check panels are two columns.
- **Tablet (640-1000px)**: nav links replaced by the mobile menu, hero stacks with the phone above the headline, feature grid drops to one column, fit-check panels stack.
- **Mobile (≤640px)**: everything stacks, buttons go full width, section padding tightens, headline sizes step down, decorative card art is scaled down and text width is constrained to avoid overlap.

## Other notes

- Keep all copy exactly as shown in the reference HTML.
- No em dashes anywhere, including generated error/success messages.
- Optimize images (`next/image` with appropriate `sizes`) and keep Lighthouse performance in mind, this is a marketing page that needs to load fast.
- Reasonable meta tags (title, description, Open Graph) for the page.
