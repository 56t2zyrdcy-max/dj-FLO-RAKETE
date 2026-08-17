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
   bgTop       page background at the top (the glow behind the header)
   bgBase      page background lower down; keep it near-black
   panelTop    same idea for the DJ panel
   panelBase   same idea for the DJ panel
   headerLogo  true = show the full logo lockup as the page headline instead
               of the DJ's name in type. Use it when the logo already
               contains the name, like CROW D's does.
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
    bgTop:    '#24070E',
    bgBase:   '#08070A',
    panelTop: '#26080F',
    panelBase:'#0B0709',
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
  },

  crowd: {
    slug:     'crowd',
    name:     'DJ CROW D',
    slogan:   '',
    accent:   '#EDF2F8',
    accent2:  '#8FA9C4',
    bgTop:    '#141A22',
    bgBase:   '#07080A',
    panelTop: '#111721',
    panelBase:'#070809',
    headerLogo: true,
    logoMark: 'assets/crowd-mark.png',
    logoFull: 'assets/crowd-full.png',
    logoPrint:'assets/crowd-full-light.png',
    panelKey: 'eEjw789oEyVQ79xB',
    ownerUid: '',
    tips:     false,
    paypal:   '',
    socials:  { instagram: '', spotify: '', apple: '', soundcloud: '', youtube: '' },
    noteDe:   'Wünsche werden gespielt, wenn sie zur Stimmung passen — nicht jeder Song passt in jeden Moment.',
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
