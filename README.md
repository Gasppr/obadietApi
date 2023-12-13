# OBA - ObaDiet 


### _Aplicativo criado para auxiliar na criação de rotinas de alimentação orientado a usuários com enfermidades crônicas, desenvolvido em Ionic Framework._

### Tecnologias 
- Front-end

[![Link do Ionic Framework](https://img.shields.io/badge/Ionic-%233880FF.svg?style=for-the-badge&logo=Ionic&logoColor=white)](https://ionicframework.com/)

- Back-end

[![Link do Nestjs](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://sequelize.org)
[![Link do Nestjs](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)]((https://swagger.io/))
[![Maria DB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.org/)

- Design 

[![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/)

- Biblioteca 

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

- Plataformas de Hosting

[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

- Ambiente de desenvolvimento 

[![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)

- Plataformas e controle de versionamento

[![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)
[![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)](https://gitlab.com/)
[	![Gitpod](https://img.shields.io/badge/gitpod-f06611.svg?style=for-the-badge&logo=gitpod&logoColor=white)](https://gitpod.io/)

## Como começar


### Configurações: 

- Ao ter o projeto em seu ambiente, o usuário deve iniciar executando o comando de download da Node_modules no terminal onde se localiza a pasta do projeto. Para o uso das variadas dependências que o projeto usa para sua execução.

O comando para instalar a Node_modules e dependências principais:

```sh
npm run all 
```
<img src="tcc/src/assets/images/readme_Imagens/npmRunAll.png">


#### Após Instalar a pasta Node_modules 

O próximo passo é entrar na pasta do projeto principal "_tcc_"

```sh
 cd tcc 
```
<img src="tcc/src/assets/images/readme_Imagens/cdTCC.png">

O usuário agora pode executar o projeto mobile pelo navegador, usando os comandos:

```sh
 ionic serve
```
<img src="tcc/src/assets/images/readme_Imagens/IonicServe.png">




# API
## Opcional: 
### _Se o usuário não quiser usar o banco de dados e API que está sendo consumida(obadiet.vercel.app) pelo app. Existe a possibilidade de usar outro banco de dados com a mesma estrutura_

 - O aplicativo consome uma API onde usa  suas rotas para extrair os dados buscado pelo banco de dados.

- Por isso aconselhamos que tenha experiência para fazer essa troca e sincronização de estrutura igual já usada.

### Credenciais do Banco de dados

- O funcionamento do app em maior parte precisa de um banco de dados para o seu uso, assim, o usuário precisa preencher as informações do seu banco de dados no arquivo "_.env_" encontrado na pasta "_api-oba-diet_ ".

<img src="tcc/src/assets/images/readme_Imagens/Imagem_.env.png">


### sendo os dados: 
 - Nome do host do banco de dados
 - Senha do banco dados
 - Nome do banco de dados
 - Porta do banco de dados
 - Url do banco de dados


 ## Executando a API...

- Os comandos para executar a API é simples
  - 1º Entre na pasta da API :
  ```sh
   cd api-oba-diet
  ```
  <img src="tcc/src/assets/images/readme_Imagens/cdAPI.png">

    - 2º Baixe as dependências da API:
  ```sh
    npm i 
  ```
   <img src="tcc/src/assets/images/readme_Imagens/npmI.png">

  - 3º Execute a API:
  ```sh
    npm run start:dev
  ```
   <img src="tcc/src/assets/images/readme_Imagens/executandoAPI.png">


- ### _OBS: Retire todos os links da API encontrados na pasta do projeto _tcc_ para o uso da sua API_

  - Na pasta "_tcc_", na subpasta "_services_"  
<img src="tcc/src/assets/images/readme_Imagens/services.png">

  - Retire os links da variável URL e coloque a sua
<img src="tcc/src/assets/images/readme_Imagens/linkDasServices.png"> 


# Criadores do projeto:
   - ## Paulo Roberto(@PauloRoberto_Gaspp/@gaspop25 - Gitlab)
   - ## Mariana Ayumi (@marianakonno - Gitlab)
   - ## Rinaldo(@RinaldoSantos - Gitlab)
   - ## Luis Felippe(@Lima_Felippe - Gitlab)