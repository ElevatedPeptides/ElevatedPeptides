/* ══════════════════ ELEVATED PEPTIDES — PRODUCT CATALOG ══════════════════ */
const CATS = [
  { key: 'peptides',   emoji: '🧬', label: 'Peptides' },
  { key: 'cosmetics',  emoji: '💆', label: 'Cosmetics' },
  { key: 'supplies',   emoji: '💧', label: 'Supplies' },
];

function P(key, name, cat, opts, stock = 25, note = null, img = null) {
  return { key, name, cat, opts, stock, note, img };
}

const STARTER_PRODUCTS = [
  // ── GLP-1 / Weight Management ──
  P('tirz',    'Tirzepatide',       'peptides', [['10mg Vial', 50], ['30mg Vial', 90]],  20, 'Dual GLP-1 & GIP receptor agonist — metabolic research compound', 'SHOPVIALS.png'),
  P('reta',    'Retatrutide',       'peptides', [['10mg Vial', 70], ['30mg Vial', 100]], 20, 'Triple agonist — GLP-1 · GIP · Glucagon receptor', 'SHOPVIALS.png'),

  // ── Healing / Recovery ──
  P('bpctb',   'BPC-157 / TB-500', 'peptides', [['10/10mg Combo', 90]], 20, 'Synergistic healing blend — tissue repair & recovery research', 'SHOPVIALS.png'),

  // ── Skin / Anti-Aging ──
  P('ghkcu',   'GHK-Cu',           'peptides', [['100mg Vial', 30]], 25, 'Copper peptide — collagen synthesis & skin regeneration', 'SHOPVIALS.png'),
  P('ss31',    'SS-31',            'peptides', [['10mg Vial', 50]],  20, 'Mitochondria-targeted peptide — oxidative stress & aging research', 'SHOPVIALS.png'),

  // ── Metabolic / Longevity ──
  P('motsc',   'MOTS-c',           'peptides', [['10mg Vial', 40]], 25, 'Mitochondrial peptide — metabolic regulation & longevity research', 'SHOPVIALS.png'),
  P('nad',     'NAD+',             'peptides', [['1000mg', 55]],    20, 'Nicotinamide adenine dinucleotide — cellular energy & anti-aging research', 'SHOPVIALS.png'),

  // ── GH Peptides ──
  P('cjipa',   'CJC-1295 / Ipamorelin', 'peptides', [['5/5mg Combo', 50]], 25, 'Classic GH-releasing synergy blend — pulsatile GH secretion research', 'SHOPVIALS.png'),

  // ── Sexual Health ──
  P('pt141',   'PT-141',           'peptides', [['10mg Vial', 35]], 20, 'Melanocortin receptor agonist — sexual function research compound', 'SHOPVIALS.png'),
  P('mt2',     'Melanotan II',     'peptides', [['10mg Vial', 35]], 20, 'Melanocortin peptide — pigmentation & sexual arousal research', 'SHOPVIALS.png'),

  // ── Supplies ──
  P('bacwater','BAC Water',        'supplies', [['10ml', 7]],       30, 'Bacteriostatic water for reconstitution', 'SHOPVIALS.png'),

  // ── Cosmetics ──
  P('ghkcuserum',  'GHK-Cu Serum',  'cosmetics', [['30ml', 58]], 0, 'Firms, smooths & restores radiance — copper peptide complex for visibly healthier-looking skin.', 'ghkcu-serum-30ml.png'),
  P('ghkculotion', 'GHK-Cu Lotion', 'cosmetics', [['60g', 65]],  0, 'Deeply hydrating barrier-repair lotion with GHK-Cu — softer, firmer skin with daily use.', 'ghkcu-lotion-60g.jpg'),
];

/* ══════════════════ COA HELPER — Google Drive file matching ══════════════════
   Set DRIVE_FOLDER_ID and DRIVE_API_KEY below to enable auto-matched COA links.
   Leave blank to skip COA features. */
const DRIVE_FOLDER_ID = '';
const DRIVE_API_KEY   = '';

async function fetchCOAFiles(forceRefresh){
  if(!DRIVE_FOLDER_ID || !DRIVE_API_KEY) return [];
  const CACHE_KEY = 'ep_coa_cache', CACHE_TS = 'ep_coa_cache_ts', TTL = 3600000;
  if(!forceRefresh){
    try{
      const ts = parseInt(localStorage.getItem(CACHE_TS)||'0');
      if(Date.now()-ts < TTL){
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY)||'[]');
        if(cached.length) return cached;
      }
    }catch(e){}
  }
  try{
    const url = `https://www.googleapis.com/drive/v3/files?q='${DRIVE_FOLDER_ID}'+in+parents+and+trashed=false&fields=files(id,name,mimeType)&pageSize=200&key=${DRIVE_API_KEY}`;
    const resp = await fetch(url);
    const data = await resp.json();
    const files = (data.files||[]).map(f=>({
      id: f.id, name: f.name,
      url: f.mimeType==='application/vnd.google-apps.document'
        ? `https://docs.google.com/document/d/${f.id}/export?format=pdf`
        : `https://drive.google.com/uc?export=download&id=${f.id}`
    }));
    localStorage.setItem(CACHE_KEY, JSON.stringify(files));
    localStorage.setItem(CACHE_TS, String(Date.now()));
    return files;
  }catch(e){ return []; }
}

function matchCOAFiles(products, files){
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g,'');
  const map = {};
  products.forEach(p=>{
    const pn = norm(p.name);
    for(const f of files){
      const fn = norm(f.name);
      if(fn.includes(pn) || pn.split(' ').every(w=>fn.includes(w))){
        map[p.key] = f.url;
        break;
      }
    }
  });
  return map;
}
