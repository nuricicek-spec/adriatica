# Vitrine Pro – Template de site vitrine professionnel (gratuit)

Ce dépôt fournit un **template HTML/CSS/JS** moderne et optimisé pour créer des sites vitrines professionnels. Le code est pensé pour être **ultra-rapide**, responsive, accessible et facile à adapter pour n’importe quel client ou secteur.

## Caractéristiques clés

- **Performance** : pas de framework, seulement HTML/CSS/JS natif → vitesse de chargement maximale.
- **Responsive** : design s’adapte aux mobiles, tablettes, ordinateurs de bureau.
- **Accessibilité** : structure sémantique, skip links, labels, contrastes suffisants.
- **Thème personnalisable** : changez une variable (`--brand`) dans `styles.css` pour adapter les couleurs à la marque de votre client (voir commentaire en bas de `styles.css`).
- **SEO de base** : balises méta, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt` inclus.
- **Formulaire de contact** : fonctionne avec [Formspree](https://formspree.io/) (gratuit) ou [EmailJS](https://www.emailjs.com/) en option.
- **Déploiement gratuit** : prêt pour GitHub Pages, Netlify, Vercel, Cloudflare Pages.
- **Clonable et revendable** : structure claire avec commentaires « TODO » pour modifier facilement les textes, images et couleurs selon chaque client.

## 1. Cloner le projet & l’ouvrir

```bash
git clone https://github.com/votrecompte/vitrine-pro.git
cd vitrine-pro
# Ouvrez simplement index.html dans un navigateur pour le tester en local
python -m http.server 8080  # optionnel pour avoir un serveur local
```

## 2. Personnaliser le contenu

Les principaux éléments à modifier sont dans `index.html` et `styles.css`. Recherchez les commentaires `TODO` et remplacez :

1. **Titres et descriptions**
   - `<title>` et `<meta name="description">`
   - Texte du héros (H1 et paragraphe d’accroche)
   - Contenu des sections Services, À propos, Portfolio et Contact
   - JSON-LD pour mettre à jour `name`, `url`, `telephone`, `address`
2. **Couleurs de marque**
   - Dans `styles.css`, modifiez les variables `--brand` et `--brand-600` pour adapter la couleur principale. Des exemples sont donnés en commentaire (vert, violet, orange…).
3. **Images**
   - Remplacez les liens vers les photos (héros, portfolio) par vos propres images libres de droits ou celles fournies par le client. Les liens actuels utilisent Pexels mais peuvent être remplacés par des fichiers locaux dans `assets/`.
   - Fournissez un `assets/logo.svg` ou remplacez par une image PNG/SVG de votre client.
4. **Formulaire**
   - Inscrivez-vous gratuitement sur Formspree et récupérez votre **Form ID** (du type `/f/abcd1234`). Remplacez l’URL d’action du formulaire : `action="https://formspree.io/f/xxxx"` dans `index.html`.
   - Facultatif : pour utiliser EmailJS (pas d’URL d’action visible), ajoutez `data-emailjs="true"` à la balise `<form>` et remplissez `SERVICE_ID`, `TEMPLATE_ID` et `PUBLIC_KEY` dans `script.js`.

## 3. Déploiement gratuit

### A. GitHub Pages (recommandé pour un site statique simple)
1. Créez un nouveau dépôt GitHub (`vitrine-pro` par exemple) et poussez les fichiers.
2. Dans **Settings → Pages**, sélectionnez la branche `main` et le dossier `/` comme source. Enregistrez.
3. Votre site sera disponible à l’adresse : `https://<votre-utilisateur>.github.io/vitrine-pro/`.
4. (Facultatif) Pour un domaine personnalisé, achetez un domaine chez un registrar puis ajoutez un fichier `CNAME` contenant ce domaine à la racine du dépôt.

### B. Netlify
1. Connectez votre dépôt depuis Netlify et cliquez sur **New site from Git**.
2. Laissez « Build command » vide (pas de build) et « Publish directory » sur `/`.
3. Le site sera disponible sur `https://<nom-du-site>.netlify.app`.

### C. Vercel
1. Importez le projet depuis Vercel et choisissez « Other » comme framework.
2. Définissez `Output directory` sur `/`.
3. Obtenez un lien `https://<nom-du-site>.vercel.app`.

### D. Cloudflare Pages
1. Créez un nouveau projet et connectez votre dépôt.
2. Configurez sans commande de build, Output directory : `/`.
3. Vous aurez une URL du type `https://<nom-du-site>.pages.dev`.

## 4. Conseils pour créer des variantes et vendre sur Fiverr

- **Thème express** : changez la couleur principale (`--brand`) et la seconde (`--brand-600`) pour adapter le look (par exemple, vert pour un coach sportif, violet pour un thérapeute, orange pour un restaurant). Vous trouverez des suggestions dans `styles.css`.
- **Images de niche** : préparez des dossiers d’images (coach, artisan, avocat, etc.) et remplacez les 3 images du portfolio dans `index.html` à l’aide d’un script ou manuellement.
- **Texte type** : stockez des textes adaptés à chaque secteur (services spécifiques, témoignages) et faites des recherches rapides/remplacements avec un éditeur.
- **Automatisation** : si vous enchaînez les projets, créez un script (bash ou node) qui prend en entrée le nom du client, la couleur de marque, les images et génère le site et le `sitemap.xml` automatiquement.
- **Licences** : vérifiez toujours que vos images sont libres de droits pour un usage commercial. Documentez l’origine dans un fichier `LICENSE-IMAGES.md`.
- **Livraison** : fournissez un zip du site + une URL de prévisualisation + un mini guide d’édition (1 page) pour que le client puisse modifier le texte lui-même.

## 5. SEO rapide – check-list

1. Un seul H1 par page (le titre du héros).
2. Balise `<title>` ≤ 60 caractères et `<meta name="description">` entre 150 et 160 caractères.
3. Données structurées JSON-LD à jour (nom de l’entreprise, url, etc.).
4. Fichier `sitemap.xml` validé avec votre propre URL.
5. Images optimisées (taille ≤ 200 ko) avec attributs `alt` descriptifs.
6. Liens internes cohérents et CTA visibles (boutons “Demander un devis”).

## 6. Maintenance

- Conservez les images aussi légères que possible et utilisez l’attribut `loading="lazy"` pour les images non critiques.
- Pas de polices externes (utilise la stack système) pour améliorer les performances.
- Évitez de charger des bibliothèques JavaScript externes inutiles.
- Utilisez des outils comme [Google PageSpeed Insights](https://pagespeed.web.dev/) pour vérifier la performance après personnalisation.

## Licence

Vous pouvez utiliser et modifier ce template pour vos projets personnels ou commerciaux. Aucun support n’est garanti. Crédit apprécié mais pas obligatoire.