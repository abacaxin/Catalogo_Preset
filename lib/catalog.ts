import { createClient } from "@supabase/supabase-js";
import type { CatalogProduct, CatalogShop } from "@/components/catalog-app";

type DatabaseProduct = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number | string;
  availability: "available" | "out_of_stock" | "inactive";
};

export type PublicCatalog = { products: CatalogProduct[]; shop: CatalogShop };

type OpeningHour = { day_of_week: number; opens_at: string; closes_at: string };
type CategoryRow = { id: string; name: string };
type OptionRow = { product_id: string; name: string; price_delta: number | string };

function getOpeningStatus(hours: OpeningHour[]) {
  if (!hours.length) return { isOpen: true, statusLabel: "Aberto agora" };

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const read = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  const weekdays: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const currentTime = `${read("hour")}:${read("minute")}`;
  const todaysHours = hours.filter((item) => item.day_of_week === weekdays[read("weekday")]);
  const current = todaysHours.find((item) => currentTime >= item.opens_at.slice(0, 5) && currentTime < item.closes_at.slice(0, 5));

  if (current) return { isOpen: true, statusLabel: `Aberto até ${current.closes_at.slice(0, 5)}` };
  const next = todaysHours.find((item) => currentTime < item.opens_at.slice(0, 5));
  return { isOpen: false, statusLabel: next ? `Abre às ${next.opens_at.slice(0, 5)}` : "Fechado agora" };
}

export async function getPublicCatalog(): Promise<PublicCatalog | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const results = await Promise.all([
    supabase.from("shop_settings").select("name, logo_url, banner_url, primary_color, accent_color, background_color, text_color, whatsapp_number, phone, address, instagram_handle, delivery_information").limit(1).maybeSingle(),
    supabase.from("categories").select("id, name").order("display_order"),
    supabase.from("products").select("id, category_id, name, description, image_url, price, availability").order("display_order"),
    supabase.from("product_variations").select("product_id, name, price_delta").order("display_order"),
    supabase.from("product_addons").select("product_id, name, price_delta").order("display_order"),
    supabase.from("opening_hours").select("day_of_week, opens_at, closes_at")
  ]);
  const { data: initialShop, error: shopError } = results[0];
  let shop = initialShop;
  const categories = (results[1].data ?? []) as CategoryRow[];
  const products = (results[2].data ?? []) as DatabaseProduct[];
  const variations = (results[3].data ?? []) as OptionRow[];
  const addons = (results[4].data ?? []) as OptionRow[];
  const hours = (results[5].data ?? []) as OpeningHour[];

  if (shopError) {
    const { data: fallbackShop } = await supabase.from("shop_settings").select("name, whatsapp_number, phone, address, instagram_handle, delivery_information").limit(1).maybeSingle();
    shop = fallbackShop ? { ...fallbackShop, logo_url: null, banner_url: null, primary_color: null, accent_color: null, background_color: null, text_color: null } : null;
  }

  if (!shop || !categories || !products || !variations || !addons || !hours) return null;

  const openingStatus = getOpeningStatus(hours as OpeningHour[]);

  const categoryNames = Object.fromEntries(categories.map((category) => [category.id, category.name]));
  const typedProducts = products as DatabaseProduct[];

  return {
    shop: {
      name: shop.name,
      whatsappNumber: shop.whatsapp_number,
      phone: shop.phone,
      address: shop.address,
      instagram: shop.instagram_handle,
      deliveryInformation: shop.delivery_information,
      logoUrl: shop.logo_url,
      bannerUrl: shop.banner_url,
      primaryColor: shop.primary_color,
      accentColor: shop.accent_color,
      backgroundColor: shop.background_color,
      textColor: shop.text_color,
      ...openingStatus
    },
    products: typedProducts.map((product) => ({
      id: product.id,
      category: categoryNames[product.category_id] ?? "Outros",
      name: product.name,
      description: product.description ?? "",
      price: Number(product.price),
      image: product.image_url ?? "",
      unavailable: product.availability !== "available",
      variations: variations.filter((variation) => variation.product_id === product.id).map((variation) => ({ name: variation.name, price: Number(variation.price_delta) })),
      extras: addons.filter((addon) => addon.product_id === product.id).map((addon) => ({ name: addon.name, price: Number(addon.price_delta) }))
    }))
  };
}
