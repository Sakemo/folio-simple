// script.js - Gerenciamento de seções, modo, slider e modal de vídeo

// Navegação entre seções
function showSection(sectionId, element) {
  // Remove a classe 'active' dos itens do menu e ativa o selecionado
  const menuItems = document.querySelectorAll(".nav-menu li");
  menuItems.forEach(item => item.classList.remove("active"));
  element.classList.add("active");

  // Seleciona todas as seções e o container da área de conteúdo
  const sections = document.querySelectorAll(".section");
  const contentArea = document.querySelector(".content-area");
  
  let newSection;
  sections.forEach(sec => {
    if (sec.id === sectionId) {
      sec.classList.add("active");
      newSection = sec;
    } else {
      sec.classList.remove("active");
    }
  });

  // Se a nova seção foi encontrada, anima a transição da altura
  if (newSection) {
    // Define a altura atual do container como fixa para permitir a transição
    contentArea.style.height = contentArea.offsetHeight + "px";
    // Força um reflow para garantir que o navegador registre o valor atual
    contentArea.offsetHeight;
    // Define a nova altura conforme a altura da seção ativa
    contentArea.style.height = newSection.offsetHeight + "px";

    // Após o término da transição, remove o valor inline para que o container volte a se ajustar automaticamente
    contentArea.addEventListener("transitionend", function handler() {
      contentArea.style.height = "auto";
      contentArea.removeEventListener("transitionend", handler);
    });

    // Se a seção for 'skills', executa a animação das barras de progresso
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
  const sliderContainer = document.querySelector(".slider-container");

  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === currentSlide) {
      slide.classList.add("active");
      // Ajusta a altura do container para a altura do slide ativo
      sliderContainer.style.height = slide.offsetHeight + "px";
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
