1. Instalação do Nest CLI: O Nest CLI facilita a criação e gerenciamento de projetos.
- Instale o Nest CLI globalmente usando o comando:
   ```
   npm install -g @nestjs/cli
   ```

2. Criar um Novo Projeto
- Crie um novo projeto NestJS com o comando:
   ```
   nest new [nome-do-projeto]
   ```
   Escolha o gerenciador de pacotes (npm) quando solicitado.

3. Acesse as configurações do VsCode com o atalho:
   ```
   Ctrl + Shift + P
   ```
   e busque por "Preferences: Open Settings (JSON)".
   
   - Adicione a seguinte configuração para configurar os icones do nestjs:
   ```json 
   "material-icon-theme.activeIconPack": "nest",
   ````

4. Estrutura do Projeto
- Após a criação do projeto, você verá uma estrutura de diretórios como esta:
   ```
   src/
   ├── users/
   │   ├── user.entity.ts       # Entidade do banco de dados
   │   ├── users.controller.ts  # Rotas da API
   │   ├── users.service.ts     # Lógica de negócio
   │   └── users.module.ts      # Módulo organizacional
   ├── app.module.ts            # Módulo principal
   └── main.ts                  # Inicialização
   ```