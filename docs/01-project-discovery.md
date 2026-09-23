# Project Discovery

## 1. Identificação

- **Projeto:** Catálogo Restaurante.
- **Natureza:** template replicável de catálogo digital para restaurantes.
- **Status:** descoberta concluída e aprovada.

## 2. Cliente, responsáveis e equipe

- **Responsável pelo produto e entrega:** DMG.
- **Cliente final:** cada restaurante que adquirir uma instância personalizada.
- **Administrador da instância:** dono do restaurante, com acesso total ao painel.

## 3. Contexto e motivação

O produto substitui o cardápio físico por uma experiência digital em que clientes consultam pratos, montam pedidos e iniciam a conversa no WhatsApp do restaurante. A DMG entregará uma cópia própria do template para cada restaurante, mantendo a estrutura e personalizando conteúdo e identidade.

## 4. Problema a resolver

Restaurantes precisam apresentar cardápios atualizáveis, fáceis de acessar pelo celular e capazes de encaminhar pedidos ao WhatsApp sem depender de cardápios físicos ou de processos manuais para atualizar produtos e preços.

## 5. Objetivos e critérios de sucesso

### Objetivos

- Permitir que o cliente explore o cardápio, monte um pedido e o envie ao WhatsApp.
- Permitir que o dono gerencie cardápio, horários e dados da loja sem depender da DMG para alterações rotineiras.
- Oferecer uma base visual e funcional consistente que a DMG possa personalizar e publicar rapidamente para novos clientes.

### Critérios de aceite do MVP

- Catálogo público, carrinho e envio ao WhatsApp funcionais.
- Painel administrativo funcional para o dono.
- Conteúdo demonstrativo fictício pronto para apresentação.
- Instância publicada em uma URL de teste.

## 6. Público, usuários e perfis

### Cliente final do restaurante

- Consulta o cardápio principalmente pelo celular.
- Pesquisa e filtra produtos, personaliza itens, monta pedido e o encaminha ao WhatsApp.

### Dono do restaurante

- Único perfil administrativo.
- Gerencia integralmente o conteúdo e as configurações da própria instância.

### DMG

- Cria a instância inicial, o acesso administrativo, a personalização e a publicação.
- Administra hospedagem e domínio por cliente.

## 7. Tipo e natureza do projeto

- Catálogo digital público com interação e encaminhamento de pedido.
- Sistema administrativo para operação do cardápio.
- Cada cliente recebe uma instância única; não há plataforma multi-tenant no MVP.

## 8. Visão geral da solução

O catálogo público exibe dados do restaurante, categorias e produtos. O visitante pode pesquisar, filtrar, escolher variações e adicionais, acrescentar observações e montar o carrinho. Ao finalizar, o sistema monta uma mensagem com itens, quantidades e total e abre o WhatsApp do restaurante por link `wa.me`.

O pedido não é confirmado pelo sistema. Entrega, endereço, pagamento e demais detalhes são combinados na conversa posterior pelo WhatsApp.

## 9. Escopo conceitual

### Essencial no MVP

- Catálogo responsivo, com prioridade para celular.
- Categorias, busca e filtros.
- Produto com nome, descrição, imagem, preço e status de disponibilidade.
- Variações obrigatórias e adicionais opcionais, inclusive com preço próprio.
- Carrinho com quantidades, subtotal e total.
- Observações por item e observação geral do pedido.
- Envio ao WhatsApp com mensagem pré-formatada.
- Status aberto/fechado conforme horários configurados.
- Navegação do cardápio disponível quando fechado; envio bloqueado nesse estado.
- Área institucional pública com endereço/localização, Instagram, telefone e informações de entrega.
- Painel do dono para gerenciar categorias, produtos, fotos, preços, disponibilidade, variações, adicionais, dados da loja, logo, cores, WhatsApp e horários.
- Configuração de dias, faixas de horário e pausas.
- Histórico de cliques em “Enviar pedido”.
- Criação do primeiro acesso administrativo pela DMG, sem cadastro público.

### Fora do escopo do MVP

- Checkout e pagamento online.
- Integração com WhatsApp Business API.
- Confirmação ou acompanhamento real do pedido dentro do sistema.
- Cálculo ou automação de delivery, endereço e formas de pagamento.
- Perfil de funcionário e permissões limitadas.
- Plataforma única com múltiplos restaurantes.

## 10. Regras de negócio e operação

