import type { Locale } from "@/lib/site";

export type LocalizedCopy = {
  localeLabel: string;
  navigation: {
    home: string;
    teleprompter: string;
    switchLanguage: string;
    launch: string;
    subtitle: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: string[];
    stats: Array<{ label: string; value: string }>;
    sections: Array<{ title: string; description: string }>;
    steps: Array<{ title: string; description: string }>;
    faq: Array<{ question: string; answer: string }>;
    readerCta: string;
    secondaryCta: string;
    workflowLabel: string;
    workflowTitle: string;
    stepLabel: string;
    metaTitle: string;
    metaDescription: string;
  };
  landing: {
    workflowLabel: string;
    productPagesLabel: string;
    productPagesTitle: string;
    productPagesDescription: string;
    homeCardDescription: string;
    readerCardDescription: string;
    relatedPagesLabel: string;
    faqLabel: string;
    stateNote: string;
  };
  tool: {
    localBadge: string;
    editorTitle: string;
    previewTitle: string;
    readerTitle: string;
    scriptLabel: string;
    scriptPlaceholder: string;
    speedLabel: string;
    fontSizeLabel: string;
    lineHeightLabel: string;
    textWidthLabel: string;
    wordCountLabel: string;
    readingTimeLabel: string;
    mirrorLabel: string;
    reverseLabel: string;
    themeLabel: string;
    themeLight: string;
    themeDark: string;
    play: string;
    pause: string;
    stop: string;
    reset: string;
    fullscreen: string;
    exitFullscreen: string;
    openReader: string;
    ready: string;
    playing: string;
    paused: string;
    previewHint: string;
    localHint: string;
    readerHint: string;
    closeNote: string;
  };
  footer: {
    summary: string;
    quickLinksLabel: string;
    popularPagesLabel: string;
  };
};

