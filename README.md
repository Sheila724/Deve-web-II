# Jogo de um Duelo Épico entre Dynamis e Erinys em Vue.js e conta com o Banco de Dados Azure

**Este é o README para o jogo "Duelo Épico", que está conectado a um banco de dados hospedado na plataforma Microsoft Azure, este documento fornece informações sobre o jogo e o banco de dados**

**Domine os Poderes**

Duelo Épico é um jogo de aventura onde o jogador assume o papel de uma heroína em uma batalha para salvar o reino do terrível vilão. Com uma boa batalha e o uso de lógica, os jogadores devem vencer o poderoso vilão para alcançar a vitória e salvar o reino
![image](https://github.com/Sheila724/Deve-web-II/assets/135647046/03b14960-5b1a-4048-9ea6-f129dd1fdcaa)


**Aqui temos o site onde foi desenvolvido nossa paleta de cores**
https://color.adobe.com/pt/create/image
![image](https://github.com/Sheila724/Deve-web-II/assets/135647046/f5172ffd-9d24-41d6-be47-535caff8bd19)


**Requisitos para a Batalha**

- Node.js
- NPM (Node Package Manager)
- Navegador da Web

**Invoque o Duelo**

1. Clone este repositório para o seu ambiente local:

```
git clone git clone https://github.com/Sheila724/Deve-web-II
```

2. Navegue até o diretório do projeto:

   ```
   cd nome-do-repositorio como por exemplo: (C:\Users\Sheila\Documents\GitHub\Deve-web-II>) 
   ```

3. Instale as dependências do projeto:

   ```
   npm install
   ```

### Configuração do Banco de Dados Azure

1. Acesse o [portal do Azure](https://portal.azure.com/) e faça login na sua conta.
2. Crie um novo banco de dados SQL Azure, caso tenha dúvidas em como criar segue o link de um vídeo com o [passo a passo](https://www.youtube.com/watch?v=pn72xKChSJQ)
3. Uma informação importante, anote as suas credenciadas de conexão (nome do servidor, nome do banco de dados, nome de usuário e senha).
4. Após criar sua conta e o seu banco de dados você pode criar as tabelas direto no Microsoft Azure ![image](https://github.com/Sheila724/Deve-web-II/assets/135647046/45499907-7247-4dec-ad17-50533c0a07c8)
ou pelo SQL Server, na tela conectar com o servidor, na opção **Nome do servidor:** coloque o nome do servidor que gerou quando você criou o banco de dados na Azure:  e![image](https://github.com/Sheila724/Deve-web-II/assets/135647046/6dab3ee5-3fa8-4fab-9680-3c6f0d4fc3ac) ainda no SQL Server na opção **Autenticação:** altera para **Autenticação do SQL Server**
irá te pedir um login e senha, esse login e senha, são os mesmos das suas credencias de conexão.
![image](https://github.com/Sheila724/Deve-web-II/assets/135647046/d9d66c93-b2bb-41ab-beb5-9a0328017706).
Independente da forma que for criada as tabelas no final será possível visualiza-las por aqui
![image](https://github.com/Sheila724/Deve-web-II/assets/135647046/5be26a9c-5ee2-443e-a44f-24bf2c553c11)

### Configuração do Projeto

1. Renomeie o arquivo `.env.example` para `.env`.
2. Preencha as variáveis de ambiente no arquivo `.env` com as credenciais do seu banco de dados Azure.

## Tela de Login e Cadastro

O jogo possui um sistema de autenticação que permite aos jogadores criar uma conta ou fazer login para acessar seus perfis salvos. A tela de login permite que os jogadores ingressem com suas credenciais de usuário e senha, enquanto a tela de cadastro permite que novos jogadores se registrem fornecendo informações básicas.
![image](https://github.com/Sheila724/Deve-web-II/assets/135647046/3b28688f-1104-43a4-8f81-765865c2b193)

![image](https://github.com/Sheila724/Deve-web-II/assets/135647046/b43759fd-501c-425d-ba1f-13ee7d132012)

## Execução

Para iniciar o servidor do jogo, execute o seguinte comando:

```
npm start
```

Isso iniciará o servidor e o jogo estará disponível no navegador da web em `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Contato

Se você tiver dúvidas ou precisar de assistência, entre em contato com sheila.araujo486@gmail.com

**E prepare-se para um duelo épico!**

