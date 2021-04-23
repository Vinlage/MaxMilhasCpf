# MaxMilhasCpf

## 1 - Tecnologias utilizadas

A - Node.js/Typescript
  A escolha do Node.js se deve ao fato de que é uma tecnologia voltada para alta demanda de operações I/O. O que faz sentido para uso de APIs e muitas requisições ao mesmo tempo. Uma outra vantagem do Node.js é sua performance em servidores web, além de ser leve ele é muito eficiente. Por fim, possui uma comunidade vasta com criações de muitos módulos, que facilita na criação e organização do código, dado que reduz muito a sua verbose.
  Além Disso, o typescript ajuda a evitar erros relacionados a tipagem, mostrando os erros referentes a tipos antes de ser transpilado.
  
B - MongoDB
  O MongoDB foi escolhido pelo fato de ter um bom desempenho, alta escalabilidade e flexibilidade, além de ser fácil de ser implementado e realizar consultas de forma simples.

C - Bibliotecas Utilizadas
 - express.js -> Para agilizar na criação de rotas e gerenciar as requisições HTTP.
 - mongoose -> Para facilitar a comunicação com o banco MongoDB através de uma maior abstração dos dados, além de propiciar um esquema de validação interna.
 - cors -> Middleware utilizado para habilitar o cors nas requisições.
 - dotenv -> Utilizado para criar variáveis de ambiente separado do código, por questões de segurança.
 - cpf -> Para realizar a validação do cpf.
 - mocha, chai, mockgoose -> Bibliotecas usadas para realizar testes unitários.

## 2 - Build e execução

A - Faça a instalação do npm ou yarn. Para instalação das dependências utilize os comandos: **yarn** ou **npm install**

B - Crie o arquivo .env na raiz e coloque suas informações de porta e uri, seguindo o exemplo:

PORT=3333
URI=mongodb://localhost:27017/database

C - Faça a build do docker e execute com os respectivos comandos:
**docker-compose build** e **docker-compose up**

D - Para executar os testes utilize **yarn test** ou **npm run test**