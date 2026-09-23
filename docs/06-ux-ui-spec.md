# UX/UI Specification

## 1. Resumo

Esta especificação transforma os requisitos aprovados em fluxos, telas, estados e padrões de interface para duas experiências: o catálogo público e o painel do dono do restaurante. O catálogo prioriza celular, descoberta rápida de produtos e encaminhamento claro para o WhatsApp. O painel concentra tarefas de gestão de cardápio e configurações sem criar perfis ou recursos fora do MVP.

As decisões de interface deste documento não introduzem checkout, pagamento, confirmação de pedido, cálculo de entrega, novo perfil de usuário ou regras avançadas de composição de produtos.

## 2. Atores e contextos de uso

| Ator | Objetivo | Contexto | Restrições de interface |
| --- | --- | --- | --- |
| Cliente | Encontrar itens, montar pedido e abrir conversa no WhatsApp. | Predominantemente celular, consulta breve e orientada por foto, preço e disponibilidade. | Sem login; loja pode estar fechada; produto pode exigir opções. |
| Dono | Manter o cardápio e as informações da loja atualizados. | Painel acessado quando necessário, em celular ou desktop. | Único administrador; ações destrutivas são permanentes. |
| DMG | Criar e entregar a instância inicial. | Processo operacional fora do painel do MVP. | Não é um perfil de interface administrativa. |

## 3. Arquitetura da informação

### 3.1 Catálogo público

```text
Catálogo
├── Cabeçalho da loja
│   ├── Logo, nome e status aberto/fechado
│   └── Informações da loja
├── Descoberta de produtos
│   ├── Busca
│   ├── Filtro de categorias
│   └── Lista de produtos
├── Configuração de item
│   ├── Variação, quando houver
│   ├── Adicionais, quando houver
│   └── Observação por item
├── Carrinho
│   ├── Itens e quantidades
│   ├── Observação geral
│   └── Encaminhamento ao WhatsApp
└── Informações institucionais
    ├── Endereço/localização
    ├── Telefone e Instagram
    └── Informações de entrega
```

### 3.2 Painel administrativo

```text
Painel
├── Login
└── Área autenticada
    ├── Produtos
    │   └── Criar/editar produto e suas opções
    ├── Categorias
    ├── Horários
    ├── Dados da loja
    │   └── Identidade, contatos e informações públicas
    └── Intenções de envio
```

### 3.3 Modelo de navegação

- **Catálogo:** página única com superfícies contextuais para configurar item e revisar carrinho. Essa decisão é derivada do uso prioritário em celular e não cria novas funcionalidades.
- **Painel em desktop:** navegação lateral persistente ou cabeçalho com links para Produtos, Categorias, Horários, Dados da loja e Intenções de envio.
- **Painel em celular:** menu compacto que abre a mesma navegação; não ocultar ações críticas em hover.
- **Retorno:** produto configurado retorna ao ponto anterior do catálogo; após salvar dados no painel, o usuário permanece no contexto em que trabalhou.

## 4. Jornadas principais

### Jornada A — Descobrir e enviar um pedido

1. Cliente abre o catálogo.
2. Confere nome da loja e status de funcionamento.
3. Pesquisa, filtra ou explora categorias.
4. Abre um produto.
5. Escolhe variação e adicionais quando existirem; inclui observação se desejar.
6. Adiciona o produto ao carrinho.
7. Revisa itens, quantidades, total e observação geral.
8. Se a loja estiver aberta, aciona o envio e é direcionado ao WhatsApp com a mensagem pré-formatada.

**Saída:** o catálogo registra a intenção de envio com data e hora. O usuário continua a conversa fora do sistema.

**Exceções:** produto esgotado/inativo, variação obrigatória ausente, carrinho vazio, loja fechada ou WhatsApp inválido bloqueiam a ação e mostram a orientação correspondente.

### Jornada B — Atualizar cardápio

1. Dono acessa o login.
2. Após autenticar, abre Produtos.
3. Cria produto ou seleciona um existente.
4. Informa dados básicos, foto, preço, disponibilidade e opções simples, quando aplicável.
5. Salva.
6. Retorna à lista com confirmação de que a alteração foi aplicada.

