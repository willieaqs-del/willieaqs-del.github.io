// --------------------------------------------------------------- Función principal
function getProyectoParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get('proyecto'); // devuelve el nombre del proyecto
}

async function cargarProyectos() {
  try {
    const res = await fetch('7_Proyectos/Proyectos_Informacion.xlsx');
    const data = await res.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let rawProyectos = XLSX.utils.sheet_to_json(sheet);

    // Filtrar proyectos válidos
    const proyectos = rawProyectos.filter(row => !row.Desplegar || row.Desplegar.toString().trim() === '');

    renderProjectCards(proyectos);
    setupCardClick(proyectos);

    // Detectar parámetro en URL
    const proyectoParam = getProyectoParam();
    if (proyectoParam) {
      const proyecto = proyectos.find(p => p.Nombre === proyectoParam);
      if (proyecto) {
        const id = proyecto.Proyecto_ID || `proyecto.card.${proyectos.indexOf(proyecto) + 1}`;
        renderProjectDetail(proyecto, id);
        renderProjectGallery(proyecto, id);

        // Scroll automático después de renderizar
        setTimeout(() => {
          const detail = document.getElementById('project-detail');
          const offset = 100; // píxeles de margen superior
          const top = detail.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 100);
      }
    }

    if (typeof aplicarTraduccion === 'function') {
      aplicarTraduccion(idioma);
    }
  } catch (err) {
    console.error('Error al cargar el archivo Excel:', err);
  }
}


// --------------------------------------------------------------- Renderizar cards
function renderProjectCards(proyectos) {
  const container = document.getElementById('project-grid');
  container.innerHTML = ''; // limpiar antes de renderizar

  proyectos.forEach((proyecto, index) => {
    const id = proyecto.Proyecto_ID || `proyecto.card.${index + 1}`;

    // Inicializar diccionario de traducciones si no existe
    if (!traducciones['es']) traducciones['es'] = {};
    if (!traducciones['en']) traducciones['en'] = {};

    // Registrar traducciones dinámicas (sin nombre)
    traducciones['es'][`${id}.descripcion`] = proyecto.Descripcion || 'No disponible';
    traducciones['es'][`${id}.caracteristicas`] = proyecto.Caracteristicas || 'No disponible';
    traducciones['es'][`${id}.amenidades`] = proyecto.Amenidades || 'No disponible';

    traducciones['en'][`${id}.descripcion`] = proyecto.Descripcion_Ingles || 'Not available';
    traducciones['en'][`${id}.caracteristicas`] = proyecto.Caracteristicas_Ingles || 'Not available';
    traducciones['en'][`${id}.amenidades`] = proyecto.Amenidades_Ingles || 'Not available';

    // Crear la card con clases dinámicas y data-i18n
    const card = document.createElement('div');
    card.className = `project-card ${id}`;
    card.innerHTML = `
      <div class="project-logo">
        <img src="7_Proyectos/${proyecto.Logo}" alt="${proyecto.Nombre} Logo" />
      </div>
      <div class="project-image">
        <img src="7_Proyectos/${proyecto.Imagen_Principal}" alt="${proyecto.Nombre} Imagen Principal" />
        <a data-i18n="proyectos.ver" href="${proyecto.urlProyecto || '#'}">Ver Proyecto</a>
      </div>
    `;

    container.appendChild(card);
  });
}

// --------------------------------------------------------------- Click en cards
function setupCardClick(proyectos) {
  const container = document.getElementById('project-grid');
  container.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const card = e.target.closest('.project-card');
      const nombre = card.querySelector('.project-logo img').alt.replace(' Logo', '');
      const proyecto = proyectos.find(p => p.Nombre === nombre);
      if (proyecto) {
        const id = proyecto.Proyecto_ID || `proyecto.card.${proyectos.indexOf(proyecto) + 1}`;
        renderProjectDetail(proyecto, id);
        renderProjectGallery(proyecto, id);
        const detail = document.getElementById('project-detail');
        const offset = 100; // píxeles de margen superior
        const top = detail.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
}

// --------------------------------------------------------------- Formatear listas
// Convierte texto con saltos de línea en lista con viñetas
function formatAsList(text) {
  if (!text) return 'No disponible';
  const items = text
    .split(/\r?\n/)              // divide por saltos de línea
    .map(line => line.trim())    // limpia espacios
    .filter(line => line.length > 0); // elimina vacíos

  if (items.length === 0) return 'No disponible';

  return `<ul class="bullet-list">` + 
           items.map(line => `<li>${line}</li>`).join('') + 
         `</ul>`;
}


// --------------------------------------------------------------- Detalle del proyecto
function renderProjectDetail(proyecto, id) {
  const detail = document.getElementById('project-detail');
  detail.innerHTML = `
    <div class="project-detail-logo">        
      <img src="7_Proyectos/${proyecto.Logo}" alt="${proyecto.Nombre} Logo" />        
    </div>
    <div class="detail-grid">
      <div><h3 data-i18n="proyectos.descripcion">Descripción</h3><p data-i18n="${id}.descripcion">${proyecto.Descripcion || 'No disponible'}</p></div>
      <div><h3 data-i18n="proyectos.caracteristicas">Características</h3>${formatAsList(proyecto.Caracteristicas)}</div>
      <div><h3 data-i18n="proyectos.amenidades">Amenidades</h3>${formatAsList(proyecto.Amenidades)}</div>
      <div>
        <h3 data-i18n="proyectos.ubicacion">Ubicación</h3>
        <p>${proyecto.Ubicacion || 'No disponible'}</p>
        <a href="https://maps.google.com/?q=${encodeURIComponent(proyecto.Ubicacion || '')}" 
           target="_blank" 
           class="maps-icon">
          <img src="4_Iconos/icon_google_maps.png" alt="Google Maps" />
        </a>
      </div>
    </div>
    <div class="project-detail-button">
      <a href="Propiedades.html?condominio=${encodeURIComponent(proyecto.Nombre)}" class="styled-button">
        Ver propiedades en ${proyecto.Nombre}
      </a>
    </div>
  `;
  aplicarTraduccion(idioma)
}

// --------------------------------------------------------------- Galería de fotos
function renderProjectGallery(proyecto, id) {
  const gallery = document.getElementById('project-gallery');
  const fotos = [];
  for (let i = 1; i <= 14; i++) {
    const key = `Foto_${i}`;
    if (proyecto[key]) fotos.push(proyecto[key]);
  }

  let bloques = [3, 4, 3, 4];
  let html = '';
  let index = 0;

  for (let b of bloques) {
    if (index >= fotos.length) break;
    html += '<div class="gallery-row">';
    for (let i = 0; i < b && index < fotos.length; i++, index++) {
      html += `<img src="7_Proyectos/${fotos[index]}" alt="Foto ${index + 1}" data-index="${index}" />`;
    }
    html += '</div>';
  }

  gallery.innerHTML = `<h2 class="gallery-intro-heading" data-i18n="${id}.galeria">Explora el Proyecto ${proyecto.Nombre} con nuestra Galería Gráfica</h2>` + html;
  setupModal(fotos);
}

// --------------------------------------------------------------- Modal de fotos
function setupModal(fotos) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  let current = 0;

  document.querySelectorAll('#project-gallery img').forEach(img => {
    img.addEventListener('click', () => {
      current = parseInt(img.dataset.index);
      modalImg.src = img.src;
      modal.classList.remove('hidden');
    });
  });

  document.getElementById('prev').onclick = () => {
    current = (current - 1 + fotos.length) % fotos.length;
    modalImg.src = `7_Proyectos/${fotos[current]}`;
  };

  document.getElementById('next').onclick = () => {
    current = (current + 1) % fotos.length;
    modalImg.src = `7_Proyectos/${fotos[current]}`;
  };

  document.querySelector('.close').onclick = () => {
    modal.classList.add('hidden');
  };
}

// --------------------------------------------------------------- Inicializar
cargarProyectos();
