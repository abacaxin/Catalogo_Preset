# Visual Specification

## 1. Resumo da direção visual

O Catálogo Restaurante deve comunicar praticidade, clareza e apetite. A experiência pública tem caráter gastronômico contemporâneo: fotografia de comida conduz a atenção, a navegação é simples e o carrinho mantém o pedido visível. O painel administrativo usa a mesma base de identidade, porém privilegia organização, legibilidade e operação.

Cada restaurante receberá logo, cores e conteúdo próprios, preservando a estrutura visual do template. A direção evita reproduzir a identidade de plataformas de delivery: o catálogo leva o cliente à conversa direta com o restaurante pelo WhatsApp.

## 2. Contexto de produto e público

- **Produto:** catálogo digital com carrinho e encaminhamento ao WhatsApp, acompanhado de painel para o dono do restaurante.
- **Público principal:** cliente que consulta cardápio e monta pedido, predominantemente pelo celular.
- **Público secundário:** dono que atualiza produtos, horários, disponibilidade e dados da loja.
- **Contexto de uso:** consulta rápida em celular, frequentemente com atenção limitada; decisão favorecida por fotos, preço visível e leitura direta.
- **Necessidade visual central:** tornar produtos e ações de pedido evidentes sem esconder informações operacionais, como disponibilidade e funcionamento da loja.

## 3. Objetivos de design

1. Tornar o cardápio fácil de percorrer, pesquisar e filtrar em telas pequenas.
2. Dar protagonismo a pratos e produtos por meio de imagens de boa qualidade e preço claramente associado.
3. Manter o carrinho e o próximo passo perceptíveis sem transformar a experiência em checkout.
4. Garantir que loja aberta/fechada, produto indisponível e exigência de seleção sejam compreendidos antes de o visitante tentar enviar o pedido.
5. Permitir personalização de marca por restaurante sem comprometer contraste, consistência ou hierarquia.
6. Manter o painel objetivo para tarefas de gestão frequentes.

## 4. Princípios visuais

### 4.1 Comida primeiro
- **Status:** confirmado.
- **Fonte:** discovery; requirements RNF-002.
- Fotos grandes, apetitosas e bem recortadas são o principal recurso de apresentação do produto.
- O nome, o preço e a ação de adicionar devem permanecer legíveis sem competir com a imagem.

### 4.2 Clareza antes de ornamento
- **Status:** derivado.
- **Fonte:** uso prioritário em celular e fluxo de pedido.
- Busca, categoria, disponibilidade, preço, carrinho e total devem receber prioridade sobre elementos decorativos.
- Espaçamento, contraste e agrupamento visual devem explicar a interface antes do uso de efeitos.

### 4.3 Personalização com estrutura estável
- **Status:** confirmado.
- **Fonte:** discovery; requirements RF-012 e RNF-004.
- Logo e cores variam por restaurante; a escala tipográfica, os espaçamentos, a estrutura de cartões e os estados de interação permanecem consistentes no template.

### 4.4 Calor gastronômico com acabamento contemporâneo
- **Status:** confirmado para o caráter gastronômico; derivado para sua aplicação.
- **Fonte:** decisão aprovada na discovery.
- A atmosfera deve ser acolhedora e refinada sem recorrer a texturas pesadas, excesso de rusticidade ou aparência genérica de aplicativo de delivery.

### 4.5 Ação sem falsa promessa
- **Status:** derivado.
- **Fonte:** requirements RF-006, RF-007 e RN-004.
- A interface deve indicar que o próximo passo abre uma conversa no WhatsApp. Não deve sugerir pagamento, confirmação ou acompanhamento do pedido dentro do catálogo.

## 5. Restrições de marca

| Item | Estado | Diretriz |
| --- | --- | --- |
| Logo | Confirmado como personalizável | Usar arquivo fornecido pelo restaurante; não redesenhar nem criar marca como parte do template. |
| Cores | Confirmado como personalizável | Aplicar por papéis de cor e validar contraste antes de publicar cada instância. |
| Tipografia oficial | Em aberto | Enquanto não houver fonte de marca, usar uma família de interface legível definida no UX/UI. |
| Conteúdo e fotos | Fornecidos por restaurante na entrega; fictícios na demonstração | A qualidade visual depende de imagens adequadas e informações completas. |
| Estrutura visual | Confirmada | Não mudar por cliente sem uma revisão de escopo. |

## 6. Estratégia de cor

Não há valores de cor oficiais neste momento. A personalização deve funcionar por papéis, e não pela substituição indiscriminada de qualquer cor da interface.

