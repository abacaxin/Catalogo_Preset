# Requirements

## 1. Contexto e objetivo

O Catálogo Restaurante é um template replicável que a DMG personaliza e entrega como uma instância própria para cada restaurante. Ele substitui o cardápio físico por um catálogo público onde clientes montam pedidos e iniciam a conversa no WhatsApp da loja. O dono do restaurante administra o conteúdo e as configurações pelo painel.

O MVP é considerado aceito quando o catálogo, o carrinho, o envio ao WhatsApp, o painel administrativo, o conteúdo fictício demonstrativo e uma URL de teste estiverem funcionais.

## 2. Atores e perfis

| Ator | Responsabilidade | Acesso |
| --- | --- | --- |
| Cliente do restaurante | Consulta o catálogo e monta o pedido. | Catálogo público e carrinho. |
| Dono do restaurante | Mantém o catálogo e as configurações da própria loja. | Painel administrativo completo. |
| DMG | Cria, personaliza e publica a instância inicial. | Processo de entrega; o acesso operacional da DMG não é um perfil do painel neste MVP. |

## 3. Requisitos funcionais

### RF-001 - Exibir catálogo público
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery; decisão do responsável
- **Descrição:** O sistema deve exibir, sem autenticação, os dados públicos da loja, categorias e produtos disponíveis.
- **Critérios de aceite:**
  - visitante visualiza nome, logo e informações institucionais configuradas para a loja;
  - visitante visualiza produtos organizados por categoria;
  - cada produto exibe nome, descrição, imagem, preço e disponibilidade;
  - produtos inativos ou esgotados não podem ser adicionados ao carrinho.

### RF-002 - Pesquisar e filtrar produtos
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** decisão do responsável
- **Descrição:** O visitante deve poder localizar produtos por busca e filtrar o catálogo por categoria.
- **Critérios de aceite:**
  - a busca retorna produtos compatíveis com o termo informado;
  - o filtro mostra apenas produtos da categoria selecionada;
  - o visitante pode remover o filtro e voltar a visualizar o catálogo completo;
  - a ausência de resultados é comunicada ao visitante.

### RF-003 - Configurar item do carrinho
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery; decisão do responsável
- **Descrição:** O visitante deve poder selecionar as opções simples disponíveis no produto, informar observação por item e adicioná-lo ao carrinho.
- **Critérios de aceite:**
  - produto sem opções pode ser adicionado diretamente ao carrinho;
  - produto com variação exige a seleção da variação configurada antes de ser adicionado;
  - adicionais configurados podem ser selecionados para o item;
  - variações e adicionais com preço alteram o valor do item;
  - visitante pode incluir uma observação textual para o item;
  - o sistema informa quando uma seleção obrigatória estiver ausente.
- **Observações:** Opções avançadas de composição, limites e regras complexas não pertencem ao MVP.

### RF-004 - Gerenciar carrinho
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery
- **Descrição:** O visitante deve poder revisar os itens escolhidos e manter o carrinho antes do envio.
- **Critérios de aceite:**
  - visitante pode alterar a quantidade de cada item;
  - visitante pode remover item do carrinho;
  - subtotal e total são atualizados após cada alteração;
  - total considera quantidades, variações e adicionais selecionados;
  - visitante pode incluir uma observação geral para o pedido;
  - o carrinho vazio possui uma apresentação adequada e não permite envio.

### RF-005 - Indicar horário de funcionamento
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** decisão do responsável
- **Descrição:** O catálogo deve informar se a loja está aberta ou fechada conforme seus horários configurados.
- **Critérios de aceite:**
  - o status é calculado a partir do dia e das faixas de horário configuradas;
  - o cálculo considera pausas entre faixas de um mesmo dia;
  - o catálogo continua navegável quando a loja estiver fechada;
  - o envio do pedido fica indisponível enquanto a loja estiver fechada.

### RF-006 - Direcionar pedido ao WhatsApp
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery; decisão do responsável
- **Descrição:** Quando a loja estiver aberta, o sistema deve montar uma mensagem do pedido e direcionar o visitante ao WhatsApp configurado para a loja.
- **Critérios de aceite:**
  - a mensagem inclui itens, quantidades, opções selecionadas, observações e total;
  - o direcionamento usa o número de WhatsApp configurado no painel;
  - o sistema não exige conta no catálogo para iniciar o envio;
  - se a loja estiver fechada, o direcionamento não é iniciado e o visitante é informado;
  - se não houver número de WhatsApp válido configurado, o envio não é iniciado e o administrador deve ser informado no painel.

