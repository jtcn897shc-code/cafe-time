# Cafe Time design system

Hybrid of two references: a green matcha editorial site (Didone accent word, "mélange") and a warm coffee shop site (extra-wide heavy headlines, menu category pills, product cards, a soft pink featured drink band). The matcha pour hero and its scroll-scrubbed video stay the signature.

## Type

One variable family covers display, body and UI through its width axis, plus one accent face.

| Role | Face | Settings |
|---|---|---|
| Display (h1 to h3) | Archivo | `font-stretch: 125%`, weight 800 to 900, tracking -0.02em (featured title -0.03em). Uppercase for hero, featured and final CTA headlines only. |
| Accent | Bodoni Moda italic | Weight 400, `font-stretch: 100%`. Used for one word or phrase inside a headline (`<em>`) and the hero sub line. Never for body copy. |
| Body | Archivo | `font-stretch: 100%`, weight 400 to 500, 17px / 1.55 |
| UI (buttons, pills, chips, nav) | Archivo | `font-stretch: 112%`, weight 600 to 700, uppercase, tracking 0.08 to 0.12em |

Tokens: `--font-sans`, `--font-accent`, `--wide`, `--ui` in `assets/css/style.css`. Changing a face means changing one token.

**Lockup:** section headings use `.lockup`. The heavy wide line comes first, then the Bodoni italic phrase on its own line, indented 1.4em, at 0.78em. This is the "Menu / *drinks*" pattern from the reference.

Display size caps at 6rem.

## Palette and contrast

| Token | Hex | Use |
|---|---|---|
| `--ink` | #121412 | Text on light grounds, dark sections, button text on tangerine |
| `--cream` | #F3EFE6 | Light ground, text on dark |
| `--matcha` | #7DBA3C | Accent text on ink only |
| `--green` | #22AA3A | Logo green. **Fill and decoration only, never text on cream** (2.66:1 fails) |
| `--deep-green` | #145C24 | Accent text on cream and blush, rewards band ground |
| `--blush` | #F2D6CF | Featured drink band ground (tiramisu latte) |
| `--tangerine` | #FF5A1F | Primary buttons (ink text), final CTA band. Rare. |

| Pair | Ratio | Verdict |
|---|---|---|
| ink on cream | 16.1 | all text |
| ink on blush | 13.5 | all text |
| deep green on cream | 7.1 | all text |
| deep green on blush | 5.9 | all text |
| cream on deep green | 7.1 | all text |
| matcha on ink | 7.9 | all text |
| matcha on deep green | 3.5 | large headline accent only |
| ink on tangerine | 5.9 | button labels (cream on tangerine fails, never use it) |

## Motion

- Hero: the scroll-scrubbed video on every viewport. A static end frame shows for reduced motion, data saver, `file://` and decode failure.
- Reveal on scroll: content is visible by default and only hidden once the inline `html.js` flag confirms JS runs. Reduced motion keeps the fade and drops the translate.
- Menu filter: returning cards fade in through `@starting-style` (opacity plus translateY(8px) scale(.97), 220ms, `--ease`). Reduced motion is fade only.
- Hover effects sit behind `(hover:hover) and (pointer:fine)`.

## Texture

A static film grain covers the whole page (`body::after`, `assets/img/grain.png`, normal blend, 5% opacity, about ±5 brightness levels). It is a real noise tile, not an SVG filter, and it's too faint to change any contrast ratio above. It does not animate, so there's nothing to reduce for reduced motion.

## Do / Don't (coffee shop clichés to design away from)

- Don't use coffee bean icons, steam squiggles, chalkboard script, kraft paper textures or "Est. 20XX" badges.
- Don't use eyebrow labels above headings, numbered cards (01/02), or monospace used as decoration.
- Don't use prices, sale badges or ratings we can't back with real data. The menu and prices live in cafetime.ca ordering.
- Do use real food photos in the menu, one Didone accent per heading at most, and let the wide heavy type carry the page.
