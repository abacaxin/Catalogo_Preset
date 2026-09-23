# Master Prompt

## 1. Identidade do projeto

- **Nome:** Catálogo Restaurante.
- **Produto:** template replicável de catálogo digital para restaurantes, entregue como instância própria e personalizada por cliente.
- **Responsável pelo produto e entrega:** DMG.
- **Propósito:** substituir cardápio físico por catálogo online que permite descobrir produtos, montar um pedido e abrir uma conversa no WhatsApp do restaurante.
- **Estado atual:** descoberta, requisitos, direção visual e UX/UI consolidados. Não há código, repositório Git, arquitetura técnica, stack, modelo físico de dados, contrato de API ou aprovação comercial formal no diretório atual.

## 2. Objetivo

Construir uma primeira instância demonstrativa, com conteúdo fictício, de um catálogo responsivo e administrável. O visitante deve conseguir consultar o cardápio, configurar produtos simples, montar o carrinho e continuar o pedido no WhatsApp. O dono deve conseguir manter cardápio, categorias, horários, dados públicos e identidade visual pelo painel protegido por autenticação.

O resultado deve estar preparado para personalização da DMG por restaurante, preservando a mesma estrutura visual e funcional entre instâncias.

## 3. Escopo aprovado

### 3.1 Núcleo obrigatório

| ID | Capacidade | Status | Fonte |
| --- | --- | --- | --- |
| REQ-001 | Catálogo público com dados da loja, categorias e produtos ativos. | Aprovado | RF-001 |
| REQ-002 | Busca de produtos e filtro por categoria. | Aprovado | RF-002 |
| REQ-003 | Configuração simples de produto com variação obrigatória, adicionais com preço e observação por item. | Aprovado | RF-003, RF-011 |
| REQ-004 | Carrinho com itens, quantidade, remoção, subtotal, total e observação geral. | Aprovado | RF-004 |
| REQ-005 | Status aberto/fechado calculado por dia e faixas de horário, incluindo pausas. | Aprovado | RF-005, RF-013, RN-003 |
| REQ-006 | Encaminhamento ao WhatsApp por link `wa.me`, contendo itens, quantidades, opções, observações e total. | Aprovado | RF-006, RI-001 |
| REQ-007 | Registro de intenção de envio contendo exclusivamente data e hora do clique válido. | Aprovado | RF-007, RF-014, RD-003 |
| REQ-008 | Login por usuário e senha para o único administrador: o dono. | Aprovado | RF-008, RS-001, RS-002 |
| REQ-009 | Gestão de categorias com criação, edição e exclusão definitiva. | Aprovado | RF-009, RN-005 |
| REQ-010 | Gestão de produtos com criação, edição, disponibilidade, imagem, preço e exclusão definitiva. | Aprovado | RF-010 |
| REQ-011 | Gestão de dados públicos, logo, cores e contatos da loja. | Aprovado | RF-012 |
| REQ-012 | Consulta administrativa do histórico mínimo de intenções de envio. | Aprovado | RF-014 |
| REQ-013 | Demonstração com conteúdo fictício e publicação em URL de teste. | Aprovado | Discovery, critérios de aceite |

### 3.2 Características obrigatórias de qualidade

- Catálogo utilizável em celular e desktop, com prioridade para celular.
- Direção gastronômica contemporânea: fotos grandes e apetitosas, paleta quente personalizável, leitura fácil e carrinho acessível.
- Cada instância é própria de um restaurante; conteúdo e identidade de uma instância não aparecem em outra.
- Histórico de intenção de envio não guarda dados pessoais, itens, valores ou observações.
- Exclusões definitivas exigem confirmação explícita na interface.

### 3.3 Apresentação e UX aprovadas

- Catálogo em página única com busca, filtro por categoria, produtos, carrinho e informações da loja.
- Configuração do produto em superfície contextual que preserve a posição na lista, como drawer no celular e modal/painel no desktop.
- Carrinho acessível durante a navegação quando houver itens.
- Painel organizado por tarefas: Produtos, Categorias, Horários, Dados da loja e Intenções de envio.
- Histórico nomeado como “Intenções de envio”, sem linguagem que indique venda ou pedido confirmado.

## 4. Fora do escopo

O agente de execução não deve implementar:

