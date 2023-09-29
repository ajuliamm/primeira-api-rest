# Primeira API REST

Este projeto consiste na criação de uma API REST que simula um Banco Digital. A API foi desenvolvida como parte do desafio do Módulo 2 do curso de backend da Cubos Academy. Ela oferece uma variedade de funcionalidades para gerenciar contas bancárias, realizar transações e consultar informações de saldo e extrato.

## Funcionalidades
A API oferece as seguintes funcionalidades:
-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário


## Estrutura do projeto

O código deste projeto está organizado da seguinte forma:

- `index.js`: Arquivo principal da aplicação.
- `rotas.js`: Arquivo de definição das rotas da API.
- Pasta `controladores`: Contém os controladores responsáveis por tratar as requisições.
- `intermediários.js`: Arquivo que define funções intermediárias para validação e autenticação.

## Endpoints da API
Aqui estão os endpoints disponíveis na API:

### Listar contas bancárias
- Método: GET
- Rota: /contas
- Parâmetros: senha_banco - Senha do banco para autenticação
- Descrição: Lista todas as contas bancárias existentes.

### Criar conta bancária
- Método: POST
- Rota: /contas
- Descrição: Cria uma conta bancária, gerando um número único de identificação.

  #### Exemplo de Requisição

```javascript
// POST /contas
{
    "nome": "Foo Bar 2",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar2.com",
    "senha": "12345"
}
```

### Atualizar usuário da conta bancária
- Método: PUT
- Rota: /contas/:numeroConta/usuario
- Descrição: Atualiza os dados do usuário de uma conta bancária específica.

#### Exemplo de Requisição
```javascript
// PUT /contas/:numeroConta/usuario
{
    "nome": "Foo Bar 3",
    "cpf": "99911122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar3.com",
    "senha": "12345"
{
```

### Excluir Conta
- Método: DELETE
- Rota: /contas/:numeroConta
- Descrição: Exclui uma conta bancária existente.

### Depositar
- Método: POST
- Rota: /transacoes/depositar
- Descrição: Realiza um depósito em uma conta válida e registra a transação.

#### Exemplo de Requisição
```javascript
// POST /transacoes/depositar
{
	"numero_conta": "1",
	"valor": 1900
}
```

### Sacar
- Método: POST
- Rota: /transacoes/sacar
- Descrição: Realiza um saque em uma conta bancária e registra a transação.

- #### Exemplo de Requisição
```javascript
// POST /transacoes/sacar
{
	"numero_conta": "1",
	"valor": 1900,
    "senha": "123456"
}
```

### Transferir
- Método: POST
- Rota: /transacoes/transferir
- Descrição: Permite a transferência de recursos entre contas bancárias e registra a transação.

#### Exemplo de Requisição
```javascript
// POST /transacoes/transferir
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
}
```

### Saldo
- Método: GET
- Rota: /contas/saldo
- Parâmetros: numero_conta - Número da conta, senha - Senha do usuário
- Descrição: Retorna o saldo de uma conta bancária.

### Extrato
- Método: GET
- Rota: /contas/extrato
- Parâmetros: numero_conta - Número da conta, senha - Senha do usuário
- Descrição: Lista as transações realizadas em uma conta específica.


  
##### Exemplo de Resposta do Extrato
![image](https://github.com/ajuliamm/primeira-api-rest/assets/93016620/18f0fe16-7260-4632-8fae-32e804663ff8)




## Executando o Projeto
Para executar este projeto, siga os passos abaixo:

1. Clone este repositório.
2. Instale as dependências necessárias com o comando: npm install.
3. Inicie a aplicação com: `npm run dev`.

Este projeto foi desenvolvido no contexto do curso de backend da Cubos Academy, com o intuito de fornecer um exemplo de API REST para um Banco Digital. Sinta-se à vontade para usá-lo como base para seus próprios projetos ou estudos.

###### tags: `back-end` `módulo 2` `nodeJS` `API REST` `desafio`
