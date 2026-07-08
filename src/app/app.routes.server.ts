import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Define how to fetch parameters for prerendering
function getPrerenderParamsForRecipes() {
  try {
    const dataPath = join(process.cwd(), 'public', 'data', 'recipes-list.json');
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    return data.map((recipe: any) => ({ slug: recipe.slug }));
  } catch (e) {
    console.error('Failed to load recipes for prerendering', e);
    return [];
  }
}

function getPrerenderParamsForCategories() {
  try {
    const dataPath = join(process.cwd(), 'public', 'data', 'categories.json');
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    return data.map((cat: string) => ({ category: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
  } catch (e) {
    return [];
  }
}

function getPrerenderParamsForCuisines() {
  try {
    const dataPath = join(process.cwd(), 'public', 'data', 'cuisines.json');
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    return data.map((cuisine: string) => ({ cuisine: cuisine.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
  } catch (e) {
    return [];
  }
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'recipe/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve(getPrerenderParamsForRecipes())
  },
  {
    path: 'category/:category',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve(getPrerenderParamsForCategories())
  },
  {
    path: 'cuisine/:cuisine',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve(getPrerenderParamsForCuisines())
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
