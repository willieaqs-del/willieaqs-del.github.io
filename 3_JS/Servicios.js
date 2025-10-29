async function cargarServiciosDesdeExcel() {
  const response = await fetch('10_Servicios/Servicios_Informacion.xlsx');
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const hoja = workbook.Sheets[workbook.SheetNames[0]];
  const servicios = XLSX.utils.sheet_to_json(hoja);

  const container = document.getElementById('servicios-container');

  servicios.forEach((servicio, index) => {
    const card = document.createElement('div');
    const claseAlterna = index % 2 === 0 ? 'servicio-card normal' : 'servicio-card invertido';
    card.className = claseAlterna;

    // ID único para cada servicio
    const id = servicio.Servicio_ID || `servicio.card.${index + 1}`;

    // Registrar traducciones en el diccionario global
    if (!traducciones['es']) traducciones['es'] = {};
    if (!traducciones['en']) traducciones['en'] = {};

    traducciones['es'][`${id}.titulo`] = servicio.Servicio;
    traducciones['es'][`${id}.descripcion`] = servicio.Descripcion;
    traducciones['en'][`${id}.titulo`] = servicio.Servicio_Ingles;
    traducciones['en'][`${id}.descripcion`] = servicio.Descripcion_Ingles;

    // Crear la card con data-i18n
    card.innerHTML = `
      <div class="servicio-imagen">
        <img src="10_Servicios/${servicio.Imagen}" alt="${servicio.Servicio}" />
      </div>
      <div class="servicio-texto">
        <h3 data-i18n="${id}.titulo">${servicio.Servicio}</h3>
        <p data-i18n="${id}.descripcion">${servicio.Descripcion}</p>
      </div>
    `;

    container.appendChild(card);
  });

  // Aplicar traducción inicial según idioma actual
  if (typeof aplicarTraduccion === 'function') {
    aplicarTraduccion(idioma);
  }
}


cargarServiciosDesdeExcel();
