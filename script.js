const WATT_WHATSAPP_NUMBER = "5491178248881"; // Argentina mobile, digits only.
const WATT_INSTAGRAM_URL = "https://www.instagram.com/watt_electricidad/";

const instagramLink = document.querySelector("#instagram-link");
instagramLink.href = WATT_INSTAGRAM_URL;
const whatsappLink = document.querySelector(".whatsapp-link");
whatsappLink.href = `https://wa.me/${WATT_WHATSAPP_NUMBER}`;
whatsappLink.target = "_blank";
whatsappLink.rel = "noreferrer";

const messages = document.querySelector("#chat-messages");
const options = document.querySelector("#chat-options");
const resetButton = document.querySelector("#chat-reset");
const answers = {};

const flow = [
  {
    key: "necesidad",
    prompt: "¿Qué tipo de consulta tenés?",
    choices: ["Instalación integral", "Obra nueva", "Reforma o ampliación", "Servicio puntual", "Otra consulta"]
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
  if (step >= flow.length) return showContact();
  const question = flow[step];
  addMessage(question.prompt);
  options.replaceChildren();
  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chat-option";
    button.textContent = choice;
    button.addEventListener("click", () => {
      answers[question.key] = choice;
      addMessage(choice, "user");
      step += 1;
      window.setTimeout(showQuestion, 260);
    });
    options.append(button);
  });
}

function showContact() {
  addMessage("¡Listo! Con esto ya podemos orientarte mejor. ¿Querés continuar por WhatsApp?");
  options.replaceChildren();
  const button = document.createElement("a");
  button.className = "chat-result";
  button.target = "_blank";
  button.rel = "noreferrer";
  const detail = [
    "Hola Watt, llegué desde la web.",
    `Necesito: ${answers.necesidad}.`,
    `Espacio: ${answers.espacio}.`,
    `Localidad: ${answers.zona}.`,
    `Tiempo: ${answers.momento}.`,
    "¿Me pueden ayudar?"
  ].join(" ");
  button.href = `https://wa.me/${WATT_WHATSAPP_NUMBER}?text=${encodeURIComponent(detail)}`;
  button.textContent = "Seguir por WhatsApp ↗";
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
  addMessage("¡Hola! 👋 Te ayudo a encontrar el mejor camino. ¿Qué tipo de consulta tenés?");
  options.replaceChildren();
  flow[0].choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chat-option";
    button.textContent = choice;
    button.addEventListener("click", () => {
      answers[flow[0].key] = choice;
      addMessage(choice, "user");
      step = 1;
      window.setTimeout(showQuestion, 260);
    });
    options.append(button);
  });
}

resetButton.addEventListener("click", resetChat);
resetChat();

const portfolio = {
  callao: {
    title: "Consultorio Callao", kicker: "OBRA COMERCIAL · ESPACIO DE SALUD",
    description: "Instalación eléctrica para un consultorio odontológico: iluminación, alimentación de equipos y tableros organizados para el uso diario.",
    media: [
      { type: "image", src: "assets/callao-consultorio.jpg", alt: "Consultorio odontológico terminado" },
      { type: "image", src: "assets/callao-sala.jpg", alt: "Iluminación de la sala del consultorio" },
      { type: "image", src: "assets/callao-tablero.jpg", alt: "Tablero eléctrico del consultorio" }
    ]
  },
  trafwe: {
    title: "Balneario Trafwe", kicker: "OBRA COMERCIAL · NECOCHEA",
    description: "Trabajo eléctrico en un espacio comercial de Necochea, con planificación, ejecución y verificación de la instalación.",
    media: [
      { type: "image", src: "assets/trafwe-local.jpg", alt: "Frente del Balneario Trafwe" },
      { type: "image", src: "assets/trafwe-tablero.jpg", alt: "Tablero eléctrico del balneario" }
    ]
  },
  residencial: {
    title: "Mejoras en el hogar", kicker: "SERVICIOS PUNTUALES · NECOCHEA",
    description: "También resolvemos trabajos concretos en viviendas: colocación de luminarias, extractores, ventiladores, tomas y revisión de fallas eléctricas.",
    media: [
      { type: "image", src: "assets/residencial-luminaria.jpg", alt: "Colocación de una luminaria colgante" },
      { type: "image", src: "assets/residencial-luminaria-detalle.jpg", alt: "Detalle de instalación de luminaria" },
    ]
  },
  videos: {
    title: "Videos de obra", kicker: "WATT · PROCESOS REALES",
    description: "Cuatro Reels de trabajos realizados por WATT. Los videos se cargan desde Instagram al abrir esta carpeta.",
    media: [
      { type: "instagram", id: "DeXWOWjugMg", title: "Proceso de obra WATT · 1" },
      { type: "instagram", id: "DeXshmzOEel", title: "Proceso de obra WATT · 2" },
      { type: "instagram", id: "DeaizPkuXKS", title: "Proceso de obra WATT · 3" },
      { type: "instagram", id: "Dep1yKiu2c4", title: "Proceso de obra WATT · 4" }
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
        const blockquote = document.createElement("blockquote");
        blockquote.className = "instagram-media";
        blockquote.dataset.instgrmPermalink = `https://www.instagram.com/reel/${item.id}/`;
        blockquote.dataset.instgrmVersion = "14";
        const fallback = document.createElement("a");
        fallback.href = blockquote.dataset.instgrmPermalink;
        fallback.target = "_blank";
        fallback.rel = "noreferrer";
        fallback.textContent = `${item.title} · Abrir en Instagram ↗`;
        blockquote.append(fallback);
        figure.append(blockquote);
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
    if (!document.querySelector("#instagram-embed-script")) {
      const embedScript = document.createElement("script");
      embedScript.id = "instagram-embed-script";
      embedScript.async = true;
      embedScript.src = "https://www.instagram.com/embed.js";
      embedScript.onload = () => window.instgrm?.Embeds?.process();
      document.body.append(embedScript);
    } else {
      window.instgrm?.Embeds?.process();
    }
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
