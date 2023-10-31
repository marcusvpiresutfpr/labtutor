# README.md

## Descrição do Sistema

Este sistema é desenvolvido utilizando tecnologias modernas e bibliotecas populares para a criação de aplicativos da web. Abaixo estão as principais tecnologias e ferramentas usadas neste projeto:

- **Next.js**: Um framework React de código aberto para a construção de aplicativos da web. O Next.js oferece renderização do lado do servidor (SSR), geração estática e muitos outros recursos avançados para desenvolvimento web.

- **Tailwind CSS**: Uma biblioteca de utilitários CSS altamente personalizável que facilita a criação de interfaces de usuário estilizadas de forma eficiente.

- **Prisma**: Prisma é um ORM (Object-Relational Mapping) moderno que simplifica o acesso e manipulação de bancos de dados. Neste projeto, ele é usado para se comunicar com o banco de dados MongoDB.

- **MongoDB**: Um banco de dados NoSQL altamente escalável e flexível que armazena os dados do aplicativo. O Prisma facilita a integração com o MongoDB.

Além disso, este sistema faz uso da biblioteca [FloatUI](https://www.floatui.com/components#components) para componentes de interface do usuário, tornando a criação de interfaces agradáveis e responsivas mais simples.

## Configuração

Antes de iniciar o sistema, é necessário configurar as variáveis de ambiente. Siga as etapas abaixo:

1. Crie um arquivo `.env` na raiz do projeto.

2. Defina as seguintes variáveis de ambiente no arquivo `.env`:

   - `DATABASE_URL=`: Substitua pelo URL de conexão com o seu banco de dados MongoDB.
   - `GOOGLE_CLIENT_ID=`: Obtenha um ID de cliente do Google OAuth para autenticação.
   - `GOOGLE_CLIENT_SECRET=`: Obtenha um segredo de cliente do Google OAuth para autenticação.
   - `NEXTAUTH_SECRET=`: Defina uma chave secreta para o NextAuth.
   - `NEXTAUTH_URL=http://localhost:3000`: URL de origem para autenticação com o NextAuth.

Certifique-se de substituir os valores das variáveis acima pelos dados corretos do seu ambiente.

## Banco de Dados

Este sistema utiliza o MongoDB como banco de dados. Antes de iniciar o sistema, certifique-se de executar o seguinte comando para criar as tabelas no banco de dados:

```bash
npx prisma db push
```

Isso criará as tabelas necessárias no MongoDB de acordo com o modelo de dados definido no Prisma.

## Iniciando o Sistema

Após configurar as variáveis de ambiente e criar as tabelas no banco de dados, você pode iniciar o sistema executando o seguinte comando:

```bash
npm run dev
```

Isso iniciará o servidor de desenvolvimento do Next.js e tornará o sistema acessível em http://localhost:3000.

Certifique-se de que todas as dependências foram instaladas previamente usando `npm install`.

Agora você pode começar a usar o sistema e personalizá-lo de acordo com suas necessidades. Aproveite!
