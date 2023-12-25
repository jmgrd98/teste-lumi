# Escolha a imagem base
FROM node:18.17

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que o servidor irá utilizar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]
