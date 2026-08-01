---
name: GrowthPilot AI
colors:
  surface: '#081425'
  surface-dim: '#081425'
  surface-bright: '#2f3a4c'
  surface-container-lowest: '#040e1f'
  surface-container-low: '#111c2d'
  surface-container: '#152031'
  surface-container-high: '#1f2a3c'
  surface-container-highest: '#2a3548'
  on-surface: '#d8e3fb'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#d8e3fb'
  inverse-on-surface: '#263143'
  outline: '#a08e7a'
  outline-variant: '#534434'
  surface-tint: '#ffb95f'
  primary: '#ffc174'
  on-primary: '#472a00'
  primary-container: '#f59e0b'
  on-primary-container: '#613b00'
  inverse-primary: '#855300'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#8fd5ff'
  on-tertiary: '#00344a'
  tertiary-container: '#1abdff'
  on-tertiary-container: '#004966'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#c5e7ff'
  tertiary-fixed-dim: '#7fd0ff'
  on-tertiary-fixed: '#001e2d'
  on-tertiary-fixed-variant: '#004c6a'
  background: '#081425'
  on-background: '#d8e3fb'
  surface-variant: '#2a3548'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1440px
---

## Brand & Style

This design system is built for a high-end, performance-driven SaaS environment. The brand personality is authoritative yet energetic, focusing on precision, speed, and intelligence. 

The aesthetic follows a **Premium Modern** approach: a dark-mode first interface that prioritizes readability and professional clarity. It avoids the clichés of "mystical" AI gradients in favor of structural integrity, architectural sharpness, and high-contrast accents. The interface should feel like a high-performance flight deck—utilitarian but refined, using "Electric Amber" to draw the eye to critical data points and "Deep Slate" to provide a stable, sophisticated foundation.

## Colors

The palette is strictly curated to evoke professional power without relying on standard corporate blues.

- **Primary (Electric Amber):** Used exclusively for high-intent actions, primary buttons, and critical status highlights. It represents energy and growth.
- **Secondary (Mint Green):** Reserved for success states, positive growth metrics, and secondary supportive UI elements.
- **Background (Deep Slate):** The core of the interface. `#1e293b` serves as the primary container color, while a deeper `#0f172a` is used for the main application background to create layered depth.
- **Neutral (Slate Tones):** Grayscale is replaced with tinted slates to maintain a cohesive, high-end atmosphere.
- **Constraints:** Do not use pure black (#000000) or any standard blue hues. All interactive states should derive from the Amber or Mint palettes.

## Typography

The typography uses **Hanken Grotesk** for its technical precision and modern character. It is a typeface that feels engineered, matching the "Pilot" aspect of the brand.

- **Headlines:** Use tight letter-spacing (-0.01em to -0.02em) for larger displays to create a high-impact, editorial feel. 
- **Body:** Standard weight is 400. For data-heavy views, use 16px as the base to ensure high information density without sacrificing legibility.
- **Labels:** Small labels (`label-sm`) should be set in semi-bold and uppercase to act as clear navigational or category markers within complex dashboards.

## Layout & Spacing

The layout is based on a **12-column fluid grid** with a maximum container width of 1440px. 

- **Rhythm:** All spacing must be a multiple of 4px. Use 16px (4 units) for standard component grouping and 24px (6 units) for section gutters.
- **Information Density:** For SaaS dashboards, utilize a "Compact-Comfortable" hybrid. Sidebars and toolbars should use 12px padding to maximize vertical space, while main content areas use 32px to allow the data to breathe.
- **Mobile Adaptivity:** At the 768px breakpoint, margins shrink to 16px and the 12-column grid collapses into a 4-column stack.

## Elevation & Depth

This design system uses **Tonal Layering** and **Ghost Borders** rather than traditional heavy shadows.

- **Layering:** Level 0 is the background (`#0f172a`). Level 1 is the primary surface (`#1e293b`). Level 2 (modals/popovers) uses `#334155`.
- **Borders:** Surfaces are defined by 1px solid borders in `#334155`. This creates an "architectural" feel.
- **Shadows:** Use only one type of shadow: a "Precision Shadow." This is a sharp, low-spread shadow (`0px 4px 12px rgba(0,0,0,0.4)`) used only for floating elements like dropdowns and tooltips.
- **Glassmorphism:** Use sparingly for navigation sidebars. A 12px backdrop blur with a 10% opacity white border creates a premium "cockpit" feel over scrolling content.

## Shapes

The shape language is defined by **Precision Geometry**. 

A standard border radius of **6px** (Soft-Sharp) is applied to almost all UI elements including buttons, inputs, and cards. This specific radius provides a balance between modern friendliness and professional rigidity.

- **Exceptions:** Checkboxes and small tags maintain a 4px radius.
- **Pill Shapes:** Never use full pill-shaped buttons; stick to the 6px standard to maintain the architectural aesthetic.

## Components

- **Buttons:** 
  - *Primary:* Electric Amber background, Deep Slate text. 6px radius. No gradient.
  - *Secondary:* Transparent background, 1px Amber border, Amber text.
  - *Ghost:* No border, slate text, becomes Slate-600 on hover.
- **Input Fields:** Deep Slate background with a 1px Slate-700 border. On focus, the border changes to Electric Amber with a 2px outer glow (0px 0px 0px 2px rgba(245, 158, 11, 0.2)).
- **Cards:** Use Level 1 Surface (`#1e293b`) with a 1px border. No shadows for static cards.
- **Chips/Badges:** Use a subtle background tint of the accent color (e.g., 10% opacity Mint Green) with bolded text for status indicators.
- **Data Tables:** Use 1px horizontal dividers only. Row hover state should be a subtle shift to `#334155`.
- **Progress Indicators:** Use thin 4px bars. Completed segments in Mint Green; active segments in Electric Amber.