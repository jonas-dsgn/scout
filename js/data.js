/*
  SCOUT NECKER ARCHIVE — COLLECTION DATA
  ----------------------------------------------------
  To add a new neckerchief to the archive, add a new
  object to the NECKERS array below. Each entry needs:

    id         — unique slug, used in the URL (?id=...)
    accession  — museum-style catalog number (free text)
    name       — display name of the piece
    type       — used by the "Type" filter
    category   — used by the "Style" filter
    image      — icon shown on the gallery card (svg, in /images)
    fullImage  — real photograph shown on the detail page
                 (in /images/full — see the README there)

  New "type" or "category" values are picked up by the
  filter bar automatically — no other code changes needed.

  If a fullImage file hasn't been added yet, the detail
  page automatically falls back to the gallery icon and
  shows a small "photograph pending" note, so the site
  never breaks while photos are still being catalogued.
*/

const NECKERS = [
  { id: "hong-kong",  accession: "SC.001", name: "Hong Kong National",   type: "National",       category: "Solid",    image: "images/necker-01.svg", fullImage: "images/full/necker-01.png" },
  { id: "austria",  accession: "SC.002", name: "Austria National",   type: "National",       category: "Striped",  image: "images/necker-02.svg", fullImage: "images/full/necker-02.png" },
  { id: "nepal",  accession: "SC.003", name: "Nepal National",   type: "National",       category: "Border",    image: "images/necker-03.svg", fullImage: "images/full/necker-03.png" },
  { id: "taiwan-girl",  accession: "SC.004", name: "Taiwan Girl National",   type: "National",       category: "Patterned",    image: "images/necker-04.svg", fullImage: "images/full/necker-04.png" },
];
