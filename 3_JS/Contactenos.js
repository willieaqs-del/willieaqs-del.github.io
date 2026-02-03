document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita el envío tradicional

  // Captura los valores
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const consulta = document.getElementById("consulta").value.trim();
  const verificacion = document.getElementById("verificacion").value.trim().toLowerCase();

  // Validación básica
  if (
    !nombre || !apellidos || !correo || !telefono || !consulta ||
    !["sí", "si", "SI", "Si", "sÍ", "SÍ", "yes", "Yes", "YES", "yEs", "yeS", "YeS", "YEs"].includes(verificacion)
  ) {
    alert("Por favor, complete todos los campos correctamente.");
    return;
  }

  // Construcción del cuerpo del correo
  const asunto = encodeURIComponent("Quintas del Norte");
  const cuerpo = encodeURIComponent(
    `Nombre: ${nombre} ${apellidos}\n` +
    `Correo: ${correo}\n` +
    `Teléfono: ${telefono}\n` +
    `Consulta:${consulta}`
  );

  // Dirección de destino (puedes cambiarla por la del equipo de ventas)
  const destino = "realestatemarcovinicio@gmail.com";

  // Abrir cliente de correo
  window.location.href = `mailto:${destino}?subject=${asunto}&body=${cuerpo}`;
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const lote = params.get("lote");

  if (lote) {
    const consultaInput = document.getElementById("consulta");
    if (consultaInput) {
      consultaInput.value = `Estoy interesado en el lote: ${lote}`;
    }

    // 🔹 Esperar un poco para que todo el contenido se cargue antes de hacer scroll
    setTimeout(() => {
      const formSection = document.querySelector(".contact-form-section");
      if (formSection) {
        const offset = 150; // píxeles de margen superior
        const top = formSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 700); // medio segundo de espera

  }
});



