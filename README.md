Desafio técnico: BR PARTNERS Data para conclusão: 11/10
Construa um simples CRUD de clientes.
1. Inicie o projeto com pnpm e o Vite, utilizando o preset Typescript React.
2. Remova os arquivos desnecessários.
3. Instale o MSW e configure o worker.
4. Faça a instalação do Zod.
5. Defina o schema de seus clientes com o Zod. O cliente pode ser PF ou PJ, tendo nome
e CPF quando PF e nome fantasia, razão social e CNPJ. Adicionalmente teremos email e telefone (com DDD e começando por 9) que devem ser validados pelo schema.
6. Defina os handlers do MSW de acordo com o seu schema. Você deve ter um Map para armazenar os clientes e implementar os métodos GET, POST, PUT e DELETE. Este Map deve ser salvo no sessionStorage para que seja persistido ao atualizar a página. É recomendado criar uma classe extendendo a classe Map e manipular o sessionStorage no método construtor, set e remove.
7. Faça a instalação do MUI e styled-components, configurando o MUI para utilizá-lo ao invés do Emotion. Instale também o Tanstack Query (antigo React Query) e o React Router DOM e configure as rotas.
8. Construa a listagem de clientes. Deve existir um estado de erro e um quando nenhum dado está cadastrado. Na tabela, deve existir um botão de editar e um de deletar. O de editar deve redirecionar para uma nova página e o de deletar deve abrir um modal de confirmação. Utilizar o fetch do navegador para fazer a requisição e validar o corpo para POST/PUT e a resposta para GET com o schema do Zod criado anteriormente.
9. Instale o react-hook-form.
10. Construa uma página nova para criação de cliente. Se o tipo do cliente for PF, deve existir um campo Nome e se for PJ, Nome Fantasia e Razão Social. Validar o documento, email e telefone com o react-hook-form. Mostrar feedback ao usuário no sucesso ou erro na criação.
11. Construa uma página nova para edição de cliente. A página deve conter o ID do cliente na URL. Deve suportar o reload da página, onde irá mostrar um estado de carregamento e os dados do cliente se existir, ou uma página de erro se não existir.
12. Utilize o Jest e Testing Library para criar testes de integração utilizando o MSW, com no mínimo 80% de cobertura.
O projeto deve ser publicado no GitHub em um repositório público. Os commits devem seguir a especificação Conventional Commits, com commits pequenos e mensagens significativas.