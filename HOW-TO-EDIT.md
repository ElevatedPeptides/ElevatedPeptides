# HOW TO EDIT, DEPLOY & LAUNCH YOUR ELEVATED PEPTIDES WEBSITE

---

## PART 1 — HOW TO EDIT THIS WEBSITE WITH CLAUDE AI

### What you need
- A free account at **claude.ai** (or Claude Code desktop app)
- This ZIP folder extracted on your computer

### Steps

1. Go to **claude.ai** and start a new conversation
2. Upload the files you want to edit by clicking the paperclip / attachment icon
   - Upload `index.html` to edit the homepage
   - Upload `shop.html` to edit the shop page
   - Upload `products.js` to add, remove, or change products and prices
3. Tell Claude exactly what you want changed. Examples:
   - *"Change the site name from Elevated Peptides to [Your Brand Name]"*
   - *"Add a new product called Semax, 10mg vial, $45, to the peptides category"*
   - *"Change the color theme from teal to purple"*
   - *"Update the GHK-Cu Serum price from $58 to $65"*
4. Claude will give you back the edited file — download it and replace the old file in your folder
5. Repeat for any other files you want to change

### File guide — what each file does

| File | What it controls |
|------|-----------------|
| `index.html` | Homepage — hero section, featured products, layout |
| `shop.html` | Full shop page — all products, cart, checkout flow |
| `products.js` | **All product names, prices, descriptions, images** — edit this first |
| `coas.html` | COA / lab results page |
| `contact.html` | Contact page |
| `terms.html` | Terms of service page |
| `page-editor.js` | In-browser visual editor (advanced) |
| `logo.png` | Your logo — replace with your own, keep the same filename |
| `wallpaper.jpg` | Background image — replace with your own, keep the same filename |
| `OCTAGONVIALS.png` | Hero vial display image (homepage + shop header) |
| `SHOPVIALS.png` | Default product image used on product cards |
| `ghkcu-serum-30ml.png` | GHK-Cu Serum product image |
| `ghkcu-lotion-60g.jpg` | GHK-Cu Lotion product image |

### How to add your own product images

1. Name your image file something clear, e.g. `bpc157-vial.png`
2. Drop it into your site folder
3. Open `products.js` and find the product line
4. Change the last item in that line from `'SHOPVIALS.png'` to `'bpc157-vial.png'`

---

## PART 2 — HOW TO DEPLOY YOUR SITE WITH CLOUDFLARE PAGES (FREE)

Cloudflare Pages hosts your website for free with a `.pages.dev` URL. No coding knowledge needed.

### Step 1 — Create a free Cloudflare account
1. Go to **dash.cloudflare.com**
2. Click **Sign Up** — use your email, it's free
3. Verify your email

### Step 2 — Upload your site
1. In the Cloudflare dashboard, click **Workers & Pages** in the left sidebar
2. Click the **Pages** tab
3. Click **Create a project**
4. Click **Upload assets** (direct upload — no GitHub needed)
5. Give your project a name, e.g. `elevated-peptides`
6. Drag and drop your entire site folder (or click to browse and select all files)
7. Click **Deploy site**

### Step 3 — Your site is live
- Cloudflare gives you a free URL like: `elevated-peptides.pages.dev`
- Every time you make changes, go back to the same project and click **Upload assets** again to update it

---

## PART 3 — HOW TO CONNECT A GODADDY DOMAIN TO CLOUDFLARE

After buying a domain on GoDaddy (e.g. `yourbrand.com`), follow these steps:

### Step 1 — Add your domain to Cloudflare
1. In the Cloudflare dashboard, click **Add a site** (top right or left sidebar)
2. Enter your domain name (e.g. `yourbrand.com`) and click **Add site**
3. Select the **Free plan** and click **Continue**
4. Cloudflare will scan your DNS — click **Continue**
5. Cloudflare gives you **2 nameserver addresses** — copy both (they look like `aria.ns.cloudflare.com`)

### Step 2 — Update nameservers on GoDaddy
1. Log into **godaddy.com** → My Products → find your domain → click **DNS**
2. Click **Nameservers** → **Change** → select **Enter my own nameservers**
3. Delete the existing nameservers and paste in the two Cloudflare nameservers
4. Save — GoDaddy will warn you this takes up to 48 hours (usually under 1 hour)

### Step 3 — Connect your domain to your Cloudflare Pages site
1. Back in Cloudflare, go to **Workers & Pages** → your Pages project
2. Click **Custom domains** tab → **Set up a custom domain**
3. Enter your domain (e.g. `yourbrand.com`) → click **Continue** → **Activate domain**
4. Cloudflare automatically adds the DNS record

### Step 4 — Done
- Your site will be live at `yourbrand.com` within minutes to a few hours
- SSL (HTTPS) is automatic and free — Cloudflare handles it
- No monthly hosting fees

---

## QUICK TIPS

- **Never delete** `products.js` — the entire shop depends on it
- **Keep filenames lowercase with no spaces** — use hyphens instead (e.g. `my-image.png` not `My Image.png`)
- **Test locally** by opening `index.html` directly in your browser before deploying
- **Password** — the site has a password gate. To change it, open `index.html` and search for `GATE_PASS` or `password` to find where it's set

---

*Built with Claude AI · Hosted on Cloudflare Pages*