### RF-007 - Registrar intenção de envio
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** decisão do responsável
- **Descrição:** O sistema deve registrar a data e a hora de cada clique válido que inicia o direcionamento ao WhatsApp.
- **Critérios de aceite:**
  - o registro é criado quando o visitante aciona o envio com loja aberta e carrinho válido;
  - o painel permite consultar a data e a hora dos registros;
  - o histórico não armazena itens, preços, observações, dados do cliente nem confirmação de recebimento no WhatsApp.

### RF-008 - Autenticar administrador
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery; decisão do responsável
- **Descrição:** O painel administrativo deve exigir autenticação por usuário e senha.
- **Critérios de aceite:**
  - usuário não autenticado não acessa as funções administrativas;
  - o dono autenticado acessa o painel da própria instância;
  - não existe cadastro público de administrador;
  - a DMG cria o primeiro acesso durante a entrega da instância.

### RF-009 - Gerenciar categorias
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery; decisão do responsável
- **Descrição:** O dono deve poder criar, editar e excluir definitivamente categorias do cardápio.
- **Critérios de aceite:**
  - administrador pode informar e alterar o nome de uma categoria;
  - categoria criada torna-se disponível para organização dos produtos;
  - administrador pode excluir uma categoria;
  - o sistema impede ou orienta o administrador quando houver produtos vinculados à categoria, de modo que nenhum produto fique sem categoria.

### RF-010 - Gerenciar produtos
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery; decisão do responsável
- **Descrição:** O dono deve poder criar, editar, ativar, desativar e excluir definitivamente produtos.
- **Critérios de aceite:**
  - administrador informa categoria, nome, descrição, imagem e preço do produto;
  - administrador pode configurar o produto como disponível, esgotado ou inativo;
  - produto esgotado ou inativo não pode ser adicionado ao carrinho;
  - administrador pode excluir um produto definitivamente;
  - alterações realizadas no painel refletem no catálogo público.

### RF-011 - Gerenciar opções de produto
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery; decisão do responsável
- **Descrição:** O dono deve poder configurar variações e adicionais simples para cada produto, inclusive preços adicionais.
- **Critérios de aceite:**
  - administrador pode cadastrar, editar e remover variações e adicionais de um produto;
  - administrador pode definir o valor adicional de cada opção;
  - administrador pode indicar variações obrigatórias;
  - opções configuradas aparecem ao visitante durante a composição do item.
- **Observações:** O MVP não exige regras avançadas de combinação, quantidade, dependência ou grupos complexos de opções.

### RF-012 - Gerenciar dados da loja e identidade visual
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery
- **Descrição:** O dono deve poder atualizar as informações públicas e a identidade visual configurável da loja.
- **Critérios de aceite:**
  - administrador pode alterar nome, logo, cores, WhatsApp, telefone, endereço/localização, Instagram e informações de entrega;
  - dados alterados são refletidos no catálogo público;
  - a estrutura visual do template permanece a mesma após a personalização.

### RF-013 - Gerenciar horários
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** decisão do responsável
- **Descrição:** O dono deve poder configurar horários de funcionamento por dia, incluindo mais de uma faixa e pausas.
- **Critérios de aceite:**
  - administrador define os dias em que a loja atende;
  - administrador define uma ou mais faixas de horário por dia;
  - o sistema atualiza o status público conforme a configuração;
  - uma loja sem faixa ativa para o momento atual é considerada fechada.

### RF-014 - Consultar histórico de envios
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery; decisão do responsável
- **Descrição:** O dono deve poder consultar o histórico de intenções de envio registradas pelo catálogo.
- **Critérios de aceite:**
  - histórico exibe a data e a hora de cada registro;
  - histórico não afirma que o pedido foi recebido, confirmado ou concluído;
  - histórico não exibe conteúdo do carrinho ou dados pessoais do visitante.

## 4. Requisitos não funcionais

### RNF-001 - Responsividade
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery
- **Descrição:** O catálogo público deve funcionar em celular e desktop, priorizando a experiência em telas de celular.
- **Critérios de validação:** As funções de consulta, busca, composição, carrinho e envio podem ser executadas nos dois contextos.

