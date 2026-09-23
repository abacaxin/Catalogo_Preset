# Decisions

## Confirmed product decisions

| Decision | Status | Source | Impact |
| --- | --- | --- |
| Cada restaurante recebe uma instância própria com a mesma estrutura de template. | Confirmed | Discovery | Não implementar multi-tenancy no MVP. |
| Pedido é encaminhado por link `wa.me`. | Confirmed | Discovery and requirements | Não usar WhatsApp Business API ou checkout. |
| O histórico guarda somente data e hora da intenção de envio. | Confirmed | Responsible decision | Não guardar itens, valores, observações ou dados do cliente. |
| O painel tem somente o perfil do dono. | Confirmed | Discovery | Não criar cadastro público ou perfis de funcionário. |
| O catálogo bloqueia encaminhamento quando a loja está fechada. | Confirmed | Responsible decision | Horários e pausas definem a disponibilidade. |
| Direção gastronômica contemporânea e mobile-first. | Confirmed | Visual specification | Fotos, paleta quente personalizável e carrinho acessível. |

## Pending technical decision

| Decision | Status | Rationale | Approval required |
| --- | --- | --- | --- |
| Stack, banco, autenticação, armazenamento de imagens e hospedagem. | Approved for implementation in `docs/04-technical-proposal.md` | Não há código ou infraestrutura existente. | No; deployment and external provisioning remain separate approvals. |
