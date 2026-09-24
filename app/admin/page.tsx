/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { createCategory, createProduct, deleteCategory, deleteProduct, saveHours, saveShop, signIn, signOut, updateProduct, updateProductAvailability } from "./actions";
import { AdminColorField } from "@/components/admin-color-field";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminPageProps = { searchParams: Promise<{ error?: string; notice?: string }> };
type Shop = { name: string; whatsapp_number: string; phone: string | null; address: string | null; instagram_handle: string | null; delivery_information: string | null; primary_color: string | null; accent_color: string | null; background_color: string | null; text_color: string | null; logo_url: string | null; banner_url: string | null } | null;
type Category = { id: string; name: string };
type Product = { id: string; category_id: string; name: string; description: string | null; image_url: string | null; price: number | string; availability: string; variations: Option[]; addons: Option[] };
type Option = { product_id: string; name: string; price_delta: number | string };
type OpeningHour = { day_of_week: number; opens_at: string; closes_at: string };
const errors: Record<string, string> = { "missing-credentials": "Informe e-mail e senha para continuar.", "invalid-credentials": "Não foi possível validar estas credenciais.", "missing-configuration": "A conexão com o Supabase ainda não foi configurada." };
const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return <Setup />;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <Login error={params.error ? (errors[params.error] ?? params.error) : undefined} />;
  const [{ data: shop }, { data: categories }, { data: productRows }, { data: variations }, { data: addons }, { data: hours }, { data: intents }] = await Promise.all([
    supabase.from("shop_settings").select("*").maybeSingle(),
    supabase.from("categories").select("*").order("display_order"),
    supabase.from("products").select("id, category_id, name, description, image_url, price, availability").order("display_order"),
    supabase.from("product_variations").select("product_id, name, price_delta").order("display_order"),
    supabase.from("product_addons").select("product_id, name, price_delta").order("display_order"),
    supabase.from("opening_hours").select("*").order("day_of_week"),
    supabase.from("send_intents").select("created_at").order("created_at", { ascending: false }).limit(5),
  ]);
  const products: Product[] = (productRows ?? []).map((product) => ({ ...product, variations: (variations ?? []).filter((item) => item.product_id === product.id), addons: (addons ?? []).filter((item) => item.product_id === product.id) }));
  return <Dashboard email={user.email ?? "Administrador"} shop={shop} categories={categories ?? []} products={products} hours={hours ?? []} intents={intents ?? []} error={params.error ? (errors[params.error] ?? params.error) : undefined} notice={params.notice} />;
}

function Brand() { return <Link href="/" className="admin-logo"><span>S</span> Sabor & Brasa</Link>; }
function Setup() { return <main className="admin-shell"><section className="admin-login"><Brand /><p className="eyebrow">PAINEL ADMINISTRATIVO</p><h1>Conecte o painel para continuar.</h1><p>Adicione as variáveis do Supabase, aplique a migração e crie o administrador da loja.</p><Link href="/" className="admin-back">← Voltar ao catálogo</Link></section></main>; }
function Login({ error }: { error?: string }) { return <main className="admin-shell"><section className="admin-login"><Brand /><p className="eyebrow">PAINEL ADMINISTRATIVO</p><h1>Bem-vindo de volta.</h1><p>Acesse para manter o cardápio da sua loja.</p>{error && <p className="admin-error" role="alert">{error}</p>}<form action={signIn} className="login-form"><Field label="E-mail"><input name="email" type="email" autoComplete="email" placeholder="voce@restaurante.com" required /></Field><Field label="Senha"><input name="password" type="password" autoComplete="current-password" placeholder="Sua senha" required /></Field><button className="primary-action">Entrar no painel <span>→</span></button></form><Link href="/" className="admin-back">← Ver catálogo público</Link></section></main>; }

