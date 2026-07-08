const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://recipes.foodybhai.in';
const DATA_DIR = path.join(__dirname, 'public', 'data');
const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');

const recipesList = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'recipes-list.json'), 'utf-8'));
const categories = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'categories.json'), 'utf-8'));
const cuisines = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'cuisines.json'), 'utf-8'));

function createUrl(loc, priority = '0.5', changefreq = 'weekly') {
  return `  <url>\n    <loc>${DOMAIN}${loc}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const urls = [];

// Static Pages
urls.push(createUrl('/', '1.0', 'daily'));
urls.push(createUrl('/recipes', '0.9', 'daily'));

// Category Pages
categories.forEach(cat => {
  const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  urls.push(createUrl(`/category/${slug}`, '0.8', 'weekly'));
});

// Cuisine Pages
cuisines.forEach(cuisine => {
  const slug = cuisine.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  urls.push(createUrl(`/cuisine/${slug}`, '0.8', 'weekly'));
});

// Recipe Pages
recipesList.forEach(recipe => {
  urls.push(createUrl(`/recipe/${recipe.slug}`, '0.9', 'monthly'));
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

fs.writeFileSync(SITEMAP_PATH, sitemap);

// Create robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml`;

fs.writeFileSync(path.join(__dirname, 'public', 'robots.txt'), robotsTxt);

console.log('Generated sitemap.xml and robots.txt successfully.');
