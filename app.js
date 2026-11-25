
const simulations = [
  {
    id: "phishing",
    category: "phishing",
    icon: "@",
    title: "Correo de bloqueo bancario",
    description: "Identifica la urgencia falsa, un remitente alterado y un enlace sospechoso.",
    difficulty: "Básico",
    duration: "6 min",
    scenario: {
      sender: "alertas@seguridad-banc0.example",
      subject: "Bloqueo inmediato de cuenta",
      message: "Detectamos una operación inusual. Si no confirmas tus datos en los próximos 15 minutos, tu cuenta será bloqueada.",
      url: "https://banco-seguro-verifica.example"
    },
    options: [
      "Abrir el enlace y completar los datos solicitados.",
      "Ingresar por mi cuenta a la aplicación oficial y verificar allí.",
      "Responder el correo pidiendo que confirmen mi saldo."
    ],
    correct: 1,
    advice: "Abre la aplicación oficial escribiendo tú mismo la dirección o usando una aplicación instalada. Nunca ingreses desde el enlace del mensaje."
  },
  {
    id: "banca",
    category: "banca",
    icon: "$",
    title: "Alerta de operación bancaria",
    description: "Verifica una alerta de seguridad y evita compartir claves.",
    difficulty: "Básico",
    duration: "6 min",
    scenario: {
      sender: "avisos@banco-alerta.example",
      subject: "Operación desconocida",
      message: "Confirma tu clave inmediatamente para cancelar una operación que no reconoces.",
      url: "https://banco-alerta.example"
    },
    options: [
      "Entregar mi clave por el enlace.",
      "Consultar la aplicación oficial y contactar al banco por un número conocido.",
      "Responder con mis datos personales."
    ],
    correct: 1,
    advice: "Consulta el banco por sus canales oficiales y nunca compartas tus claves."
  },
  {
    id: "billetera",
    category: "finanzas",
    icon: "$",
    title: "Transferencia en billetera digital",
    description: "Decide qué hacer ante un supuesto pago retenido y una solicitud de código.",
    difficulty: "Básico",
    duration: "5 min",
    scenario: {
      sender: "Soporte de pagos",
      subject: "Transferencia retenida",
      message: "Tienes S/ 180 pendientes. Envíanos el código de seis dígitos que llegará a tu celular para liberar el dinero.",
      url: "Conversación simulada"
    },
    options: [
      "Compartir el código para recibir el dinero.",
      "Revisar el movimiento desde la aplicación oficial y no compartir códigos.",
      "Solicitar que envíen otro código."
    ],
    correct: 1,
    advice: "Los códigos de verificación autorizan acciones. No los compartas y verifica el saldo únicamente desde la aplicación oficial."
  },
  {
    id: "tienda",
    category: "compras",
    icon: "◫",
    title: "Tienda virtual demasiado conveniente",
    description: "Evalúa una oferta extrema antes de pagar en una tienda desconocida.",
    difficulty: "Intermedio",
    duration: "8 min",
    scenario: {
      sender: "SuperOfertas",
      subject: "Últimas unidades con 85 % de descuento",
      message: "Compra en los próximos 5 minutos. Solo aceptamos transferencia directa para mantener el precio promocional.",
      url: "super-ofertas-hoy.example"
    },
    options: [
      "Transferir antes de que termine el contador.",
      "Buscar reputación, políticas, contacto y medios de pago protegidos.",
      "Enviar una foto de mi tarjeta para separar el producto."
    ],
    correct: 1,
    advice: "Investiga la tienda, contrasta el precio y usa un medio de pago con protección al comprador."
  },
  {
    id: "laboral",
    category: "trabajo",
    icon: "▣",
    title: "Solicitud urgente de un superior",
    description: "Practica cómo verificar una petición inusual dentro de un contexto laboral.",
    difficulty: "Intermedio",
    duration: "7 min",
    scenario: {
      sender: "Dirección General",
      subject: "Documento confidencial",
      message: "Estoy en una reunión. Envíame ahora la lista completa de clientes y sus teléfonos por este medio. No consultes con nadie.",
      url: "Correo externo simulado"
    },
    options: [
      "Enviar el archivo para evitar retrasos.",
      "Confirmar por un canal conocido y aplicar el procedimiento de la organización.",
      "Publicar el archivo en un enlace abierto y responder."
    ],
    correct: 1,
    advice: "Verifica solicitudes inusuales mediante un canal conocido y respeta los procedimientos de protección de datos de tu organización."
  }
];

