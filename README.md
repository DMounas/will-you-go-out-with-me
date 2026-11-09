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
- **🎀 Activity Selector**:
  - Multi-select interactive cards (*Dinner Date*, *Movie Night*, *Coffee & Walk*, *Sunset Picnic*, *Mini Golf / Arcade*, *Surprise Me!*)
  - Optional cravings / custom request input
- **🎟️ Boarding Pass / Date Ticket Confirmation**:
  - Officially confirmed pass with barcode and custom choices
  - Unfoldable `love_note.txt` secret digital letter modal
  - 1-Tap WhatsApp share button pre-filled with her choices
- **🔊 Web Audio Synthesizer**:
  - Built-in 8-bit chimes, boops, lock sounds, and victory fanfares (zero external audio dependencies)

## 💌 Personalization URL Query Parameters

You can customize the recipient and sender names directly in the link:
- `?to=Jiya` (Recipient Name)
- `?from=Debangshu` (Sender Name)
- `?phone=919876543210` (Optional WhatsApp number to direct message)

Example:
`https://dmounas.github.io/will-you-go-out-with-me/?to=Jiya&from=Debangshu`
