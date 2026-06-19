-- =============================================================================
-- Schéma Supabase — Dussaussois Immobilier
-- À exécuter une fois dans : Supabase → SQL Editor → New query → Run
-- =============================================================================

-- Table des biens (colle au type `Bien` du site) -----------------------------
create table if not exists public.biens (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  titre         text not null,
  transaction   text not null default 'vente',   -- vente | location | programme_neuf
  type          text not null default 'appartement',
  statut        text not null default 'disponible', -- disponible | sous_compromis | vendu
  ville         text not null default '',
  code_postal   text not null default '',
  prix          numeric,            -- null = "Nous consulter"
  surface       numeric,
  pieces        integer,
  chambres      integer,
  description   text not null default '',
  photos        text[] not null default '{}',     -- URLs publiques (Storage)
  reference     text not null default '',
  date_creation timestamptz not null default now(),
  a_la_une      boolean not null default false,   -- "Bien du moment" (accueil)
  latitude      double precision,
  longitude     double precision
);

-- Ajoute la colonne "bien du moment" si la table existait déjà sans elle.
alter table public.biens
  add column if not exists a_la_une boolean not null default false;

create index if not exists biens_date_creation_idx on public.biens (date_creation desc);

-- Sécurité au niveau des lignes (RLS) ----------------------------------------
alter table public.biens enable row level security;

-- Lecture publique (site vitrine) : tout le monde peut lire.
drop policy if exists "Lecture publique des biens" on public.biens;
create policy "Lecture publique des biens"
  on public.biens for select
  using (true);

-- Écriture réservée aux utilisateurs connectés (l'équipe de l'agence).
drop policy if exists "Gestion par les utilisateurs connectés" on public.biens;
create policy "Gestion par les utilisateurs connectés"
  on public.biens for all
  to authenticated
  using (true)
  with check (true);

-- Stockage des photos --------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('biens-photos', 'biens-photos', true)
on conflict (id) do nothing;

-- Lecture publique des photos.
drop policy if exists "Photos lisibles par tous" on storage.objects;
create policy "Photos lisibles par tous"
  on storage.objects for select
  using (bucket_id = 'biens-photos');

-- Upload / modification / suppression réservés aux connectés.
drop policy if exists "Photos gérées par les connectés" on storage.objects;
create policy "Photos gérées par les connectés"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'biens-photos')
  with check (bucket_id = 'biens-photos');

-- =============================================================================
-- Création des comptes de connexion (Cécile, Franck) :
--   Supabase → Authentication → Users → "Add user" → renseigner e-mail + mot
--   de passe, et cocher "Auto Confirm User". Pas d'inscription publique.
-- =============================================================================
