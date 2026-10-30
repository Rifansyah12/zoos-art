// Navigasi dan formulir kontak digunakan oleh kedua halaman.
const contactDialog = document.querySelector("#contact-dialog");
const contactMessage = document.querySelector("#contact-message");
const whatsappLink = document.querySelector("#whatsapp-link");
const contactConfigNote = document.querySelector("#contact-config-note");
const copyStatus = document.querySelector("#copy-status");
const mainNav = document.querySelector("#main-nav");
const menuToggle = document.querySelector(".menu-toggle");

function updateWhatsAppLink() {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  const hasNumber = number.length >= 8;
  whatsappLink.hidden = !hasNumber;
  contactConfigNote.hidden = hasNumber;
  if (hasNumber) {
    whatsappLink.href = `https://wa.me/${number}?text=${encodeURIComponent(contactMessage.value)}`;
  } else {
    whatsappLink.removeAttribute("href");
  }
}

function openContact(product = null) {
  contactMessage.value = product
    ? `Halo Zoos ART, saya tertarik dengan ${product.name} (${product.id}). Bolehkah saya mendapatkan informasi lebih lanjut tentang harga dan ketersediaannya? Terima kasih.`
    : "Halo Zoos ART, saya ingin bertanya tentang koleksi Anda. Terima kasih.";
  copyStatus.textContent = "";
  updateWhatsAppLink();
  contactDialog.showModal();
}

function closeMenu() {
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  mainNav.classList.toggle("is-open", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Buka menu" : "Tutup menu");
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.querySelectorAll("[data-contact]").forEach((button) => {
  button.addEventListener("click", () => openContact());
});
document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
contactMessage.addEventListener("input", () => {
  copyStatus.textContent = "";
  updateWhatsAppLink();
});
document.querySelector("#copy-message").addEventListener("click", async () => {
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(contactMessage.value);
    copyStatus.textContent = "Pesan berhasil disalin.";
  } catch (error) {
    contactMessage.focus();
    contactMessage.select();
    try {
      copyStatus.textContent = document.execCommand("copy")
        ? "Pesan berhasil disalin."
        : "Pilih dan salin pesan secara manual.";
    } catch (copyError) {
      copyStatus.textContent = "Pilih dan salin pesan secara manual.";
    }
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