| Papel | Uso |
| --- | --- |
| Cor de marca principal | Ações primárias, seleção, destaque de preço ou elementos de identidade. |
| Cor de marca de apoio | Ênfases secundárias, detalhes de navegação ou ilustrações decorativas contidas. |
| Fundo quente claro | Fundo predominante do catálogo, com aparência limpa e acolhedora. |
| Superfície clara | Cartões, campos, painéis e áreas de leitura. |
| Texto escuro | Títulos, descrições, preços e controles com leitura prioritária. |
| Neutro secundário | Legendas, divisores, estados inativos e informação de apoio. |
| Sucesso | Loja aberta, confirmação de ação local e disponibilidade positiva. |
| Atenção | Avisos contextuais, como horários próximos do encerramento quando aplicável ao UX. |
| Erro/indisponível | Produto esgotado, validação e bloqueio de envio. |

### Regras de uso

- O fundo e as superfícies não devem competir com a fotografia.
- A cor de marca deve concentrar a ação principal e não ser aplicada a todos os elementos simultaneamente.
- Texto e ícones devem manter contraste suficiente em qualquer paleta recebida.
- Estados semânticos não podem depender apenas de cor; devem usar texto e/ou ícone correspondente.
- Não há requisito de tema escuro para o MVP; sua necessidade permanece em aberto.

## 7. Tipografia

### Papéis tipográficos

| Papel | Uso | Diretriz |
| --- | --- | --- |
| Título de vitrine | Nome da loja, categorias de destaque e cabeçalhos principais | Presença moderada e leitura rápida; não deve competir com fotos. |
| Título de produto | Nome do item em cartões e detalhe | Peso visual suficiente para ser identificado em uma passada de olho. |
| Texto de apoio | Descrição, ingredientes, avisos e dados da loja | Alta legibilidade em tela pequena; comprimento controlado. |
| Preço e total | Preço de produto, subtotal e total do carrinho | Peso e contraste elevados; dígitos alinhados de modo consistente. |
| Ação e formulário | Botões, filtros, campos e painel | Linguagem direta, sem abreviações ambíguas. |
| Legenda | Observações, horário e metadados | Discreta, mas legível; não depender de tamanho excessivamente pequeno. |

### Diretrizes

- A família tipográfica específica é uma decisão proposta para o UX/UI, salvo se a marca do cliente fornecer uma fonte oficial.
- Usar poucos pesos e uma escala repetível para evitar um catálogo visualmente fragmentado.
- Preços, quantidades e total devem ter largura e alinhamento estáveis para comparação rápida.
- Textos de ações devem descrever o resultado: por exemplo, "Adicionar ao carrinho" e "Continuar no WhatsApp".

## 8. Imagens e mídia

### Fotografia de produtos

- **Status:** confirmado quanto ao protagonismo; derivado quanto às regras de aplicação.
- Preferir fotografias nítidas, com iluminação apetitosa e foco reconhecível no prato.
- O produto deve ocupar a maior parte da área visível; fundos muito carregados devem ser evitados.
- Usar recortes consistentes para cartões de uma mesma grade, preservando o ponto focal da imagem.
- O tratamento deve manter cores naturais de alimento; evitar filtros agressivos ou sobreposição de texto diretamente sobre áreas visualmente complexas.

### Fallbacks e conteúdo demonstrativo

- Enquanto a imagem real não estiver disponível, usar placeholder neutro e claramente não promocional.
- A demonstração deve representar diferentes tipos de produto, inclusive ao menos um produto com opções, para validar os componentes.
- O UX/UI deve prever imagem ausente sem quebrar a hierarquia do cartão.

### Ícones

- Ícones devem ser simples, de traço coerente e usados para reforçar ações ou estados conhecidos.
- Um ícone não substitui o texto em ações críticas, disponibilidade ou status de funcionamento.
- Ícones de comida decorativos devem ser usados com parcimônia para não competir com as fotos reais.

## 9. Layout e composição

### Catálogo público

- A leitura deve seguir: identidade da loja e status → busca/filtros → categorias → produtos → carrinho e ação de WhatsApp.
- A busca e os filtros devem ficar visíveis cedo no fluxo, com controles fáceis de alcançar no celular.
- Categorias precisam de identificação rápida e espaço suficiente para nomes reais de restaurantes.
- Cartões de produto priorizam foto, nome, preço, disponibilidade e ação de adicionar, nessa ordem de leitura.
- Produtos com opções devem comunicar que exigem configuração antes de entrar no carrinho.
- O carrinho deve continuar acessível durante a navegação e explicitar a quantidade de itens e o total quando houver itens.
- Informações institucionais e de entrega aparecem como apoio ao catálogo, sem disputar o topo com produtos e categorias.

