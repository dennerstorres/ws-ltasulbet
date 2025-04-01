# WS LTA Sul Bet API

API REST desenvolvida em Node.js com TypeScript, Express e TypeORM.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- JWT para autenticação
- BCrypt para criptografia
- PM2 para gerenciamento de processos

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- MySQL (versão 8 ou superior)
- NPM ou Yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd ws-ltasulbet
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Servidor
PORT=3000

# Banco de dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=ltasulbet

# JWT
JWT_SECRET=seu_secret_jwt
JWT_EXPIRES_IN=24h
```

4. Execute as migrations:
```bash
npm run migration:run
```

## 🚀 Executando

### Desenvolvimento
```bash
npm run dev
```

### Produção
1. Compile o projeto:
```bash
npm run build
```

2. Inicie o servidor:
```bash
npm start
```

### Usando PM2 (Produção)
1. Instale o PM2 globalmente:
```bash
npm install -g pm2
```

2. Crie o arquivo de configuração do PM2 (ecosystem.config.js):
```javascript
module.exports = {
  apps: [{
    name: "WS LTA Sul Bet",
    script: "./dist/server.js",
    env: {
      NODE_ENV: "production",
    },
    max_memory_restart: '1G',
    exec_mode: 'cluster',
    instances: 1
  }]
}
```

3. Inicie a aplicação:
```bash
pm2 start ecosystem.config.js
```

4. Salve a configuração do PM2:
```bash
pm2 save
```

## 📦 Estrutura do Projeto

```
src/
├── config/         # Configurações (banco de dados, etc.)
├── controllers/    # Controladores
├── entities/       # Entidades do TypeORM
├── middlewares/    # Middlewares do Express
├── migrations/     # Migrações do banco de dados
├── models/         # Modelos de negócio
├── routes/         # Rotas da API
└── server.ts       # Ponto de entrada da aplicação
```

## 🛣️ Rotas da API

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário

### Usuários
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca usuário por ID
- `PUT /api/users/:id` - Atualiza usuário
- `DELETE /api/users/:id` - Remove usuário

### Times
- `POST /api/teams` - Cria novo time
- `GET /api/teams` - Lista todos os times
- `GET /api/teams/:id` - Busca time por ID
- `PUT /api/teams/:id` - Atualiza time
- `DELETE /api/teams/:id` - Remove time
- `PATCH /api/teams/:id/points` - Atualiza pontos do time

## 🗄️ Banco de Dados

### Tabelas

#### Users
```sql
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `points` INT NOT NULL DEFAULT '0',
  `isAdmin` TINYINT NOT NULL DEFAULT '0',
  `createdAt` TIMESTAMP NOT NULL DEFAULT (now()),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
);
```

#### Teams
```sql
CREATE TABLE `team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `logo` MEDIUMTEXT NULL,
  `points` INT NOT NULL DEFAULT '0',
  `createdAt` TIMESTAMP NOT NULL DEFAULT (now()),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
);
```

## ⚙️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm start` - Inicia o servidor em modo produção
- `npm run migration:generate` - Gera uma nova migration
- `npm run migration:run` - Executa as migrations pendentes
- `npm run migration:revert` - Reverte a última migration

## 🔒 Segurança

- Senhas são armazenadas com hash usando BCrypt
- Autenticação via JWT
- CORS configurado
- Validação de dados nas requisições
- Tratamento de erros centralizado

## 📝 Logs

Os logs são gerenciados pelo TypeORM e incluem:
- Queries SQL
- Erros
- Schemas
- Warnings
- Informações gerais
- Logs de migração

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. 