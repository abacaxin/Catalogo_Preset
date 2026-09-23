import { CatalogApp } from "@/components/catalog-app";
import { getPublicCatalog } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const catalog = await getPublicCatalog();
  return <CatalogApp initialProducts={catalog?.products} shop={catalog?.shop} />;
}