const categories = {
  phishing: "Phishing",
  banca: "Fraude bancario",
  finanzas: "Billeteras digitales",
  compras: "Comercio electrónico",
  trabajo: "Fraude laboral"
};

const checks = {
  phishing: [
    [
      "¿Qué señal observas en el remitente?",
      [
        "El dominio contiene un cero en lugar de una letra o.",
        "El asunto confirma que es auténtico.",
        "El nombre visible demuestra que es del banco."
      ],
      0,
      "Remitente alterado",
      "El dominio contiene un cero en lugar de una letra o. El nombre visible no acredita la identidad."
    ],
    [
      "¿Cómo debes tratar el enlace?",
      [
        "Abrirlo porque parece bancario.",
        "Evitarlo y comprobar el dominio por un canal oficial.",
        "Compartirlo con otras personas."
      ],
      1,
      "Enlace no verificado",
      "Un dominio parecido al oficial no demuestra autenticidad. También debes desconfiar de los mensajes que utilizan presión de tiempo."
    ]
  ],

  banca: [
    [
      "¿Qué debes comprobar del remitente?",
      [
        "Que tenga un asunto urgente.",
        "Que su identidad coincida con un canal oficial independiente.",
        "Que el texto incluya la palabra banco."
      ],
      1,
      "Remitente no verificado",
      "La identidad del remitente debe comprobarse independientemente desde los canales oficiales."
    ],
    [
      "¿Qué señal presenta el enlace?",
      [
        "Solicita una clave bancaria por un canal no verificado.",
        "Es seguro porque empieza por HTTPS.",
        "No hay riesgo porque promete cancelar una operación."
      ],
      0,
      "Solicitud de claves",
      "HTTPS no garantiza que el sitio pertenezca al banco. Nunca debes entregar tus claves mediante enlaces sospechosos."
    ]
  ],

  billetera: [
    [
      "¿Qué información debes proteger?",
      [
        "El importe mostrado.",
        "El código de seis dígitos.",
        "La hora del mensaje."
      ],
      1,
      "Código de verificación",
      "Un código de verificación puede autorizar acciones en tu cuenta. Nunca debes compartirlo con desconocidos."
    ],
    [
      "¿Dónde puedes comprobar la transferencia?",
      [
        "En la aplicación oficial.",
        "En una captura enviada por el desconocido.",
        "En el chat del supuesto soporte."
      ],
      0,
      "Verificación independiente",
      "Comprueba el movimiento real dentro de la aplicación oficial. Una captura de pantalla puede ser manipulada."
    ]
  ],

  tienda: [
    [
      "¿Qué señal de presión aparece?",
      [
        "Un horario comercial.",
        "Un contador de cinco minutos.",
        "Una política de devoluciones."
      ],
      1,
      "Urgencia artificial",
      "El contador busca limitar el tiempo de análisis y provocar una compra impulsiva."
    ],
    [
      "¿Qué debes comprobar del sitio?",
      [
        "Solo el color y el logotipo.",
        "Solo que el descuento sea grande.",
        "El dominio, la reputación y las políticas de compra."
      ],
      2,
      "Tienda no verificada",
      "La apariencia no garantiza que una tienda sea legítima. Debes investigar su reputación y condiciones antes de pagar."
    ]
  ],

  laboral: [
    [
      "¿Cómo verificas la identidad del superior?",
      [
        "Usando un contacto conocido de la organización.",
        "Confiando en el nombre visible.",
        "Enviando primero el archivo."
      ],
      0,
      "Suplantación de identidad",
      "Confirma la identidad por un canal independiente antes de proporcionar información de la organización."
    ],
    [
      "¿Qué señal de riesgo contiene la solicitud?",
      [
        "Pide información pública.",
        "Pide datos sensibles y ordena no consultar a nadie.",
        "Permite verificar el procedimiento."
      ],
      1,
      "Solicitud de datos sensibles",
      "Las solicitudes que evitan los controles internos y exigen información confidencial requieren una verificación adicional."
    ]
  ]
};

