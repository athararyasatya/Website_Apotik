let cartCount = 0;
const badge = document.getElementById('cart-badge');
const tanpaResepList = document.getElementById('tanpaResepList');
const cartTotalElement = document.getElementById('cartTotal');

const cartItems = {
  tanpa: [] // hanya menyimpan item tanpa resep
};

// Fungsi animasi + tambah ke cart
function animateToCart(imageElement, product) {
  const cartIcon = document.querySelector('.bi-cart');
  const imgRect = imageElement.getBoundingClientRect();
  const clone = imageElement.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = imgRect.left + 'px';
  clone.style.top = imgRect.top + 'px';
  clone.style.width = imgRect.width + 'px';
  clone.style.height = imgRect.height + 'px';
  clone.style.transition = 'all 0.8s ease-in-out';
  clone.style.zIndex = '1000';
  document.body.appendChild(clone);

  const cartRect = cartIcon.getBoundingClientRect();
  setTimeout(() => {
    clone.style.left = cartRect.left + 'px';
    clone.style.top = cartRect.top + 'px';
    clone.style.width = '20px';
    clone.style.height = '20px';
    clone.style.opacity = 0;
  }, 10);

  setTimeout(() => {
    clone.remove();
    cartCount++;
    badge.style.display = 'inline-block';
    badge.innerText = cartCount;
    addToCartList(product);
  }, 800);
}

// Tambah item ke cart
function addToCartList(product) {
  const existing = cartItems.tanpa.find(p => p.name === product.name);

  if (existing) {
    existing.qty++;
  } else {
    product.qty = 1;
    cartItems.tanpa.push(product);
  }

  renderCartList();
  const trigger = new bootstrap.Tab(document.querySelector(`[data-bs-target="#tanpaResep"]`));
  trigger.show();

  updateCartBadge();
  updateCartTotal();
}

// Render ulang list
function renderCartList() {
  tanpaResepList.innerHTML = '';

  cartItems.tanpa.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'd-flex align-items-center justify-content-between mb-2 border-bottom pb-2';
    div.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="${item.img}" alt="${item.name}" width="50" height="50" class="rounded">
        <div>
          <div class="fw-semibold small">${item.name}</div>
          <div class="text-muted small">Rp${item.price.toLocaleString()}</div>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${index}, -1)">-</button>
        <span>${item.qty}</span>
        <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${index}, 1)">+</button>
        <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">&times;</button>
      </div>
    `;
    tanpaResepList.appendChild(div);
  });

  updateCartBadge();
  updateCartTotal();
}

// Tambah/kurang qty
function changeQty(index, delta) {
  cartItems.tanpa[index].qty += delta;
  if (cartItems.tanpa[index].qty <= 0) {
    cartItems.tanpa.splice(index, 1);
  }
  renderCartList();
}

// Hapus item
function removeItem(index) {
  cartItems.tanpa.splice(index, 1);
  renderCartList();
}

// Klik produk TANPA RESEP
document.querySelectorAll('.card-obat').forEach(card => {
  const img = card.querySelector('img');
  const icon = card.querySelector('.cart-icon');
  const badgeText = card.querySelector('.badge').textContent.trim().toLowerCase();
  const isPerluResep = badgeText.includes('perlu');

  // Hanya untuk tanpa resep
  if (!isPerluResep && icon) {
    const name = card.querySelector('h6').textContent.trim();
    const priceText = card.querySelector('.harga-produk').textContent.trim();
    const price = parseInt(priceText.replace(/[^\d]/g, ''));
    const product = { img: img.src, name, price };

    icon.addEventListener('click', () => animateToCart(img, product));
  }
});

// Produk populer TANPA RESEP
document.querySelectorAll('.cart-icon-populer').forEach(button => {
  button.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    const isPerluResep = card.querySelector('.badge').textContent.trim().toLowerCase().includes('perlu');
    if (isPerluResep) return; // abaikan perlu resep

    const img = card.querySelector('img');
    const name = card.querySelector('.card-title').textContent.trim();
    const priceText = card.querySelector('.text-danger').textContent.trim();
    const price = parseInt(priceText.replace(/[^\d]/g, ''));
    const product = { img: img.src, name, price };

    animateToCart(img, product);
  });
});

// Toggle summary sesuai tab aktif
const summaryTanpa = document.getElementById('summaryTanpaResep');
const summaryPerlu = document.getElementById('summaryPerluResep');

const cartTabEl = document.querySelector('#cartTab');
if (cartTabEl) {
  cartTabEl.addEventListener('click', function (e) {
    const targetId = e.target.getAttribute('data-bs-target');
    if (!targetId) return;

    if (targetId === '#tanpaResep') {
      summaryTanpa.classList.remove('d-none');
      summaryPerlu.classList.add('d-none');
    } else if (targetId === '#perluResep') {
      summaryTanpa.classList.add('d-none');
      summaryPerlu.classList.remove('d-none');
    }
  });
}


// Badge jumlah item
function updateCartBadge() {
  const totalQty = cartItems.tanpa.reduce((total, item) => total + item.qty, 0);
  badge.innerText = totalQty;
  badge.style.display = totalQty > 0 ? 'inline-block' : 'none';
}

// Hitung total TANPA biaya tambahan
function updateCartTotal() {
  const total = cartItems.tanpa.reduce((sum, item) => sum + item.qty * item.price, 0);
  cartTotalElement.innerText = `Rp${total.toLocaleString()}`;
}

// Inisialisasi saat load
document.addEventListener('DOMContentLoaded', () => {
  if (badge && cartCount === 0) {
    badge.style.display = 'none';
  }
  updateCartTotal();
});


// Buat modal login dan register
 document.addEventListener('DOMContentLoaded', function () {
    const btnToRegister = document.getElementById('btnToRegister');
    const btnToLogin = document.getElementById('btnToLogin');
    const loginForm = document.getElementById('loginForm');

    // Navigasi dari Login ke Register
    if (btnToRegister) {
      btnToRegister.addEventListener('click', function (e) {
        e.preventDefault();
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
        loginModal.hide();
        new bootstrap.Modal(document.getElementById('modalRegister')).show();
      });
    }

    // Navigasi dari Register ke Login
    if (btnToLogin) {
      btnToLogin.addEventListener('click', function (e) {
        e.preventDefault();
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('modalRegister'));
        registerModal.hide();
        new bootstrap.Modal(document.getElementById('modalLogin')).show();
      });
    }

    // Login form validation and redirect to profile
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Validasi sederhana
        if (!email.includes('@')) {
          alert("Email harus valid dan mengandung '@'");
          return;
        }

        if (password.trim() === "") {
          alert("Password wajib diisi");
          return;
        }

        // Tutup modal login
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
        loginModal.hide();

        // Tampilkan modal profil
        const modalProfil = new bootstrap.Modal(document.getElementById('modalProfil'));
        modalProfil.show();
      });
    }
  });