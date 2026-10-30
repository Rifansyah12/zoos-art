const exhibitRail = document.querySelector("#exhibit-rail");
const previousExhibit = document.querySelector("#previous-exhibit");
const nextExhibit = document.querySelector("#next-exhibit");
const stageCurrent = document.querySelector("#stage-current");
const stageTotal = document.querySelector("#stage-total");
const detailGallery = document.querySelector("#detail-gallery");
const selectionAnnouncement = document.querySelector("#selection-announcement");
let activeIndex = 0;
let scrollTimer;
let mouseDrag = null;
let suppressClick = false;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealObserver = "IntersectionObserver" in window && !reduceMotion.matches
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

function observeReveal(element, direction = "up", delay = 0) {
  if (!revealObserver || !element) return;
  element.classList.add("scroll-reveal");
  if (direction !== "up") element.classList.add(`reveal-${direction}`);
  element.style.setProperty("--reveal-delay", `${delay}ms`);
  revealObserver.observe(element);
}

function twoDigits(number) {
  return String(number).padStart(2, "0");
}

function createExhibitCard(product, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "exhibit-card";
  button.setAttribute("aria-label", `Pilih ${product.name}, koleksi ${index + 1} dari ${products.length}`);
  button.setAttribute("aria-pressed", "false");

  const inner = document.createElement("span");
  inner.className = "exhibit-card-inner";
  const frame = document.createElement("span");
  frame.className = "exhibit-frame";
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = "";
  image.draggable = false;
  frame.append(image);

  const code = document.createElement("span");
  code.className = "exhibit-card-code";
  code.textContent = `${product.id} / ${product.category.toUpperCase()}`;
  const title = document.createElement("span");
  title.className = "exhibit-card-title";
  title.textContent = product.name;
  inner.append(frame, code, title);
  button.append(inner);
  button.addEventListener("click", () => selectExhibit(index));
  return button;
}

const exhibitCards = products.map(createExhibitCard);
exhibitRail.replaceChildren(...exhibitCards);
stageTotal.textContent = twoDigits(products.length);

function centerExhibit(index, behavior = "smooth") {
  const card = exhibitCards[index];
  if (!card) return;
  const railBounds = exhibitRail.getBoundingClientRect();
  const cardBounds = card.getBoundingClientRect();
  const target = exhibitRail.scrollLeft + cardBounds.left + cardBounds.width / 2 - railBounds.left - railBounds.width / 2;
  exhibitRail.scrollTo({ left: target, behavior: reduceMotion.matches ? "auto" : behavior });
}

function closestExhibitIndex() {
  const bounds = exhibitRail.getBoundingClientRect();
  const center = bounds.left + bounds.width / 2;
  let closest = 0;
  let distance = Infinity;
  exhibitCards.forEach((card, index) => {
    const cardBounds = card.getBoundingClientRect();
    const currentDistance = Math.abs(cardBounds.left + cardBounds.width / 2 - center);
    if (currentDistance < distance) {
      closest = index;
      distance = currentDistance;
    }
  });
  return closest;
}

function renderDetailPhotos(product) {
  const hasPhotos = Array.isArray(product.photos) && product.photos.length > 0;
  const photos = hasPhotos ? product.photos : [
    { src: product.image, alt: product.alt, caption: "FOTO UTAMA / CONTOH" },
    { src: product.image, alt: `Potongan detail dari ${product.alt}`, caption: "DETAIL FOTO / CONTOH", crop: true }
  ];
  const figures = photos.map((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = "detail-photo";
    const imageContainer = document.createElement("div");
    imageContainer.className = "detail-photo-image";
    imageContainer.classList.toggle("is-detail-crop", Boolean(photo.crop));
    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.alt || product.alt;
    image.loading = "lazy";
    imageContainer.append(image);

    const caption = document.createElement("figcaption");
    const label = document.createElement("span");
    label.textContent = photo.caption || `FOTO ${twoDigits(index + 1)}`;
    const number = document.createElement("span");
    number.textContent = `${product.id} / ${twoDigits(index + 1)}`;
    caption.append(label, number);
    figure.append(imageContainer, caption);
    observeReveal(figure, index % 2 === 0 ? "left" : "right", index % 2 === 0 ? 0 : 120);
    return figure;
  });
  if (revealObserver) detailGallery.querySelectorAll(".scroll-reveal").forEach((element) => revealObserver.unobserve(element));
  detailGallery.replaceChildren(...figures);
  document.querySelector("#gallery-example-note").hidden = hasPhotos;
}