### RNF-002 - Clareza visual do catálogo
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** decisão do responsável
- **Descrição:** A interface deve seguir a direção gastronômica contemporânea aprovada: fotos grandes e apetitosas, cores quentes personalizáveis, leitura fácil e carrinho acessível durante a navegação.
- **Critérios de validação:** A demonstração visual é revisada pela DMG contra essa direção antes da publicação de teste.

### RNF-003 - Dados do histórico
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** decisão do responsável
- **Descrição:** O histórico de intenção de envio deve limitar-se à data e hora do clique, reduzindo a retenção de dados do cliente e do pedido.
- **Critérios de validação:** A consulta do histórico não apresenta conteúdo, valor ou observações do carrinho, nem dados do visitante.

### RNF-004 - Configuração e publicação por instância
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery
- **Descrição:** Cada restaurante deve possuir uma instância própria, com conteúdo e identidade visual personalizados, preservando a estrutura do template.
- **Critérios de validação:** Alterações de conteúdo e identidade de uma instância não aparecem em outra instância.

## 5. Regras de negócio

### RN-001 - Disponibilidade de produto
- **Status:** confirmado
- **Origem:** discovery
- **Regra:** Produtos esgotados ou inativos permanecem indisponíveis para inclusão no carrinho.
- **Impacto:** Catálogo e carrinho devem impedir a compra de itens não disponíveis.

### RN-002 - Cálculo do pedido
- **Status:** confirmado
- **Origem:** discovery
- **Regra:** O total do pedido é a soma dos itens, respectivas quantidades e valores aplicáveis de variações e adicionais.
- **Impacto:** Carrinho e mensagem ao WhatsApp devem usar o mesmo total.

### RN-003 - Loja fechada
- **Status:** confirmado
- **Origem:** decisão do responsável
- **Regra:** Fora das faixas de horário configuradas, a loja é considerada fechada; o visitante pode consultar o catálogo, mas não iniciar o envio.
- **Impacto:** O estado público e o botão de envio devem refletir essa condição.

### RN-004 - Natureza do histórico
- **Status:** confirmado
- **Origem:** decisão do responsável
- **Regra:** O registro de envio representa um clique que abriu o direcionamento ao WhatsApp e não representa a confirmação de pedido.
- **Impacto:** O painel não pode apresentar esse evento como venda ou pedido concluído.

### RN-005 - Exclusão administrativa
- **Status:** confirmado
- **Origem:** decisão do responsável
- **Regra:** Produtos e categorias podem ser excluídos definitivamente pelo administrador.
- **Impacto:** A exclusão deve ser precedida por uma confirmação explícita no painel; categorias com produtos vinculados exigem tratamento antes da exclusão.

## 6. Requisitos de dados

### RD-001 - Dados da loja
- **Status:** confirmado
- **Origem:** discovery
- **Dados:** Nome, logo, cores, WhatsApp, telefone, endereço/localização, Instagram, informações de entrega e horários.
- **Uso:** Personalizar e operar o catálogo público.
- **Acesso:** Consulta pública aos dados publicados; alteração pelo dono autenticado.
- **Retenção:** Enquanto a instância estiver ativa; política de backup e exclusão ainda não definida.

### RD-002 - Cardápio
- **Status:** confirmado
- **Origem:** discovery
- **Dados:** Categorias, produtos, descrições, imagens, preços, disponibilidade, variações e adicionais.
- **Uso:** Exibir e calcular itens do carrinho.
- **Acesso:** Consulta pública ao conteúdo ativo; alteração pelo dono autenticado.
- **Retenção:** Enquanto a instância estiver ativa; itens podem ser excluídos definitivamente.

### RD-003 - Histórico de intenção de envio
- **Status:** confirmado
- **Origem:** decisão do responsável
- **Dados:** Data e hora do clique válido de envio.
- **Uso:** Consulta operacional pelo dono.
- **Acesso:** Somente dono autenticado.
- **Retenção:** Não definida; requer decisão no planejamento técnico.
- **Observações:** Não inclui dados pessoais, itens, valores ou observações do pedido.

## 7. Requisitos de integração