- Produtos podem estar disponíveis ou esgotados/inativos.
- Produtos podem ser simples ou exigir a seleção de variações.
- Adicionais podem alterar o valor do item.
- O total enviado ao WhatsApp é calculado a partir do carrinho e das opções escolhidas.
- Fora do horário configurado, o catálogo é consultável, mas não permite iniciar o envio do pedido.
- O histórico registra a intenção de envio pelo clique; ele não comprova que o pedido foi entregue ou aceito no WhatsApp.

## 11. Conteúdo, comunicação e posicionamento

- A primeira versão usará nome, logo, produtos, preços e imagens fictícios para demonstração.
- Em cada nova entrega, a DMG substituirá os conteúdos por informações reais do restaurante.
- O produto deve comunicar praticidade, clareza e apetite, facilitando a decisão e o pedido.

## 12. Marca e direção visual

- **Decisão aprovada:** estilo gastronômico contemporâneo.
- Fotos grandes e apetitosas como elemento central.
- Paleta quente, personalizável para a identidade de cada restaurante.
- Leitura fácil no celular e carrinho sempre acessível durante a navegação.
- Estrutura visual e layout permanecem consistentes entre instâncias; logo, cores, dados e conteúdo são personalizados.

## 13. Experiência e comportamento

Fluxo principal:

1. Cliente acessa o catálogo pelo celular ou desktop.
2. Explora categorias, busca ou aplica filtros.
3. Abre o produto e seleciona variações, adicionais e observações quando aplicável.
4. Adiciona itens ao carrinho e revisa o pedido.
5. O sistema verifica se a loja está aberta.
6. Se aberta, gera a mensagem e direciona o cliente ao WhatsApp; se fechada, informa a indisponibilidade e bloqueia o envio.

## 14. Dados, integrações e dependências

- Dados geridos: restaurante, identidade visual, horários, categorias, produtos, fotos, preços, disponibilidade, variações, adicionais, observações e histórico de cliques de envio.
- Integração externa: link `wa.me` para o WhatsApp configurado pelo restaurante.
- Dependências por cliente: dados reais do restaurante, logo, cores, número de WhatsApp, domínio e conteúdo do cardápio.

## 15. Segurança, privacidade e conformidade

- Painel protegido por autenticação de usuário e senha para o dono.
- Não há pagamento nem checkout no MVP.
- O histórico de intenção de envio deve ser tratado como dado operacional; regras de retenção e privacidade serão definidas no planejamento técnico.

## 16. Ambiente, recursos, prazo e modelo comercial

- Primeira versão deve ser produzida o quanto antes, sem data contratual definida.
- A DMG administra domínio e hospedagem das instâncias.
- Modelos comerciais previstos: aquisição definitiva com taxa mensal de ajustes/domínio, ou assinatura mensal.

## 17. Decisões confirmadas

- Template replicável com instâncias personalizadas e únicas.
- Mesma estrutura de páginas e layout entre clientes; personalização de identidade e conteúdo.
- Painel completo apenas para o dono do restaurante.
- Pedidos redirecionados ao WhatsApp por link pré-formatado.
- Busca, filtros, carrinho, observações, variações e adicionais no MVP.
- Horários configuráveis e bloqueio de envio com loja fechada.
- Conteúdo de demonstração fictício e URL de teste para a primeira entrega.
- Direção gastronômica contemporânea aprovada.

## 18. Hipóteses e recomendações

- Definir, no planejamento técnico, a política de retenção e visualização do histórico de cliques de envio.
- Usar dados demonstrativos que representem diferentes categorias e produtos com opções para validar o template de forma completa.

## 19. Questões em aberto

- Nome comercial definitivo do template.
- Prazo de lançamento e orçamento.
- Política de backup, recuperação e retenção de dados.
- Material de identidade e conteúdo de cada cliente no momento de personalização.

## 20. Riscos e dependências

- A qualidade da demonstração e de cada instância depende de fotos, descrições, preços e informações fornecidas pelo restaurante.
- O registro interno não confirma o recebimento nem a aceitação do pedido pelo WhatsApp.
- A gestão de domínio e hospedagem exige um processo operacional contínuo da DMG.

## 21. Próximas etapas

1. Criar os requisitos funcionais a partir desta descoberta.
2. Definir o planejamento técnico, incluindo dados, autenticação, armazenamento de imagens e hospedagem.
3. Estruturar arquitetura de informação e fluxos de interface.
4. Produzir o design e implementar o MVP.
