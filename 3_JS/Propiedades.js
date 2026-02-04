let properties = [];
let currentPage = 1;
let itemsPerPage = 10;

const listContainer = document.getElementById('property-list');
const paginationTop = document.getElementById('pagination-top');
const itemsSelectTop = document.getElementById('itemsPerPage');
const condoSelect = document.getElementById('condoFilter');
const applyFiltersBtn = document.getElementById('applyFilters');

// ---------------------------------- Cargar Archivo Excel -------------------------------------------
fetch('8_Propiedades/Propiedades_Informacion.xlsx')
  .then(res => res.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let rawProperties = XLSX.utils.sheet_to_json(sheet);
    properties = rawProperties.filter(row => !row.Desplegar || row.Desplegar.toString().trim() === '');
    populateCondoOptions();
    const presetCondo = new URLSearchParams(window.location.search).get('condominio');
    if (presetCondo) {
      condoSelect.value = presetCondo;
      applyFiltersBtn.click();
    } else {
      renderProperties();
    }
  })
  .catch(err => {
    console.error('Error al cargar propiedades:', err);
    listContainer.innerHTML = '<p style="color:red;">No se pudo cargar el archivo de propiedades.</p>';
  });

// Dropdown superior
itemsSelectTop.addEventListener('change', () => {
  itemsPerPage = parseInt(itemsSelectTop.value);
  syncDropdowns(itemsSelectTop.value);
  currentPage = 1;
  renderProperties();
});

// ---------------------------------- Agregar click a filtros -------------------------------------------
applyFiltersBtn.addEventListener('click', () => {
  const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  const minArea = parseFloat(document.getElementById('minArea').value) || 0;
  const maxArea = parseFloat(document.getElementById('maxArea').value) || Infinity;
  const location = document.getElementById('locationFilter').value.toLowerCase();
  const condo = condoSelect.value;
  const sort = document.getElementById('sortBy').value;

  let filtered = properties.filter(p => {
    const price = p.Precio || 0;
    const area = p.Metros_Cuadrados || 0;
    const ubicacion = (p.Ubicacion || '').toLowerCase();
    const condominio = p.Condominio || '';

    return (
      price >= minPrice &&
      price <= maxPrice &&
      area >= minArea &&
      area <= maxArea &&
      ubicacion.includes(location) &&
      (condo === '' || condominio === condo)
    );
  });

  if (sort === 'price-asc') filtered.sort((a, b) => a.Precio - b.Precio);
  if (sort === 'price-desc') filtered.sort((a, b) => b.Precio - a.Precio);
  if (sort === 'area-asc') filtered.sort((a, b) => a.Metros_Cuadrados - b.Metros_Cuadrados);
  if (sort === 'area-desc') filtered.sort((a, b) => b.Metros_Cuadrados - a.Metros_Cuadrados);

  currentPage = 1;
  renderProperties(filtered);
});

// ----------------------------------Cargar drop down de condominios -------------------------------------------
function populateCondoOptions() {
  const uniqueCondos = [...new Set(properties.map(p => p.Condominio).filter(Boolean))];
  uniqueCondos.forEach(condo => {
    const opt = document.createElement('option');
    opt.value = condo;
    opt.textContent = condo;
    condoSelect.appendChild(opt);
  });
}

