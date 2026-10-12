# Mlazmatik sajt

Katalog FALCH visokopritisnih mašina i pribora za Mlazmatik d.o.o. Sajt prodaje na upit: nema korpe, a svaka stranica vodi ka kontakt formularu.

Sajt je statičan. Nema baze ni servera: sav sadržaj je u fajlovima u folderu `content/`, a stranice se prave pri buildu. Izmena sadržaja znači izmenu fajla i novo objavljivanje.

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- Hosting: Vercel
- Jezik: srpski, latinica

## Pokretanje

Potreban je Node.js 22 (sajt je razvijan na 22.23).

```bash
npm install
cp .env.example .env.local   # pa upišite vrednosti, vidi "Podešavanja"
npm run dev                  # http://localhost:3000
```

| Komanda | Šta radi |
|---|---|
| `npm run dev` | Razvojni server |
| `npm run build` | Provera sadržaja, pa produkcijski build |
| `npm run start` | Pokreće gotov build lokalno |
| `npm run validate` | Samo provera sadržaja |
| `npm run images` | Pretvara nove slike iz `media-src/` u WebP |

## Podešavanja

Vrednosti se upisuju u `.env.local` za lokalni rad i u Vercel (Project Settings > Environment Variables) za produkciju. Sve četiri su javne, vide se u pregledaču, i nijedna nije tajna. Posle izmene na Vercelu treba pokrenuti novi deploy.

| Promenljiva | Čemu služi |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Adresa sajta bez kose crte na kraju, npr. `https://www.mlazmatik.rs`. Koristi se za canonical linkove, sitemap i slike pri deljenju. Bez nje se na Vercelu koristi produkcioni domen projekta. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Adresa servisa koji prima upite. Za Web3Forms: `https://api.web3forms.com/submit` |
| `NEXT_PUBLIC_FORM_ACCESS_KEY` | Pristupni ključ sa Web3Forms naloga |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager, oblik `GTM-XXXXXXX`. Bez nje se ne učitava nikakvo praćenje. |

Dok `NEXT_PUBLIC_FORM_ENDPOINT` nije upisan, formular ne šalje upit, već prikazuje poruku sa mejlom i telefonom firme.

## Gde je šta

```
app/          stranice (svaki folder je jedna adresa)
components/   delovi stranica; components/ui su zajednički gradivni delovi
content/      SAV tekst i podaci; ovde se menja sadržaj
lib/          kod koji čita sadržaj; lib/images.json je spisak slika (pravi ga skripta)
public/media/ gotove WebP slike i video (pravi ih skripta, ne menjati ručno)
media-src/    originali slika; NIJE u gitu, vidi "Slike"
scripts/      skripta za slike i provera sadržaja
```

Fajlovi u `content/`:

| Fajl | Sadržaj |
|---|---|
| `site.ts` | Adrese stranica, meni, podaci firme (adresa, telefoni, mejl, radno vreme, PIB), brojke na početnoj |
| `home.ts` | Tekstovi početne strane |
| `machines.json` | Mašine |
| `machines-info.ts` | Uvod, klase snage za filter, vodič i pitanja ispod liste mašina |
| `accessories.json`, `accessory-categories.json` | Pribor i 13 kategorija |
| `applications.json`, `application-groups.json` | Primene i 8 grupa |
| `servis.ts` | Tekstovi stranica Servis i Demonstracije |
| `kontakt.ts` | Tekstovi formulara i stranice zahvalnosti |
| `legal.ts` | Privatnost, Kolačići i tekst banera za kolačiće |

Pravila izgleda (širina sadržaja, naslovi, boje, dugmad) opisana su u `CLAUDE.md`.

## Izmena sadržaja

### Telefon, adresa, radno vreme

Sve je u objektu `company` u `content/site.ts`. Podnožje, stranica Kontakt, pravne stranice i podaci za pretraživače čitaju odatle, pa se menja na jednom mestu.

### Nova mašina