function updateExhibitDetail(product) {
  document.querySelector("#object-code").textContent = product.id;
  document.querySelector("#object-title").textContent = product.name;
  document.querySelector("#object-description").textContent = product.description;
  const image = document.querySelector("#object-image");
  image.src = product.image;
  image.alt = product.alt;
  document.querySelector("#object-photo-background").style.backgroundImage = `url(${JSON.stringify(product.image)})`;
  document.querySelector("#plaque-code").textContent = product.id;
  document.querySelector("#plaque-title").textContent = product.name;
  document.querySelector("#plaque-category").textContent = product.category;

  const history = document.querySelector("#object-history");
  const paragraphs = Array.isArray(product.history) && product.history.length
    ? product.history
    : ["Riwayat koleksi ini akan dilengkapi dengan informasi lebih lanjut."];
  history.replaceChildren(...paragraphs.map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));
  document.querySelector("#fact-category").textContent = product.category;
  document.querySelector("#fact-period").textContent = product.period || "Belum dicantumkan";
  document.querySelector("#fact-origin").textContent = product.origin || "Belum dicantumkan";
  document.querySelector("#order-product").textContent = product.name;
  document.querySelector("#order-code").textContent = product.id;
  renderDetailPhotos(product);
}

function selectExhibit(index, options = {}) {
  const nextIndex = Math.max(0, Math.min(index, products.length - 1));
  const changed = nextIndex !== activeIndex;
  activeIndex = nextIndex;
  exhibitCards.forEach((card, cardIndex) => {
    const active = cardIndex === activeIndex;
    card.classList.toggle("is-active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  previousExhibit.disabled = activeIndex === 0;
  nextExhibit.disabled = activeIndex === products.length - 1;
  stageCurrent.textContent = twoDigits(activeIndex + 1);
  updateExhibitDetail(products[activeIndex]);
  if (changed && options.announce !== false) {
    selectionAnnouncement.textContent = `Koleksi terpilih: ${products[activeIndex].name}`;
  }
  if (options.center !== false) centerExhibit(activeIndex, options.behavior || "smooth");
}

previousExhibit.addEventListener("click", () => selectExhibit(activeIndex - 1));
nextExhibit.addEventListener("click", () => selectExhibit(activeIndex + 1));
exhibitRail.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    selectExhibit(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});
exhibitRail.addEventListener("scroll", () => {
  clearTimeout(scrollTimer);
  if (mouseDrag && mouseDrag.moved) return;
  scrollTimer = setTimeout(() => {
    const closest = closestExhibitIndex();
    if (closest !== activeIndex) selectExhibit(closest, { center: false });
  }, 140);
}, { passive: true });

// Mouse users can drag the exhibition; touch and trackpad scrolling remain native.
exhibitRail.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button === 0) {
    mouseDrag = { startX: event.clientX, startScroll: exhibitRail.scrollLeft, moved: false };
  }
});
window.addEventListener("pointermove", (event) => {
  if (!mouseDrag || event.pointerType !== "mouse") return;
  const distance = event.clientX - mouseDrag.startX;
  if (Math.abs(distance) > 8) {
    mouseDrag.moved = true;
    exhibitRail.style.scrollSnapType = "none";
    exhibitRail.classList.add("is-dragging");
    exhibitRail.scrollLeft = mouseDrag.startScroll - distance;
    event.preventDefault();
  }
});
window.addEventListener("pointerup", () => {
  if (!mouseDrag) return;
  if (mouseDrag.moved) {
    suppressClick = true;
    exhibitRail.style.scrollSnapType = "";
    exhibitRail.classList.remove("is-dragging");
    selectExhibit(closestExhibitIndex());
    setTimeout(() => { suppressClick = false; }, 0);
  }
  mouseDrag = null;
});
exhibitRail.addEventListener("click", (event) => {
  if (suppressClick) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);

document.querySelector("#order-contact").addEventListener("click", () => openContact(products[activeIndex]));
window.addEventListener("resize", () => centerExhibit(activeIndex, "auto"));

[
  [".object-heading > div", "left", 0],
  [".object-heading > p", "right", 120],
  [".object-photo-frame", "up", 0],
  [".object-plaque", "up", 100],
  [".object-story-heading", "left", 0],
  [".object-story-text", "right", 100],
  [".gallery-heading > div", "left", 0],
  [".gallery-heading > p", "right", 120],
  [".order-copy", "left", 0],
  [".order-card", "right", 120]
].forEach(([selector, direction, delay]) => observeReveal(document.querySelector(selector), direction, delay));

const requestedId = new URLSearchParams(window.location.search).get("id");
const requestedIndex = products.findIndex((product) => product.id === requestedId);
const initialIndex = requestedIndex >= 0 ? requestedIndex : Math.min(1, products.length - 1);
selectExhibit(initialIndex, { center: false, announce: false });
requestAnimationFrame(() => {
  centerExhibit(initialIndex, "auto");
});
