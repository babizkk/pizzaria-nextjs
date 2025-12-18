<h1 align="center"> ᯓᡣ𐭩.ᐟ ⊹ 🍕 Pizza Landing Page </h1>
<p align="center">  O projeto consiste na criação de uma landing page para uma pizzaria, desenvolvida com Typescript, React, Tailwind e Next.js para a disciplina de Sistemas para Internet II. </p>

## ᯓᡣ𐭩.ᐟ ⊹ Execução

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### ᯓᡣ𐭩.ᐟ ⊹ Instalação e Execução

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd pizzaria-nextjs

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse no navegador
http://localhost:3000
```

### ᯓᡣ𐭩.ᐟ ⊹ Tecnologias Utilizadas
- Next.js 14.2.18
- React 18.3.1
- TypeScript 5
- Tailwind CSS 3.3.0

---

# ᯓᡣ𐭩.ᐟ ⊹ Relatório Técnico

## Descrição Geral do Projeto

Este projeto consiste em uma aplicação web de pizzaria desenvolvida com Next.js, utilizando TypeScript, React e Tailwind CSS. A aplicação apresenta um catálogo de pizzas com funcionalidades de navegação, visualização de detalhes e funcionalidade de busca.

O projeto foi migrado para Next.js com o objetivo de aproveitar os recursos modernos de renderização do framework, incluindo Server Components, Static Site Generation (SSG), Incremental Static Regeneration (ISR) e Client-Side Rendering (CSR). A migração permitiu otimizar o desempenho da aplicação através da escolha estratégica do tipo de renderização mais adequado para cada página, resultando em melhor performance, SEO e experiência do usuário.

## Lista de Páginas e Tipos de Renderização

### 1. Página Inicial (/)

**Tipo de renderização:** Static Site Generation (SSG) com Client Components

**Justificativa:** A página inicial é um Client Component ("use client") que é pré-renderizado estaticamente durante o build. Embora utilize interatividade no cliente (animações de carrinho, manipulação do DOM), o HTML inicial é gerado estaticamente, garantindo carregamento rápido e SEO otimizado. A página exibe 3 pizzas em destaque com link para o menu completo, utilizando next/image com priority para otimização de imagens. A interatividade é hidratada no cliente após o carregamento inicial.

### 2. Menu Completo (/menu)

**Tipo de renderização:** Incremental Static Regeneration (ISR)

**Justificativa:** A página do menu é um Server Component com revalidate = 3600 (1 hora), implementando ISR. Esta abordagem foi escolhida porque o catálogo de pizzas pode ser atualizado periodicamente (novos itens, preços, disponibilidade), mas não muda com frequência suficiente para exigir renderização sob demanda a cada requisição. O ISR proporciona o melhor dos dois mundos: páginas estáticas pré-renderizadas para performance máxima, com capacidade de revalidação automática em intervalos definidos. O componente delega a interatividade do cliente para MenuClient, mantendo o componente principal leve no servidor.

### 3. Detalhes da Pizza (/pizza/[id])

**Tipo de renderização:** Static Site Generation (SSG)

**Justificativa:** Esta página utiliza generateStaticParams() para pré-renderizar todas as páginas de detalhes de pizzas no momento do build. SSG foi escolhido porque os dados das pizzas são relativamente estáticos e o conteúdo não muda frequentemente. Pré-gerar todas as páginas resulta em tempos de carregamento instantâneos, melhor SEO (conteúdo totalmente renderizado para crawlers) e redução de carga no servidor. A página ainda inclui um Client Component (AddToCartButton) para interatividade, demonstrando a composição híbrida Server/Client do Next.js.

### 4. Página 404 (/not-found)

**Tipo de renderização:** Static Site Generation (SSG)

**Justificativa:** A página de erro 404 é um Server Component estático, pré-renderizado durante o build. Como o conteúdo é completamente estático (não depende de dados dinâmicos ou interação do usuário), SSG é ideal para garantir carregamento instantâneo mesmo em casos de erro, mantendo uma boa experiência do usuário.

## Comparação Lighthouse

### Página Inicial (/)

| Métrica | Antes (CSR puro) | Depois (Next.js) | Diferença |
|---------|------------------|------------------|-----------|
| Desempenho | 75 | 96 | +21 |
| Acessibilidade | 84 | 96 | +12 |
| Práticas recomendadas | 100 | 100 | 0 |
| SEO | 91 | 100 | +9 |
| First Contentful Paint | 0,7 s | 1,0 s | +0,3 s |
| Largest Contentful Paint | 8,1 s | 1,0 s | -7,1 s |
| Total Blocking Time | 0 ms | 0 ms | 0 |
| Cumulative Layout Shift | 0 | 0.05 | +0.05 |
| Speed Index | 0,7 s | 1,3 s | +0,6 s |

**Análise:**

- A migração para Next.js resultou em ganhos significativos de performance (+21 pontos), com destaque para a melhoria drástica no Largest Contentful Paint (LCP), que caiu de 8.1s para 1.0s (-7.1s), representando uma redução de 87% no tempo de carregamento do maior elemento visível.
- O SEO alcançou pontuação perfeita (100), subindo 9 pontos, devido à renderização adequada do HTML, meta tags otimizadas e estrutura semântica correta.
- A Acessibilidade teve melhoria de +12 pontos, atingindo 96, graças à melhor estrutura semântica e uso correto de elementos HTML.
- Pequeno trade-off observado: o FCP aumentou ligeiramente (+0.3s) e o Speed Index também (+0.6s), o que é esperado ao adicionar otimizações de imagem e lazy loading. Porém, o ganho no LCP compensa amplamente essas pequenas variações iniciais.
- O CLS teve leve aumento de 0 para 0.05, ainda dentro dos limites aceitáveis (< 0.1), possivelmente devido a ajustes de layout durante a hidratação de componentes cliente.

### Página de Menu (/menu)

| Métrica | Antes (CSR puro) | Depois (Next.js) | Diferença |
|---------|------------------|------------------|-----------|
| Desempenho | - | 100 | - |
| Acessibilidade | - | 94 | - |
| Práticas recomendadas | - | 100 | - |
| SEO | - | 100 | - |
| First Contentful Paint | - | 0,7 s | - |
| Largest Contentful Paint | - | 0,7 s | - |
| Total Blocking Time | - | 0 ms | - |
| Cumulative Layout Shift | - | 0 | - |
| Speed Index | - | 0,7 s | - |

**Análise:**

- Esta página não existia na versão anterior do projeto (CSR puro), portanto não há dados comparativos "Antes". A página foi criada durante a migração para Next.js.
- A implementação com ISR (Incremental Static Regeneration) resultou em performance excepcional: pontuação 100 no Desempenho, demonstrando a eficácia da pré-renderização com revalidação periódica (1 hora).
- O SEO e Práticas recomendadas alcançaram pontuação perfeita (100), ideal para páginas de catálogo que precisam ser indexadas por mecanismos de busca.
- Métricas de carregamento extremamente rápidas: FCP, LCP e Speed Index todos em 0.7s, indicando que o conteúdo é entregue quase instantaneamente.
- TBT de 0ms e CLS de 0 indicam que a página não causa bloqueios ou deslocamentos de layout, proporcionando experiência fluida ao usuário.
- A estratégia ISR é ideal para conteúdo que muda ocasionalmente, mantendo os benefícios de páginas estáticas com capacidade de atualização automática.

### Página de Detalhes da Pizza (/pizza/[id])

| Métrica | Antes (CSR puro) | Depois (Next.js) | Diferença |
|---------|------------------|------------------|-----------|
| Desempenho | - | 99 | - |
| Acessibilidade | - | 89 | - |
| Práticas recomendadas | - | 100 | - |
| SEO | - | 100 | - |
| First Contentful Paint | - | 0,7 s | - |
| Largest Contentful Paint | - | 0,8 s | - |
| Total Blocking Time | - | 0 ms | - |
| Cumulative Layout Shift | - | 0 | - |
| Speed Index | - | 0,7 s | - |

**Análise:**

- Esta página também não existia na versão anterior do projeto (CSR puro), portanto não há dados comparativos "Antes". Foi implementada durante a migração para Next.js.
- A implementação com SSG (Static Site Generation) usando generateStaticParams() resultou em performance quase perfeita: 99 pontos no Desempenho.
- Todas as páginas de detalhes de pizzas são pré-renderizadas durante o build, resultando em carregamento praticamente instantâneo.
- SEO e Práticas recomendadas com pontuação máxima (100), essencial para páginas de produtos que precisam aparecer nos resultados de busca.
- Métricas de carregamento excelentes: FCP em 0.7s, LCP em 0.8s e Speed Index em 0.7s, indicando que o conteúdo completo aparece quase imediatamente.
- TBT de 0ms e CLS de 0 garantem que não há bloqueios de interação nem deslocamentos inesperados de layout.
- A Acessibilidade ficou em 89 pontos, ligeiramente abaixo das outras páginas, provavelmente devido à necessidade de melhorar labels de formulários ou contrastes de cores em alguns elementos interativos. Este ponto pode ser facilmente otimizado em iterações futuras.
- O SSG é a estratégia ideal para páginas de produtos com catálogo definido, proporcionando o melhor desempenho possível.

## Rotas Dinâmicas

O projeto implementa rotas dinâmicas através do padrão `/pizza/[id]`, permitindo páginas individuais para cada pizza do catálogo.

### Implementação:

```typescript
export async function generateStaticParams() {
  return pizzas.map((pizza) => ({
    id: pizza.id,
  }));
}
```

### Benefícios:

1. **SEO Otimizado**: Cada pizza tem sua própria URL indexável (/pizza/1, /pizza/2, etc.)
2. **Performance**: Páginas pré-renderizadas em build time com SSG
3. **Escalabilidade**: Fácil adicionar novas pizzas sem criar rotas manualmente

A rota dinâmica exibe informações detalhadas incluindo ingredientes, informações nutricionais e botão de adicionar ao carrinho, demonstrando a composição híbrida de Server e Client Components do Next.js.

## Reflexão sobre Front-end Desacoplado

Este projeto representa uma abordagem moderna de frontend desacoplado (decoupled/headless frontend), onde a camada de apresentação é completamente separada do backend de dados. Embora este exemplo específico utilize dados estáticos locais (src/data/pizzas.ts), a arquitetura está preparada para consumir APIs externas sem modificações significativas na estrutura.

### Características do Frontend Desacoplado:

1. **Separação de Responsabilidades**: O frontend é independente do backend, comunicando-se apenas através de interfaces bem definidas (no caso atual, o módulo de dados; em produção, seria uma API REST ou GraphQL).

2. **Flexibilidade de Renderização**: Next.js permite escolher a estratégia de renderização ideal para cada página (SSG, ISR, CSR), algo impossível em arquiteturas monolíticas tradicionais.

3. **Escalabilidade**: O frontend pode ser deployado em CDNs globais (Vercel, Netlify), enquanto o backend pode escalar independentemente.

4. **Reutilização**: Os mesmos dados podem alimentar múltiplos frontends (web, mobile, desktop) através da mesma API.

5. **Desenvolvimento Independente**: Equipes de frontend e backend podem trabalhar paralelamente, desde que a interface de dados esteja definida.

Esta arquitetura moderna é ideal para aplicações que precisam de alta performance, SEO otimizado e flexibilidade para evoluir sem acoplamento tecnológico.

---

## ᯓᡣ𐭩.ᐟ ⊹ Desenvolvimento

Desenvolvido por [Bárbara Padilha](https://github.com/babizkk) e [Sabrina Freitas](https://github.com/sabsfreitas). ♡
