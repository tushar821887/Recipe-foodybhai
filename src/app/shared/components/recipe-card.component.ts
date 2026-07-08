import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeSummary } from '../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden card-shadow hover-scale transition-all duration-300 group flex flex-col h-full border border-gray-100">
      <div class="relative h-60 overflow-hidden">
        <img [src]="recipe.thumbnail" [alt]="recipe.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-ui font-medium text-[var(--primary)] shadow-sm">
          ★ {{recipe.rating}}
        </div>
        <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-ui font-medium text-gray-700 shadow-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{recipe.time}} mins
        </div>
      </div>
      <div class="p-6 flex flex-col flex-grow">
        <div class="text-xs font-ui font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
          {{recipe.category}}
        </div>
        <h3 class="font-serif font-bold text-xl text-gray-900 mb-3 line-clamp-2">
          <a [routerLink]="['/recipe', recipe.slug]" class="hover:text-[var(--primary)] transition-colors">
            {{recipe.title}}
          </a>
        </h3>
        <div class="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
          <span class="text-sm text-gray-500 font-sans">{{recipe.cuisine}}</span>
          <span class="text-xs font-medium px-2 py-1 rounded-md" 
            [ngClass]="{
              'bg-green-100 text-green-700': recipe.difficulty === 'Easy',
              'bg-yellow-100 text-yellow-700': recipe.difficulty === 'Medium',
              'bg-red-100 text-red-700': recipe.difficulty === 'Hard'
            }">
            {{recipe.difficulty}}
          </span>
        </div>
      </div>
    </div>
  `
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: RecipeSummary;
}
