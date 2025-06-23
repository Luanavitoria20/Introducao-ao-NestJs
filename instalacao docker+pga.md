## Docker + PostgreSQL + Prisma + NestJS: Guia Completo para Configuração no Windows

### Introdução

Neste guia, vamos configurar um ambiente de desenvolvimento completo para uma aplicação NestJS utilizando PostgreSQL como banco de dados, Prisma como ORM, e tudo isso rodando em containers Docker. Essa abordagem oferece várias vantagens:

1. Isolamento: Cada serviço roda em seu próprio container

2. Portabilidade: Fácil de replicar o ambiente em qualquer máquina

3. Consistência: Todos os desenvolvedores trabalham com as mesmas versõesv

### Pré-requisitos

- Node.js (versão 16 ou superior)

### Passo 1: Instalação do Docker

1. Acesse o site oficial do Docker: https://www.docker.com/products/docker-desktop

2. Faça o download da versão compatível com seu sistema operacional

3. Execute o instalador e siga as instruções

4. Após a instalação, inicie o Docker Desktop

### Passo 2: Criando um projeto NestJS (se ainda não tiver um)

1. Abra o terminal e execute o seguinte comando para criar um novo projeto NestJS:
   ```bash
   npx @nestjs/cli new my-nest-app
   ```

### Passo 3: Configurando o Docker para PostgreSQL

1. Crie um arquivo chamado `docker-compose.yml` na raiz do seu projeto NestJS com o seguinte conteúdo:

   ```yaml
   version: "3.8"

   services:
   postgres:
     image: postgres
     container_name: postgresdb
     environment:
     POSTGRES_USER: postgres
     POSTGRES_PASSWORD: postgres
     POSTGRES_DB: nestdb
     ports:
       - "5432:5432"
   ```

2. Execute o seguinte comando no terminal para iniciar o container PostgreSQL:

   ```bash
   docker-compose up -d
   ```

### Passo 4: Configurando o Prisma no NestJS

1. Instale as dependências do Prisma no seu projeto NestJS:

   ```bash
    npm install prisma @prisma/client --save
   ```

2. Inicialize o Prisma no seu projeto:

   ```bash
    npx prisma init
   ```

   - Isso criará um diretório `prisma` com um arquivo `schema.prisma` dentro.

3. Configurando o schema do Prisma:
   Abra o arquivo `prisma/schema.prisma` e configure a conexão com o PostgreSQL:

   ```prisma
       datasource db {
           provider = "postgresql"
           url      = env("DATABASE_URL")
       }

       generator client {
           provider = "prisma-client-js"
       }

   ```

4. Configurando a conexão com o banco:
   Crie um arquivo `.env` na raiz do seu projeto e adicione a seguinte variável de ambiente:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdb"
   ```

### Passo 5: Criando um modelo de exemplo

1. No arquivo `prisma/schema.prisma`, adicione um modelo de exemplo:

   ```prisma
   model User {
       id    Int     @id @default(autoincrement())
       name  String
       email String  @unique
   }
   ```

2. Após definir o modelo, execute o seguinte comando para gerar as migrações e atualizar o banco de dados:

   ```bash
    npx prisma migrate dev --name init
   ```

   - Cria uma nova migração com o nome "init". Executa a migração no banco de dados e gera o cliente Prisma

### Passo 6: Configurando o Prisma Module no NestJS

1. Vamos criar um módulo para o Prisma seguindo as melhores práticas do NestJS.

- Crie um novo módulo:
  ```bash
     nest generate module prisma
     nest generate service prisma
  ```
- Ou crie manualmente os arquivos `prisma.module.ts` e `prisma.service.ts` dentro do diretório `src/prisma`.

2. Edite o arquivo `prisma/prisma.service.ts`

   ```typescript
   import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
   import { PrismaClient } from "@prisma/client";

   @Injectable()
   export class PrismaService
     extends PrismaClient
     implements OnModuleInit, OnModuleDestroy
   {
     async onModuleInit() {
       await this.$connect();
     }

     async onModuleDestroy() {
       await this.$disconnect();
     }
   }
   ```

3. Edite o arquivo `prisma/prisma.module.ts`

   ```typescript
   import { Module } from "@nestjs/common";
   import { PrismaService } from "./prisma.service";

   @Module({
     providers: [PrismaService],
     exports: [PrismaService],
   })
   export class PrismaModule {}
   ```

### Passo 7: Usando o Prisma Service

1. Agora você pode injetar o `PrismaService` em qualquer módulo ou serviço do seu projeto NestJS.
   Por exemplo, crie um serviço de usuário:

   ```bash
   nest generate service users
   ```

2. Edite o arquivo `users/users.service.ts` para usar o PrismaService:

   ```typescript
   import { Injectable } from '@nestjs/common';
   import { PrismaService } from '../prisma/prisma.service';
   import { User, Prisma } from '@prisma/client';

   @Injectable()
   export class UsersService {
   constructor(private prisma: PrismaService) {}

   async create(data: Prisma.UserCreateInput): Promise<User> {
      return this.prisma.user.create({ data });
   }}
   ```

3. Edite o arquivo `users/users.controller.ts`

   ```typescript
   import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
   import { UsersService } from './users.service';
   import { User } from '@prisma/client';

   @Controller('users')
   export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Post()
   create(@Body() data: any) {
      return this.usersService.create(data);
   }}
   ```

4. Certifique-se de importar o `PrismaModule` no módulo do usuário:

   ```typescript
   import { Module } from "@nestjs/common";
   import  { UsersController } from "./users.controller"
   import { UsersService } from "./user.service";
   import { PrismaModule } from "../prisma/prisma.module";
   @Module({
     imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UsersController]

   })
   export class UserModule {}
   ```