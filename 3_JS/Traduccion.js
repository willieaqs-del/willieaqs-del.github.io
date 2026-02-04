// Idioma predeterminado
let idioma = 'es';

// Diccionario de traducciones
const traducciones = {
  es: {
    "header.title":"Terrenos 100% Financiados en La Fortuna",
    "header.subtitle":"Con Grupo EcoQuintas, cumplir el sueño de tener tu lote propio nunca fue tan fácil.",  
    "header.menu1":"Nosotros",
    "header.menu2":"Proyectos",
    "header.menu3":"Propiedades",
    "header.menu4":"Contáctenos",
    "header.menu5":"Servicios",
    "header.menu6":"Financiamiento",
    "carousel.slide1.title": "INVIERTA EN LA MEJOR ZONA DE COSTA RICA",
    "carousel.slide1.subtitle": "PROYECTOS MODERNOS, SEGUROS Y CON ALTA PLUSVALÍA",
    "carousel.slide1.button": "Ver Proyectos",
    "carousel.slide2.title": "NUESTROS PROYECTOS CUENTAN CON LAS MEJORES AMENIDADES",
    "carousel.slide2.subtitle": "CASA CLUB - PISCINA - BBQ - PARQUEO DE VISITAS - SEGURIDAD 24/7",
    "carousel.slide2.button": "Ver Proyectos",
    "carousel.slide3.title": "PROYECTOS EN PREVENTA AL MEJOR PRECIO",
    "carousel.slide3.subtitle": "PAGUE SU PRIMA FRACCIONADA HASTA EN 24 CUOTAS",
    "carousel.slide3.button": "Ver Proyectos",
    "carousel.slide4.title": "CONTAMOS CON SERVICIOS ADICIONALES PARA TODAS SUS NECESIDADES",
    "carousel.slide4.subtitle": "LLAVE EN MANO - ARQUITECTURA - MANTENIMIENTO - SERVICIOS LEGALES - MAQUINARIA",
    "carousel.slide4.button": "Ver Servicios",

    "nosotros.title": "Nosotros",
    "nosotros.subtitle1": "¿Quiénes somos?",
    "nosotros.text1": "Quintas del Norte es una empresa 100% de capital costarricense, dedicada a la comercialización de terrenos en La Fortuna de San Carlos, uno de los destinos más hermosos y prometedores de Costa Rica. Nuestro propósito es ayudar a cada persona a cumplir el sueño de tener su propio terreno, ofreciendo un servicio cercano, transparente y confiable en cada paso del camino.",
    "nosotros.subtitle2": "Nuestra historia",
    "nosotros.text2": "Con más de 20 años de experiencia en el sector inmobiliario, nos hemos consolidado como una empresa de gran confianza en la venta de terrenos, gracias a nuestro trato personalizado y al profundo conocimiento que tenemos del mercado local. Nuestra prioridad siempre ha sido el cliente: por eso acompañamos cada proceso de compra con transparencia, seguridad y dedicación, asegurando que cada decisión se tome con total confianza, una de nuestras mayores fortalezas es ofrecer planes de financiamiento 100% accesibles, sin prima y sin fiador, lo que permite que más familias y personas puedan cumplir el sueño de convertirse en propietarios.",
    "mision.title": "Misión",
    "mision.text": "Nuestra misión es acompañar y guiar a nuestros clientes en la compra de su terreno ideal en La Fortuna de San Carlos. Ofrecemos un servicio personalizado y confiable, basado en la transparencia, la seguridad y la satisfacción en cada paso del proceso. Con opciones de financiamiento del 100%, trabajamos con pasión para que más personas hagan realidad el sueño de tener su propia propiedad.",
    "vision.title": "Visión",
    "vision.text": "Aspiramos a consolidarnos como la inmobiliaria líder en La Fortuna de San Carlos, reconocida por la excelencia de nuestro servicio y la confianza que generamos en cada cliente. Nuestro objetivo es ser la primera opción para quienes buscan adquirir un terreno de forma accesible, segura y con el respaldo de un equipo profesional y comprometido.",

    "proyectos.title":"Lotes en condominio y residenciales diseñados para tu estilo de vida.",
    "proyectos.ver":"Ver Proyecto",
    "proyectos.amenidades":"Amenidades",
    "proyectos.descripcion":"Descripción",
    "proyectos.ubicacion":"Ubicación",
    "proyectos.caracteristicas":"Características",

    "filters.minPrice": "Precio Mínimo (₡)",
    "filters.maxPrice": "Precio Máximo (₡)",
    "filters.minArea": "Área mínima (m²)",
    "filters.maxArea": "Área máxima (m²)",
    "filters.location": "Ubicación...",
    "filters.condos": "(Condominios)",
    "filters.sort": "Ordenar por",
    "filters.priceAsc": "Precio Ascendente",
    "filters.priceDesc": "Precio Descendente",
    "filters.areaAsc": "Área Ascendente",
    "filters.areaDesc": "Área Descendente",
    "filters.search": "Buscar",
    "properties.title": "Propiedades disponibles para tu inversión ideal",
    "controls.show": "Mostrar:",
    "propiedad.ubicacion": "Ubicación:",
    "propiedad.precio": "Precio:",
    "propiedad.precioMetro": "| ₡/m²:",
    "propiedad.area": "Área:",
    "propiedad.descuento": "Descuento:",
    "propiedad.pagoMensual": "Pago mensual (10 años):",
    "propiedad.condominio": "Condominio:",
    "propiedad.verDetalles": "Ver más",
    "propiedad.descuento": "Descuento",

    "contact.teamTitle": "Contacta a Nuestro Equipo de Ventas",
    "equipo.correo": "Correo",
    "equipo.llamar": "Llamar",
    "contact.formTitle": "Contáctenos",
    "contact.labelName": "Nombre",
    "contact.labelLastName": "Apellidos",
    "contact.labelEmail": "Correo Electrónico",
    "contact.labelPhone": "Teléfono",
    "contact.selectCountry": "Seleccione su país",
    "contact.optionOther": "Otro",
    "contact.labelMessage": "Consulta",
    "contact.labelVerify": "¿Eres humano? Escribe \"sí\"",
    "contact.buttonSend": "Enviar",
    "contact.titleName": "Solo letras",
    "contact.titleLastName": "Solo letras",
    "contact.titlePhone": "Solo números",
    "contact.titleVerify": "Escribe sí para continuar",

    "services.heading": "Consulte por nuestros servicios adicionales",

    "finance.title": "Calcule su Cuota así de fácil y rápido",
    "finance.labelPrice": "Precio del lote (₡)",
    "finance.placeholderPrice": "Ingrese el precio del lote",
    "finance.labelTerm": "Plazo de financiamiento",
    "finance.term60": "5 años – 60 cuotas",
    "finance.term96": "8 años – 96 cuotas",
    "finance.term120": "10 años – 120 cuotas",
    "finance.term180": "15 años – 180 cuotas",
    "finance.term240": "20 años – 240 cuotas",
    "finance.labelType": "Tipo de financiamiento (%)",
    "finance.optionUs": "Con nosotros – 12% anual",
    "finance.buttonCalculate": "Calcular",
    "finance.labelResult": "Cuota Mensual",
    "finance.placeholderResult": "Monto de la cuota mensual",
    "finance.placeholderDownPayment": "Monto de la prima inicial",
    "finance.labelDownPayment": "Prima (%)",
    "finance.labelPrima" : "Prima Inicial",
    "finance.contado" : ">100% (Contado -5% desc)",
    "finance.contadoResult" : "Pago contado",

    "legal.titulo": "📝 Términos y Condiciones",
    "legal.actualizacion": "Última actualización: Dic 2025",
    "legal.intro": "Bienvenido al sitio web de Quintas del Norte, dedicado a la promoción de terrenos y proyectos inmobiliarios en la zona de La Fortuna, Costa Rica. Al acceder y utilizar esta página, usted acepta los siguientes términos:",
    "legal.1.titulo": "1. Fines ilustrativos",
    "legal.1.texto": "Toda la información contenida en este sitio web, incluyendo precios, imágenes, descripciones y disponibilidad de propiedades, tiene fines exclusivamente ilustrativos y referenciales. No constituye una oferta vinculante ni un compromiso contractual.",
    "legal.2.titulo": "2. Proceso de negociación",
    "legal.2.texto": "Cualquier negociación, acuerdo o transacción relacionada con la compra de terrenos o servicios debe realizarse directamente con un miembro autorizado de nuestro equipo de ventas. No se aceptan compromisos adquiridos únicamente por medio de la página web.",
    "legal.3.titulo": "3. Intermediación comercial",
    "legal.3.texto": "Quintas del Norte actúa únicamente como intermediario en la promoción de proyectos y terrenos. Las propiedades ofrecidas no pertenecen a la empresa, y su disponibilidad, condiciones legales y características técnicas son responsabilidad de los propietarios o desarrolladores correspondientes.",
    "legal.4.titulo": "4. Servicios adicionales",
    "legal.4.texto": "Los servicios complementarios como diseño, construcción, trámites legales, financiamiento, administración o mantenimiento son ofrecidos por medio de contratos independientes con socios comerciales. La empresa no se responsabiliza por la ejecución, calidad o cumplimiento de dichos servicios.",
    "legal.5.titulo": "5. Modificaciones",
    "legal.5.texto": "Nos reservamos el derecho de modificar, actualizar o eliminar cualquier contenido del sitio sin previo aviso. Es responsabilidad del usuario verificar la vigencia de la información antes de tomar decisiones.",
    "legal.privacidad.titulo": "🔐 Política de Privacidad",
    "legal.privacidad.intro": "Quintas del Norte se compromete a proteger la privacidad de los usuarios de este sitio web. A continuación se detallan nuestras prácticas:",
    "legal.privacidad.1.titulo": "1. Recopilación de datos",
    "legal.privacidad.1.texto": "Podemos recopilar información básica como nombre, correo electrónico y número de teléfono cuando usted completa formularios de contacto o solicita información. Esta información se utiliza exclusivamente para fines de atención comercial.",
    "legal.privacidad.2.titulo": "2. Uso de la información",
    "legal.privacidad.2.texto": "La información recopilada no será compartida con terceros, excepto con socios comerciales autorizados para la prestación de servicios relacionados, y únicamente cuando sea necesario para atender su solicitud.",
    "legal.privacidad.3.titulo": "3. Seguridad",
    "legal.privacidad.3.texto": "Implementamos medidas razonables de seguridad para proteger sus datos. Sin embargo, no podemos garantizar la seguridad absoluta de la información transmitida por internet.",
    "legal.privacidad.4.titulo": "4. Derechos del usuario",
    "legal.privacidad.4.texto": "Usted puede solicitar la modificación o eliminación de sus datos personales en cualquier momento escribiendo al correo de contacto.",

    "footer.addressTitle": "Dirección",
    "footer.addressText": "Frente a la Guardia Rural (Policia)<br>Chachagua, San Ramon<br>Alajuela, Costa Rica",
    "footer.hoursTitle": "Horario de Atención",
    "footer.hoursText": "Lunes a Viernes: 8am - 4pm<br>Sábados: 8am - 12pm",
    "footer.socialTitle": "Redes Sociales",
    "footer.legalTitle": "Legal",
    "footer.terms": "Términos y Condiciones",
    "footer.privacy": "Política de Privacidad"
  },
  en: {
    "header.title": "100% Financed Land in La Fortuna",
    "header.subtitle": "With Grupo EcoQuintas, making your dream of owning land has never been easier.",
    "header.menu1": "About Us",
    "header.menu2": "Projects",
    "header.menu3": "Properties",
    "header.menu4": "Contact Us",
    "header.menu5": "Services",
    "header.menu6": "Financing",
    "carousel.slide1.title": "INVEST IN THE BEST AREA OF COSTA RICA",
    "carousel.slide1.subtitle": "MODERN, SECURE PROJECTS WITH HIGH ADDED VALUE",
    "carousel.slide1.button": "View Projects",
    "carousel.slide2.title": "OUR PROJECTS OFFER THE BEST AMENITIES",
    "carousel.slide2.subtitle": "CLUBHOUSE - POOL - BBQ - VISITOR PARKING - 24/7 SECURITY",
    "carousel.slide2.button": "View Projects",
    "carousel.slide3.title": "PRE-SALE PROJECTS AT THE BEST PRICE",
    "carousel.slide3.subtitle": "PAY YOUR DOWN PAYMENT IN UP TO 24 INSTALLMENTS",
    "carousel.slide3.button": "View Projects",
    "carousel.slide4.title": "WE OFFER ADDITIONAL SERVICES FOR ALL YOUR NEEDS",
    "carousel.slide4.subtitle": "TURNKEY - ARCHITECTURE - MAINTENANCE - LEGAL SERVICES - EQUIPMENT",
    "carousel.slide4.button": "View Services",

    "nosotros.title": "About Us",
    "nosotros.subtitle1": "Who Are We?",
    "nosotros.text1": "Quintas del Norte is a 100% Costa Rican company dedicated to the commercialization of land in La Fortuna de San Carlos, one of the most beautiful and promising destinations in Costa Rica. Our purpose is to help each person fulfill the dream of owning their own land, offering a close, transparent, and trustworthy service every step of the way.",
    "nosotros.subtitle2": "Our History",
    "nosotros.text2": "With over 20 years of experience in the real estate sector, we have established ourselves as a highly trusted company in land sales, thanks to our personalized service and deep knowledge of the local market. Our priority has always been the client: that’s why we accompany every purchase process with transparency, security, and dedication, ensuring that every decision is made with total confidence. One of our greatest strengths is offering 100% accessible financing plans, with no down payment and no guarantor, allowing more families and individuals to fulfill the dream of becoming landowners.",
    "mision.title": "Mission",
    "mision.text": "Our mission is to accompany and guide our clients in purchasing their ideal land in La Fortuna de San Carlos. We offer a personalized and trustworthy service based on transparency, security, and satisfaction at every step of the process. With 100% financing options, we work passionately to help more people make the dream of owning their own property a reality.",
    "vision.title": "Vision",
    "vision.text": "We aspire to become the leading real estate company in La Fortuna de San Carlos, recognized for the excellence of our service and the trust we build with every client. Our goal is to be the first choice for those seeking to acquire land in an accessible and secure way, backed by a professional and committed team.",

    "proyectos.title": "Condominium and residential lots designed for your lifestyle.",
    "proyectos.ver":"View Project",
    "proyectos.ver": "View Project",
    "proyectos.amenidades": "Amenities",
    "proyectos.descripcion": "Description",
    "proyectos.ubicacion": "Location",
    "proyectos.caracteristicas": "Features",

    "filters.minPrice": "Min Price (₡)",
    "filters.maxPrice": "Max Price (₡)",
    "filters.minArea": "Min Area (m²)",
    "filters.maxArea": "Max Area (m²)",
    "filters.location": "Location...",
    "filters.condos": "(Condominiums)",
    "filters.sort": "Sort by",
    "filters.priceAsc": "Price Asc",
    "filters.priceDesc": "Price Desc",
    "filters.areaAsc": "Area Asc",
    "filters.areaDesc": "Area Desc",
    "filters.search": "Search",
    "properties.title": "Available properties for your ideal investment",
    "controls.show": "Show:",
    "propiedad.ubicacion": "Location:",
    "propiedad.precio": "Price:",
    "propiedad.precioMetro": "| ₡/m²:",
    "propiedad.area": "Area:",
    "propiedad.descuento": "Discount:",
    "propiedad.pagoMensual": "Monthly payment (10 years):",
    "propiedad.condominio": "Condominium:",
    "propiedad.verDetalles": "See more",
    "propiedad.descuento": "Discount",

    "contact.teamTitle": "Contact Our Sales Team",
    "equipo.correo": "Email",
    "equipo.llamar": "Call",
    "contact.formTitle": "Contact Us",
    "contact.labelName": "First Name",
    "contact.labelLastName": "Last Name",
    "contact.labelEmail": "Email Address",
    "contact.labelPhone": "Phone Number",
    "contact.selectCountry": "Select your country",
    "contact.optionOther": "Other",
    "contact.labelMessage": "Message",
    "contact.labelVerify": "Are you human? Type \"yes\"",
    "contact.buttonSend": "Send",
    "contact.titleName": "Letters only",
    "contact.titleLastName": "Letters only",
    "contact.titlePhone": "Numbers only",
    "contact.titleVerify": "Type yes to continue",

    "services.heading": "Ask about our additional services",

    "finance.title": "Calculate your Installment easily and quickly",
    "finance.labelPrice": "Lot price (₡)",
    "finance.placeholderPrice": "Enter the lot price",
    "finance.labelTerm": "Financing term",
    "finance.term60": "5 years – 60 installments",
    "finance.term96": "8 years – 96 installments",
    "finance.term120": "10 years – 120 installments",
    "finance.term180": "15 years – 180 installments",
    "finance.term240": "20 years – 240 installments",
    "finance.labelType": "Type of financing (%)",
    "finance.optionUs": "With us – 12% annual",
    "finance.buttonCalculate": "Calculate",
    "finance.labelResult": "Monthly installment",
    "finance.placeholderResult": "Amount of the monthly installment",
    "finance.placeholderDownPayment": "Amount of the initial down payment",
    "finance.labelDownPayment": "Down payment (%)",
    "finance.labelPrima": "Initial down payment",
    "finance.contado": "100% (Cash -5% discount)",
    "finance.contadoResult" : "Cash payment",

    "legal.titulo": "📝 Terms and Conditions",
    "legal.actualizacion": "Last updated: Dec 2025",
    "legal.intro": "Welcome to the website of Quintas del Norte, dedicated to promoting land and real estate projects in the La Fortuna area of Costa Rica. By accessing and using this page, you agree to the following terms:",
    "legal.1.titulo": "1. Illustrative Purpose",
    "legal.1.texto": "All information on this website, including prices, images, descriptions, and property availability, is for illustrative and reference purposes only. It does not constitute a binding offer or contractual commitment.",
    "legal.2.titulo": "2. Negotiation Process",
    "legal.2.texto": "Any negotiation, agreement, or transaction related to the purchase of land or services must be conducted directly with an authorized member of our sales team. Commitments made solely through the website are not accepted.",
    "legal.3.titulo": "3. Commercial Intermediation",
    "legal.3.texto": "Quintas del Norte acts solely as an intermediary in the promotion of projects and land. The properties offered do not belong to the company, and their availability, legal conditions, and technical characteristics are the responsibility of the respective owners or developers.",
    "legal.4.titulo": "4. Additional Services",
    "legal.4.texto": "Complementary services such as design, construction, legal procedures, financing, administration, or maintenance are offered through independent contracts with commercial partners. The company is not responsible for the execution, quality, or fulfillment of these services.",
    "legal.5.titulo": "5. Modifications",
    "legal.5.texto": "We reserve the right to modify, update, or remove any content from the site without prior notice. It is the user's responsibility to verify the validity of the information before making decisions.",
    "legal.privacidad.titulo": "🔐 Privacy Policy",
    "legal.privacidad.intro": "Quintas del Norte is committed to protecting the privacy of users of this website. Below are our practices:",
    "legal.privacidad.1.titulo": "1. Data Collection",
    "legal.privacidad.1.texto": "We may collect basic information such as name, email address, and phone number when you fill out contact forms or request information. This data is used exclusively for commercial attention purposes.",
    "legal.privacidad.2.titulo": "2. Use of Information",
    "legal.privacidad.2.texto": "The information collected will not be shared with third parties, except with authorized commercial partners for the provision of related services, and only when necessary to fulfill your request.",
    "legal.privacidad.3.titulo": "3. Security",
    "legal.privacidad.3.texto": "We implement reasonable security measures to protect your data. However, we cannot guarantee the absolute security of information transmitted over the internet.",
    "legal.privacidad.4.titulo": "4. User Rights",
    "legal.privacidad.4.texto": "You may request the modification or deletion of your personal data at any time by writing to our contact email.",

    "footer.addressTitle": "Address",
    "footer.addressText": "In front of the Rural Guard (Police)<br>Chachagua, San Ramon<br>Alajuela, Costa Rica",
    "footer.hoursTitle": "Business Hours",
    "footer.hoursText": "Monday to Friday: 8am - 4pm<br>Saturdays: 8am - 12pm",
    "footer.socialTitle": "Social Media",
    "footer.legalTitle": "Legal",
    "footer.terms": "Terms and Conditions",
    "footer.privacy": "Privacy Policy"
  }
};