1. Slike stavite u `media-src/masine/<slug>/` (pravila imenovanja su u odeljku "Slike") i pokrenite `npm run images`.
2. U `content/machines.json` dodajte unos:

```json
{
  "slug": "wheel-jet-30-500-30-0-e",
  "name": "Wheel Jet 30 500-30-0-e",
  "itemNumber": "G411",
  "series": "wheel-jet",
  "engine": "electric",
  "kw": 30,
  "bar": 500,
  "lpm": 30,
  "hotWater": false,
  "featured": true,
  "images": [{ "src": "masine/wheel-jet-30-500-30-0-e/01", "alt": "Wheel Jet 30 500-30-0-e, fotografija 1" }],
  "applicationImages": [{ "src": "masine/wheel-jet-30-500-30-0-e/11", "alt": "Wheel Jet 30 500-30-0-e u radu, fotografija 1" }],
  "specs": [{ "group": "Performanse", "label": "Radni pritisak", "value": "50 – 500 bar (725 – 7252 psi)" }],
  "video": "5jHPnkovfaM",
  "brochure": "https://.../brosura.pdf",
  "standard": ["S003"],
  "recommended": ["Z0000209"]
}
```

- `series`: `wheel-jet`, `base-jet` ili `trail-jet`. `engine`: `electric`, `petrol` ili `diesel`.
- `kw` je snaga pumpe, `bar` najviši pritisak, `lpm` najveći protok. Po njima rade filteri i kartice. Uvek ih prepišite iz specifikacije, ne iz naziva mašine.
- `specs` je slobodna lista. Redovi sa istim `group` idu u istu tabelu, redom kojim su upisani.
- `standard` i `recommended` su šifre pribora iz `accessories.json`. Preporučeni pribor se na stranici sam grupiše po kategorijama.
- `featured: true` prikazuje mašinu na početnoj (preporuka: 4 do 6 mašina).
- `video` je YouTube ID. Tada mora da postoji i slika `masine/<slug>/video`.
- `variants` (nije obavezno): lista `{ "label", "itemNumber", "images" }`. Varijanta čuva samo ono po čemu se razlikuje; bez svojih slika koristi slike osnovne mašine.
- `similar` (nije obavezno): slugovi tri slične mašine. Bez ovoga se biraju automatski, po izvedbi, pritisku i motoru.
- `review`: beleške o podacima koje treba proveriti. Ne prikazuje se na sajtu.

Mašina se u listi pojavljuje sama, sortirano po snazi, a opcije filtera se grade iz podataka. Ako nova mašina ima snagu van postojećih klasa, dopunite `powerBuckets` u `content/machines-info.ts`.

### Novi pribor

1. Sliku stavite u `media-src/pribor/<šifra malim slovima>/01.jpg` i pokrenite `npm run images`.
2. U `content/accessories.json` dodajte:

```json
{
  "code": "S003",
  "slug": "visokopritisno-crevo-nonstop-5-s003",
  "category": "creva-i-kablovi",
  "name": "Visokopritisno crevo nonstop 5",
  "nameEn": "",
  "details": [],
  "images": [{ "src": "pribor/s003/01", "alt": "Visokopritisno crevo nonstop 5" }],
  "specs": [{ "label": "Radni pritisak", "value": "500 bar (7252 psi)" }],
  "standard": ["V044"]
}
```

`category` je slug iz `accessory-categories.json`. `slug` mora biti jedinstven; dosadašnji se završavaju šifrom. Najviše 3 slike. Da bi se pribor prikazao uz mašinu, dodajte njegovu šifru u `standard` ili `recommended` te mašine.

Fotografiju na pločici kategorije određuje polje `cover` (šifra artikla) u `accessory-categories.json`.

### Nova primena

1. Slike stavite u `media-src/primene/<slug>/` kao `01.jpg` do `05.jpg` i pokrenite `npm run images`.
2. U `content/applications.json` dodajte:

