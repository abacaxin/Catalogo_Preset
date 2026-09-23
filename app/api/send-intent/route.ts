import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getSupabaseAdminConfig } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const config = getSupabaseAdminConfig();
  if (!config) {
    return NextResponse.json({ error: "A demonstração ainda não está conectada ao atendimento." }, { status: 503 });
  }

  const supabase = createClient(config.url, config.secretKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data: shop, error: shopError } = await supabase
    .from("shop_settings")
    .select("owner_id")
    .limit(1)
    .maybeSingle();

  if (shopError || !shop) {
    return NextResponse.json({ error: "A loja ainda não está pronta para receber pedidos." }, { status: 503 });
  }

  const { error: intentError } = await supabase
    .from("send_intents")
    .insert({ owner_id: shop.owner_id });

  if (intentError) {
    return NextResponse.json({ error: "Não foi possível preparar o encaminhamento do pedido." }, { status: 503 });
  }

  return NextResponse.json({ ok: true }, {
    status: 201,
    headers: { "Cache-Control": "no-store" }
  });
}
