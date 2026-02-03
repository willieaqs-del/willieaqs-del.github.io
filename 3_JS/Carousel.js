const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.carousel-dots');
let currentIndex = 0;
let isTransitioning = false;

// Clonar primer slide al final
const firstClone = slides[0].cloneNode(true);
slidesContainer.appendChild(firstClone);

// Crear puntos
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('button');

function goToSlide(index) {
  if (isTransitioning) return;
  isTransitioning = true;

  slidesContainer.style.transition = 'transform 1s ease-in-out';
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  slides.forEach(slide => slide.classList.remove('active'));
  if (index < slides.length) slides[index].classList.add('active');

  dots.forEach(dot => dot.classList.remove('active'));
  if (index < dots.length) dots[index].classList.add('active');

  currentIndex = index;

  // Si estamos en el clon, volver al original sin transición
  if (index === slides.length) {
    setTimeout(() => {
      slidesContainer.classList.add('no-transition');
      slidesContainer.style.transform = `translateX(0%)`;
      currentIndex = 0;
      slidesContainer.offsetHeight; // fuerza reflow
      slidesContainer.classList.remove('no-transition');
      isTransitioning = false;
      goToSlide(0); // actualiza clases y dots
    }, 1000);
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 1000);
  }
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

goToSlide(0);
setInterval(nextSlide, 5000);
