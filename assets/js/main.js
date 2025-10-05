(function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Active link highlighting
  const currentPath = location.pathname.replace(/\/$/, '/index.html');
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPath) {
      a.classList.add('active');
    }
  });

  // Render cats grid if present
  const grid = document.getElementById('catsGrid');
  if (grid && Array.isArray(window.cats || cats)) {
    const data = window.cats || cats;
    grid.innerHTML = data.map(cat => `
      <article class="card">
        <img src="${cat.image}" alt="${cat.name} the ${cat.breed}" loading="lazy" />
        <div class="card-body">
          <div class="card-title">${cat.name}</div>
          <div class="card-meta">${cat.breed} • ${cat.age}</div>
          <div class="card-price">$${cat.price.toFixed(2)}</div>
          <div class="card-actions">
            <button class="btn" data-id="${cat.id}" aria-label="View details of ${cat.name}">View Details</button>
          </div>
        </div>
      </article>
    `).join('');

    grid.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches('button[data-id]')) {
        const id = Number(target.getAttribute('data-id'));
        const cat = data.find(c => c.id === id);
        if (cat) openModal(cat);
      }
    });
  }

  // Modal logic
  const backdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalContent = document.getElementById('modalContent');
  const contactBtn = document.getElementById('contactBtn');

  function openModal(cat) {
    if (!backdrop) return;
    backdrop.classList.add('active');
    backdrop.setAttribute('aria-hidden', 'false');
    if (modalTitle) modalTitle.textContent = `${cat.name} — ${cat.breed}`;
    if (modalImg) {
      modalImg.src = cat.image;
      modalImg.alt = `${cat.name} the ${cat.breed}`;
    }
    if (modalContent) {
      modalContent.innerHTML = `
        <p>${cat.description}</p>
        <p><strong>Age:</strong> ${cat.age}</p>
        <p><strong>Price:</strong> $${cat.price.toFixed(2)}</p>
      `;
    }
    if (contactBtn) {
      contactBtn.onclick = () => {
        window.location.href = '/contact.html#inquiry';
      };
    }
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!backdrop) return;
    backdrop.classList.remove('active');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
