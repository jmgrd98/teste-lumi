# Teste técnico para a empresa Lumi

Olá, pessoal! Esse é o projeto que eu desenvolvi com muito carinho e dedicação para o teste para o processo seletivo da Lumi para Desenvolvedor Fullstack Pleno.

## Tecnologias Utilizadas

- **Frontend:** React, Ant Design, TailwindCSS, Axios, Redux, Framer Motion
- **Backend:** Node.js, Express, Prisma
- **Database:** PostgreSQL
- **Tests** Vitest
- **Scraper** Python, PDFMiner

## Configuração do Projeto

### Pré-requisitos

- Node.js
- npm ou yarn
- PostgreSQL

### Configuração da Base de Dados

1. Instale o PostgreSQL.
2. Crie um banco de dados para o projeto com o nome de "lumi" (precisa ser esse nome se não o scraper em Python não irá fazer a raspagem de dados corretamente).
3. Configure as variáveis de ambiente para o acesso à base de dados no arquivo `.env`.

### Configuração do Backend

1. Navegue até a pasta do backend (server).
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
   
### Configuração do Frontend

1. Navege até a pasta do frontend (client).
2. Instale as dependências:
    ```bash
   npm install
   # ou
   yarn install
3. Inicie a aplicação:
   ```bash
   npm run dev
   # ou
   yarn start dev
