/* =============================================================================
   projects.js — THE PROJECTS (this is the ONLY file you edit to add/swap one)
   -----------------------------------------------------------------------------
   Each project is ONE block { ... } inside the PROJECTS list below.
   To add a project: copy a whole block, paste it, edit the texts and images.
   To remove one: delete its whole block. To reorder: move blocks up/down.

   ⚠️ THE THREE GOLDEN RULES (so you never break the site):
     1) Every block ends with a comma:  } ,
     2) Keep the keys (words before ":") EXACTLY as they are.
     3) Write texts between the quotes. If your text has a quote character,
        prefer the curly ones (“ ” ‘ ’) to avoid breaking the code.

   FIELDS OF A BLOCK
     id        : short unique name, no spaces (also used as the image folder)
     cover     : the card image  -> assets/img/<id>/cover.png
     gallery   : list of images shown in the pop-up (modal). Can be 1 or many.
     repo      : GitHub link ("" leaves the button hidden)
     tags      : up to ~3 short labels shown on the card
     i18n.en/pt/es: the case study in each language. Each has:
        title, summary, problem, approach, tools,
        results  -> a list of bullet points
        insights -> a list of bullet points

   See README.md → "Adicionar / trocar um projeto" for the full step by step.
============================================================================= */

const PROJECTS = [

  /* ===== 1. PEOPLE ANALYTICS ============================================== */
  {
    id: "people-analytics",
    cover: "assets/img/people-analytics/cover.png",
    gallery: ["assets/img/people-analytics/cover.png"],
    repo: "",
    tags: ["Power BI", "People Analytics", "Storytelling"],
    i18n: {
      en: {
        title: "People Analytics — HR Turnover & Workforce",
        summary: "A multi-page HR dashboard that explains why people leave — and when it stopped happening.",
        problem: "HR data was scattered across years of records with no clear view of turnover, absenteeism or what was driving departures. Leadership needed to understand workforce stability over time, not just headcount today.",
        approach: "I modeled the historical workforce data and designed a narrative dashboard: headline KPIs (movements, active headcount, absenteeism, turnover) on top, a turnover timeline and a separation-reasons breakdown in the middle, and monthly hire/movement metrics at the bottom — built to be read like a story, not just a wall of charts.",
        tools: "Power BI · Power Query · DAX · Data modeling",
        results: [
          "Exposed a turnover spike reaching 186.8% triggered by a 2011 merger.",
          "Revealed that more than 84% of all departures were voluntary.",
          "Showed turnover stabilizing close to zero after 2016 — proof of a more stable workforce.",
        ],
        insights: [
          "Structural events (mergers) impact retention far more than month-to-month noise.",
          "Separating voluntary vs. involuntary exits changes the whole retention conversation.",
          "A clear timeline lets leaders act on trends instead of reacting to single months.",
        ],
      },
      pt: {
        title: "People Analytics — Turnover de RH & Força de Trabalho",
        summary: "Um dashboard de RH multipágina que explica por que as pessoas saem — e quando isso parou de acontecer.",
        problem: "Os dados de RH estavam espalhados em anos de registros, sem uma visão clara de turnover, absenteísmo ou do que motivava as saídas. A liderança precisava entender a estabilidade da equipe ao longo do tempo, não apenas o headcount atual.",
        approach: "Modelei os dados históricos da força de trabalho e desenhei um dashboard narrativo: KPIs de destaque (movimentações, headcount ativo, absenteísmo, turnover) no topo, uma linha do tempo de turnover e a quebra por motivo de desligamento no meio, e métricas mensais de contratações/movimentações na base — feito para ser lido como uma história, não como uma parede de gráficos.",
        tools: "Power BI · Power Query · DAX · Modelagem de dados",
        results: [
          "Expôs um pico de turnover chegando a 186,8% provocado por uma fusão em 2011.",
          "Revelou que mais de 84% de todas as saídas foram voluntárias.",
          "Mostrou o turnover se estabilizando perto de zero após 2016 — prova de uma equipe mais estável.",
        ],
        insights: [
          "Eventos estruturais (fusões) impactam a retenção muito mais do que o ruído mês a mês.",
          "Separar saídas voluntárias e involuntárias muda toda a conversa sobre retenção.",
          "Uma linha do tempo clara permite agir sobre tendências em vez de reagir a meses isolados.",
        ],
      },
      es: {
        title: "People Analytics — Rotación de RR. HH. y Plantilla",
        summary: "Un dashboard de RR. HH. multipágina que explica por qué se va la gente — y cuándo dejó de pasar.",
        problem: "Los datos de RR. HH. estaban dispersos en años de registros, sin una visión clara de rotación, ausentismo ni de qué impulsaba las salidas. La dirección necesitaba entender la estabilidad del equipo a lo largo del tiempo, no solo la plantilla actual.",
        approach: "Modelé los datos históricos de la plantilla y diseñé un dashboard narrativo: KPIs destacados (movimientos, plantilla activa, ausentismo, rotación) arriba, una línea de tiempo de rotación y el desglose por motivo de salida en el centro, y métricas mensuales de contrataciones/movimientos abajo — pensado para leerse como una historia, no como un muro de gráficos.",
        tools: "Power BI · Power Query · DAX · Modelado de datos",
        results: [
          "Expuso un pico de rotación de 186,8% provocado por una fusión en 2011.",
          "Reveló que más del 84% de todas las salidas fueron voluntarias.",
          "Mostró la rotación estabilizándose cerca de cero después de 2016 — prueba de un equipo más estable.",
        ],
        insights: [
          "Los eventos estructurales (fusiones) impactan la retención mucho más que el ruido mes a mes.",
          "Separar salidas voluntarias e involuntarias cambia toda la conversación sobre retención.",
          "Una línea de tiempo clara permite actuar sobre tendencias en lugar de reaccionar a meses sueltos.",
        ],
      },
    },
  },

  /* ===== 2. THAT COFFEE =================================================== */
  {
    id: "that-coffee",
    cover: "assets/img/that-coffee/cover.png",
    gallery: ["assets/img/that-coffee/cover.png"],
    repo: "",
    tags: ["Advanced Excel", "Excel VBA", "Inventory & Finance"],
    i18n: {
      en: {
        title: "That Coffee — Inventory & Financial Control",
        summary: "A complete Excel control system for a food & beverage business — stock, pricing and profit in one place.",
        problem: "A small food & beverage operation had no reliable way to track stock, know which products made money, or get warned before running out. Everything lived in disconnected spreadsheets and manual checks.",
        approach: "I built an end-to-end Excel system: a product catalog with cost, price and minimum stock; automated stock balance and value calculations; conditional alerts for zero-stock and reorder thresholds; and a profit/margin analysis layer — turning a pile of spreadsheets into a single operational tool.",
        tools: "Advanced Excel · VBA · Conditional logic · Financial modeling",
        results: [
          "Identified beer products as the highest profit contributor ($6,660).",
          "Automated alerts that flag zero-stock and reorder-threshold items.",
          "Tracked an overall profit margin of 128.46% across the analyzed period.",
        ],
        insights: [
          "A few automated rules replace hours of manual stock checking.",
          "Margin analysis reveals that volume and profit are not the same story.",
          "Operational tools win when they fit how the business already works.",
        ],
      },
      pt: {
        title: "That Coffee — Controle de Estoque & Financeiro",
        summary: "Um sistema completo em Excel para um negócio de alimentos & bebidas — estoque, precificação e lucro num só lugar.",
        problem: "Uma pequena operação de alimentos & bebidas não tinha forma confiável de controlar estoque, saber quais produtos davam lucro ou ser avisada antes de faltar produto. Tudo vivia em planilhas desconectadas e conferências manuais.",
        approach: "Construí um sistema ponta a ponta em Excel: um catálogo de produtos com custo, preço e estoque mínimo; cálculos automáticos de saldo e valor de estoque; alertas condicionais para estoque zerado e ponto de reposição; e uma camada de análise de lucro/margem — transformando um monte de planilhas em uma única ferramenta operacional.",
        tools: "Excel Avançado · VBA · Lógica condicional · Modelagem financeira",
        results: [
          "Identificou os produtos de cerveja como a maior contribuição de lucro ($6.660).",
          "Automatizou alertas que sinalizam itens sem estoque e no ponto de reposição.",
          "Acompanhou uma margem de lucro geral de 128,46% no período analisado.",
        ],
        insights: [
          "Algumas regras automáticas substituem horas de conferência manual de estoque.",
          "A análise de margem mostra que volume e lucro nem sempre contam a mesma história.",
          "Ferramentas operacionais vencem quando se encaixam em como o negócio já funciona.",
        ],
      },
      es: {
        title: "That Coffee — Control de Inventario y Finanzas",
        summary: "Un sistema completo en Excel para un negocio de alimentos y bebidas — stock, precios y ganancia en un solo lugar.",
        problem: "Una pequeña operación de alimentos y bebidas no tenía forma confiable de controlar el stock, saber qué productos daban ganancia o recibir avisos antes de quedarse sin producto. Todo vivía en hojas de cálculo desconectadas y revisiones manuales.",
        approach: "Construí un sistema integral en Excel: un catálogo de productos con costo, precio y stock mínimo; cálculos automáticos de saldo y valor de inventario; alertas condicionales para stock en cero y punto de reposición; y una capa de análisis de ganancia/margen — convirtiendo un montón de hojas en una única herramienta operativa.",
        tools: "Excel Avanzado · VBA · Lógica condicional · Modelado financiero",
        results: [
          "Identificó los productos de cerveza como la mayor contribución de ganancia ($6.660).",
          "Automatizó alertas que marcan artículos sin stock y en punto de reposición.",
          "Siguió un margen de ganancia general del 128,46% durante el período analizado.",
        ],
        insights: [
          "Unas pocas reglas automáticas reemplazan horas de revisión manual de stock.",
          "El análisis de margen muestra que volumen y ganancia no siempre cuentan la misma historia.",
          "Las herramientas operativas ganan cuando encajan en cómo ya funciona el negocio.",
        ],
      },
    },
  },

  /* ===== 3. BUSCANTE ===================================================== */
  {
    id: "buscante",
    cover: "assets/img/buscante/cover.png",
    gallery: ["assets/img/buscante/cover.png"],
    repo: "",
    tags: ["Power BI", "Customer Analytics", "Segmentation"],
    i18n: {
      en: {
        title: "Buscante — E-commerce & Customer Analytics",
        summary: "A Power BI dashboard that reads an online bookstore's sales and reveals who its customers really are.",
        problem: "An e-commerce platform had sales and customer data but little understanding of seasonal access patterns, who its buyers were, or how different contact channels behaved.",
        approach: "I built a multi-page Power BI dashboard covering sales performance, customer segmentation and regional behavior, with interactive filters by city, and views connecting access trends to customer profiles and product titles.",
        tools: "Power BI · Power Query · DAX · Segmentation",
        results: [
          "Showed monthly access average rising from 83 to 95 across the year.",
          "Identified developers as the most frequent customer profession.",
          "Found WhatsApp users were far younger than phone-call users (21.8 vs 53.3 avg age).",
        ],
        insights: [
          "Channel choice is a strong proxy for customer age — useful for targeting.",
          "Knowing the dominant profession sharpens product and content decisions.",
          "Seasonal access trends help plan campaigns and stock ahead of demand.",
        ],
      },
      pt: {
        title: "Buscante — E-commerce & Analytics de Clientes",
        summary: "Um dashboard em Power BI que lê as vendas de uma livraria online e revela quem são, de fato, seus clientes.",
        problem: "Uma plataforma de e-commerce tinha dados de vendas e de clientes, mas pouco entendimento sobre padrões sazonais de acesso, quem eram seus compradores ou como os diferentes canais de contato se comportavam.",
        approach: "Construí um dashboard multipágina em Power BI cobrindo desempenho de vendas, segmentação de clientes e comportamento regional, com filtros interativos por cidade e visões conectando tendências de acesso aos perfis de clientes e aos títulos de produtos.",
        tools: "Power BI · Power Query · DAX · Segmentação",
        results: [
          "Mostrou a média mensal de acessos subindo de 83 para 95 ao longo do ano.",
          "Identificou desenvolvedores como a profissão mais frequente entre os clientes.",
          "Descobriu que usuários de WhatsApp eram bem mais jovens que os de chamada telefônica (21,8 vs 53,3 anos em média).",
        ],
        insights: [
          "A escolha do canal é um forte indicador da idade do cliente — útil para segmentação.",
          "Conhecer a profissão dominante refina decisões de produto e de conteúdo.",
          "Tendências sazonais de acesso ajudam a planejar campanhas e estoque antes da demanda.",
        ],
      },
      es: {
        title: "Buscante — E-commerce y Analítica de Clientes",
        summary: "Un dashboard en Power BI que lee las ventas de una librería online y revela quiénes son realmente sus clientes.",
        problem: "Una plataforma de e-commerce tenía datos de ventas y de clientes, pero poco entendimiento sobre patrones estacionales de acceso, quiénes eran sus compradores o cómo se comportaban los distintos canales de contacto.",
        approach: "Construí un dashboard multipágina en Power BI que cubre el rendimiento de ventas, la segmentación de clientes y el comportamiento regional, con filtros interactivos por ciudad y vistas que conectan las tendencias de acceso con los perfiles de clientes y los títulos de productos.",
        tools: "Power BI · Power Query · DAX · Segmentación",
        results: [
          "Mostró el promedio mensual de accesos subiendo de 83 a 95 a lo largo del año.",
          "Identificó a los desarrolladores como la profesión más frecuente entre los clientes.",
          "Descubrió que los usuarios de WhatsApp eran mucho más jóvenes que los de llamada telefónica (21,8 vs 53,3 de edad media).",
        ],
        insights: [
          "La elección del canal es un fuerte indicador de la edad del cliente — útil para segmentar.",
          "Conocer la profesión dominante afina las decisiones de producto y contenido.",
          "Las tendencias estacionales de acceso ayudan a planificar campañas y stock antes de la demanda.",
        ],
      },
    },
  },

  /* ===== 4. SQL / CAP - PR =============================================== */
  {
    id: "sql-cap-cooperativa",
    cover: "assets/img/cap/cover.png",
    gallery: [
      "assets/img/cap/cover.png",
      "assets/img/cap/dashboard.png",
      "assets/img/cap/clusters.png",
    ],
    repo: "https://github.com/andrefpvalenga/sql-cap-cooperativa",
    tags: ["SQL", "Power BI", "MySQL", "Agribusiness"],
    i18n: {
      en: {
        title: "Grain Cooperative — SQL Analytics",
        summary: "End-to-end SQL project for a fictional grain cooperative in Paraná: cleaning legacy data, benchmarking productivity, and segmenting producers for field visits.",
        problem: "Which producers and regions are performing below expectations — and does this have any relationship with their commercial behavior?",
        approach: "I built four relational tables simulating a legacy system export — complete with intentional data quality issues. From there I ran a full four-phase analysis: data cleaning, productivity benchmarking against mesoregion averages, commercial behavior analysis, and a composite performance score to segment producers into action clusters.",
        tools: "MySQL · Power BI · CTEs · Window Functions · LEFT JOINs",
        results: [
          "Identified 6 producers requiring immediate field visits based on a composite score across productivity, cost per bag, and result per hectare.",
          "Found no correlation between commercial behavior and underperformance — structural factors (soil type and farm size) were the dominant drivers.",
          "Built a mesoregion benchmarking model using nested CTEs, comparing each producer against their regional average across three metrics.",
        ],
        insights: [
          "Concluding that there is no correlation is as valid an analytical finding as finding one.",
          "Soil type and operational scale explained more variance than any commercial decision.",
          "A composite scoring model makes actionable recommendations clearer than raw metric tables.",
        ],
      },
      pt: {
        title: "Cooperativa de Grãos — Análise em SQL",
        summary: "Projeto SQL completo para uma cooperativa fictícia de grãos no Paraná: limpeza de dados legados, benchmarking de produtividade e segmentação de produtores para visitas técnicas.",
        problem: "Quais produtores e regiões estão performando abaixo do esperado — e isso tem alguma relação com o comportamento de vendas deles?",
        approach: "Construí quatro tabelas relacionais simulando a exportação de um sistema legado — com inconsistências intencionais nos dados. A partir disso realizei uma análise em quatro fases: limpeza dos dados, benchmarking de produtividade contra as médias por mesorregião, análise de comportamento de comercialização e um score composto para segmentar os produtores em clusters de ação.",
        tools: "MySQL · Power BI · CTEs · Window Functions · LEFT JOINs",
        results: [
          "Identificou 6 produtores com necessidade de visita técnica imediata com base em um score composto de produtividade, custo por saca e resultado por hectare.",
          "Não encontrou correlação entre comportamento de venda e baixo desempenho — fatores estruturais (tipo de solo e tamanho da área) foram os determinantes principais.",
          "Construiu um modelo de benchmarking por mesorregião com CTEs aninhadas, comparando cada produtor à média regional em três métricas.",
        ],
        insights: [
          "Concluir que não há correlação é um achado analítico tão válido quanto encontrar uma.",
          "Tipo de solo e escala operacional explicaram mais variância do que qualquer decisão comercial.",
          "Um modelo de score composto torna as recomendações mais acionáveis do que tabelas de métricas brutas.",
        ],
      },
      es: {
        title: "Cooperativa de Granos — Análisis en SQL",
        summary: "Proyecto SQL completo para una cooperativa ficticia de granos en Paraná: limpieza de datos heredados, benchmarking de productividad y segmentación de productores para visitas técnicas.",
        problem: "¿Qué productores y regiones están rindiendo por debajo de lo esperado — y tiene esto alguna relación con su comportamiento de ventas?",
        approach: "Construí cuatro tablas relacionales simulando la exportación de un sistema heredado — con inconsistencias intencionales en los datos. A partir de ahí realicé un análisis en cuatro fases: limpieza de datos, benchmarking de productividad contra los promedios por mesorregión, análisis de comportamiento comercial y un score compuesto para segmentar a los productores en clústeres de acción.",
        tools: "MySQL · Power BI · CTEs · Window Functions · LEFT JOINs",
        results: [
          "Identificó 6 productores que requieren visita técnica inmediata basándose en un score compuesto de productividad, costo por saco y resultado por hectárea.",
          "No encontró correlación entre el comportamiento de ventas y el bajo rendimiento — los factores estructurales (tipo de suelo y tamaño del área) fueron los determinantes principales.",
          "Construyó un modelo de benchmarking por mesorregión con CTEs anidadas, comparando cada productor con el promedio regional en tres métricas.",
        ],
        insights: [
          "Concluir que no hay correlación es un hallazgo analítico tan válido como encontrar una.",
          "El tipo de suelo y la escala operativa explicaron más varianza que cualquier decisión comercial.",
          "Un modelo de score compuesto hace que las recomendaciones sean más accionables que las tablas de métricas en bruto.",
        ],
      },
    },
  },


  /* ===== 5. CROP YIELD PREDICTION (ML) =================================== */
  {
    id: "crop-yield",
    cover: "assets/img/crop-yield/cover.png",
    gallery: ["assets/img/crop-yield/cover.png"],
    repo: "https://github.com/andrefpvalenga/crop-yield-project",
    tags: ["Python", "scikit-learn", "Machine Learning"],
    i18n: {
      en: {
        title: "Crop Yield Prediction — Machine Learning",
        summary: "An end-to-end ML project predicting agricultural yield — my step toward Data Science.",
        problem: "Crop yield depends on a tangle of climate and agricultural factors. The goal was a baseline model that could support real agricultural decisions (planning, procurement, risk) from environmental data.",
        approach: "I ran a full Data Science workflow on FAO / World Bank-style data: EDA, preprocessing, and training three regression models — Decision Tree, Random Forest and Gradient Boosting — then compared them with cross-validation and interpreted feature importance.",
        tools: "Python · pandas · scikit-learn · Jupyter",
        results: [
          "Random Forest won the baseline — highest R², lowest RMSE and MSE.",
          "Cross-validation confirmed Random Forest's consistency across folds.",
          "Feature importance showed crop type dominates the prediction.",
        ],
        insights: [
          "Tree ensembles handle the non-linear, outlier-heavy nature of this data best.",
          "Categorical patterns (crop type) outweigh raw climate variables here.",
          "A solid baseline is the launchpad for tuning and advanced models (XGBoost, etc.).",
        ],
      },
      pt: {
        title: "Previsão de Safra — Machine Learning",
        summary: "Um projeto de ML ponta a ponta prevendo produtividade agrícola — meu passo rumo à Ciência de Dados.",
        problem: "A produtividade de uma safra depende de um emaranhado de fatores climáticos e agrícolas. O objetivo era um modelo-base capaz de apoiar decisões agrícolas reais (planejamento, compras, risco) a partir de dados ambientais.",
        approach: "Conduzi um fluxo completo de Ciência de Dados sobre dados no estilo FAO / Banco Mundial: EDA, pré-processamento e treino de três modelos de regressão — Árvore de Decisão, Random Forest e Gradient Boosting — comparando-os com validação cruzada e interpretando a importância das variáveis.",
        tools: "Python · pandas · scikit-learn · Jupyter",
        results: [
          "Random Forest venceu o baseline — maior R², menor RMSE e MSE.",
          "A validação cruzada confirmou a consistência do Random Forest entre os folds.",
          "A importância das variáveis mostrou que o tipo de cultura domina a previsão.",
        ],
        insights: [
          "Ensembles de árvores lidam melhor com a natureza não linear e cheia de outliers desses dados.",
          "Padrões categóricos (tipo de cultura) pesam mais que variáveis climáticas brutas aqui.",
          "Um baseline sólido é a base para tuning e modelos avançados (XGBoost, etc.).",
        ],
      },
      es: {
        title: "Predicción de Cosecha — Machine Learning",
        summary: "Un proyecto de ML integral que predice el rendimiento agrícola — mi paso hacia la Ciencia de Datos.",
        problem: "El rendimiento de un cultivo depende de una maraña de factores climáticos y agrícolas. El objetivo era un modelo base capaz de apoyar decisiones agrícolas reales (planificación, compras, riesgo) a partir de datos ambientales.",
        approach: "Realicé un flujo completo de Ciencia de Datos sobre datos estilo FAO / Banco Mundial: EDA, preprocesamiento y entrenamiento de tres modelos de regresión — Árbol de Decisión, Random Forest y Gradient Boosting — comparándolos con validación cruzada e interpretando la importancia de las variables.",
        tools: "Python · pandas · scikit-learn · Jupyter",
        results: [
          "Random Forest ganó el baseline — mayor R², menor RMSE y MSE.",
          "La validación cruzada confirmó la consistencia de Random Forest entre folds.",
          "La importancia de variables mostró que el tipo de cultivo domina la predicción.",
        ],
        insights: [
          "Los ensembles de árboles manejan mejor la naturaleza no lineal y con outliers de estos datos.",
          "Los patrones categóricos (tipo de cultivo) pesan más que las variables climáticas crudas aquí.",
          "Un baseline sólido es la base para el tuning y modelos avanzados (XGBoost, etc.).",
        ],
      },
    },
  },

];
