create extension if not exists pgcrypto;

create type public.product_availability as enum ('available', 'out_of_stock', 'inactive');

create table public.shop_settings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  logo_url text,
  primary_color text not null default '#b84122',
  accent_color text,
  whatsapp_number text not null,
  phone text,
  address text,
  instagram_handle text,
  delivery_information text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, name)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null check (char_length(trim(name)) > 0),
  description text,
  image_url text,
  price numeric(10, 2) not null check (price >= 0),
  availability public.product_availability not null default 'available',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_variations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  price_delta numeric(10, 2) not null default 0 check (price_delta >= 0),
  is_required boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_addons (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  price_delta numeric(10, 2) not null default 0 check (price_delta >= 0),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opening_hours (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  opens_at time not null,
  closes_at time not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (opens_at < closes_at),
  unique (owner_id, day_of_week, opens_at, closes_at)
);

create table public.send_intents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index products_owner_category_order_idx on public.products (owner_id, category_id, display_order);
create index product_variations_product_order_idx on public.product_variations (product_id, display_order);
create index product_addons_product_order_idx on public.product_addons (product_id, display_order);
create index opening_hours_owner_day_idx on public.opening_hours (owner_id, day_of_week, opens_at);
create index send_intents_owner_created_idx on public.send_intents (owner_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_shop_settings_updated_at before update on public.shop_settings for each row execute function public.set_updated_at();
create trigger set_categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
create trigger set_products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger set_product_variations_updated_at before update on public.product_variations for each row execute function public.set_updated_at();
create trigger set_product_addons_updated_at before update on public.product_addons for each row execute function public.set_updated_at();
create trigger set_opening_hours_updated_at before update on public.opening_hours for each row execute function public.set_updated_at();

alter table public.shop_settings enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variations enable row level security;
alter table public.product_addons enable row level security;
alter table public.opening_hours enable row level security;
alter table public.send_intents enable row level security;

revoke all on public.shop_settings, public.categories, public.products, public.product_variations, public.product_addons, public.opening_hours, public.send_intents from anon, authenticated;

grant select on public.shop_settings, public.categories, public.products, public.product_variations, public.product_addons, public.opening_hours to anon;
grant select, insert, update, delete on public.shop_settings, public.categories, public.products, public.product_variations, public.product_addons, public.opening_hours, public.send_intents to authenticated;

create policy "public may read shop settings" on public.shop_settings for select to anon using (true);
create policy "owner may read shop settings" on public.shop_settings for select to authenticated using ((select auth.uid()) = owner_id);
create policy "owner may insert shop settings" on public.shop_settings for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "owner may update shop settings" on public.shop_settings for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "owner may delete shop settings" on public.shop_settings for delete to authenticated using ((select auth.uid()) = owner_id);

create policy "public may read categories" on public.categories for select to anon using (true);
create policy "owner may read categories" on public.categories for select to authenticated using ((select auth.uid()) = owner_id);
create policy "owner may insert categories" on public.categories for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "owner may update categories" on public.categories for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "owner may delete categories" on public.categories for delete to authenticated using ((select auth.uid()) = owner_id);

create policy "public may read catalog products" on public.products for select to anon using (availability in ('available', 'out_of_stock'));
create policy "owner may read products" on public.products for select to authenticated using ((select auth.uid()) = owner_id);
create policy "owner may insert products" on public.products for insert to authenticated with check ((select auth.uid()) = owner_id and exists (select 1 from public.categories where id = category_id and owner_id = (select auth.uid())));
create policy "owner may update products" on public.products for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id and exists (select 1 from public.categories where id = category_id and owner_id = (select auth.uid())));
create policy "owner may delete products" on public.products for delete to authenticated using ((select auth.uid()) = owner_id);

create policy "public may read variations" on public.product_variations for select to anon using (exists (select 1 from public.products where id = product_id and availability in ('available', 'out_of_stock')));
create policy "owner may read variations" on public.product_variations for select to authenticated using ((select auth.uid()) = owner_id);
create policy "owner may insert variations" on public.product_variations for insert to authenticated with check ((select auth.uid()) = owner_id and exists (select 1 from public.products where id = product_id and owner_id = (select auth.uid())));
create policy "owner may update variations" on public.product_variations for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id and exists (select 1 from public.products where id = product_id and owner_id = (select auth.uid())));
create policy "owner may delete variations" on public.product_variations for delete to authenticated using ((select auth.uid()) = owner_id);

create policy "public may read addons" on public.product_addons for select to anon using (exists (select 1 from public.products where id = product_id and availability in ('available', 'out_of_stock')));
create policy "owner may read addons" on public.product_addons for select to authenticated using ((select auth.uid()) = owner_id);
create policy "owner may insert addons" on public.product_addons for insert to authenticated with check ((select auth.uid()) = owner_id and exists (select 1 from public.products where id = product_id and owner_id = (select auth.uid())));
create policy "owner may update addons" on public.product_addons for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id and exists (select 1 from public.products where id = product_id and owner_id = (select auth.uid())));
create policy "owner may delete addons" on public.product_addons for delete to authenticated using ((select auth.uid()) = owner_id);

create policy "public may read opening hours" on public.opening_hours for select to anon using (true);
create policy "owner may read opening hours" on public.opening_hours for select to authenticated using ((select auth.uid()) = owner_id);
create policy "owner may insert opening hours" on public.opening_hours for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "owner may update opening hours" on public.opening_hours for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "owner may delete opening hours" on public.opening_hours for delete to authenticated using ((select auth.uid()) = owner_id);

create policy "owner may read send intents" on public.send_intents for select to authenticated using ((select auth.uid()) = owner_id);

insert into storage.buckets (id, name, public)
values ('catalog-media', 'catalog-media', true)
on conflict (id) do nothing;

create policy "public may read catalog media" on storage.objects for select to anon using (bucket_id = 'catalog-media');
create policy "owner may manage catalog media" on storage.objects for all to authenticated using (bucket_id = 'catalog-media' and owner_id = ((select auth.uid())::text)) with check (bucket_id = 'catalog-media' and owner_id = ((select auth.uid())::text));
