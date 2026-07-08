import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { RecipeCardComponent } from '../../shared/components/recipe-card.component';
import { RecipeSummary } from '../../core/models/recipe.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RecipeCardComponent],
  template: `
    <!-- Hero Section -->
    <section class="relative bg-gray-900 text-white py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2000&auto=format&fit=crop" alt="Hero background" class="w-full h-full object-cover opacity-30" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-lg">
          Discover <span class="text-[var(--secondary)]">Luxury</span> <br/> Food Experiences
        </h1>
        <p class="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-sans font-light">
          India's fastest, most beautiful recipe platform. Explore over a thousand curated recipes for every occasion.
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto bg-white rounded-full p-2 flex items-center shadow-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search for recipes, ingredients, or cuisines..." class="w-full px-4 py-3 text-gray-700 font-sans focus:outline-none rounded-full">
          <button class="bg-[var(--primary)] text-white px-8 py-3 rounded-full font-ui font-medium hover:bg-[#E85D2A] transition-colors whitespace-nowrap">
            Search
          </button>
        </div>
      </div>
    </section>

    <!-- Popular Categories -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h2 class="text-3xl font-serif font-bold text-gray-900 mb-2">Explore by Category</h2>
            <p class="text-gray-500 font-sans">Find exactly what you're looking for</p>
          </div>
          <a routerLink="/categories" class="text-[var(--primary)] font-ui font-medium hover:underline hidden sm:block">View All Categories &rarr;</a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <a *ngFor="let cat of topCategories" [routerLink]="['/category', cat.slug]" class="group flex flex-col items-center text-center">
            <div class="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 border-4 border-white">
              <img [src]="cat.image" [alt]="cat.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 class="font-ui font-medium text-gray-900 group-hover:text-[var(--primary)] transition-colors">{{cat.name}}</h3>
          </a>
        </div>
      </div>
    </section>

    <!-- Trending Recipes -->
    <section class="py-20 bg-[var(--background)]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h2 class="text-3xl font-serif font-bold text-gray-900 mb-2">Trending Recipes</h2>
            <p class="text-gray-500 font-sans">Our most popular dishes this week</p>
          </div>
          <a routerLink="/recipes" class="text-[var(--primary)] font-ui font-medium hover:underline hidden sm:block">View All Recipes &rarr;</a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <app-recipe-card *ngFor="let recipe of trendingRecipes" [recipe]="recipe" />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-[var(--accent)]"></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 class="text-4xl font-serif font-bold mb-6">Never Miss a Recipe!</h2>
        <p class="text-xl mb-10 font-sans opacity-90">Join our community of thousands of food lovers and get our best recipes delivered weekly.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <input type="email" placeholder="Enter your email address" class="px-6 py-4 rounded-full text-gray-900 font-sans w-full sm:w-96 focus:outline-none shadow-lg">
          <button class="bg-gray-900 text-white px-8 py-4 rounded-full font-ui font-medium hover:bg-gray-800 transition-colors shadow-lg whitespace-nowrap">
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  private recipeService = inject(RecipeService);
  
  trendingRecipes: RecipeSummary[] = [];
  
  topCategories = [
    { name: 'Breakfast', slug: 'breakfast', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=400&auto=format&fit=crop' },
    { name: 'Healthy', slug: 'healthy-recipes', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop' },
    { name: 'Desserts', slug: 'desserts', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400&auto=format&fit=crop' },
    { name: 'Indian', slug: 'indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=400&auto=format&fit=crop' },
    { name: 'Italian', slug: 'italian', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&auto=format&fit=crop' },
    { name: 'Quick Meals', slug: 'quick-recipes', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop' },
  ];

  ngOnInit() {
    this.recipeService.getRecipesList().subscribe(recipes => {
      // Get 8 random recipes for trending
      this.trendingRecipes = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 8);
    });
  }
}
