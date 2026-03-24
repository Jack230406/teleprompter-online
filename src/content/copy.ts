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
  teleprompterPage: {
    eyebrow: string;
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
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
      launch: "Open reader",
      subtitle: "browser-first reader"
    },
    home: {
      eyebrow: "Free browser teleprompter",
      title: "Teleprompter Online puts the working tool in front before the pitch.",
      description:
        "Write your script, tune the pace, control line height and text width, and move into a clean fullscreen-ready reader without signing in. Everything stays in this browser.",
      highlights: [
        "No account or backend required",
        "Script and settings persist locally",
        "Built for creators, presenters, and video teams"
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
            "The first screen is the tool, not a waitlist form. Paste a script and start adjusting the reader in seconds."
        },
        {
          title: "Presentation-ready controls",
          description:
            "Dial in speed, font size, line height, text width, mirror mode, reverse direction, and a light or studio theme without leaving the page."
        },
        {
          title: "SEO-ready foundation",
          description:
            "The app is organized for future landing pages, tutorials, and keyword-targeted tool pages under the same brand."
        }
      ],
      steps: [
        {
          title: "Paste or write your script",
          description:
            "Draft from scratch or drop in prepared notes. Updates sync instantly to the reader preview."
        },
        {
          title: "Adjust the reading setup",
          description:
            "Tune scroll speed, font size, line height, text width, mirrored output, and direction based on your camera or glass rig."
        },
        {
          title: "Open the focused reader",
          description:
            "Switch to the dedicated teleprompter page and start prompting with the same locally saved state."
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
      readerCta: "Start prompting",
      secondaryCta: "See the reader workspace",
      workflowLabel: "Workflow",
      workflowTitle: "Designed for fast rehearsal and recording loops.",
      stepLabel: "Step",
      metaTitle: "Free Online Teleprompter",
      metaDescription:
        "Use Teleprompter Online for free in your browser. Paste a script, control speed and font size, mirror the text, and launch a clean teleprompter reader instantly."
    },
    teleprompterPage: {
      eyebrow: "Reader workspace",
      title: "A focused teleprompter reader with local-first settings.",
      description:
        "Your script, pacing, layout, and reader settings stay saved in this browser while you rehearse or record.",
      metaTitle: "Teleprompter Reader",
      metaDescription:
        "Open the dedicated Teleprompter Online reader with fullscreen, script speed, font size, line height, text width, theme, mirrored text, and reverse scrolling controls."
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
      openReader: "Open full reader",
      ready: "Ready to prompt",
      playing: "Prompting in progress",
      paused: "Paused",
      previewHint: "Preview updates with your current script and settings.",
      localHint: "Everything stays local to this browser. No sync, no login.",
      readerHint: "Use the focused reader for rehearsal, recording, or live delivery.",
      closeNote:
        "Play resumes from the current position, stop returns the script to the starting edge, and every setting stays saved locally."
    },
    footer: {
      summary:
        "Teleprompter Online is a free browser teleprompter built for quick setup, readable pacing, and future SEO landing pages.",
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
      launch: "Abrir lector",
      subtitle: "lector en el navegador"
    },
    home: {
      eyebrow: "Teleprompter gratis en el navegador",
      title: "Teleprompter Online pone la herramienta principal al frente desde la primera pantalla.",
      description:
        "Escribe tu guion, ajusta velocidad, altura de linea y ancho del texto, invierte el texto para cristal y pasa a un lector limpio con pantalla completa. Todo queda guardado en este navegador.",
      highlights: [
        "Sin cuenta y sin backend",
        "Guion y ajustes guardados localmente",
        "Pensado para creadores, presentadores y equipos de video"
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
            "La primera pantalla ya incluye la herramienta. Pega tu guion y empieza a ajustar el lector en segundos."
        },
        {
          title: "Controles listos para grabar",
          description:
            "Configura velocidad, tamano de fuente, altura de linea, ancho del texto, modo espejo, direccion inversa y tema claro u oscuro sin salir de la pagina."
        },
        {
          title: "Base preparada para SEO",
          description:
            "La arquitectura deja espacio para futuras landing pages, tutoriales y paginas orientadas a keywords."
        }
      ],
      steps: [
        {
          title: "Pega o escribe tu guion",
          description:
            "Empieza desde cero o importa tus notas. Los cambios aparecen al instante en la vista previa."
        },
        {
          title: "Ajusta la lectura",
          description:
            "Controla velocidad, tamano, altura de linea, ancho del texto, espejo y direccion segun tu camara o configuracion de cristal."
        },
        {
          title: "Abre el lector dedicado",
          description:
            "Pasa a la pagina del teleprompter y empieza a leer con el mismo estado guardado localmente."
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
      readerCta: "Empezar a leer",
      secondaryCta: "Ver el lector",
      workflowLabel: "Flujo",
      workflowTitle: "Pensado para ensayar, grabar y presentar con rapidez.",
      stepLabel: "Paso",
      metaTitle: "Teleprompter Online Gratis",
      metaDescription:
        "Usa Teleprompter Online gratis en tu navegador. Pega tu guion, controla velocidad y fuente, invierte el texto y abre un lector limpio al instante."
    },
    teleprompterPage: {
      eyebrow: "Espacio de lectura",
      title: "Un lector de teleprompter limpio con ajustes guardados localmente.",
      description:
        "Tu guion, ritmo, formato y configuracion se mantienen en este navegador mientras practicas o grabas.",
      metaTitle: "Lector de Teleprompter",
      metaDescription:
        "Abre el lector dedicado de Teleprompter Online con pantalla completa, velocidad, fuente, altura de linea, ancho del texto, tema, espejo y direccion inversa."
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
      openReader: "Abrir lector completo",
      ready: "Listo para leer",
      playing: "Lectura en progreso",
      paused: "En pausa",
      previewHint: "La vista previa responde al guion y a la configuracion actual.",
      localHint: "Todo se mantiene local en este navegador. Sin login ni sincronizacion.",
      readerHint: "Usa el lector dedicado para practicar, grabar o presentar en vivo.",
      closeNote:
        "Reproducir retoma desde la posicion actual, detener vuelve el guion al inicio y todos los ajustes se guardan localmente."
    },
    footer: {
      summary:
        "Teleprompter Online es un teleprompter gratuito en el navegador con configuracion rapida y una base preparada para futuras landing pages SEO.",
      quickLinksLabel: "Enlaces rapidos",
      popularPagesLabel: "Paginas populares"
    }
  }
};
