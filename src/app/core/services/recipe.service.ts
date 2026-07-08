import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeSummary } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  
  // Using relative path for assets so it works in both dev and production SSG
  private dataUrl = '/data';

  getRecipesList(): Observable<RecipeSummary[]> {
    return this.http.get<RecipeSummary[]>(`${this.dataUrl}/recipes-list.json`);
  }

  getRecipeBySlug(slug: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.dataUrl}/recipes/${slug}.json`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.dataUrl}/categories.json`);
  }

  getCuisines(): Observable<string[]> {
    return this.http.get<string[]>(`${this.dataUrl}/cuisines.json`);
  }
}