### Painel administrativo

- A hierarquia deve privilegiar tarefas: dados da loja, horários, categorias, produtos, disponibilidade, opções e histórico.
- Formulários devem agrupar campos por tema e separar ações destrutivas das ações rotineiras.
- Exclusão definitiva requer confirmação visual explícita, em alinhamento com RN-005.
- Listas administrativas devem tornar estado, preço, categoria e ação de edição reconhecíveis sem depender de imagens grandes.
- O histórico deve ser apresentado como "intenções de envio" e limitar-se à data e à hora, sem linguagem de vendas concluídas.

## 10. Formas, bordas, superfícies e elevação

- **Status:** proposto, aprovado como direção geral pelo responsável.
- Cartões e controles usam cantos suavemente arredondados para criar uma sensação acolhedora e contemporânea.
- Superfícies claras se diferenciam do fundo por contraste leve, borda discreta ou sombra curta; não usar os três recursos de forma intensa ao mesmo tempo.
- Elevação deve indicar relação de camada ou ação temporária, como carrinho expandido, modal de produto ou confirmação de exclusão.
- Divisores são discretos e devem servir à organização, não à decoração.

## 11. Linguagem de interação e movimento

- Respostas visuais devem ser imediatas quando o usuário adiciona item, altera quantidade, aplica filtro, salva configuração ou encontra erro.
- Transições devem ser curtas, funcionais e contidas; não usar animações contínuas que distraiam da escolha de produtos.
- Estados de foco, pressionado, selecionado, indisponível e erro devem ser visualmente distintos.
- O carrinho pode receber uma transição curta ao ganhar item, reforçando que a ação foi concluída localmente.
- O botão que abre WhatsApp deve comunicar esse destino por texto e ícone apropriado.
- A interface deve respeitar preferências de redução de movimento.

## 12. Princípios responsivos

### Mobile

- **Status:** confirmado como prioridade.
- Priorizar uma coluna, áreas de toque confortáveis e carrinho acessível sem exigir retorno ao topo.
- Fotos, filtros e controles devem se adaptar ao uso com uma mão sempre que possível.
- Informações essenciais não devem depender de hover.

### Tablet e desktop

- Aumentar a quantidade de produtos visíveis por linha sem reduzir a clareza de foto, preço e ação.
- Manter largura de leitura controlada para textos e formulários.
- Usar espaço adicional para comparação e organização; não apenas ampliar componentes de celular.
- Estados de hover podem complementar, mas nunca substituir, estados permanentes e acessíveis.

## 13. Considerações de acessibilidade

- Validar contraste entre texto, ícones e fundos personalizados para cada instância.
- Indicar status aberto/fechado, indisponibilidade e erro com texto além de cor.
- Manter rótulos visíveis para busca, filtros, campos, opções e controles de quantidade.
- Oferecer foco perceptível e navegação utilizável por teclado no catálogo e no painel.
- Garantir que ações principais tenham área de toque adequada em telas pequenas.
- Usar textos alternativos significativos para imagens de produto quando houver descrição relevante; imagens apenas decorativas devem ser tratadas como tal.
- Não há requisito formal de nível de conformidade definido; validação detalhada é uma pendência para UX/UI e planejamento técnico.

## 14. Princípios de consistência de componentes

| Componente | Regra de consistência |
| --- | --- |
| Botões | Uma ação primária por contexto; rótulo orientado ao resultado; estados completo de interação. |
| Cartões de produto | Mesma ordem de informação e tratamento de imagem em toda a grade. |
| Preços | Formato monetário, peso e posição consistentes. |
| Disponibilidade | Mesma linguagem de texto, cor e ícone para disponível, esgotado e inativo. |
| Campos e validação | Rótulo visível, mensagem próxima ao campo e indicação não baseada apenas em cor. |
| Filtros e categorias | Estado selecionado inequívoco e opção clara para remoção de filtro. |
| Carrinho | Quantidade, itens e total sempre reconhecíveis; ação de WhatsApp só aparece habilitada quando aplicável. |
| Confirmações destrutivas | Mensagem explícita sobre permanência da exclusão e ação visualmente distinta da edição. |

## 15. Padrões a evitar

