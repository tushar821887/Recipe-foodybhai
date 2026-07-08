import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Foody Bhai Recipes - Luxury Food Experiences'
  },
  {
    path: 'recipes',
    loadComponent: () => import('./features/recipes/recipe-list.component').then(m => m.RecipeListComponent),
    title: 'All Recipes - Foody Bhai'
  },
  {
    path: 'category/:category',
    loadComponent: () => import('./features/recipes/recipe-list.component').then(m => m.RecipeListComponent)
  },
  {
    path: 'cuisine/:cuisine',
    loadComponent: () => import('./features/recipes/recipe-list.component').then(m => m.RecipeListComponent)
  },
  {
    path: 'recipe/:slug',
    loadComponent: () => import('./features/recipes/recipe-detail.component').then(m => m.RecipeDetailComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/pages/about.component').then(m => m.AboutComponent),
    title: 'About Us - Foody Bhai Recipes'
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./features/pages/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    title: 'Privacy Policy - Foody Bhai Recipes'
  },
  {
    path: 'disclaimer',
    loadComponent: () => import('./features/pages/disclaimer.component').then(m => m.DisclaimerComponent),
    title: 'Disclaimer - Foody Bhai Recipes'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
