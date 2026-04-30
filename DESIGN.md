---
name: Specialty Coffee Design System
colors:
  surface: '#fef8f3'
  surface-dim: '#ded9d4'
  surface-bright: '#fef8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3ee'
  surface-container: '#f2ede8'
  surface-container-high: '#ece7e2'
  surface-container-highest: '#e6e2dd'
  on-surface: '#1d1b19'
  on-surface-variant: '#4e4540'
  inverse-surface: '#32302d'
  inverse-on-surface: '#f5f0eb'
  outline: '#80756f'
  outline-variant: '#d2c4bd'
  surface-tint: '#6c5b51'
  primary: '#33251d'
  on-primary: '#ffffff'
  primary-container: '#4a3b32'
  on-primary-container: '#baa599'
  inverse-primary: '#d9c2b6'
  secondary: '#655d54'
  on-secondary: '#ffffff'
  secondary-container: '#ede0d5'
  on-secondary-container: '#6c635a'
  tertiary: '#002a4c'
  on-tertiary: '#ffffff'
  tertiary-container: '#004070'
  on-tertiary-container: '#6badf7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f6ded1'
  primary-fixed-dim: '#d9c2b6'
  on-primary-fixed: '#251911'
  on-primary-fixed-variant: '#53443a'
  secondary-fixed: '#ede0d5'
  secondary-fixed-dim: '#d0c4ba'
  on-secondary-fixed: '#201b14'
  on-secondary-fixed-variant: '#4d453e'
  tertiary-fixed: '#d2e4ff'
  tertiary-fixed-dim: '#a0caff'
  on-tertiary-fixed: '#001c37'
  on-tertiary-fixed-variant: '#00497e'
  background: '#fef8f3'
  on-background: '#1d1b19'
  surface-variant: '#e6e2dd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  section-gap: 80px
  grid-gutter: 24px
  container-padding: 40px
  stack-sm: 12px
  stack-md: 24px
---

## Brand & Style

The visual identity of this design system is built on the concept of "The Ritual of Origin." It targets discerning coffee enthusiasts who value transparency, craft, and the sensory experience of a premium brew. The aesthetic is warm, grounded, and quiet, moving away from loud commercialism toward an editorial, boutique feel.

The design style is a blend of **Warm Minimalism** and **Contemporary Editorial**. It prioritizes high-quality product photography—capturing the texture of beans, the clarity of glass carafes, and the richness of crema—as the primary visual driver. By utilizing a restrained color palette and generous whitespace, the interface recedes to let the product storytelling take center stage. The result is an uncluttered, serene shopping environment that mirrors the calm of a morning coffee ritual.

## Colors

The color strategy is rooted in the natural lifecycle of coffee. The primary background uses a rich **Cream (#F5F0EB)** rather than a sterile white to instill immediate warmth and a "paper-like" editorial quality.

- **Primary (#4A3B32):** A deep, dark espresso brown used for primary typography and high-priority call-to-actions. It provides a softer contrast than pure black.
- **Secondary (#B7ACA2):** A muted, earthy beige used for secondary buttons, borders, and decorative elements. This bridges the gap between the dark text and cream background.
- **Neutral/Background:** We use a tiered approach with **Cream (#F5F0EB)** for large surfaces and **Pure White (#FFFFFF)** for secondary containers or product cards to create subtle depth.
- **Accent (#2A75BB):** Drawn from the brand’s lineage, this blue is used with extreme restraint—reserved exclusively for functional indicators like active links, success states, or shipping notifications to ensure it doesn't disrupt the warm harmony.

## Typography

This design system utilizes **Inter** across all levels to achieve a clean, systematic, and premium feel. The typographic hierarchy relies on subtle weight shifts and generous leading rather than dramatic size changes.

Headlines are set with a medium weight and tighter letter spacing to create a sense of modern authority. For body copy, we prioritize legibility with a 1.6 line-height, ensuring long descriptions of coffee origins are easy to digest. A specific "label-caps" style is used for metadata (e.g., roast level, altitude, price) to provide a distinct visual break from prose and reinforce the organized, specialty nature of the brand.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop environments to maintain a curated, gallery-like feel. We utilize a 12-column grid with a maximum container width of 1280px.

Spacing is governed by an 8px base unit, but the defining characteristic is the **Section Gap (80px)**. This large vertical rhythm prevents the interface from feeling crowded and allows product imagery to breathe. Internal component spacing (stacks) should be kept consistent to maintain an organized grid; use 24px for grouping related elements and 12px for tight associations like labels and their respective inputs.

## Elevation & Depth

To maintain a minimal aesthetic, this design system avoids heavy shadows. Depth is conveyed primarily through **Tonal Layering** and **Low-Contrast Outlines**.

- **Surface Tiers:** Pure White surfaces sit atop the Cream background to indicate interactivity or focus (e.g., product cards or modals).
- **Subtle Borders:** 1px solid borders in a lightened version of the secondary color (#B7ACA2 at 30% opacity) are used to define boundaries without adding visual weight.
- **Ambient Shadows:** Where depth is required (such as dropdowns or active state cards), use a "Soft Earth" shadow: a very high blur (20px+) with low opacity (4-6%) using the primary brown #4A3B32 instead of black. This maintains the warm temperature of the UI.

## Shapes

The shape language is understated and architectural. We use a **Soft (Level 1)** roundedness approach. 

Standard components like buttons and input fields feature a 4px (0.25rem) corner radius. Larger containers, such as product cards or featured banners, may use up to 8px (0.5rem) to feel approachable but never "bubbly." This slight softening of corners prevents the design from feeling too clinical or sharp, aligning with the "warm" brand personality while retaining a modern edge.

## Components

- **Buttons:** Primary buttons are solid #4A3B32 with white text, using the "label-caps" typography for a structured feel. Secondary buttons use a 1px border of #4A3B32 with no fill.
- **Product Cards:** Cards should have no background or border by default, relying on the product photography and the "headline-md" for the title. On hover, a subtle white background with an ambient shadow may appear.
- **Input Fields:** Use a minimal "underline" style or a very light 4-sided border in #B7ACA2. Focus states transition the border color to the primary brown.
- **Chips/Tags:** Used for roast levels (Light, Medium, Dark). These should be small, pill-shaped with a light beige fill and dark brown text, using the smallest label size.
- **Imagery:** All product photos should feature a consistent soft-focus background or a flat-lay style on neutral surfaces that complement the #F5F0EB cream background.
- **Quantity Selector:** A clean, horizontal component with +/- icons in the primary brown, separated by the quantity value in a medium weight.