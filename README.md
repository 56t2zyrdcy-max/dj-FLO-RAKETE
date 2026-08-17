# DJ FLO RAKETE — Songwunsch-System

QR-basiertes Musikwunsch-System für Partys, Hochzeiten und Events.
Deutsch + Englisch, erkennt die Sprache des Handys automatisch.

| Datei | Zweck |
|---|---|
| `guest.html` | Gastseite — der QR-Code führt hierher. Songwunsch + Trinkgeld. |
| `admin.html` | DJ-Panel — Live-Warteschlange, Google-Login. |
| `qr.html` | QR-Generator + druckfertiger A5-Aushang. Funktioniert offline. |
| `links.html` | Social-Media-Linkseite. |
| `firebase-rules.json` | Datenbank-Sicherheitsregeln. |
| `assets/` | Logo-Dateien (SVG). |

**Einrichtung: siehe `KURULUM.md`** — 6 Schritte, ca. 15 Minuten.

Backend: Firebase Realtime Database + Anonymous Auth. Trinkgeld: PayPal.
Eigenes Firebase-Projekt erforderlich; bis dahin werden keine Daten gespeichert.
