"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

const value = (data: FormData, key: string) => String(data.get(key) ?? "").trim();
const amount = (data: FormData, key: string) => Math.max(0, Number(value(data, key).replace(",", ".")) || 0);

async function uploadImage(supabase: SupabaseClient, userId: string, file: FormDataEntryValue | null, folder: string) {
  if (!(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/")) throw new Error("Escolha uma imagem válida.");
  if (file.size > 5 * 1024 * 1024) throw new Error("A imagem precisa ter no máximo 5 MB.");

  const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "") || "jpg";
  const path = `${userId}/${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("catalog-media").upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
  if (error) throw error;
  return supabase.storage.from("catalog-media").getPublicUrl(path).data.publicUrl;
}

async function currentUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin?error=missing-configuration");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");
  return { supabase, user };
}

function refresh() { revalidatePath("/"); revalidatePath("/admin"); redirect("/admin"); }

export async function signIn(formData: FormData) {
  const email = value(formData, "email"); const password = value(formData, "password");
  if (!email || !password) redirect("/admin?error=missing-credentials");
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin?error=missing-configuration");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin?error=invalid-credentials");
  redirect("/admin");
}

export async function signOut() { const supabase = await createSupabaseServerClient(); await supabase?.auth.signOut(); redirect("/admin"); }

export async function createCategory(formData: FormData) {
  const { supabase, user } = await currentUser(); const name = value(formData, "name");
  if (name) await supabase.from("categories").insert({ owner_id: user.id, name });
  refresh();
}

export async function deleteCategory(formData: FormData) { const { supabase } = await currentUser(); await supabase.from("categories").delete().eq("id", value(formData, "id")); refresh(); }

export async function createProduct(formData: FormData) {
  const { supabase, user } = await currentUser(); const name = value(formData, "name"); const category_id = value(formData, "category_id");
  if (name && category_id) {
    const uploadedImage = await uploadImage(supabase, user.id, formData.get("image_file"), "products");
    const { data: product } = await supabase.from("products").insert({ owner_id: user.id, category_id, name, description: value(formData, "description") || null, image_url: uploadedImage ?? (value(formData, "image_url") || null), price: amount(formData, "price"), availability: value(formData, "availability") || "available" }).select("id").single();
    if (product) {
      const options = (key: string) => value(formData, key).split("\n").map((line) => line.trim()).filter(Boolean).map((line, display_order) => { const [name, price] = line.split("|"); return { name: name.trim(), price_delta: Math.max(0, Number((price ?? "0").replace(",", ".")) || 0), display_order }; }).filter((item) => item.name);
      const variations = options("variations").map((item) => ({ ...item, owner_id: user.id, product_id: product.id, is_required: true }));
      const addons = options("addons").map((item) => ({ ...item, owner_id: user.id, product_id: product.id }));
      if (variations.length) await supabase.from("product_variations").insert(variations);
      if (addons.length) await supabase.from("product_addons").insert(addons);
    }
  }
  refresh();
}

export async function updateProductAvailability(formData: FormData) { const { supabase } = await currentUser(); await supabase.from("products").update({ availability: value(formData, "availability") }).eq("id", value(formData, "id")); refresh(); }
export async function deleteProduct(formData: FormData) { const { supabase } = await currentUser(); await supabase.from("products").delete().eq("id", value(formData, "id")); refresh(); }

export async function saveShop(formData: FormData) {
  const { supabase, user } = await currentUser();
  const [logoUrl, bannerUrl] = await Promise.all([
    uploadImage(supabase, user.id, formData.get("logo_file"), "branding"),
    uploadImage(supabase, user.id, formData.get("banner_file"), "branding"),
  ]);
  const update = { owner_id: user.id, name: value(formData, "name"), whatsapp_number: value(formData, "whatsapp_number"), phone: value(formData, "phone") || null, address: value(formData, "address") || null, instagram_handle: value(formData, "instagram_handle") || null, delivery_information: value(formData, "delivery_information") || null, primary_color: value(formData, "primary_color_picker") || value(formData, "primary_color") || "#b84122", accent_color: value(formData, "accent_color_picker") || value(formData, "accent_color") || "#e9b566", background_color: value(formData, "background_color_picker") || value(formData, "background_color") || "#fffaf5", text_color: value(formData, "text_color_picker") || value(formData, "text_color") || "#271a16", ...(logoUrl ? { logo_url: logoUrl } : {}), ...(bannerUrl ? { banner_url: bannerUrl } : {}) };
  const { error } = await supabase.from("shop_settings").upsert(update, { onConflict: "owner_id" });
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  refresh();
}

export async function saveHours(formData: FormData) {
  const { supabase, user } = await currentUser(); await supabase.from("opening_hours").delete().eq("owner_id", user.id);
  const rows = Array.from({ length: 7 }, (_, day_of_week) => ({ owner_id: user.id, day_of_week, opens_at: value(formData, `open_${day_of_week}`), closes_at: value(formData, `close_${day_of_week}`) })).filter((item) => item.opens_at && item.closes_at && item.opens_at < item.closes_at);
  if (rows.length) await supabase.from("opening_hours").insert(rows); refresh();
}