```json
{
  "slug": "ciscenje-fasada",
  "published": true,
  "groups": ["ciscenje", "gradjevinarstvo"],
  "title": "Čišćenje fasada",
  "intro": "Kratak opis, dve do tri rečenice.",
  "video": "wSDUIjm3zmQ",
  "images": [{ "src": "primene/ciscenje-fasada/01", "alt": "Čišćenje fasada, fotografija 1" }]
}
```

`groups` su slugovi iz `application-groups.json`; prva grupa se ispisuje na pločici. `published: false` sakriva primenu bez brisanja. Uz `video` mora da postoji slika `primene/<slug>/video`. Primene na početnoj biraju se u `content/home.ts` (`featuredApplications.slugs`, prva je velika pločica).

## Slike

Originali idu u `media-src/`, a komanda `npm run images` od njih pravi WebP u `public/media/` i upisuje `lib/images.json`. Sajt koristi samo te gotove fajlove. I `public/media/` i `lib/images.json` se commit-uju.

**`media-src/` nije u gitu.** Originali se predaju odvojeno (arhiva ili disk). Bez njih sajt radi normalno, ali postojeće slike ne mogu ponovo da se konvertuju u drugoj veličini ili kvalitetu.

Veličine zavise od imena fajla:

| Ime | Uloga | Širine |
|---|---|---|
| `01` | Naslovna slika (kartice, pločice, veliki prikaz) | 480, 960, 1600 |
| `02`, `03`, ... | Slike galerije | samo 960 |
| `video`, `video-<naziv>` | Poster YouTube snimka | 480, 960 |
| sve u `pribor/` | Fotografije pribora | 480, 960 |

Brojevi u folderu mašine: `01` do `05` galerija, `11` do `14` fotografije u radu, `21`+ slike prve varijante, `31`+ druge, i tako redom.

U sadržaju se slika navodi putanjom bez ekstenzije, npr. `"masine/wheel-jet-30-500-30-0-e/01"`. Svaka slika mora imati `alt`.

```bash
npm run images               # samo nove i izmenjene
npm run images -- --force    # sve iznova (posle promene veličina ili kvaliteta)
npm run images -- --prune    # briše WebP čiji original više ne postoji
```

`--prune` koristite samo kada imate sve originale u `media-src/`. Na svežem klonu bez originala obrisao bi sve slike.

Slike se ne provlače kroz Vercelovu optimizaciju (`next/image` se ne koristi), pa za njih nema dodatnih troškova hostinga. U komponentama se slike crtaju sa `components/ui/Img`.

## Provera sadržaja

`npm run validate` se pokreće sam pre svakog builda. Build pada, uz spisak grešaka, ako:

- slika navedena u sadržaju ne postoji ili nema `alt`
- mašina navodi šifru pribora koje nema
- slug ili šifra se ponavlja
- nedostaje obavezno polje
- primena ima nepoznatu grupu ili više od 5 slika, pribor nepoznatu kategoriju ili više od 3 slike
- postoji `video`, a nema slike postera

Kada dodate novi fajl sa sadržajem, dopunite i `scripts/validate-content.mjs`.

## Kontakt formular

Jedan formular na `/kontakt` služi za sve upite. Dugmad na sajtu ga otvaraju sa već popunjenim podacima:

- `/kontakt?proizvod=G411&varijanta=Overpack%20S` (ponuda za proizvod)
- `/kontakt?tema=servis`, `?tema=rezervni-deo`, `?tema=demonstracija`

U kodu se ti linkovi prave funkcijama `quoteHref()` i `contactHref()` iz `content/site.ts`.

Upit se šalje servisu iz `NEXT_PUBLIC_FORM_ENDPOINT`, koji ga prosleđuje na mejl firme. Adresa na koju upiti stižu podešava se na nalogu tog servisa, ne u kodu. Posle slanja posetilac stiže na `/kontakt/hvala`, koja se ne prikazuje u pretrazi.

## Kolačići i praćenje

