# DJ FLO RAKETE — Şarkı İstek Sistemi

Bu paket **DJ oZMEn sisteminden tamamen bağımsızdır.** Senin `djozmen-53d67`
Firebase projene, veritabanına, PayPal hesabına hiçbir bağlantısı yok. Flo'nun
kendi Firebase projesi açılana kadar bu sistem hiçbir yere veri yazmaz.

---

## Paketin içindekiler

| Dosya | Ne işe yarar |
|---|---|
| `guest.html` | **Misafir sayfası.** QR kodun açtığı sayfa. Şarkı isteği + bahşiş. |
| `admin.html` | **DJ paneli.** Canlı istek kuyruğu. Google hesabıyla giriş. |
| `qr.html` | **QR üretici.** Adresi gir → QR kodu + baskıya hazır A5 afiş indir. |
| `links.html` | Sosyal medya link sayfası (Linktree tarzı). İsteğe bağlı. |
| `firebase-rules.json` | Veritabanı güvenlik kuralları. Kopyala-yapıştır. |
| `assets/` | Logo dosyaları (SVG, vektör — her boyutta net). |

Diller: **Almanca + İngilizce.** Sayfa telefonun diline göre kendi açılır,
sağ üstteki bayrağa basınca diğer dile geçer. Karşılama ekranı yok — QR'ı
okutan kişi doğrudan istek formuna düşer.

---

## Kurulum — 6 adım (~15 dakika)

### 1. Firebase projesi aç (Flo'nun kendi hesabıyla)

1. https://console.firebase.google.com → **Add project**
2. İsim: `dj-flo-rakete` → Google Analytics'i **kapat** (gerek yok) → Create

### 2. Realtime Database oluştur

1. Sol menü **Build → Realtime Database → Create Database**
2. Konum: **europe-west1 (Belgium)** — Almanya için en düşük gecikme, GDPR uyumlu
3. **Start in locked mode** seç (kuralları 5. adımda gireceğiz)

### 3. Giriş yöntemlerini aç

**Build → Authentication → Get started**, sonra iki sağlayıcıyı aç:

- **Anonymous** → Enable (misafirler için)
- **Google** → Enable (DJ panelinin girişi için)

### 4. Config'i dosyalara yapıştır

1. ⚙️ **Project settings → General → Your apps → Web (`</>`)** → uygulama ekle
2. Sana verdiği `firebaseConfig` bloğunu kopyala
3. `guest.html` içinde `const firebaseConfig = {` satırını bul, `YOUR_...`
   yazan bloğun **tamamını** kopyaladığınla değiştir
4. **Aynısını `admin.html`'de de yap.** İki dosya aynı config'i kullanmalı,
   yoksa panel istekleri göremez.

> Bu anahtarlar gizli değil — herkese açık olması normaldir. Sistemi koruyan
> şey config değil, bir sonraki adımdaki kurallardır.

### 5. Güvenlik kurallarını gir

1. Önce `admin.html`'i tarayıcıda aç, **Google ile bir kez giriş yap.**
   "This account is not the DJ account" diyecek — **bu normal**, kural henüz yok.
2. Firebase Console → **Authentication → Users** → o Google satırındaki
   **UID**'yi kopyala.
3. `firebase-rules.json` dosyasını aç, **`DJ_UID_HERE` yazan 2 yeri** o UID ile
   değiştir.
4. Console → **Realtime Database → Rules** sekmesi → içeriği tamamen sil,
   `firebase-rules.json`'un içeriğini yapıştır → **Publish**.

Bu kurallar şunu sağlar: misafir sadece **kendi** isteğini yazabilir,
başkasınınkini silemez/düzenleyemez; sadece Flo'nun hesabı kuyruğu yönetebilir;
rastgele bir Google hesabı panele giremez.

### 6. Yayına al

En pratik yol GitHub Pages (ücretsiz):

1. GitHub'da **yeni ve ayrı bir repo** aç — örn. `dj-flo-rakete`
   (kendi `dj-gigs` repona **dokunma**)
2. Bu klasördeki dosyaları yükle
3. **Settings → Pages → Branch: main / root → Save**
4. Adres şu şekilde olur:
   `https://KULLANICIADI.github.io/dj-flo-rakete/guest.html`

Kendi alan adı (`djflorakete.de` gibi) alınırsa Settings → Pages → Custom
domain'den bağlanır.

---

## QR kodu üret

1. `qr.html`'i tarayıcıda aç
2. Yayına aldığın **guest.html adresini** yapıştır → **QR erstellen**
3. İki çıktı indirebilirsin:
   - **QR als PNG** — sadece kod (Instagram, kartvizit, sticker için)
   - **Aushang als PNG (A5)** — logolu, baskıya hazır masa afişi (300 dpi)

QR üretici internetsiz de çalışır — kütüphane dosyanın içine gömülü, dışarıya
hiçbir veri gitmez.

> ⚠️ **QR'ı bastırmadan önce mutlaka telefonla okut ve test et.** Adres
> değişirse QR de değişir; basılmış afişler çöp olur. Önce adresi kesinleştir.

---

## Sonra yapılacaklar (şimdilik kapalı)

### PayPal / banka — bahşiş alma

Şu an devre dışı. Sayfada "Setup incomplete" uyarısı bunun için çıkıyor.
Açmak için:

1. https://developer.paypal.com/dashboard/applications → **Live** sekmesi
2. Yeni REST app oluştur → **Client ID**'yi kopyala
3. `guest.html` içinde `const PAYPAL_CLIENT_ID = "YOUR_PAYPAL_CLIENT_ID";`
   satırını bul, kendi ID'sini yaz

Para **doğrudan Flo'nun PayPal hesabına** gider; arada senin hesabın yoktur.
Minimum bahşiş `MIN_TIP` sabitinden (şu an €10) değiştirilir.

### Sosyal medya linkleri

`guest.html` ve `links.html` içindeki `href="#"` olan linkler **otomatik
gizleniyor.** Flo'nun Instagram/Spotify/YouTube adreslerini yazınca ikonlar
kendiliğinden görünür olur. Boş kalanları silmene gerek yok.

### Logo

`assets/` içindeki logolar vektör (SVG) — orijinal dosya elimde olmadığı için
görselden yeniden çizildi, her boyutta net çıkar. Flo'nun orijinal dosyası
(AI/EPS/şeffaf PNG) varsa onunla değiştirilebilir.

---

## Ayarlanabilir sabitler (`guest.html`)

| Sabit | Şu an | Ne yapar |
|---|---|---|
| `COOLDOWN_MS` | 30 dk | Ücretsiz istekler arası bekleme |
| `MIN_TIP` | €10 | Kabul edilen en düşük bahşiş |
| `DUP_WINDOW_MS` | 6 saat | Aynı şarkının tekrar istenemeyeceği süre |

---

## Senin sistemine etkisi: sıfır

- Ayrı Firebase projesi → ayrı veritabanı, ayrı kota, ayrı fatura
- Ayrı PayPal hesabı → para karışmaz
- Ayrı `localStorage` alanı (`florakete.*`) → aynı telefonda ikisi de açılsa
  bekleme süreleri birbirine karışmaz
- Ayrı repo, ayrı adres, ayrı QR

`djozmen-53d67` projene ve `dj-gigs` repona hiçbir değişiklik yapılmadı.
