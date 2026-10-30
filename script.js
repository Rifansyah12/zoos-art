const productGrid = document.querySelector("#product-grid");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#collection-search");
const filterButtons = document.querySelectorAll(".filter");
const productDialog = document.querySelector("#product-dialog");
let activeFilter = "Semua";
let selectedProduct = null;

function createArrowIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  use.setAttribute("href", "#icon-arrow-diagonal");
  svg.append(use);
  return svg;
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const imageButton = document.createElement("button");
  imageButton.type = "button";
  imageButton.className = "product-image-button";
  imageButton.setAttribute("aria-label", `Lihat detail ${product.name}`);
  imageButton.addEventListener("click", () => openProduct(product));

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.alt;
  image.loading = "lazy";

  const number = document.createElement("span");
  number.className = "product-number";
  number.textContent = product.id;

  const imageArrow = document.createElement("span");
  imageArrow.className = "product-image-arrow";
  imageArrow.append(createArrowIcon());
  imageButton.append(image, number, imageArrow);

  const info = document.createElement("div");
  info.className = "product-info";
  const category = document.createElement("p");
  category.className = "product-category";
  category.textContent = product.category;

  const title = document.createElement("button");
  title.type = "button";
  title.className = "product-title-button";
  title.textContent = product.name;
  title.addEventListener("click", () => openProduct(product));

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = "Harga atas permintaan";
  info.append(category, title, price);
  card.append(imageButton, info);
  return card;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("id");
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeFilter === "Semua" || product.category === activeFilter;
    const searchableText = `${product.name} ${product.category} ${product.id} ${product.description}`.toLocaleLowerCase("id");
    return matchesCategory && searchableText.includes(query);
  });

  productGrid.replaceChildren(...visibleProducts.map(createProductCard));
  productGrid.hidden = visibleProducts.length === 0;
  emptyState.hidden = visibleProducts.length !== 0;
  resultCount.textContent = `Menampilkan ${visibleProducts.length} dari ${products.length} koleksi`;
}

function setFilter(filter) {
  activeFilter = filter;
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
}

function openProduct(product) {
  selectedProduct = product;
  const detailImage = document.querySelector("#detail-image");
  detailImage.src = product.image;
  detailImage.alt = product.alt;
  document.querySelector("#detail-number").textContent = `/ ${product.id}`;
  document.querySelector("#detail-category").textContent = product.category;
  document.querySelector("#detail-title").textContent = product.name;
  document.querySelector("#detail-description").textContent = product.description;
  document.querySelector("#detail-exhibit").href = `koleksi.html?id=${encodeURIComponent(product.id)}`;
  productDialog.showModal();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});
searchInput.addEventListener("input", renderProducts);
document.querySelector("#reset-filters").addEventListener("click", () => {
  searchInput.value = "";
  setFilter("Semua");
  searchInput.focus();
});

document.querySelector(".search-trigger").addEventListener("click", () => {
  closeMenu();
  document.querySelector("#koleksi").scrollIntoView({ behavior: "smooth" });
  searchInput.focus({ preventScroll: true });
});

document.querySelector("#detail-contact").addEventListener("click", () => {
  productDialog.close();
  openContact(selectedProduct);
});
renderProducts();
