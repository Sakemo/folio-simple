// script.js - Gerenciamento de seções, modo, slider e modal de vídeo

// Navegação entre seções
function showSection(sectionId, element) {
  const menuItems = document.querySelectorAll(".nav-menu li");
  menuItems.forEach(item => item.classList.remove("active"));
  element.classList.add("active");

  const sections = document.querySelectorAll(".section");
  sections.forEach(sec => sec.classList.remove("active"));

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add("active");
    if (sectionId === "skills") {
      animateSkills();
    }
  }
}

// Anima as barras de progresso na seção Skills
function animateSkills() {
  const progressBars = document.querySelectorAll(".skill-progress");
  progressBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 100);
  });
}

// Alterna entre modo escuro e claro com animação no botão
function toggleMode() {
  const modeBtn = document.getElementById("mode-toggle");
  modeBtn.classList.add("animate");
  setTimeout(() => {
    modeBtn.classList.remove("animate");
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
      modeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      modeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }, 600);
}

/* Slider de Projetos (simulação de slide infinito) */
let currentSlide = 0;
function updateSlide() {
  const slides = document.querySelectorAll(".slider-container .project-item");
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if(index === currentSlide) {
      slide.classList.add("active");
    }
  });
}
function nextSlide() {
  const slides = document.querySelectorAll(".slider-container .project-item");
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
}
function prevSlide() {
  const slides = document.querySelectorAll(".slider-container .project-item");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
}

/* Modal de Vídeo */
function openVideoModal(videoSrc) {
  const modal = document.getElementById("video-modal");
  const modalContent = modal.querySelector(".modal-content");
  modalContent.innerHTML = "";
  const videoElem = document.createElement("video");
  videoElem.src = videoSrc;
  videoElem.controls = true;
  videoElem.autoplay = true;
  modalContent.appendChild(videoElem);
  modal.style.display = "flex";
}
function closeVideoModal(event) {
  const modal = document.getElementById("video-modal");
  modal.style.display = "none";
}
