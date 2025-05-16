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

const cartSidebar = document.getElementById('cartSidebar');
cartSidebar.addEventListener('shown.bs.offcanvas', function () {
  document.body.style.overflow = 'auto'; // biar tetap bisa scroll
});



// Bagian transisi Hero DIHAPUS untuk menghilangkan efek "welcome"
// const heroUtama = document.getElementById("heroUtamaContent");
// const layananKami = document.getElementById("layananKamiContent");
// const heroImage = document.getElementById("heroImage");
// const btnLayananKami = document.getElementById("btnLayananKami");
// const btnKembali = document.getElementById("btnKembali");

// function slideTo(target, from, direction, newImage) {
//   from.classList.remove("active");
//   from.classList.add(direction === "left" ? "exit-left" : "exit-right");

//   setTimeout(() => {
//     from.classList.remove("exit-left", "exit-right");
//     target.classList.add("active");
//     heroImage.src = newImage;
//   }, 600);
// }

// btnLayananKami.addEventListener("click", function (e) {
//   e.preventDefault();
//   slideTo(layananKami, heroUtama, "left", "assets/docter2.png");
// });

// btnKembali.addEventListener("click", function (e) {
//   e.preventDefault();
//   slideTo(heroUtama, layananKami, "right", "assets/docter.png");
// });


