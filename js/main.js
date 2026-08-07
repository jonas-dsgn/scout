/* Scout Necker Archive — shared behaviour */

function accessionAlt(item){
  return `${item.name} — folded museum-style illustration of the ${item.name.toLowerCase()} neckerchief`;
}

function cardHTML(item, index){
  return `
    <a class="necker-card" href="detail.html?id=${item.id}" style="animation-delay:${Math.min(index * 40, 480)}ms">
      <div class="card-frame">
        <span class="card-accession">${item.accession}</span>
        <span class="card-tag">${item.type}</span>
        <img src="${item.image}" alt="${accessionAlt(item)}" loading="lazy">
      </div>
      <div class="card-caption">
        <h3>${item.name}</h3>
        <span class="card-cat">${item.category}</span>
      </div>
    </a>`;
}

function renderCollectionStats(){
  const count = NECKERS.length;
  const typeCount = new Set(NECKERS.map(n => n.type)).size;
  const categoryCount = new Set(NECKERS.map(n => n.category)).size;

  document.querySelectorAll(".count-pill").forEach(el => {
    el.textContent = `${count} object${count === 1 ? "" : "s"}`;
  });

  const cataloguedCount = document.getElementById("cataloguedCount");
  if(cataloguedCount){ cataloguedCount.textContent = `${count} OBJECTS CATALOGUED`; }

  const objectsCount = document.getElementById("objectsCount");
  if(objectsCount){ objectsCount.textContent = count; }

  const classificationsCount = document.getElementById("classificationsCount");
  if(classificationsCount){ classificationsCount.textContent = typeCount; }

  const styleGroupsCount = document.getElementById("styleGroupsCount");
  if(styleGroupsCount){ styleGroupsCount.textContent = categoryCount; }
}

/* ---------------- Highlights (homepage) ---------------- */

function renderHighlights(){
  const row = document.getElementById("highlightRow");
  if(!row) return;
  const picks = NECKERS.filter((_, i) => i % 1 === 0).slice(0, 6);
  row.innerHTML = picks.map(cardHTML).join("");
}

/* ---------------- Gallery grid + filters ---------------- */

function initGallery(){
  const grid = document.getElementById("neckerGrid");
  if(!grid) return;

  const typeGroup = document.getElementById("typeFilters");
  const catGroup = document.getElementById("categoryFilters");
  const resultCount = document.getElementById("resultCount");
  const empty = document.getElementById("emptyState");

  const types = ["All", ...new Set(NECKERS.map(n => n.type))];
  const cats = ["All", ...new Set(NECKERS.map(n => n.category))];

  let activeType = "All";
  let activeCat = "All";

  function pillsHTML(list, activeValue){
    return list.map(v =>
      `<button class="pill${v === activeValue ? " active" : ""}" data-value="${v}">${v}</button>`
    ).join("");
  }

  typeGroup.innerHTML = pillsHTML(types, activeType);
  catGroup.innerHTML = pillsHTML(cats, activeCat);

  function render(){
    const filtered = NECKERS.filter(n =>
      (activeType === "All" || n.type === activeType) &&
      (activeCat === "All" || n.category === activeCat)
    );

    grid.innerHTML = filtered.map(cardHTML).join("");
    resultCount.textContent = `${filtered.length} of ${NECKERS.length} objects`;
    empty.classList.toggle("show", filtered.length === 0);
  }

  function bindPills(group, onSelect){
    group.addEventListener("click", e => {
      const btn = e.target.closest(".pill");
      if(!btn) return;
      [...group.children].forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      onSelect(btn.dataset.value);
      render();
    });
  }

  bindPills(typeGroup, v => activeType = v);
  bindPills(catGroup, v => activeCat = v);

  render();
}

/* ---------------- Detail page ---------------- */

function initDetail(){
  const stage = document.getElementById("detailStage");
  if(!stage) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const item = NECKERS.find(n => n.id === id) || NECKERS[0];
  const index = NECKERS.findIndex(n => n.id === item.id);
  const images = [item.image];
  if(item.fullImage && item.fullImage !== item.image){ images.push(item.fullImage); }

  document.title = `${item.name} — Scout Necker Archive`;

  stage.innerHTML = `
    <div class="image-carousel" id="imageCarousel">
      <div class="carousel-track">
        ${images.map((src, imageIndex) => `
          <div class="carousel-slide${imageIndex === 0 ? " active" : ""}">
            <img id="stageImg${imageIndex}" src="${src}" alt="${accessionAlt(item)}">
          </div>
        `).join("")}
      </div>
      <button class="carousel-btn prev" id="carouselPrev" type="button" aria-label="Previous image">←</button>
      <button class="carousel-btn next" id="carouselNext" type="button" aria-label="Next image">→</button>
      <div class="carousel-dots" id="carouselDots">
        ${images.map((_, imageIndex) => `
          <button class="carousel-dot${imageIndex === 0 ? " active" : ""}" data-index="${imageIndex}" type="button" aria-label="Go to image ${imageIndex + 1}"></button>
        `).join("")}
      </div>
    </div>
    <span class="stage-accession">${item.accession}</span>
    <span class="stage-pending" id="stagePending" hidden>Photograph pending — archive icon shown</span>
  `;

  const slides = [...stage.querySelectorAll(".carousel-slide")];
  const prevButton = document.getElementById("carouselPrev");
  const nextButton = document.getElementById("carouselNext");
  const dots = [...stage.querySelectorAll(".carousel-dot")];
  const stagePending = document.getElementById("stagePending");
  let currentIndex = 0;

  function updateCarousel(nextIndex){
    currentIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === currentIndex));
    dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentIndex));
  }

  if(slides.length <= 1){
    if(prevButton) prevButton.hidden = true;
    if(nextButton) nextButton.hidden = true;
    if(dots.length) dots.forEach(dot => dot.hidden = true);
  } else {
    prevButton?.addEventListener("click", () => updateCarousel(currentIndex - 1));
    nextButton?.addEventListener("click", () => updateCarousel(currentIndex + 1));
    dots.forEach(dot => dot.addEventListener("click", () => updateCarousel(Number(dot.dataset.index))));
  }

  slides.forEach((slide, slideIndex) => {
    const stageImg = slide.querySelector("img");
    if(!stageImg) return;

    stageImg.addEventListener("error", () => {
      stageImg.src = item.image;
      stageImg.classList.add("is-fallback");
      if(slideIndex === currentIndex){ stagePending.hidden = false; }
    }, { once: true });
  });

  updateCarousel(0);

  document.getElementById("detailEyebrow").textContent = `Object ${item.accession}`;
  document.getElementById("detailName").textContent = item.name;
  document.getElementById("metaType").textContent = item.type;
  document.getElementById("metaCategory").textContent = item.category;

  const prev = NECKERS[(index - 1 + NECKERS.length) % NECKERS.length];
  const next = NECKERS[(index + 1) % NECKERS.length];
  const prevLink = document.getElementById("prevLink");
  const nextLink = document.getElementById("nextLink");
  if(prevLink){ prevLink.href = `detail.html?id=${prev.id}`; prevLink.textContent = `← ${prev.name}`; }
  if(nextLink){ nextLink.href = `detail.html?id=${next.id}`; nextLink.textContent = `${next.name} →`; }
}

/* ---------------- Nav active state ---------------- */

function markActiveNav(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a[data-nav]").forEach(a => {
    if(a.getAttribute("data-nav") === path) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCollectionStats();
  markActiveNav();
  renderHighlights();
  initGallery();
  initDetail();
});
