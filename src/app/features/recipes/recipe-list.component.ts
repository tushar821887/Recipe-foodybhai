import { Component, inject, OnInit, signal, computed, ChangeDetectorRef, effect } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { RecipeService } from '../../core/services/recipe.service';
import { RecipeCardComponent } from '../../shared/components/recipe-card.component';
import { RecipeSummary } from '../../core/models/recipe.model';

const CATEGORY_INFO: Record<string, { desc: string, image: string }> = {
  'breakfast': { desc: 'Start your day right with these delicious and energizing breakfast recipes.', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=2000' },
  'desserts': { desc: 'Satisfy your sweet tooth with our collection of decadent desserts.', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2000' },
  'indian': { desc: 'Explore the rich, aromatic, and spicy flavors of authentic Indian cuisine.', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000' },
  'italian': { desc: 'From pasta to pizza, discover classic Italian comfort food.', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2000' },
  'healthy': { desc: 'Nourish your body with these wholesome, nutritious, and guilt-free recipes.', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000' },
  'snacks': { desc: 'Perfect bite-sized treats to keep you going throughout the day.', image: 'https://images.unsplash.com/photo-1621996316527-3199bcbf8f88?q=80&w=2000' },
  'dinner': { desc: 'End your day with these satisfying and comforting dinner recipes.', image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?q=80&w=2000' },
  'lunch': { desc: 'Quick, delicious, and filling recipes to power you through your afternoon.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000' },
  'drinks': { desc: 'Quench your thirst with our refreshing beverages, smoothies, and shakes.', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=2000' },
  'default': { desc: 'Browse through our collection of carefully crafted recipes to find your next favorite meal.', image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2000' }
};

const ALL_CATEGORIES = [
  { name: 'Breakfast', slug: 'breakfast' },
  { name: 'Lunch', slug: 'lunch' },
  { name: 'Dinner', slug: 'dinner' },
  { name: 'Snacks', slug: 'snacks' },
  { name: 'Desserts', slug: 'desserts' },
  { name: 'Drinks', slug: 'drinks' },
  { name: 'Indian', slug: 'indian' },
  { name: 'Healthy', slug: 'healthy' }
];

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RecipeCardComponent],
  template: `
    <div class="bg-[var(--background)] min-h-screen">
      
      <!-- Hero Section -->
      <div class="relative h-[45vh] w-full">
        <img [src]="heroImage()" alt="Hero background" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90"></div>
        
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <!-- Breadcrumb -->
          <nav class="text-sm font-sans font-medium text-gray-300 mb-6 uppercase tracking-wider flex items-center gap-2">
            <a routerLink="/" class="hover:text-white transition-colors">Home</a>
            <span class="text-gray-500">/</span>
            <span *ngIf="!category() && !cuisine()" class="text-white">All Recipes</span>
            <ng-container *ngIf="category()">
              <a routerLink="/recipes" class="hover:text-white transition-colors">Categories</a>
              <span class="text-gray-500">/</span>
              <span class="text-white">{{ title() }}</span>
            </ng-container>
            <ng-container *ngIf="cuisine()">
              <a routerLink="/recipes" class="hover:text-white transition-colors">Cuisines</a>
              <span class="text-gray-500">/</span>
              <span class="text-white">{{ title() }}</span>
            </ng-container>
          </nav>

          <h1 class="text-4xl md:text-6xl font-serif font-bold text-white mb-6 capitalize drop-shadow-lg tracking-tight">
            {{ title() }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-200 font-sans font-light max-w-3xl mx-auto drop-shadow-md mb-8">
            {{ description() }}
          </p>
          
          <div class="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-ui text-sm font-medium uppercase tracking-widest shadow-xl border border-white/30">
            {{ filteredRecipes().length }} Recipes Discovered
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <!-- Controls (Search) -->
        <div class="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="relative w-full md:w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search within {{ title() }}..." 
              class="w-full pl-14 pr-6 py-4 bg-gray-50 text-gray-700 font-sans focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white rounded-full transition-all border border-transparent focus:border-[var(--primary)]"
              [value]="searchQuery()"
              (input)="updateSearch($event)"
            >
          </div>
          
          <div class="text-gray-500 text-sm font-sans font-medium bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
            Showing {{ paginatedRecipes().length }} of {{ filteredRecipes().length }}
          </div>
        </div>

        <!-- Recipe Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <app-recipe-card *ngFor="let recipe of paginatedRecipes()" [recipe]="recipe" />
        </div>
        
        <!-- Empty State -->
        <div *ngIf="filteredRecipes().length === 0" class="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
          <div class="text-7xl mb-6">🍳</div>
          <h3 class="text-3xl font-serif font-bold text-gray-900 mb-4">No recipes found</h3>
          <p class="text-gray-500 font-sans text-xl mb-8 max-w-md mx-auto">We couldn't find any recipes matching your current search criteria.</p>
          <button (click)="clearSearch()" *ngIf="searchQuery()" class="bg-[var(--primary)] text-white px-8 py-4 rounded-full font-ui font-medium hover:bg-[#E85D2A] transition-colors shadow-lg">
            Clear Search
          </button>
          <a routerLink="/recipes" *ngIf="!searchQuery()" class="inline-block bg-[var(--primary)] text-white px-8 py-4 rounded-full font-ui font-medium hover:bg-[#E85D2A] transition-colors shadow-lg">
            View All Recipes
          </a>
        </div>

        <!-- Pagination -->
        <div *ngIf="totalPages() > 1" class="mt-16 flex justify-center">
          <div class="flex gap-2">
            <button 
              (click)="setPage(currentPage() - 1)" 
              [disabled]="currentPage() === 1"
              class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent">
              &larr;
            </button>
            
            <button 
              *ngFor="let p of getPageArray()"
              (click)="setPage(p)"
              [class.bg-[var(--primary)]]="currentPage() === p"
              [class.text-white]="currentPage() === p"
              [class.shadow-md]="currentPage() === p"
              [class.border-gray-200]="currentPage() !== p"
              [class.text-gray-700]="currentPage() !== p"
              [class.hover:bg-gray-50]="currentPage() !== p"
              class="w-12 h-12 flex items-center justify-center rounded-full border transition-colors font-ui font-medium text-lg">
              {{ p }}
            </button>

            <button 
              (click)="setPage(currentPage() + 1)" 
              [disabled]="currentPage() === totalPages()"
              class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent">
              &rarr;
            </button>
          </div>
        </div>

        <!-- Related Categories -->
        <div *ngIf="category() || cuisine()" class="mt-32 pt-16 border-t border-gray-100">
          <h2 class="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Explore Other Categories</h2>
          <div class="flex flex-wrap justify-center gap-4">
            <a *ngFor="let cat of getRelatedCategories()" [routerLink]="['/category', cat.slug]" 
               class="px-8 py-4 bg-white border border-gray-200 rounded-full text-gray-700 font-sans font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {{ cat.name }}
            </a>
          </div>
        </div>

      </div>
    </div>
  `
})
export class RecipeListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  private cdr = inject(ChangeDetectorRef);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  // State Signals
  allRecipes = signal<RecipeSummary[]>([]);
  category = signal<string | null>(null);
  cuisine = signal<string | null>(null);
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  itemsPerPage = 12;

  // Computed state
  normalizedCategory = computed(() => this.category() ? this.normalizeSlug(this.category()!) : null);
  normalizedCuisine = computed(() => this.cuisine() ? this.normalizeSlug(this.cuisine()!) : null);
  
  title = computed(() => {
    if (this.category()) return this.category()!.replace(/-/g, ' ');
    if (this.cuisine()) return this.cuisine()!.replace(/-/g, ' ') + ' Cuisine';
    return 'All Recipes';
  });

  description = computed(() => {
    const key = this.normalizedCategory() || this.normalizedCuisine() || 'default';
    return CATEGORY_INFO[key]?.desc || CATEGORY_INFO['default'].desc;
  });

  heroImage = computed(() => {
    const key = this.normalizedCategory() || this.normalizedCuisine() || 'default';
    return CATEGORY_INFO[key]?.image || CATEGORY_INFO['default'].image;
  });

  filteredRecipes = computed(() => {
    const recipes = this.allRecipes();
    const normCat = this.normalizedCategory();
    const normCuis = this.normalizedCuisine();
    const search = this.searchQuery().toLowerCase().trim();
    
    let filtered = recipes;
    
    // Exact case/space/hyphen-insensitive match for category/cuisine
    if (normCat) {
      filtered = filtered.filter(r => r.category && this.normalizeSlug(r.category) === normCat);
    } else if (normCuis) {
      filtered = filtered.filter(r => r.cuisine && this.normalizeSlug(r.cuisine) === normCuis);
    }

    if (search) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(search) || 
        (r.category && r.category.toLowerCase().includes(search))
      );
    }
    
    return filtered;
  });

  paginatedRecipes = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredRecipes().slice(startIndex, startIndex + this.itemsPerPage);
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredRecipes().length / this.itemsPerPage)));

  constructor() {
    // Reactively reset page when filters change
    effect(() => {
      this.category();
      this.cuisine();
      this.searchQuery();
      this.currentPage.set(1);
    }, { allowSignalWrites: true });
    
    // Reactively update SEO when category or cuisine changes
    effect(() => {
      this.updateSEO();
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category.set(params.get('category'));
      this.cuisine.set(params.get('cuisine'));
      
      this.recipeService.getRecipesList().subscribe({
        next: (recipes) => {
          this.allRecipes.set(recipes);
          this.cdr.detectChanges(); // Ensure hydration syncs correctly
        },
        error: (err) => console.error('Failed to fetch recipes:', err)
      });
    });
  }

  // Normalizes a string to ignore case, spaces, and hyphens completely
  private normalizeSlug(str: string): string {
    return str.toLowerCase().replace(/[\s-]/g, '');
  }

  updateSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      // Optional: scroll to top smoothly
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  getPageArray(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }

  getRelatedCategories() {
    const currentSlug = this.category();
    // Return 4 random categories excluding the current one
    return ALL_CATEGORIES
      .filter(c => c.slug !== currentSlug)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }

  private updateSEO() {
    const pageTitle = `${this.title().replace(/\b\w/g, l => l.toUpperCase())} Recipes - Foody Bhai`;
    const pageDesc = this.description();
    const url = `https://recipes.foodybhai.in${this.route.snapshot.url.join('/')}`;

    this.titleService.setTitle(pageTitle);
    
    this.metaService.updateTag({ name: 'description', content: pageDesc });
    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: pageDesc });
    this.metaService.updateTag({ property: 'og:image', content: this.heroImage() });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    // Canonical link
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);

    // Schema.org CollectionPage structured data
    let script: HTMLScriptElement | null = this.document.querySelector('#schema-collection');
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-collection';
      this.document.head.appendChild(script);
    }
    const schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageTitle,
      "description": pageDesc,
      "url": url,
      "image": this.heroImage(),
      "publisher": {
        "@type": "Organization",
        "name": "Foody Bhai Recipes",
        "logo": {
          "@type": "ImageObject",
          "url": "https://recipes.foodybhai.in/assets/logo.png"
        }
      }
    };
    script.text = JSON.stringify(schema);
  }
}
