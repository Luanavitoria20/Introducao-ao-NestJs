<<<<<<< HEAD
### 🌱 Introdução ao NestJs

Bem-vind@ a este jardim de código 🌸 — um projeto simples com NestJS, construído para florescer 🌼 o entendimento sobre estrutura, comandos e boas práticas na criação de APIs.

---
### 📚 Sobre o projeto

Este repositório é um ponto de partida: nele você vai aprender

🧩 a arquitetura modular do NestJS

🎯 como separar responsabilidades por módulos, controladores e serviços

⚡ comandos principais (CLI, build, run)

🌐 boas práticas para manter o código limpo e escalável

---

🛠️ Tecnologias usadas

🟢 Node.js + TypeScript

🚀 NestJS

🗄️ Prisma / Banco de dados

🐳 Docker / docker-compose

---

### 🚀 Como rodar localmente

# 1️⃣ Clone este repositório
git clone https://github.com/Luanavitoria20/Introducao-ao-NestJs.git

### 2️⃣ Subir os contêineres
- Para subir normalmente:  
docker-compose up

- Para reconstruir imagens e subir (quando fizer alterações no código ou dependências):  
docker-compose up --build

# 3️⃣ Instale as dependências
npm install

# 4️⃣  Inicie o servidor em modo de desenvolvimento
npm run start:dev

# 5️⃣  Rodar os testes
npm test  
npm run start:cov

### 6️⃣ A aplicação estará disponível
- API: http://localhost:3000/api

----

### 📂 Estrutura do projeto

├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── auth/        # módulo de autenticação
│   ├── place/       # módulo para lugares
│   ├── prisma/      # integração do Prisma com NestJS
│   ├── users/       # módulo de usuários
│   ├── app.module.ts
│   └── main.ts
│
├── test/            # testes
│
├── .env
├── .dockerignore
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile.api
├── eslint.config.mjs
├── nest-cli.json
├── tsconfig.json
├── package.json
└── README.md

----

✅ Funcionalidades previstas

📝 Endpoints CRUD básicos

🔒 Validações de DTOs

🛑 Tratamento de exceções

🗄️ Conexão com banco de dados

📦 Migrações / ORM com Prisma

🐳 Dockerização da API

---

💡 Sugestões de melhorias

🔑 Implementar autenticação / autorização avançada

🧪 Adicionar testes automatizados (unitários & integrados)

📖 Documentar API com Swagger

⚡ Adicionar cache, filas ou microserviços futuramente

----

🧷 Autor
| [<img loading="lazy" widht= 150 height= 150 src="https://avatars.githubusercontent.com/u/206602777?s=400&u=822619fc7be63ed9a459272707f3f43e427ec6d7&v=4" widht=50><br><sub>Luana Vitoria</sub>](https://github.com/Luanavitoria20) 
| :---: |
desenvolvedora aprendendo a dançar 💃 com NestJS.
=======
