// script.js - Gerenciamento de seções, modo, slider e modal de vídeo

// Navegação entre seções
function showSection(sectionId, element) {
  // Remove a classe 'active' dos itens do menu e ativa o selecionado
  const menuItems = document.querySelectorAll(".nav-menu li");
  menuItems.forEach((item) => item.classList.remove("active"));
  element.classList.add("active");

  // Seleciona todas as seções e o container da área de conteúdo
  const sections = document.querySelectorAll(".section");
  const contentArea = document.querySelector(".content-area");

  let newSection;
  sections.forEach((sec) => {
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
  progressBars.forEach((bar) => {
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
// Exemplo de dados dos projetos
const projetos = {
  1: {
    titulo: "Projeto 1",
    descricao:
      "## Descrição\nEste projeto é sobre criação de uma aplicação web com foco em performance e usabilidade. *Tecnologias: HTML, CSS, JS*",
    video: "caminho/para/video1.mp4",
    linkProjeto: "https://exemplo.com/projeto1",
    linkGithub: "https://github.com/seuusuario/projeto1",
  },
  2: {
    titulo: "Projeto 2",
    descricao:
      "## Descrição\nProjeto focado em soluções mobile com design responsivo e backend robusto.",
    video: "caminho/para/video2.mp4",
    linkProjeto: "https://exemplo.com/projeto2",
    linkGithub: "https://github.com/seuusuario/projeto2",
  },
  // Adicione outros projetos conforme necessário...
};

// Função para abrir o modal de projeto
function openProjectModal(projectId) {
  const projeto = projetos[projectId];
  if (!projeto) return;

  const modal = document.getElementById("project-modal");
  const modalBody = modal.querySelector(".modal-body");

  // Limpa o conteúdo anterior
  modalBody.innerHTML = "";

  // Cria elemento para markdown (para simplificar, aqui inserimos o HTML resultante; idealmente, use uma biblioteca de markdown para HTML)
  const markdownContainer = document.createElement("div");
  markdownContainer.className = "modal-markdown";
  markdownContainer.innerHTML = projeto.descricao; // se desejar converter markdown para HTML, integre uma biblioteca como marked.js

  // Cria o vídeo
  const videoElem = document.createElement("video");
  videoElem.src = projeto.video;
  videoElem.controls = true;
  videoElem.autoplay = true;

  // Cria os botões
  const btnContainer = document.createElement("div");
  btnContainer.className = "modal-buttons";

  const projetoBtn = document.createElement("a");
  projetoBtn.href = projeto.linkProjeto;
  projetoBtn.target = "_blank";
  projetoBtn.innerText = "Ver Projeto";

  const githubBtn = document.createElement("a");
  githubBtn.href = projeto.linkGithub;
  githubBtn.target = "_blank";
  githubBtn.innerText = "Ver GitHub";

  btnContainer.appendChild(projetoBtn);
  btnContainer.appendChild(githubBtn);

  // Adiciona os elementos ao modal
  modalBody.appendChild(markdownContainer);
  modalBody.appendChild(videoElem);
  modalBody.appendChild(btnContainer);

  // Exibe o modal
  modal.style.display = "flex";
}

// Função para fechar o modal de projeto
function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  modal.style.display = "none";
}

// Event listener para os cards de projeto
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project-id");
    openProjectModal(projectId);
  });
});

// Opcional: fechar o modal ao clicar fora do conteúdo
document.getElementById("project-modal").addEventListener("click", (e) => {
  if (e.target.id === "project-modal") {
    closeProjectModal();
  }
});
