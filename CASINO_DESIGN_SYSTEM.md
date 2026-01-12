# Professional Casino Design System

## Design Philosophy
Classic casino aesthetic with modern polish. Dark, immersive environments with neon accents that create a premium, realistic gaming experience.

## Color Palette

**Primary Colors:**
- Deep Black: #0a0a0a (backgrounds)
- Dark Purple: #1a0033 (secondary backgrounds)
- Neon Cyan: #00ffff (accents, highlights)
- Neon Pink: #ff006e (secondary accents)
- Gold: #ffd700 (premium elements, wins)

**Secondary Colors:**
- Dark Gray: #2a2a2a (borders, dividers)
- Light Gray: #e0e0e0 (text)
- Green: #00ff41 (positive, wins)
- Red: #ff0055 (negative, losses)

## Typography

**Headings:** Bold, uppercase, geometric sans-serif
- Font: Orbitron or similar futuristic font
- Size: 24px-48px
- Letter-spacing: 2px
- Color: White or Neon Cyan

**Body Text:** Clean, readable sans-serif
- Font: Roboto or similar
- Size: 14px-16px
- Color: Light Gray (#e0e0e0)

**Numbers/Values:** Monospace
- Font: Courier New or similar
- Size: 18px-24px
- Color: Gold or Neon Cyan

## Animation Guidelines

### Spinning Animations
- Duration: 2-3 seconds
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Effect: Smooth deceleration at end
- Visual: Blur effect during spin, clear on completion

### Win Animations
- Pulse: Scale 1 → 1.1 → 1 (300ms)
- Glow: Opacity 0.5 → 1 → 0.5 (500ms)
- Particle effect: Confetti or sparkles
- Sound: Celebratory chime (if audio enabled)

### Loss Animations
- Shake: Horizontal movement ±5px (200ms)
- Fade: Opacity decrease (300ms)
- Color: Brief red tint

### Button Interactions
- Hover: Scale 1.05, glow effect
- Click: Scale 0.95, brief flash
- Disabled: Opacity 0.5, no cursor

### Transition Effects
- Page transitions: Fade in/out (300ms)
- Modal opens: Scale up from center (200ms)
- Notifications: Slide in from top (300ms)

## UI Components

### Betting Board
- Dark background with subtle gradient
- Bordered sections for each bet type
- Highlighted selection with glow effect
- Clear, large numbers for amounts

### Credit Display
- Large, prominent number
- Monospace font in gold
- Real-time updates with brief animation
- Icon indicating credit type

### Multiplier Indicator
- Prominent display with "x" suffix
- Color changes based on value (low=white, high=gold)
- Animation when multiplier increases

### Win/Loss Display
- Large, centered message
- Win: Green text with celebration animation
- Loss: Red text with shake animation
- Amount displayed prominently

### Progress Indicators
- Smooth bar animations
- Color gradient from cyan to pink
- Percentage text overlay

## Layout Structure

### Game Screen Layout
```
┌─────────────────────────────────────┐
│ Header (Logo, Credits, Menu)        │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Game Area (Center)         │  │
│  │   - Main game display        │  │
│  │   - Animations               │  │
│  │   - Win/Loss messages        │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │ Betting/Control Panel        │  │
│  │ - Bet selection              │  │
│  │ - Play button                │  │
│  │ - Stats display              │  │
│  └──────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ Footer (How to Play, Info)          │
└─────────────────────────────────────┘
```

## Responsive Design

- **Desktop:** Full layout with all elements visible
- **Tablet:** Stacked layout with adjusted spacing
- **Mobile:** Vertical layout with touch-optimized buttons

## Visual Effects

### Glow Effects
- Neon cyan glow on active elements
- Intensity: 0-20px blur radius
- Animation: Pulse effect (0.5s cycle)

### Shadows
- Subtle drop shadows on cards: 0 4px 12px rgba(0,0,0,0.5)
- Inset shadows for depth: inset 0 2px 4px rgba(255,255,255,0.1)

### Gradients
- Background: Linear gradient from dark purple to black
- Accents: Radial gradients for glow effects
- Text: Gradient text for premium elements

### Particle Effects
- Confetti on big wins
- Sparkles on multiplier increases
- Dust/smoke effects on impacts

## Consistency Rules

1. **All games use the same color palette**
2. **Animation timings are consistent (2-3s spins, 300ms interactions)**
3. **Typography hierarchy is maintained across all games**
4. **Button styles are identical**
5. **Credit and multiplier displays follow same format**
6. **Win/loss animations are consistent**
7. **Hover and active states are uniform**

## Accessibility

- High contrast ratios for text (WCAG AA compliance)
- Large touch targets for mobile (48px minimum)
- Keyboard navigation support
- Clear focus indicators
- Animations can be disabled (prefers-reduced-motion)