- Checkout, pagamento online, cupom, pedido confirmado ou acompanhamento de pedido.
- Integração com WhatsApp Business API, webhooks do WhatsApp ou automação de conversa.
- Coleta de endereço, cálculo de frete/delivery, método de pagamento ou fluxo de retirada/consumo no local.
- Múltiplos perfis administrativos, funcionários, cadastro público de administradores ou plataforma multi-restaurante.
- Regras avançadas de composição: dependências entre opções, grupos complexos, limites de adicionais ou configurações condicionais.
- Tema escuro, salvo nova decisão aprovada.
- Alterações de estrutura visual por cliente além de logo, cores, conteúdo e dados da loja.

## 5. Usuários, permissões e jornadas

### Cliente do restaurante

- Acessa o catálogo sem autenticação.
- Pesquisa, filtra, consulta produtos, escolhe opções, inclui observações e administra o próprio carrinho local.
- Só pode iniciar a abertura do WhatsApp quando há carrinho válido, loja aberta e número válido configurado.
- Não acessa painel, histórico nem qualquer gestão de dados.

### Dono do restaurante

- Autentica-se com usuário e senha criados pela DMG durante a entrega.
- É o único perfil administrativo do MVP.
- Pode consultar, criar, editar e excluir os conteúdos e configurações previstos no escopo.
- Não há tela de cadastro público de conta administrativa.

### Jornadas críticas

1. **Catálogo → Produto → Carrinho → WhatsApp:** cliente encontra produto, configura opções, adiciona ao carrinho, revisa e abre a mensagem no WhatsApp.
2. **Login → Produtos → Editor:** dono atualiza produto, disponibilidade e opções; conteúdo público reflete a alteração.
3. **Login → Horários:** dono configura faixas por dia; catálogo passa a comunicar aberto/fechado e bloqueia/envia conforme a regra.
4. **Login → Intenções de envio:** dono consulta somente data e hora dos cliques válidos de encaminhamento.

## 6. Requisitos funcionais detalhados

### REQ-001 — Catálogo e descoberta

- Exibir nome, logo e informações públicas configuradas da loja.
- Exibir produtos ativos por categoria com imagem, nome, descrição, preço e disponibilidade.
- Permitir busca por produtos e um filtro de categoria ativo por vez.
- Informar quando não houver produtos ativos ou quando a busca não retornar resultado.
- Não permitir adicionar produto esgotado ou inativo.

**Aceite:** o visitante encontra produto por navegação, busca ou filtro e compreende sua disponibilidade antes da tentativa de adicionar.

### REQ-002 — Configuração de item e carrinho

- Produto simples pode entrar diretamente no carrinho.
- Produto com variação exige a escolha configurada antes de ser adicionado.
- Adicionais selecionáveis podem alterar o valor do item.
- Cliente pode informar observação por item e observação geral do pedido.
- Carrinho permite aumentar/reduzir quantidade, remover item e visualizar subtotal e total atualizados.

**Aceite:** total considera quantidade, variação e adicionais; carrinho vazio não permite encaminhamento.

### REQ-003 — Funcionamento da loja e encaminhamento

- Calcular aberto/fechado por dia e uma ou mais faixas de horário, tratando intervalos como períodos fechados.
- O catálogo continua consultável quando fechado; o encaminhamento ao WhatsApp permanece bloqueado e explica o motivo.
- Quando o carrinho estiver válido e a loja aberta, construir mensagem com itens, quantidades, opções, observações e total; em seguida, abrir `wa.me` com o número da loja.
- Se o WhatsApp estiver ausente ou inválido, bloquear a ação e apresentar orientação administrativamente relevante.
- Ao iniciar encaminhamento válido, registrar somente data e hora da intenção.

**Aceite:** a interface nunca declara pedido concluído; o registro não comprova recebimento ou aceitação pelo restaurante.

### REQ-004 — Administração de catálogo

- Categorias: criar, renomear e excluir definitivamente.
- Produtos: criar, editar, marcar como disponível/esgotado/inativo e excluir definitivamente.
- Produtos têm categoria, nome, descrição, imagem e preço.
- Administrador pode criar, editar e remover variações e adicionais simples, com preço adicional quando aplicável.
- Antes de excluir categoria vinculada, impedir ou orientar o administrador para que nenhum produto fique sem categoria.

**Aceite:** alterações salvas tornam-se visíveis no catálogo público; exclusões requerem confirmação explícita.

### REQ-005 — Administração de loja e horários