**Exceções:** campos obrigatórios ausentes ou valores inválidos impedem o salvamento e apresentam mensagens junto ao campo correspondente.

### Jornada C — Configurar funcionamento

1. Dono abre Horários.
2. Seleciona um dia e adiciona uma ou mais faixas de atendimento.
3. Salva as alterações.
4. A interface informa que o status público será calculado a partir daquela configuração.

**Exceção:** dia sem faixa permanece fechado; a tela não deve sugerir que uma pausa representa atendimento.

### Jornada D — Remover conteúdo

1. Dono abre produto ou categoria.
2. Aciona Excluir.
3. Lê aviso de exclusão definitiva.
4. Confirma a ação explicitamente.
5. O conteúdo deixa de aparecer no painel e no catálogo.

**Exceção para categoria com produtos:** a interface impede a confirmação e explica que os produtos vinculados precisam ser removidos ou transferidos antes. A transferência é uma apresentação possível da regra existente; sua implementação concreta permanece no planejamento técnico.

## 5. Fluxos detalhados

### 5.1 Configurar produto para o carrinho

| Etapa | Interface | Comportamento |
| --- | --- | --- |
| Abertura | Cliente toca no cartão do produto. | Abre a superfície de detalhe/configuração. |
| Leitura | Foto, nome, descrição, preço inicial e disponibilidade. | Produto esgotado ou inativo não oferece ação de adicionar. |
| Variação | Controle de escolha única, quando o produto a exige. | Exibe indicação de obrigatoriedade; ausência de escolha impede adicionar. |
| Adicionais | Lista de opções selecionáveis, quando configuradas. | Cada adicional mostra nome e acréscimo de valor quando aplicável. |
| Observação | Campo de texto opcional. | Não é pré-preenchido e permanece associado apenas ao item atual. |
| Adicionar | Botão com preço final do item, quando calculável. | Inclui item configurado no carrinho, atualiza indicador e fecha a superfície. |

### 5.2 Revisar e encaminhar pedido

| Etapa | Interface | Comportamento |
| --- | --- | --- |
| Abertura | Cliente toca no indicador do carrinho. | Exibe itens, opções, observações, quantidade, subtotal e total. |
| Ajuste | Controles de aumentar, reduzir e remover. | Recalcula valores imediatamente; item removido desaparece da lista. |
| Observação geral | Campo opcional no fim da lista. | Faz parte da mensagem ao WhatsApp. |
| Loja aberta | Ação "Continuar no WhatsApp" habilitada. | Registra data/hora e abre o link com mensagem pré-formatada. |
| Loja fechada | Aviso de horário e ação desabilitada. | O carrinho continua revisável, mas não é enviado. |
| Carrinho vazio | Estado vazio com retorno ao catálogo. | Não mostra ação de envio. |

### 5.3 Criar ou editar produto

| Grupo | Campos e controles | Regra de interface |
| --- | --- | --- |
| Dados básicos | Nome, categoria, descrição, preço e imagem. | Os campos necessários para salvar são identificados; erros ficam próximos do campo. |
| Disponibilidade | Disponível, esgotado ou inativo. | A explicação do impacto público acompanha o controle. |
| Variações | Nome de opção e preço adicional, quando houver. | A interface indica que a variação é exigida na escolha do item. |
| Adicionais | Nome de opção e preço adicional, quando houver. | A interface não apresenta regras avançadas de combinação ou limite. |
| Ações | Salvar, cancelar e excluir para produto existente. | Excluir é visualmente separado de salvar e exige confirmação. |

### 5.4 Gerenciar horários

| Etapa | Interface | Comportamento |
| --- | --- | --- |
| Visualização | Dias da semana com faixas configuradas ou estado "Fechado". | Permite entender a situação atual sem abrir cada dia. |
| Edição | Dia selecionado com início e fim de cada faixa. | Dono pode adicionar ou remover faixas. |
| Pausas | Duas ou mais faixas no mesmo dia. | A lacuna entre faixas é apresentada como período fechado. |
| Salvamento | Ação de salvar com feedback local. | Status do catálogo passa a refletir a configuração persistida. |

## 6. Inventário de telas e superfícies

