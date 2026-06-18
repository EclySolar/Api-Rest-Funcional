# TechWorld - Catálogo de Produtos Gamer

Sistema web para gerenciamento de produtos de informática gamer, com autenticação de usuários, controle de acesso e organização de itens.

---

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- EJS
- CSS
- JSON Web Token (JWT)
- Bcrypt
- Dotenv

---

## Justificativa das escolhas

- Express: framework leve e eficiente para construção de aplicações web
- MongoDB: banco de dados flexível e de fácil integração
- EJS: permite renderização simples no lado do servidor
- JWT: autenticação stateless moderna
- Bcrypt: garante segurança no armazenamento de senhas
- Dotenv: separação de configurações sensíveis do código

---

## Funcionalidades

- Cadastro de usuários
- Login com autenticação segura
- Proteção de rotas
- Cadastro de produtos
- Edição e remoção de produtos
- Ordenação manual de itens
- Interface estilizada com layout consistente

---

## Estrutura do projeto


projeto/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── views/
│ ├── partials/
│ ├── login.ejs
│ ├── register.ejs
│ ├── home.ejs
│ ├── index.ejs
│ └── edit.ejs
├── public/
├── .env
├── .env.example
├── app.js
└── package.json


---

## Instalação

1. Clonar o repositório
2. Instalar dependências:


npm install


3. Criar o arquivo `.env` com base no `.env.example`:


PORT=3000
MONGO_URI=mongodb://localhost:27017/catalogo
JWT_SECRET=sua_chave_secreta

Exemplo de como é para ficar
![exemplo de .env para a aplicação] (https://github.com/EclySolar/Api-Rest-Funcional/issues/1#issue-4692642659)

4. Iniciar o projeto:


npm run dev


5. Acessar no navegador:


http://localhost:3000


---

## Funcionamento

### Autenticação

- Senhas são criptografadas com bcrypt
- Após login, um token JWT é gerado
- O token é armazenado em cookie
- Rotas protegidas verificam esse token

### Produtos

- Cada produto possui um campo de ordenação (`order`)
- A movimentação na lista é feita trocando posição com itens vizinhos
- Evita inconsistência e duplicação de ordem

---

## Segurança

- Criptografia de senhas
- Uso de JWT para autenticação
- Variáveis sensíveis armazenadas no `.env`

---

## Observações

- O arquivo `.env` não deve ser versionado
- O MongoDB deve estar em execução localmente

---

## Possíveis melhorias

- Upload de imagens
- Sistema de busca
- Logout completo
- Interface mais avançada
- Responsividade aprimorada

---

## Autor

Igor