HOW TO ADD REAL PHOTOGRAPHS
============================

This folder holds the real photographs shown on each neckerchief's
detail page. The gallery grid keeps using the small vector icons in
/images — only the detail page looks in here.

TO ADD A PHOTO
---------------
1. Name your photo file to match the neckerchief's "id" in js/data.js,
   using a .jpg extension. For example, the entry with id "harvest-ridge"
   expects a file at:

     images/full/harvest-ridge.jpg

2. Drop the file into this folder. That's it — no code changes needed.
   The detail page will pick it up automatically.

3. If you'd rather use .png or .webp, that's fine — just update the
   matching "fullImage" path for that item in js/data.js to end in
   .png or .webp instead of .jpg.

FILENAMES EXPECTED FOR THE CURRENT COLLECTION
-----------------------------------------------
  harvest-ridge.jpg
  northern-pine.jpg
  copper-trail.jpg
  alpine-summit.jpg
  meadow-watch.jpg
  silver-birch.jpg
  iron-ridge.jpg
  golden-valley.jpg
  cedar-hollow.jpg
  falcon-crest.jpg
  highland-moor.jpg
  amber-field.jpg
  riverstone.jpg
  frostwood.jpg
  thistle-down.jpg
  ember-peak.jpg
  windward-bay.jpg
  larkspur-ridge.jpg

PHOTO TIPS (for the museum look)
----------------------------------
- Shoot on a neutral, uncluttered background (light grey, white, or
  a plain surface) so the neckerchief reads as an isolated object.
- Even, soft lighting with minimal harsh shadows works best.
- A portrait-ish or square crop fits the display stage nicely;
  the image is shown at its natural proportions either way.
- Any resolution works — moderately high resolution (at least
  1200px on the long edge) will look sharpest.

WHILE A PHOTO IS MISSING
--------------------------
If a file isn't present yet, that neckerchief's detail page will
automatically show its catalogue icon instead, with a small
"Photograph pending" note — the site never breaks, it just tells
you what's still left to catalogue.