- Baner nudi Prilagodi, Odbij sve i Prihvati sve. Izbor se pamti 12 meseci.
- Google Consent Mode v2: dok posetilac ne odluči, sve je odbijeno.
- Google Tag Manager se učitava tek kada posetilac prihvati analitičke ili marketinške kolačiće. Alati (Analytics, Ads) se dodaju u GTM panelu, ne u kodu.
- Poslat upit se beleži kao događaj `upit_poslat` u `dataLayer` (sa temom i šifrom proizvoda), samo uz saglasnost.
- YouTube se učitava tek na klik, preko `youtube-nocookie.com`. Mapa je link, ne ugrađena mapa.

Kada se u GTM-u uključi novi alat, dopunite spisak kolačića na stranici Kolačići i tekst banera (`content/legal.ts`). Ne dodajte skripte za praćenje direktno u kod, mimo GTM-a.

## Pretraživači

- `sitemap.xml` i `robots.txt` se prave iz sadržaja (`app/sitemap.ts`, `app/robots.ts`). Novu vrstu stranice treba dodati u sitemap.
- Svaka stranica dobija naslov, opis, canonical i podatke za deljenje funkcijom `pageMetadata()` iz `lib/seo.tsx`.
- Strukturirani podaci: firma (Početna, Kontakt), proizvod (mašine i pribor), staza stranica, pitanja (lista mašina).
- Zajednička slika za deljenje je `app/opengraph-image.jpg`, a ikonica sajta `app/icon.svg`.

## Objavljivanje na Vercelu

1. Na vercel.com izaberite Add New > Project i uvezite GitHub repozitorijum. Vercel sam prepoznaje Next.js; ništa ne treba podešavati.
2. U Project Settings > Environment Variables upišite četiri vrednosti iz odeljka "Podešavanja".
3. U Project Settings > Domains dodajte domen.
4. Svaki push na granu `main` objavljuje novu verziju. Ostale grane dobijaju probnu adresu.

Vercelov besplatni plan (Hobby) dozvoljen je samo za nekomercijalnu upotrebu, pa je za ovaj sajt potreban Pro.

## Pre puštanja u rad

- [ ] Upisati `NEXT_PUBLIC_SITE_URL`, ključ za Web3Forms i GTM ID, pa poslati probni upit
- [ ] U `content/legal.ts` upisati rok čuvanja upita (jedino preostalo mesto u uglastim zagradama u tekstu Privatnost)
- [ ] Uskladiti spisak kolačića sa alatima u GTM-u
- [ ] Posle pravne provere postaviti `draft: false` za obe pravne stranice
- [ ] Dodati linkove društvenih mreža u `company.socials` (podnožje ih prikazuje čim postoje)
- [ ] Zameniti ikonicu sajta (`app/icon.svg`, `app/apple-icon.png`) i sliku za deljenje, ako klijent ima svoje
- [ ] Proveriti podatke firme preuzete sa mlazmatik.co.rs
- [ ] Pokrenuti Lighthouse na probnoj adresi (cilj: 90+ na telefonu)

## Šta treba znati o podacima

Mašine, pribor i primene uvezeni su sa falch.com u oktobru 2026.

- **Tehnički podaci mašina** su prepisani kako ih Falch prikazuje. Vrednosti koje su izgledale pogrešno zabeležene su u polju `review` te mašine. Na pet mašina izostavljen je red "Električni priključak", jer je izvor sadržao neispravan zapis.
- **Nazivi pribora** su prevedeni; originalni naziv je u polju `nameEn`.
- **Specifikacije pribora**: 72 artikla imaju prave tabele iz izvora. Kod ostalih su redovi izvedeni iz dugačkog originalnog naziva, pa ih treba proveriti; u nekim vrednostima je ostao engleski tekst. 45 artikala nema specifikaciju.
- **Brošure** se otvaraju sa Falch-ovog servera (polje `brochure` je adresa). Nisu u repozitorijumu jer bi dodale oko 50 MB.
- **Garancije rokova** sa Falch-ovih stranica servisa namerno nisu preuzete.
- **Logo** u zaglavlju i podnožju je Falch-ov (`public/media/logo.svg`).
