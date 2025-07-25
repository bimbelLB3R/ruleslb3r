-- Langkah 1: Buat tabel baru, salin struktur + constraint
create table snbt_2026.jwb_snbt
(like public.jwb_snbt including defaults including constraints);

-- Langkah 2: Salin data
insert into snbt_2026.jwb_snbt
select * from public.jwb_snbt;

-- Langkah 3: bikin view di public (view public khusus untuk Read tidak bisa Create dll)
create or replace view public.indtka as
select * from snbt_2026.indtka;