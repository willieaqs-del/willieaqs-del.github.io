fetch('Equipo_Ventas/Equipo_Ventas_Informacion.xlsx')
  .then(res => res.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const container = document.getElementById('team-container');

    rows.forEach(persona => {
      const nombre = persona.Nombres || '';
      const apellido = persona.Apellidos || '';
      const celular = persona.Celular || '';
      const correo = persona.Correo || '';
      const imagen = persona.Imagen || 'default';

      const card = document.createElement('div');
      card.className = 'team-card';

      card.innerHTML = `
        <img src="Equipo_Ventas/${imagen}.png" alt="${nombre}" />
        <h3>${nombre} ${apellido}</h3>
        <p>${celular}</p>
        <a href="mailto:${correo}">Correo</a>
        <a href="https://wa.me/506${celular}" target="_blank">WhatsApp</a>
        <a href="tel:+506${celular}">📱 Llamar</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error al cargar el archivo Excel:', err));
