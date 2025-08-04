# 🎨 Playgram

Interface web da rede social **Playgram**. Este frontend é integrado com o [playgram-api](https://github.com/igorfrag/playgram-api).

## 🚀 Tecnologias Utilizadas

- [Next](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.dev/) – Componentes de UI acessíveis e elegantes

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/igorfrag/playgram
cd playgram

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

## 🗂️ Estrutura de Pastas

```
playgram/
│
├── components/
├── hooks/
├── lib/                # Api e Funções auxiliares
├── app/                # Páginas principais (login, feed, perfil)
├── types/              # Tipagens globais (ex: User, Post, Comment)
├── public/             # Assets estáticos
```

## ✅ Funcionalidades

- Login / Cadastro com validação
- Feed de postagens
- Sistema de seguidores (seguir/deixar de seguir)
- Comentários e curtidas
- Drawer de comentários com paginação
- Perfil público/privado
- Upload de foto de perfil
