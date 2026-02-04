// Recuperar moneda guardada si existe
let moneda = localStorage.getItem('monedaSeleccionada') || 'usd';
let tipoCambioUSD = 0; // global

// Mostrar moneda en el botón al cargar
const currencyToggle = document.getElementById('currency-toggle');
if (currencyToggle) {
  currencyToggle.innerHTML =
    moneda === 'usd' ? '₡ <span>CRC</span>':'$ <span>USD</span>';

  currencyToggle.addEventListener('click', () => {
    moneda = moneda === 'usd' ? 'crc' : 'usd';
    localStorage.setItem('monedaSeleccionada', moneda);

    currencyToggle.innerHTML =
      moneda === 'usd' ? '₡ <span>CRC</span>':'$ <span>USD</span>';

    // Disparar evento de cambio de moneda
    document.dispatchEvent(new CustomEvent('monedaCambiada', { detail: { moneda } }));
  });
}

// Obtener tipo de cambio
async function obtenerTipoCambio() {
  try {
    const respuesta = await fetch('https://api.hacienda.go.cr/indicadores/tc');
    const datos = await respuesta.json();
    tipoCambioUSD = datos.dolar.venta.valor;

    document.getElementById('usd-rate').textContent =
      `USD: ₡${tipoCambioUSD.toFixed(2)} = $1`;

    // Disparar evento de tipo de cambio cargado
    document.dispatchEvent(new CustomEvent('tipoCambioCargado', { detail: { tipoCambioUSD } }));
  } catch (error) {
    document.getElementById('usd-rate').textContent = 'Error...';
  }
}

function aplicarTipoCambio(moneda, tipoCambioUSD) {
  // Definir símbolo una sola vez por función
  const simbolo = (moneda === 'usd' && tipoCambioUSD > 0) ? '$' : '₡';

  const elementos = document.querySelectorAll('.TipoCambio');
  elementos.forEach(el => {
    const valorCRC = parseFloat(el.dataset.valor);
    if (isNaN(valorCRC)) return;

    // Convertir por elemento
    const valorConvertido = (moneda === 'usd' && tipoCambioUSD > 0)
      ? (valorCRC / tipoCambioUSD)
      : valorCRC;

    // Formateo según subtipo
    if (el.classList.contains('precio')) {
      el.textContent = `${simbolo}${valorConvertido.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    } else if (el.classList.contains('precio-original')) {
      // Precio original tachado
      el.innerHTML = `<s>${simbolo}${valorConvertido.toLocaleString(undefined, { maximumFractionDigits: 0 })}</s>`;
    } else if (el.classList.contains('precio-m2')) {
      el.textContent = `${simbolo}${valorConvertido.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    } else if (el.classList.contains('pago-mensual')) {
      el.textContent = `${simbolo}${Math.floor(valorConvertido).toLocaleString()}`;
    } else if (el.classList.contains('precio-financiamiento')) { 
      el.value = Math.floor(valorConvertido); 
    }
  });

  // Simbolo en otros elementos auxiliares
  document.querySelectorAll('.simbolo-precioMetro')
    .forEach(node => { node.textContent = `| ${simbolo}/m²:`; });

  // Actualizar tasa de financiamiento
  const financingSelect = document.getElementById("financing-type");
  if (financingSelect) {
    financingSelect.innerHTML = (moneda === "crc")
      ? `<option value="0.12">12% CRC</option>`
      : `<option value="0.08">8% USD</option>`;
  }

  // Actualizar label de precio
  const lotPriceLabel = document.querySelector('label[for="lot-price"]');
  if (lotPriceLabel) {
    lotPriceLabel.textContent = lotPriceLabel.textContent
      .replace(/\(.*\)/, moneda === "crc" ? "(₡)" : "($)");
  }

  // 🔹 Actualizar placeholders de filtros (minPrice / maxPrice)
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");

  if (minPriceInput) {
    const baseText = minPriceInput.placeholder.replace(/[\$\₡():]/g, "").trim();
    minPriceInput.placeholder = `${baseText} (${simbolo})`;
  }

  if (maxPriceInput) {
    const baseText = maxPriceInput.placeholder.replace(/[\$\₡():]/g, "").trim();
    maxPriceInput.placeholder = `${baseText} (${simbolo})`;
  }
}

// Inicializar
obtenerTipoCambio();
aplicarTipoCambio(moneda, tipoCambioUSD);

// Escuchar eventos
document.addEventListener('monedaCambiada', e => {
  aplicarTipoCambio(e.detail.moneda, tipoCambioUSD);
});

document.addEventListener('tipoCambioCargado', e => {
  aplicarTipoCambio(moneda, e.detail.tipoCambioUSD);
});