- Permitir editar nome, logo, cores, WhatsApp, telefone, endereço/localização, Instagram e informações de entrega.
- Permitir definir dias de atendimento e uma ou mais faixas de horário por dia.
- Dia sem faixa ativa é tratado como fechado.

**Aceite:** dados públicos e status de funcionamento refletem a configuração persistida.

### REQ-006 — Administração de intenções de envio

- Exibir lista de intenções de envio com data e hora.
- Incluir explicação de que o dado representa somente a abertura do encaminhamento ao WhatsApp.
- Não exibir nem persistir itens, preços, observações, contato do cliente ou status de pedido.

**Aceite:** a tela contém apenas os dados permitidos e não apresenta métricas de venda.

## 7. Regras de negócio determinísticas

| ID | Regra |
| --- | --- |
| BR-001 | Produto esgotado ou inativo não pode ser adicionado ao carrinho. |
| BR-002 | O total é a soma dos itens, quantidades e valores de variações/adicionais aplicáveis. |
| BR-003 | Loja fora da faixa de horário ativa é fechada; consulta é permitida, encaminhamento é bloqueado. |
| BR-004 | Uma pausa é a lacuna entre duas faixas de horário do mesmo dia e representa loja fechada. |
| BR-005 | Uma intenção de envio existe somente após um clique válido com carrinho válido, loja aberta e encaminhamento elegível. |
| BR-006 | Intenção de envio não é pedido, venda, entrega, aceitação ou confirmação de mensagem. |
| BR-007 | Registro de intenção contém somente data e hora. |
| BR-008 | Produtos e categorias podem ser excluídos definitivamente somente após confirmação explícita. |
| BR-009 | Categoria com produto vinculado não pode ser excluída até que os vínculos sejam tratados. |
| BR-010 | Há apenas um perfil administrativo, o dono, e não há cadastro público. |

## 8. UX/UI obrigatório

### Direção visual

- Aplicar linguagem gastronômica contemporânea, acolhedora e clara.
- Usar fotos grandes, nítidas e apetitosas como protagonista dos produtos, sem comprometer nome, preço e disponibilidade.
- Usar cor de marca para ações e seleções; basear superfícies em neutros claros/fundos quentes discretos.
- Preservar estrutura visual, escala de conteúdo, estados e componentes entre instâncias; variar logo, cores e conteúdo.
- Evitar aparência de marketplace ou app de delivery, sombras pesadas, excesso de cores e texto de baixo contraste sobre fotos.

### Telas/superfícies mínimas

| ID | Superfície | Conteúdo e objetivo |
| --- | --- | --- |
| PUB-01 | Catálogo | Cabeçalho da loja, status, busca, filtro de categorias, cartões de produto, acesso ao carrinho e dados institucionais. |
| PUB-02 | Configuração do produto | Imagem, detalhes, variação, adicionais, observação e ação de adicionar. |
| PUB-03 | Carrinho | Itens, quantidade, remoção, subtotal, total, observação geral, status e encaminhamento ao WhatsApp. |
| PUB-04 | Informações da loja | Endereço/localização, telefone, Instagram, entrega e horários configurados. Pode ser bloco do catálogo. |
| ADM-01 | Login | Usuário, senha, ação de entrar e erros de autenticação. |
| ADM-02 | Produtos | Lista, disponibilidade e entrada para criação/edição. |
| ADM-03 | Editor de produto | Dados, imagem, preço, categoria, disponibilidade, variações, adicionais e exclusão. |
| ADM-04 | Categorias | Lista, criação, edição e exclusão. |
| ADM-05 | Horários | Visão semanal e edição de faixas de atendimento. |
| ADM-06 | Dados da loja | Identidade, contato, localização e entrega. |
| ADM-07 | Intenções de envio | Lista de data/hora e explicação do limite do dado. |
| SYS-01 | Confirmação de exclusão | Nome do item, aviso de permanência, cancelar e excluir. |

### Interações e estados

- Busca mantém termo aplicado e permite limpar; filtro de categoria deixa estado selecionado inequívoco.
- Produto com variação obrigatória bloqueia ou orienta a ação de adicionar até seleção válida.
- Carrinho recalcula os valores no próprio contexto após adição, remoção ou quantidade alterada.
- Ao adicionar item, confirmar apenas a adição local ao carrinho; não indicar pedido efetuado.
- Loja fechada exibe texto e estado visual, mantendo a navegação do catálogo e bloqueando a ação de WhatsApp.
- Formulários administrativos preservam valores quando há erro, mostram erros próximos ao campo e dão feedback de salvamento.
- Confirmar descarte de alterações não salvas antes de sair de um formulário; essa é uma decisão de interface derivada, aprovada para proteção do preenchimento.

