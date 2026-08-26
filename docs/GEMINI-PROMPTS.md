# Gemini 3D props (not case-study photos)

Do **not** generate `cse-naukri.jpg`, `serveos.jpg`, or any client-named work file. Those stills come from your real PDFs later.

These prompts are for **scroll 3D objects** (Redo-style floating assets). Drop the PNGs into `studio/public/space/` with the names below. The site already looks for them.

## How to run

1. New Gemini chat per shot. Image mode. 1:1. Highest quality.
2. Paste **LOOK** once, then the shot.
3. Crop 8% off every edge (kills the sparkle).
4. If it looks like a poster, perfume ad, or paper + paint, discard it.

## LOOK (paste first)

```
You are generating a single 3D product render for a film studio website scroll scene. Output one object only, centered, with large empty margin.

LOOK:
- Photoreal 3D render, Octane / Arnold quality, not illustration, not clay, not Lego.
- Object sits in a true void: background solid #120608, no floor, no studio sweep, no infinite white.
- One hard tungsten key camera-left, tiny fill. Speculars small and white.
- Materials: matte black anodized metal, warm off-white plaster #F6F1EE, one signal-red #C8102E accent only.
- Camera: 50mm, f/8, slight 3/4 view, object occupying the middle 55% of frame.
- ZERO text, ZERO logos, ZERO UI, ZERO people, ZERO watermarks.
- Not a still-life table. The object floats. Soft contact shadow only if needed, almost invisible.
```

## Shots (save names exactly)

**SHOT A → `public/space/prop-01.png`**
```
SHOT A. 1:1. Floating 16mm film reel, black metal flanges, a short tail of red leader hanging off the core. 3/4 view, slightly above. Void #120608. No edge print, no brand on the reel.
```

**SHOT B → `public/space/prop-02.png`**
```
SHOT B. 1:1. Floating matte-black cinema camera body, no brand, compact, one small red tally LED lit. 3/4 front, lens capped in black. Void #120608.
```

**SHOT C → `public/space/prop-03.png`**
```
SHOT C. 1:1. Floating unbranded clapperboard, sticks closed, slate face is blank plaster #F6F1EE, hinge and sticks #C8102E. 3/4 view. Void #120608. No letters on the slate.
```

**SHOT D → `public/space/prop-04.png`** (journey card face)
```
SHOT D. 1:1. Thick 3D slab like a physical card: 18mm deep, plaster face #F6F1EE, edges matte black, one red edge-paint on the left 4mm. Floating, 3/4, void #120608. No type on the face.
```

**SHOT E → `public/space/prop-05.png`**
```
SHOT E. 1:1. Floating compact LED film light, black housing, barn doors slightly open, warm tungsten throw, no brand. 3/4. Void #120608.
```

**SHOT F → `public/space/prop-06.png`**
```
SHOT F. 1:1. Floating geometric block: a 120mm cube, three faces visible, two faces #120608 metal, one face #C8102E. Sharp edges, no logos. Void #120608.
```

If Gemini adds a table, marble, gold, or paper: `Regenerate. Object floats in a solid #120608 void. No set dressing.`
