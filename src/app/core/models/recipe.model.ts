export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  cuisine: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  servings: number;
  ingredients: string[];
  steps: string[];
  instructions: {
    stepNumber: number;
    title: string;
    description: string;
    estimatedTime: string;
  }[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    calcium: number;
  };
  cookingTips: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedRecipes: {
    title: string;
    slug: string;
    image: string;
  }[];
  image: string;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export interface RecipeSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  cuisine: string;
  difficulty: string;
  time: number;
  thumbnail: string;
  rating: number;
}

