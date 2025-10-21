function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(html => {
        const fragment = document.createRange().createContextualFragment(html);
        el.replaceWith(fragment); 
      })
      .catch(err => console.error(`Error al cargar ${file}:`, err));
  });
}

window.addEventListener('DOMContentLoaded', includeHTML);