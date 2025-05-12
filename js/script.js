const productList = document.getElementById("productList");
let scrollTimeout;

// Tombol prev
document.getElementById("prevBtn").addEventListener("click", () => {
  productList.scrollBy({ left: -300, behavior: 'smooth' });
  showScrollbarTemporarily();
});

// Tombol next
document.getElementById("nextBtn").addEventListener("click", () => {
  productList.scrollBy({ left: 300, behavior: 'smooth' });
  showScrollbarTemporarily();
});

// Fungsi untuk munculkan scrollbar sementara
function showScrollbarTemporarily() {
  productList.classList.add("show-scrollbar");
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    productList.classList.remove("show-scrollbar");
  }, 2000); // hilang setelah 2 detik
}

// Trigger juga saat scroll manual
productList.addEventListener("scroll", showScrollbarTemporarily);
