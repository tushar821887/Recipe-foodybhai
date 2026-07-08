import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-white pt-16 pb-8 border-t border-gray-100 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div class="col-span-1 md:col-span-1">
            <a routerLink="/" class="text-2xl font-serif font-bold text-[var(--primary)] flex items-center gap-2 mb-4">
              Foody Bhai
            </a>
            <p class="text-gray-500 font-sans mb-6">
              India's fastest, most beautiful recipe platform. Discover luxury food experiences every day.
            </p>
          </div>

          <div>
            <h4 class="font-serif font-bold text-lg mb-4">Quick Links</h4>
            <ul class="space-y-3 text-gray-500 font-sans">
              <li><a routerLink="/recipes" class="hover:text-[var(--primary)] transition-colors">All Recipes</a></li>
              <li><a routerLink="/categories" class="hover:text-[var(--primary)] transition-colors">Categories</a></li>
              <li><a routerLink="/about" class="hover:text-[var(--primary)] transition-colors">About Us</a></li>
              <li><a routerLink="/contact" class="hover:text-[var(--primary)] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-serif font-bold text-lg mb-4">Categories</h4>
            <ul class="space-y-3 text-gray-500 font-sans">
              <li><a routerLink="/category/healthy-recipes" class="hover:text-[var(--primary)] transition-colors">Healthy Recipes</a></li>
              <li><a routerLink="/category/quick-recipes" class="hover:text-[var(--primary)] transition-colors">Quick Meals</a></li>
              <li><a routerLink="/category/desserts" class="hover:text-[var(--primary)] transition-colors">Desserts</a></li>
              <li><a routerLink="/category/breakfast" class="hover:text-[var(--primary)] transition-colors">Breakfast</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-serif font-bold text-lg mb-4">Newsletter</h4>
            <p class="text-gray-500 font-sans mb-4">Get the latest recipes delivered to your inbox weekly.</p>
            <div class="flex">
              <input type="email" placeholder="Your email" class="bg-gray-50 border border-gray-200 px-4 py-2 rounded-l-lg w-full focus:outline-none focus:border-[var(--primary)] font-sans">
              <button class="bg-[var(--primary)] text-white px-4 py-2 rounded-r-lg hover:bg-[#E85D2A] transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>
        
        <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm font-sans">
          <p>&copy; 2026 Foody Bhai Recipes. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a routerLink="/privacy-policy" class="hover:text-gray-600">Privacy Policy</a>
            <a routerLink="/disclaimer" class="hover:text-gray-600">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
