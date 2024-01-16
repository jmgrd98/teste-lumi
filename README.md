Esse é um sistema que lê dados de faturas de energia elétrica através de um bot escrito em Python, salvando-os em um banco PostgreSQL e disponibilizando através de um frontend em ReactJS.

## Tecnologias Utilizadas

- **Frontend:** React, Ant Design, TailwindCSS, Axios, Redux, Framer Motion, Recharts
- **Backend:** Node.js, Express, Prisma
- **Banco de dados:** PostgreSQL
- **Testes:** Vitest
- **Scraper:** Python, PDFMiner

## Configuração do Projeto

### Pré-requisitos

- Node.js
- npm ou yarn
- PostgreSQL
- Python3

### Configuração da Base de Dados

1. Instale o PostgreSQL na sua máquina.
2. Crie um banco de dados para o projeto chamado "lumi" com uma tabela chamada "faturas" com as seguintes colunas:
- id INTEGER
- numero_cliente TEXT
- mes_referencia TEXT
- energia_eletrica_quantidade DOUBLE PRECISION
- energia_eletrica_valor DOUBLE PRECISION
- energia_scee_quantidade DOUBLE PRECISION
- energia_scee_valor DOUBLE PRECISION
- energia_compensada_quantidade DOUBLE PRECISION
- energia_compensada_valor DOUBLE PRECISION
- contrib_ilum_publica DOUBLE PRECISION
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
6. Instale as dependências do scraper em Python:
   ```
   pip install -r requirements.txt
5. Execute o script.py para realizar a raspagem dos dados e salvá-los no banco de dados PostgreSQL:
   ```bash
   python script.py
6. Inicie o servidor:
   ```bash
   npm run start
   # ou
   yarn start

**Saiba mais sobre a API acessando a documentação Swagger no endpoint /api-docs.**
   
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