function Dashboard({ email, shop, categories, products, hours, intents, error, notice }: { email: string; shop: Shop; categories: Category[]; products: Product[]; hours: OpeningHour[]; intents: { created_at: string }[]; error?: string; notice?: string }) {
  const byDay = Object.fromEntries(hours.map((hour) => [hour.day_of_week, hour]));
  return <main className="admin-app">
    <header className="admin-topbar"><Brand /><div><Link className="preview-link" href="/">↗ Ver catálogo</Link><form action={signOut}><button className="text-button">Sair</button></form></div></header>
    <div className="admin-layout"><aside className="admin-nav"><p>GERENCIAMENTO</p><a href="#produtos">Produtos <span>{products.length}</span></a><a href="#categorias">Categorias <span>{categories.length}</span></a><a href="#horarios">Horários</a><a href="#dados">Dados da loja</a><a href="#intencoes">Atividade</a></aside>
      <section className="admin-main">
        {error && <p className="admin-error" role="alert">Não foi possível concluir: {error}</p>}
        {notice && <p className="admin-notice" role="status">✓ {notice}</p>}
        <div className="admin-welcome"><div><p className="eyebrow">PAINEL DA LOJA</p><h1>Olá, {email.split("@")[0]}.</h1><p>Escolha uma área abaixo para editar. Cada alteração confirma quando for salva.</p></div><div className="welcome-actions"><Link href="/" className="preview-link">↗ Abrir catálogo</Link><Link href="#novo-produto" className="primary-compact">+ Novo produto</Link></div></div>
        <div className="admin-stats"><Stat label="Produtos publicados" value={products.filter((item) => item.availability === "available").length} detail={String(products.length) + " cadastrados"} /><Stat label="Categorias" value={categories.length} detail="Organize seu cardápio" /><Stat label="Contatos recentes" value={intents.length} detail="Aberturas do WhatsApp" /></div>
        <section id="produtos" className="admin-card"><header><div><p className="eyebrow">CARDÁPIO</p><h2>Produtos</h2><p>Cadastre itens e escolha se cada um aparece para o cliente.</p></div></header>
          <details id="novo-produto" className="new-item" open={products.length === 0}><summary><span>+</span> Adicionar novo produto <small>Preencha os dados e salve para publicar</small></summary><form action={createProduct} className="form-grid">
            <Field label="Nome do produto" required><input name="name" placeholder="Ex.: Burger da casa" required /></Field><Field label="Categoria" required><select name="category_id" defaultValue="" required><option value="" disabled>Selecione uma categoria</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
            <Field label="Preço" hint="Use vírgula ou ponto"><input name="price" inputMode="decimal" placeholder="29,90" required /></Field><Field label="Status inicial"><select name="availability" defaultValue="available"><option value="available">Disponível</option><option value="out_of_stock">Indisponível</option><option value="inactive">Oculto do catálogo</option></select></Field>
            <Field label="Foto do produto" hint="Envie uma imagem ou cole uma URL"><input name="image_file" type="file" accept="image/*" /><input name="image_url" type="url" placeholder="https://..." /></Field><Field label="Descrição" wide><textarea name="description" placeholder="Explique ingredientes, porção ou diferencial." /></Field>
            <Field label="Variações" hint="Uma por linha: Nome | adicional" wide><textarea name="variations" placeholder={"Tradicional | 0\nDuplo smash | 9"} /></Field><Field label="Adicionais" hint="Uma por linha: Nome | adicional" wide><textarea name="addons" placeholder={"Bacon crocante | 5\nCheddar extra | 4"} /></Field><div className="form-actions"><button className="primary-action">Salvar produto</button></div>
          </form></details>
          <div className="product-list">{products.length ? products.map((product) => <ProductEditor key={product.id} product={product} categories={categories} />) : <Empty text="Ainda não há produtos cadastrados." />}</div>
        </section>
        <div className="admin-columns"><section id="categorias" className="admin-card"><header><p className="eyebrow">ORGANIZAÇÃO</p><h2>Categorias</h2><p>Elas criam os filtros do catálogo.</p></header><form action={createCategory} className="quick-form"><input name="name" placeholder="Ex.: Sobremesas" required/><button className="primary-compact">Adicionar</button></form><div className="category-pills">{categories.map((category) => <form action={deleteCategory} key={category.id}><span>{category.name}</span><input type="hidden" name="id" value={category.id}/><button aria-label={"Excluir " + category.name}>×</button></form>)}</div></section>
          <section id="intencoes" className="admin-card"><header><p className="eyebrow">ATIVIDADE</p><h2>Contatos recentes</h2><p>Registra só a abertura do WhatsApp.</p></header><ol className="activity-list">{intents.length ? intents.map((item) => <li key={item.created_at}><i />{new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.created_at))}</li>) : <li className="muted">Sem contatos registrados ainda.</li>}</ol></section></div>
        <section id="horarios" className="admin-card"><header><p className="eyebrow">ATENDIMENTO</p><h2>Horários da loja</h2><p>Um dia com os campos vazios será apresentado como fechado.</p></header><form action={saveHours} className="schedule-grid">{weekdays.map((day, index) => <label key={day}><span>{day}</span><div><input aria-label={"Abertura " + day} type="time" name={"open_" + index} defaultValue={byDay[index]?.opens_at.slice(0, 5) ?? ""}/><b>às</b><input aria-label={"Fechamento " + day} type="time" name={"close_" + index} defaultValue={byDay[index]?.closes_at.slice(0, 5) ?? ""}/></div></label>)}<div className="form-actions"><button className="primary-action">Salvar horários</button></div></form></section>
        <section id="dados" className="admin-card"><header><p className="eyebrow">IDENTIDADE</p><h2>Dados da loja</h2><p>Essas informações aparecem no rodapé e no atendimento.</p></header><form action={saveShop} className="form-grid"><Field label="Nome da loja" required><input name="name" defaultValue={shop?.name ?? ""} required /></Field><Field label="WhatsApp" hint="DDI + DDD + número" required><input name="whatsapp_number" inputMode="tel" defaultValue={shop?.whatsapp_number ?? ""} required /></Field><Field label="Telefone exibido"><input name="phone" defaultValue={shop?.phone ?? ""} placeholder="(11) 99999-9999" /></Field><Field label="Instagram"><input name="instagram_handle" defaultValue={shop?.instagram_handle ?? ""} placeholder="@sualoja" /></Field><Field label="Logo" hint="PNG, JPG ou WebP até 5 MB"><input name="logo_file" type="file" accept="image/*" />{shop?.logo_url && <img className="brand-preview logo-preview" src={shop.logo_url} alt="Logo atual"/>}</Field><Field label="Banner do catálogo" hint="Imagem horizontal até 5 MB"><input name="banner_file" type="file" accept="image/*" />{shop?.banner_url && <img className="brand-preview banner-preview" src={shop.banner_url} alt="Banner atual"/>}</Field><Field label="Endereço" wide><input name="address" defaultValue={shop?.address ?? ""} placeholder="Rua, número e bairro" /></Field><Field label="Cor principal" hint="Botões e destaques"><AdminColorField name="primary_color" initialValue={shop?.primary_color ?? "#b84122"}/></Field><Field label="Cor de detalhes" hint="Ícones e pequenos realces"><AdminColorField name="accent_color" initialValue={shop?.accent_color ?? "#e9b566"}/></Field><Field label="Cor base" hint="Fundo do catálogo"><AdminColorField name="background_color" initialValue={shop?.background_color ?? "#fffaf5"}/></Field><Field label="Cor do texto" hint="Textos sobre o fundo"><AdminColorField name="text_color" initialValue={shop?.text_color ?? "#271a16"}/></Field><Field label="Informação de atendimento" wide><textarea name="delivery_information" defaultValue={shop?.delivery_information ?? ""} placeholder="Ex.: Retirada e entrega sob consulta." /></Field><div className="form-actions"><button className="primary-action">Salvar dados da loja</button></div></form></section>
      </section>
    </div>
  </main>;
}
function ProductEditor({ product, categories }: { product: Product; categories: Category[] }) {
  const formatOptions = (items: Option[]) => items.map((item) => `${item.name} | ${Number(item.price_delta).toLocaleString("pt-BR", { useGrouping: false })}`).join("\n");
  const price = Number(product.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  const status = product.availability === "available" ? "Disponível" : product.availability === "out_of_stock" ? "Indisponível" : "Oculto";
  return <article className="product-row">
    <div className="product-avatar">{product.name.slice(0, 1)}</div>
    <div className="product-info"><strong>{product.name}</strong><span>R$ {price} · {status}</span></div>
    <div className="product-controls"><form action={updateProductAvailability}><input type="hidden" name="id" value={product.id}/><select aria-label={`Status de ${product.name}`} name="availability" defaultValue={product.availability}><option value="available">Disponível</option><option value="out_of_stock">Indisponível</option><option value="inactive">Oculto</option></select><button className="soft-button">Salvar status</button></form></div>
    <details className="product-editor"><summary>Editar produto</summary><form action={updateProduct} className="form-grid"><input type="hidden" name="id" value={product.id}/>
      <Field label="Nome do produto" required><input name="name" defaultValue={product.name} required/></Field><Field label="Categoria" required><select name="category_id" defaultValue={product.category_id} required>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
      <Field label="Preço" required><input name="price" inputMode="decimal" defaultValue={String(product.price).replace(".", ",")} required/></Field><Field label="Disponibilidade"><select name="availability" defaultValue={product.availability}><option value="available">Disponível</option><option value="out_of_stock">Indisponível</option><option value="inactive">Oculto do catálogo</option></select></Field>
      <Field label="Nova foto" hint="Opcional — substitui a imagem atual"><input name="image_file" type="file" accept="image/*"/></Field><Field label="URL da imagem" hint="Opcional"><input name="image_url" type="url" defaultValue={product.image_url ?? ""} placeholder="https://..."/></Field>
      <Field label="Descrição" wide><textarea name="description" defaultValue={product.description ?? ""}/></Field><Field label="Variações" hint="Uma por linha: Nome | adicional" wide><textarea name="variations" defaultValue={formatOptions(product.variations)}/></Field><Field label="Adicionais" hint="Uma por linha: Nome | adicional" wide><textarea name="addons" defaultValue={formatOptions(product.addons)}/></Field>
      <div className="form-actions"><button className="primary-action">Salvar alterações</button></div>
    </form></details>
    <form action={deleteProduct} className="delete-product"><input type="hidden" name="id" value={product.id}/><button className="icon-danger" aria-label={`Excluir ${product.name}`}>×</button></form>
  </article>;
}
function Field({ label, hint, wide, required, children }: { label: string; hint?: string; wide?: boolean; required?: boolean; children: React.ReactNode }) { return <label className={wide ? "field wide" : "field"}><span>{label}{required && <b> *</b>}{hint && <small>{hint}</small>}</span>{children}</label>; }
function Stat({ label, value, detail }: { label: string; value: number; detail: string }) { return <article><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>; }
function Empty({ text }: { text: string }) { return <p className="list-empty">{text}</p>; }
