# Universidade de Computação Avançada (UCA)

## Descrição

API REST para gerenciamento de universidades, cursos, disciplinas, professores, alunos e matrículas. Desenvolvida com NestJS, Prisma ORM e PostgreSQL.

## Arquitetura

- **NestJS**: Framework para aplicações Node.js escaláveis, modular e orientado a serviços.
- **Prisma ORM**: Mapeamento objeto-relacional para PostgreSQL, geração automática de clientes e migrações.
- **PostgreSQL**: Banco de dados relacional utilizado como persistência.
- **Docker**: Contêinerização dos serviços (API e banco de dados).

## Estrutura do Projeto

- `src/`: Código-fonte da aplicação.
  - Módulos: `aluno`, `curso`, `disciplina`, `instituicao`, `professor`, `leciona`, `cursa`, `tipo-curso`, `tipo-disciplina`, `titulo`, cada um com controller, service, DTOs.
  - `prisma/`: Integração com Prisma ORM.
  - `main.ts`: Bootstrap da aplicação.
  - `app.module.ts`: Módulo raiz.
- `prisma/`: Schema do banco, seed, migrações.
- `generated/prisma/`: Cliente Prisma gerado automaticamente.
- `Dockerfile`, `docker-compose.yml`: Configuração de contêineres.
- `package.json`: Dependências e scripts.

## Instalação

1. Clone o repositório.
2. Configure variáveis de ambiente em `env.example`.
3. Execute os contêineres:

```sh
docker-compose up --build
```

4. Acesse a API em `http://localhost:3000/api/v1`.

## Frontend

Foi adicionado um frontend React com Vite, Tailwind CSS e `lucide-react` em [frontend/](frontend). Ele consome a API em `/api/v1` por proxy local do Vite.

### Como rodar

1. Garanta que a API esteja ativa em `http://localhost:3000`.
2. Instale as dependências do frontend dentro de [frontend/package.json](frontend/package.json).
3. Execute `npm install` e depois `npm run dev` dentro de [frontend/](frontend).

### Observação

O ambiente desta sessão não possui Node.js no PATH, então não foi possível executar a instalação ou a build do frontend aqui.

## Scripts Principais

- `npm run start:dev`: Inicia API em modo desenvolvimento.
- `npm run build`: Compila o projeto.
- `npm run prisma:migrate`: Executa migrações Prisma.
- `npm run prisma:seed`: Popula o banco com dados iniciais.
- `npm run prisma:studio`: Abre interface visual Prisma Studio.

## Banco de Dados

- Schema definido em `prisma/schema.prisma`.
- Seed inicial em `prisma/seed.ts`.
- Migrações em `prisma/migrations/`.

## Endpoints

Cada módulo possui endpoints CRUD:

- `GET /api/v1/<entidade>`: Lista registros.
- `GET /api/v1/<entidade>/:id`: Detalha registro.
- `POST /api/v1/<entidade>`: Cria registro.
- `PUT /api/v1/<entidade>/:id`: Atualiza registro.
- `DELETE /api/v1/<entidade>/:id`: Remove registro.

Entidades:
- aluno, curso, disciplina, professor, instituicao, leciona, cursa, tipo-curso, tipo-disciplina, titulo

Para documentação completa, importe a collection do Postman disponível em [docs/University_API.postman_collection.json](docs/University_API.postman_collection.json).

## Validação e Segurança

- Validação automática de dados via DTOs e `class-validator`.
- Pipes globais para sanitização e validação.

## Configuração

- Variáveis de ambiente: `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`.
- Configuração Docker para ambiente de desenvolvimento.

## Dependências

Principais:
- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`
- `@prisma/client`, `@prisma/adapter-pg`, `pg`
- `class-validator`, `class-transformer`, `dotenv`, `rxjs`

## Licença

MIT
