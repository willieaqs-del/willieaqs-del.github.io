let properties = [];
let currentPage = 1;
let itemsPerPage = 10;

const listContainer = document.getElementById('property-list');
const paginationTop = document.getElementById('pagination-top');
const itemsSelectTop = document.getElementById('itemsPerPage');
const condoSelect = document.getElementById('condoFilter');
const applyFiltersBtn = document.getElementById('applyFilters');

// Cargar Excel
fetch('8_Propiedades/Propiedades_Informacion.xlsx')
  .then(res => res.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    properties = XLSX.utils.sheet_to_json(sheet);
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

function populateCondoOptions() {
  const uniqueCondos = [...new Set(properties.map(p => p.Condominio).filter(Boolean))];
  uniqueCondos.forEach(condo => {
    const opt = document.createElement('option');
    opt.value = condo;
    opt.textContent = condo;
    condoSelect.appendChild(opt);
  });
}

function renderProperties(data = properties) {
  listContainer.innerHTML = '';
  paginationTop.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = data.slice(start, end);

  pageItems.forEach(prop => {
    const {
      Titulo,
      Descripcion,
      Ubicacion,
      Precio,
      Metros_Cuadrados,
      Descuento,
      Imagen,
      urlDetalle,
      Condominio
    } = prop;

    const precioPorMetro = Precio / Metros_Cuadrados;
    const pagoMensual = (Precio - (Descuento || 0)) / 120;

    const card = document.createElement('div');
    card.className = 'property-card';

    card.innerHTML = `
      <div class="property-info">
        <h3>${Titulo}</h3>
        <p>${Descripcion}</p>
        <p>
          <span class="highlight">Ubicación:</span> ${Ubicacion}
          <a href="https://www.google.com/maps/search/${encodeURIComponent(Ubicacion)}" target="_blank" class="maps-icon">
            <img src="4_Iconos/icon_google_maps.png" alt="Google Maps" />
          </a>
        </p>
        <p>
          <span class="highlight">Precio:</span> ₡${Precio.toLocaleString()}
          <span class="highlight">| ₡/m²:</span> ₡${precioPorMetro.toLocaleString()}
        </p>
        <p><span class="highlight">Área:</span> ${Metros_Cuadrados} m²</p>
        ${Descuento ? `<p><span class="highlight">Descuento:</span> ${(Descuento * 100).toFixed(0)}%</p>` : ''}
        <p><span class="highlight">Pago mensual (10 años):</span> ₡${pagoMensual.toLocaleString()}</p>
        ${Condominio ? `<p><span class="highlight">Condominio:</span> ${Condominio}</p>` : ''}
      </div>
      <div class="property-image">
        <img src="8_Propiedades/${Imagen}.jpg" alt="${Titulo}" loading="lazy" />
        <a href="${urlDetalle}" target="_blank">Ver Detalles</a>
      </div>
    `;

    listContainer.appendChild(card);
  });

  renderPagination('pagination-top', data);
  renderControlsBelow(data);
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
    <label for="itemsPerPageBottom">Mostrar:</label>
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
