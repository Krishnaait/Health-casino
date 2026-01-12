# Lucky Lotus Casino - Games Documentation

## Overview
Lucky Lotus Casino features 5 unique, free-to-play games with original mechanics, scoring systems, and credit management. All games are built with the Lucky Lotus design theme (purple/pink/cyan gradients) and offer engaging gameplay experiences.

---

## Game 1: MINES 💣

### Game Mechanics
- **Grid**: 5x5 grid (25 tiles total)
- **Mines**: 5 hidden mines placed randomly
- **Safe Tiles**: 20 safe tiles to find
- **Objective**: Click safe tiles to increase multiplier without hitting mines

### Scoring System
- **Bet Amount**: 10,000 credits per game
- **Multiplier Increase**: +0.1x for each safe tile clicked
- **Maximum Multiplier**: 3.0x (when all 20 safe tiles are found)
- **Winnings Calculation**: Bet × Multiplier × 2 (if all safe tiles found)
- **Loss Condition**: Hit a mine = lose bet amount

### How to Play
1. Click "START GAME" to begin (costs 10,000 credits)
2. Click tiles to reveal safe spots or mines
3. Each safe tile increases your multiplier by 0.1x
4. Option to "CASH OUT" anytime to secure winnings
5. Find all 20 safe tiles to win 2x your bet multiplied by final multiplier
6. Hit a mine = Game Over, lose your bet

### Working Model
- Random mine placement using `Math.random()`
- Multiplier calculation: `1 + (safeCount * 0.1)`
- Cash out winnings: `BET_AMOUNT * currentMultiplier`
- Credits reset when depleted

### UI Features
- Real-time multiplier display
- Safe tile counter
- Color-coded tiles (unrevealed: gradient, safe: green, mine: red)
- Cash out button with calculated winnings
- "How to Play" sidebar with scoring details

---

## Game 2: SLOTS 🎰

### Game Mechanics
- **Reels**: 3 spinning reels
- **Symbols**: 6 different symbols (Cherry, Orange, Lemon, Grapes, Diamond, Crown)
- **Objective**: Match 3 symbols to win

### Scoring System
- **Bet Amount**: 10,000 credits per spin
- **Payouts** (for matching 3 symbols):
  - 🍒 Cherry: 2x bet = 20,000 credits
  - 🍊 Orange: 3x bet = 30,000 credits
  - 🍋 Lemon: 4x bet = 40,000 credits
  - 🍇 Grapes: 5x bet = 50,000 credits
  - 💎 Diamond: 10x bet = 100,000 credits
  - 👑 Crown: 20x bet = 200,000 credits
- **No Match**: Lose bet amount

### How to Play
1. Click "SPIN" to start spinning (costs 10,000 credits)
2. Reels spin randomly for ~2 seconds
3. Match 3 identical symbols to win
4. Winnings are automatically added to your credits
5. No match = try again with remaining credits

### Working Model
- Random symbol selection: `SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]`
- Match detection: `symbols[0] === symbols[1] && symbols[1] === symbols[2]`
- Payout lookup using multiplier object
- Spinning animation with 20+ iterations for smooth effect

### UI Features
- Large, visible reels with emoji symbols
- Spinning animation with bounce effect
- Last win display with animation
- Bet and last win stats
- "How to Play" with payout table

---

## Game 3: PLINKO 🎯

### Game Mechanics
- **Board**: Pegs arranged in rows (visual representation)
- **Ball**: Drops from top and bounces through pegs
- **Slots**: 8 slots at bottom with different multipliers
- **Objective**: Ball lands in a slot for your multiplier

### Scoring System
- **Bet Amount**: 10,000 credits per drop
- **Multipliers** (by slot position):
  - Left/Right Edge: 0.5x (lose half)
  - Near Edges: 1x (break even)
  - Middle Slots: 2x, 5x, 10x (highest in center)
- **Winnings**: Bet × Multiplier

### How to Play
1. Click "DROP" to release the ball (costs 10,000 credits)
2. Ball falls through pegs with random bounces
3. Ball lands in one of 8 slots at bottom
4. Multiplier for that slot is applied
5. Winnings calculated and added to credits

### Working Model
- Random walk simulation: ball moves left/right randomly
- 15+ steps for realistic falling animation
- Final position determines multiplier
- Slot highlighting when ball lands
- Winnings: `BET_AMOUNT * multipliers[position]`