| ID | Tela/superfície | Ator | Objetivo | Requisitos relacionados |
| --- | --- | --- | --- | --- |
| PUB-01 | Catálogo | Cliente | Explorar loja, categorias e produtos. | RF-001, RF-002, RF-005, RF-012 |
| PUB-02 | Configuração do produto | Cliente | Selecionar opções e adicionar item. | RF-003, RF-010, RF-011 |
| PUB-03 | Carrinho | Cliente | Revisar e encaminhar pedido. | RF-004 a RF-007 |
| PUB-04 | Informações da loja | Cliente | Consultar contatos, localização, Instagram e entrega. | RF-001, RF-012 |
| ADM-01 | Login | Dono | Autenticar-se no painel. | RF-008, RS-001, RS-002 |
| ADM-02 | Produtos | Dono | Consultar e administrar produtos. | RF-010 |
| ADM-03 | Editor de produto | Dono | Criar/editar produto, disponibilidade e opções. | RF-010, RF-011 |
| ADM-04 | Categorias | Dono | Criar, editar e excluir categorias. | RF-009, RN-005 |
| ADM-05 | Horários | Dono | Configurar dias e faixas de funcionamento. | RF-013, RN-003 |
| ADM-06 | Dados da loja | Dono | Atualizar identidade e informações públicas. | RF-012 |
| ADM-07 | Intenções de envio | Dono | Consultar datas e horas registradas. | RF-007, RF-014, RN-004 |
| SYS-01 | Confirmação de exclusão | Dono | Confirmar ação irreversível. | RN-005 |

## 7. Especificações de tela

### PUB-01 — Catálogo

**Propósito:** apresentar a loja e permitir descoberta de produtos.

**Estrutura em ordem de leitura:**

1. Cabeçalho com logo, nome da loja e indicador textual de aberto/fechado.
2. Resumo curto de horários ou aviso de indisponibilidade quando fechado.
3. Busca por produtos.
4. Filtro horizontal ou seletor de categorias, com estado ativo claro.
5. Grade/lista de cartões de produto agrupados pela categoria ativa.
6. Acesso persistente ao carrinho, quando houver itens.
7. Bloco de informações institucionais ao fim do catálogo.

**Ações primárias:** buscar, filtrar, abrir produto e abrir carrinho.

**Estados relevantes:** carregando catálogo, catálogo sem produtos ativos, busca sem resultado, filtro aplicado, loja aberta, loja fechada e erro de carregamento.

**Responsividade:** em celular, sequência de uma coluna e filtro rolável horizontalmente quando necessário; em desktop, múltiplos cartões por linha e largura de conteúdo controlada.

### PUB-02 — Configuração do produto

**Propósito:** apresentar detalhes e recolher apenas as escolhas confirmadas para a composição do item.

**Estrutura:** botão de fechar/voltar, imagem, nome, descrição, preço inicial, variação obrigatória quando houver, adicionais quando houver, observação por item e ação de adicionar.

**Forma recomendada:** drawer/modal de base no celular e modal ou painel lateral no desktop. É uma decisão derivada para preservar o contexto da lista.

**Estados relevantes:** produto disponível, produto esgotado, imagem ausente, variação obrigatória sem seleção, item pronto para adicionar e erro ao carregar informações.

**Feedback:** ao adicionar, atualizar o contador/valor do carrinho e apresentar confirmação curta, sem afirmar que o pedido foi realizado.

### PUB-03 — Carrinho

**Propósito:** permitir revisão final antes de abrir o WhatsApp.

**Estrutura:** título, itens com opções e observações, ajuste de quantidade, remoção, subtotal, total, observação geral, status de loja e ação de encaminhamento.

**Ação principal:** "Continuar no WhatsApp" acompanhada de indicação do destino.

**Estados relevantes:** vazio, com itens, item removido, loja fechada, WhatsApp não configurado, total atualizado e abertura de link iniciada.

**Regra de linguagem:** não usar "finalizar compra", "pedido confirmado" ou equivalentes. O botão deve deixar claro que a etapa seguinte é o WhatsApp.

### PUB-04 — Informações da loja

**Propósito:** disponibilizar os dados públicos configurados sem competir com o cardápio.

