const fs = require('fs');
const path = require('path');

const RECIPE_COUNT = 100;
const DATA_DIR = path.join(__dirname, 'public', 'data');
const RECIPES_DIR = path.join(DATA_DIR, 'recipes');

// Ensure directories exist
[DATA_DIR, RECIPES_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Drinks', 'Healthy Recipes', 'Quick Recipes', 'Festival Recipes', 'Seasonal Recipes'];
const cuisines = ['Indian', 'Italian', 'Chinese', 'Mexican', 'American', 'Thai', 'Japanese'];
const difficulties = ['Easy', 'Medium', 'Hard'];

const titles = [
  "Paneer Butter Masala", "Chicken Tikka Masala", "Margherita Pizza", "Spaghetti Carbonara",
  "Pad Thai", "Sushi Rolls", "Tacos al Pastor", "Chocolate Lava Cake", "Caesar Salad", "Greek Salad",
  "Dal Makhani", "Chole Bhature", "Palak Paneer", "Biryani", "Masala Dosa", "Idli Sambar",
  "Butter Chicken", "Rogan Josh", "Mutton Biryani", "Fish Curry", "Prawn Masala", "Egg Curry",
  "Aloo Gobi", "Bhindi Masala", "Baingan Bharta", "Malai Kofta", "Kadai Paneer", "Matar Paneer",
  "Shahi Tukda", "Gulab Jamun", "Rasgulla", "Jalebi", "Gajar Ka Halwa", "Kheer", "Lassi",
  "Mango Lassi", "Masala Chai", "Cold Coffee", "Mojito", "Lemonade", "Pancakes", "Waffles",
  "French Toast", "Omelette", "Scrambled Eggs", "Avocado Toast", "Oatmeal", "Smoothie Bowl",
  "Burger", "Sandwich", "Wrap", "Shawarma", "Falafel", "Hummus", "Pita Bread", "Garlic Bread",
  "Bruschetta", "Spring Rolls", "Dumplings", "Noodles", "Fried Rice", "Manchurian", "Chilli Chicken",
  "Chicken 65", "Tandoori Chicken", "Seekh Kebab", "Reshmi Kebab", "Boti Kebab", "Kathi Roll",
  "Pav Bhaji", "Vada Pav", "Misal Pav", "Pani Puri", "Bhel Puri", "Sev Puri", "Dahi Puri",
  "Aloo Tikki", "Samosa", "Kachori", "Pakora", "Dhokla", "Khandvi", "Thepla", "Fafda",
  "Poha", "Upma", "Uttapam", "Pongal", "Bisi Bele Bath", "Pulihora", "Lemon Rice", "Curd Rice",
  "Tomato Rice", "Coconut Rice", "Tamarind Rice", "Veg Biryani", "Mushroom Biryani", "Paneer Biryani",
  "Chicken Fried Rice", "Egg Fried Rice", "Veg Noodles", "Hakka Noodles", "Chilli Paneer"
];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const allRecipes = [];

for (let i = 1; i <= RECIPE_COUNT; i++) {
  const title = (titles[i - 1] || `Delicious Recipe ${i}`);
  const slug = generateSlug(title);
  const category = getRandomItem(categories);
  const cuisine = getRandomItem(cuisines);
  
  const recipe = {
    id: `recipe_${i}`,
    slug: slug,
    title: title,
    description: `A delicious and authentic ${cuisine} ${category.toLowerCase()} dish that is sure to please your taste buds.`,
    category: category,
    cuisine: cuisine,
    difficulty: getRandomItem(difficulties),
    preparationTime: generateRandomNumber(10, 45),
    cookingTime: generateRandomNumber(15, 120),
    servings: generateRandomNumber(2, 8),
    ingredients: [
      "Ingredient 1 - 2 cups",
      "Ingredient 2 - 1 tbsp",
      "Ingredient 3 - to taste",
      "Ingredient 4 - 1/2 cup",
      "Ingredient 5 - 1 tsp"
    ],
    steps: [
      "Prepare all ingredients and chop them finely.",
      "Heat a pan over medium heat and add oil.",
      "Add the main ingredients and sauté until golden brown.",
      "Mix in the spices and let it simmer for a few minutes.",
      "Garnish and serve hot."
    ],
    nutrition: {
      calories: generateRandomNumber(200, 800),
      protein: generateRandomNumber(5, 40),
      carbs: generateRandomNumber(10, 80),
      fat: generateRandomNumber(5, 35)
    },
    image: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop`,
    thumbnail: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop`,
    rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
    seoTitle: `${title} Recipe - Best ${cuisine} ${category}`,
    seoDescription: `Learn how to make the best ${title} at home. Easy step-by-step instructions for this authentic ${cuisine} recipe.`,
    keywords: [title.toLowerCase(), cuisine.toLowerCase(), category.toLowerCase(), "recipe", "food", "cooking"]
  };

  allRecipes.push(recipe);
  fs.writeFileSync(path.join(RECIPES_DIR, `${slug}.json`), JSON.stringify(recipe, null, 2));
}

// Generate listing file
fs.writeFileSync(path.join(DATA_DIR, 'recipes-list.json'), JSON.stringify(allRecipes.map(r => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  category: r.category,
  cuisine: r.cuisine,
  difficulty: r.difficulty,
  time: r.preparationTime + r.cookingTime,
  thumbnail: r.thumbnail,
  rating: r.rating
})), null, 2));

// Generate Categories and Cuisines Data
fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(categories, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'cuisines.json'), JSON.stringify(cuisines, null, 2));

console.log(`Successfully generated ${RECIPE_COUNT} recipes in public/data/`);
