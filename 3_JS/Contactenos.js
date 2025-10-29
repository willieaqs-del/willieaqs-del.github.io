document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita el envío tradicional

  // Captura los valores
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const pais = document.getElementById("pais").value;
  const consulta = document.getElementById("consulta").value.trim();
  const verificacion = document.getElementById("verificacion").value.trim().toLowerCase();

  // Validación básica
  if (
  !nombre || !apellidos || !correo || !telefono || !pais || !consulta || 
  !["sí", "si", "SI", "Si", "sÍ", "SÍ", "yes", "Yes", "YES", "yEs", "yeS", "YeS", "YEs"].includes(verificacion)) {
    alert("Por favor, complete todos los campos correctamente.");
    return;
  }

  // Construcción del cuerpo del correo
  const asunto = encodeURIComponent("Consulta desde Grupo Inmobiliario");
  const cuerpo = encodeURIComponent(
    `Nombre: ${nombre} ${apellidos}\n` +
    `Correo: ${correo}\n` +
    `Teléfono: ${telefono}\n` +
    `País: ${pais}\n\n` +
    `Consulta:\n${consulta}`
  );

  // Dirección de destino (puedes cambiarla por la del equipo de ventas)
  const destino = "ventas@grupoinmobiliario.com";

  // Abrir cliente de correo
  window.location.href = `mailto:${destino}?subject=${asunto}&body=${cuerpo}`;
});