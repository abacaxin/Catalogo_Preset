alter table public.shop_settings
  add column background_color text not null default '#fffaf5',
  add column text_color text not null default '#271a16';
