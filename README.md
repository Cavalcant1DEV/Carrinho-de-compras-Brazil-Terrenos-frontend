# Carrinho-de-compras-Brazil-Terrenos-frontend
# Brasil Terrenos — Frontend

Interface web do Brasil Terrenos, uma aplicação de catálogo e carrinho de compras integrada a uma API desenvolvida em ASP.NET Core.

O frontend foi desenvolvido com React, React Router e Tailwind CSS.

## Tecnologias

- React
- TypeScript
- React Router
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast
- Vite
- Docker
- Docker Compose

## Funcionalidades

A aplicação possui:

- Catálogo de produtos
- Pesquisa de produtos com debounce
- Paginação através de infinite scroll
- Skeleton durante carregamentos
- Indicador de disponibilidade em estoque
- Carrinho lateral (Drawer)
- Adição e remoção de produtos
- Controle de quantidade
- Persistência do carrinho no Local Storage
- Aplicação de cupons
- Exibição de descontos
- Cálculo de subtotal e total
- Checkout
- Toast de confirmação de compra
- Atualização do catálogo após uma compra

## Estrutura

```text
app/
├── components/
│   ├── Button/
│   ├── Cart/
│   ├── Drawer/
│   ├── ProductCard/
│   ├── SearchInput/
│   ├── Skeleton/
│   └── TopBar/
├── hooks/
│   └── useDebounce.ts
├── services/
│   └── api.ts
├── interfaces
├── routes/
└── root.tsx
```

> A estrutura acima pode variar conforme a evolução do projeto.

## Arquitetura

A aplicação consome a API através do Axios.

```text
React Component
      ↓
Service / Axios
      ↓
ASP.NET Core API
      ↓
SQL Server
```

Os dados provenientes do backend são mantidos separados dos estados específicos da interface, como pesquisa, abertura do carrinho e itens adicionados ao carrinho.

## Carrinho

Os produtos adicionados ao carrinho são mantidos no estado da aplicação e sincronizados com o `localStorage`.

Isso permite preservar o carrinho mesmo após atualizar ou fechar a página.

Cada item possui uma quantidade mínima de `1` e máxima de `100`.

O carrinho permite:

- Adicionar produtos
- Incrementar quantidade
- Diminuir quantidade
- Informar quantidade manualmente
- Remover produtos
- Aplicar cupom
- Finalizar a compra

## Pesquisa

A pesquisa utiliza debounce para evitar requisições desnecessárias enquanto o usuário está digitando.

```text
Usuário digita
      ↓
SearchInput
      ↓
useDebounce
      ↓
API
      ↓
Atualização do catálogo
```

## Infinite Scroll

A listagem utiliza paginação fornecida pela API.

Ao se aproximar do final da página, a próxima página de produtos é carregada automaticamente.

```text
Página 1
   ↓
Scroll
   ↓
Página 2
   ↓
Scroll
   ↓
Página 3
```

Durante o carregamento são exibidos skeletons no lugar dos próximos produtos.

## Executando o projeto

### Pré-requisitos

- Node.js
- npm
- Docker e Docker Compose, caso utilize containers

Clone o repositório:

```bash
git clone (https://github.com/Cavalcant1DEV/Carrinho-de-compras-Brazil-Terrenos-frontend.git)
cd <NOME_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível, por padrão, em:

```text
http://localhost:5173
```

## Docker

Também é possível executar através do Docker Compose:

```bash
docker compose up --build
```

## Configuração da API

A aplicação precisa ter acesso ao backend do Brasil Terrenos.

Exemplo:

```text
http://localhost:8080/api
```

A instância do Axios pode ser configurada em:

```text
app/services/api.ts
```

Exemplo:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});
```

## Backend

A API utilizada por este projeto está disponível em:

[Brasil Terrenos API](https://github.com/Cavalcant1DEV/Carrinho-de-compras-Brazil-Terrenos-backend.git)

Ela é responsável por:

- Produtos
- Estoque
- Cupons
- Compras
- Movimentações de estoque

## Build

Para gerar a versão de produção:

```bash
npm run build
```

Para executar a build:

```bash
npm run start
```

## Licença

Este projeto foi desenvolvido para fins de estudo e demonstração técnica.
