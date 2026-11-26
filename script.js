const WATT_WHATSAPP_NUMBER = "5491178248881"; // Argentina mobile, digits only.
const WATT_INSTAGRAM_URL = "https://www.instagram.com/watt_electricidad/";

const messages = document.querySelector("#chat-messages");
const options = document.querySelector("#chat-options");
const resetButton = document.querySelector("#chat-reset");
const answers = {};
const smartHome = "Smart home e iluminación";

const flow = [
  {
    key: "necesidad",
    prompt: "¡Hola! ¿Qué tipo de trabajo necesitás?",
    choices: ["Instalación integral", "Obra nueva", "Reforma o ampliación", "Servicio puntual", smartHome, "Otra consulta"]
  },
  {
    key: "domotica",
    prompt: "¿En qué te podemos ayudar con tu smart home?",
    choices: ["Instalar un equipo smart home", "Instalar luminarias inteligentes", "Integrar mis equipos con Alexa", "Programar horarios", "Busco asesoramiento"]
  },
  {
    key: "espacio",
    prompt: "¿En qué espacio sería el trabajo?",
    choices: ["Vivienda", "Local o consultorio", "Empresa / industria", "Otro"]
  },
  {
    key: "zona",
    prompt: "¿En qué localidad está el proyecto?",
    choices: ["CABA", "GBA", "Necochea", "Otra localidad"]
  },
  {
    key: "momento",
    prompt: "¿Para cuándo lo estás pensando?",
    choices: ["Es urgente", "En las próximas semanas", "Estoy planificando"]
  }
];

let step = 0;

function addMessage(text, type = "bot") {
  const item = document.createElement("div");
  item.className = `message ${type}-message`;
  item.textContent = text;
  messages.append(item);
  messages.scrollTop = messages.scrollHeight;
}

function showQuestion() {
  if (flow[step]?.key === "domotica" && answers.necesidad !== smartHome) step += 1;
  if (step >= flow.length) return showContact();
  const question = flow[step];
  addMessage(question.prompt);
  options.replaceChildren();
  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chat-option";
    button.textContent = choice;
    button.addEventListener("click", () => answerQuestion(choice));
    options.append(button);
  });
}

function answerQuestion(choice) {
  answers[flow[step].key] = choice;
  addMessage(choice, "user");
  step += 1;
  showQuestion();
}

function showContact() {
  addMessage("¡Listo! Con esto ya podemos orientarte mejor. ¿Querés continuar por WhatsApp?");
  options.replaceChildren();
  const button = document.createElement("a");
  button.className = "chat-result";
  button.target = "_blank";
  button.rel = "noreferrer";
  const detail = [
    "Hola WATT, llegué desde la web.",
    `Necesito: ${answers.necesidad}.`,
    ...(answers.domotica ? [`Me interesa: ${answers.domotica}.`] : []),
    `Espacio: ${answers.espacio}.`,
    `Localidad: ${answers.zona}.`,
    `Tiempo: ${answers.momento}.`,
    "¿Me pueden ayudar?"
  ].join(" ");
  button.href = `https://wa.me/${WATT_WHATSAPP_NUMBER}?text=${encodeURIComponent(detail)}`;
  button.textContent = "Continuar por WhatsApp";
  options.append(button);
  const restart = document.createElement("button");
  restart.type = "button";
  restart.className = "chat-option";
  restart.textContent = "Volver a empezar";
  restart.addEventListener("click", resetChat);
  options.append(restart);
}

function resetChat() {
  step = 0;
  Object.keys(answers).forEach((key) => delete answers[key]);
  messages.replaceChildren();
  showQuestion();
}

resetButton.addEventListener("click", resetChat);
document.querySelector("#smart-home-contact").addEventListener("click", () => {
  resetChat();
  answerQuestion(smartHome);
});
resetChat();

const fotoCallao = document.querySelector("#foto-callao");
const epigrafeCallao = document.querySelector("#epigrafe-callao");
const selectorVistas = document.querySelector(".selector-vistas");
const vistasCallao = {
  recepcion: {
    src: fotoCallao.getAttribute("src"), alt: fotoCallao.alt,
    caption: epigrafeCallao.textContent
  },
  tablero: {
    src: "assets/callao-tablero.jpg", alt: "Detalle del tablero eléctrico del consultorio",
    caption: "Tablero · La identificación permite ubicar cada circuito."
  },
  extractor: {
    src: "assets/callao-extractor-montaje.jpg", alt: "Extractor en montaje sobre la pared",
    caption: "Extractor · Montaje en la pared durante la visita del 18 de noviembre."
  }
};
selectorVistas.hidden = false;
selectorVistas.addEventListener("click", (event) => {
  const elegido = event.target.closest("button[data-vista]");
  if (!elegido) return;
  const vista = vistasCallao[elegido.dataset.vista];
  fotoCallao.src = vista.src;
  fotoCallao.alt = vista.alt;
  fotoCallao.dataset.vista = elegido.dataset.vista;
  epigrafeCallao.textContent = vista.caption;
  selectorVistas.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === elegido)));
});

