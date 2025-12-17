# 🚀 Guia de Instalação e Execução Local

## Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** 18.x ou superior ([Download](https://nodejs.org/))
- **npm** ou **yarn** (vem com Node.js)
- **Git** ([Download](https://git-scm.com/))

Verifique as versões:
```bash
node --version  # deve ser >= 18
npm --version
git --version
```

---

## 📥 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/pizzaria-nextjs.git
cd pizzaria-nextjs
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

Isso vai instalar:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- E todas as dependências necessárias

---

## 🏃 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

**Características do modo dev:**
- ✅ Hot reload (mudanças aparecem automaticamente)
- ✅ Error overlay útil
- ✅ Source maps para debug
- ⚠️ Não otimizado (mais lento que produção)

### Modo Produção (Local)

```bash
# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

**Características do modo produção:**
- ✅ Código otimizado e minificado
- ✅ Performance máxima
- ✅ Representa fielmente o deploy na Vercel

---

## 🧪 Testando as Páginas

Após iniciar o servidor, teste todas as rotas:

### Home (SSG)
```
http://localhost:3000/
```
✅ Hero section  
✅ Pizzas em destaque  
✅ Seção sobre

### Menu (ISR)
```
http://localhost:3000/menu
```
✅ Lista completa de pizzas  
✅ Busca (client-side)  
✅ Cards interativos

### Promoções (CSR)
```
http://localhost:3000/promocoes
```
✅ Countdown timer  
✅ Loading state  
✅ Promoções dinâmicas

### Detalhes (Rota Dinâmica)
```
http://localhost:3000/pizza/1
http://localhost:3000/pizza/2
http://localhost:3000/pizza/3
```
✅ Informações detalhadas  
✅ Ingredientes  
✅ Informações nutricionais

### 404 Not Found
```
http://localhost:3000/pagina-inexistente
```
✅ Página customizada de erro

---

## 📊 Análise de Performance

### Lighthouse (Chrome DevTools)

1. Abra a página em modo **Anônimo** do Chrome
2. Pressione **F12** para abrir DevTools
3. Vá para aba **Lighthouse**
4. Selecione:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
5. Device: **Desktop** ou **Mobile**
6. Clique em **Analyze page load**

### Lighthouse CLI

```bash
# Instalar globalmente
npm install -g lighthouse

# Rodar análise
lighthouse http://localhost:3000 --view --preset=desktop

# Salvar relatório
lighthouse http://localhost:3000 --output=html --output-path=./report.html
```

### Análise de Bundle

```bash
# Gerar análise do bundle
npm run build

# Visualizar tamanho dos arquivos
ls -lh .next/static/chunks/
```

---

## 🔍 Inspecionando o Código

### Estrutura de Arquivos

```bash
src/
├── app/                    # Páginas e rotas
│   ├── layout.tsx         # Layout global
│   ├── page.tsx           # Home (SSG)
│   ├── globals.css        # Estilos globais
│   ├── menu/
│   │   └── page.tsx       # Menu (ISR)
│   ├── promocoes/
│   │   └── page.tsx       # Promoções (CSR)
│   └── pizza/
│       └── [id]/
│           └── page.tsx   # Detalhes (SSG dinâmico)
├── components/            # Componentes reutilizáveis
│   ├── Navbar.tsx
│   ├── PizzaCard.tsx
│   └── SearchBar.tsx
└── data/
    └── pizzas.ts         # Dados mockados
```

### Tipos de Renderização

Veja os comentários no topo de cada página:

**SSG (page.tsx):**
```typescript
// Esta página usa SSG - gerada no build time
export default function Home() { ... }
```

**ISR (menu/page.tsx):**
```typescript
export const revalidate = 3600; // Revalida a cada 1 hora
export default function MenuPage() { ... }
```

**CSR (promocoes/page.tsx):**
```typescript
"use client"; // Marca como Client Component
export default function PromocoesPage() { ... }
```

---

## 🐛 Troubleshooting

### Erro: Port 3000 already in use

```bash
# Matar processo na porta 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Ou use outra porta
PORT=3001 npm run dev
```

### Erro: Module not found

```bash
# Limpar cache e reinstalar
rm -rf node_modules .next
npm install
npm run dev
```

### Imagens não aparecem

- Verifique se as imagens estão em `public/images/`
- Use caminhos absolutos: `/images/pizza.png`
- Reinicie o servidor dev

### TypeScript errors

```bash
# Verificar erros
npm run build

# Ignorar temporariamente (não recomendado)
# Adicione em next.config.js:
# typescript: { ignoreBuildErrors: true }
```

---

## 📝 Scripts Disponíveis

```json
{
  "dev": "next dev",           // Desenvolvimento
  "build": "next build",       // Build de produção
  "start": "next start",       // Servidor produção
  "lint": "next lint"          // Verificar código
}
```

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build e iniciar produção
npm run build && npm start

# Verificar erros de lint
npm run lint

# Limpar tudo e começar do zero
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

---

## 🎨 Customização

### Alterar Cores (Tailwind)

Edite `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: "#FF4444",    // Vermelho
      secondary: "#FFA500",  // Laranja
    },
  },
}
```

### Adicionar Nova Fonte

Edite `src/app/layout.tsx`:

```typescript
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
```

### Modificar Meta Tags

Edite `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Seu Título",
  description: "Sua descrição",
};
```

---

## 📚 Recursos para Estudo

### Documentação Oficial
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Tutoriais Recomendados
- [Next.js Learn Course](https://nextjs.org/learn)
- [Vercel Examples](https://github.com/vercel/next.js/tree/canary/examples)

### Comunidade
- [Next.js Discord](https://discord.gg/nextjs)
- [Stack Overflow - Next.js](https://stackoverflow.com/questions/tagged/next.js)

---

## ✅ Checklist de Verificação

Antes de considerar pronto para apresentação:

- [ ] `npm run dev` funciona sem erros
- [ ] Todas as 4 páginas carregam corretamente
- [ ] Imagens aparecem em todas as páginas
- [ ] Links de navegação funcionam
- [ ] `npm run build` passa sem erros
- [ ] `npm start` serve o build corretamente
- [ ] Lighthouse mostra pontuação > 90 em todas as categorias
- [ ] Código está no GitHub
- [ ] README.md está completo

---

## 🤝 Precisa de Ajuda?

Se encontrar problemas:

1. ✅ Verifique este guia novamente
2. ✅ Consulte a [documentação oficial](https://nextjs.org/docs)
3. ✅ Procure no [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
4. ✅ Pergunte no grupo da disciplina

**Boa sorte com o projeto! 🍕🚀**
