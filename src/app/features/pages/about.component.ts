import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-[var(--background)] min-h-screen">
      <!-- Hero Section -->
      <div class="relative h-[50vh] w-full">
        <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop" alt="About Foody Bhai Recipes" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gray-900/60"></div>
        <div class="absolute inset-0 flex items-center justify-center text-center">
          <div class="px-4">
            <h1 class="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">About Us</h1>
            <p class="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-sans">
              Discover the story behind India's most vibrant and trusted recipe platform.
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 class="text-3xl font-serif font-bold text-gray-900 mb-6">Our Story</h2>
            <div class="prose prose-lg font-sans text-gray-600">
              <p class="mb-4">
                What started as a simple passion for home cooking has blossomed into Foody Bhai Recipes, 
                a premium destination for food enthusiasts across India and the globe.
              </p>
              <p>
                We believe that cooking should not be a chore, but an experience—a way to connect with culture, family, and yourself. 
                Our team works tirelessly to bring you carefully curated, foolproof recipes that range from traditional Indian classics to modern global cuisine.
              </p>
            </div>
          </div>
          <div class="rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop" alt="Our Kitchen" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 mb-24">
          <h2 class="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">Why Choose Foody Bhai Recipes</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div class="w-16 h-16 bg-orange-100 text-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🌟</div>
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-sans">Premium Quality</h3>
              <p class="text-gray-600 font-sans">Every recipe is meticulously tested to ensure it works perfectly in your home kitchen.</p>
            </div>
            <div>
              <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🚀</div>
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-sans">Lightning Fast</h3>
              <p class="text-gray-600 font-sans">Built on modern web technologies, our platform delivers recipes instantly, with zero lag.</p>
            </div>
            <div>
              <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🌱</div>
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-sans">For Everyone</h3>
              <p class="text-gray-600 font-sans">From vegan delights to rich curries, we cater to all dietary preferences and skill levels.</p>
            </div>
          </div>
        </div>

        <div class="text-center mb-24">
          <h2 class="text-3xl font-serif font-bold text-gray-900 mb-12">By The Numbers</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="p-6">
              <div class="text-4xl font-bold text-[var(--primary)] mb-2">1,000+</div>
              <div class="text-gray-600 font-sans uppercase tracking-wider text-sm">Tested Recipes</div>
            </div>
            <div class="p-6">
              <div class="text-4xl font-bold text-[var(--primary)] mb-2">50+</div>
              <div class="text-gray-600 font-sans uppercase tracking-wider text-sm">Categories</div>
            </div>
            <div class="p-6">
              <div class="text-4xl font-bold text-[var(--primary)] mb-2">2M+</div>
              <div class="text-gray-600 font-sans uppercase tracking-wider text-sm">Monthly Visitors</div>
            </div>
            <div class="p-6">
              <div class="text-4xl font-bold text-[var(--primary)] mb-2">100%</div>
              <div class="text-gray-600 font-sans uppercase tracking-wider text-sm">Passion</div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="bg-[var(--accent)] rounded-3xl p-12 text-center text-white">
          <h2 class="text-3xl font-serif font-bold mb-6">Ready to start cooking?</h2>
          <p class="text-xl font-sans mb-10 max-w-2xl mx-auto opacity-90">
            Dive into our collection of recipes and transform your daily meals into extraordinary culinary experiences.
          </p>
          <a routerLink="/recipes" class="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-ui font-medium hover:bg-gray-100 transition-colors shadow-lg">
            Explore All Recipes
          </a>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}
