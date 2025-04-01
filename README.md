# Node.js Express TypeScript API

Uma API RESTful construída com Node.js, Express e TypeScript, seguindo boas práticas de desenvolvimento.

## Requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload
- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Inicia o servidor em modo de produção

## Estrutura do Projeto

```
src/
├── config/         # Configurações da aplicação
├── controllers/    # Controladores da aplicação
├── middlewares/    # Middlewares personalizados
├── models/         # Modelos de dados
├── routes/         # Definições de rotas
├── services/       # Lógica de negócios
└── server.ts       # Arquivo principal da aplicação
```

## Endpoints

- `GET /health`: Verifica o status da API

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- CORS
- ts-node-dev (para desenvolvimento) 