### Responsividade e acessibilidade

- Mobile-first: catálogo em coluna única, controles de toque confortáveis, filtro adaptado e acesso persistente ao carrinho com itens.
- Desktop: grade com mais produtos, largura de leitura controlada e painel administrativo com navegação persistente quando houver espaço.
- Não depender de hover para ação essencial.
- Fornecer rótulos visíveis, foco perceptível, navegação por teclado, associação de erros aos campos e retorno de foco após fechamento de superfícies contextuais.
- Não comunicar disponibilidade, horário, erro ou seleção somente por cor.
- Respeitar preferência de redução de movimento.
- Validar contraste de qualquer paleta personalizada antes de publicação.

## 9. Arquitetura técnica

**Estado: não definida e bloqueadora de implementação.** Não existe documento de planejamento técnico, arquitetura, banco, autenticação, armazenamento de imagens, hosting ou contrato de API. O agente não deve assumir nem escolher esses itens como se fossem decisões aprovadas.

Antes de implementar, executar uma etapa de planejamento técnico e submeter as decisões para aprovação. Ela deve cobrir, no mínimo:

- framework, linguagem, runtime e gerenciador de pacotes;
- arquitetura de rotas públicas e administrativas;
- banco de dados e estratégia de migrações;
- autenticação e manejo de sessão do administrador;
- armazenamento, upload e entrega de imagens;
- validação e persistência de produtos, horários, cores e histórico;
- estratégia para uma instância isolada por restaurante;
- hospedagem, domínio, variáveis de ambiente, logs, backups e recuperação;
- estratégia de publicação em URL de teste;
- validação do número de WhatsApp e geração do link `wa.me`;
- tratamento de falhas e proteções necessárias nas interfaces públicas e administrativas.

## 10. Modelo de dados lógico

**Estado: aprovado apenas no nível conceitual; schema físico depende de planejamento técnico.**

| Entidade | Dados mínimos aprovados | Relações e restrições |
| --- | --- | --- |
| Loja | Nome, logo, cores, WhatsApp, telefone, endereço/localização, Instagram, informações de entrega e horários. | Uma instância representa uma loja. |
| Categoria | Nome. | Uma categoria pode ter vários produtos; não pode ser removida com produtos vinculados sem tratamento prévio. |
| Produto | Categoria, nome, descrição, imagem, preço e estado de disponibilidade. | Pertence a uma categoria; pode ter variações e adicionais simples. |
| Variação | Nome e valor adicional quando aplicável. | Pertence a um produto; pode ser exigida antes de adicionar item. |
| Adicional | Nome e valor adicional quando aplicável. | Pertence a um produto; pode ser selecionado pelo cliente. |
| Horário | Dia e uma ou mais faixas de início/fim. | Define status aberto/fechado; intervalo entre faixas é fechado. |
| Usuário administrador | Credencial de acesso do dono. | Único perfil administrativo; não possui cadastro público. |
| Intenção de envio | Data e hora. | Não pode guardar conteúdo do carrinho ou dado pessoal do cliente. |

## 11. Contrato de API

**Estado: não definido.** A forma de comunicação entre interface, autenticação e persistência depende da arquitetura ainda não aprovada. Não criar endpoints, métodos, payloads ou contratos permanentes antes do planejamento técnico.

O contrato escolhido posteriormente precisa cobrir, conforme a arquitetura aprovada:

- leitura pública da loja, catálogo, categorias, produtos e status de funcionamento;
- autenticação e proteção de funções administrativas;
- gestão de categorias, produtos, opções, dados da loja e horários;
- consulta de intenções de envio;
- criação do registro mínimo de intenção antes de abrir WhatsApp;
- validações, autorização, respostas de erro e ausência de dados vedados no histórico.

## 12. Segurança e privacidade

