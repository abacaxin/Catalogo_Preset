const { loadEnvConfig } = require("@next/env");
const { createClient } = require("@supabase/supabase-js");

loadEnvConfig(process.cwd());

async function seed() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) throw new Error("Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY em .env.local.");

  const supabase = createClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 2 });
  if (usersError || users.users.length !== 1) throw new Error("O seed exige exatamente um administrador criado no Supabase Auth.");

  const ownerId = users.users[0].id;
  const { count, error: shopCountError } = await supabase.from("shop_settings").select("id", { count: "exact", head: true });
  if (shopCountError) throw shopCountError;
  if (count) throw new Error("A loja já possui dados; o seed demonstrativo não sobrescreve conteúdo existente.");

  const { error: shopError } = await supabase.from("shop_settings").insert({
    owner_id: ownerId,
    name: "Sabor & Brasa",
    primary_color: "#b84122",
    accent_color: "#e9b566",
    whatsapp_number: "5511999999999",
    phone: "(11) 99999-9999",
    address: "Rua das Palmeiras, 110 · Vila Madalena · São Paulo",
    instagram_handle: "@saborebrasa",
    delivery_information: "Consulte disponibilidade e região pelo WhatsApp."
  });
  if (shopError) throw shopError;

  const categoryRows = ["Mais pedidos", "Burgers", "Acompanhamentos", "Bebidas"].map((name, display_order) => ({ owner_id: ownerId, name, display_order }));
  const { data: categories, error: categoriesError } = await supabase.from("categories").insert(categoryRows).select("id, name");
  if (categoriesError || !categories) throw categoriesError ?? new Error("Categorias não retornadas.");
  const categoryId = Object.fromEntries(categories.map((category) => [category.name, category.id]));

  const productRows = [
    ["Mais pedidos", "Burger da casa", "Blend artesanal, queijo cheddar, cebola caramelizada e maionese da casa.", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85", 29.9, "available"],
    ["Mais pedidos", "Frango crocante", "Peito de frango empanado, salada fresca e molho de ervas.", "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=900&q=85", 27.9, "available"],
    ["Burgers", "Brasa bacon", "Blend bovino, bacon defumado, queijo prato e barbecue da casa.", "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85", 32.9, "available"],
    ["Acompanhamentos", "Batata rústica", "Batatas temperadas, ervas frescas e páprica defumada.", "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85", 15.9, "available"],
    ["Bebidas", "Limonada da casa", "Limão siciliano, hortelã e água com gás.", "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=85", 10.9, "available"],
    ["Burgers", "Veggie grill", "Hambúrguer de grão-de-bico, cogumelos e creme de castanhas.", "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=85", 28.9, "out_of_stock"]
  ].map(([category, name, description, image_url, price, availability], display_order) => ({ owner_id: ownerId, category_id: categoryId[category], name, description, image_url, price, availability, display_order }));
  const { data: products, error: productsError } = await supabase.from("products").insert(productRows).select("id, name");
  if (productsError || !products) throw productsError ?? new Error("Produtos não retornados.");
  const productId = Object.fromEntries(products.map((product) => [product.name, product.id]));

  const { error: variationsError } = await supabase.from("product_variations").insert([
    { owner_id: ownerId, product_id: productId["Burger da casa"], name: "Tradicional", price_delta: 0, is_required: true, display_order: 0 },
    { owner_id: ownerId, product_id: productId["Burger da casa"], name: "Duplo smash", price_delta: 9, is_required: true, display_order: 1 }
  ]);
  if (variationsError) throw variationsError;

  const { error: addonsError } = await supabase.from("product_addons").insert([
    { owner_id: ownerId, product_id: productId["Burger da casa"], name: "Bacon crocante", price_delta: 5, display_order: 0 },
    { owner_id: ownerId, product_id: productId["Burger da casa"], name: "Cheddar extra", price_delta: 4, display_order: 1 },
    { owner_id: ownerId, product_id: productId["Burger da casa"], name: "Picles artesanal", price_delta: 3, display_order: 2 }
  ]);
  if (addonsError) throw addonsError;

  const { error: hoursError } = await supabase.from("opening_hours").insert([
    ...[1, 2, 3, 4, 5].flatMap((day_of_week) => [{ owner_id: ownerId, day_of_week, opens_at: "11:30", closes_at: "15:00" }, { owner_id: ownerId, day_of_week, opens_at: "18:00", closes_at: "23:00" }]),
    { owner_id: ownerId, day_of_week: 6, opens_at: "12:00", closes_at: "23:30" },
    { owner_id: ownerId, day_of_week: 0, opens_at: "12:00", closes_at: "22:00" }
  ]);
  if (hoursError) throw hoursError;

  console.log("Seed demonstrativo criado com sucesso.");
}

seed().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
