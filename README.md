# API de transações

Api de transações feita usando Fastify, Knex e testes automatizados com Vitest

## Requisitos

[Node.js](https://nodejs.org/en) (versão 16.10 ou superior)

[TypeScript](https://www.typescriptlang.org/) (versão 5 ou superior)

## Instalação

 1. Clone o repositório: `git clone https://github.com/mateuschaves/fastify-api-nodejs.git`
 2. Instale as dependências: `npm install`
 3. Crie um arquivo `.env` usando o modelo de exemplo `.env.example`
 4. Execute as migrations usando o comando: `npm run knex -- migrate:latest`

## Uso

Para iniciar o servidor, utilize o seguinte comando:

```bash
    npm run dev
```

## Modelo de dados

O modelo de uma trasação segue o seguinte modelo:

| id | title | session_id | amount | created_at
|--|--|--|--|--|
| ef820fc1-cb74-4cb2-92db-04b4e0e23c9f | Salário | f5471fbb-408d-4010-9191-4721e01230a1 | 14500 | 2023-04-26 18:40:41
| f5471fbb-408d-4010-9191-4721e01230a1 | Aluguel | 1db67836-6f3c-428a-9af3-b5576b1aebf9 | 1800 | 2023-04-26 19:20:31


## Contribuição

 1. Faça o fork do projeto
 2. Crie sua feature branch (`git checkout -b feature/nome-da-feature`)
 3. Commit suas mudanças (`git commit -am 'Adicionando nova feature'`)
 4. Faça o push para o branch (`git push origin feature/nome-da-feature`)
 5. Crie um novo Pull Request

## Licença

MIT
