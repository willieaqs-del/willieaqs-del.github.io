fetch('7_Proyectos/Proyectos_Informacion.xlsx')
  // ----------------------------------------------------------------- Funcion de carga de los cards de los proyectos
  .then(res => res.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const container = document.getElementById('project-grid');

    rows.forEach(proyecto => {
      const nombre = proyecto.Nombre || '';
      const logo = proyecto.Logo || 'default-logo';
      const imagenPrincipal = proyecto.Imagen_Principal || 'default-main';
      const url = proyecto.urlProyecto || '#';

      const card = document.createElement('div');
      card.className = 'project-card';

      card.innerHTML = `
        <div class="project-logo">
          <img src="7_Proyectos/${logo}" alt="${nombre} Logo" />
        </div>
        <div class="project-image">
          <img src="7_Proyectos/${imagenPrincipal}" alt="${nombre} Imagen Principal" />
          <a href="${url}">Ver Projecto</a>
        </div>
      `;

      container.appendChild(card);
    });

    // ----------------------------------------------------------------- Funcion para agregar botones a proyectos 
    container.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const card = e.target.closest('.project-card');
        const nombre = card.querySelector('.project-logo img').alt.replace(' Logo', '');
        const proyecto = rows.find(p => p.Nombre === nombre);
        if (proyecto) {
          renderProjectDetail(proyecto);
          renderProjectGallery(proyecto);
          document.getElementById('project-detail').scrollIntoView({ behavior: 'smooth' });
        }
      }
    });


  // ----------------------------------------------------------------- Funcion para agregar seccion detalles del proyecto
  // <h2>${proyecto.Nombre}</h2>
  function formatAsList(text) {
    if (!text) return 'No disponible';
    return text
      .split(/\r?\n/) // divide por saltos de línea
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `—  ${line}`)
      .join('<br>');
  }

  function renderProjectDetail(proyecto) {
    const detail = document.getElementById('project-detail');
    detail.innerHTML = `      
      <div class="project-detail-logo">        
        <img src="7_Proyectos/${proyecto.Logo}" alt="${proyecto.Nombre} Logo" />        
      </div>
      <div class="detail-grid">
        <div><h3>Descripción</h3><p>${proyecto.Descripcion || 'No disponible'}</p></div>
        <div><h3>Características</h3><p>${formatAsList(proyecto.Caracteristicas)}</p></div>
        <div><h3>Amenidades</h3><p>${formatAsList(proyecto.Amenidades)}</p></div>
        <div>
          <h3>Ubicación</h3>
          <iframe src="${proyecto.Mapa || ''}" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
      <div class="project-detail-button">
        <a href="Propiedades.html?condominio=${encodeURIComponent(proyecto.Nombre)}" class="styled-button">Ver propiedades en ${proyecto.Nombre}</a>
      </div>
    `;
  }

  // ----------------------------------------------------------------- Funcion para agregar seccion de fotos
  function renderProjectGallery(proyecto) {
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

    gallery.innerHTML = `<h2 class="gallery-intro-heading">Explora el Proyecto ${proyecto.Nombre} con nuestra Galería Gráfica</h2>`+html;
    setupModal(fotos);
  }

  //-----------------------------------------------------------------
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


  })
  .catch(err => console.error('Error al cargar el archivo Excel:', err));