for (const item of simulations) {
  item.steps = checks[item.id].map(
    ([question, options, correct, signal, explanation]) => ({
      question,
      options,
      correct,
      signal,
      explanation
    })
  );

  item.steps.push({
    question: "¿Qué decisión tomarías en esta situación?",
    options: item.options,
    correct: item.correct,
    signal: "Respuesta preventiva",
    explanation: item.advice
  });
}

const $ = selector => document.querySelector(selector);

const $$ = selector =>
  Array.from(document.querySelectorAll(selector));

const escapeHtml = value =>
  String(value ?? "").replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]
  );

const storageKey = "scamsim-history";

let storageAvailable = true;

function loadHistory() {
  try {
    const data = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    );

    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter(
      item =>
        item &&
        typeof item.title === "string" &&
        Number.isFinite(item.score) &&
        item.score >= 0 &&
        item.score <= 100
    );
  } catch {
    storageAvailable = false;
    return [];
  }
}

const state = {
  filter: "todas",
  difficulty: "todas",
  selected: null,
  step: 0,
  answers: [],
  history: loadHistory(),
  view: "inicio",
  saved: false
};

function saveHistory() {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify(state.history)
    );

    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
}

function renderCatalog() {
  const visible = simulations.filter(item => {
    const categoryMatches =
      state.filter === "todas" ||
      item.category === state.filter;

    const difficultyMatches =
      state.difficulty === "todas" ||
      item.difficulty === state.difficulty;

    return categoryMatches && difficultyMatches;
  });

  $("#catalog-count").textContent =
    `${visible.length} ${
      visible.length === 1
        ? "práctica disponible"
        : "prácticas disponibles"
    }`;

  if (!visible.length) {
    $("#catalog-grid").innerHTML = `
      <p class="empty-state">
        No hay prácticas con los filtros seleccionados.
      </p>
    `;

    return;
  }

  $("#catalog-grid").innerHTML = visible.map(item => `
    <article class="simulation-card">

      <div class="card-top">
        <span class="category-icon" aria-hidden="true">
          ${item.icon}
        </span>

        <span class="difficulty">
          ${item.difficulty}
        </span>
      </div>

      <h3>${item.title}</h3>

      <p>${item.description}</p>

      <div class="card-meta">
        <span>${categories[item.category]}</span>
        <span>${item.duration}</span>
        <span>${item.steps.length} etapas</span>
      </div>

      <button
        class="card-link"
        type="button"
        data-open="${item.id}"
      >
        Ver detalle
        <span class="sr-only">de ${item.title}</span>
      </button>

    </article>
  `).join("");
}

