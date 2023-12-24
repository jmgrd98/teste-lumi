# Teste técnico para a empresa Lumi

Olá, pessoal! Esse é o projeto que eu desenvolvi com muito carinho e dedicação para o teste para o processo seletivo da Lumi para Desenvolvedor Fullstack Pleno.

## Tecnologias Utilizadas

- **Frontend:** React, Ant Design, Axios
- **Backend:** Node.js, Express, Prisma
- **Database:** PostgreSQL
- **Outras:** Redux, Vitest, Framer Motion

## Configuração do Projeto

### Pré-requisitos

- Node.js
- npm ou yarn
- PostgreSQL

### Configuração da Base de Dados

1. Instale o PostgreSQL.
2. Crie uma base de dados para o projeto.
3. Configure as variáveis de ambiente para o acesso à base de dados no arquivo `.env`.

### Configuração do Backend

1. Navegue até a pasta do backend.
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
3. Configure as variáveis de ambiente no arquivo '.env'.
4. Rode as migrações do Prisma:
   ```bash
   npx prisma migrate dev
5. Execute o script.py para realizar a raspagem dos dados e salvá-los no banco de dados PostgreSQL:
   ```bash
   python script.py
6. Inicie o servidor:
   ```bash
   npm run start
   # ou
   yarn start
   

