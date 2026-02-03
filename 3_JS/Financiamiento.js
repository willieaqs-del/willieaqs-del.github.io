document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("credit-calculator");
  const lotPriceInput = document.getElementById("lot-price");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const price = parseFloat(lotPriceInput.value);
    const months = parseInt(document.getElementById("installments").value);
    const annualRate = parseFloat(document.getElementById("financing-type").value);
    const monthlyRate = annualRate / 12;
    const downPaymentPercent = parseFloat(document.getElementById("down-payment").value);

    if (isNaN(price) || isNaN(months) || isNaN(monthlyRate) || isNaN(downPaymentPercent)) return;

    let primaAmount = price * downPaymentPercent;
    let financedAmount = price - primaAmount;

    // Caso especial: contado (100%)
    if (downPaymentPercent === 1) {
      const discountedPrice = price * 0.95; // 5% descuento
      primaAmount = discountedPrice;
      financedAmount = 0;
    }

    // Mostrar prima
    document.getElementById("prima-amount").value = 
      `₡${primaAmount.toLocaleString("es-CR", { minimumFractionDigits: 2 })}`;

    // Calcular cuota solo si hay financiamiento
    let cuota = 0;
    if (financedAmount > 0) {
      cuota = (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    }

    document.getElementById("result").value = 
      cuota > 0 
        ? `₡${cuota.toLocaleString("es-CR", { minimumFractionDigits: 2 })}`
        : " - ";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const lotPriceInput = document.getElementById("lot-price");
  const params = new URLSearchParams(window.location.search);
  const precio = params.get("precio"); // ?precio=12345

  if (precio) {
    // asignar valor crudo al input
    lotPriceInput.value = precio;

    // bloquear edición
    lotPriceInput.readOnly = true;

    // guardar el valor recibido en data-valor (siempre en colones)
    lotPriceInput.dataset.valor = precio;
  } else {
    lotPriceInput.readOnly = false;
  }

  setTimeout(() => {
    const formSection = document.querySelector(".contact-form-section");
    if (formSection) {
      const offset = 160; // píxeles de margen superior
      const top = formSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, 700); // espera antes de hacer scroll

});
