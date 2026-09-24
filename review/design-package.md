# Cafe Time: design package (Tier 1, trimmed per Phase 5)

## Brand premise
Cafe Time is a real, independent cafe at #102 - 32315 South Fraser Way, Abbotsford. Organic coffee (Agro Roasters), organic tea (Tego), sandwiches made fresh daily on Cobs Bread with local ingredients. It reads as a "natural and cozy space" where people unwind with family and friends. The site's job: look like it costs thousands, sound like the people who already love the place, and send every visitor to one button: Order online (cafetime.ca).

Direction: **bold and modern.** Big confident type, one green world, orange used like a spark, not a wash. Hero star: iced matcha.

Disclosure decision (per plan): the hero visuals are AI generated (no video exists yet; static image stands in). The food photography is real, from the cafe's own kitchen. Footer states this plainly.

## Palette (tokens)
```
--ink:        #121412   /* espresso ink, dark canvas, never pure black */
--matcha:     #7DBA3C
--green:      #22AA3A   /* logo green */
--cream:      #F3EFE6   /* oat cream, light sections, never pure white */
--tangerine:  #FF5A1F   /* rare accent: buttons, chips only */
--ink-soft:   #1c1f1a
--cream-soft: #ece6d8
```

## Type trio
- Display: **Unbounded** (headlines, wide and heavy)
- Accent: **Instrument Serif**, italic, single contrast words ("everyday *ritual*")
- Body: **DM Sans**
- Labels/mono: **JetBrains Mono** (pill chips, time stamps, nav labels)
All Google Fonts. No Inter, no Roboto for display.

## Signature motif
The clock hand inside the logo's cup becomes the site's drawn line: a thin ring that traces itself as the visitor scrolls, with a hand that sweeps to mark the time of day for each section (7AM coffee, 12PM lunch, 3PM treat). Reused in the interactive drink-picker as a literal draggable clock hand.

## Hero band map (Tier 1, static-image architecture; video slot pre-wired)
Tall sticky hero, three caption bands over a still (or future scrubbed video):
1. 0-33%: **"Time for something green."** (display, oat cream over scrim)
2. 33-66%: **"Whisked fresh. Poured over ice."** (accent italic line under it: "*your* matcha, *your* hour")
3. 66-100% settle: wordmark lockup **CAFE TIME**, stat row "Organic coffee / Fresh daily / Local bread", and the Order online button.

## Page map and full copy (ships verbatim)

### Nav
Logo. Links: Menu, Visit, Rewards. Pill button: **Order online** (tangerine, links to cafetime.ca).

### 1. Hero
Eyebrow label (mono): TIME FOR MATCHA
Caption 1: "Time for something green."
Caption 2: "Whisked fresh. Poured over ice."
Settle headline: "CAFE TIME"
Settle sub: "Breakfast, lunch and coffee on South Fraser Way."
Stats: "Organic coffee" · "Fresh daily" · "Local bread"
CTA: "Order online"

### 2. "Your day, on time" (3 cards)
Section eyebrow: A CAFE FOR EVERY HOUR
Heading: "Your day, on time."
Sub: "Three moments. One good cup each."

Card 1, 7AM: **Morning coffee**
Copy: "Organic beans, pulled right. The kind of cup that makes the whole morning easier."
Chips: Agro Roasters, Organic

Card 2, 12PM: **Lunch**
Copy: "Sandwiches built fresh every morning on real bread, with whatever's local that week."
Chips: Cobs Bread, Made fresh daily

Card 3, 3PM: **Afternoon treat**
Copy: "A slice, a slow sip, a seat by the window. Nobody's rushing you out."
Chips: Cozy space, Good light

### 3. Menu grid (8 cards, no prices)
Eyebrow: THE SPREAD
Heading: "Everything, at a glance."
Sub: "The full menu and every swap live in ordering. Here's what's coming out of the kitchen."
Cards (image, number, label, one line each):
01 Coffee — "Smooth, rich, pulled by people who care about it."
02 Hot tea — "Organic leaves, steeped properly, jar by jar."
03 Sandwich — "Pressed hot, stacked full, gone in minutes."
04 Salad — "Crisp and colorful, built to actually fill you up."
05 Cold drinks — "Iced, fruited, the reason summer regulars exist."
06 Rice — "A warm bowl when a sandwich isn't enough."
07 Cake — "Small slices, big finish."
08 Soup — "The bowl people order twice in one week."
Button: "See full menu" -> cafetime.ca

