document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("credit-calculator");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const price = parseFloat(document.getElementById("lot-price").value);
    const months = parseInt(document.getElementById("installments").value);
    const annualRate = parseFloat(document.getElementById("financing-type").value);
    const monthlyRate = annualRate / 12;

    if (isNaN(price) || isNaN(months) || isNaN(monthlyRate)) return;

    // Fórmula de cuota mensual tipo francés
    const cuota = (price * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    document.getElementById("result").value = `₡${cuota.toFixed(2).toLocaleString()}`;
  });
});