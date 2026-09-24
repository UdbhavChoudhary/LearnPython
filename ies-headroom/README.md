# Headroom for Intuit Enterprise Suite

Case study submission for the Intuit PM internship.

| Deliverable | File |
|---|---|
| Q1. Clickable prototype | `prototype/index.html` (one self-contained page, no build step) |
| Q2. Slide deck (10 slides) | `deck/Headroom_IES_Deck.pptx` and `deck/Headroom_IES_Deck.pdf` |
| Q3. Video script | `video-script.md` |
| Research and AI process | `research/index.html` |

## Before you submit

1. Add your bio on slide 1 (the text in square brackets).
2. Deploy the prototype and research page, then update the two links on slides 1, 2 and 6.
3. Read every number on slides 4, 7 and 10. They come from the assumptions listed on the research page. Be ready to explain each one.

## Deploy on Vercel

1. Go to vercel.com, choose "Add New Project" and import this GitHub repository.
2. Set the root directory to `ies-headroom` and leave the framework as "Other". No build command is needed.
3. After it deploys, the prototype is at `/prototype/` and the research page at `/research/`.

## Rebuild the deck

The deck is generated from `deck/build.js` with pptxgenjs:

```
cd ies-headroom/deck
npm install pptxgenjs
node build.js Headroom_IES_Deck.pptx
```

Screenshots used in the deck are in `deck/assets/`.
