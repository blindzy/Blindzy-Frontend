# Blindzy Website — Content Editing Guide

This guide is written for someone with **no coding experience**, using nothing
more than the file manager (File Explorer on Windows, Finder on Mac) and
Notepad (Windows) or TextEdit (Mac). No special software required.

If you ever get stuck or something looks broken after an edit, **do not
panic** — just undo your change (Ctrl+Z / Cmd+Z, then save again), or send
the file to your developer. Nothing you do in these files can break the
website permanently as long as you don't publish/upload a broken file.

---

## 🎥 VIDEO GUIDE: Overview (placeholder)

*[Video to be added here: 2-minute walkthrough of opening the project folder
and finding the two files you'll use most — `site-content.ts` and the
`public/images` folder.]*

---

## The two things you'll ever need to touch

1. **Text on the website** → one single file:
   `src/data/site-content.ts`
2. **Photos on the website** → the picture files inside the
   `public/images` folder.

You do not need to touch anything else. Every other file is code that makes
the website work and should be left alone.

---

## Part 1 — Editing text (`site-content.ts`)

### How to open it

1. Open the project folder in File Explorer / Finder.
2. Go into `src` → `data`.
3. Right-click `site-content.ts` → **Open with** → **Notepad** (Windows) or
   **TextEdit** (Mac).
   - On Mac, if TextEdit adds formatting and breaks things, use TextEdit's
     menu **Format → Make Plain Text** first, or ask your developer to
     install a free plain-text editor like Notepad++ / VS Code.

### 🎥 VIDEO GUIDE: Opening and editing site-content.ts (placeholder)

*[Video to be added here: opening the file in Notepad, changing one sentence,
saving it.]*

### The Golden Rules

- Only change words that are **between quote marks**, like this:
  `heading: "Installing Blinds Made Easy",`
  You can change the words inside the quotes. Do **not** delete the quote
  marks `"` themselves.
- Every line ends with a comma `,` — leave those alone.
- Every section is wrapped in curly brackets `{ }` and square brackets
  `[ ]` — leave those alone too. If you accidentally delete one, the whole
  website can stop working, so if in doubt, close Notepad **without
  saving** and start again.
- If a piece of text contains an apostrophe (like `We'd love to hear`), it's
  already been typed carefully — you can still edit the sentence, just don't
  remove the surrounding quote marks.
- Save the file when you're done (Ctrl+S / Cmd+S). Keep the file name and
  location exactly the same.

### What's in the file, section by section

The file is split into clearly labelled sections, in this order:

| Section                                  | What it controls                                                                                                                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. HERO SECTION**                | The big heading, paragraph and two buttons at the very top of the homepage, plus the 4 small white cards ("Free Delivery", "10 Years Warranty", "Made in Australia", "Install Yourself") |
| **2. PRODUCT CARDS**               | The Blinds / Curtains / Shutters cards on the homepage                                                                                                                                   |
| **3. WHY CHOOSE US?**              | The scrolling green carousel of short reasons                                                                                                                                            |
| **4. HAVE ANY QUESTIONS?**         | The heading, paragraph, buttons and 3 photo tiles above the footer                                                                                                                       |
| **5. ABOUT US**                    | The "About Us" heading, paragraph and photo                                                                                                                                              |
| **6. WHAT OUR CLIENTS ARE SAYING** | Just the heading — the actual customer reviews come from a separate admin system, not this file (ask your developer if you need the login for that)                                     |

### Example: changing hero text

Find this near the top of the file:

```
export const heroContent = {
  heading: "Installing Blinds Made Easy",
  paragraph: "Welcome to Blindzy, your trusted source for custom DIY window furnishings...",
```

To change the heading, just retype the words between the quotes:

```
  heading: "Australia's Favourite DIY Blinds",
```

Then save.

### Example: adding a new product card (e.g. a 4th product)

Find the `productsData` list. Each product looks like this:

```
  {
    id: 3,
    name: "Shutters",
    description: "Plantation shutters are durable, louvered window coverings...",
    image: "/images/product/shutters.png",
    backgroundImage: "/images/product/product3.jpg",
    link: "/shutters",
  },
```

To add a new one:

1. Select and copy one whole block, from its `{` to its `},`.
2. Paste it just before the closing `];`.
3. Give it a new `id` number (one higher than the last one).
4. Change `name`, `description`, `image`, `backgroundImage` and `link`.
5. Make sure `image` and `backgroundImage` point to picture files that
   actually exist in `public/images/product/` (see Part 2 below for how to
   add new pictures).

### 🎥 VIDEO GUIDE: Adding a new product card (placeholder)

*[Video to be added here: copying a product block, pasting it, editing the
text, and uploading the matching images.]*

### Example: removing a card / reason / tile

Select the entire block for that item, from its opening `{` to its closing
`},`, and delete it. Leave everything else untouched.

---

## Part 2 — Changing photos

You do **not** need to open any code file to change a photo. You just
replace the picture file in the `public/images` folder, **keeping the exact
same file name**.

### Changing the hero background photo

1. Go to `public/images/hero`.
2. You'll see `hero-bg.png` (shown on computers/laptops) and `hero-bg2.png`
   (shown on phones).
3. Prepare your new photo and rename it to exactly `hero-bg.png` (and a
   phone-friendly version named `hero-bg2.png`).
4. Drag your new file into the folder and confirm "Replace" when prompted.
5. Recommended size: at least 1920×1080 pixels for `hero-bg.png`, and a
   taller/narrower crop (e.g. 1080×1400) for `hero-bg2.png`, so it doesn't
   look stretched or blurry.

### 🎥 VIDEO GUIDE: Replacing the hero background photo (placeholder)

*[Video to be added here: finding the hero images folder, resizing a photo
if needed, and replacing the file.]*

### Changing a product photo

Go to `public/images/product` and replace the relevant file (e.g.
`blinds.png`, `curtain.png`, `shutters.png`, or the larger hover photos
`product1.jpg`, `product2.jpg`, `product3.jpg`), keeping the same file name.

### Changing the "Have Any Questions?" or "About Us" photos

Go to `public/images/questions` or `public/images/about` and replace the
numbered files there the same way.

### Adding a photo with a brand new file name

If you'd rather use a new file name instead of replacing an old one:

1. Add the new picture file into the correct folder inside `public/images`.
2. Open `src/data/site-content.ts` and update the matching `image`,
   `backgroundImage`, or similar line to point at your new file name,
   e.g. `"image": "/images/product/my-new-photo.png"`.

---

## What NOT to edit yourself

- Any file ending in `.astro`, `.tsx`, or `.css` other than
  `src/data/site-content.ts` — these control layout, design and
  functionality (checkout, cart, payments, etc.) and mistakes here can break
  the site.
- Customer reviews under "What Our Clients are saying" — these are managed
  through the separate CMS admin panel, not this file. Ask your developer
  for the login if you need access.

## If something breaks

- Close the file **without saving**, and reopen it — you'll get back the
  last saved version.
- If you already saved a broken change, contact your developer with a
  description of what you changed; the file is tracked with version control
  (Git), so any change can be safely reversed.