- Proteger todas as funções administrativas por autenticação; visitante público não pode criar, editar, excluir ou consultar dados administrativos.
- Não expor senhas, tokens, chaves ou outros segredos em código, logs ou documentação.
- Validar entradas administrativas e públicas no limite definido pela arquitetura.
- Tratar exclusão como ação irreversível e exigir confirmação explícita na interface.
- Restringir o histórico à data e hora; não coletar nem persistir dados pessoais, carrinho ou observações para essa finalidade.
- Não afirmar que o link do WhatsApp confirma o pedido.
- Detalhes de sessão, hashing de senha, rate limiting, controle de acesso por ambiente, backup e recuperação são pendências de planejamento técnico, não decisões já aprovadas.

## 13. Integrações

### WhatsApp por `wa.me`

- **Finalidade:** abrir a conversa com o número configurado para a loja e preencher uma mensagem com o pedido.
- **Gatilho:** cliente aciona “Continuar no WhatsApp” com carrinho válido e loja aberta.
- **Dados enviados na mensagem:** itens, quantidades, variações, adicionais, observações por item, observação geral e total.
- **Pré-condições:** número configurado e válido, ambiente capaz de abrir WhatsApp e critérios de encaminhamento satisfeitos.
- **Sucesso esperado:** solicitação de abertura do link e criação do registro de intenção com data/hora.
- **Falha/limite:** número ausente ou inválido bloqueia o encaminhamento; o sistema não recebe confirmação de que a conversa, mensagem ou pedido foi concluído.
- **Credenciais/API:** não aplicável ao MVP; WhatsApp Business API está fora do escopo.

## 14. Regras de implementação

O agente de execução deve:

1. Ler este documento e todos os documentos-fonte antes de modificar arquivos.
2. Inspecionar o repositório atual antes de criar ou substituir estrutura; neste momento ele contém somente documentação e não é Git.
3. Parar para planejamento técnico e aprovação antes de escolher stack, banco, autenticação, hospedagem, biblioteca, API ou estratégia de armazenamento.
4. Após aprovação técnica, fazer alterações pequenas, rastreáveis e alinhadas às convenções escolhidas.
5. Não introduzir dependências sem necessidade e sem registrar sua justificativa.
6. Preservar requisitos, limites de escopo, linguagem de WhatsApp e proteção do histórico.
7. Validar cada alteração significativa, incluindo comportamento em celular e desktop.
8. Atualizar a documentação quando uma decisão aprovada for alterada por processo explícito de mudança.

## 15. Validação exigida

Após existir implementação e ferramentas de projeto, validar proporcionalmente:

### Catálogo público

- Catálogo carrega com dados demonstrativos e mostra estado de carregamento, vazio, erro e produto indisponível quando aplicável.
- Busca e filtro retornam conteúdo esperado e permitem remoção do filtro/termo.
- Produto simples entra no carrinho; produto com variação exige seleção; adicional altera valor.
- Quantidade, remoção, subtotal e total atualizam corretamente.
- Carrinho com loja aberta gera mensagem correta e tenta abrir WhatsApp.
- Carrinho com loja fechada ou WhatsApp inválido não inicia encaminhamento.
- Clique válido registra apenas data e hora.

### Painel

- Rota administrativa não autenticada é bloqueada.
- Login inválido apresenta erro seguro; login válido concede acesso ao dono.
- Criar/editar disponibilidade de produto reflete no catálogo público.
- Gerenciar categoria impede exclusão com produto vinculado sem tratamento.
- Excluir produto ou categoria exige confirmação explícita.
- Horários com uma ou mais faixas por dia atualizam corretamente o status público.
- Histórico mostra somente data e hora.

### Qualidade de interface e segurança

- Fluxos críticos funcionam em celular e desktop.
- Navegação por teclado, foco, rótulos, erros e contraste são verificados.
- Preferência de redução de movimento é respeitada.
- Segredos não aparecem em repositório, logs ou interface.
- Build, lint, tipos e testes definidos pela stack aprovada são executados e reportados.

## 16. Critérios de aceite

O MVP está pronto somente se todos os seguintes pontos forem demonstráveis:

- [ ] Cliente acessa catálogo responsivo, explora produtos, pesquisa e filtra categorias.
- [ ] Cliente configura variações/adicionais simples, inclui observações e mantém carrinho com cálculo correto.
- [ ] Loja fechada bloqueia envio e mantém catálogo navegável.
- [ ] Loja aberta permite abrir `wa.me` com itens, opções, observações e total.
- [ ] Cada clique válido de envio cria somente um registro de data/hora, sem dados de pedido ou cliente.
- [ ] Dono autenticado administra produtos, categorias, opções, disponibilidade, dados da loja e horários.
- [ ] Exclusões permanentes exigem confirmação e categoria não é apagada deixando produto sem categoria.
- [ ] Histórico é exibido como intenção de envio, sem status de pedido ou venda.
- [ ] Demonstração usa conteúdo fictício que cobre produtos simples, produto com opções, indisponibilidade, loja fechada e carrinho com múltiplos itens.
- [ ] Direção gastronômica contemporânea, responsividade, acessibilidade e contraste de paleta personalizada são validados.
- [ ] URL de teste está publicada após a definição e aprovação da infraestrutura.

