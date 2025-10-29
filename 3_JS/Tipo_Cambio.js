// Recuperar moneda guardada si existe
let moneda = localStorage.getItem('monedaSeleccionada') || 'usd';

// Mostrar moneda en el botón al cargar
const currencyToggle = document.getElementById('currency-toggle');
if (currencyToggle) {
  currencyToggle.innerHTML =
    moneda === 'usd' ? '$ <span>USD</span>' : '₡ <span>CRC</span>';

  currencyToggle.addEventListener('click', () => {
    moneda = moneda === 'usd' ? 'eur' : 'usd';
    localStorage.setItem('monedaSeleccionada', moneda); 

    currencyToggle.innerHTML =
      moneda === 'usd' ? '$ <span>USD</span>' : '₡ <span>CRC</span>';
  });
}

// Obtener tipo de cambio
async function obtenerTipoCambio() {
  try {
    const respuesta = await fetch('https://api.hacienda.go.cr/indicadores/tc');
    const datos = await respuesta.json();
    const usdVenta = datos.dolar.venta.valor;
    document.getElementById('usd-rate').textContent = `USD: ₡${usdVenta.toFixed(2)} = $1`;
  } catch (error) {
    document.getElementById('usd-rate').textContent = 'Error...';
  }
}

obtenerTipoCambio();