- Paletas com muitas cores concorrendo entre si ou que tornem a marca difícil de reconhecer.
- Texto longo, claro ou de baixo contraste sobre fotografia de alimento.
- Cards excessivamente elevados, com muitas bordas, gradientes ou sombras pesadas.
- Ícones sem rótulo para ações de envio, disponibilidade ou exclusão.
- Chamadas que indiquem "pedido confirmado", "compra concluída" ou "pagamento" antes da conversa no WhatsApp.
- Ocultar status de loja fechada até o final do carrinho.
- Reproduzir a identidade visual de marketplaces ou aplicativos de delivery concorrentes.
- Personalizações por cliente que alterem a estrutura aprovada do template sem revisão de escopo.

## 16. Referências e inspiração

Não foram fornecidas referências visuais externas. A direção é fundamentada nos requisitos do produto e não em uma marca ou interface específica.

| Fonte | O que orientar | O que não copiar | Estado |
| --- | --- | --- | --- |
| Fotografia gastronômica editorial | Enquadramento apetitoso, foco no prato e luz que evidencie textura e cor. | Estilo, logotipo ou composição identificável de qualquer restaurante. | Referência conceitual. |
| Catálogos mobile de alimentação | Hierarquia de produto, preço, categoria e carrinho. | Padrões de marketplace, checkout ou identidade de plataformas de delivery. | Referência conceitual. |

## 17. Decisões confirmadas

- Estilo gastronômico contemporâneo.
- Fotos grandes e apetitosas como elemento central.
- Paleta quente personalizável por restaurante.
- Leitura fácil no celular e prioridade para uso mobile.
- Carrinho acessível durante a navegação.
- Estrutura visual consistente entre instâncias; personalização limitada a logo, cores, dados e conteúdo.
- Painel com apresentação funcional e orientada a tarefas.

## 18. Decisões derivadas e propostas

| Decisão | Status | Justificativa |
| --- | --- | --- |
| Fundo quente claro e superfícies claras | Derivada | Mantém o clima gastronômico sem competir com fotos e conteúdo. |
| Cor de marca concentrada em ações e seleção | Derivada | Permite personalização com hierarquia e contraste estáveis. |
| Formas suavemente arredondadas e sombras leves | Proposta aprovada como direção geral | Reforça acolhimento sem criar aparência pesada. |
| Tipografia de interface de alta legibilidade | Proposta | Não há fonte oficial; a seleção concreta é trabalho de UX/UI. |
| Movimento breve e funcional | Derivada | Ajuda a confirmar ações de carrinho e formulário sem distrair. |
| Ausência de tema escuro no MVP | Em aberto | Não foi solicitado; deve ser avaliado somente se necessário. |

## 19. Questões em aberto

- Nome comercial do template.
- Tipografias oficiais quando cada restaurante possuir manual de marca.
- Paletas reais, logotipos e material fotográfico de cada instância entregue.
- Necessidade de tema escuro em uma futura versão.
- Nível formal de acessibilidade e critérios de validação específicos.

## 20. Rastreabilidade

| Fonte | Impacto visual |
| --- | --- |
| Discovery: estilo gastronômico contemporâneo | Princípios de comida primeiro, atmosfera acolhedora e acabamento contido. |
| Discovery: fotos grandes, paleta quente e carrinho acessível | Estratégia de imagem, cor e composição do catálogo. |
| RF-001 a RF-006 | Hierarquia de catálogo, produto, carrinho, status e ação de WhatsApp. |
| RF-008 a RF-014 | Direção funcional do painel, estados, formulários e histórico. |
| RNF-001 | Princípios responsivos com foco em celular. |
| RNF-002 | Critérios de clareza e validação da direção visual. |
| RN-003 e RN-004 | Comunicação visual de loja fechada e natureza do envio pelo WhatsApp. |
| RN-005 | Confirmação explícita para exclusões definitivas. |

## 21. Handoff para UX/UI

- Criar fluxos e telas detalhadas sem introduzir checkout, pagamento, rastreamento de pedido ou novas regras de configuração de produtos.
- Começar pelo catálogo mobile: cabeçalho da loja, status, busca, categorias, card de produto, configuração do item, carrinho e encaminhamento ao WhatsApp.
- Em seguida, detalhar as telas operacionais do painel: login, visão de cardápio, edição de produto, categorias, opções, horários, dados da loja e histórico de intenções.
- Definir tokens concretos de cor, tipografia, espaçamento, raio e estados a partir desta direção, validando contraste em paletas personalizadas.
- Usar conteúdo demonstrativo que exercite produtos simples, itens com variações/adicionais, indisponibilidade, loja fechada e carrinho com múltiplos itens.
