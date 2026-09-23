# Catálogo Restaurante

Template de catálogo digital para restaurantes, com carrinho e encaminhamento do pedido ao WhatsApp.

## Executar localmente

```powershell
npm install
npm run dev
```

Abra `http://localhost:3000`.

## O que já está implementado

- Catálogo demonstrativo responsivo.
- Busca, filtros por categoria, produtos indisponíveis e fotos demonstrativas.
- Configuração de produto com variação, adicionais e observação.
- Carrinho com quantidades e cálculo de total.
- Interface preparada para encaminhamento ao WhatsApp.
- Migração Supabase com entidades do catálogo, horários, histórico mínimo, RLS e política de Storage.

## Configurar Supabase

1. Crie um projeto Supabase para a instância do restaurante.
2. Copie `.env.example` para `.env.local` e preencha a URL e a chave publicável do projeto.
3. Vincule o CLI ao projeto e aplique a migração em `supabase/migrations/`.
4. Crie o único usuário administrador do restaurante pelo Supabase Auth.
5. Crie os dados iniciais da loja, categorias, produtos e horários.

Nenhuma chave secreta deve ser exposta ao navegador ou incluída no repositório.

## Verificação

```powershell
npm run typecheck
npm run lint
npm run build
```

## Documentação

- `docs/01-project-discovery.md`
- `docs/02-requirements.md`
- `docs/04-technical-proposal.md`
- `docs/05-visual-spec.md`
- `docs/06-ux-ui-spec.md`
- `docs/11-master-prompt.md`
