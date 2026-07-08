const fs = require('fs');
const path = require('path');

const recipesDir = path.join(__dirname, 'public', 'data', 'recipes');

const recipeData = {
  "paneer-butter-masala": {
    desc: "A rich and creamy North Indian curry made with paneer (cottage cheese) cooked in a tomato-onion gravy with butter and cream.",
    ingredients: ["500g Paneer cubes", "3 Tomatoes, pureed", "2 Onions, finely chopped", "2 tbsp Butter", "1/4 cup Heavy Cream", "1 tbsp Ginger-garlic paste", "1 tsp Garam masala", "1 tsp Kasuri methi", "Salt to taste"],
    steps: ["Heat butter in a pan and sauté onions until golden brown.", "Add ginger-garlic paste and tomato puree. Cook until oil separates.", "Add spices and salt. Stir well.", "Add paneer cubes and simmer for 5-7 minutes.", "Finish with heavy cream and crushed kasuri methi. Serve hot with naan or rice."]
  },
  "chicken-tikka-masala": {
    desc: "Roasted marinated chicken chunks in a spiced curry sauce, known for its vibrant orange color and rich flavor.",
    ingredients: ["500g Boneless Chicken", "1 cup Yogurt", "2 tbsp Tikka masala powder", "1 cup Tomato puree", "1 Onion, chopped", "1/2 cup Heavy cream", "2 tbsp Oil", "Coriander leaves for garnish"],
    steps: ["Marinate chicken with yogurt and half the tikka masala for 2 hours.", "Grill or pan-fry the chicken until cooked and slightly charred.", "In a separate pan, sauté onions, add remaining spices and tomato puree.", "Simmer the sauce until thick, then add the cooked chicken.", "Stir in cream and simmer for 3 minutes. Garnish with coriander."]
  },
  "margherita-pizza": {
    desc: "A classic Italian pizza featuring a perfectly baked crust topped with simple, fresh ingredients: tomato sauce, mozzarella cheese, and fresh basil.",
    ingredients: ["1 Pizza dough base", "1/2 cup Pizza sauce (tomato)", "200g Fresh Mozzarella, sliced", "Fresh Basil leaves", "1 tbsp Olive oil", "Pinch of salt and black pepper"],
    steps: ["Preheat oven to 250°C (480°F) or highest setting.", "Stretch the pizza dough on a floured surface.", "Spread an even layer of pizza sauce over the dough.", "Distribute mozzarella slices evenly and drizzle with olive oil.", "Bake for 10-12 minutes until crust is golden. Top with fresh basil before serving."]
  },
  "spaghetti-carbonara": {
    desc: "A traditional Roman pasta dish made with eggs, hard cheese, cured pork, and black pepper.",
    ingredients: ["400g Spaghetti", "150g Pancetta or Guanciale", "3 large Eggs", "1 cup Pecorino Romano, grated", "2 cloves Garlic", "Black pepper, freshly ground", "Salt"],
    steps: ["Boil pasta in salted water until al dente.", "Crisp the pancetta in a pan with garlic, then discard garlic.", "Whisk eggs and cheese in a bowl with a generous amount of black pepper.", "Drain pasta (reserve some water) and toss it in the pan with the pancetta off the heat.", "Quickly mix in the egg mixture, adding pasta water to create a creamy sauce. Serve immediately."]
  },
  "pad-thai": {
    desc: "A classic Thai stir-fried noodle dish with a sweet, savory, and tangy sauce, topped with crushed peanuts.",
    ingredients: ["200g Rice noodles", "150g Shrimp or Tofu", "2 Eggs", "1 cup Bean sprouts", "2 tbsp Pad Thai paste", "1 tbsp Fish sauce", "1/4 cup Crushed peanuts", "Lime wedges"],
    steps: ["Soak noodles in warm water until soft, then drain.", "Stir-fry shrimp or tofu in a wok until cooked, push to one side.", "Scramble eggs on the empty side of the wok.", "Add noodles, Pad Thai paste, and fish sauce. Toss everything together.", "Mix in bean sprouts and peanuts. Serve hot with a squeeze of lime."]
  },
  "sushi-rolls": {
    desc: "Traditional Japanese maki sushi made with vinegared rice and fresh ingredients wrapped in nori seaweed.",
    ingredients: ["2 cups Sushi rice, cooked", "1/4 cup Sushi vinegar", "4 Nori (seaweed) sheets", "100g Sashimi-grade salmon or tuna", "1 Cucumber, julienned", "1 Avocado, sliced", "Soy sauce and wasabi for serving"],
    steps: ["Season warm cooked rice with sushi vinegar and let it cool.", "Place a nori sheet on a bamboo mat and spread a thin layer of rice over it.", "Arrange fish, cucumber, and avocado in a line across the bottom third of the rice.", "Roll the sushi tightly using the bamboo mat.", "Slice into 6-8 pieces with a wet, sharp knife. Serve with soy sauce."]
  },
  "tacos-al-pastor": {
    desc: "Authentic Mexican street tacos filled with marinated pork, pineapple, onions, and cilantro.",
    ingredients: ["500g Pork shoulder, thinly sliced", "Al Pastor marinade (chiles, achiote, vinegar)", "1 cup Pineapple chunks", "Small corn tortillas", "1 Onion, finely chopped", "Fresh cilantro", "Lime wedges"],
    steps: ["Marinate the pork slices in Al Pastor marinade overnight.", "Cook the marinated pork in a hot skillet until caramelized and cooked through.", "Grill the pineapple chunks until slightly charred, then chop.", "Warm the corn tortillas on a griddle.", "Assemble tacos with pork, pineapple, onion, and cilantro. Serve with lime."]
  },
  "chocolate-lava-cake": {
    desc: "A decadent chocolate dessert with a firm cake exterior and a warm, gooey, molten chocolate center.",
    ingredients: ["150g Dark chocolate (70%)", "100g Butter", "3 Eggs", "1/2 cup Sugar", "1/4 cup All-purpose flour", "1 tsp Vanilla extract", "Pinch of salt"],
    steps: ["Preheat oven to 200°C (400°F). Butter and lightly flour ramekins.", "Melt chocolate and butter together in a double boiler until smooth.", "Whisk eggs, sugar, and vanilla in a bowl until thick and pale.", "Fold the melted chocolate into the egg mixture, then gently fold in the flour and salt.", "Divide batter into ramekins and bake for exactly 10-12 minutes. Invert onto a plate and serve warm."]
  },
  "caesar-salad": {
    desc: "A crisp Romaine lettuce salad tossed with a classic creamy Caesar dressing, croutons, and Parmesan.",
    ingredients: ["1 large head Romaine lettuce", "1 cup Croutons", "1/3 cup Parmesan cheese, shaved", "1/4 cup Caesar dressing", "1 tbsp Lemon juice", "Fresh black pepper"],
    steps: ["Wash, dry, and tear the Romaine lettuce into bite-sized pieces.", "In a large bowl, toss the lettuce with Caesar dressing to coat evenly.", "Add croutons and half of the Parmesan cheese, gently tossing again.", "Transfer to a serving bowl.", "Top with remaining Parmesan, a squeeze of lemon juice, and black pepper."]
  },
  "greek-salad": {
    desc: "A refreshing and healthy Mediterranean salad featuring tomatoes, cucumbers, Kalamata olives, and feta cheese.",
    ingredients: ["3 Tomatoes, chopped", "1 Cucumber, sliced", "1 Red onion, thinly sliced", "1/2 cup Kalamata olives", "150g Feta cheese block", "3 tbsp Extra virgin olive oil", "1 tsp Dried oregano"],
    steps: ["Combine tomatoes, cucumber, red onion, and olives in a shallow bowl.", "Drizzle generously with extra virgin olive oil.", "Sprinkle dried oregano and a pinch of salt over the vegetables.", "Place the block of feta cheese right on top of the salad.", "Serve immediately as a fresh appetizer or side dish."]
  },
  "dal-makhani": {
    desc: "A slow-cooked, rich and creamy lentil dish from Punjab, made with black lentils and kidney beans.",
    ingredients: ["1 cup Whole black lentils (Urad dal)", "1/4 cup Kidney beans (Rajma)", "1/2 cup Tomato puree", "1/4 cup Heavy cream", "3 tbsp Butter", "1 tbsp Ginger-garlic paste", "1 tsp Garam masala"],
    steps: ["Soak lentils and kidney beans overnight, then pressure cook until very soft.", "Heat butter in a pan, add ginger-garlic paste and sauté for a minute.", "Add tomato puree and cook until the raw smell disappears.", "Mash the cooked lentils slightly, add to the pan, and simmer on low heat for 30-40 minutes.", "Stir in cream and garam masala. Serve hot with naan or rice."]
  },
  "chole-bhature": {
    desc: "A classic North Indian dish featuring spicy chickpea curry served with deep-fried, fluffy bread.",
    ingredients: ["1 cup Chickpeas (Kabuli chana), soaked overnight", "2 Onions, finely chopped", "2 Tomatoes, pureed", "2 tbsp Chole masala", "2 cups All-purpose flour (for Bhature)", "1/4 cup Yogurt (for Bhature)", "Oil for deep frying"],
    steps: ["Pressure cook chickpeas until tender.", "Prepare bhature dough by mixing flour, yogurt, and a pinch of salt. Let it rest.", "For chole: sauté onions until brown, add tomato puree and chole masala, cook well.", "Add boiled chickpeas to the masala and simmer until the gravy thickens.", "Roll dough into discs and deep fry in hot oil until puffed. Serve hot with chole."]
  },
  "palak-paneer": {
    desc: "A popular Indian vegetarian dish consisting of paneer in a thick paste made from puréed spinach.",
    ingredients: ["500g Spinach (Palak), washed and blanched", "250g Paneer, cubed", "1 Onion, finely chopped", "1 Tomato, chopped", "1 tbsp Garlic, minced", "1 tsp Cumin seeds", "2 tbsp Fresh cream"],
    steps: ["Blend the blanched spinach into a smooth puree.", "Heat oil/ghee, temper with cumin seeds, and sauté minced garlic and onions.", "Add tomatoes and cook until soft and mushy.", "Stir in the spinach puree and simmer for 5 minutes.", "Add paneer cubes, mix gently, finish with fresh cream and serve."]
  },
  "biryani": {
    desc: "A royal and aromatic mixed rice dish made with Indian spices, basmati rice, and marinated meat or vegetables.",
    ingredients: ["2 cups Basmati rice, soaked", "500g Chicken/Mutton or Mixed Veggies", "1 cup Yogurt", "2 tbsp Biryani masala", "3 Onions, thinly sliced and fried (Birista)", "Pinch of Saffron soaked in milk", "Whole spices (cardamom, cloves, bay leaf)"],
    steps: ["Marinate the meat/veggies with yogurt, biryani masala, and half the fried onions.", "Parboil the rice with whole spices until 70% cooked. Drain water.", "In a heavy-bottomed pot, layer the marinated mix at the bottom.", "Top with the parboiled rice, drizzle saffron milk, and remaining fried onions.", "Seal the pot and cook on Dum (very low heat) for 20-30 minutes."]
  }
};

