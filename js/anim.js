  function goToHero(index) {
    const slider = document.getElementById("hero-slider");
    slider.style.transform = `translateX(-${index * 100}%)`;

    const activeHero = document.getElementById(`hero${index + 1}`);
    activeHero.querySelectorAll('.text-area, .hero-image, .btn').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // force reflow
      el.style.animation = '';
    });
  }