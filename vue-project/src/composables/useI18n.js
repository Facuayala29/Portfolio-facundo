import { ref } from 'vue'

const locale = ref('EN')

const translations = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About',
      works: 'Works',
      skills: 'Skillset',
      contact: 'Contact',
    },
    hero: {
      label: 'portfolio of a',
      titleMain: 'Multimedia',
      titleSub: 'Designer.',
      taglineDay: 'Making pixels worth your screen time.',
      taglineNight: 'Still making pixels. Send help.',
      tagline: 'Multimedia\nDesigner Portfolio',
    },
    contact: {
      small: 'your project',
      huge: 'DESERVES',
      mid: 'more than average.',
      call: "let's build it.",
    },
    manifesto: {
      line1: 'Designing clarity',
      line2: 'Crafting emotions',
      line3a: 'Building',
      line3b: 'experiences',
    },
    about: {
      tag: 'About',
      cvBtn: 'Download CV',
      bio: "I design things people can't scroll past. Then I build them myself. Born in Argentina, studying in Denmark. Living between cultures gave me the ability to adapt, and see problems from angles most people never consider. Graphic design, UX research, frontend development, content creation, digital marketing: I don't separate them. The visual and the functional are the same problem, and I'm obsessive about solving both.",
    },
    works: {
      tag: '[ Selected Works ]',
      title: 'Recent\nProjects',
      projects: [
        {
          title: 'Business DE-DK',
          type: 'UX Design · Web Development · Brand Campaign',
          desc: 'Real client, real exam. A failing cross border website rebuilt from scratch: trilingual, SEO optimised, with a full brand campaign delivered in four weeks.',
          objective: 'Design without strategy is decoration. Before touching any tool, we audited the live site, ran a Q&A with the client, mapped user journeys, and built a MoSCoW model to separate what actually mattered from what could wait. Every decision after that, from navigation architecture to keyword research, had to justify itself. The visual language came last.',
          process: "I led design direction and social media. The first problem wasn't visual: the site never made clear what it actually was, and the pages that mattered most were buried three clicks deep in a submenu. So we fixed the structure before designing anything. For social, I didn't want random posts. I built the campaign on five pillars: cooperation, data, talent, events and regional visibility. Every post has a pillar and a job, planned day by day across four weeks on LinkedIn and Instagram.",
          tools: ["Figma", "Illustrator", "InDesign", "Vue", "WordPress", "Firebase"],
          outcome: 'A production ready trilingual website (DK/DE/EN) with full SEO implementation, print ready brand materials, a digital campaign, and complete documentation, delivered to the client within a four week Scrum sprint.',
          pdfLabel: 'View the social calendar',
          tags: ['UX Research', 'Web Design', 'Campaign'],
        },
        {
          title: 'Super Mario Bros',
          type: 'Information Design · Print',
          desc: 'One poster turning the Super Mario Bros universe into layered information design. Game history, mechanics and cultural impact packed into a single visual.',
          objective: 'Making dense information feel effortless. The game\'s own iconography does the guiding, the nostalgia does the rest. A poster that rewards attention without demanding it.',
          process: "The brief was a national day in March. While digging through options, March 10 showed up: MAR10, Mario Day. In the first sketch the history was already a journey, and the green pipes solved it on their own: in the game, pipes take you somewhere new, and here they connect every era from 1985 to 2017. Sales became stacks of coins instead of bars. For the background I went back and forth between plants, a castle and clouds. Clouds won because they don't steal the spotlight from the information. Every graphic element is drawn by me, in 8-bit.",
          tools: ["Illustrator", "InDesign"],
          outcome: 'Voted best in class by peers and displayed in the university hallway, recognised for turning dense game history into something genuinely engaging.',
          tags: ['Infographic', 'Print', 'Editorial'],
        },
        {
          title: "Esbjerg's Core",
          type: 'Editorial · Brand Identity · Illustration',
          desc: 'A printed district magazine for Esbjerg targeting young adults. Not a city guide. A brand identity built from scratch with custom illustrations throughout.',
          objective: "The brief asked for a brochure. I pushed it into an editorial, because young people don't keep brochures, they keep magazines. Every illustration and layout decision pointed toward one feeling: personal, curated, a little unexpected.",
          process: "I brainstormed what kind of magazine actually grabs young people, and the answer wasn't a guide. It was a secret. The magazine hands you a key to three places most people don't know, all with a super cozy vibe: The Wharf, the street art of Skolegade and Kaffesmeden. The key became the logo: the \"C\" of Core with a key running through it. On the cover, the symbols everyone already knows from Esbjerg are torn apart, as if the city's surface is opening up.",
          tools: ["Illustrator", "Photoshop", "InDesign"],
          outcome: 'A multipage brochure featuring original illustrations, a defined brand identity, and editorial typography, a cohesive print piece that successfully repositioned a city district for a younger, design conscious audience.',
          pdfLabel: 'Check the magazine',
          tags: ['Branding', 'Illustration', 'Print'],
        },

        {
          title: 'Urban Echo',
          type: 'Brand Identity · Web Design · UX',
          desc: 'A freelance brand concept fusing urban fashion, rave culture, brutalist architecture and electronic music. A full visual system with a real design rationale, taken from first sketch to a working web UI.',
          objective: 'Build a brand that feels like it already exists in the wild. The visual language had to hold up in both streetwear and underground music contexts without borrowing too much from either. Then translate that into UX flows, UI components, and motion direction that put the user inside the world from the first scroll.',
          process: "Real client, one clear ask: something nobody else has. I started from keywords: urban, modern, bold, music, fashion, echo, disruptive. I tried sound waves coming off the \"UE\", but other brands already use that. I also tried a repeating \"UE\" fading like an echo, and a \"U\" in graffiti colours. The broken \"UE\" won: the echo doesn't surround the logo, it cracks right through it. Chrome gave it 3D depth. The website grew out of low-fi paper wireframes (Home, Shop, The Lab). For their ad campaign they needed one piece from me: an animated magazine flipping through sketches of their clothes, built in After Effects.",
          tools: ["Illustrator", "Photoshop", "Figma", "After Effects"],
          outcome: 'A complete brand system covering logo, colour palette, typography, and UI pattern library, alongside high fidelity web mockups and a full UX flow. A cohesive identity that works across physical and digital touch points.',
          tags: ['Branding', 'Web Design', 'UX'],
        },
        {
          title: 'The Green Loop',
          type: 'Concept Design · Branding · Social Media',
          desc: 'A community hub concept for Esbjerg: workshop space, bar and reuse spot in one identity, with a full brand and social media campaign built to actually attract people.',
          objective: 'The work had to hold up as a real proposal, not a student exercise. Spatial reasoning, brand identity and a social media campaign that could plausibly run in the real world. The question throughout was: would this actually work?',
          process: "The hardest part was a logo that speaks to every age. The keywords were sustainability, community, social hub, awareness and relax. The idea that stuck was a circle: the recycling loop and the community loop at the same time, drawn as a single line that comes back around and keeps going. Simple enough for a kid, meaningful enough for an adult.",
          tools: ["Illustrator", "Photoshop", "Figma"],
          outcome: 'A full concept package, brand identity, naming, spatial layout rationale, and a short social media campaign, presented as a cohesive pitch for sustainable urban development in Esbjerg.',
          tags: ['Sustainability', 'Branding', 'Concept'],
        },
      ],
    },
    modal: {
      brief: 'Brief',
      objective: 'Objective',
      sketches: 'Sketches and Mockups',
      outcome: 'Outcome',
      process: 'Process',
      tools: 'Tools',
      zoom: 'View full size',
    },
    skills: {
      title: 'Skill {set}',
      categories: ['Design', 'Soft Skills', 'Tools', 'AI'],
      categorySkills: [
        ['UI/UX Design', 'Visual Design', 'Brand Identity', 'Design Systems', 'UX Research', 'Information Design', 'Print Design', 'Illustration', 'Typography', 'Motion Design'],
        ['Problem Solving', 'Creative Thinking', 'Adaptability', 'Communication', 'Client Relations', 'Resourcefulness', 'Management'],
        ['Figma', 'After Effects', 'Premiere Pro', 'InDesign', 'Illustrator', 'Photoshop', 'JavaScript', 'HTML', 'CSS', 'WordPress', 'Vue', 'Firebase', 'Git', 'SEO'],
        ['Prompt Writing', 'Strategic AI Implementation', 'Generative AI', 'AI-Assisted Design'],
      ],
    },
  },

  ES: {
    nav: {
      home: 'Inicio',
      about: 'Sobre',
      works: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    hero: {
      label: 'portfolio de un',
      titleMain: 'Diseñador',
      titleSub: 'de Multimedia.',
      taglineDay: 'Haciendo que los pixels valgan tu tiempo de pantalla.',
      taglineNight: 'Todavía haciendo pixels. Manden ayuda.',
      tagline: 'Portfolio de\nDiseñador Multimedia',
    },
    contact: {
      small: 'tu proyecto',
      huge: 'MERECE',
      mid: 'más que el promedio.',
      call: 'hagámoslo.',
    },
    manifesto: {
      line1: 'Diseñando claridad',
      line2: 'Creando emociones',
      line3a: 'Construyendo',
      line3b: 'experiencias',
    },
    about: {
      tag: 'Sobre',
      cvBtn: 'Descargar CV',
      bio: 'Diseño cosas que frenan el scroll. Y después las construyo yo mismo. Nací en Argentina, estudio en Dinamarca. Crecer entre culturas me enseñó a adaptarme y a ver los problemas desde ángulos que la mayoría ni considera. Diseño gráfico, investigación UX, desarrollo frontend, creación de contenido, marketing digital: no los separo. Lo visual y lo funcional son el mismo problema, y soy obsesivo resolviendo los dos.',
    },
    works: {
      tag: '[ Trabajos Seleccionados ]',
      title: 'Proyectos\nRecientes',
      projects: [
        {
          title: 'Business DE-DK',
          type: 'Diseño UX · Desarrollo Web · Campaña de Marca',
          desc: 'Cliente real, examen real. Un sitio web fallido reconstruido desde cero: trilingüe, optimizado para SEO, con una campaña de marca completa entregada en cuatro semanas.',
          objective: 'El diseño sin estrategia es decoración. Antes de tocar ninguna herramienta, auditamos el sitio en vivo, entrevistamos al cliente, mapeamos recorridos de usuario y construimos un modelo MoSCoW para separar lo importante de lo accesorio. Cada decisión posterior tuvo que justificarse. El lenguaje visual vino al final.',
          process: "Estuve a cargo de la dirección de diseño y las redes sociales. El primer problema no era visual: el sitio no dejaba claro qué era, y las páginas más importantes estaban enterradas a tres clics dentro de un submenú. Por eso reordenamos la estructura antes de diseñar nada. Para las redes no quería posts sueltos, así que armé la campaña sobre cinco pilares: cooperación, datos, talento, eventos y visibilidad regional. Cada post tiene un pilar y un objetivo, planificado día por día durante cuatro semanas en LinkedIn e Instagram.",
          tools: ["Figma", "Illustrator", "InDesign", "Vue", "WordPress", "Firebase"],
          outcome: 'Un sitio web trilingüe (DK/DE/EN) listo para producción, con SEO implementado, materiales de marca listos para imprenta, una campaña digital y documentación completa, entregado al cliente en un sprint de cuatro semanas con metodología Scrum.',
          pdfLabel: 'Ver el calendario social',
          tags: ['Investigación UX', 'Diseño Web', 'Campaña'],
        },
        {
          title: 'Super Mario Bros',
          type: 'Diseño de Información · Impresión',
          desc: 'Un solo póster que convierte el universo de Super Mario Bros en diseño de información. Historia, mecánicas e impacto cultural apilados en un solo visual.',
          objective: 'Hacer que la información densa se sienta sin esfuerzo. La iconografía del propio juego guía el recorrido, la nostalgia hace el resto. Un póster que recompensa la atención sin exigirla.',
          process: "La consigna era un día nacional de marzo. Buscando opciones apareció el 10 de marzo: MAR10, el día de Mario. En el boceto la historia ya era un recorrido, y los tubos verdes lo resolvían solos: en el juego, los tubos te llevan de un lugar a otro, y acá conectan cada etapa desde 1985 hasta 2017. Las ventas son pilas de monedas en vez de barras. Para el fondo dudé entre plantas, castillo y nubes, y ganaron las nubes porque no le roban protagonismo a la información. Todas las piezas gráficas las dibujé yo, en 8-bit.",
          tools: ["Illustrator", "InDesign"],
          outcome: 'Votada mejor infografía de la clase y expuesta en el pasillo de la universidad, reconocida por convertir datos densos en algo genuinamente atractivo.',
          tags: ['Infografía', 'Impresión', 'Editorial'],
        },
        {
          title: "Esbjerg's Core",
          type: 'Editorial · Identidad de Marca · Ilustración',
          desc: 'Una revista impresa de distrito para Esbjerg dirigida a jóvenes adultos. No una guía turística. Una identidad de marca diseñada desde cero con ilustraciones propias en cada página.',
          objective: "El brief pedía un folleto. Lo llevé a algo editorial, porque la gente joven no guarda folletos, guarda revistas. Cada ilustración y decisión de diseño apuntaba a una sola sensación: personal, curada, un poco inesperada.",
          process: "Hice un brainstorming de qué revistas le llaman la atención de verdad a la gente joven, y la respuesta no era una guía: era un secreto. La revista te da una llave para entrar a tres lugares poco conocidos y con un ambiente súper cozy: The Wharf, el arte urbano de Skolegade y Kaffesmeden. La llave se volvió el logo, una \"C\" de Core atravesada por una llave. En la portada, los símbolos que todos conocen de Esbjerg aparecen rasgados, como si la superficie de la ciudad se abriera.",
          tools: ["Illustrator", "Photoshop", "InDesign"],
          outcome: 'Un folleto multipágina con ilustraciones originales, identidad de marca definida y tipografía editorial. Una pieza impresa cohesiva que reposicionó con éxito un distrito de la ciudad para una audiencia más joven y con conciencia de diseño.',
          pdfLabel: 'Ver la revista',
          tags: ['Branding', 'Ilustración', 'Impresión'],
        },

        {
          title: 'Urban Echo',
          type: 'Identidad de Marca · Diseño Web · UX',
          desc: 'Un concepto de marca freelance que fusiona moda urbana, cultura rave, arquitectura brutalista y música electrónica. Un sistema visual completo con justificación real, desde el primer boceto hasta una UI web funcional.',
          objective: 'Construir una marca que parezca que ya existe en la calle. El lenguaje visual tenía que funcionar tanto en contextos de moda streetwear como en la escena musical underground, sin copiar demasiado de ninguno. Luego traducir eso en flujos UX, componentes UI y dirección de movimiento que sumerjan al usuario en el mundo desde el primer scroll.',
          process: "Cliente real, con un pedido claro: una propuesta única. Arranqué con palabras clave: urbano, moderno, bold, música, moda, eco e irruptivo. Probé ondas de sonido saliendo del \"UE\", pero ya las usaban otras marcas. También probé el \"UE\" repetido como un eco y una \"U\" con colores de grafiti. Ganó el \"UE\" roto: el eco no rodea al logo, lo atraviesa. El cromo le dio profundidad 3D. La web salió de wireframes low-fi en papel (Home, Shop y The Lab). Para su publicidad necesitaban una sola pieza mía: una revista animada que pasa por bocetos de su ropa, hecha en After Effects.",
          tools: ["Illustrator", "Photoshop", "Figma", "After Effects"],
          outcome: 'Un sistema de marca completo con logo, paleta de colores, tipografía y biblioteca de componentes UI, junto a mockups web en alta fidelidad y un flujo UX completo. Una identidad cohesiva que funciona en puntos de contacto físicos y digitales.',
          tags: ['Branding', 'Diseño Web', 'UX'],
        },
        {
          title: 'The Green Loop',
          type: 'Diseño de Concepto · Branding · Redes Sociales',
          desc: 'Un concepto de hub comunitario para Esbjerg: espacio de talleres, bar y punto de reutilización en una sola identidad, con una marca completa y campaña en redes para atraer gente de verdad.',
          objective: 'El trabajo tenía que sostenerse como una propuesta real, no un ejercicio universitario. Razonamiento espacial, identidad de marca y una campaña en redes que podría funcionar en el mundo real. La pregunta durante todo el proceso fue: ¿esto realmente funcionaría?',
          process: "Lo más difícil fue un logo que le hable a todas las edades. Las palabras clave eran sustentabilidad, comunidad, hub social, conciencia y relax. La idea que quedó fue un círculo, el del reciclaje y el de la comunidad a la vez, dibujado con una sola línea que da la vuelta y sigue. Simple para un chico, con sentido para un adulto.",
          tools: ["Illustrator", "Photoshop", "Figma"],
          outcome: 'Un paquete de concepto completo: identidad de marca, naming, justificación del layout espacial y una campaña corta en redes, presentado como una propuesta cohesiva para el desarrollo urbano sustentable en Esbjerg.',
          tags: ['Sostenibilidad', 'Branding', 'Concepto'],
        },
      ],
    },
    modal: {
      brief: 'Brief',
      objective: 'Objetivo',
      sketches: 'Bocetos y Mockups',
      outcome: 'Resultado',
      process: 'Proceso',
      tools: 'Herramientas',
      zoom: 'Ver en grande',
    },
    skills: {
      title: 'Habilidades {set}',
      categories: ['Diseño', 'Habilidades Blandas', 'Herramientas', 'IA'],
      categorySkills: [
        ['Diseño UI/UX', 'Diseño Visual', 'Identidad de Marca', 'Sistemas de Diseño', 'Investigación UX', 'Diseño de Información', 'Diseño Editorial', 'Ilustración', 'Tipografía', 'Motion Design'],
        ['Resolución de Problemas', 'Pensamiento Creativo', 'Adaptabilidad', 'Comunicación', 'Relación con Clientes', 'Resourcefulness', 'Gestión'],
        ['Figma', 'After Effects', 'Premiere Pro', 'InDesign', 'Illustrator', 'Photoshop', 'JavaScript', 'HTML', 'CSS', 'WordPress', 'Vue', 'Firebase', 'Git', 'SEO'],
        ['Escritura de Prompts', 'Implementación Estratégica de IA', 'IA Generativa', 'Diseño Asistido por IA'],
      ],
    },
  },
}

export function useI18n() {
  function t(keyPath) {
    const keys = keyPath.split('.')
    let val = translations[locale.value]
    for (const k of keys) {
      if (val == null) return keyPath
      val = val[k]
    }
    return val ?? keyPath
  }

  return { locale, t, setLocale: lang => { locale.value = lang } }
}