function generateGenericRecipe(slug, title, category) {
  const catLow = (category || '').toLowerCase();
  const titleLow = (title || '').toLowerCase();
  const isDessert = catLow.includes('dessert') || titleLow.includes('cake') || titleLow.includes('sweet');
  const isDrink = catLow.includes('drink') || titleLow.includes('lassi') || titleLow.includes('coffee') || titleLow.includes('mojito');
  
  if (isDrink) {
    return {
      desc: `A refreshing and delicious ${title} perfect for any time of the day.`,
      ingredients: ["2 cups Base liquid (milk/water/soda)", "2 tbsp Sweetener (sugar/honey)", "Ice cubes", "Flavoring extract or fresh fruits", "Garnish (mint/nuts)"],
      steps: ["Prepare your base ingredients and chill them.", "Combine the liquid base and flavoring in a blender or shaker.", "Blend or shake well until fully mixed and frothy.", "Pour into a tall glass over ice cubes.", "Garnish appropriately and serve immediately."]
    };
  }
  
  if (isDessert) {
    return {
      desc: `A delightful and sweet ${title} to perfectly complete your meal.`,
      ingredients: ["1 cup Flour or Base ingredient", "1/2 cup Sugar", "1/4 cup Butter or Ghee", "Flavoring (vanilla/cardamom)", "Nuts for garnish"],
      steps: ["Gather all ingredients and measure them accurately.", "Mix the base ingredients together until a smooth consistency is reached.", "Cook or bake according to standard dessert techniques until done.", "Allow to cool slightly before the final assembly.", "Garnish beautifully and serve as a sweet treat."]
    };
  }
  
  return {
    desc: `A delicious and authentic ${title} that brings out the best flavors of ${category || 'its'} cuisine.`,
    ingredients: ["500g Main ingredient (vegetable/meat/paneer)", "2 Onions, finely chopped", "2 Tomatoes, diced", "1 tbsp Ginger-garlic paste", "2 tbsp Cooking oil or ghee", "Spices (cumin, coriander, turmeric, salt)", "Fresh herbs for garnish"],
    steps: ["Prepare all ingredients by washing, peeling, and chopping as needed.", "Heat oil in a heavy-bottomed pan or skillet over medium heat.", "Sauté the aromatics (onions, ginger, garlic) until golden and fragrant.", "Add the main ingredients and spices, cooking until everything is well combined and fully cooked.", "Garnish with fresh herbs and serve hot."]
  };
}

const files = fs.readdirSync(recipesDir);

files.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(recipesDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const slug = content.slug;
    const title = content.title;
    const category = content.category;
    
    const data = recipeData[slug] || generateGenericRecipe(slug, title, category);
    
    content.description = data.desc;
    content.ingredients = data.ingredients;
    content.steps = data.steps;
    
    // Update SEO dynamically based on real data
    content.seoDescription = `Learn how to make the best ${title} at home. ${data.desc}`;
    
    // Make sure we keep the keywords relevant
    if (content.keywords && !content.keywords.includes(title.toLowerCase())) {
        content.keywords.unshift(title.toLowerCase());
    }
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`Updated ${slug}`);
  }
});

console.log("Finished updating all recipes.");