function showView(id) {
  const actualView =
    id === "como-funciona" ? "inicio" : id;

  const target = document.getElementById(actualView);

  if (!target || !target.classList.contains("view")) {
    return;
  }

  state.view = actualView;

  $$(".view").forEach(view => {
    view.hidden = view !== target;
  });

  const simulationViews = [
    "detalle",
    "practica",
    "retroalimentacion",
    "resultados"
  ];

  const activeNavigation =
    simulationViews.includes(actualView)
      ? "simulaciones"
      : actualView;

  $$(".desktop-nav a, .mobile-nav a").forEach(link => {
    if (link.hash === `#${activeNavigation}`) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (actualView === "progreso") {
    renderProgress();
  }

  const focusTarget =
    id === "como-funciona"
      ? document.getElementById(id)
      : target;

  focusTarget.tabIndex = -1;

  focusTarget.focus({
    preventScroll: true
  });

  focusTarget.scrollIntoView({
    block: "start",
    behavior: matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
      ? "auto"
      : "smooth"
  });
}

function openDetail(id) {
  const item = simulations.find(
    simulation => simulation.id === id
  );

  if (!item) {
    return;
  }

  state.selected = item;

  $("#detail-content").innerHTML = `
    <div class="detail-layout">

      <article class="detail-main">

        <span class="category-icon" aria-hidden="true">
          ${item.icon}
        </span>

        <h2>${item.title}</h2>

        <p>${item.description}</p>

        <h3>En esta práctica aprenderás a</h3>

        <ul>
          ${item.steps.map(step => `
            <li>${step.signal}</li>
          `).join("")}
        </ul>

        <h3>Instrucciones</h3>

        <p>
          Lee cuidadosamente el mensaje presentado.
          Selecciona una respuesta en cada etapa,
          confirma tu decisión y revisa la explicación
          antes de continuar.
        </p>

        <p>
          No necesitas ingresar datos personales,
          claves ni información financiera real.
        </p>

      </article>

      <aside class="detail-side">

        <dl>

          <div>
            <dt>Categoría</dt>
            <dd>${categories[item.category]}</dd>
          </div>

          <div>
            <dt>Dificultad</dt>
            <dd>${item.difficulty}</dd>
          </div>

          <div>
            <dt>Duración</dt>
            <dd>${item.duration}</dd>
          </div>

          <div>
            <dt>Etapas</dt>
            <dd>${item.steps.length}</dd>
          </div>

          <div>
            <dt>Modalidad</dt>
            <dd>Simulación educativa</dd>
          </div>

        </dl>

        <p>
          <strong>Importante:</strong>
          todos los datos y enlaces son ficticios.
        </p>

        <button
          class="primary-button"
          id="start-simulation"
          type="button"
        >
          Iniciar simulación
        </button>

      </aside>

    </div>
  `;

  $("#start-simulation").onclick = startSimulation;

  showView("detalle");
}

function startSimulation() {
  if (!state.selected) {
    return;
  }

  state.step = 0;
  state.answers = [];
  state.saved = false;

  renderPractice();

  showView("practica");
}

function renderPractice() {
  const item = state.selected;

  if (!item) {
    return;
  }

  const step = item.steps[state.step];

  const total = item.steps.length;

  const progress = Math.round(
    state.answers.length / total * 100
  );

  $("#practice-title").textContent = item.title;

  $("#step-label").textContent =
    `Paso ${state.step + 1} de ${total}`;

  $("#practice-progress").style.width =
    `${progress}%`;

  $("#progress-track").setAttribute(
    "aria-valuemax",
    total
  );

  $("#progress-track").setAttribute(
    "aria-valuenow",
    state.answers.length
  );

  $("#progress-track").setAttribute(
    "aria-valuetext",
    `${progress}% completado`
  );

  $("#scenario-card").innerHTML = `
    <div class="scenario-meta">

      <strong>De</strong>

      <span>${item.scenario.sender}</span>

      <strong>Asunto</strong>

      <span>${item.scenario.subject}</span>

    </div>

    <div class="scenario-message">

      <p>${item.scenario.message}</p>

      <div class="fake-url">
        ${item.scenario.url}
      </div>

    </div>

    <p class="empty-state">
      Mensaje ficticio utilizado exclusivamente
      con fines educativos.
    </p>
  `;

  $("#answer-options").innerHTML = `
    <legend>${step.question}</legend>

    ${step.options.map((option, index) => `
      <label class="answer-option">

        <input
          type="radio"
          name="answer"
          value="${index}"
        >

        <span>${option}</span>

      </label>
    `).join("")}
  `;

  $("#answer-error").textContent = "";

  $("#confirm-answer").disabled = false;
}

function confirmAnswer() {
  if (
    state.view !== "practica" ||
    !state.selected
  ) {
    return;
  }

  const selected = $(
    'input[name="answer"]:checked'
  );

  if (!selected) {
    $("#answer-error").textContent =
      "Selecciona una opción antes de continuar.";

    $("#answer-options").focus();

    return;
  }

  $("#confirm-answer").disabled = true;

  const step = state.selected.steps[state.step];

  const choice = Number(selected.value);

  const safe = choice === step.correct;

  state.answers.push({
    question: step.question,
    selected: step.options[choice],
    expected: step.options[step.correct],
    safe,
    signal: step.signal,
    explanation: step.explanation
  });

  const total = state.selected.steps.length;

  const progress = Math.round(
    state.answers.length / total * 100
  );

  $("#practice-progress").style.width =
    `${progress}%`;

  $("#progress-track").setAttribute(
    "aria-valuenow",
    state.answers.length
  );

  $("#progress-track").setAttribute(
    "aria-valuetext",
    `${progress}% completado`
  );

  $("#feedback-content").innerHTML = `
    <article class="feedback-box ${
      safe ? "safe" : "risky"
    }">

      <p class="eyebrow">
        Etapa ${state.step + 1} de ${total}
        · Entorno simulado
      </p>

      <span class="feedback-status">
        ${safe ? "Decisión segura" : "Decisión de riesgo"}
      </span>

      <h2>
        ${safe ? "¡Buena decisión!" : "Detente y verifica"}
      </h2>

      <p>
        ${
          safe
            ? "Has reconocido correctamente la situación presentada."
            : "La respuesta seleccionada podría exponerte a un riesgo en una situación real."
        }
      </p>

      <div class="progress-track"
        role="progressbar"
        aria-label="Avance de la simulación"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${progress}"
      >
        <span style="width: ${progress}%"></span>
      </div>

      <p>
        ${state.answers.length} de ${total}
        etapas completadas (${progress}%)
      </p>

      <h3>Tu respuesta</h3>

      <p>${step.options[choice]}</p>

      <h3>Respuesta recomendada</h3>

      <p>${step.options[step.correct]}</p>

      <h3>
        ${
          safe
            ? "Señal reconocida"
            : "Señal que debes reforzar"
        }
      </h3>

      <p class="${
        safe ? "decision-safe" : "decision-risk"
      }">
        ${step.signal}
      </p>

      <h3>Explicación y recomendación</h3>

      <p>${step.explanation}</p>

    </article>
  `;

  $("#next-step").textContent =
    state.step + 1 === total
      ? "Ver resultados"
      : "Siguiente etapa";

  showView("retroalimentacion");
}

function decisionList(answers) {
  if (!Array.isArray(answers) || !answers.length) {
    return `
      <p>
        Este intento corresponde a una versión anterior
        sin respuestas detalladas.
      </p>
    `;
  }

  return `
    <ol class="decision-list">

      ${answers.map((answer, index) => `
        <li>

          <p class="eyebrow">
            Etapa ${index + 1}
          </p>

          <strong>
            ${escapeHtml(answer.question)}
          </strong>

          <p class="${
            answer.safe
              ? "decision-safe"
              : "decision-risk"
          }">

            ${answer.safe ? "Correcto" : "Necesita refuerzo"}

            · ${escapeHtml(answer.signal)}

          </p>

          <p>
            <strong>Tu respuesta:</strong>
            ${escapeHtml(answer.selected)}
          </p>

          <p>
            <strong>Respuesta recomendada:</strong>
            ${escapeHtml(answer.expected)}
          </p>

          <p>
            <strong>Explicación:</strong>
            ${escapeHtml(answer.explanation)}
          </p>

        </li>
      `).join("")}

    </ol>
  `;
}

function finishSimulation() {
  if (!state.selected || state.saved) {
    return;
  }

  if (
    state.answers.length !==
    state.selected.steps.length
  ) {
    return;
  }

  state.saved = true;

  const total = state.answers.length;

  const correct = state.answers.filter(
    answer => answer.safe
  ).length;

  const incorrect = total - correct;

  const score = Math.round(
    correct / total * 100
  );

  const previous = state.history.find(
    item =>
      item.simulationId === state.selected.id
  );

  const record = {
    id: Date.now(),
    simulationId: state.selected.id,
    title: state.selected.title,
    category: state.selected.category,
    score,
    correct,
    incorrect,
    total,
    date: new Date().toISOString(),
    answers: state.answers.map(
      answer => ({ ...answer })
    )
  };

  state.history.unshift(record);

  saveHistory();

  const recognized = state.answers.filter(
    answer => answer.safe
  );

  const missed = state.answers.filter(
    answer => !answer.safe
  );

  const difference = previous
    ? score - previous.score
    : 0;

  const performance =
    score === 100
      ? "Excelente"
      : score >= 67
        ? "Buen desempeño"
        : score >= 33
          ? "En aprendizaje"
          : "Necesita refuerzo";

  $("#results-content").innerHTML = `
    <article class="results-box">

      <div class="results-grid">

        <div
          class="score-ring"
          style="--score: ${score}"
          role="img"
          aria-label="Puntuación de ${score} sobre 100"
        >
          <strong>${score}%</strong>
        </div>

        <div>

          <p class="eyebrow">
            Simulación completada
          </p>

          <h2>
            ${
              score === 100
                ? "¡Excelente trabajo!"
                : "Sigue fortaleciendo tu aprendizaje"
            }
          </h2>

          <p>
            Completaste la simulación
            <strong>${state.selected.title}</strong>.
          </p>

          <p>
            Obtuviste ${correct} de ${total}
            respuestas correctas.
          </p>

          <p>
            <strong>Nivel de desempeño:</strong>
            ${performance}
          </p>

          <p>
            ${
              previous
                ? `Intento anterior: ${previous.score}%.
                   Diferencia: ${difference > 0 ? "+" : ""}
                   ${difference} puntos.`
                : "Este es tu primer intento registrado de este caso."
            }
          </p>

        </div>

      </div>

      <div class="progress-summary">

        <article>
          <strong>${total}</strong>
          <span>Etapas completadas</span>
        </article>

        <article>
          <strong>${correct}</strong>
          <span>Respuestas correctas</span>
        </article>

        <article>
          <strong>${incorrect}</strong>
          <span>Respuestas incorrectas</span>
        </article>

        <article>
          <strong>${score}%</strong>
          <span>Puntuación</span>
        </article>

      </div>

      <h3>Señales reconocidas</h3>

      ${
        recognized.length
          ? `
            <ul class="tip-list">
              ${recognized.map(answer => `
                <li class="decision-safe">
                  ${escapeHtml(answer.signal)}
                </li>
              `).join("")}
            </ul>
          `
          : `
            <p>
              Todavía necesitas reforzar las señales
              presentadas en este escenario.
            </p>
          `
      }

      <h3>Señales que debes reforzar</h3>

      ${
        missed.length
          ? `
            <ul class="tip-list">
              ${missed.map(answer => `
                <li class="decision-risk">
                  ${escapeHtml(answer.signal)}
                </li>
              `).join("")}
            </ul>
          `
          : `
            <p class="decision-safe">
              Reconociste correctamente todas
              las señales evaluadas.
            </p>
          `
      }

      <h3>Resumen de decisiones y recomendaciones</h3>

      ${decisionList(record.answers)}

      <h3>Recomendación preventiva final</h3>

      <p>${state.selected.advice}</p>

      <p role="status">
        ${
          storageAvailable
            ? "El intento fue guardado en este navegador."
            : "El almacenamiento persistente no está disponible. El intento se conserva durante esta sesión."
        }
      </p>

      <div class="result-actions">

        <button
          class="primary-button"
          type="button"
          data-result="repeat"
        >
          Repetir simulación
        </button>

        <button
          class="ghost-button"
          type="button"
          data-go="simulaciones"
        >
          Continuar entrenamiento
        </button>

        <button
          class="ghost-button"
          type="button"
          data-go="progreso"
        >
          Ver mi progreso
        </button>

      </div>

    </article>
  `;

  renderProgress();

  showView("resultados");
}

function renderProgress() {
  const count = state.history.length;

  const average = count
    ? Math.round(
        state.history.reduce(
          (sum, item) => sum + item.score,
          0
        ) / count
      )
    : 0;

  const best = count
    ? Math.max(
        ...state.history.map(item => item.score)
      )
    : 0;

  const unique = new Set(
    state.history.map(item => {
      return item.simulationId ||
        simulations.find(
          simulation =>
            simulation.title === item.title
        )?.id;
    }).filter(Boolean)
  ).size;

  $("#progress-summary").innerHTML = `

    <article>
      <strong>${count}</strong>
      <span>Intentos completados</span>
    </article>

    <article>
      <strong>${average}%</strong>
      <span>Promedio general</span>
    </article>

    <article>
      <strong>${best}%</strong>
      <span>Mejor resultado</span>
    </article>

    <article>
      <strong>${unique}/${simulations.length}</strong>
      <span>Simulaciones completadas</span>
    </article>

  `;

  if (!count) {
    $("#history-list").innerHTML = `
      <p class="empty-state">
        Aún no has completado una simulación
        en este dispositivo.
      </p>

      <button
        class="primary-button"
        data-go="simulaciones"
        type="button"
      >
        Comenzar entrenamiento
      </button>
    `;
  } else {
    $("#history-list").innerHTML =
      state.history.map(item => {

        const dateObject = new Date(item.date);

        const date = Number.isNaN(
          dateObject.getTime()
        )
          ? item.date
          : dateObject.toLocaleString("es-PE", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });

        const simulation = simulations.find(
          current =>
            current.id === item.simulationId ||
            current.title === item.title
        );

        return `
          <details class="history-detail">

            <summary>
              ${escapeHtml(item.title)}
              · ${item.score}%
              · ${escapeHtml(date)}
            </summary>

            <p>
              <strong>Resultado:</strong>
              ${item.score} de 100 puntos
            </p>

            ${
              Number.isFinite(item.correct) &&
              Number.isFinite(item.total)
                ? `
                  <p>
                    <strong>Respuestas correctas:</strong>
                    ${item.correct} de ${item.total}
                  </p>
                `
                : ""
            }

            ${decisionList(item.answers)}

            ${
              simulation
                ? `
                  <button
                    class="ghost-button"
                    type="button"
                    data-repeat="${simulation.id}"
                  >
                    Volver a practicar
                  </button>
                `
                : ""
            }

          </details>
        `;
      }).join("");
  }

  $("#storage-status").textContent =
    storageAvailable
      ? "El historial se conserva localmente en este navegador."
      : "El almacenamiento local no está disponible.";
}

