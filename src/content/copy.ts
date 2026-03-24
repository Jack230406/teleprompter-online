import type { Locale } from "@/lib/site";

export type LocalizedCopy = {
  localeLabel: string;
  navigation: {
    home: string;
    teleprompter: string;
    features: string;
    faq: string;
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
    toolLabel: string;
    trustLabel: string;
    featuresLabel: string;
    featuresTitle: string;
    toolsLabel: string;
    toolsTitle: string;
    faqLabel: string;
    faqTitle: string;
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
    controlsTitle: string;
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
      features: "Features",
      faq: "FAQ",
      switchLanguage: "Ver en espanol",
      launch: "Open teleprompter",
      subtitle: "free teleprompter app"
    },
    home: {
      eyebrow: "Free teleprompter app · browser-based · no account needed",
      title: "Free Online Teleprompter with Teleprompter Mirror",
      description:
        "Paste your script, set the scroll speed, and read in fullscreen directly in your browser. Works as a free teleprompter app on desktop and phone, with no login or download required.",
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
          title: "Start using this free teleprompter online in seconds",
          description:
            "Open the page, paste your script, and start prompting immediately. No signup form, no email, and no software to download. Your script and settings stay saved locally in the browser."
        },
        {
          title: "Full teleprompter controls — speed, font, teleprompter mirror, and more",
          description:
            "Dial in scroll speed, font size, line height, text width, teleprompter mirror mode, reverse scroll direction, and a light or dark reading theme without leaving the page."
        },
        {
          title: "Works for video, Zoom, presentations, and live delivery",
          description:
            "Use this free online teleprompter for YouTube videos, Zoom calls, keynotes, podcasts, or any recording where you need to read from a script. Enable teleprompter mirror for glass rigs or go fullscreen on a second display."
        }
      ],
      steps: [
        {
          title: "Paste or type your teleprompter script",
          description:
            "Paste notes, a speech, or a production script and see updates reflected in the live teleprompter immediately."
        },
        {
          title: "Adjust speed, font size, and teleprompter mirror",
          description:
            "Tune scroll speed, font size, line height, text width, and teleprompter mirror mode to match your camera distance, reading pace, or glass rig."
        },
        {
          title: "Read in fullscreen on any device",
          description:
            "Go fullscreen and use play, pause, and stop controls. This free teleprompter app works on desktop, laptop, and phone, with your script always saved locally."
        }
      ],
      faq: [
        {
          question: "Does this online teleprompter store my script?",
          answer:
            "No. Teleprompter Online stores your script and settings in your browser's localStorage. Nothing is sent to any server, so your content stays entirely on your device."
        },
        {
          question: "Can I use this teleprompter for YouTube videos, Zoom calls, or presentations?",
          answer:
            "Yes. This free online teleprompter works for any scenario where you read from a script, including YouTube recordings, Zoom meetings, keynotes, podcasts, and live events. Adjust scroll speed and font size to match your delivery pace and camera distance."
        },
        {
          question: "Do I need to install anything to use this teleprompter online?",
          answer:
            "No. This teleprompter runs entirely in your browser on desktop, laptop, or phone. There is nothing to download or install, and it also works on Mac, Windows, and any device with a modern browser."
        },
        {
          question: "How do I make my computer work as a teleprompter?",
          answer:
            "Open teleprompteronline.net in any browser, paste your script into the text area, and press Play. Adjust scroll speed, font size, and text width to match your reading pace. For a glass teleprompter rig, enable teleprompter mirror mode so the text reads correctly through beam-splitter glass."
        },
        {
          question: "Does this teleprompter work for Zoom and webcam recordings?",
          answer:
            "Yes. Position the browser window near your webcam so you can read while still looking toward the camera. For Zoom presentations, open the teleprompter in a separate window alongside your video call."
        }
      ],
      readerCta: "Open the teleprompter",
      secondaryCta: "See how it works",
      toolLabel: "Main teleprompter tool",
      trustLabel: "Why creators use it",
      featuresLabel: "Core features",
      featuresTitle:
        "A single teleprompter workspace for script, controls, and fullscreen preview.",
      toolsLabel: "More free teleprompter tools",
      toolsTitle: "Explore additional teleprompter landing pages",
      faqLabel: "FAQ",
      faqTitle:
        "Frequently asked questions about this free online teleprompter",
      workflowLabel: "Workflow",
      workflowTitle: "How to use this free online teleprompter",
      stepLabel: "Step",
      metaTitle:
        "Free Online Teleprompter | Teleprompter Mirror, Fullscreen & No Signup — Teleprompter Online",
      metaDescription:
        "Free online teleprompter with teleprompter mirror, fullscreen reading, and adjustable scroll speed. Paste your script and start reading with no account, no download, and support for desktop and phone."
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
      editorTitle: "Your script and teleprompter controls",
      controlsTitle: "Core controls",
      previewTitle: "Live preview",
      readerTitle: "Teleprompter reader",
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
        "Teleprompter Online (teleprompteronline.net) is a free online teleprompter with teleprompter mirror, fullscreen controls, and local script saving with no account or download required.",
      quickLinksLabel: "Quick links",
      popularPagesLabel: "Popular pages"
    }
  },
  es: {
    localeLabel: "Espanol",
    navigation: {
      home: "Inicio",
      teleprompter: "Teleprompter",
      features: "Funciones",
      faq: "FAQ",
      switchLanguage: "View in English",
      launch: "Abrir teleprompter",
      subtitle: "app de teleprompter"
    },
    home: {
      eyebrow: "Teleprompter online gratis",
      title: "Teleprompter Online Gratis con Modo Espejo",
      description:
        "Pega tu guion, ajusta la velocidad de lectura y usa pantalla completa directamente desde la home. Sin login ni descarga.",
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
      toolLabel: "Herramienta principal",
      trustLabel: "Por que se usa",
      featuresLabel: "Funciones clave",
      featuresTitle:
        "Un espacio de teleprompter para guion, controles y vista previa.",
      toolsLabel: "Mas herramientas de teleprompter",
      toolsTitle: "Explora mas paginas y usos del teleprompter",
      faqLabel: "Preguntas frecuentes",
      faqTitle:
        "Preguntas frecuentes sobre este teleprompter online gratis",
      workflowLabel: "Flujo",
      workflowTitle: "Pensado para ensayar, grabar y presentar con rapidez.",
      stepLabel: "Paso",
      metaTitle: "Teleprompter Online Gratis con Modo Espejo",
      metaDescription:
        "Usa Teleprompter Online gratis. Pega tu guion, ajusta velocidad y tamano del texto, activa el modo espejo y usa pantalla completa desde la home."
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
      controlsTitle: "Controles principales",
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
