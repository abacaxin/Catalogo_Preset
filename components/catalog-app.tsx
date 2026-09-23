"use client";

import { useMemo, useState } from "react";

export type CatalogProduct = {
  id: string | number;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  unavailable?: boolean;
  variations?: { name: string; price: number }[];
  extras?: { name: string; price: number }[];
};

export type CatalogShop = {
  name: string;
  whatsappNumber: string;
  phone?: string | null;
  address?: string | null;
  instagram?: string | null;
  deliveryInformation?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  isOpen?: boolean;
  statusLabel?: string;
};

type CartItem = {
  key: string;
  product: CatalogProduct;
  variation?: { name: string; price: number };
  extras: { name: string; price: number }[];
  note: string;
  quantity: number;
};

const demoProducts: CatalogProduct[] = [
  {
    id: 1,
    category: "Mais pedidos",
    name: "Burger da casa",
    description: "Blend artesanal, queijo cheddar, cebola caramelizada e maionese da casa.",
    price: 29.9,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    variations: [
      { name: "Tradicional", price: 0 },
      { name: "Duplo smash", price: 9 }
    ],
    extras: [
      { name: "Bacon crocante", price: 5 },
      { name: "Cheddar extra", price: 4 },
      { name: "Picles artesanal", price: 3 }
    ]
  },
  {
    id: 2,
    category: "Mais pedidos",
    name: "Frango crocante",
    description: "Peito de frango empanado, salada fresca e molho de ervas.",
    price: 27.9,
    image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    category: "Burgers",
    name: "Brasa bacon",
    description: "Blend bovino, bacon defumado, queijo prato e barbecue da casa.",
    price: 32.9,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    category: "Acompanhamentos",
    name: "Batata rústica",
    description: "Batatas temperadas, ervas frescas e páprica defumada.",
    price: 15.9,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5,
    category: "Bebidas",
    name: "Limonada da casa",
    description: "Limão siciliano, hortelã e água com gás.",
    price: 10.9,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6,
    category: "Burgers",
    name: "Veggie grill",
    description: "Hambúrguer de grão-de-bico, cogumelos e creme de castanhas.",
    price: 28.9,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=85",
    unavailable: true
  }
];

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function CatalogApp({ initialProducts, shop }: { initialProducts?: CatalogProduct[]; shop?: CatalogShop } = {}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState<CatalogProduct | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);

  const catalogProducts = initialProducts?.length ? initialProducts : demoProducts;
  const categories = ["Todos", ...Array.from(new Set(catalogProducts.map((product) => product.category)))];
  const filteredProducts = useMemo(() => catalogProducts.filter((product) => {
    const matchesCategory = category === "Todos" || product.category === category;
    const searchable = `${product.name} ${product.description}`.toLowerCase();
    return matchesCategory && searchable.includes(query.toLowerCase());
  }), [catalogProducts, category, query]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (item.product.price + (item.variation?.price ?? 0) + item.extras.reduce((extraSum, extra) => extraSum + extra.price, 0)) * item.quantity, 0);

  function addItem(item: CartItem) {
    setCart((current) => [...current, item]);
    setSelected(null);
    setNotice(`${item.product.name} foi adicionado ao carrinho.`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function updateQuantity(key: string, change: number) {
    setCart((current) => current.flatMap((item) => {
      if (item.key !== key) return [item];
      const quantity = item.quantity + change;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  }

  async function sendToWhatsApp() {
    setSending(true);

    try {
      const response = await fetch("/api/send-intent", { method: "POST" });
      const result = await response.json() as { error?: string };

      if (!response.ok) {
        setNotice(result.error ?? "Não foi possível preparar o encaminhamento do pedido.");
        return;
      }

    const lines = cart.flatMap((item) => {
      const options = [item.variation?.name, ...item.extras.map((extra) => extra.name)].filter(Boolean).join(", ");
      return [`${item.quantity}x ${item.product.name}${options ? ` (${options})` : ""} — ${money((item.product.price + (item.variation?.price ?? 0) + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity)}${item.note ? `\n  Obs.: ${item.note}` : ""}`];
    });
    const message = ["Olá! Gostaria de fazer este pedido:", "", ...lines, note ? `\nObservação geral: ${note}` : "", `\nTotal: ${money(total)}`].filter(Boolean).join("\n");
      window.location.assign(`https://wa.me/${shop?.whatsappNumber ?? "5511999999999"}?text=${encodeURIComponent(message)}`);
    } catch {
      setNotice("Não foi possível preparar o encaminhamento do pedido.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <section className="hero" style={shop?.bannerUrl ? { backgroundImage: `linear-gradient(90deg,rgba(37,18,12,.86),rgba(37,18,12,.2)),url(${shop.bannerUrl})` } : undefined}>
        <div className="shell hero-inner">
          <div className="brand-row"><span className={shop?.logoUrl ? "brand-mark logo" : "brand-mark"} style={shop?.logoUrl ? { backgroundImage: `url(${shop.logoUrl})` } : undefined}>{shop?.name?.slice(0, 1) ?? "S"}</span><span>{shop?.name ?? "Sabor & Brasa"}</span></div>
          <span className={shop?.isOpen === false ? "status closed" : "status"}><i /> {shop?.statusLabel ?? "Aberto agora"}</span>
          <p>Hambúrgueres artesanais, sabores feitos na brasa.</p>
          <a href="#cardapio" className="hero-link">Ver cardápio <span>↓</span></a>
        </div>
      </section>

      <section id="cardapio" className="shell catalog-section">
        <div className="section-heading">
          <div><p className="eyebrow">CARDÁPIO</p><h1>O seu momento de sabor.</h1></div>
          <p className="caption">Escolha seus favoritos e envie o pedido direto para a gente.</p>
        </div>

        <label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar no cardápio" /><button type="button" aria-label="Limpar busca" onClick={() => setQuery("")} className={query ? "visible" : ""}>×</button></label>
        <div className="chips" aria-label="Filtrar por categoria">
          {categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={category === item ? "chip active" : "chip"}>{item}</button>)}
        </div>

        {filteredProducts.length ? <div className="product-grid">
          {filteredProducts.map((product) => <button key={product.id} type="button" className={product.unavailable ? "product-card unavailable" : "product-card"} onClick={() => !product.unavailable && setSelected(product)}>
            <span className="product-image" style={{ backgroundImage: `url(${product.image})` }} />
            <span className="product-copy"><span className="product-name">{product.name}</span><span className="product-description">{product.description}</span><span className="product-bottom"><strong>{money(product.price)}</strong>{product.unavailable ? <em>Indisponível</em> : <b>Adicionar +</b>}</span></span>
          </button>)}
        </div> : <div className="empty-state"><span>⌕</span><h2>Nada encontrado</h2><p>Tente outro termo ou escolha uma categoria diferente.</p><button type="button" onClick={() => { setQuery(""); setCategory("Todos"); }}>Limpar filtros</button></div>}
      </section>

      <footer className="footer"><div className="shell footer-grid"><div><div className="brand-row"><span className={shop?.logoUrl ? "brand-mark logo" : "brand-mark"} style={shop?.logoUrl ? { backgroundImage: `url(${shop.logoUrl})` } : undefined}>{shop?.name?.slice(0, 1) ?? "S"}</span><span>{shop?.name ?? "Sabor & Brasa"}</span></div><p>Sabores sinceros, feitos no fogo.</p></div><div><strong>Onde estamos</strong><p>{shop?.address ?? "Rua das Palmeiras, 110\nVila Madalena · São Paulo"}</p></div><div><strong>Fale com a gente</strong><p>{shop?.phone ?? "(11) 99999-9999"}<br />{shop?.instagram ?? "@saborebrasa"}</p></div></div></footer>

      {totalItems > 0 && <button type="button" className="floating-cart" onClick={() => setCartOpen(true)}><span>🛍</span><span>{totalItems} {totalItems === 1 ? "item" : "itens"}</span><strong>{money(total)}</strong></button>}
      {notice && <div className="toast" role="status">✓ {notice}</div>}
      {selected && <ProductSheet product={selected} onClose={() => setSelected(null)} onAdd={addItem} />}
      {cartOpen && <CartSheet cart={cart} note={note} total={total} sending={sending} onClose={() => setCartOpen(false)} onNote={setNote} onQuantity={updateQuantity} onSend={sendToWhatsApp} />}
    </main>
  );
}

function ProductSheet({ product, onClose, onAdd }: { product: CatalogProduct; onClose: () => void; onAdd: (item: CartItem) => void }) {
  const [variation, setVariation] = useState<{ name: string; price: number } | undefined>(product.variations?.[0]);
  const [extras, setExtras] = useState<{ name: string; price: number }[]>([]);
  const [note, setNote] = useState("");
  const finalPrice = product.price + (variation?.price ?? 0) + extras.reduce((sum, extra) => sum + extra.price, 0);
  function toggleExtra(extra: { name: string; price: number }) { setExtras((current) => current.some((item) => item.name === extra.name) ? current.filter((item) => item.name !== extra.name) : [...current, extra]); }
  return <div className="overlay" role="presentation"><section className="sheet product-sheet" role="dialog" aria-modal="true" aria-label={product.name}><button className="close" onClick={onClose} aria-label="Fechar">×</button><div className="sheet-image" style={{ backgroundImage: `url(${product.image})` }} /><div className="sheet-body"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p>{product.description}</p><strong className="sheet-price">A partir de {money(product.price)}</strong>{product.variations && <fieldset><legend>Escolha uma opção <span>obrigatório</span></legend>{product.variations.map((item) => <label className="option" key={item.name}><input type="radio" name="variation" checked={variation?.name === item.name} onChange={() => setVariation(item)} /><span>{item.name}</span><b>{item.price ? `+ ${money(item.price)}` : "Incluso"}</b></label>)}</fieldset>}{product.extras && <fieldset><legend>Quer adicionar algo?</legend>{product.extras.map((item) => <label className="option" key={item.name}><input type="checkbox" checked={extras.some((extra) => extra.name === item.name)} onChange={() => toggleExtra(item)} /><span>{item.name}</span><b>+ {money(item.price)}</b></label>)}</fieldset>}<label className="field-label">Alguma observação?<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Ex.: sem cebola, molho à parte..." /></label><button className="primary-action" onClick={() => onAdd({ key: `${product.id}-${Date.now()}`, product, variation, extras, note, quantity: 1 })}>Adicionar · {money(finalPrice)}</button></div></section></div>;
}

function CartSheet({ cart, note, total, sending, onClose, onNote, onQuantity, onSend }: { cart: CartItem[]; note: string; total: number; sending: boolean; onClose: () => void; onNote: (value: string) => void; onQuantity: (key: string, change: number) => void; onSend: () => void }) {
  return <div className="overlay" role="presentation"><section className="sheet cart-sheet" role="dialog" aria-modal="true" aria-label="Seu pedido"><div className="cart-head"><div><p className="eyebrow">SEU PEDIDO</p><h2>Quase lá.</h2></div><button className="close" onClick={onClose} aria-label="Fechar">×</button></div><div className="cart-items">{cart.map((item) => <article key={item.key} className="cart-item"><div><strong>{item.product.name}</strong><p>{[item.variation?.name, ...item.extras.map((extra) => extra.name)].filter(Boolean).join(", ")}</p>{item.note && <p className="item-note">“{item.note}”</p>}</div><div className="cart-controls"><span>{money((item.product.price + (item.variation?.price ?? 0) + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity)}</span><div><button onClick={() => onQuantity(item.key, -1)} aria-label={`Remover uma unidade de ${item.product.name}`}>−</button><b>{item.quantity}</b><button onClick={() => onQuantity(item.key, 1)} aria-label={`Adicionar uma unidade de ${item.product.name}`}>+</button></div></div></article>)}</div><label className="field-label">Observação geral<textarea value={note} onChange={(event) => onNote(event.target.value)} placeholder="Ex.: chamar no interfone, se necessário..." /></label><div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><p className="whatsapp-note">Você será direcionado para o WhatsApp para concluir seu pedido.</p><button className="primary-action whatsapp" onClick={onSend} disabled={sending}>{sending ? "Preparando atendimento..." : <>Continuar no WhatsApp <span>↗</span></>}</button></section></div>;
}
