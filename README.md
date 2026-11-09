# Will You Go Out With Me? 💖

An interactive, retro 8-bit pixel-art date proposal web app built with love, featuring Peach & Goma / Bubu & Dudu animations, an evasive "No" button mechanic, calendar date picker, multi-select date activity planner, custom love letter modal, and WhatsApp confirmation sharing.

## ✨ Features

- **📱 Mobile-First Phone Optimized**:
  - `100dvh` dynamic viewport height for iOS Safari and Chrome mobile bars
  - Notch & home bar safe-area insets (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`)
  - Touch-action optimization without zoom lock delays
  - Haptic vibration feedback for mobile taps
- **🕹️ Retro 8-bit Pixel Art Aesthetic**:
  - Pastel pink checkerboard backdrop, drifting pixel clouds & twinkling stars
  - Google Fonts `'Press Start 2P'` and `'Outfit'`
  - 3D tactile pixel buttons with press animations
- **🐾 The Iconic Evasive "No" Button**:
  - Each tap shrinks the "No" button, dodges on screen, and scales up the "YES" button
  - Pleading microcopy messages (*"Are you sure? 🥺"*, *"Babe please... 🥹"*, *"Heart broken </3 💔"*)
  - Character stickers transition through sad/crying states
- **📅 Interactive Date Picker**:
  - Quick-select pills (*Today*, *Tomorrow*, *This Weekend 🌸*, *Next Saturday ✨*) or calendar picker
- **🎀 Activity Selector (Practical Silchar Dates)**:
  - Multi-select interactive cards (*Café & Chai Date*, *Dinner Date*, *Barak Riverfront Sunset*, *Silchar Street Food Crawl*, *Movie Date at Gold Digital*, *Long Scenic Drive*)
  - Optional cravings / custom request input
- **🎟️ Boarding Pass / Date Ticket Confirmation**:
  - Officially confirmed pass with barcode and custom choices
  - Unfoldable `love_note.txt` secret digital letter modal
  - 1-Tap WhatsApp share button pre-filled with her choices directly targeting `dmounas` (+91-9395240600)
- **🔊 Web Audio Synthesizer**:
  - Built-in 8-bit chimes, boops, lock sounds, and victory fanfares (zero external audio dependencies)

## 💌 Personalization URL Query Parameters

You can customize the recipient and sender names directly in the link:
- `?to=Pritishmita` (Recipient Name, default: `Pritishmita`)
- `?from=dmounas` (Sender Name, default: `dmounas`)
- `?phone=919395240600` (WhatsApp number, default: `919395240600`)

Example:
`https://dmounas.github.io/will-you-go-out-with-me/?to=Pritishmita&from=dmounas`