### RI-001 - WhatsApp
- **Status:** confirmado
- **Origem:** discovery; decisão do responsável
- **Sistema:** WhatsApp acessado por link `wa.me`.
- **Objetivo:** Encaminhar o pedido montado para a conversa com o restaurante.
- **Comportamento esperado:** Após um clique válido, abrir o WhatsApp do número configurado com a mensagem do pedido pré-formatada.
- **Falhas/exceções:** Se o número não estiver configurado ou estiver inválido, o catálogo não inicia o envio; se o WhatsApp não estiver disponível no dispositivo, a confirmação do pedido permanece fora da responsabilidade do sistema.
- **Dependências:** Número de WhatsApp válido fornecido pelo restaurante e aplicativo ou ambiente compatível no dispositivo do visitante.

## 8. Requisitos de segurança e privacidade

### RS-001 - Proteção do painel
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** discovery
- **Requisito:** As funções de gestão devem estar disponíveis somente após autenticação por usuário e senha.
- **Validação:** Visitante não autenticado não acessa nem executa ações administrativas.

### RS-002 - Restrição de acesso administrativo
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** decisão do responsável
- **Requisito:** O único perfil administrativo do MVP é o dono do restaurante; não há cadastro público nem perfil de funcionário.
- **Validação:** O painel não oferece criação pública de contas ou funções administrativas limitadas.

### RS-003 - Minimização do histórico
- **Status:** confirmado
- **Prioridade:** MUST
- **Origem:** decisão do responsável
- **Requisito:** O histórico de intenções de envio não deve guardar dados pessoais do visitante ou a composição do pedido.
- **Validação:** Cada registro contém somente data e hora.

## 9. Fluxos principais

### Fluxo 1 - Montar e enviar pedido
- **Ator:** Cliente do restaurante.
- **Objetivo:** Selecionar itens e abrir a conversa com a loja no WhatsApp.
- **Pré-condições:** Catálogo está acessível, há produtos disponíveis e o número de WhatsApp da loja está configurado.
- **Fluxo:**
  1. Cliente pesquisa, filtra ou navega pelas categorias.
  2. Cliente abre o produto e seleciona variação, adicionais e observação quando aplicável.
  3. Cliente adiciona o produto ao carrinho.
  4. Cliente revisa itens, quantidades e observação geral.
  5. Cliente solicita o envio.
  6. Sistema valida carrinho e status de funcionamento.
  7. Sistema registra data e hora, monta a mensagem e abre o WhatsApp.
- **Exceções:** Produto indisponível, carrinho vazio, opção obrigatória ausente, loja fechada ou WhatsApp não configurado impedem o envio e informam o motivo.
- **Resultado:** Cliente é direcionado ao WhatsApp; a confirmação da conversa e do pedido ocorre fora do sistema.

### Fluxo 2 - Atualizar cardápio
- **Ator:** Dono do restaurante.
- **Objetivo:** Manter categorias, produtos e disponibilidade atualizados.
- **Pré-condições:** Dono autenticado no painel.
- **Fluxo:**
  1. Dono cria ou seleciona categoria.
  2. Dono cria ou edita produto e suas opções.
  3. Dono salva alterações ou ajusta a disponibilidade.
  4. Catálogo público passa a refletir o conteúdo atualizado.
- **Exceções:** A exclusão de categoria com produtos vinculados exige tratamento prévio desses produtos.
- **Resultado:** Cardápio público atualizado.

### Fluxo 3 - Configurar funcionamento da loja
- **Ator:** Dono do restaurante.
- **Objetivo:** Determinar quando o envio de pedidos está disponível.
- **Pré-condições:** Dono autenticado no painel.
- **Fluxo:**
  1. Dono seleciona dia e informa uma ou mais faixas de atendimento.
  2. Dono salva a configuração.
  3. Sistema calcula o status aberto/fechado a partir dos horários atuais.
- **Exceções:** Ausência de faixa ativa mantém a loja fechada.
- **Resultado:** Catálogo apresenta o status correto e permite ou bloqueia envio conforme a regra.

## 10. Estados e transições

| Entidade | Estados | Transição relevante |
| --- | --- | --- |
| Loja | Aberta; fechada | O horário atual entra ou sai de uma faixa configurada. |
| Produto | Disponível; esgotado; inativo; excluído | Administrador altera disponibilidade ou exclui o produto. |
| Carrinho | Vazio; com itens; apto a enviar | Cliente adiciona, remove ou configura itens válidos. |
| Intenção de envio | Registrada | Cliente inicia o envio com carrinho válido e loja aberta. Não há estado de confirmação. |