**Estrutura:** endereço/localização, telefone, Instagram, informações de entrega e horário. Pode ser um bloco no rodapé do catálogo e não precisa constituir uma rota própria no MVP.

**Estados relevantes:** campo não configurado não deve gerar espaço vazio; somente as informações existentes são exibidas.

### ADM-01 — Login

**Propósito:** proteger o painel e iniciar uma sessão do dono.

**Estrutura:** marca da instância, título de acesso administrativo, campos de usuário e senha, ação de entrar e mensagens de erro.

**Estados relevantes:** inicial, preenchendo, credenciais inválidas, enviando e acesso permitido.

**Acessibilidade:** rótulos persistentes, associação programática entre campos e erros, foco no primeiro erro após tentativa inválida e submissão por teclado.

### ADM-02 — Produtos

**Propósito:** concentrar a manutenção diária do cardápio.

**Estrutura:** título, ação "Novo produto", busca ou filtro interno se necessário para listas extensas, lista de produtos com imagem pequena opcional, nome, categoria, preço, disponibilidade e editar.

**Estados relevantes:** lista preenchida, sem produtos, carregando, erro de carregamento e confirmação de alteração salva.

**Ação contextual:** o estado de disponibilidade deve ser perceptível e editável no contexto de cada produto, sem depender apenas da imagem.

### ADM-03 — Editor de produto

**Propósito:** criar ou atualizar um produto completo.

**Estrutura:** cabeçalho de criação/edição, formulário de dados básicos, imagem, disponibilidade, variações, adicionais, ações de salvar/cancelar e área de exclusão para produtos existentes.

**Estados relevantes:** novo, editando, validação inválida, salvando, salvo, erro de salvamento e confirmação de exclusão.

**Comportamento:** cancelar uma edição com alterações não salvas deve pedir confirmação antes de descartar. Esta é uma decisão de interface derivada e não altera a regra de negócio.

### ADM-04 — Categorias

**Propósito:** manter a estrutura organizacional do catálogo.

**Estrutura:** lista ordenada de categorias, ação de nova categoria e ações de editar/excluir por linha.

**Estados relevantes:** preenchida, sem categorias, editando nome, erro de validação, categoria vinculada a produto e confirmação de exclusão.

**Comportamento de categoria vinculada:** antes da exclusão, mostrar a quantidade/identidade dos produtos vinculados quando essa informação estiver disponível e impedir a confirmação até o tratamento necessário.

### ADM-05 — Horários

**Propósito:** controlar o estado aberto/fechado do catálogo.

**Estrutura:** visão semanal, resumo do status atual, controle por dia, faixas de horário e ação de salvar.

**Estados relevantes:** dia fechado, dia com uma faixa, dia com pausa entre faixas, edição inválida, salvando e salvo.

**Validação:** início e fim são obrigatórios para cada faixa; a interface deve informar erro quando a configuração não puder representar uma faixa válida. A definição técnica das validações de horário pertence ao planejamento técnico.

### ADM-06 — Dados da loja

**Propósito:** permitir personalização e manutenção dos dados exibidos publicamente.

**Estrutura:** seções para identidade (nome, logo, cores), contatos (WhatsApp, telefone, Instagram), localização/endereço e informações de entrega.

**Estados relevantes:** inicial, editando, imagem de logo ausente, número de WhatsApp inválido, salvando, salvo e erro de salvamento.

**Regra de feedback:** número de WhatsApp ausente ou inválido deve receber aviso claro de que o catálogo não poderá iniciar o encaminhamento de pedidos.

### ADM-07 — Intenções de envio

**Propósito:** apresentar o registro operacional mínimo permitido pelo MVP.

**Estrutura:** título "Intenções de envio", explicação breve de que o registro indica somente o clique que abriu o WhatsApp, e lista de data/hora.

**Estados relevantes:** histórico preenchido, sem registros, carregando e erro de carregamento.

**Limites de conteúdo:** não incluir item, valor, observação, contato de cliente ou status de pedido.

### SYS-01 — Confirmação de exclusão

**Propósito:** evitar perda acidental de produto ou categoria.

**Estrutura:** título direto, nome do item, aviso de permanência, ação secundária de cancelar e ação destrutiva de excluir.