const portfolio = {
  callao: {
    title: "Consultorio Callao", kicker: "OBRA COMERCIAL · ESPACIO DE SALUD",
    description: "Instalación eléctrica para un consultorio odontológico: iluminación, alimentación de equipos y tableros organizados para el uso diario.",
    media: [
      { type: "image", src: "assets/callao-consultorio.jpg", alt: "Consultorio odontológico terminado" },
      { type: "image", src: "assets/callao-recepcion.jpg", alt: "Iluminación perimetral en recepción", title: "Recepción · Registro de noviembre de 2026" },
      { type: "image", src: "assets/callao-sala.jpg", alt: "Iluminación de la sala del consultorio" },
      { type: "image", src: "assets/callao-tablero.jpg", alt: "Tablero eléctrico del consultorio" },
      { type: "instagram", id: "Dep1yKiu2c4", src: "assets/instagram-reel-callao.jpg", alt: "Portada del Reel de la instalación eléctrica integral en Consultorios de Callao", title: "Ver la obra en Instagram" }
    ]
  },
  trafwe: {
    title: "Balneario Trafwe", kicker: "OBRA COMERCIAL · NECOCHEA",
    description: "Trabajo eléctrico en un espacio comercial de Necochea, con planificación, ejecución y verificación de la instalación.",
    media: [
      { type: "image", src: "assets/trafwe-local.jpg", alt: "Frente del Balneario Trafwe" },
      { type: "image", src: "assets/trafwe-tablero.jpg", alt: "Tablero eléctrico del balneario" },
      { type: "instagram", id: "DeaizPkuXKS", src: "assets/instagram-reel-trafwe.jpg", alt: "Portada del Reel de readecuación eléctrica del Balneario Trafwe", title: "Ver la obra en Instagram" }
    ]
  },
  extractor: {
    title: "Colocación de extractor", kicker: "VISITA DEL 18 DE NOVIEMBRE DE 2026 · CALLAO",
    description: "En esta visita colocamos un extractor en el consultorio. Las dos fotos muestran el lugar de la intervención y el equipo durante el montaje.",
    media: [
      { type: "image", src: "assets/callao-extractor-abertura.jpg", alt: "Abertura circular en la pared", title: "Ubicación de la abertura" },
      { type: "image", src: "assets/callao-extractor-montaje.jpg", alt: "Extractor presentado en la pared durante el montaje", title: "Montaje del extractor" }
    ]
  },
  videos: {
    title: "Videos de obra", kicker: "WATT · PROCESOS REALES",
    description: "Portadas reales de los Reels de WATT. Cada imagen abre el video original en Instagram.",
    media: [
      { type: "instagram", id: "DeXWOWjugMg", src: "assets/instagram-reel-reparacion.jpg", alt: "Portada de WATT para el Reel de relevamiento y reparación eléctrica", title: "Relevamiento y reparación" },
      { type: "instagram", id: "DeXshmzOEel", src: "assets/instagram-reel-fin-obra.jpg", alt: "Portada del Reel de cierre de obra de WATT", title: "Fin de obra" },
      { type: "instagram", id: "DeaizPkuXKS", src: "assets/instagram-reel-trafwe.jpg", alt: "Portada del Reel del Balneario Trafwe en Necochea", title: "Balneario Trafwe · Necochea" },
      { type: "instagram", id: "Dep1yKiu2c4", src: "assets/instagram-reel-callao.jpg", alt: "Portada del Reel de Consultorios de Callao", title: "Consultorios de Callao" }
    ]
  }
};

const dialog = document.querySelector("#project-dialog");
const dialogGallery = document.querySelector("#dialog-gallery");
document.querySelectorAll(".folder-card").forEach((card) => {
  card.addEventListener("click", () => {
    const project = portfolio[card.dataset.project];
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-kicker").textContent = project.kicker;
    document.querySelector("#dialog-description").textContent = project.description;
    dialogGallery.replaceChildren();
    project.media.forEach((item) => {
      const figure = document.createElement("figure");
      if (item.type === "instagram") {
        figure.classList.add("instagram-reel");
        const link = document.createElement("a");
        link.className = "reel-preview-link";
        link.href = `https://www.instagram.com/reel/${item.id}/`;
        link.target = "_blank";
        link.rel = "noreferrer";
        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.alt;
        image.loading = "lazy";
        const overlay = document.createElement("span");
        overlay.className = "reel-preview-cta";
        overlay.textContent = "Ver Reel en Instagram";
        link.append(image, overlay);
        figure.append(link);
      } else {
        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.alt;
        image.loading = "lazy";
        figure.append(image);
      }
      const caption = document.createElement("figcaption");
      caption.textContent = item.title || item.alt;
      figure.append(caption);
      dialogGallery.append(figure);
    });
    dialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.querySelector(".dialog-contact a").addEventListener("click", () => dialog.close());

document.querySelectorAll(".portfolio-filter").forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelectorAll(".portfolio-filter").forEach((button) => button.classList.toggle("is-active", button === filter));
    document.querySelectorAll(".folder-card").forEach((card) => {
      card.hidden = filter.dataset.filter !== "all" && card.dataset.kind !== filter.dataset.filter;
    });
  });
});
