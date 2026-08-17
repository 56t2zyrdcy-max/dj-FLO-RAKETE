/* =====================================================================
   DJ REGISTRY — the single source of truth for every DJ on the platform.

   To add a DJ: copy a block, change the values, upload their two logo
   files to assets/. Nothing else needs editing — the guest page, the DJ
   panel, the QR generator and the owner console all read from here.

   slug        short id used in the URL (?dj=flo) and as the database
               folder name (djs/flo/...). Lowercase letters and digits
               only, and NEVER change it once QR codes are printed.
   name        shown as the big headline on the guest page
   slogan      small line under the headline, blank string to hide it
   accent      main brand colour
   accent2     secondary colour, used for gradients and highlights
   logoMark    small square logo for the spinning vinyl label
   logoFull    wide logo lockup for dark backgrounds
   logoPrint   same lockup in dark ink, for the white printed poster
   panelKey    the DJ panel opens with NO login at all. This random string
               in the link is the only thing keeping strangers out, so treat
               the link like a key: give it to the DJ, don't post it.
                 admin.html?dj=flo&k=<panelKey>
               Change it and the old link stops working immediately.
   ownerUid    optional. Only used by the owner console for labelling.
   tips        false = the tip / PayPal section is hidden completely
   paypal      the DJ's OWN PayPal client id, only used when tips is true
   socials     any left out or blank are hidden automatically
   noteDe/En   the highlighted line under the headline
   ===================================================================== */

window.DJS = {

  flo: {
    slug:     'flo',
    name:     'DJ Flo Rakete',
    slogan:   'Musik für deine Fete',
    accent:   '#E4032E',
    accent2:  '#FF8A3D',
    logoMark: 'assets/flo-mark.svg',
    logoFull: 'assets/flo-full.svg',
    logoPrint:'assets/flo-full-light.svg',
    panelKey: 'VzBO1juKjzPeO0ZR',
    ownerUid: '',
    tips:     false,
    paypal:   '',
    socials:  { instagram: '', spotify: '', apple: '', soundcloud: '', youtube: '' },
    noteDe:   'Wünsche werden in der Reihenfolge gespielt, die zur Stimmung passt — nicht jeder Song passt in jeden Moment.',
    noteEn:   'Requests are played when they fit the vibe — not every song fits every moment.'
  }

};

/* The Google account that may open the owner console (console.html).
   The console stays behind a real login on purpose — it can see every DJ. */
window.PLATFORM_OWNER_UID = '';

/* ---------------------------------------------------------------------
   Helpers shared by every page.
   --------------------------------------------------------------------- */

/* Reads ?dj=... from the URL. Falls back to the first DJ in the registry
   so a bare link still shows something instead of an error page. */
window.resolveDj = function resolveDj(){
  let slug = '';
  try{ slug = (new URLSearchParams(location.search).get('dj') || '').toLowerCase().trim(); }catch(e){}
  const keys = Object.keys(window.DJS);
  if (!slug || !window.DJS[slug]) slug = keys[0];
  const dj = window.DJS[slug];
  return Object.assign({}, dj, { slug: slug });
};

/* Every DJ's data lives under its own branch, so one DJ can never see or
   overwrite another's queue. */
window.djRoot = function djRoot(slug){ return 'djs/' + slug; };

/* localStorage is also namespaced per DJ — otherwise a guest who visited
   two different DJs would carry one DJ's cooldown into the other's party. */
window.djStoreKey = function djStoreKey(slug, key){ return 'djreq.' + slug + '.' + key; };