**Comportamento:** foco inicial na alternativa segura; confirmação explícita necessária antes da exclusão definitiva.

## 8. Comportamentos de interação

| Área | Comportamento |
| --- | --- |
| Busca pública | Atualiza a lista para produtos compatíveis e informa ausência de resultado. O termo permanece visível enquanto aplicado. |
| Filtros de categoria | Seleção única por vez; a categoria ativa é indicada visualmente; remoção retorna à listagem completa. |
| Disponibilidade | Esgotado/inativo não oferece caminho de adição. A mensagem explica o estado sem depender apenas de cor. |
| Variação obrigatória | O botão de adicionar permanece indisponível ou orienta o usuário até a seleção; o requisito pendente é indicado junto ao controle. |
| Adicionais | Seleções atualizam o valor do item antes de adicionar ao carrinho. |
| Quantidade | Incremento, redução e remoção atualizam subtotal e total no mesmo contexto. |
| Envio para WhatsApp | Somente carrinho válido e loja aberta permitem a ação; após o clique, registrar intenção e solicitar abertura do link. |
| Formulários administrativos | Salvar mostra progresso local, resultado de sucesso ou erro acionável; erros de campo são próximos ao respectivo controle. |
| Exclusão | Sempre exige confirmação explícita. |
| Sair/cancelar edição | Alterações não salvas recebem confirmação antes de serem descartadas. |

## 9. Matriz de estados e casos de borda

| Contexto | Estado | Interface esperada |
| --- | --- | --- |
| Catálogo | Carregando | Estrutura de carregamento que preserve a hierarquia de busca, categoria e cartões. |
| Catálogo | Sem produtos ativos | Mensagem clara e sem carrinho de compra aparente como disponível. |
| Busca | Sem resultados | Mostrar termo buscado, orientação para limpar busca ou mudar categoria. |
| Loja | Fechada | Status e horário informado; catálogo navegável; ação de WhatsApp bloqueada. |
| Produto | Esgotado/inativo | Estado textual e visual; adição bloqueada. |
| Produto | Sem imagem | Placeholder neutro que mantenha altura e hierarquia do cartão. |
| Produto | Variação ausente | Mensagem junto ao controle obrigatório; item não é adicionado. |
| Carrinho | Vazio | Explica que nenhum item foi adicionado e oferece retorno ao catálogo. |
| Carrinho | WhatsApp inválido/ausente | Bloqueia ação e orienta a corrigir a configuração; não tenta abrir link. |
| Carrinho | Item removido | Total atualizado; se o último item sair, muda para estado vazio. |
| Login | Credenciais inválidas | Mensagem geral sem revelar qual campo está incorreto. |
| Painel | Sem produtos/categorias/histórico | Estado vazio explica a situação e apresenta ação compatível quando aplicável. |
| Painel | Erro ao salvar | Preserva valores preenchidos e exibe mensagem de tentativa/revisão. |
| Categoria | Com produtos vinculados | Bloqueia exclusão e explica o tratamento necessário. |
| Exclusão | Confirmação | Explicita que a exclusão é permanente e diferencia a ação destrutiva. |

## 10. Sistema de componentes

| Componente | Uso | Variações e regras |
| --- | --- | --- |
| Cabeçalho da loja | Identidade e funcionamento do catálogo. | Logo, nome e status textual; compacto durante exploração conforme decisão do UX/UI. |
| Status de loja | Comunicar aberto/fechado. | Aberta e fechada; texto + cor + ícone opcional. |
| Busca | Localizar produtos. | Vazia, preenchida, com ação de limpar e sem resultados. |
| Filtro de categoria | Restringir a lista. | Padrão, selecionado e foco visível. |
| Cartão de produto | Exibir produto no catálogo. | Disponível, esgotado, inativo e sem imagem. |
| Superfície de produto | Configurar um item. | Com/sem variação, com/sem adicionais, validação e indisponível. |
| Controle de quantidade | Alterar unidades no carrinho. | Reduzir, aumentar e remover; todos com rótulo acessível. |
| Indicador de carrinho | Mostrar itens e total durante a navegação. | Vazio e preenchido; não substituir o carrinho completo. |
| Resumo de pedido | Revisão de itens e total. | Aberto, fechado, vazio e WhatsApp indisponível. |
| Campo de formulário | Coletar dados e configurações. | Inicial, foco, preenchido, erro, desabilitado e sucesso quando aplicável. |
| Seletor de disponibilidade | Atualizar estado de produto. | Disponível, esgotado e inativo com explicação textual. |
| Faixa de horário | Editar início e fim de atendimento. | Completa, inválida e removível. |
| Lista administrativa | Produtos, categorias e histórico. | Carregando, preenchida, vazia e erro. |
| Diálogo de confirmação | Proteger exclusão e descarte. | Destrutivo e descarte de edição; foco inicial em cancelar. |
| Mensagem de feedback | Confirmar ação local ou orientar falha. | Sucesso, erro e aviso; sem linguagem de pedido concluído. |

