/* =============================================================================
   i18n.js — STATIC INTERFACE TEXT (EN / PT / ES)
   -----------------------------------------------------------------------------
   This file holds every fixed text of the interface (menu, hero, section
   titles, buttons, "About", certifications, contact, footer and modal labels).

   HOW TRANSLATION WORKS
   - In index.html, elements carry an attribute like  data-i18n="hero.bio".
   - main.js reads the chosen language here and fills each element.
   - If a key is missing, ONLY that element stays empty — the page never breaks.

   TO EDIT A TEXT: change it in the three languages (en / pt / es) below.
   Keep the keys (the words before the ":") exactly the same in all languages.

   The "About" section and the stats are based on André's real LinkedIn profile
   (Brazilian Army — Personnel Data Analyst). Adjust freely if anything changes.
============================================================================= */

const I18N = {
  /* ----------------------------- ENGLISH ---------------------------------- */
  en: {
    langName: "English",
    nav: { projects: "Projects", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "DATA ANALYST · BUSINESS INTELLIGENCE",
      role: "Working in chaos. Deciding with data.",
      bio: "I turn messy, incomplete data into clean, reliable evidence for decisions. 4+ years as a data analyst, built on 8+ years of operational discipline in the Brazilian Army — now focused on Business Intelligence and the path to Data Science.",
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
    },
    stats: [
      { value: "4+", label: "Years in data analysis" },
      { value: "8+", label: "Years in the Brazilian Army" },
      { value: "B2", label: "English · Cambridge FCE" },
    ],
    skillsTitle: "Core skills",
    skills: [
      "SQL Analytics",
      "Power BI & Storytelling",
      "Python Automation",
      "Advanced Excel",
      "Excel VBA & RPA",
      "Business Intelligence",
    ],
    projectsTitle: "Selected projects",
    projectsSubtitle: "A focused set — solutions over tools. Click a card for the full case study.",
    cardCta: "View case study",
    about: {
      title: "About me",
      p1: "I'm a Personnel Data Analyst with 8+ years in the Brazilian Army — the last 4 dedicated to data analysis, personnel management and operational reporting. That environment shaped the way I work: disciplined, adaptable, and comfortable owning decisions under pressure and in fully remote settings.",
      p2: "I specialize in turning messy, incomplete datasets into clean, reliable evidence for decision-making: reconciling large datasets with conflicting records, building and auditing Excel models for HR and personnel allocation, spotting gaps and anomalies in organizational databases, automating workflows with VBA and RPA to remove manual errors, and translating the numbers into clear summaries for leadership. I follow the numbers wherever they lead — and I'm building toward Data Science one solid project at a time.",
      highlightsTitle: "What I bring",
      highlights: [
        { h: "Data quality & reconciliation", t: "Turning large, inconsistent datasets into reliable, decision-ready evidence." },
        { h: "Excel & allocation models", t: "Building and auditing Excel models for HR and personnel allocation." },
        { h: "Automation (VBA & RPA)", t: "Automating validation and reporting to cut manual work and errors." },
        { h: "Leadership & operations", t: "8+ years leading teams and operations in the Brazilian Army." },
      ],
      certsTitle: "Certifications",
      certs: [
        "Google Data Analytics Professional Certificate",
        "Cambridge FCE — English (B2)",
      ],
    },
    contact: {
      title: "Let's work together",
      subtitle: "Open to international freelance and fully remote full-time roles in Data & BI.",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      upwork: "Upwork",
    },
    modal: {
      problem: "Problem",
      approach: "Approach",
      tools: "Tools",
      results: "Results",
      insights: "Key insights",
      viewRepo: "View repository",
      gallery: "Project image",
      close: "Close",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },

  /* ---------------------------- PORTUGUÊS --------------------------------- */
  pt: {
    langName: "Português",
    nav: { projects: "Projetos", about: "Sobre", contact: "Contato" },
    hero: {
      eyebrow: "ANALISTA DE DADOS · BUSINESS INTELLIGENCE",
      role: "Atuando no caos. Decidindo com dados.",
      bio: "Transformo dados bagunçados e incompletos em evidências limpas e confiáveis para decisão. Mais de 4 anos como analista de dados, construídos sobre 8+ anos de disciplina operacional no Exército Brasileiro — agora focado em Business Intelligence e no caminho rumo à Ciência de Dados.",
      ctaProjects: "Ver projetos",
      ctaContact: "Entrar em contato",
    },
    stats: [
      { value: "4+", label: "Anos em análise de dados" },
      { value: "8+", label: "Anos no Exército Brasileiro" },
      { value: "B2", label: "Inglês · Cambridge FCE" },
    ],
    skillsTitle: "Principais competências",
    skills: [
      "Análise em SQL",
      "Power BI & Storytelling",
      "Automação em Python",
      "Excel Avançado",
      "Excel VBA & RPA",
      "Business Intelligence",
    ],
    projectsTitle: "Projetos selecionados",
    projectsSubtitle: "Um conjunto enxuto — soluções acima de ferramentas. Clique num card para o case completo.",
    cardCta: "Ver case completo",
    about: {
      title: "Sobre mim",
      p1: "Sou Analista de Dados (gestão de pessoal) com mais de 8 anos no Exército Brasileiro — os últimos 4 dedicados a análise de dados, gestão de pessoal e relatórios operacionais. Esse ambiente moldou meu jeito de trabalhar: disciplinado, adaptável e confortável em assumir decisões sob pressão e em ambientes 100% remotos.",
      p2: "Sou especialista em transformar bases bagunçadas e incompletas em evidências limpas e confiáveis para decisão: reconciliar grandes bases com registros conflitantes, construir e auditar modelos em Excel para RH e alocação de pessoal, identificar lacunas e anomalias em bancos de dados organizacionais, automatizar fluxos com VBA e RPA para eliminar erros manuais e traduzir os números em resumos claros para a liderança. Sigo os números aonde quer que levem — e construo o caminho rumo à Ciência de Dados, um projeto sólido de cada vez.",
      highlightsTitle: "O que eu trago",
      highlights: [
        { h: "Qualidade & reconciliação de dados", t: "Transformar bases grandes e inconsistentes em evidências confiáveis para decisão." },
        { h: "Excel & modelos de alocação", t: "Construir e auditar modelos em Excel para RH e alocação de pessoal." },
        { h: "Automação (VBA & RPA)", t: "Automatizar validação e relatórios para reduzir trabalho manual e erros." },
        { h: "Liderança & operações", t: "Mais de 8 anos liderando equipes e operações no Exército Brasileiro." },
      ],
      certsTitle: "Certificações",
      certs: [
        "Certificado Profissional Google Data Analytics",
        "Cambridge FCE — Inglês (B2)",
      ],
    },
    contact: {
      title: "Vamos trabalhar juntos",
      subtitle: "Aberto a oportunidades freelance internacionais e full-time 100% remotas em Dados & BI.",
      email: "E-mail",
      linkedin: "LinkedIn",
      github: "GitHub",
      upwork: "Upwork",
    },
    modal: {
      problem: "Problema",
      approach: "Abordagem",
      tools: "Ferramentas",
      results: "Resultados",
      insights: "Principais insights",
      viewRepo: "Ver repositório",
      gallery: "Imagem do projeto",
      close: "Fechar",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
  },

  /* ----------------------------- ESPAÑOL ---------------------------------- */
  es: {
    langName: "Español",
    nav: { projects: "Proyectos", about: "Sobre mí", contact: "Contacto" },
    hero: {
      eyebrow: "ANALISTA DE DATOS · BUSINESS INTELLIGENCE",
      role: "Operando en el caos. Decidiendo con datos.",
      bio: "Convierto datos desordenados e incompletos en evidencia limpia y confiable para decidir. Más de 4 años como analista de datos, construidos sobre 8+ años de disciplina operativa en el Ejército Brasileño — ahora enfocado en Business Intelligence y en el camino hacia la Ciencia de Datos.",
      ctaProjects: "Ver proyectos",
      ctaContact: "Contactar",
    },
    stats: [
      { value: "4+", label: "Años en análisis de datos" },
      { value: "8+", label: "Años en el Ejército Brasileño" },
      { value: "B2", label: "Inglés · Cambridge FCE" },
    ],
    skillsTitle: "Competencias principales",
    skills: [
      "Análisis en SQL",
      "Power BI & Storytelling",
      "Automatización en Python",
      "Excel Avanzado",
      "Excel VBA & RPA",
      "Business Intelligence",
    ],
    projectsTitle: "Proyectos seleccionados",
    projectsSubtitle: "Un conjunto enfocado — soluciones por encima de herramientas. Haz clic en una tarjeta para ver el caso completo.",
    cardCta: "Ver caso completo",
    about: {
      title: "Sobre mí",
      p1: "Soy Analista de Datos (gestión de personal) con más de 8 años en el Ejército Brasileño — los últimos 4 dedicados al análisis de datos, la gestión de personal y los informes operativos. Ese entorno moldeó mi forma de trabajar: disciplinado, adaptable y cómodo asumiendo decisiones bajo presión y en entornos totalmente remotos.",
      p2: "Me especializo en convertir conjuntos de datos desordenados e incompletos en evidencia limpia y confiable para la toma de decisiones: reconciliar grandes bases con registros en conflicto, construir y auditar modelos en Excel para RR. HH. y asignación de personal, detectar vacíos y anomalías en bases de datos organizativas, automatizar flujos con VBA y RPA para eliminar errores manuales y traducir los números en resúmenes claros para la dirección. Sigo los números a donde lleven — y avanzo hacia la Ciencia de Datos, un proyecto sólido a la vez.",
      highlightsTitle: "Lo que aporto",
      highlights: [
        { h: "Calidad & reconciliación de datos", t: "Convertir bases grandes e inconsistentes en evidencia confiable para decidir." },
        { h: "Excel & modelos de asignación", t: "Construir y auditar modelos en Excel para RR. HH. y asignación de personal." },
        { h: "Automatización (VBA & RPA)", t: "Automatizar validación e informes para reducir trabajo manual y errores." },
        { h: "Liderazgo & operaciones", t: "Más de 8 años liderando equipos y operaciones en el Ejército Brasileño." },
      ],
      certsTitle: "Certificaciones",
      certs: [
        "Certificado Profesional Google Data Analytics",
        "Cambridge FCE — Inglés (B2)",
      ],
    },
    contact: {
      title: "Trabajemos juntos",
      subtitle: "Abierto a oportunidades freelance internacionales y full-time totalmente remotas en Datos & BI.",
      email: "Correo",
      linkedin: "LinkedIn",
      github: "GitHub",
      upwork: "Upwork",
    },
    modal: {
      problem: "Problema",
      approach: "Enfoque",
      tools: "Herramientas",
      results: "Resultados",
      insights: "Insights clave",
      viewRepo: "Ver repositorio",
      gallery: "Imagen del proyecto",
      close: "Cerrar",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
  },
};