## 17. Mudanças proibidas

- Não adicionar qualquer funcionalidade listada como fora do escopo.
- Não tratar intenção de envio como pedido confirmado, venda ou mensagem entregue.
- Não salvar dados de cliente, itens, preços ou observações no histórico de intenção.
- Não criar cadastro público ou outros perfis administrativos.
- Não transformar o template em plataforma multi-restaurante compartilhada.
- Não alterar o fluxo de envio do WhatsApp para checkout, API paga ou automação sem mudança aprovada.
- Não mudar arquitetura, stack, ambiente, hospedagem ou fornecedores sem planejamento técnico e aprovação.
- Não alterar a estrutura visual replicável do template para uma instância específica sem revisão de escopo.
- Não apagar arquivos ou conteúdo existente sem autorização explícita.

## 18. Decisões em aberto

| Decisão | Status | Ação necessária |
| --- | --- | --- |
| Framework, linguagem, runtime e dependências | Pendente | Planejamento técnico e aprovação. |
| Banco, schema físico, migrações e persistência | Pendente | Planejamento técnico e aprovação. |
| Autenticação, sessões e recuperação de acesso | Pendente | Planejamento técnico e aprovação. |
| Upload, armazenamento e otimização de imagens | Pendente | Planejamento técnico e aprovação. |
| API, endpoints, contratos e validação no servidor | Pendente | Planejamento técnico e aprovação. |
| Hospedagem, domínio, variáveis de ambiente, backups e publicação de teste | Pendente | Planejamento técnico e aprovação. |
| Política de retenção e recuperação de dados | Pendente | Planejamento técnico e decisão operacional da DMG. |
| Nome comercial, prazo e orçamento | Pendente | Decisão comercial/operacional da DMG. |
| Paleta, logo, fontes e imagens de cada cliente | Pendente por instância | Material fornecido na personalização. |
| Aprovação comercial formal | Ausente | Registrar caso seja exigida antes da execução. |

## 19. Documentos-fonte

- `docs/01-project-discovery.md` — descoberta aprovada.
- `docs/02-requirements.md` — requisitos, regras e critérios de aceite.
- `docs/05-visual-spec.md` — direção visual e regras de personalização.
- `docs/06-ux-ui-spec.md` — arquitetura de informação, fluxos, telas, estados e acessibilidade.

## 20. Estratégia de execução

1. **Planejamento técnico:** definir e aprovar arquitetura, stack, dados, autenticação, imagens, integração, hospedagem e variáveis de ambiente.
2. **Preparação do projeto:** inicializar estrutura somente após a aprovação técnica, documentar convenções e criar dados demonstrativos.
3. **Fundação:** implementar modelo de dados, autenticação do administrador, proteção de rotas e persistência de configurações da loja.
4. **Painel administrativo:** categorias, produtos, opções, dados da loja, horários e histórico mínimo.
5. **Catálogo público:** dados da loja, busca, filtro, produtos, status de funcionamento e estados de disponibilidade.
6. **Carrinho e WhatsApp:** composição de itens, cálculo, observações, registro mínimo e redirecionamento com tratamento de falhas.
7. **Acabamento UX/UI:** aplicar tokens, componentes, estados, responsividade, acessibilidade e conteúdo demonstrativo.
8. **Validação e publicação:** executar verificações técnicas e manuais, documentar resultados e publicar URL de teste conforme infraestrutura aprovada.

## Instrução final ao agente de execução

Leia todo este Master Prompt e os quatro documentos-fonte. Inspecione o repositório antes de qualquer modificação. Não trate as decisões em aberto como requisitos implementáveis. Como a arquitetura técnica ainda não está definida, inicie pelo planejamento técnico e aguarde sua aprovação antes de começar a implementação. Depois, execute incrementalmente, valide cada etapa e reporte exatamente o que foi alterado, testado, pendente e bloqueado.
