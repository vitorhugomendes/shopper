# :page_with_curl: Aplicação para atualização de preço de produtos

Uma ferramenta para atualizar os produtos de um banco de dados através de um arquivo .csv. Com uma interface simples e intuitiva, o usuário pode subir o arquivo, clicar para validá-lo e, caso esteja tudo certo, alterar os preços dos produtos.

A validação segue as seguintes regras:

* O arquivo deve conter as colunas product_code e new_price, respectivamente com o código do produto e o novo preço do produto em valores números. É possível alterar mais de um produto de uma só vez.
* O novo preço do produto não pode ser inferior ao preço de custo.
* O novo preço do produto não pode ser 10% maior ou menor do que o preço atual.
* Caso o produto faça parte de um pacote, é preciso enviar o novo preço do pacote. 
* O contrário também é válido, alterando o preço total do pacote é preciso enviar as informações do produto que será modificado para que não haja irregularidades com o valor total do pacote.

Caso haja algum erro na validação, aparecerá na tabela de produtos enviados. Caso esteja tudo certo, o botão de "atualizar" será habilitado, liberando a atualização do banco de dados.

# :open_file_folder: Tecnologias e bibliotecas utilizadas

:hammer: Backend:
* NodeJs
* Express
* Typescript
* MySQL
* Cors
* Dotenv

:axe: Frontend:
* React
* Typescript
* StyledComponents
* Axios
* Papaparse
* Toastify
* Uuid

# :loudspeaker: Instruções

Esse é um monorepo, contendo tanto o backend quanto o frontend. Os detalhes e as intruções para instalação contidas nesse README também estão separadas no README de cada parte. Para acessá-las basta clicar no título.

* Faça o clone desse repositório
* Acesse a pasta (backend ou frontend)

# :hammer: [Backend](https://github.com/vitorhugomendes/shopper/blob/develop/backend/README.md)

* MySQL versão 8
* Node versão 18.5
* Crie o banco de dados que será usado no MySQL
* Acesse e execute as queries que estão contidas em [src/database/database.sql](https://github.com/vitorhugomendes/shopper/blob/develop/backend/src/database/database.sql)
* Abra o terminal e certifique-se de que está na pasta do backend
* Execute o comando de instalação: npm install
* Crie um arquivo .env seguindo o exemplo do [.env.example](https://github.com/vitorhugomendes/shopper/blob/develop/backend/.env.example) para preencher corretamente as variáveis de ambiente.
* Execute o comando para rodar a API: npm run dev


# :axe: [Frontend](https://github.com/vitorhugomendes/shopper/blob/develop/frontend/README.md)

* Abra o terminal e certifique-se de que está na pasta do frontend
* Execute o comando de instalação: npm install
* Execute o comando para rodar o React: npm run dev
* Certifique-se de que o servidor do backend está ligado.