export const copy: Record<Locale, LocalizedCopy> = {
  en: {
    localeLabel: "English",
    navigation: {
      home: "Home",
      teleprompter: "Teleprompter",
      switchLanguage: "Ver en espanol",
      launch: "Open teleprompter",
      subtitle: "free teleprompter app"
    },
    home: {
      eyebrow: "Free teleprompter online",
      title:
        "Teleprompter Online is the free online teleprompter app for recording, rehearsal, and teleprompter mirror setups.",
      description:
        "Write or paste your script, control speed, font size, line height, text width, reverse scroll, and teleprompter mirror mode directly on the homepage. Everything stays in this browser with fullscreen-ready controls.",
      highlights: [
        "No account or backend required",
        "Script and settings persist locally",
        "Mirror mode for glass teleprompter rigs"
      ],
      stats: [
        { label: "Storage", value: "Local-first" },
        { label: "Setup time", value: "< 1 minute" },
        { label: "Surface", value: "Desktop + mobile" }
      ],
      sections: [
        {
          title: "Immediate use",
          description:
            "The homepage is the main teleprompter product page, not a waitlist or a separate handoff. Paste a script and start adjusting the read in seconds."
        },
        {
          title: "Presentation-ready controls",
          description:
            "Dial in speed, font size, line height, text width, mirror mode, reverse direction, and a paper or studio theme without leaving the homepage tool."
        },
        {
          title: "SEO-ready foundation",
          description:
            "The product stays centered on one main teleprompter page while supporting future landing pages, tutorials, and keyword-targeted SEO flows."
        }
      ],
      steps: [
        {
          title: "Paste or write your script",
          description:
            "Draft from scratch or drop in prepared notes. Updates sync instantly to the live teleprompter preview."
        },
        {
          title: "Adjust the reading setup",
          description:
            "Tune scroll speed, font size, line height, text width, teleprompter mirror mode, and direction based on your camera or glass rig."
        },
        {
          title: "Prompt on the homepage teleprompter",
          description:
            "Use fullscreen, playback controls, and the same locally saved state without leaving the main product page."
        }
      ],
      faq: [
        {
          question: "Does Teleprompter Online store my script on a server?",
          answer:
            "No. This MVP stores your script and settings in localStorage, so the content stays on the device and browser you are using."
        },
        {
          question: "Can I use it for YouTube, Zoom, or keynote-style delivery?",
          answer:
            "Yes. The current MVP is tuned for general creator and presentation workflows and can expand into tailored landing pages later."
        },
        {
          question: "Do I need to install anything?",
          answer:
            "No installation is required. It is a pure frontend Next.js application that runs directly in the browser."
        }
      ],
      readerCta: "Open the teleprompter",
      secondaryCta: "See how it works",
      workflowLabel: "Workflow",
      workflowTitle: "Designed for fast rehearsal and recording loops.",
      stepLabel: "Step",
      metaTitle: "Teleprompter Online: Free Online Teleprompter App",
      metaDescription:
        "Use Teleprompter Online as your free teleprompter, online teleprompter app, and teleprompter mirror tool. Paste a script, control speed, mirror the text, and prompt in fullscreen on the homepage."
    },
    landing: {
      workflowLabel: "Scenario workflow",
      productPagesLabel: "Homepage paths",
      productPagesTitle: "The homepage is the main teleprompter product page.",
      productPagesDescription:
        "These landing pages stay focused on scenario SEO. When someone is ready to use the tool, send them back to the homepage or straight to the homepage teleprompter section.",
      homeCardDescription:
        "See the main product page, core benefits, and the broader Teleprompter Online story.",
      readerCardDescription:
        "Jump straight to the homepage teleprompter with fullscreen, playback controls, reverse scroll, and teleprompter mirror mode.",
      relatedPagesLabel: "More landing pages",
      faqLabel: "FAQ",
      stateNote:
        "Your script and current settings stay saved locally when you continue on the homepage teleprompter."
    },
    tool: {
      localBadge: "Saved locally in this browser",
      editorTitle: "Script and controls",
      previewTitle: "Live preview",
      readerTitle: "Reader stage",
      scriptLabel: "Script",
      scriptPlaceholder:
        "Paste or write your script here. Changes are saved automatically and will appear in the reader immediately.",
      speedLabel: "Speed",
      fontSizeLabel: "Font size",
      lineHeightLabel: "Line height",
      textWidthLabel: "Text width",
      wordCountLabel: "Word count",
      readingTimeLabel: "Estimated read time",
      mirrorLabel: "Mirror",
      reverseLabel: "Reverse scroll",
      themeLabel: "Theme",
      themeLight: "Paper",
      themeDark: "Studio",
      play: "Play",
      pause: "Pause",
      stop: "Stop",
      reset: "Reset position",
      fullscreen: "Fullscreen",
      exitFullscreen: "Exit fullscreen",
      openReader: "Open homepage teleprompter",
      ready: "Ready to prompt",
      playing: "Prompting in progress",
      paused: "Paused",
      previewHint: "Preview updates with your current script and settings.",
      localHint: "Everything stays local to this browser. No sync, no login.",
      readerHint:
        "Use the homepage teleprompter for rehearsal, recording, or live delivery.",
      closeNote:
        "Play resumes from the current position, stop returns the script to the starting edge, and every setting stays saved locally."
    },
    footer: {
      summary:
        "Teleprompter Online is a free teleprompter online with fullscreen controls, teleprompter mirror mode, and supporting SEO landing pages.",
      quickLinksLabel: "Quick links",
      popularPagesLabel: "Popular pages"
    }
  },
  es: {
    localeLabel: "Espanol",
    navigation: {
      home: "Inicio",
      teleprompter: "Teleprompter",
      switchLanguage: "View in English",
      launch: "Abrir teleprompter",
      subtitle: "app de teleprompter"
    },
    home: {
      eyebrow: "Teleprompter online gratis",
      title:
        "Teleprompter Online es la app de teleprompter gratis para grabar, ensayar y usar modo espejo desde la home.",
      description:
        "Escribe o pega tu guion, controla velocidad, fuente, altura de linea, ancho del texto, direccion inversa y modo espejo directamente en la home. Todo queda guardado en este navegador con controles listos para pantalla completa.",
      highlights: [
        "Sin cuenta y sin backend",
        "Guion y ajustes guardados localmente",
        "Modo espejo para rigs y cristal de teleprompter"
      ],
      stats: [
        { label: "Guardado", value: "Local" },
        { label: "Preparacion", value: "< 1 minuto" },
        { label: "Uso", value: "Desktop + movil" }
      ],
      sections: [
        {
          title: "Uso inmediato",
          description:
            "La home es la pagina principal del producto. Pega tu guion y empieza a ajustar la lectura en segundos sin pasar por otra pagina."
        },
        {
          title: "Controles listos para grabar",
          description:
            "Configura velocidad, tamano de fuente, altura de linea, ancho del texto, modo espejo, direccion inversa y tema claro u oscuro sin salir de la home."
        },
        {
          title: "Base preparada para SEO",
          description:
            "El producto se centra en una sola pagina principal de teleprompter y deja espacio para landings, tutoriales y paginas SEO orientadas a keywords."
        }
      ],
      steps: [
        {
          title: "Pega o escribe tu guion",
          description:
            "Empieza desde cero o importa tus notas. Los cambios aparecen al instante en la vista previa del teleprompter."
        },
        {
          title: "Ajusta la lectura",
          description:
            "Controla velocidad, tamano, altura de linea, ancho del texto, espejo y direccion segun tu camara o configuracion de cristal."
        },
        {
          title: "Lee desde el teleprompter de la home",
          description:
            "Usa pantalla completa, controles de reproduccion y el mismo estado guardado localmente sin salir de la pagina principal."
        }
      ],
      faq: [
        {
          question: "Teleprompter Online guarda mi guion en un servidor?",
          answer:
            "No. Este MVP guarda el guion y la configuracion en localStorage, asi que el contenido permanece en el navegador y dispositivo actual."
        },
        {
          question: "Sirve para YouTube, Zoom o presentaciones?",
          answer:
            "Si. El MVP actual cubre flujos generales de creadores y presentaciones, y mas adelante puede ampliarse con paginas especificas."
        },
        {
          question: "Necesito instalar algo?",
          answer:
            "No. Es una aplicacion frontend en Next.js que funciona directamente en el navegador."
        }
      ],
      readerCta: "Abrir teleprompter",
      secondaryCta: "Ver como funciona",
      workflowLabel: "Flujo",
      workflowTitle: "Pensado para ensayar, grabar y presentar con rapidez.",
      stepLabel: "Paso",
      metaTitle: "Teleprompter Online Gratis: App de Teleprompter",
      metaDescription:
        "Usa Teleprompter Online gratis como teleprompter online, app de teleprompter y herramienta con modo espejo. Pega tu guion, controla velocidad e invierte el texto desde la home."
    },
    landing: {
      workflowLabel: "Flujo por escenario",
      productPagesLabel: "Rutas hacia la home",
      productPagesTitle:
        "La home es la pagina principal del producto y del teleprompter.",
      productPagesDescription:
        "Estas landings siguen enfocadas en SEO por escenario. Cuando alguien quiera usar la herramienta, debe volver a la home o ir directo a la seccion principal del teleprompter.",
      homeCardDescription:
        "Revisa la pagina principal del producto, sus ventajas clave y la vista completa de Teleprompter Online.",
      readerCardDescription:
        "Salta directo al teleprompter de la home con pantalla completa, controles de reproduccion, direccion inversa y modo espejo.",
      relatedPagesLabel: "Mas landings",
      faqLabel: "Preguntas frecuentes",
      stateNote:
        "Tu guion y la configuracion actual siguen guardados localmente al continuar en el teleprompter de la home."
    },
    tool: {
      localBadge: "Guardado localmente en este navegador",
      editorTitle: "Guion y controles",
      previewTitle: "Vista previa",
      readerTitle: "Escenario de lectura",
      scriptLabel: "Guion",
      scriptPlaceholder:
        "Pega o escribe tu guion aqui. Los cambios se guardan automaticamente y aparecen en el lector al instante.",
      speedLabel: "Velocidad",
      fontSizeLabel: "Tamano de fuente",
      lineHeightLabel: "Altura de linea",
      textWidthLabel: "Ancho del texto",
      wordCountLabel: "Conteo de palabras",
      readingTimeLabel: "Tiempo estimado",
      mirrorLabel: "Espejo",
      reverseLabel: "Direccion inversa",
      themeLabel: "Tema",
      themeLight: "Papel",
      themeDark: "Studio",
      play: "Reproducir",
      pause: "Pausar",
      stop: "Detener",
      reset: "Reiniciar posicion",
      fullscreen: "Pantalla completa",
      exitFullscreen: "Salir de pantalla completa",
      openReader: "Abrir teleprompter en la home",
      ready: "Listo para leer",
      playing: "Lectura en progreso",
      paused: "En pausa",
      previewHint: "La vista previa responde al guion y a la configuracion actual.",
      localHint: "Todo se mantiene local en este navegador. Sin login ni sincronizacion.",
      readerHint:
        "Usa el teleprompter de la home para practicar, grabar o presentar en vivo.",
      closeNote:
        "Reproducir retoma desde la posicion actual, detener vuelve el guion al inicio y todos los ajustes se guardan localmente."
    },
    footer: {
      summary:
        "Teleprompter Online es un teleprompter online gratis con pantalla completa, modo espejo y una base preparada para landings SEO.",
      quickLinksLabel: "Enlaces rapidos",
      popularPagesLabel: "Paginas populares"
    }
  }
};
