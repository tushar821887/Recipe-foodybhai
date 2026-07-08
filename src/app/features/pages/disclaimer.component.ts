import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-[var(--background)] min-h-screen py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 text-center">Disclaimer</h1>
        
        <div class="prose prose-lg max-w-none font-sans text-gray-700">
          <p class="text-sm text-gray-500 mb-8 text-center">Last Updated: July 3, 2026</p>

          <p>The information provided by Foody Bhai Recipes ("we," "us," or "our") on recipes.foodybhai.in (the "Site") is for general informational and educational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">Recipe Accuracy Disclaimer</h2>
          <p>We strive to provide accurate and tested recipes. However, the outcome of any recipe you try from this website may vary due to factors such as your cooking skills, the specific brands of ingredients you use, variations in oven temperatures, altitude, and other variables. We are not responsible for any unfavorable outcomes resulting from the use of our recipes.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">Nutritional Information Disclaimer</h2>
          <p>Nutritional information provided on this Site is an estimate calculated using generic ingredients and third-party APIs. It should be used as a guideline only and should not be considered a substitute for professional medical or nutritional advice. If you require strict nutritional tracking, you should calculate the nutritional information using the exact ingredients and brands you personally use.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">Allergy & Dietary Disclaimer</h2>
          <p>It is the reader's sole responsibility to check the ingredients in any recipe to ensure they are safe for their personal consumption and dietary restrictions. We are not responsible for any allergic reactions or health issues that may arise from consuming food prepared based on our recipes.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">Medical Disclaimer</h2>
          <p>The content on this Site is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or dietary restrictions.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">External Links Disclaimer</h2>
          <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">Copyright Notice</h2>
          <p>Unless otherwise noted, all content, recipes, and photographs are the property of Foody Bhai Recipes. You may not republish our recipes or photographs without prior written consent. If you would like to share a recipe, please provide a direct link back to the specific recipe page on our website.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">Contact Information</h2>
          <p>If you have any questions or require more information about our site's disclaimer, please feel free to contact us by email at:</p>
          <p class="font-medium">Email: legal&#64;foodybhai.in</p>
        </div>
        
        <div class="mt-12 pt-8 border-t border-gray-200 text-center">
          <a routerLink="/" class="text-[var(--primary)] font-ui font-medium hover:underline">&larr; Back to Home</a>
        </div>
      </div>
    </div>
  `
})
export class DisclaimerComponent {}
