# Adriatica D.O.O. – Corporate Website

Modern, responsive and lightweight company website for **Adriatica D.O.O.** , a marine engineering and technical consultancy based in Montenegro.

Built with pure HTML/CSS/JS (no frameworks) for maximum performance and easy customisation.

## ✨ Key Features

- ⚡ **Ultra‑fast** – No bloat, only native code
- 📱 **Fully responsive** – Works on mobile, tablet, desktop
- 🎨 **Easy branding** – Change primary colour via CSS variables (`--brand`, `--brand-600`)
- 🔍 **SEO ready** – Meta tags, Open Graph, JSON‑LD, `sitemap.xml`, `robots.txt` included
- 📬 **Contact form** – Works with [Formspree](https://formspree.io/) (free tier)
- 🚀 **One‑click deploy** – Ready for GitHub Pages, Netlify, Vercel

## 🛠️ Customisation

1. **Clone the repository**
   git clone https://github.com/nuricicek-spec/adriatica.git
   cd adriatica

2. **Open locally**  
   Just open `index.html` in your browser.

3. **Brand colours**  
   Edit `styles.css` – look for the `:root` variables at the top.

4. **Content**  
   All text is in `index.html`. Look for `TODO` comments to know what to replace:
   - Company name, tagline, about text
   - Services list (three categories)
   - Contact details (email, phone)

5. **Logo & images**  
   Place your logo in `assets/logo.svg` (or use PNG).  
   Replace placeholder images in the `assets/` folder.

6. **Contact form**  
   - Sign up at Formspree (https://formspree.io/)
   - Create a new form and copy its ID (e.g. /f/xyz123)
   - In `index.html`, update the form's action attribute:
     action="https://formspree.io/f/your-form-id-here"

## 🌐 Deployment

### GitHub Pages

1. Push your changes to the `main` branch.
2. Go to repo **Settings → Pages**.
3. Under "Branch", select `main` and save.
4. Your site will be live at:  
   https://nuricicek-spec.github.io/adriatica/

For a custom domain, add a `CNAME` file with your domain.

### Netlify

1. Go to [Netlify](https://netlify.com) and sign up with your GitHub account.
2. Click **"New site from Git"** and select your GitHub repository (`nuricicek-spec/adriatica`).
3. Leave **"Build command"** empty and set **"Publish directory"** to `/`.
4. Click **"Deploy site"**.
5. Your site will be available at a Netlify subdomain (e.g. `random-name.netlify.app`). You can customize it later.

Netlify automatically handles form submissions – you'll receive them via email.

## 📄 License

Free to use and modify for personal or commercial projects. No warranty provided. Original template by [nairo91/vitrine-pro](https://github.com/nairo91/vitrine-pro).