### UI Features
- Visual plinko board with animated pegs
- Ball animation dropping through board
- 8 multiplier slots with color highlighting
- Slot highlight when ball lands
- Last win display
- "How to Play" with multiplier breakdown

---

## Game 4: DIAMONDS 💎

### Game Mechanics
- **Grid**: 4x4 grid (16 gems)
- **Gems**: 4 types (Diamond, Ring, Crown, Star)
- **Objective**: Match 3+ gems of same type
- **Gameplay**: Click gems to select them, match 3+ for points

### Scoring System
- **Bet Amount**: 10,000 credits per game
- **Points Per Match**:
  - 3 Gems: 15,000 credits
  - 4 Gems: 20,000 credits
  - 5+ Gems: 25,000+ credits (5,000 per additional gem)
- **Game Ends**: When player clicks "END GAME"
- **Total Winnings**: Sum of all matches during game

### How to Play
1. Click "START GAME" to begin (costs 10,000 credits)
2. Click gems to select them (up to multiple selections)
3. Select 3+ gems of same type to match
4. Matched gems disappear, points awarded
5. Continue matching until satisfied
6. Click "END GAME" to collect winnings
7. Total score = sum of all matches

### Working Model
- Grid generation: random gem selection
- Match detection: all selected gems same type
- Points calculation: `selectedCount * 5000`
- Matched gems removed from grid
- Game continues until player ends it
- Final winnings: `credits - BET_AMOUNT + totalScore`

### UI Features
- 4x4 gem grid with color-coded gems
- Selected gems highlighted in yellow with scale effect
- Real-time score, moves, and bet display
- Match feedback messages
- "How to Play" with gem types and scoring

---

## Game 5: DREAM CATCHER 🌙

### Game Mechanics
- **Wheel**: 8-segment spinning wheel
- **Segments**: Each has a multiplier (1x, 2x, 3x, 5x, 10x)
- **Pointer**: Fixed at top, indicates winning segment
- **Objective**: Spin wheel and land on high multiplier

### Scoring System
- **Bet Amount**: 10,000 credits per spin
- **Multipliers** (8 segments):
  - 1x (2 segments): Break even
  - 2x (2 segments): Double your bet
  - 3x (1 segment): Triple your bet
  - 5x (2 segments): 5x your bet
  - 10x (1 segment): 10x your bet
- **Winnings**: Bet × Multiplier

### How to Play
1. Click "SPIN" to start spinning (costs 10,000 credits)
2. Wheel spins with smooth animation
3. Pointer at top indicates winning segment
4. Wheel slows down and stops
5. Multiplier for winning segment applied
6. Winnings calculated and added to credits

### Working Model
- Wheel rotation: `transform: rotate(${rotation}deg)`
- Random final rotation: `Math.random() * 360`
- Ease-out animation: `1 - Math.pow(1 - progress, 3)`
- Segment angle: `360 / SEGMENTS`
- Winning segment: `Math.floor((finalRotation % 360) / segmentAngle)`
- Smooth 3-5 second spin duration

### UI Features
- Colorful 8-segment wheel with conic gradient
- Smooth rotation animation with easing
- Yellow pointer at top
- Multiplier labels on each segment
- Segment highlighting on win
- Last win display with animation
- "How to Play" with multiplier breakdown

---

## Credit System

### Initial Credits
- **Starting Amount**: 1,000,000 credits per session
- **No Deposit Required**: Completely free-to-play
- **No Real Money**: All credits are virtual

### Credit Management
- **Bet Deduction**: Credits deducted when game starts
- **Winnings Addition**: Credits added based on game outcome
- **Reset Function**: "Reset" button restores 1,000,000 credits anytime
- **Persistent Within Session**: Credits maintained during gameplay
- **Session-Based**: Credits reset when page refreshes

### Scoring Examples

#### Mines Example
- Start: 1,000,000 credits
- Bet: -10,000 (now 990,000)
- Find 15 safe tiles: Multiplier = 2.5x
- Cash out: +25,000 (now 1,015,000)

#### Slots Example
- Start: 1,000,000 credits
- Bet: -10,000 (now 990,000)
- Match 3 Diamonds: +100,000 (now 1,090,000)

