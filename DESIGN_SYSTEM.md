# Social Casino Website - Design System

## Design Philosophy
This website follows a **premium social casino aesthetic** inspired by Slotomania, featuring vibrant purples, neon accents, and dynamic hero sections with consistent layout across all pages.

## Color Palette
- **Primary Purple**: `#6B2D8F` (Deep purple for headers and CTAs)
- **Neon Pink**: `#FF1493` (Accent color for highlights)
- **Neon Blue**: `#00D9FF` (Secondary accent)
- **Dark Background**: `#1A0F2E` (Deep purple-black for hero sections)
- **Light Background**: `#F5F5F5` (Off-white for content sections)
- **White**: `#FFFFFF` (Text on dark backgrounds)
- **Dark Text**: `#1A1A1A` (Text on light backgrounds)
- **Gold Accent**: `#FFD700` (For coins/rewards)

## Typography
- **Headings**: Bold sans-serif (Poppins or similar) - sizes 32px, 28px, 24px
- **Subheadings**: Medium sans-serif - size 18px
- **Body Text**: Regular sans-serif - size 16px
- **Small Text**: Regular sans-serif - size 14px

## Layout Structure

### Page Template
```
┌─────────────────────────────────────────┐
│         HEADER (Sticky)                 │
│  Logo | Nav Links | Play Now Button     │
├─────────────────────────────────────────┤
│                                         │
│    HERO SECTION (Full Width)            │
│    - Background image/gradient          │
│    - Character illustration (left/right)│
│    - Main CTA button                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    CONTENT SECTION 1                    │
│    - Title + Description                │
│    - Icons/Images with proper spacing   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    CONTENT SECTION 2                    │
│    - Grid/List layout                   │
│    - Proper alignment and spacing       │
│                                         │
├─────────────────────────────────────────┤
│         FOOTER                          │
│  Links | Social Icons | Legal Info      │
└─────────────────────────────────────────┘
```

## Spacing Guidelines
- **Container Max Width**: 1280px
- **Padding (Desktop)**: 32px
- **Padding (Tablet)**: 24px
- **Padding (Mobile)**: 16px
- **Section Gap**: 60px (vertical spacing between sections)
- **Element Gap**: 24px (spacing between elements within sections)
- **Content Padding**: 40px (internal padding in cards/sections)

## Image Positioning Rules
1. **Hero Section**: Image positioned absolutely or as background, never overlapping text
2. **Content Sections**: Images floated or in grid layout with proper margins
3. **Card Images**: Contained within card boundaries with padding
4. **No Overlapping**: All images have dedicated space with clear separation from text

## Component Spacing
- **Buttons**: 16px padding (horizontal), 12px (vertical), 8px border-radius
- **Cards**: 24px padding, 12px border-radius, subtle shadow
- **Form Fields**: 16px padding, 8px border-radius
- **List Items**: 12px gap between items

## Button Styles
- **Primary CTA**: Gradient (Purple → Pink), white text, 18px font, bold
- **Secondary**: Outlined border, 16px font
- **Tertiary**: Text only, underline on hover

## Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Animation Guidelines
- **Transitions**: 300ms ease-in-out for hover states
- **Hero Section**: Subtle parallax or fade-in on load
- **Buttons**: Scale 1.05 on hover with shadow increase
- **Page Load**: Staggered fade-in for sections

## Image Quality Standards
- **Hero Images**: High-resolution (1920x1080 minimum)
- **Character Illustrations**: PNG with transparency, 400x400px minimum
- **Icons**: SVG format, consistent stroke width
- **Background Patterns**: Subtle, non-distracting

## Content Alignment
- **Text**: Left-aligned for body, center-aligned for headings in hero
- **Images**: Right-aligned in hero (character), centered in content sections
- **CTAs**: Center-aligned or right-aligned depending on context
- **Lists**: Left-aligned with consistent indentation

## No Overlapping Rules
✓ All text has clear background (solid color or semi-transparent overlay)
✓ Images have dedicated space with margins
✓ Buttons have adequate padding and don't overlap text
✓ Icons are properly sized and spaced
✓ Content sections have clear visual separation
✓ Header/Footer don't overlap main content
