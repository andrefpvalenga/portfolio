# Como cuidar dos projetos do portfólio

Este guia foi feito para quem não trabalha com programação. Você só precisa copiar uma pasta, trocar textos e imagens e colocar o nome da pasta em uma lista.

O restante do site se organiza sozinho.

## Antes de começar

Dentro da pasta `content`, existem somente duas coisas que você precisa conhecer:

- `projects.json`: é a **lista de projetos**. Ela decide quais projetos aparecem e em qual ordem.
- `projects`: é onde ficam as pastas de cada projeto.

Não é necessário alterar nenhuma outra parte do site.

## O caminho de um projeto até o site

```text
[MODELO-COPIAR]
       │ copiar e renomear
       ▼
[PASTA DO NOVO PROJETO]
       │ colocar imagens + preencher project.json
       ▼
[content/projects.json]
       │ adicionar o nome da pasta e escolher a ordem
       ▼
[LIVE PREVIEW]
       │ conferir PT, EN, ES, imagens e links
       ▼
[GITHUB]
       │ enviar as alterações
       ▼
[GITHUB PAGES]
       └── projeto publicado no portfólio
```

Se o nome da pasta não entrar em `content/projects.json`, o projeto fica guardado, mas não aparece. Se a ficha estiver incompleta, somente esse projeto é ignorado; os demais continuam funcionando.

## Colocar um projeto novo no portfólio

### 1. Copie a pasta-modelo

Entre em `content`, depois em `projects`.

Copie a pasta chamada `MODELO-COPIAR` e cole a cópia no mesmo lugar. Não altere a pasta-modelo original: ela poderá ser usada novamente no futuro.

### 2. Dê um nome simples à cópia

Troque o nome da pasta copiada por um nome curto que identifique o projeto.

Use apenas:

- letras minúsculas, sem acentos;
- números, quando necessário;
- hífen no lugar dos espaços.

Exemplos bons:

- `controle-de-vendas`
- `dashboard-rh`
- `analise-estoque-2026`

Evite nomes como `Meu Projeto`, `análise_vendas` ou `Projeto (novo)`.

### 3. Coloque as imagens dentro da pasta

Apague a imagem chamada `TROQUE-ESTA-IMAGEM.svg` e coloque as imagens reais do projeto no lugar.

Escolha nomes simples para elas, por exemplo:

- `capa.png`
- `vendas.png`
- `clientes.png`

A primeira imagem escrita na ficha será a primeira imagem mostrada no site.

Para obter uma boa apresentação:

- prefira imagens largas, como uma tela de computador;
- use, se possível, o tamanho 1600 × 900;
- evite arquivos muito pesados;
- use imagens `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.avif` ou `.svg`.

### 4. Preencha a ficha do projeto

Abra o arquivo `project.json` que está dentro da nova pasta.

No modelo, tudo que precisa ser substituído contém as palavras `TROQUE AQUI`, `REPLACE HERE` ou `CAMBIE AQUÍ`.

Ao preencher:

- altere somente os textos e os nomes das imagens;
- não mude as palavras que ficam antes dos dois-pontos;
- mantenha aspas, vírgulas, chaves e colchetes no lugar;
- preencha sempre as partes chamadas `português`, `inglês` e `espanhol`;
- não deixe resultados ou aprendizados vazios.

O começo da ficha contém uma explicação curta sobre cada parte. Essas explicações não aparecem no site.

#### Colocar mais imagens

Cada imagem usa um trecho como este:

```text
{
  "nome do arquivo": "capa.png",
  "descrição": {
    "português": "Visão geral do painel de vendas.",
    "inglês": "Sales dashboard overview.",
    "espanhol": "Vista general del panel de ventas."
  }
}
```

Para colocar outra imagem, copie esse trecho inteiro e cole logo abaixo. Separe os trechos com uma vírgula. Depois troque o nome do arquivo e as três descrições.

#### Colocar mais resultados ou aprendizados

Cada frase fica entre aspas. Para adicionar outra, coloque uma vírgula no final da frase anterior e escreva a nova frase na linha seguinte.

Exemplo:

```text
"resultados": [
  "Reduziu o tempo necessário para preparar o relatório.",
  "Permitiu comparar os resultados de cada região.",
  "Facilitou a identificação de valores incorretos."
]
```

#### Projeto sem endereço público

Se o projeto não tiver uma página pública, deixe esta parte vazia:

```text
"endereço público": ""
```

### 5. Coloque a pasta na lista de projetos

Volte para a pasta `content` e abra `projects.json`.

Acrescente o nome exato da nova pasta entre aspas. A lista ficará parecida com esta:

```text
[
  "people-analytics",
  "that-coffee",
  "meu-novo-projeto"
]
```

Use uma vírgula depois de cada nome, menos no último.

Pronto: o site encontrará a pasta e montará o projeto sozinho.

## Mudar a ordem dos projetos

Abra a lista `content/projects.json` e mude os nomes de lugar.

O primeiro nome será o primeiro projeto do site, o segundo nome será o segundo projeto, e assim por diante.

Não é necessário mover as pastas.

## Esconder um projeto sem apagá-lo

Apague somente o nome do projeto da lista `content/projects.json`.

A pasta continuará guardada e poderá voltar ao site quando você colocar o nome novamente na lista.

## Apagar um projeto definitivamente

Primeiro, retire o nome da lista. Depois, apague a pasta correspondente dentro de `content/projects`.

Antes de apagar, confirme que está removendo a pasta correta. Se a alteração já tiver sido enviada ao GitHub, o histórico poderá ajudar a recuperar uma versão anterior.

## Conferir antes de publicar

No Visual Studio Code, a forma mais simples é usar a extensão **Live Server**:

1. Abra a pasta completa do portfólio.
2. Clique com o botão direito em `index.html`.
3. Escolha **Open with Live Server**.
4. Abra a seção de projetos e confira os três idiomas.
5. Passe por todas as imagens e confirme os nomes, textos e endereços.

Depois da conferência, envie as alterações ao GitHub pela mesma rotina que você já utiliza.

## Se o projeto novo não aparecer

O site deixa de fora uma pasta incompleta para que um erro não derrube os outros projetos.

Confira, nesta ordem:

1. O nome da pasta está escrito exatamente igual na lista?
2. O nome usa apenas letras minúsculas, números e hífens?
3. O arquivo continua chamado `project.json`?
4. Todos os nomes escritos em `imagens` existem dentro da pasta?
5. Português, inglês e espanhol estão preenchidos?
6. Todos os textos continuam entre aspas?
7. As vírgulas foram mantidas entre imagens e frases?
8. Nenhum resultado ou aprendizado ficou vazio?

Corrija a ficha, salve e atualize a página. Os outros projetos continuarão aparecendo normalmente durante todo o processo.

## O que nunca precisa ser alterado

Para cuidar dos projetos, não abra nem modifique as pastas `assets/js`, `assets/css` ou o arquivo `index.html`.

Todo o trabalho acontece dentro de `content`.
