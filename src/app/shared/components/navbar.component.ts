import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sticky top-0 z-50 glassmorphism w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex-shrink-0 flex items-center">
            <a routerLink="/" class="text-2xl font-serif font-bold text-[var(--primary)] flex items-center gap-2">
              <span class="text-3xl">🍲</span>
              Foody Bhai Recipes
            </a>
          </div>
          
          <div class="hidden md:flex space-x-8 items-center font-ui text-[var(--text-color)] font-medium">
            <a routerLink="/" routerLinkActive="text-[var(--primary)]" [routerLinkActiveOptions]="{exact: true}" class="hover:text-[var(--primary)] transition-colors">Home</a>
            <a routerLink="/recipes" routerLinkActive="text-[var(--primary)]" class="hover:text-[var(--primary)] transition-colors">Recipes</a>
            <a routerLink="/categories" routerLinkActive="text-[var(--primary)]" class="hover:text-[var(--primary)] transition-colors">Categories</a>
            <a routerLink="/about" routerLinkActive="text-[var(--primary)]" class="hover:text-[var(--primary)] transition-colors">About</a>
          </div>

          <div class="flex items-center">
            <button class="bg-[var(--primary)] text-white px-6 py-2 rounded-full font-ui font-medium hover:bg-[#E85D2A] transition-colors shadow-lg hover-scale">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
