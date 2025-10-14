fetch('Proyectos/Proyectos_Informacion.xlsx')
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
          <img src="Proyectos/${logo}.png" alt="${nombre} Logo" />
        </div>
        <div class="project-image">
          <img src="Proyectos/${imagenPrincipal}.jpg" alt="${nombre} Imagen Principal" />
          <a href="${url}">Ver Projecto</a>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error al cargar el archivo Excel:', err));