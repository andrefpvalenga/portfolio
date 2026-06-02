# Portfólio — André Valenga (Data Analyst / BI)

Site estático, **trilíngue (EN · PT · ES)**, feito para rodar no **GitHub Pages**.
Foi pensado para você **adicionar e trocar projetos sozinho**, sem saber programar e
**sem quebrar o site** (o problema antigo, em que “só traduzia da bio pra cima”, não
acontece mais — explico o porquê no final).

> 💡 **Regra mental:** para mexer nos projetos você edita **um único arquivo**:
> `assets/js/projects.js`. Para mexer nos textos fixos (menu, “Sobre”, etc.) você
> edita `assets/js/i18n.js`. Você quase nunca precisa abrir o `index.html` nem o CSS.

---

## 📁 Estrutura dos arquivos

```
site/
├── index.html                 # a página (você raramente mexe aqui)
├── README.md                  # este guia
└── assets/
    ├── css/styles.css         # aparência/cores (você raramente mexe aqui)
    ├── js/
    │   ├── i18n.js            # textos fixos da interface (EN/PT/ES)
    │   ├── projects.js        # >>> SEUS PROJETOS — edite aqui <<<
    │   └── main.js            # o “motor” do site (NÃO precisa editar)
    └── img/
        ├── profile.jpg                 # sua foto
        ├── buscante/cover.png
        ├── people-analytics/cover.png
        ├── that-coffee/cover.png
        ├── sql-metabase/cover.png + chart-lines.png
        └── crop-yield/cover.svg        # placeholder (troque por um gráfico real)
```

---

## 👀 Ver o site no seu computador

**Modo fácil (sem instalar nada):** dê **duplo clique no `index.html`**. Ele abre no
navegador e funciona 100% (troca de idioma, cards, pop-ups). É assim mesmo, não precisa
de servidor.

> Se algum dia você instalar o Python, dá para rodar um servidor local com
> `python -m http.server` dentro da pasta `site/` e abrir `http://localhost:8000`.
> Mas para conferir o resultado, o duplo clique já basta.

---

## 🚀 Publicar no GitHub Pages (passo a passo)

1. Crie um repositório no GitHub chamado **`portfolio`** (esse nome faz a URL ficar
   `https://andrefpvalenga.github.io/portfolio`, que é a que está no seu LinkedIn).
2. Suba **o conteúdo da pasta `site/`** para a raiz do repositório
   (o `index.html` precisa ficar na raiz, não dentro de uma subpasta).
3. No GitHub, vá em **Settings → Pages**.
4. Em **Source**, escolha a branch **`main`** e a pasta **`/ (root)`**. Salve.
5. Aguarde ~1 minuto. O endereço `https://andrefpvalenga.github.io/portfolio` fica no ar.

Toda vez que você atualizar os arquivos no repositório, o site atualiza sozinho.

---

## ➕ Adicionar um projeto novo (o passo a passo mais importante)

Você vai fazer **3 coisas**: (A) criar a pasta das imagens, (B) copiar um bloco em
`projects.js` e preencher, (C) conferir.

### A) Imagens

1. Dentro de `assets/img/`, crie uma pasta com um **nome curto, sem espaços e sem
   acentos** para o projeto. Ex.: `assets/img/vendas-loja/`.
2. Coloque ali as imagens. Sugestão de nomes: `cover.png` (a “capa” do card) e, se
   quiser mais imagens na galeria do pop-up, `1.png`, `2.png`, etc.

### B) O bloco em `assets/js/projects.js`

1. Abra `assets/js/projects.js` no Bloco de Notas (ou VS Code).
2. **Copie um bloco inteiro** de um projeto existente — tudo entre `{` e `}` —
   ou use o **modelo pronto** abaixo.
3. **Cole logo antes** da linha final `];` (ou seja, no fim da lista, depois do
   último projeto).
4. Edite os textos. Traduza nos três idiomas (`en`, `pt`, `es`).

**Modelo pronto para copiar e colar** (troque os textos e o `id`):

```js
  {
    id: "vendas-loja",                         // = o nome da pasta em assets/img/
    cover: "assets/img/vendas-loja/cover.png",
    gallery: [
      "assets/img/vendas-loja/cover.png",
      "assets/img/vendas-loja/1.png"           // adicione/retire linhas à vontade
    ],
    repo: "",                                  // link do GitHub; "" esconde o botão
    tags: ["Power BI", "Vendas", "ETL"],       // até ~3 etiquetas
    i18n: {
      en: {
        title: "Project title in English",
        summary: "One sentence shown on the card.",
        problem: "What problem did this solve?",
        approach: "What did you do, step by step?",
        tools: "Power BI · SQL · Excel",
        results: [
          "Result 1 (with a number if possible).",
          "Result 2.",
          "Result 3."
        ],
        insights: [
          "Insight 1.",
          "Insight 2."
        ]
      },
      pt: {
        title: "Título do projeto em português",
        summary: "Uma frase que aparece no card.",
        problem: "Qual problema isso resolveu?",
        approach: "O que você fez, passo a passo?",
        tools: "Power BI · SQL · Excel",
        results: [
          "Resultado 1 (com número, se possível).",
          "Resultado 2.",
          "Resultado 3."
        ],
        insights: [
          "Insight 1.",
          "Insight 2."
        ]
      },
      es: {
        title: "Título del proyecto en español",
        summary: "Una frase que aparece en la tarjeta.",
        problem: "¿Qué problema resolvió?",
        approach: "¿Qué hiciste, paso a paso?",
        tools: "Power BI · SQL · Excel",
        results: [
          "Resultado 1 (con número, si es posible).",
          "Resultado 2.",
          "Resultado 3."
        ],
        insights: [
          "Insight 1.",
          "Insight 2."
        ]
      }
    }
  },
```

