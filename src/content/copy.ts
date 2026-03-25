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
    definition: string;
    highlights: string[];
    stats: Array<{ label: string; value: string }>;
    sections: Array<{ title: string; description: string }>;
    audiences: Array<{ title: string; description: string }>;
    reasons: Array<{ title: string; description: string }>;
    comparisonRows: Array<{ label: string; appBased: string; browserBased: string }>;
    steps: Array<{ title: string; description: string }>;
    faq: Array<{ question: string; answer: string }>;
    readerCta: string;
    secondaryCta: string;
    toolLabel: string;
    trustLabel: string;
    featuresLabel: string;
    featuresTitle: string;
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
        "Paste your script, set the scroll speed, and read in fullscreen directly in your browser. Works on desktop and phone with no login or download required.",
      definition:
        "A free online teleprompter is a browser-based tool that scrolls your script while you read on camera. Teleprompter Online lets you paste text, adjust speed, use mirror mode, and read in fullscreen without signup or downloads.",
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
      audiences: [
        {
          title: "For YouTube creators",
          description:
            "Use the teleprompter for intros, tutorials, sponsor reads, and talking-head videos while keeping your eyes close to the lens."
        },
        {
          title: "For Zoom and presentations",
          description:
            "Keep notes near the camera, control scroll speed, and read more naturally during remote meetings, webinars, and keynote-style delivery."
        },
        {
          title: "For speeches and podcasts",
          description:
            "Load a speech, sermon, outline, or podcast script and adjust text size and pacing so the read feels comfortable and confident."
        }
      ],
      reasons: [
        {
          title: "Why use a browser-based teleprompter",
          description:
            "A browser teleprompter is faster to access than an app-based setup. You can open it on almost any device, paste a script, and start reading without dealing with downloads, accounts, or sync problems."
        },
        {
          title: "Mirror mode for glass teleprompter rigs",
          description:
            "Teleprompter mirror mode flips the script so it reads correctly through beam-splitter glass. That makes the same page useful for both webcam setups and traditional glass rigs."
        },
        {
          title: "Privacy with local-first script storage",
          description:
            "Your script stays in the browser using local storage. That makes this online teleprompter a better fit for private scripts, client work, and rehearsal notes that you do not want to upload anywhere."
        },
        {
          title: "Common teleprompter mistakes to avoid",
          description:
            "Most reading problems come from text that is too wide, speed that is too fast, or a window that is too far from the camera. Start with a narrower reading width, slower pace, and larger text, then adjust from there."
        }
      ],
      comparisonRows: [
        {
          label: "Setup time",
          appBased: "Install the app, configure device access, and manage updates.",
          browserBased: "Open the page and start prompting in under a minute."
        },
        {
          label: "Device flexibility",
          appBased: "Often tied to one platform or operating system.",
          browserBased: "Works across desktop, laptop, tablet, and phone."
        },
        {
          label: "Privacy",
          appBased: "May require sign-in, cloud sync, or permissions.",
          browserBased: "Keeps scripts locally in your browser with no account needed."
        },
        {
          label: "Best use case",
          appBased: "Long-term studio workflows with app-specific features.",
          browserBased: "Fast rehearsals, creator setups, Zoom, speeches, and everyday prompting."
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
      faqLabel: "FAQ",
      faqTitle:
        "Frequently asked questions about this free online teleprompter",
      workflowLabel: "Workflow",
      workflowTitle: "How to use this free online teleprompter",
      stepLabel: "Step",
      metaTitle:
        "Free Online Teleprompter with Mirror & Fullscreen | Teleprompter Online",
      metaDescription:
        "Use a free online teleprompter with mirror mode, fullscreen reading, and adjustable speed. Paste your script and start instantly on desktop or phone."
    },
    landing: {
      workflowLabel: "Scenario workflow",
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
      stop: "Stop playback",
      reset: "Back to start",
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
        "Pause keeps your place, stop playback ends the run, and back to start jumps the script to the opening edge while every setting stays saved locally."
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
      definition:
        "Un teleprompter online gratis es una herramienta en el navegador que desplaza tu guion mientras lees a camara. Teleprompter Online te permite pegar texto, ajustar la velocidad, activar modo espejo y leer en pantalla completa sin registro ni descargas.",
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
      audiences: [
        {
          title: "Para creadores de YouTube",
          description:
            "Usa el teleprompter para intros, tutoriales, menciones patrocinadas y videos talking-head manteniendo la mirada cerca de la camara."
        },
        {
          title: "Para Zoom y presentaciones",
          description:
            "Mantiene tus notas cerca de la camara y ayuda a leer de forma natural en reuniones, webinars y presentaciones."
        },
        {
          title: "Para discursos y podcasts",
          description:
            "Carga un discurso, sermon, esquema o guion de podcast y ajusta el tamano del texto y el ritmo de lectura con comodidad."
        }
      ],
      reasons: [
        {
          title: "Por que usar un teleprompter en el navegador",
          description:
            "Un teleprompter en el navegador es mas rapido de abrir que una app. Puedes entrar desde casi cualquier dispositivo, pegar un guion y empezar sin descargas ni cuentas."
        },
        {
          title: "Modo espejo para rigs de cristal",
          description:
            "El modo espejo invierte el guion para que se lea correctamente a traves del cristal divisor. Asi la misma pagina sirve tanto para webcam como para rigs tradicionales."
        },
        {
          title: "Privacidad con almacenamiento local",
          description:
            "Tu guion se guarda en el navegador con almacenamiento local. Eso lo hace mejor para guiones privados, trabajos de cliente y notas de ensayo que no quieres subir a ningun servidor."
        },
        {
          title: "Errores comunes de teleprompter que conviene evitar",
          description:
            "La mayoria de los problemas vienen de usar lineas demasiado anchas, una velocidad excesiva o una ventana demasiado lejos de la camara. Empieza con texto mas grande, un ancho menor y un ritmo mas lento."
        }
      ],
      comparisonRows: [
        {
          label: "Tiempo de preparacion",
          appBased: "Instala la app, configura el dispositivo y gestiona actualizaciones.",
          browserBased: "Abre la pagina y empieza en menos de un minuto."
        },
        {
          label: "Flexibilidad de dispositivo",
          appBased: "Suele depender de una plataforma concreta.",
          browserBased: "Funciona en desktop, laptop, tablet y movil."
        },
        {
          label: "Privacidad",
          appBased: "Puede requerir login, sync en la nube o permisos extra.",
          browserBased: "Mantiene el guion en el navegador sin necesidad de cuenta."
        },
        {
          label: "Mejor caso de uso",
          appBased: "Flujos de estudio a largo plazo con funciones muy especificas.",
          browserBased: "Ensayos rapidos, creadores, Zoom, discursos y prompting diario."
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
      stop: "Detener lectura",
      reset: "Volver al inicio",
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
        "Pausar conserva tu posicion, detener lectura termina la reproduccion y volver al inicio lleva el guion al borde inicial mientras todos los ajustes se guardan localmente."
    },
    footer: {
      summary:
        "Teleprompter Online es un teleprompter online gratis con pantalla completa, modo espejo y una base preparada para landings SEO.",
      quickLinksLabel: "Enlaces rapidos",
      popularPagesLabel: "Paginas populares"
    }
  },
  fil: {
    localeLabel: "Filipino",
    navigation: {
      home: "Home",
      teleprompter: "Teleprompter",
      features: "Mga Tampok",
      faq: "FAQ",
      switchLanguage: "Tingnan sa English",
      launch: "Buksan ang teleprompter",
      subtitle: "libreng teleprompter app"
    },
    home: {
      eyebrow: "Libreng teleprompter app · nasa browser · walang account",
      title: "Libreng Online Teleprompter na may Mirror Mode",
      description:
        "I-paste ang script mo, ayusin ang bilis ng scroll, at magbasa sa fullscreen direkta sa browser. Gumagana sa desktop at phone nang walang login o download.",
      definition:
        "Ang libreng online teleprompter ay isang browser-based na tool na awtomatikong ini-scroll ang script habang nagbabasa ka sa camera. Binibigyan ka ng Teleprompter Online ng paste text, speed control, mirror mode, at fullscreen reading nang walang signup o download.",
      highlights: [
        "Walang account o backend na kailangan",
        "Naka-save nang lokal ang script at settings",
        "May mirror mode para sa glass teleprompter rigs"
      ],
      stats: [
        { label: "Storage", value: "Local-first" },
        { label: "Setup time", value: "< 1 minuto" },
        { label: "Device", value: "Desktop + mobile" }
      ],
      sections: [
        {
          title: "Magsimulang gumamit ng libreng online teleprompter sa loob ng ilang segundo",
          description:
            "Buksan ang page, i-paste ang script mo, at magsimulang mag-prompt agad. Walang signup form, walang email, at walang software na ida-download. Nananatiling naka-save sa browser ang script at settings mo."
        },
        {
          title: "Buong teleprompter controls — speed, font, mirror mode, at iba pa",
          description:
            "Ayusin ang scroll speed, font size, line height, text width, mirror mode, reverse scroll direction, at light o dark theme nang hindi umaalis sa page."
        },
        {
          title: "Pwede para sa video, Zoom, presentations, at live delivery",
          description:
            "Gamitin ang libreng online teleprompter na ito para sa YouTube videos, Zoom calls, keynotes, podcasts, o anumang recording na may script. I-on ang mirror mode para sa glass rigs o gamitin ang fullscreen sa second display."
        }
      ],
      audiences: [
        {
          title: "Para sa YouTube creators",
          description:
            "Gamitin ang teleprompter para sa intros, tutorials, sponsor reads, at talking-head videos habang nananatiling malapit ang tingin mo sa lens."
        },
        {
          title: "Para sa Zoom at presentations",
          description:
            "Panatilihing malapit sa camera ang notes, kontrolin ang bilis ng scroll, at magbasa nang mas natural sa remote meetings, webinars, at presentations."
        },
        {
          title: "Para sa speeches at podcasts",
          description:
            "Mag-load ng speech, sermon, outline, o podcast script at ayusin ang laki ng text at pacing para mas komportable at kumpiyansa ang pagbasa."
        }
      ],
      reasons: [
        {
          title: "Bakit browser-based na teleprompter ang gamitin",
          description:
            "Mas mabilis buksan ang browser teleprompter kaysa app-based setup. Maaari mo itong buksan sa halos anumang device, mag-paste ng script, at magsimulang magbasa nang walang download, account, o sync issues."
        },
        {
          title: "Mirror mode para sa glass teleprompter rigs",
          description:
            "Binabaliktad ng mirror mode ang script para mabasa ito nang tama sa beam-splitter glass. Dahil dito, pwede ang parehong page para sa webcam setup at traditional glass rigs."
        },
        {
          title: "Privacy sa local-first script storage",
          description:
            "Nananatili ang script mo sa browser gamit ang local storage. Mas bagay ito para sa private scripts, client work, at rehearsal notes na ayaw mong i-upload kung saan-saan."
        },
        {
          title: "Mga karaniwang teleprompter mistakes na dapat iwasan",
          description:
            "Kadalasang galing ang reading problems sa sobrang lapad na text, sobrang bilis na speed, o window na masyadong malayo sa camera. Magsimula sa mas makitid na width, mas mabagal na pace, at mas malaking text, tapos mag-adjust mula roon."
        }
      ],
      comparisonRows: [
        {
          label: "Setup time",
          appBased: "I-install ang app, i-configure ang access ng device, at i-manage ang updates.",
          browserBased: "Buksan ang page at magsimulang mag-prompt sa loob ng wala pang isang minuto."
        },
        {
          label: "Device flexibility",
          appBased: "Madalas naka-tali sa isang platform o operating system.",
          browserBased: "Gumagana sa desktop, laptop, tablet, at phone."
        },
        {
          label: "Privacy",
          appBased: "Maaaring mangailangan ng sign-in, cloud sync, o permissions.",
          browserBased: "Pinapanatiling lokal sa browser ang scripts mo at walang account na kailangan."
        },
        {
          label: "Best use case",
          appBased: "Pangmatagalang studio workflows na may app-specific features.",
          browserBased: "Mabilis na rehearsal, creator setups, Zoom, speeches, at araw-araw na prompting."
        }
      ],
      steps: [
        {
          title: "I-paste o i-type ang teleprompter script mo",
          description:
            "Mag-paste ng notes, speech, o production script at makita agad ang updates sa live teleprompter."
        },
        {
          title: "Ayusin ang speed, font size, at mirror mode",
          description:
            "I-tune ang scroll speed, font size, line height, text width, at mirror mode ayon sa distance ng camera, reading pace, o glass rig mo."
        },
        {
          title: "Magbasa sa fullscreen sa anumang device",
          description:
            "Mag-fullscreen at gamitin ang play, pause, at stop controls. Gumagana ang libreng teleprompter app na ito sa desktop, laptop, at phone, at laging naka-save nang lokal ang script mo."
        }
      ],
      faq: [
        {
          question: "Sine-save ba ng online teleprompter na ito ang script ko?",
          answer:
            "Hindi. Ang Teleprompter Online ay nagse-save ng script at settings sa localStorage ng browser mo. Walang ipinapadala sa anumang server, kaya nasa device mo lang ang content mo."
        },
        {
          question: "Pwede ko ba itong gamitin para sa YouTube videos, Zoom calls, o presentations?",
          answer:
            "Oo. Gumagana ang libreng online teleprompter na ito para sa anumang sitwasyon na may script, kasama ang YouTube recordings, Zoom meetings, keynotes, podcasts, at live events. Ayusin ang bilis ng scroll at font size ayon sa delivery pace at camera distance mo."
        },
        {
          question: "Kailangan ko bang mag-install ng kahit ano para gamitin ito?",
          answer:
            "Hindi. Buong gumagana ang teleprompter na ito sa browser sa desktop, laptop, o phone. Walang ida-download o i-install, at pwede ito sa Mac, Windows, at anumang device na may modern browser."
        },
        {
          question: "Paano ko gagawing teleprompter ang computer ko?",
          answer:
            "Buksan ang teleprompteronline.net sa anumang browser, i-paste ang script mo sa text area, at pindutin ang Play. Ayusin ang scroll speed, font size, at text width ayon sa reading pace mo. Para sa glass teleprompter rig, i-enable ang mirror mode para tama ang basa sa beam-splitter glass."
        },
        {
          question: "Gumagana ba ito para sa Zoom at webcam recordings?",
          answer:
            "Oo. Ilagay ang browser window malapit sa webcam para makabasa ka habang nakatingin pa rin sa camera. Para sa Zoom presentations, buksan ang teleprompter sa hiwalay na window katabi ng video call mo."
        }
      ],
      readerCta: "Buksan ang teleprompter",
      secondaryCta: "Tingnan kung paano ito gumagana",
      toolLabel: "Pangunahing teleprompter tool",
      trustLabel: "Bakit ito ginagamit ng creators",
      featuresLabel: "Core features",
      featuresTitle:
        "Isang teleprompter workspace para sa script, controls, at fullscreen preview.",
      faqLabel: "FAQ",
      faqTitle:
        "Mga madalas itanong tungkol sa libreng online teleprompter na ito",
      workflowLabel: "Workflow",
      workflowTitle: "Paano gamitin ang libreng online teleprompter na ito",
      stepLabel: "Hakbang",
      metaTitle:
        "Libreng Online Teleprompter na may Mirror at Fullscreen | Teleprompter Online",
      metaDescription:
        "Gumamit ng libreng online teleprompter na may mirror mode, fullscreen reading, at adjustable speed. I-paste ang script mo at magsimula agad sa desktop o phone."
    },
    landing: {
      workflowLabel: "Scenario workflow",
      faqLabel: "FAQ",
      stateNote:
        "Nananatiling naka-save nang lokal ang script at current settings mo kapag nagpatuloy ka sa homepage teleprompter."
    },
    tool: {
      localBadge: "Naka-save nang lokal sa browser na ito",
      editorTitle: "Script mo at teleprompter controls",
      controlsTitle: "Core controls",
      previewTitle: "Live preview",
      readerTitle: "Teleprompter reader",
      scriptLabel: "Script",
      scriptPlaceholder:
        "I-paste o isulat ang script mo rito. Awtomatikong nase-save ang changes at lalabas agad sa reader.",
      speedLabel: "Bilis",
      fontSizeLabel: "Laki ng font",
      lineHeightLabel: "Line height",
      textWidthLabel: "Lapad ng text",
      wordCountLabel: "Bilang ng salita",
      readingTimeLabel: "Tinatayang oras ng pagbasa",
      mirrorLabel: "Mirror",
      reverseLabel: "Reverse scroll",
      themeLabel: "Tema",
      themeLight: "Paper",
      themeDark: "Studio",
      play: "Play",
      pause: "Pause",
      stop: "Itigil ang playback",
      reset: "Bumalik sa simula",
      fullscreen: "Fullscreen",
      exitFullscreen: "Lumabas sa fullscreen",
      openReader: "Buksan ang homepage teleprompter",
      ready: "Handa nang mag-prompt",
      playing: "Kasulukuyang nagpo-prompt",
      paused: "Naka-pause",
      previewHint: "Nag-a-update ang preview ayon sa kasalukuyang script at settings mo.",
      localHint: "Lahat ay nananatiling lokal sa browser na ito. Walang sync, walang login.",
      readerHint:
        "Gamitin ang homepage teleprompter para sa rehearsal, recording, o live delivery.",
      closeNote:
        "Pinapanatili ng pause ang puwesto mo, tinatapos ng stop ang playback, at ibinabalik ng back to start ang script sa unahan habang naka-save pa rin nang lokal ang lahat ng settings."
    },
    footer: {
      summary:
        "Ang Teleprompter Online (teleprompteronline.net) ay libreng online teleprompter na may mirror mode, fullscreen controls, at local script saving nang walang account o download.",
      quickLinksLabel: "Quick links",
      popularPagesLabel: "Popular pages"
    }
  }
};
