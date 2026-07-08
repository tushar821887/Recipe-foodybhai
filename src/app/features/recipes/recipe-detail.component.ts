import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { RecipeService } from '../../core/services/recipe.service';
import { Recipe } from '../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="recipe; else notFound">
      <div class="bg-[var(--background)] min-h-screen">
        <!-- Recipe Hero -->
        <div class="relative h-[60vh] w-full">
          <img [src]="recipe.image" [alt]="recipe.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          
          <div class="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-7xl mx-auto">
            <div class="flex gap-3 mb-4">
              <span class="bg-[var(--primary)] text-white px-3 py-1 rounded-full text-sm font-ui font-medium uppercase tracking-wider">
                {{recipe.category}}
              </span>
              <span class="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-ui font-medium uppercase tracking-wider">
                {{recipe.cuisine}}
              </span>
            </div>
            <h1 class="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">{{recipe.title}}</h1>
            <div class="flex flex-wrap items-center gap-6 font-sans text-gray-200">
              <div class="flex items-center gap-2">
                <span class="text-yellow-400">★</span> {{recipe.rating}} Rating ({{recipe.reviewCount}} reviews)
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{recipe.totalTime}} Mins Total
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {{recipe.servings}} Servings
              </div>
              <div class="flex items-center gap-2">
                <span class="font-bold">Difficulty:</span> {{recipe.difficulty}}
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <!-- Left Column (Ingredients & Steps) -->
            <div class="lg:col-span-2 space-y-12">
              
              <section class="prose prose-lg max-w-none font-sans text-gray-600">
                <p class="text-xl leading-relaxed">{{recipe.description}}</p>
              </section>

              <section class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 class="text-3xl font-serif font-bold text-gray-900 mb-6">Ingredients</h2>
                <ul class="space-y-4">
                  <li *ngFor="let item of recipe.ingredients" class="flex items-start gap-4">
                    <div class="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-[var(--primary)] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-700 font-sans">{{item}}</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 class="text-3xl font-serif font-bold text-gray-900 mb-8">Instructions</h2>
                <div class="space-y-8">
                  <div *ngFor="let step of recipe.instructions" class="flex gap-6">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--primary)] text-white font-ui font-bold text-xl flex items-center justify-center shadow-lg">
                      {{step.stepNumber}}
                    </div>
                    <div class="pt-2 w-full">
                      <div class="flex justify-between items-center mb-2">
                        <h4 class="text-xl font-bold text-gray-900 font-sans">{{step.title}}</h4>
                        <span class="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{{step.estimatedTime}}</span>
                      </div>
                      <p class="text-lg text-gray-700 font-sans leading-relaxed">{{step.description}}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section *ngIf="recipe.cookingTips?.length" class="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                <h2 class="text-2xl font-serif font-bold text-gray-900 mb-6">Chef's Cooking Tips</h2>
                <ul class="space-y-3">
                  <li *ngFor="let tip of recipe.cookingTips" class="flex items-start gap-3">
                    <span class="text-orange-500 mt-1">💡</span>
                    <span class="text-gray-700 font-sans">{{tip}}</span>
                  </li>
                </ul>
              </section>

              <section *ngIf="recipe.faq?.length">
                <h2 class="text-3xl font-serif font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div class="space-y-4">
                  <div *ngFor="let item of recipe.faq" class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 class="text-lg font-bold text-gray-900 mb-2 font-sans">{{item.question}}</h4>
                    <p class="text-gray-600 font-sans">{{item.answer}}</p>
                  </div>
                </div>
              </section>

            </div>

            <!-- Right Column (Sidebar) -->
            <div class="lg:col-span-1 space-y-8">
              <!-- Nutrition Widget -->
              <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <h3 class="text-2xl font-serif font-bold text-gray-900 mb-6">Nutrition Facts</h3>
                <div class="space-y-4">
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-gray-600 font-sans">Calories</span>
                    <span class="font-bold text-gray-900 font-sans">{{recipe.nutrition.calories}} kcal</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-gray-600 font-sans">Protein</span>
                    <span class="font-bold text-gray-900 font-sans">{{recipe.nutrition.protein}}g</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-gray-600 font-sans">Carbs</span>
                    <span class="font-bold text-gray-900 font-sans">{{recipe.nutrition.carbs}}g</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-gray-600 font-sans">Fat</span>
                    <span class="font-bold text-gray-900 font-sans">{{recipe.nutrition.fat}}g</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-gray-600 font-sans">Fiber</span>
                    <span class="font-bold text-gray-900 font-sans">{{recipe.nutrition.fiber}}g</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-gray-600 font-sans">Sugar</span>
                    <span class="font-bold text-gray-900 font-sans">{{recipe.nutrition.sugar}}g</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-gray-600 font-sans">Sodium</span>
                    <span class="font-bold text-gray-900 font-sans">{{recipe.nutrition.sodium}}mg</span>
                  </div>
                  <div class="flex justify-between items-center py-3">
                    <span class="text-gray-600 font-sans">Calcium</span>
                    <span class="font-bold text-gray-900 font-sans">{{recipe.nutrition.calcium}}mg</span>
                  </div>
                </div>
              </div>

              <!-- Related Recipes -->
              <div *ngIf="recipe.relatedRecipes?.length" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 class="font-serif font-bold text-xl mb-4">Related Recipes</h4>
                <div class="space-y-4">
                  <a *ngFor="let rel of recipe.relatedRecipes" [routerLink]="['/recipe', rel.slug]" class="flex items-center gap-4 group">
                    <img [src]="rel.image" [alt]="rel.title" class="w-16 h-16 rounded-lg object-cover group-hover:opacity-80 transition-opacity" />
                    <span class="font-medium font-sans text-gray-900 group-hover:text-[var(--primary)] transition-colors">{{rel.title}}</span>
                  </a>
                </div>
              </div>
              
              <!-- Share Widget -->
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h4 class="font-serif font-bold text-lg mb-4">Share this recipe</h4>
                <div class="flex justify-center gap-4">
                  <button class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">f</button>
                  <button class="w-10 h-10 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-200 transition-colors">t</button>
                  <button class="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors">p</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </ng-container>

    <ng-template #notFound>
      <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
          <h2 class="text-3xl font-serif font-bold text-gray-900 mb-4">Recipe not found</h2>
          <p class="text-gray-500 font-sans mb-8">We couldn't find the recipe you're looking for. It may have been removed or the URL is incorrect.</p>
          <a routerLink="/recipes" class="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-full font-ui font-medium hover:bg-[#E85D2A] transition-colors">
            Browse All Recipes
          </a>
        </div>
      </div>
    </ng-template>
  `
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private cdr = inject(ChangeDetectorRef);

  recipe: Recipe | null = null;
  loading = true;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        // Normalize slug to ensure it matches the files
        const normalizedSlug = slug.trim().toLowerCase();
        
        console.log(`[DEBUG] Fetching recipe with slug: ${normalizedSlug}`);
        
        this.recipeService.getRecipeBySlug(normalizedSlug).subscribe({
          next: (data) => {
            this.recipe = data;
            this.loading = false;
            this.updateSEO();
            // CRITICAL FIX: Force change detection to re-render the view with the loaded recipe
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error(`[DEBUG] Failed to load recipe ${normalizedSlug}:`, err);
            this.recipe = null;
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
      } else {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private updateSEO() {
    if (!this.recipe) return;
    
    this.titleService.setTitle(this.recipe.seoTitle);
    
    this.metaService.updateTag({ name: 'description', content: this.recipe.seoDescription });
    this.metaService.updateTag({ name: 'keywords', content: this.recipe.keywords.join(', ') });
    
    // OpenGraph
    this.metaService.updateTag({ property: 'og:title', content: this.recipe.seoTitle });
    this.metaService.updateTag({ property: 'og:description', content: this.recipe.seoDescription });
    this.metaService.updateTag({ property: 'og:image', content: this.recipe.image });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
    
    // Twitter
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: this.recipe.seoTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: this.recipe.seoDescription });
    this.metaService.updateTag({ name: 'twitter:image', content: this.recipe.image });
  }
}
