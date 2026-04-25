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
      tagline: 'Multimedia\nDesigner Portfolio',
    },
    manifesto: {
      line1: 'Designing clarity',
      line2: 'Crafting emotion',
      line3a: 'Building',
      line3b: 'experiences',
    },
    about: {
      tag: '[ About ]',
      bio: "I'm a Multimedia Designer who bridges the gap between artistic expression and user functionality. By combining my background in fast paced hospitality and retail styling, I bring real world empathy to UX/UI design, frontend development, and identity branding. I focus on turning abstract brand concepts into tangible, user centric digital experiences.",
    },
    works: {
      tag: '[ Selected Works ]',
      title: 'Recent\nProjects',
      projects: [
        {
          title: 'Urban Echo',
          type: 'Brand Identity · Web Design · UX',
          desc: 'A self-initiated brand concept merging urban fashion with rave culture, brutalist structures, and electronic music fused into one visual system. The project covers the full design process from concept through to a web-ready UI.',
          objective: 'Define a brand voice and visual language that authentically captures the collision of streetwear, brutalist architecture, and the underground rave scene, then translate it into a functional web experience with UX flows, UI components, and motion direction.',
          outcome: 'A complete brand system, logo, colour palette, typography, and UI pattern library, alongside high-fidelity web mockups and a UX flow that immerses the user in the brand world from the first scroll.',
          tags: ['Branding', 'Web Design', 'UX'],
        },
        {
          title: 'Super Mario Bros',
          type: 'Information Design · Print',
          desc: 'A university information design project using the Super Mario Bros universe as the subject, turning game history, mechanics, and cultural impact into a single, visually cohesive poster.',
          objective: 'Communicate layered information in a way that feels immediately engaging rather than textbook-heavy. The challenge was balancing visual density with readability, using the game\'s iconography to guide the eye and structure the narrative.',
          outcome: 'Voted best in class by peers and displayed in the university hallway — recognised for turning dense game history into something genuinely engaging.',
          tags: ['Infographic', 'Print', 'Editorial'],
        },
        {
          title: 'Core Brochure',
          type: 'Brand Identity · Illustration · Print',
          desc: 'A university brief to design a printed district brochure for Esbjerg, targeting young adults. Rather than a standard city guide, the concept focused on hidden, cozy spots, the kind of places locals know but tourists miss.',
          objective: 'Develop a brand identity from scratch alongside custom illustrations and editorial layout. The goal was a piece that felt personal and curated, not touristic, reflecting the character of the district through tone, colour, and hand-drawn visual language.',
          outcome: 'A multi-page brochure featuring original illustrations, a defined brand identity, and editorial typography, a cohesive print piece that successfully repositioned a city district for a younger, design-conscious audience.',
          tags: ['Branding', 'Illustration', 'Print'],
        },
        {
          title: 'International Food Day',
          type: 'Poster Design · Event',
          desc: 'An event poster designed to invite a broad audience to an international food tasting, the visual had to communicate warmth, diversity, and appetite across cultural backgrounds.',
          objective: 'Create a poster that works on impact alone, no long copy, no complex layout. The design needed to feel festive and inclusive while standing out in a physical environment where it would compete for attention.',
          outcome: 'A bold, typographically-led poster that used colour, composition, and food-culture references to draw people in, communicating the event\'s multicultural spirit at a glance.',
          tags: ['Poster', 'Event', 'Print'],
        },
        {
          title: 'The Green Loop',
          type: 'Concept Design · Branding · Social Media',
          desc: 'A university sustainability project requiring a real proposal for improving an area in Esbjerg. The concept, The Green Loop, is a community hub combining a workshop space, a bar, and a reuse spot, designed to encourage social connection and environmental responsibility.',
          objective: 'Move beyond a design exercise and produce a credible concept pitch: spatial reasoning, brand identity, and a social media campaign that could actually attract the target community. The work needed to hold up as a real proposal, not just a student project.',
          outcome: 'A full concept package, brand identity, naming, spatial layout rationale, and a short social media campaign, presented as a cohesive pitch for sustainable urban development in Esbjerg.',
          tags: ['Sustainability', 'Branding', 'Concept'],
        },
      ],
    },
    skills: {
      title: 'Skill {set}',
      categories: ['Design', 'Soft Skills', 'Tools', 'AI'],
    },
  },

  ES: {
    nav: {
      home: 'Inicio',
      about: 'Acerca',
      works: 'Works',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    hero: {
      tagline: 'Portfolio de\nDiseñador Multimedia',
    },
    manifesto: {
      line1: 'Diseñando claridad',
      line2: 'Creando emoción',
      line3a: 'Construyendo',
      line3b: 'experiencias',
    },
    about: {
      tag: '[ Acerca ]',
      bio: 'Soy un Diseñador Multimedia que une la expresión artística con la funcionalidad del usuario. Combinando mi experiencia en hostelería y estilismo retail, aporto empatía real al diseño UX/UI, desarrollo frontend e identidad de marca. Me enfoco en convertir conceptos de marca abstractos en experiencias digitales tangibles y centradas en el usuario.',
    },
    works: {
      tag: '[ Trabajos Seleccionados ]',
      title: 'Proyectos\nRecientes',
      projects: [
        {
          title: 'Urban Echo',
          type: 'Identidad de Marca · Diseño Web · UX',
          desc: 'Una marca ficticia donde la moda urbana choca con la cultura rave, estructuras brutalistas y música electrónica fusionados en una sola identidad visual.',
          objective: 'Construir una identidad de marca y experiencia web que canalice la energía cruda del streetwear urbano, la arquitectura brutalista y la escena rave underground.',
          outcome: 'Un sistema de marca completo, logo, paleta, tipografía, patrones UI, y un diseño web que sumerge al usuario en la colisión de esas subculturas.',
          tags: ['Branding', 'Diseño Web', 'UX'],
        },
        {
          title: 'Super Mario Bros',
          type: 'Diseño de Información · Impresión',
          desc: 'Un proyecto universitario de infografía usando el universo de Super Mario Bros para comunicar información de forma visualmente cautivadora y narrativa.',
          objective: 'Diseñar un póster que cuente una historia convincente a través del diseño de información, claro, atractivo y memorable.',
          outcome: 'Votada mejor infografía de la clase y expuesta en el pasillo de la universidad — reconocida por convertir datos densos en algo genuinamente atractivo.',
          tags: ['Infografía', 'Impresión', 'Editorial'],
        },
        {
          title: 'Core Brochure',
          type: 'Identidad de Marca · Ilustración · Impresión',
          desc: 'Un proyecto universitario para diseñar un folleto de distrito en Esbjerg, destacando rincones ocultos para jóvenes adultos que buscan lugares acogedores y poco conocidos.',
          objective: 'Crear una identidad de marca y folleto ilustrado dirigido a un público joven y curioso, guiándolos hacia los lugares más atmosféricos y menos conocidos de la ciudad.',
          outcome: 'Un folleto completo con ilustraciones originales e identidad de marca, presentando los rincones escondidos de Esbjerg desde la mirada de su comunidad creativa joven.',
          tags: ['Branding', 'Ilustración', 'Impresión'],
        },
        {
          title: 'Día Internacional de la Comida',
          type: 'Diseño de Póster · Evento',
          desc: 'Un póster de evento creado para invitar a las personas a probar y celebrar la gastronomía de todo el mundo.',
          objective: 'Diseñar un póster visualmente impactante que capture la calidez y diversidad de la cultura gastronómica internacional y motive a la gente a asistir.',
          outcome: 'Un póster vibrante y culturalmente expresivo que comunicó el espíritu del evento y atrajo al público a la celebración.',
          tags: ['Póster', 'Evento', 'Impresión'],
        },
        {
          title: 'The Green Loop',
          type: 'Diseño de Concepto · Branding · Redes Sociales',
          desc: 'Un concepto de sostenibilidad para Esbjerg, un hub social que reúne a las personas a través de talleres, un bar y un espacio de reutilización para construir una comunidad más verde y conectada.',
          objective: 'Proponer un concepto urbano sostenible que aborde la conexión, la pertenencia social y la responsabilidad ambiental, respaldado por una identidad de marca y una campaña en redes sociales.',
          outcome: 'Un concepto completo con identidad de marca, visión espacial y campaña en redes sociales, presentando The Green Loop como modelo de renovación urbana comunitaria.',
          tags: ['Sostenibilidad', 'Branding', 'Concepto'],
        },
      ],
    },
    skills: {
      title: 'Habilidades',
      categories: ['Diseño', 'Habilidades Blandas', 'Herramientas', 'IA'],
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