// ---------------------------------- Renderizar Cards de propiedades -------------------------------------------
function renderProperties(data = properties) {
  listContainer.innerHTML = '';
  paginationTop.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = data.slice(start, end);

  pageItems.forEach((prop, index) => {
    const {
      Titulo,
      Titulo_Ingles,
      Descripcion,
      Descripcion_Ingles,
      Ubicacion,
      Precio,
      Metros_Cuadrados,
      Descuento,
      urlDetalle,
      Condominio
    } = prop;

    // Calcular valores con descuento
    const descuentoPorcentaje = Descuento ? Math.round(Descuento * 100) : 0;
    const precioConDescuento = Descuento ? Precio * (1 - Descuento) : Precio;
    const precioPorMetro = Metros_Cuadrados ? precioConDescuento / Metros_Cuadrados : 0;
    const pagoMensual = precioConDescuento / 120;

    // Claves únicas para traducción
    const claveTitulo = `propiedad.titulo_${index + start}`;
    const claveDescripcion = `propiedad.descripcion_${index + start}`;

    if (!traducciones['es']) traducciones['es'] = {};
    if (!traducciones['en']) traducciones['en'] = {};
    traducciones['es'][claveTitulo] = Titulo;
    traducciones['en'][claveTitulo] = Titulo_Ingles || Titulo;
    traducciones['es'][claveDescripcion] = Descripcion;
    traducciones['en'][claveDescripcion] = Descripcion_Ingles || Descripcion;

    // Recolectar imágenes dinámicamente
    const imagenes = [];
    for (let i = 1; i <= 10; i++) {
      const campo = prop[`Imagen_${i}`];
      if (campo) imagenes.push(`8_Propiedades/${campo}`);
    }

    const sliderImgs = imagenes.map((img, idx) =>
      `<img src="${img}" alt="${Titulo}" ${idx === 0 ? 'class="active"' : ''} />`
    ).join('');

    const card = document.createElement('div');
    card.className = 'property-card';

    card.innerHTML = `
      ${Descuento ? `
        <div class="discount-ribbon">
          <span class="ribbon-text">
            -${descuentoPorcentaje}%
            <span data-i18n="propiedad.descuento" class="small">discount</span>
          </span>
        </div>
      ` : ''}

      <div class="property-info">
        <h3 data-i18n="${claveTitulo}">${Titulo}</h3>
        <p data-i18n="${claveDescripcion}">${Descripcion}</p>
        <p>
          <span class="highlight" data-i18n="propiedad.ubicacion">Ubicación:</span> ${Ubicacion}
          <a href="https://www.google.com/maps/search/${encodeURIComponent(Ubicacion)}" target="_blank" class="maps-icon">
            <img src="4_Iconos/icon_google_maps.png" alt="Google Maps" />
          </a>
        </p>
        <p>
          <span class="highlight" data-i18n="propiedad.precio">Precio:</span>
          ${Descuento ? `
            <span class="TipoCambio precio-original" data-valor="${Precio}">
              <s>₡${Precio.toLocaleString()}</s>
            </span>
            <span class="TipoCambio precio" data-valor="${precioConDescuento}">
              ₡${precioConDescuento.toLocaleString()}
            </span>
          ` : `
            <span class="TipoCambio precio" data-valor="${Precio}">
              ₡${Precio.toLocaleString()}
            </span>
          `}
          <span class="highlight simbolo-precioMetro" data-i18n="propiedad.precioMetro">| ₡/m²:</span>
          <span class="TipoCambio precio-m2" data-valor="${precioPorMetro}">
            ₡${precioPorMetro.toLocaleString()}
          </span>
        </p>
        <p>
          <span class="highlight" data-i18n="propiedad.area">Área:</span>
          ${Metros_Cuadrados} m²
        </p>
        <p>
          <span class="highlight" data-i18n="propiedad.pagoMensual">Pago mensual (10 años):</span>
          <span class="TipoCambio pago-mensual" data-valor="${pagoMensual}">
            ₡${Math.floor(pagoMensual).toLocaleString()}
          </span>
          <a href="Financiamiento.html?precio=${precioConDescuento}" class="inline-link">(Ver Financiamiento)</a>
        </p>
        ${Condominio ? `
         <p>
          <span class="highlight" data-i18n="propiedad.condominio">Condominio:</span> ${Condominio}
          <a href="Proyectos.html?proyecto=${encodeURIComponent(Condominio)}" class="inline-link">(Ver Condominio)</a>
        </p>
      ` : ''}
      </div>
      <div class="property-image">
        <div class="image-slider">
          ${sliderImgs}
        </div>
        <button class="slider-btn prev" aria-label="Imagen anterior">‹</button>
        <button class="slider-btn next" aria-label="Imagen siguiente">›</button>
        <a href="${urlDetalle}" target="_blank" class="details-btn" data-i18n="propiedad.verDetalles">Ver</a>
      </div>
      <div class="contact-button-wrapper">
        <button class="contact-btn">
          <span class="label">Contactar ahora</span>
          <div class="contact-options">
            <a href="tel:+50687038811" title="Llamar"><img src="4_Iconos/icon_phone.png" alt="Teléfono" /></a>
            <a href="https://wa.me/50687038811" target="_blank" title="WhatsApp"><img src="4_Iconos/icon_whatsapp.png" alt="WhatsApp" /></a>
            <a href="Contactenos.html?lote=${encodeURIComponent(Titulo)}" title="Correo"><img src="4_Iconos/icon_email.png" alt="Correo" /></a>
          </div>
        </button>
      </div>
    `;

    listContainer.appendChild(card);

    // Slider dentro de la card
    const imgs = card.querySelectorAll('.image-slider img');
    let currentImg = 0;

    card.querySelector('.next').addEventListener('click', () => {
      imgs[currentImg].classList.remove('active');
      currentImg = (currentImg + 1) % imgs.length;
      imgs[currentImg].classList.add('active');
    });

    card.querySelector('.prev').addEventListener('click', () => {
      imgs[currentImg].classList.remove('active');
      currentImg = (currentImg - 1 + imgs.length) % imgs.length;
      imgs[currentImg].classList.add('active');
    });

    // Interceptar click en details-btn para abrir modal
    const detailsBtn = card.querySelector('.details-btn');
    detailsBtn.addEventListener('click', (e) => {
      e.preventDefault(); // evita abrir urlDetalle
      setupModal(imagenes);
    });
  });

  renderPagination('pagination-top', data);
  renderControlsBelow(data);

  if (typeof aplicarTraduccion === 'function') {
    aplicarTraduccion(idioma);
  }
}

