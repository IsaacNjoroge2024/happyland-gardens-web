# Happyland Gardens Content Update Guide

This guide explains how non-technical staff can update site content by editing
data files, without writing application code. All site content lives in the
`data/` directory. Changes are deployed automatically through Git.

---

## Quick Reference: Where Content Lives

| Content             | File               | Notes                                 |
| ------------------- | ------------------ | ------------------------------------- |
| Contact info        | `data/contact.ts`  | Phone, address, hours, social links   |
| Events              | `data/events.ts`   | Event types, descriptions, capacities |
| Gallery images      | `data/gallery.ts`  | Image list with alt text              |
| About us & features | `data/about.ts`    | Mission, story, amenities, features   |
| Hero section        | `data/hero.ts`     | Headline, images, CTAs                |
| SEO metadata        | `data/metadata.ts` | Page titles, descriptions, keywords   |

All of these files are exported centrally through `data/index.ts`.

---

## How to Update Content

### Updating Contact Information

**File:** `data/contact.ts`

This file controls every piece of contact information shown on the site —
phone number, WhatsApp number, email, address, Google Maps links, social media
URLs, and business hours.

Steps:

1. Open `data/contact.ts`.
2. Edit the relevant field (e.g. change `phone`, `address`, or update
   `businessHours`).
3. If you change the physical address, also update `location` (latitude /
   longitude), `mapsLink`, `mapsLinkMobile`, and `mapsLinkDesktop` to match.
4. Run `npm run dev` and check the Footer and the Booking modal to confirm the
   change appears everywhere.
5. Commit and push to deploy.

Example — changing the phone number:

```typescript
phone: "+254123456789",
whatsapp: "+254123456789",
```

> Note: The phone number must be in Kenya format: `+254` followed by 9 digits.

---

### Updating Events

**File:** `data/events.ts`

Each event type is an object in the `eventTypes` array. You can add, remove,
or edit event types here.

Each event object contains:

- `id` — unique identifier (no spaces, use hyphens)
- `name` — display name shown on the site
- `slug` — URL-friendly version of the name
- `description` — short description shown on the event card
- `images` — array of image paths for the event gallery slideshow
- `features` — array of feature strings shown on the event detail
- `capacity` — maximum number of guests
- `icon` — icon name (used internally)

**Adding a new event type:**

1. Add your new event images to `public/images/gallery/` (see Image Management
   below).
2. Copy an existing event object in `data/events.ts` and update all fields.
3. Make sure `id` and `slug` are unique and use hyphens (e.g. `"bbq-nights"`).
4. Add image paths to the `images` array using the format
   `/images/gallery/your-image.webp`.
5. Test locally with `npm run dev`, then commit and push.

**Removing an event type:**

Delete the entire object from the array. If the images are no longer used
anywhere, you may also remove them from `public/images/gallery/`.

---

### Updating Gallery Images

**File:** `data/gallery.ts`

The gallery on the homepage pulls its images from this file. Each entry has:

- `id` — unique identifier (e.g. `"gallery-25"`)
- `src` — path to the image file (e.g. `/images/gallery/your-image.webp`)
- `alt` — descriptive text for the image (required for accessibility)
- `category` — currently `"All"` for all images
- `eventType` — the type of event (e.g. `"Wedding"`, `"Corporate"`)

**Adding a new gallery image:**

1. Prepare and compress your image (see Image Management below).
2. Place it in `public/images/gallery/`.
3. Add a new entry to the `galleryImages` array in `data/gallery.ts`:

```typescript
{
  id: "gallery-25",
  src: "/images/gallery/your-new-image.webp",
  alt: "Description of what is happening in the image",
  category: "All",
  eventType: "Wedding",
},
```

4. Test locally, then commit and push.

---

### Updating About Us Text

**File:** `data/about.ts`

Controls the About section on the homepage. Fields you can update:

- `mission` — the mission statement shown at the top of the About section
- `story` — array of paragraphs telling the company story (each string is one
  paragraph)
- `highlights` — bullet-point list of venue highlights
- `amenities` — list of additional amenities (e.g. `"Bar & Restaurant"`)
- `established` — the year the venue was established
- `features` — the feature cards shown under "Why Choose Happyland Gardens"
  each with an `icon`, `title`, and `description`

**Available feature icons** (used in the `features` array):

| Icon name                 | Visual meaning      |
| ------------------------- | ------------------- |
| `HiSparkles`              | Sparkle / special   |
| `HiUsers`                 | People              |
| `HiCalendarDays`          | Calendar            |
| `HiSquare3Stack3D`        | Layers / facilities |
| `HiUserGroup`             | Team / group        |
| `HiAdjustmentsHorizontal` | Settings / custom   |

---

### Updating the Hero Section

**File:** `data/hero.ts`

Controls the slideshow and text at the very top of the homepage.

- `headline` — the large title text
- `subheadline` — the subtitle below it
- `description` — the paragraph under the subtitle
- `primaryCta` — the main call-to-action button (`text` and `href`)
- `secondaryCta` — the secondary button (the "Contact Us" button opens the
  booking modal regardless of `href`)
- `images` — array of `{ src, alt }` objects for the slideshow
- `slideshowInterval` — time in milliseconds between slides (default 5000)

---

### Updating SEO Metadata

**File:** `data/metadata.ts`

Controls the browser tab title, meta description, and social sharing cards
(Open Graph / Twitter Card).