function reset() {
  const confirmed = confirm(
    "¿Deseas borrar todos los intentos guardados en este navegador? Esta acción no se puede deshacer."
  );

  if (!confirmed) {
    return;
  }

  state.history = [];
  state.selected = null;
  state.answers = [];
  state.step = 0;
  state.saved = false;

  saveHistory();

  renderProgress();

  navigateTo("inicio");
}

function navigateTo(id) {
  const publicViews = [
    "inicio",
    "simulaciones",
    "progreso",
    "aprende",
    "como-funciona"
  ];

  if (
    publicViews.includes(id) &&
    location.hash !== `#${id}`
  ) {
    history.pushState(
      null,
      "",
      `#${id}`
    );
  }

  showView(id);
}

$$(".filter").forEach(button => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;

    $$(".filter").forEach(item => {
      item.classList.toggle(
        "active",
        item === button
      );

      item.setAttribute(
        "aria-pressed",
        String(item === button)
      );
    });

    renderCatalog();
  });
});

$("#difficulty-filter").addEventListener(
  "change",
  event => {
    state.difficulty = event.target.value;

    renderCatalog();
  }
);

$("#confirm-answer").addEventListener(
  "click",
  confirmAnswer
);

$("#next-step").addEventListener(
  "click",
  () => {
    if (
      state.view !== "retroalimentacion" ||
      !state.selected
    ) {
      return;
    }

    if (
      state.step + 1 <
      state.selected.steps.length
    ) {
      state.step++;

      renderPractice();

      showView("practica");
    } else {
      finishSimulation();
    }
  }
);

