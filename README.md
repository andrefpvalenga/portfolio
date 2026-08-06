# Portfólio de André Valenga

## Onde os projetos são atualizados

Todo projeto fica dentro de uma pasta própria em `content/projects`.

Para adicionar um trabalho novo, você fará somente isto:

1. Copiar a pasta `MODELO-COPIAR`.
2. Dar um nome simples à cópia.
3. Colocar as imagens do projeto dentro dela.
4. Preencher o arquivo `project.json` seguindo as orientações do próprio modelo.
5. Colocar o nome da pasta na lista `content/projects.json`.

O site cuida sozinho do seletor, das imagens, dos três idiomas e da ordem dos projetos.

## Fluxo visual de publicação

```text
┌──────────────────────────┐
│ 1. COPIAR O MODELO       │
│ content/projects/        │
│ MODELO-COPIAR            │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ 2. CRIAR A PASTA         │
│ Ex.: dashboard-vendas    │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ 3. PREENCHER O PROJETO   │
│ • adicionar imagens      │
│ • editar project.json    │
│ • completar PT / EN / ES │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ 4. ADICIONAR AO ÍNDICE   │
│ content/projects.json    │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ 5. CONFERIR NO PREVIEW   │
│ imagens, textos e links  │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ 6. ENVIAR AO GITHUB      │
│ GitHub Pages publica     │
│ automaticamente          │
└──────────────────────────┘
```

Em resumo: **pasta do projeto → ficha e imagens → lista de projetos → preview → GitHub Pages**.

## Guia completo

Abra [content/LEIA-ME.md](content/LEIA-ME.md) para acompanhar o passo a passo detalhado, com exemplos e uma lista de conferência.

## Segurança

- Um projeto incompleto não derruba o portfólio: somente aquela pasta deixa de aparecer.
- Projetos fora da lista ficam guardados, mas escondidos.
- Todas as alterações continuam registradas no histórico do GitHub.
- Não existe painel ou página capaz de alterar o site publicado.

Para cuidar dos projetos, não é necessário modificar nenhuma parte fora da pasta `content`.
