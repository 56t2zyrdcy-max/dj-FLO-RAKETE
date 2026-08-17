# DJ Ağı — Şarkı İstek Platformu

Tek kod tabanı, çok DJ. Her DJ'nin kendi adresi, kendi markası, kendi
kuyruğu var; kod tek yerde durur, bir düzeltme hepsine gider.

**Senin `djozmen-53d67` projene ve `dj-gigs` reponua hiç dokunulmadı.**
Bu sistem ayrı Firebase projesinde (`djozkan-b30e6`), ayrı repoda çalışır.

---

## Canlı adresler

| Ne | Adres |
|---|---|
| **Yönetim panelin** | `.../console.html` |
| Misafir sayfası (QR buraya) | `.../?dj=flo` |
| DJ paneli | `.../admin.html?dj=flo` |
| QR üretici | `.../qr.html?dj=flo` |

Kök: `https://56t2zyrdcy-max.github.io/dj-FLO-RAKETE`

---

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| **`djs.js`** | **Tüm DJ'lerin tanımlandığı tek dosya.** Yeni DJ eklemek sadece burayı düzenlemek demek. |
| `index.html` | Kısa adres. `?dj=` parametresini taşıyıp misafir sayfasına yönlendirir. |
| `guest.html` | Misafir istek sayfası. Markayı `djs.js`'ten okur. |
| `admin.html` | DJ paneli. Google ile tek tık giriş. |
| `console.html` | Senin yönetim panelin. Tüm DJ'ler, canlı sayılar, linkler. |
| `qr.html` | QR + baskıya hazır A5 afiş. İnternetsiz çalışır. |
| `firebase-rules.json` | Veritabanı güvenlik kuralları. |
| `assets/` | Her DJ'nin logoları: `<slug>-mark.svg`, `<slug>-full.svg`, `<slug>-full-light.svg`. |

---

## Yeni DJ ekleme (5 dakika)

### 1. `djs.js`'e blok ekle

```js
otsi: {
  slug:     'otsi',                  // adreste görünür: ?dj=otsi — QR basıldıktan sonra ASLA değiştirme
  name:     'DJ Otsi',
  slogan:   'Deine Party, deine Musik',
  accent:   '#1E9BFF',               // ana marka rengi
  accent2:  '#7CF5B6',
  logoMark: 'assets/otsi-mark.svg',
  logoFull: 'assets/otsi-full.svg',
  logoPrint:'assets/otsi-full-light.svg',
  ownerUid: '',                      // 3. adımda dolduracaksın
  tips:     false,
  paypal:   '',
  socials:  { instagram: '', youtube: '' },
  noteDe:   'Wünsche werden gespielt, wenn sie zur Stimmung passen.',
  noteEn:   'Requests are played when they fit the vibe.'
}
```

### 2. Logolarını `assets/` içine koy

Üç dosya: koyu zemin için `-full.svg`, beyaz baskı için `-full-light.svg`,
vinil ortasındaki küçük marka için `-mark.svg`. SVG yoksa PNG de olur,
sadece `djs.js`'teki uzantıyı değiştir.

### 3. DJ'nin hesabını tanımla

1. DJ **kendi Google hesabıyla** `admin.html?dj=otsi` adresine girer
2. "Bu hesabın DJ hesabı olmadığı" yazar — **normal**, henüz tanımlı değil
3. Ekranda görünen **UID**'yi al (ya da Firebase Console → Authentication → Users)
4. `djs.js`'te o DJ'nin `ownerUid` alanına yaz
5. Firebase Console → Realtime Database → Data → `djs/otsi/ownerUid` düğümüne
   aynı UID'yi yaz

Adım 5 önemli: **güvenliği sağlayan şey `djs.js` değil, veritabanındaki
`ownerUid`.** `djs.js` herkese açık bir dosya; kural katmanı veritabanını okur.

### 4. QR'ını üret

`qr.html?dj=otsi` → adres otomatik dolu gelir → **QR erstellen** →
afişi veya kodu indir.

---

## Kimin neye erişimi var

| | Misafir | DJ | Sen |
|---|---|---|---|
| Kendi isteğini yazma | ✅ | ✅ | ✅ |
| Başkasının isteğini değiştirme | ❌ | ✅ (kendi DJ'sinde) | ✅ (hepsinde) |
| Kuyruğu görme | ✅ (kopya engeli için) | ✅ | ✅ |
| Başka DJ'nin kuyruğu | ❌ | ❌ | ✅ |

Misafirler anonim olarak giriş yapar (hiçbir bilgi istemez). DJ'ler ve sen
Google ile girersiniz. Kurallar kimliği veritabanından doğrular — kodu
değiştirmek işe yaramaz.

> **Repo herkese açık.** İçindeki Firebase anahtarları gizli değildir, öyle
> olması normaldir. Sistemi koruyan şey `firebase-rules.json`. Kuralları
> gevşetirsen koruma kalmaz.

---

## Bahşiş (şu an kapalı)

Her DJ için ayrı ayrı kontrol edilir:

```js
tips:   true,
paypal: 'O_DJ_NIN_KENDI_CLIENT_ID_SI',
```

**İkisi birlikte dolu olmadıkça bahşiş bölümü hiç görünmez.** Client ID
https://developer.paypal.com/dashboard/applications → Live sekmesinden alınır.
Para doğrudan o DJ'nin hesabına gider.

> ⚠️ Bir DJ'nin sayfasına başka birinin PayPal ID'sini yazma. Para yanlış
> hesaba gider ve geri alınması kolay değildir.

---

## QR basmadan önce

1. Adresi kesinleştir. Adres değişirse QR de değişir, basılmış afişler çöp olur.
2. **Kendi telefonunla okut.** Yazılımla doğruladım ama gerçek kamerayla
   teyit 10 saniye sürer, matbaa parası riske girmez.
3. Afişteki QR'da bilerek logo yok — ortası temiz kod uzaktan ve loş ışıkta
   çok daha kolay okunur. Logo zaten afişin üstünde.

---

## Ayarlanabilir sabitler (`guest.html`)

| Sabit | Şu an | Ne yapar |
|---|---|---|
| `COOLDOWN_MS` | 30 dk | Aynı telefonun istekleri arası bekleme |
| `MIN_TIP` | €10 | Kabul edilen en düşük bahşiş |
| `DUP_WINDOW_MS` | 6 saat | Aynı şarkının tekrar istenemeyeceği süre |

Bunlar şimdilik tüm DJ'ler için ortak. DJ başına farklılaştırmak istersen
`djs.js`'e taşınabilir.

---

## Teknik özet

- **Barındırma:** GitHub Pages (ücretsiz, statik)
- **Veritabanı:** Firebase Realtime Database, **Belçika (europe-west1)** —
  AB'de kalır, Almanya'ya en yakın konum
- **Giriş:** misafir anonim, DJ ve sen Google
- **Veri yapısı:** `djs/<slug>/requests`, `djs/<slug>/guardrail`
- **Yetki:** `djs/<slug>/ownerUid` ve `platform/ownerUid`
- **Plan:** Spark (ücretsiz) — kredi kartı gerekmez
