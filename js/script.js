document.addEventListener("DOMContentLoaded", function () {
  // === KATEGORI PRODUK SLIDER (dengan tombol dan scrollbar sementara) ===
  const productList = document.getElementById("productList");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let scrollTimeout;

  if (productList && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      productList.scrollBy({ left: -300, behavior: 'smooth' });
      showScrollbarTemporarily();
    });

    nextBtn.addEventListener("click", () => {
      productList.scrollBy({ left: 300, behavior: 'smooth' });
      showScrollbarTemporarily();
    });

    productList.addEventListener("scroll", showScrollbarTemporarily);

    function showScrollbarTemporarily() {
      productList.classList.add("show-scrollbar");
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        productList.classList.remove("show-scrollbar");
      }, 2000); // Hilangkan scrollbar setelah 2 detik
    }
  }
});
  function goToHero(index) {
    const slider = document.getElementById("hero-slider");
    slider.style.transform = `translateX(-${index * 100}%)`;
  }