## 11. Matriz de permissões

| Ação | Cliente | Dono |
| --- | --- | --- |
| Consultar catálogo público | Permitido | Permitido |
| Buscar, filtrar e usar carrinho | Permitido | Permitido |
| Enviar pedido ao WhatsApp | Permitido, se loja aberta | Permitido, se loja aberta |
| Consultar histórico de intenções | Não permitido | Permitido |
| Gerenciar categorias, produtos e opções | Não permitido | Permitido |
| Gerenciar dados, identidade e horários da loja | Não permitido | Permitido |
| Criar conta administrativa | Não permitido | Não aplicável; acesso inicial criado pela DMG |

## 12. Critérios de aceite do produto

- Um visitante consegue localizar produtos, configurá-los, adicioná-los ao carrinho e iniciar um pedido no WhatsApp quando a loja está aberta.
- O sistema bloqueia o envio quando a loja está fechada e mantém o cardápio consultável.
- O valor exibido no carrinho é o mesmo informado na mensagem gerada para o WhatsApp.
- O dono autenticado consegue manter todo o cardápio, a disponibilidade, os horários, as informações públicas e a identidade visual da loja.
- O painel registra e consulta somente a data e a hora das intenções de envio.
- A demonstração contém conteúdo fictício e está publicada em URL de teste.

## 13. Fora do escopo

- Checkout e pagamento online.
- Integração com WhatsApp Business API.
- Confirmação, acompanhamento ou gestão real de pedidos dentro do sistema.
- Cálculo de entrega, coleta de endereço, formas de pagamento ou automação de delivery.
- Múltiplos perfis administrativos, funcionários ou permissões limitadas.
- Plataforma compartilhada por múltiplos restaurantes.
- Regras avançadas de composição e combinação de opções de produtos.

## 14. Dependências

- Dados reais do restaurante: logo, cores, contatos, endereço, horários, número de WhatsApp e informações de entrega.
- Conteúdo do cardápio: categorias, produtos, preços, descrições e imagens.
- Domínio e hospedagem administrados pela DMG.
- Ambiente do visitante capaz de abrir o link do WhatsApp.

## 15. Riscos

- O link para WhatsApp não comprova que o cliente enviou, nem que o restaurante recebeu ou aceitou o pedido.
- Conteúdo e fotos insuficientes fornecidos pelo restaurante podem comprometer a qualidade da instância entregue.
- Exclusões definitivas exigem confirmação explícita para evitar perda acidental de conteúdo.

## 16. Questões em aberto

- Nome comercial do template.
- Prazo e orçamento de lançamento.
- Política de backup, recuperação, retenção e exclusão dos dados da instância.
- Estratégia técnica para autenticação, armazenamento de imagens, histórico e publicação.

## 17. Decisões relacionadas

- A solução usa uma instância personalizada por restaurante, com mesma estrutura de template.
- A DMG cria o primeiro acesso e administra domínio e hospedagem.
- O pedido é enviado por `wa.me`, sem WhatsApp Business API.
- A direção visual é gastronômica contemporânea, com fotos grandes, paleta quente personalizável, leitura fácil no celular e carrinho acessível.

## 18. Rastreabilidade

| Origem na discovery | Requisitos relacionados |
| --- | --- |
| Catálogo e pedido via WhatsApp | RF-001 a RF-007, RI-001, RN-002 a RN-004 |
| Painel do dono | RF-008 a RF-014, RS-001 e RS-002 |
| Produtos, variações e adicionais | RF-003, RF-004, RF-010, RF-011, RD-002 |
| Horários e bloqueio de envio | RF-005, RF-013, RN-003 |
| Histórico somente com data e hora | RF-007, RF-014, RD-003, RNF-003, RS-003 |
| Instâncias personalizadas | RF-012, RNF-004, RD-001 |

## 19. Próximas etapas

1. Definir o escopo de entrega em fases, se necessário.
2. Realizar planejamento técnico para transformar os requisitos em arquitetura e decisões de implementação.
3. Estruturar fluxos e interfaces a partir dos requisitos aprovados.