## 11. Comportamento responsivo

| Área | Celular | Tablet e desktop |
| --- | --- | --- |
| Catálogo | Coluna única; filtros horizontais; carrinho em barra fixa ou acesso fixo; configuração em drawer de base. | Grade de produtos; área de carrinho pode aparecer em painel lateral quando houver espaço; configuração em modal ou painel lateral. |
| Cabeçalho público | Identidade compacta e status próximo ao nome. | Maior respiro, sem aumentar desproporcionalmente o cabeçalho. |
| Carrinho | Revisão em superfície dedicada e controles de toque confortáveis. | Resumo lateral ou modal, mantendo lista de produtos acessível quando possível. |
| Painel | Menu compacto; listas com informações essenciais; editor em uma coluna. | Navegação persistente; listas mais densas; editor pode organizar grupos em colunas sem separar campos relacionados. |
| Formulários | Rótulos e controles empilhados; ações sempre visíveis. | Campos relacionados podem compartilhar linha, mantendo leitura e erro claros. |

## 12. Acessibilidade

- Todo controle interativo deve ter nome acessível e foco visível.
- A ordem de foco acompanha a ordem lógica de leitura e não deve ficar presa em drawer, modal ou diálogo.
- Ao abrir configuração de produto, carrinho ou confirmação, o foco vai para o título ou primeira ação relevante; ao fechar, retorna ao elemento que abriu a superfície.
- Campos obrigatórios são identificados por texto, e erros são apresentados junto ao campo com associação programática.
- Busca, filtro, quantidade, variação, adicional e remoção devem ser utilizáveis por teclado além de toque.
- Ação de WhatsApp, loja fechada, indisponibilidade e validação de opção usam texto além de cor ou ícone.
- Preços, total e horários precisam de leitura inequívoca por tecnologias assistivas.
- Transições respeitam redução de movimento e não são necessárias para compreender mudanças de estado.
- As cores personalizadas de cada instância devem ser verificadas quanto a contraste antes da publicação.

## 13. Conteúdo e microcopy

### Princípios

- Usar frases curtas, diretas e voltadas à ação.
- Nomear o estado com precisão: "Loja fechada", "Produto esgotado", "Escolha uma opção".
- Distinguir o encaminhamento de WhatsApp de uma confirmação de pedido.
- Evitar jargão técnico e linguagem de marketplace.

### Textos orientadores

| Situação | Microcopy sugerida | Status |
| --- | --- | --- |
| Loja aberta | "Aberto agora" | Derivado |
| Loja fechada | "A loja está fechada no momento. Você ainda pode consultar o cardápio." | Derivado |
| Produto indisponível | "Indisponível no momento" | Derivado |
| Variação obrigatória | "Escolha uma opção para continuar" | Derivado |
| Carrinho vazio | "Seu carrinho está vazio" | Derivado |
| Encaminhamento | "Continuar no WhatsApp" | Derivado, compatível com RF-006 |
| Histórico | "Este registro indica apenas que o WhatsApp foi aberto." | Derivado, compatível com RN-004 |
| Exclusão | "Esta ação exclui o item definitivamente." | Derivado, compatível com RN-005 |

## 14. Decisões de UX/UI