function renderPagination(containerId, data = properties) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const totalPages = Math.ceil(data.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === currentPage ? 'active' : '';
    btn.addEventListener('click', () => {
      currentPage = i;
      renderProperties(data);
    });
    container.appendChild(btn);
  }
}

function renderControlsBelow(data = properties) {
  const section = document.getElementById('property-section');
  let existing = document.getElementById('property-controls-bottom');
  if (existing) existing.remove();

  const wrapper = document.createElement('div');
  wrapper.className = 'property-controls-wrapper';
  wrapper.id = 'property-controls-bottom';

  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  pagination.id = 'pagination-bottom';

  const controls = document.createElement('div');
  controls.className = 'property-controls';
  controls.innerHTML = `
    <label for="itemsPerPageBottom" data-i18n="controls.show">Mostrar:</label>
    <select id="itemsPerPageBottom">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
  `;

  wrapper.appendChild(pagination);
  wrapper.appendChild(controls);
  section.appendChild(wrapper);

  const bottomSelect = document.getElementById('itemsPerPageBottom');
  bottomSelect.value = itemsPerPage;
  bottomSelect.addEventListener('change', () => {
    itemsPerPage = parseInt(bottomSelect.value);
    syncDropdowns(bottomSelect.value);
    currentPage = 1;
    renderProperties(data);
  });

  renderPagination('pagination-bottom', data);
}

function syncDropdowns(value) {
  document.getElementById('itemsPerPage').value = value;
  const bottom = document.getElementById('itemsPerPageBottom');
  if (bottom) bottom.value = value;
}

function setupModal(fotos) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = modal.querySelector('.close');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let current = 0;

  // Mostrar primera imagen
  modalImg.src = fotos[current];
  modal.classList.remove('hidden');

  prevBtn.onclick = () => {
    current = (current - 1 + fotos.length) % fotos.length;
    modalImg.src = fotos[current];
  };

  nextBtn.onclick = () => {
    current = (current + 1) % fotos.length;
    modalImg.src = fotos[current];
  };

  closeBtn.onclick = () => {
    modal.classList.add('hidden');
  };
}
