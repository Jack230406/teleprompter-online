import type { Locale } from "@/lib/site";

export const landingPageSlugs = [
  "online-teleprompter",
  "free-teleprompter",
  "teleprompter-for-youtube"
] as const;

export type LandingPageSlug = (typeof landingPageSlugs)[number];

export type LandingPageEntry = {
  slug: LandingPageSlug;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  highlights: string[];
  sections: Array<{
    title: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const landingPages: Record<
  Locale,
  Record<LandingPageSlug, LandingPageEntry>
> = {
  en: {
    "online-teleprompter": {
      slug: "online-teleprompter",
      label: "Online teleprompter",
      eyebrow: "Browser teleprompter",
      title: "An online teleprompter that is ready before your camera is.",
      description:
        "Paste your script, adjust speed, line height, and text width, then read in a fullscreen browser teleprompter with no signup and no install.",
      metaTitle: "Online Teleprompter",
      metaDescription:
        "Use a free online teleprompter in your browser with local script saving, fullscreen reading, mirror mode, line-height controls, and no signup.",
      highlights: [
        "Runs directly in the browser on desktop or mobile",
        "Keeps script and settings saved locally",
        "Supports mirror mode, reverse scroll, and fullscreen reading"
      ],
      sections: [
        {
          title: "Fast setup for live use",
          description:
            "Open the tool, paste your script, and start adjusting the reader immediately instead of working through a sign-up flow or a download step."
        },
        {
          title: "Readable layout controls",
          description:
            "Tune font size, line height, and text width so the script feels comfortable for your camera distance, display size, and delivery pace."
        },
        {
          title: "A clean reader stage",
          description:
            "The dedicated reader separates play, pause, stop, reset, and fullscreen actions so the tool stays easy to control during rehearsal or recording."
        }
      ],
      faq: [
        {
          question: "Do I need to install anything to use this online teleprompter?",
          answer:
            "No. Teleprompter Online runs as a frontend app in the browser, so you can start using it immediately without software installation."
        },
        {
          question: "Does this online teleprompter save my script online?",
          answer:
            "No. The current product stores your script and settings in localStorage, which keeps them in the browser on the device you are using."
        },
        {
          question: "Can I use fullscreen in the browser reader?",
          answer:
            "Yes. The reader includes fullscreen support so you can enlarge the prompting surface for rehearsal, recording, or presentation work."
        }
      ]
    },
    "free-teleprompter": {
      slug: "free-teleprompter",
      label: "Free teleprompter",
      eyebrow: "No-cost teleprompter",
      title: "A free teleprompter with the controls creators actually need.",
      description:
        "Use Teleprompter Online for free with no account, no trial gate, and no download. Your script stays in this browser while you rehearse or record.",
      metaTitle: "Free Teleprompter",
      metaDescription:
        "Use a free teleprompter online with no account. Write or paste a script, adjust speed and text width, and prompt in fullscreen directly in your browser.",
      highlights: [
        "Free to use without an account",
        "No forced install or server sync",
        "Built for rehearsal, recording, and presentation workflows"
      ],
      sections: [
        {
          title: "Free without account friction",
          description:
            "You can start prompting right away. The first screen keeps the tool visible instead of turning the landing page into a sign-up wall."
        },
        {
          title: "Useful controls from the start",
          description:
            "Speed, font size, line height, text width, mirror mode, reverse scroll, and theme controls are all available in the same workspace."
        },
        {
          title: "Local-first script handling",
          description:
            "For many creators and presenters, keeping the script in the browser is simpler than moving notes through a cloud account they do not need."
        }
      ],
      faq: [
        {
          question: "Is this really a free teleprompter?",
          answer:
            "Yes. The current version is free to use in the browser and does not require a paid plan or account before you can prompt a script."
        },
        {
          question: "Can I use this free teleprompter on mobile?",
          answer:
            "Yes. The interface is responsive and works across desktop and mobile browsers, although longer scripts are generally easier to manage on larger screens."
        },
        {
          question: "What happens if I refresh the page?",
          answer:
            "Your script and reader settings persist in the browser through localStorage, so the current setup is still there when you come back on the same device and browser."
        }
      ]
    },
    "teleprompter-for-youtube": {
      slug: "teleprompter-for-youtube",
      label: "Teleprompter for YouTube",
      eyebrow: "Creator workflow",
      title: "A teleprompter for YouTube intros, tutorials, and talking-head videos.",
      description:
        "Keep your eyes near the lens, rehearse line by line, and adjust margins, font size, and mirror mode for your YouTube recording setup.",
      metaTitle: "Teleprompter for YouTube",
      metaDescription:
        "Use Teleprompter Online as a teleprompter for YouTube videos, talking-head scripts, intros, and tutorials with fullscreen, margin, and mirror controls.",
      highlights: [
        "Useful for intros, explainer videos, and tutorials",
        "Mirror and reverse controls help with glass rigs",
        "Layout settings make scripts easier to read near the lens"
      ],
      sections: [
        {
          title: "Built for creator pacing",
          description:
            "Short intros, sponsorship reads, talking points, and full tutorial scripts can all live in the same local-first workflow while you keep adjusting the read speed."
        },
        {
          title: "Better control near the camera",
          description:
            "Text width and line height controls help reduce visual strain when you are trying to keep eye contact close to the lens during a YouTube shoot."
        },
        {
          title: "Useful before and during recording",
          description:
            "Use the live preview to tune the layout, then switch into the focused reader with fullscreen support when you are ready to record."
        }
      ],
      faq: [
        {
          question: "Can I use this teleprompter for YouTube talking-head videos?",
          answer:
            "Yes. The reader is well suited to talking-head, educational, product, and commentary-style videos where you want guidance without looking far away from the camera."
        },
        {
          question: "Does it work with reflective teleprompter glass?",
          answer:
            "Yes. Mirror mode is included for reflective glass setups, and reverse scroll is also available if your hardware or display orientation needs it."
        },
        {
          question: "Can I estimate how long my YouTube script is?",
          answer:
            "Yes. The workspace shows word count and an estimated reading time so you can sense the size of the script before you start recording."
        }
      ]
    }
  },
  es: {
    "online-teleprompter": {
      slug: "online-teleprompter",
      label: "Teleprompter online",
      eyebrow: "Teleprompter en el navegador",
      title: "Un teleprompter online listo antes de que tu camara empiece a grabar.",
      description:
        "Pega tu guion, ajusta velocidad, altura de linea y ancho del texto, y lee en un teleprompter del navegador con pantalla completa, sin registro ni instalacion.",
      metaTitle: "Teleprompter Online",
      metaDescription:
        "Usa un teleprompter online gratis en tu navegador con guardado local, pantalla completa, modo espejo, control de altura de linea y sin registro.",
      highlights: [
        "Funciona directamente en el navegador, en desktop o movil",
        "Guarda guion y ajustes de forma local",
        "Incluye espejo, direccion inversa y pantalla completa"
      ],
      sections: [
        {
          title: "Preparacion rapida para usarlo en vivo",
          description:
            "Abre la herramienta, pega tu guion y empieza a ajustar el lector al instante en lugar de pasar por un registro o una instalacion."
        },
        {
          title: "Controles para leer con comodidad",
          description:
            "Ajusta fuente, altura de linea y ancho del texto segun la distancia a la camara, el tamano de pantalla y el ritmo de lectura."
        },
        {
          title: "Un lector limpio y claro",
          description:
            "El lector dedicado separa reproducir, pausar, detener, reiniciar y pantalla completa para que todo sea mas facil durante ensayos y grabaciones."
        }
      ],
      faq: [
        {
          question: "Necesito instalar algo para usar este teleprompter online?",
          answer:
            "No. Teleprompter Online funciona como una aplicacion frontend en el navegador, asi que puedes empezar de inmediato sin instalar software."
        },
        {
          question: "Este teleprompter online guarda mi guion en internet?",
          answer:
            "No. El producto actual guarda el guion y los ajustes en localStorage, por lo que permanecen en el navegador y el dispositivo que estas usando."
        },
        {
          question: "Puedo usar pantalla completa en el lector del navegador?",
          answer:
            "Si. El lector incluye soporte para pantalla completa para ampliar la superficie de lectura durante ensayos, grabaciones o presentaciones."
        }
      ]
    },
    "free-teleprompter": {
      slug: "free-teleprompter",
      label: "Teleprompter gratis",
      eyebrow: "Teleprompter sin costo",
      title: "Un teleprompter gratis con los controles que de verdad hacen falta.",
      description:
        "Usa Teleprompter Online gratis, sin cuenta, sin prueba y sin descarga. Tu guion permanece en este navegador mientras ensayas o grabas.",
      metaTitle: "Teleprompter Gratis",
      metaDescription:
        "Usa un teleprompter gratis online sin cuenta. Escribe o pega tu guion, ajusta velocidad y ancho del texto, y lee en pantalla completa desde el navegador.",
      highlights: [
        "Gratis y sin registro",
        "Sin instalacion obligatoria ni sincronizacion forzada",
        "Pensado para ensayar, grabar y presentar"
      ],
      sections: [
        {
          title: "Gratis sin friccion",
          description:
            "Puedes empezar a leer al instante. La primera pantalla mantiene la herramienta visible en lugar de convertir la landing en un formulario."
        },
        {
          title: "Controles utiles desde el primer uso",
          description:
            "Velocidad, fuente, altura de linea, ancho del texto, espejo, direccion inversa y tema se configuran en un mismo espacio."
        },
        {
          title: "Guion guardado localmente",
          description:
            "Para muchos creadores y presentadores, mantener el guion en el navegador es mas simple que depender de una cuenta en la nube que no necesitan."
        }
      ],
      faq: [
        {
          question: "De verdad es un teleprompter gratis?",
          answer:
            "Si. La version actual es gratuita en el navegador y no exige un plan de pago ni una cuenta antes de empezar a leer."
        },
        {
          question: "Puedo usar este teleprompter gratis en movil?",
          answer:
            "Si. La interfaz es responsive y funciona en navegadores desktop y movil, aunque los guiones largos suelen ser mas comodos en pantallas grandes."
        },
        {
          question: "Que pasa si recargo la pagina?",
          answer:
            "El guion y los ajustes del lector se guardan en localStorage, por lo que la configuracion sigue disponible al volver desde el mismo navegador y dispositivo."
        }
      ]
    },
    "teleprompter-for-youtube": {
      slug: "teleprompter-for-youtube",
      label: "Teleprompter para YouTube",
      eyebrow: "Flujo para creadores",
      title: "Un teleprompter para YouTube, intros, tutoriales y videos frente a camara.",
      description:
        "Mantén los ojos cerca del lente, ensaya linea por linea y ajusta margenes, fuente y modo espejo para tu configuracion de YouTube.",
      metaTitle: "Teleprompter para YouTube",
      metaDescription:
        "Usa Teleprompter Online como teleprompter para YouTube con pantalla completa, control de margenes, fuente y modo espejo para videos y tutoriales.",
      highlights: [
        "Util para intros, explicaciones y tutoriales",
        "Espejo y direccion inversa para rigs con cristal",
        "Controles de formato para leer mejor cerca del lente"
      ],
      sections: [
        {
          title: "Pensado para el ritmo de creadores",
          description:
            "Intros, menciones de patrocinio, puntos clave y guiones completos caben en el mismo flujo local mientras ajustas la velocidad de lectura."
        },
        {
          title: "Mas control cerca de la camara",
          description:
            "Los controles de ancho del texto y altura de linea ayudan a reducir esfuerzo visual cuando intentas mantener el contacto con el lente."
        },
        {
          title: "Util antes y durante la grabacion",
          description:
            "Usa la vista previa para afinar el formato y luego cambia al lector enfocado con pantalla completa cuando llegue el momento de grabar."
        }
      ],
      faq: [
        {
          question: "Puedo usar este teleprompter para videos talking-head en YouTube?",
          answer:
            "Si. El lector funciona bien para videos talking-head, educativos, de producto y de comentario cuando quieres apoyo sin apartar mucho la vista de la camara."
        },
        {
          question: "Funciona con cristal reflectante de teleprompter?",
          answer:
            "Si. El modo espejo esta incluido para configuraciones con cristal reflectante y tambien puedes usar direccion inversa si tu hardware lo necesita."
        },
        {
          question: "Puedo estimar cuanto dura mi guion de YouTube?",
          answer:
            "Si. El espacio de trabajo muestra conteo de palabras y tiempo estimado para que puedas medir el guion antes de empezar a grabar."
        }
      ]
    }
  }
};

export function isLandingPageSlug(value: string): value is LandingPageSlug {
  return landingPageSlugs.includes(value as LandingPageSlug);
}

export function getLandingPage(locale: Locale, slug: LandingPageSlug) {
  return landingPages[locale][slug];
}