| Decisão | Status | Racional | Impacto |
| --- | --- | --- | --- |
| Catálogo em página única com superfícies contextuais | Derivada | Mantém descoberta, configuração e carrinho próximos em mobile. | PUB-01 a PUB-03. |
| Produto configurado em drawer/modal | Derivada | Preserva a posição na lista de produtos. | PUB-02. |
| Carrinho com indicador persistente quando preenchido | Confirmada em intenção; derivada na forma | O carrinho deve permanecer acessível durante a navegação. | PUB-01 e PUB-03. |
| Painel sem dashboard obrigatório | Derivada | Produtos é a tarefa administrativa prioritária e não há requisito de métricas. | ADM-02 como entrada pós-login. |
| Histórico denominado "Intenções de envio" | Derivada | Evita sugerir confirmação ou venda concluída. | ADM-07. |
| Confirmação antes de descartar edição não salva | Derivada | Evita perda acidental de preenchimento sem criar novo dado ou regra. | ADM-03 e formulários. |
| Categoria com produtos bloqueia exclusão | Confirmada | Mantém consistência com RF-009. | ADM-04 e SYS-01. |

## 15. Questões em aberto e encaminhamentos

| Questão | Impacto | Encaminhamento |
| --- | --- | --- |
| Tipografia concreta e tokens visuais finais | Não bloqueia fluxos, mas define acabamento da interface. | UX/UI detalhado e design system. |
| Política de backup, recuperação e retenção | Não altera telas do MVP, exceto possíveis mensagens administrativas futuras. | Planejamento técnico. |
| Formato e validação técnica do número de WhatsApp | Afeta a mensagem de erro e a prevenção de envio inválido. | Planejamento técnico. |
| Regras técnicas de validação de faixas de horário | Afeta o texto de erro no formulário. | Planejamento técnico. |
| Tema escuro | Não solicitado para o MVP. | Manter fora do escopo até nova decisão. |

## 16. Rastreabilidade aos requisitos

| Requisitos | Cobertura de UX/UI |
| --- | --- |
| RF-001 e RF-002 | PUB-01, busca, categorias, cartões e informações de loja. |
| RF-003 e RF-011 | PUB-02 e Editor de produto. |
| RF-004 a RF-007 | PUB-03, fluxo de envio e estados de carrinho/loja. |
| RF-008 | ADM-01 e proteção de rotas administrativas. |
| RF-009 e RN-005 | ADM-04 e SYS-01. |
| RF-010 | ADM-02 e ADM-03. |
| RF-012 | PUB-01/PUB-04 e ADM-06. |
| RF-013 e RN-003 | PUB-01/PUB-03 e ADM-05. |
| RF-014, RN-004, RD-003 e RS-003 | ADM-07 e seus limites de conteúdo. |
| RNF-001 | Seção de comportamento responsivo. |
| RNF-002 | Hierarquia, componentes e microcopy coerentes com a direção visual. |

## 17. Rastreabilidade à direção visual

| Direção visual | Aplicação de UX/UI |
| --- | --- |
| Comida primeiro | Foto domina cartão e superfície de produto; dados críticos seguem legíveis. |
| Clareza antes de ornamento | Busca, filtros, status, preço e carrinho priorizados na hierarquia. |
| Personalização com estrutura estável | Mesmos componentes e fluxos entre instâncias; logo, cores e conteúdo configuráveis. |
| Ação sem falsa promessa | Linguagem e fluxo encerram no WhatsApp, sem simular checkout ou confirmação. |
| Mobile-first | Drawer de produto, acessos persistentes e coluna única em telas pequenas. |
| Painel funcional | Navegação por tarefas, formulários agrupados e listas orientadas a manutenção. |

## 18. Handoff para aprovação e implementação

1. Validar esta especificação antes de iniciar wireframes ou implementação.
2. Criar wireframes de alta prioridade para PUB-01, PUB-02, PUB-03, ADM-02, ADM-03 e ADM-05.
3. Definir design tokens concretos de cor, tipografia, espaçamento, raio, foco e estados a partir de `docs/05-visual-spec.md`.
4. Produzir conteúdo demonstrativo que cubra produto simples, produto com opções, produto esgotado, loja fechada e carrinho preenchido.
5. No planejamento técnico, resolver validação de WhatsApp, horários, autenticação, persistência e publicação sem mudar os fluxos aprovados.