### 4. Sourcing strip
Eyebrow: WHERE IT COMES FROM
Heading: "We didn't cut corners on where this comes from."
Three lines:
- "Agro Roasters" — "Organic coffee, roasted with care, not shortcuts."
- "Tego" — "Organic tea, the kind that tastes like it was picked on purpose."
- "Cobs Bread" — "Baked bread, sliced fresh, holding every sandwich together."
Closing line: "Local names. Real ingredients. Nothing here is generic."

### 5. Rewards
Eyebrow: LOYALTY, BUILT IN
Heading: "Earn points every order."
Copy: "Order online and every cup and every sandwich earns you rewards toward the next one. No card to carry, no app to dig through, it's already in your account."
CTA: "Order online and start earning"

### 6. Interactive: "What time is it?"
Eyebrow: PICK YOUR HOUR
Heading: "Drag the hand. We'll tell you what to order."
Sub: "Every hour of the day has a drink and a bite that fits it."
Time buckets and pairings (drive the JS):
- 7-10: "Morning coffee + a fresh sandwich." "Start the day the way regulars do."
- 10-13: "Iced matcha + a salad." "Bright, cold, and enough to carry you to lunch."
- 13-16: "Hot tea + a slice of cake." "The slow-down hour. Take the window seat."
- 16-19: "Cold drink + a bowl of soup." "Warm inside, cool in hand. Perfect trade."
Footer line under the widget: "Whatever the hour, order online and it'll be ready."

### 7. Visit
Eyebrow: FIND US
Heading: "Come sit with us."
Address: "#102 - 32315 South Fraser Way, Abbotsford, BC"
<!-- TODO hours -->
Hours: see online ordering.
Line: "Natural light, comfortable tables, and a space that's actually easy to unwind in with family and friends."
CTA: "Get directions" -> Google Maps link for the address.

### 8. Final CTA
Heading: "Your table's ready."
Sub: "Order online, earn rewards, and we'll have it ready when you walk in."
Button: "Order online"

### Footer
Nav repeat: Menu, Visit, Rewards, Order online.
Address line + phone-free contact note (site links to cafetime.ca for ordering and contact).
Disclosure line (confirmed by plan): "Hero imagery is AI generated. Food photos are from our kitchen."
Small print: "Cafe Time, Abbotsford, BC."

## Copy register notes
Plain, short, warm, a little proud. Built from Phase 3 findings: cozy, natural light, feels like home, fresh daily, organic, not-a-chain pride, rewards. No em dashes anywhere; commas and periods only.

## Real assets used (see review/raw for originals)
- logo.webp: real logo (black cup, clock hands, CAFE white / TIME green)
- interior.jpg: real interior photo (cropped from promo3.webp)
- storefront.jpg: real storefront photo (cropped from promo3.webp)
- food-*.jpg x8: real kitchen photos cropped individually out of foodGallery2.webp (coffee, hottea, sandwich, salad, colddrinks, rice, cake, soup)
- still-sourcing.webp: AI flat-lay (coffee beans, matcha whisk and bowl, loose tea, sourdough) on green marble, used in the sourcing strip
- still-rewards.webp: AI iced matcha + hot cup on green marble, used in the rewards section
- hero.mp4 / hero-poster.jpg / hero-end.jpg: the approved AI hero video (the pour), scrub-encoded, with real poster and end frames pulled from it

## Hero engineering (Phase 8 build, now live)
The approved hero video shipped:
- `assets/hero.mp4`: scrub re-encode, cropped ~120px off the top (120/720 = 16.7%) to remove a copper pitcher edge visible in the first ~1s, scaled back to 1280x720, light unsharp (5:5:0.6), libx264, -g 2, no audio, faststart, ~3.6MB, 6.04s.
- `assets/hero-poster.jpg`: first frame of the encoded video (loading/poster state).
- `assets/hero-end.jpg`: rested final frame (~5.9s), used as the static hero on phones, reduced motion, save-data, file:// protocol, and as the fetch-failure fallback.
- JS fetches `assets/hero.mp4` as a Blob; on any failure, on width < 768, prefers-reduced-motion, saveData, or file:// protocol, it shows the static `hero-end.jpg` fallback instead and skips all video wiring.