### C) Conferir

Dê duplo clique no `index.html`. O novo card deve aparecer e abrir o pop-up ao clicar.
Se algo sumir, veja **“Erros comuns”** mais abaixo.

---

## 🔄 Trocar ou remover um projeto

- **Trocar:** edite os textos e as imagens daquele bloco. Para trocar a capa, substitua
  o arquivo dentro de `assets/img/<id>/` mantendo o mesmo nome (ex.: `cover.png`).
- **Remover:** apague o bloco inteiro, de `{` até `},` (incluindo a vírgula final).
- **Reordenar:** recorte um bloco inteiro e cole em outra posição da lista. A ordem na
  lista é a ordem que aparece no site.

> A ordem de prioridade sugerida (pelas suas diretrizes): **People Analytics → That
> Coffee → Buscante → SQL/Metabase → Crop Yield**. O Global Nexus foi deixado de fora
> de propósito (era o primeiro candidato a sair).

---

## ✏️ Editar os textos fixos da interface

Tudo que **não** é projeto (menu, frase do topo, “Sobre mim”, contato, rodapé) está em
`assets/js/i18n.js`, separado em `en`, `pt` e `es`. Edite o texto entre as aspas e
**mantenha a mesma palavra-chave** (o que vem antes dos `:`) nos três idiomas.

Os botões de contato (e-mail, LinkedIn, GitHub, Upwork) e os links ficam no
`index.html`, na seção `<!-- CONTACT -->`, caso você precise atualizar algum endereço.

---

## ⚠️ Erros comuns (e como NÃO quebrar o site)

A maioria dos problemas em arquivos `.js` é um destes:

1. **Esqueceu a vírgula entre blocos.** Cada projeto termina com `},` e cada item de
   lista termina com `,`. Regra: depois de `}` ou de um item, vem **vírgula** — exceto
   no último de tudo.
2. **Apagou uma chave `{` ou `[` sem apagar o par `}` ou `]`.** Eles andam sempre em
   par. Se copiar um bloco inteiro (do jeito que ensinei), isso não acontece.
3. **Usou aspas dentro do texto.** Se o seu texto tiver aspas, use as “curvas”
   (`“ ” ‘ ’`) em vez das retas (`" "`), senão o código entende que o texto acabou.

### Como conferir antes de publicar
1. Dê duplo clique no `index.html`.
2. Aperte **F12** (abre as Ferramentas do Desenvolvedor) e clique na aba **Console**.
3. Se aparecer texto **em vermelho**, há um erro — geralmente ele diz a **linha** do
   `projects.js`. Vá até essa linha e procure uma vírgula faltando ou uma aspa sobrando.
4. Sem vermelho = pode publicar. 👍

### Por que este site não quebra como o antigo
No portfólio antigo, a tradução chamava cada elemento **um por um**; quando um nome não
batia, o JavaScript travava e **parava de traduzir do ponto em diante** (era por isso que
“só traduzia da bio pra cima”). Aqui a tradução roda **em laço** sobre todos os textos: se
um item tiver problema, **só aquele item** fica vazio — o resto do site continua normal.

---

## ✅ Pontos para revisar

A seção “Sobre”, os números do topo e as **certificações** agora vêm do seu **LinkedIn
real** (Analista de Dados de Pessoal no Exército, 8+ anos / 4 em dados, processo de
60→2 dias, Google Data Analytics, Cambridge FCE B2). Se quiser ajustar o texto, está
tudo em `assets/js/i18n.js` (`hero.bio`, `stats`, `about.p1/p2`, `about.highlights`,
`about.certs`). Confira também os **links de contato** no `index.html`
(e-mail `andrevalengadata@gmail.com`, LinkedIn, GitHub `andrefpvalenga`, Upwork).

E sobre **imagens** que ficaram pendentes:

- [ ] **Crop Yield**: a capa é um **placeholder** (`crop-yield/cover.svg`). Exporte um
      gráfico do seu notebook `CropYieldPrediction.ipynb` (ex.: a “feature importance”),
      salve como `assets/img/crop-yield/cover.png` e troque a linha `cover:` e a
      `gallery:` desse projeto no `projects.js`.
- [ ] **SQL/Metabase**: já usei 2 imagens reais da sua apresentação. Se quiser mais,
      é só adicionar na `gallery`.
- [ ] As demais capas (Buscante, People Analytics, That Coffee) foram reaproveitadas do
      seu portfólio antigo. Se tiver prints melhores na pasta `Imagens/`, troque os
      arquivos mantendo o mesmo nome.

---

## 🎨 (Opcional) Mudar as cores

No topo de `assets/css/styles.css` existe um bloco `:root { ... }` com as cores
(`--accent` é o verde principal). Troque os códigos de cor ali para reskinnar o site
inteiro de uma vez.
