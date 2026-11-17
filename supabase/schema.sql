-- Tessy client area. Run once in Supabase → SQL Editor.
-- Every table has row level security: a signed-in client only ever reads
-- their own rows. Services and invoices are written by you (from the
-- Supabase dashboard, Table Editor), never by clients.

-- One profile per account, created automatically at sign-up.
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  business text,
  created_at timestamptz not null default now()
);

-- What we look after for each client: a site, its domain and maintenance.
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users on delete cascade,
  name text not null,                 -- e.g. "Mama's Kitchen website"
  domain text,                        -- e.g. mamaskitchen.co.ke
  domain_renews_on date,              -- reminders go out before this
  maintenance_due_on date,            -- next maintenance / upkeep payment
  monthly_fee integer,                -- KSh
  status text not null default 'active',
  created_at timestamptz not null default now()
);

-- Invoices, so clients can see and pay what is due.
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users on delete cascade,
  service_id uuid references public.services on delete set null,
  description text not null,
  amount integer not null,            -- KSh
  due_on date,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.invoices enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles for select using (auth.uid() = id);
drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles for update using (auth.uid() = id);
drop policy if exists "own services" on public.services;
create policy "own services" on public.services for select using (auth.uid() = client_id);
drop policy if exists "own invoices" on public.invoices;
create policy "own invoices" on public.invoices for select using (auth.uid() = client_id);

-- Make the profile when someone signs up, from what they typed on the form.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone, business)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'business')
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