- `siteName` — the site title used in `<title>` tags
- `siteDescription` — the default meta description
- `siteUrl` — the production URL of the site
- `ogImage` — path to the Open Graph image used in social shares
- `keywords` — array of SEO keywords

---

## Image Management

### Image Locations

| Image type        | Directory                | Used by                         |
| ----------------- | ------------------------ | ------------------------------- |
| Event card images | `public/images/events/`  | Event cards and hero slideshow  |
| Gallery images    | `public/images/gallery/` | Homepage gallery & event modals |
| Hero images       | `public/images/hero/`    | Available for hero slideshow    |
| OG / social image | `public/images/`         | Social sharing previews         |

### Optimal Dimensions

| Image type     | Recommended dimensions | Format                    |
| -------------- | ---------------------- | ------------------------- |
| Event card     | 1200 x 900 px          | WebP (converted at build) |
| Gallery image  | 1600 x 1200 px         | WebP (converted at build) |
| Hero slideshow | 1920 x 1080 px         | WebP (converted at build) |
| OG / social    | 1200 x 634 px          | PNG (keep as-is)          |

### File Size Limits

- **Target:** under 500 KB per image after compression.
- The build pipeline (`npm run optimize-images`) converts PNG source files to
  WebP automatically before each production build. Source PNGs can be kept for
  archival, but `.webp` paths are what you reference in the data files.
- At serve time, Next.js delivers **AVIF** to browsers that support it (AVIF is
  intentionally preferred — it is ~50% smaller than WebP). Browsers that do not
  support AVIF receive **WebP** as a fallback. This is controlled by the
  `images.formats` order in `next.config.ts` and requires no action from
  content editors.

### File Naming Convention

- Use lowercase letters, numbers, and hyphens only. No spaces or special
  characters.
- Be descriptive so the file is easy to identify.
- Gallery images follow the pattern:
  `happyland-gardens-[activity]-gallery.webp`
- Event card images follow the pattern: `[event-type]-card.webp`

Examples:

```
happyland-gardens-bbq-night-gallery.webp    (good)
BBQ Night Gallery.png                       (bad — spaces and capitals)
img_0042.png                                (bad — not descriptive)
```

### Adding a New Image (Step by Step)

1. Take or obtain the image.
2. Resize to the recommended dimensions for its type (see table above).
3. Compress using a tool such as TinyPNG (<https://tinypng.com>).
4. Rename following the naming convention above.
5. Place the file in the correct directory under `public/images/`.
6. Update the relevant data file (`data/gallery.ts`, `data/events.ts`, or
   `data/hero.ts`) to reference the new image path.
7. Run `npm run dev` and verify the image loads correctly.
8. Commit and push to deploy.

---

## Deployment Process

All content changes are deployed automatically through Vercel when pushed to
the `main` branch. Follow these steps:

1. Make your content changes in the data files (see sections above).
2. Test locally:
   ```bash
   npm run dev
   ```
   Open <http://localhost:3000> and verify your changes look correct.
3. Run the content validation script to catch issues before committing:
   ```bash
   npm run validate-content
   ```
4. Commit your changes:
   ```bash
   git add data/
   git commit -m "Update [what you changed, e.g. gallery images]"
   ```
5. Push to GitHub:
   ```bash
   git push
   ```
6. Vercel automatically builds and deploys the site.
7. Verify the change is live on the production site.

---

## Monthly Admin Checklist

Run through this checklist once a month to keep the site fresh:

- [ ] Review and update event images — remove outdated photos, add recent ones
- [ ] Verify contact information is current (phone, email, address, hours)
- [ ] Add any new gallery images from recent events
- [ ] Review and update the About Us text if anything has changed
- [ ] Check that all external links (social media, Google Maps) still work
- [ ] Run `npm run validate-content` to confirm all image paths are valid

---

## Backup Strategy

### Version Control (Git)

All content is stored in Git. Every change is tracked automatically, so you
can always view or restore a previous version:

- View the history of a file:
  ```bash
  git log data/events.ts
  ```
- Restore a file to a previous version:
  ```bash
  git checkout <commit-hash> -- data/events.ts
  ```

### Image Backups

Git is not ideal for storing large image files long-term. Follow these
practices:

- Keep original (uncompressed) images in a shared folder such as Google Drive
  or Dropbox.
- Do not rely solely on the Git repository for image recovery.
- Periodically back up the `public/images/` folder to the shared storage.

---

## Content Validation Script

A validation script is available to catch common content issues before
deploying:

```bash
npm run validate-content
```

It checks:

- All image paths referenced in data files exist in `public/`.
- Phone numbers match the expected Kenya format (`+254XXXXXXXXX`).
- Required fields are present in each data file.

Run this before every deploy as part of your workflow.

---

## Troubleshooting

**Image not showing up:**

1. Confirm the file is in the correct directory under `public/images/`.
2. Check that the path in the data file matches exactly (case-sensitive, no
   typos).
3. Run `npm run validate-content` to identify missing images.

**Phone number displaying incorrectly:**
The phone number in `data/contact.ts` must be in the format `+254XXXXXXXXX`
(no spaces or dashes). The site formats it for display automatically.

**Site not updating after a push:**
Vercel deploys take a short time after a push. If the change still does not
appear after a few minutes, check the Vercel dashboard for any build errors.