// Funcion de traduccion
function aplicarTraduccion(idioma) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const clave = el.getAttribute('data-i18n');
    let traduccion = traducciones[idioma]?.[clave];
    if (!traduccion) return;
    const contieneSalto = traduccion.includes('\n');
    if (contieneSalto) {
      traduccion = traduccion.replace(/\n/g, '<br>');
    }
    const contieneHTML = /<[^>]+>/.test(traduccion);
    const tieneElementos = el.querySelector('img, span, svg, i');
    if (contieneHTML && !tieneElementos) {
      el.innerHTML = traduccion;
    } else if (tieneElementos) {
      const textoNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
      if (textoNode) {
        textoNode.textContent = contieneHTML ? el.textContent : traduccion;
      } else {
        el.appendChild(document.createTextNode(traduccion));
      }
    } else {
      el.textContent = traduccion;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const clave = el.getAttribute('data-i18n-placeholder');
    const traduccion = traducciones[idioma]?.[clave];
    if (traduccion) el.placeholder = traduccion;
  });
}

// Agregar evento al boton de cambio de idioma
function inicializarTraduccion() {
  const idiomaGuardado = localStorage.getItem('idiomaSeleccionado');
  if (idiomaGuardado) {
    idioma = idiomaGuardado;
  }
  const langBtn = document.getElementById('lang-toggle');
  if (!langBtn) {
    setTimeout(inicializarTraduccion, 100);
    return;
  }
  const bandera = idioma === 'es'
    ? '<img src="4_Iconos/icon_england.png" alt="English" class="flag-icon" /> <span>EN</span>'
    : '<img src="4_Iconos/icon_spain.png" alt="Español" class="flag-icon" /> <span>ES</span>';
  langBtn.innerHTML = bandera;

  langBtn.addEventListener('click', () => {
    idioma = idioma === 'es' ? 'en' : 'es';
    localStorage.setItem('idiomaSeleccionado', idioma); 
    const nuevaBandera = idioma === 'es'
      ? '<img src="4_Iconos/icon_england.png" alt="English" class="flag-icon" /> <span>EN</span>'
      : '<img src="4_Iconos/icon_spain.png" alt="Español" class="flag-icon" /> <span>ES</span>';
    langBtn.innerHTML = nuevaBandera;
    aplicarTraduccion(idioma);
  });

  aplicarTraduccion(idioma); 
}

// Carga inicial
window.addEventListener('DOMContentLoaded', () => {
  inicializarTraduccion();
});



