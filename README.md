# TechWorld - Catálogo de Produtos Gamer

Sistema web para gerenciamento de produtos de informática gamer desenvolvido em Node.js seguindo o padrão MVC. O sistema possui autenticação de usuários, controle de acesso, gerenciamento de produtos e documentação interativa com Swagger.

---

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- EJS
- CSS
- Express Session
- Bcrypt
- Dotenv
- Swagger UI Express
- Swagger JSDoc

---

## Funcionalidades

- Cadastro de usuários
- Login e logout
- Controle de acesso por sessão
- Proteção de rotas privadas
- CRUD completo de produtos
- Busca de produtos por ID
- Ordenação manual de itens
- Documentação interativa com Swagger

---

## Demonstração

### Página Inicial

![Página Inicial](INSIRA_AQUI_O_LINK)

### Dashboard

![Dashboard](INSIRA_AQUI_O_LINK)

### Swagger

![Swagger](INSIRA_AQUI_O_LINK)

---

## Estrutura do Projeto

```text
projeto/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── swagger/
├── views/
│   ├── partials/
│   ├── login.ejs
│   ├── register.ejs
│   ├── home.ejs
│   ├── index.ejs
│   └── edit.ejs
├── public/
├── .env
├── .env.example
├── app.js
└── package.json
```

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/EclySolar/Api-Rest-Funcional.git
```

Entre na pasta do projeto:

```bash
cd Api-Rest-Funcional
```

Instale as dependências:

```bash
npm install
```

---

## Configuração

Crie um arquivo `.env` utilizando o `.env.example` como base.

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/catalogo
SESSION_SECRET=sua_chave_secreta
```

---

## Execução

Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

ou

```bash
node app.js
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

---

## Documentação da API

Com o servidor em execução, a documentação pode ser acessada em:

```text
http://localhost:3000/api-docs
```

A interface Swagger permite visualizar e testar os endpoints diretamente pelo navegador utilizando o botão **Try it out**.

---

## Segurança

- Senhas criptografadas com Bcrypt
- Controle de acesso por sessões
- Middleware para proteção de rotas privadas
- Variáveis sensíveis armazenadas no arquivo `.env`

---

## Possíveis Melhorias

- Upload de imagens
- Sistema de busca
- Responsividade aprimorada
- Perfil de usuário
- Paginação de produtos

---

## Autor

Igor Morgenstern

GitHub: https://github.com/EclySolar