#### Plinko Example
- Start: 1,000,000 credits
- Bet: -10,000 (now 990,000)
- Land on 10x slot: +100,000 (now 1,090,000)

#### Diamonds Example
- Start: 1,000,000 credits
- Bet: -10,000 (now 990,000)
- Match 4 gems: +20,000
- Match 3 gems: +15,000
- Total: +35,000 (now 1,025,000)

#### Dream Catcher Example
- Start: 1,000,000 credits
- Bet: -10,000 (now 990,000)
- Land on 5x: +50,000 (now 1,040,000)

---

## Design Theme

### Color Scheme
- **Primary**: Deep Purple (#6B21A8)
- **Secondary**: Hot Pink (#EC4899)
- **Accent**: Cyan (#06B6D4)
- **Background**: Black with transparency
- **Text**: White with cyan highlights

### Typography
- **Headings**: Poppins Bold
- **Body**: Roboto Regular
- **Game Titles**: Large, bold, with emoji

### Layout
- **Header**: Sticky, with navigation and credit display
- **Game Area**: 2/3 width on desktop
- **Info Panel**: 1/3 width on desktop, "How to Play" section
- **Mobile**: Full width, stacked layout
- **Responsive**: Adapts to all screen sizes

---

## Testing Checklist

### Functionality Tests
- [x] All 5 games load without errors
- [x] Games display correct UI and layout
- [x] Credit system initializes at 1,000,000
- [x] Bets are deducted correctly
- [x] Winnings are calculated and added
- [x] Reset button restores 1,000,000 credits
- [x] Games prevent play with insufficient credits

### Game-Specific Tests
- [x] **Mines**: Multiplier increases correctly, cash out works, mines end game
- [x] **Slots**: Symbols match correctly, payouts are accurate, spinning works
- [x] **Plinko**: Ball drops smoothly, lands in slots, multipliers apply
- [x] **Diamonds**: Gems match correctly, points awarded, game ends properly
- [x] **Dream Catcher**: Wheel spins smoothly, multipliers apply correctly

### UI/UX Tests
- [x] Headers display correctly on all pages
- [x] Navigation works between games
- [x] "How to Play" sections are clear and accurate
- [x] Multiplier displays update in real-time
- [x] Messages display game status clearly
- [x] Buttons are responsive and clickable
- [x] Mobile layout is responsive

### Edge Cases
- [x] Insufficient credits: Shows message and resets
- [x] Multiple spins: Credits update correctly each time
- [x] Rapid clicks: Games handle without errors
- [x] Reset during game: Clears game state properly
- [x] Page refresh: Game state resets, credits reset

---

## Game Hub

### Games Hub Page (`/games`)
- Displays all 5 games in a grid
- Each game card shows:
  - Game icon/emoji
  - Game name
  - Brief description
  - Maximum multiplier
  - "Play Now" button
- Info section explaining how the casino works
- Responsive grid layout (1-3 columns based on screen size)

---

## Navigation

### Routes
- `/` - Home page
- `/games` - Games Hub (all games)
- `/game/mines` - Mines game
- `/game/slots` - Slots game
- `/game/plinko` - Plinko game
- `/game/diamonds` - Diamonds game
- `/game/dreamcatcher` - Dream Catcher game
- `/play-now` - Play Now page
- `/about` - About Us page

### Header Navigation
- Logo (links to home)
- Home
- Games (links to games hub)
- Play Now
- About
- Play Now button (links to games hub)

---

## Performance Notes

- All games use client-side state management (React hooks)
- No server calls required for gameplay
- Smooth animations with CSS transforms
- Optimized re-renders with proper state updates
- Mobile-friendly with touch support

---

## Future Enhancements

Potential features for future versions:
- Leaderboards
- Daily challenges
- Bonus rounds
- Special events
- Sound effects and music
- Multiplayer features
- Achievement system
- Game statistics tracking
- Theme customization

---

## Support & Documentation

Each game includes:
- Clear "How to Play" section
- Scoring breakdown
- Multiplier information
- Bet amount display
- Reset functionality
- Real-time feedback messages

For questions or issues, refer to the "How to Play" section in each game.

---

**Last Updated**: January 13, 2026
**Version**: 1.0
**Status**: All games fully functional and tested
