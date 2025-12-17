# 🚀 Guia de Deploy na Vercel

## Passo a Passo para Deploy

### 1. Preparar o Repositório

```bash
# Inicializar repositório Git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "Initial commit - Pizza Next.js Project"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/seu-usuario/pizzaria-nextjs.git
git branch -M main
git push -u origin main
```

### 2. Deploy na Vercel

#### Opção 1: Via Dashboard (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "Add New Project"
4. Selecione o repositório `pizzaria-nextjs`
5. A Vercel detectará automaticamente que é um projeto Next.js
6. Clique em "Deploy"
7. Aguarde o build (~2-3 minutos)
8. Seu site estará disponível em `https://pizzaria-nextjs.vercel.app`

#### Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### 3. Configurações Importantes

#### Variáveis de Ambiente (se necessário)
No dashboard da Vercel:
- Settings → Environment Variables
- Adicione suas variáveis (ex: API keys)
- Faça redeploy para aplicar

#### Domínio Customizado (opcional)
- Settings → Domains
- Add Domain
- Configure DNS do seu domínio

### 4. Verificar Deployment

Após o deploy, verifique:

✅ Build passou sem erros  
✅ Todas as páginas carregam corretamente  
✅ Imagens estão otimizadas  
✅ Rotas funcionam (/, /menu, /promocoes, /pizza/[id])  
✅ Performance no Lighthouse  

### 5. Lighthouse Audit

```bash
# Instalar Lighthouse CLI
npm install -g lighthouse

# Rodar audit
lighthouse https://seu-projeto.vercel.app --view

# Ou use o Lighthouse no Chrome DevTools:
# 1. Abra DevTools (F12)
# 2. Aba "Lighthouse"
# 3. Clique em "Analyze page load"
```

### 6. Continuous Deployment

A Vercel configura automaticamente CI/CD:

- **Push to main → Deploy Automático** para produção
- **Pull Request → Preview Deploy** exclusivo
- **Rollback instantâneo** se necessário

### 7. Monitoramento

Dashboard da Vercel fornece:
- Analytics de visitantes
- Core Web Vitals em tempo real
- Logs de função
- Error tracking

---

## 🎯 Checklist Pré-Deploy

Antes de fazer o deploy final, verifique:

- [ ] Todos os arquivos necessários commitados
- [ ] `node_modules` no .gitignore
- [ ] Imagens otimizadas e na pasta `public/`
- [ ] Links internos funcionando
- [ ] Metadados (título, descrição) configurados
- [ ] Sem console.logs desnecessários
- [ ] Build local funcionando (`npm run build`)
- [ ] TypeScript sem erros (`npm run lint`)

---

## 📊 Análise Lighthouse - Como Rodar

### No Projeto Local

```bash
# Build de produção
npm run build

# Servir build
npm start

# Em outro terminal, rodar Lighthouse
lighthouse http://localhost:3000 --view --preset=desktop
```

### No Site Deployado

```bash
lighthouse https://pizzaria-nextjs.vercel.app --view --preset=desktop
```

### Salvar Relatório

```bash
# Formato HTML
lighthouse https://pizzaria-nextjs.vercel.app --output=html --output-path=./lighthouse-report.html

# Formato JSON
lighthouse https://pizzaria-nextjs.vercel.app --output=json --output-path=./lighthouse-report.json
```

---

## 🐛 Troubleshooting

### Build Failing

```bash
# Limpar cache e reinstalar
rm -rf .next node_modules
npm install
npm run build
```

### Imagens não Carregando

- Verifique se estão em `public/images/`
- Use sempre caminhos absolutos: `/images/pizza.png`
- Não use `../` em imports

### Rotas não Funcionando

- Certifique-se que os arquivos estão em `src/app/`
- Verifique nomenclatura: `page.tsx`, não `index.tsx`

---

## 📚 Recursos Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Vercel Analytics](https://vercel.com/analytics)

---

## ✅ Deploy Bem-Sucedido

Parabéns! Seu projeto está no ar. Compartilhe:

🔗 **URL de Produção:** `https://seu-projeto.vercel.app`

Não esqueça de atualizar o README.md com a URL real!
