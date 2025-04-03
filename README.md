# API LTA Sul Bet

API para ser utilizada com o app LTS Sul Bet, onde cada usuário faz palpites nos jogos de cada semana da LTA Sul e o usuário que errar mais, paga uma 
valor em pão de queijo para todos os participantes comerem. :)

API para gerenciamento de bolão de futebol desenvolvida com Node.js, Express, TypeScript e TypeORM.

## Estrutura do Projeto

```
src/
├── config/         # Configurações do projeto
├── controllers/    # Controladores da aplicação
├── entities/       # Entidades do TypeORM
├── middlewares/    # Middlewares do Express
├── migrations/     # Migrações do banco de dados
├── models/         # Modelos da aplicação
├── routes/         # Rotas da API
├── services/       # Serviços da aplicação
└── server.ts       # Arquivo principal
```

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- TypeORM
- MySQL
- JWT para autenticação
- bcrypt para hash de senhas

## Requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/api-bolao.git
cd api-bolao
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=seu_segredo_jwt
```

4. Execute as migrações:
```bash
npm run typeorm migration:run
```

5. Inicie o servidor:
```bash
npm run dev
```

## Estrutura do Banco de Dados

### Tabelas

#### User
- Armazena informações dos usuários
- Campos: id, name, email, password, points, isAdmin, createdAt, updatedAt

#### Team
- Armazena informações das equipes
- Campos: id, name, logo, points, createdAt, updatedAt

#### Game
- Armazena informações dos jogos
- Campos: id, team1Id, team2Id, date, time, type, weekNumber, guessAllowed, guessFinished, createdAt, updatedAt

#### Guess
- Armazena os palpites dos usuários
- Campos: id, gameId, userId, team1Id, team2Id, score1, score2, date, type, points, finished, createdAt, updatedAt
- Relacionamentos:
  - gameId -> Game (FK)
  - userId -> User (FK)
  - team1Id -> Team (FK)
  - team2Id -> Team (FK)

## Endpoints da API

### Autenticação
- POST `/api/auth/login` - Login de usuário
- GET `/api/auth/me` - Retorna dados do usuário autenticado

### Usuários
- POST `/api/users` - Cria um novo usuário
- GET `/api/users` - Lista todos os usuários
- GET `/api/users/:id` - Busca um usuário específico
- PUT `/api/users/:id` - Atualiza um usuário
- DELETE `/api/users/:id` - Remove um usuário

### Times
- POST `/api/teams` - Cria um novo time
- GET `/api/teams` - Lista todos os times
- GET `/api/teams/:id` - Busca um time específico
- PUT `/api/teams/:id` - Atualiza um time
- DELETE `/api/teams/:id` - Remove um time
- PUT `/api/teams/:id/points` - Atualiza pontos de um time

### Jogos
- POST `/api/games` - Cria um novo jogo
- GET `/api/games` - Lista todos os jogos
- GET `/api/games/:id` - Busca um jogo específico
- PUT `/api/games/:id` - Atualiza um jogo
- DELETE `/api/games/:id` - Remove um jogo
- PUT `/api/games/:weekNumber/allow-guess` - Permite palpites para todos os jogos de uma semana

### Palpites
- POST `/api/guesses` - Cria um novo palpite (protegido)
- GET `/api/guesses` - Lista todos os palpites
- GET `/api/guesses/:id` - Busca um palpite específico
- PUT `/api/guesses/:id` - Atualiza um palpite (protegido)
- DELETE `/api/guesses/:id` - Remove um palpite (protegido)
- GET `/api/guesses/user/:userId` - Lista palpites de um usuário (protegido)
- GET `/api/guesses/game/:gameId` - Lista palpites de um jogo (protegido)
- PUT `/api/guesses/:id/points` - Atualiza pontos de um palpite (protegido)
- PUT `/api/guesses/:id/finish` - Marca um palpite como finalizado (protegido)

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o projeto
- `npm start` - Inicia o servidor em modo produção
- `npm run typeorm migration:create` - Cria uma nova migration
- `npm run typeorm migration:run` - Executa as migrations pendentes
- `npm run typeorm migration:revert` - Reverte a última migration executada

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 