/* ══════════════════ ELEVATED PEPTIDES — PRODUCT CATALOG ══════════════════ */
const CATS = [
  { key: 'peptides',   emoji: '🧬', label: 'Peptides' },
  { key: 'cosmetics',  emoji: '💆', label: 'Cosmetics' },
  { key: 'supplies',   emoji: '💧', label: 'Supplies' },
];

function P(key, name, cat, opts, stock = 25, note = null, img = null, detail = null) {
  return { key, name, cat, opts, stock, note, img, detail };
}

const STARTER_PRODUCTS = [
  // ── GLP-1 / Weight Management ──
  P('tirz',    'Tirzepatide',       'peptides', [['10mg Vial', 50], ['30mg Vial', 90]],  10, 'Dual GLP-1 & GIP receptor agonist — metabolic research compound', 'trizep-vial.png', 'Tirzepatide is a synthetic dual agonist that activates both GLP-1 and GIP receptors, two incretin hormone pathways involved in glucose regulation and appetite signaling. In research models, dual-receptor activation has been studied for its effects on insulin secretion, gastric emptying, and energy balance, making it one of the most actively researched compounds in metabolic and obesity-related studies.'),
  P('reta',    'Retatrutide',       'peptides', [['10mg Vial', 70], ['30mg Vial', 100]], 10, 'Triple agonist — GLP-1 · GIP · Glucagon receptor', 'reta-vial.png', 'Retatrutide is a next-generation triple agonist engineered to activate GLP-1, GIP, and glucagon receptors simultaneously. This triple-pathway approach is being studied for its potential to influence energy expenditure alongside appetite and glucose regulation, positioning it at the frontier of metabolic peptide research.'),

  // ── Healing / Recovery ──
  P('bpctb',   'BPC-157 / TB-500', 'peptides', [['10/10mg Combo', 90]], 10, 'Synergistic healing blend — tissue repair & recovery research', 'bpc-tb-vial.png', 'This combination pairs BPC-157, a stable gastric pentadecapeptide studied for its role in angiogenesis and tissue repair, with TB-500 (Thymosin Beta-4), a peptide fragment researched for its influence on cell migration and actin regulation during wound healing. Together, they are commonly studied as a synergistic stack for recovery and regenerative research.'),
  P('klow80',  'KLOW 80',          'peptides', [['80mg 4-in-1 Blend', 110]], 10, 'Advanced four-in-one peptide blend — BPC-157 (10mg), TB-500 (10mg), KPV (10mg) & GHK-Cu (50mg). Supports tissue repair, accelerates post-treatment healing, manages inflammation, and improves skin health.', 'klow-vial.png', 'KLOW 80 combines four extensively studied peptides into a single blend: BPC-157 (10mg) and TB-500 (10mg) for their synergistic role in tissue repair research, KPV (10mg), a tripeptide studied for its anti-inflammatory signaling properties, and GHK-Cu (50mg), a copper-binding peptide researched for collagen synthesis and skin regeneration. This combination is designed for researchers studying compounded approaches to recovery, inflammation modulation, and tissue health.'),

  // ── Skin / Anti-Aging ──
  P('ghkcu',   'GHK-Cu',           'peptides', [['100mg Vial', 30]], 10, 'Copper peptide — collagen synthesis & skin regeneration', 'ghk-cu-vial.png', 'GHK-Cu is a naturally occurring copper-binding tripeptide studied extensively for its role in collagen and elastin production, wound healing, and antioxidant activity. Research has explored its effects on skin remodeling, hair follicle stimulation, and anti-inflammatory pathways, making it a widely referenced compound in dermatological and regenerative research.'),
  P('ss31',    'SS-31',            'peptides', [['10mg Vial', 50]],  10, 'Mitochondria-targeted peptide — oxidative stress & aging research', 'ss31-vial.png', 'SS-31 (elamipretide) is a mitochondria-targeted peptide studied for its ability to concentrate in the inner mitochondrial membrane and stabilize cardiolipin, a phospholipid critical to mitochondrial energy production. Research has focused on its potential role in reducing oxidative stress and studying age-related mitochondrial dysfunction.'),

  // ── Metabolic / Longevity ──
  P('motsc',   'MOTS-c',           'peptides', [['10mg Vial', 40]], 10, 'Mitochondrial peptide — metabolic regulation & longevity research', 'motsc-vial.png', 'MOTS-c is a mitochondrial-derived peptide encoded within the mitochondrial genome, studied for its role as a metabolic regulator. Research has examined its influence on insulin sensitivity, AMPK activation, and exercise-related metabolic adaptation, positioning it as a compound of interest in longevity and metabolic research.'),
  P('nad',     'NAD+',             'peptides', [['1000mg', 55]],    10, 'Nicotinamide adenine dinucleotide — cellular energy & anti-aging research', 'nad-vial.png', 'NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme found in every living cell, essential to energy metabolism and DNA repair processes. Research interest centers on its decline with age and its potential role in studies of cellular energy production, sirtuin activation, and anti-aging pathways.'),

  // ── GH Peptides ──
  P('cjipa',   'CJC-1295 / Ipamorelin', 'peptides', [['5/5mg Combo', 50]], 10, 'Classic GH-releasing synergy blend — pulsatile GH secretion research', 'cjc-ipa-vials.png', 'This combination pairs CJC-1295, a growth-hormone-releasing hormone (GHRH) analog studied for its ability to promote a steady elevation in growth hormone levels, with Ipamorelin, a selective growth hormone secretagogue known for stimulating pulsatile GH release without significantly affecting cortisol or prolactin. Together, they are commonly studied for their synergistic effect on the growth hormone axis.'),

  // ── Sexual Health ──
  P('pt141',   'PT-141',           'peptides', [['10mg Vial', 35]], 10, 'Melanocortin receptor agonist — sexual function research compound', 'pt41-vials.png', 'PT-141 (Bremelanotide) is a melanocortin receptor agonist studied for its activity on central nervous system pathways involved in sexual arousal. Unlike traditional approaches that target vascular pathways, PT-141 research focuses on melanocortin receptor activation in the brain.'),
  P('mt2',     'Melanotan II',     'peptides', [['10mg Vial', 35]], 10, 'Melanocortin peptide — pigmentation & sexual arousal research', 'MTII-vial.png', 'Melanotan II is a synthetic analog of alpha-melanocyte-stimulating hormone (α-MSH), studied for its effects on melanocortin receptors involved in pigmentation and appetite regulation. Research has also explored secondary effects on libido and mood via melanocortin receptor pathways.'),

  // ── Supplies ──
  P('bacwater','BAC Water',        'supplies', [['10ml', 7]],       10, 'Bacteriostatic water for reconstitution', 'bac-water-vial.png', 'Bacteriostatic water is sterile water containing 0.9% benzyl alcohol, which inhibits bacterial growth, making it suitable for reconstituting lyophilized (freeze-dried) peptides for research use. It is a standard laboratory reagent used across peptide research applications.'),

  // ── Cosmetics ──
  P('ghkcuserum',  'GHK-Cu Serum',  'cosmetics', [['30ml', 58]], 0, 'Firms, smooths & restores radiance — copper peptide complex for visibly healthier-looking skin.', 'ghkcu-serum-30ml.png', 'This serum delivers GHK-Cu, a copper-binding peptide complex, in a topical formulation designed to support the skin\'s natural collagen and elastin production. Regular use is intended to visibly firm, smooth, and restore radiance while supporting the skin\'s barrier and overall texture.'),
  P('ghkculotion', 'GHK-Cu Lotion', 'cosmetics', [['60g', 65]],  0, 'Deeply hydrating barrier-repair lotion with GHK-Cu — softer, firmer skin with daily use.', 'ghkcu-lotion-60g.jpg', 'This deeply hydrating lotion combines GHK-Cu with a barrier-repair formula to support skin softness, firmness, and moisture retention. Designed for daily use, it\'s formulated to work with the skin\'s natural renewal processes for long-term texture and hydration benefits.'),
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