$("#reset-button").addEventListener(
  "click",
  reset
);

$("#reset-mobile").addEventListener(
  "click",
  reset
);

document.addEventListener("click", event => {

  const button = event.target.closest(
    "[data-open], [data-go], [data-result], [data-repeat]"
  );

  if (button) {

    if (button.dataset.open) {
      openDetail(button.dataset.open);

    } else if (button.dataset.go) {
      navigateTo(button.dataset.go);

    } else if (
      button.dataset.result === "repeat"
    ) {
      startSimulation();

    } else if (button.dataset.repeat) {

      const simulation = simulations.find(
        item =>
          item.id === button.dataset.repeat
      );

      if (simulation) {
        state.selected = simulation;

        startSimulation();
      }
    }

    return;
  }

  const link = event.target.closest(
    'a[href^="#"]'
  );

  if (
    link &&
    link.hash !== "#contenido"
  ) {
    event.preventDefault();

    navigateTo(
      link.hash.slice(1)
    );
  }
});

window.addEventListener("popstate", () => {
  const id = location.hash.slice(1);

  const validViews = [
    "inicio",
    "simulaciones",
    "progreso",
    "aprende",
    "como-funciona"
  ];

  showView(
    validViews.includes(id)
      ? id
      : "inicio"
  );
});

renderCatalog();

renderProgress();

const initialView = location.hash.slice(1);

const validViews = [
  "inicio",
  "simulaciones",
  "progreso",
  "aprende",
  "como-funciona"
];

showView(
  validViews.includes(initialView)
    ? initialView
    : "inicio"
);
