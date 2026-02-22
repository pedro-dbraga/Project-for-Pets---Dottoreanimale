API REST desenvolvida em Node.js e MySQL para gerenciamento de usuários, famílias e pets.

O sistema permite controle de permissões por papel (admin/member), gerenciamento de vacinas, tarefas e convites familiares.

Backend organizado em camadas - model | service layer | controller.

* Autenticação JWT

* Soft Delete vs Hard Delete
   Exemplo de regra aplicada:

   Ao deletar uma família:

   Se houver pets vinculados → Soft Delete

   Se não houver dependências → Hard Delete
   Decisão baseada nas dependências das tabelas.

* Transaction 
  Uso de transações para garantir integridade dos dados.

  Exemplo:

  Ao criar uma família:

  Cria-se automaticamente o membro admin inicial.

  Caso a criação de um falhe → nenhum registro é persistido.

  Regra:

  Família não pode existir sem membro.
  Membro não pode existir sem família.

* Controle de status = Active | Pending | Deleted | Completed 


Fluxo do Usuario

Cenário 1 – Usuário sem família

Pode criar um pet (family = null)

Pode cadastrar vacinas

Pode criar tasks:

Future → Pending

Concluída → Completed

Cenário 2 – Usuário cria uma família

 Ao criar uma família:

 O criador se torna Admin automaticamente

 Permissões do Admin:

 Criar pets

 Atualizar vacinas

 Atualizar tasks de qualquer membro

 Deletar informações

 Enviar convites

 Permissões do Membro:

 Gerenciar apenas suas próprias tasks

 Não pode deletar dados globais

 Convites:

 Usuário convidado não precisa estar cadastrado para receber convite

 Porém precisa criar conta para aceitar
