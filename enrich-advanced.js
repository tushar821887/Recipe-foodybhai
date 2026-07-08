const fs = require('fs');
const path = require('path');

const recipesDir = path.join(__dirname, 'public', 'data', 'recipes');

function enrichRecipeData(content) {
  const title = content.title;
  
  // Base totalTime on existing
  content.totalTime = content.preparationTime + content.cookingTime;
  
  // Random review count between 120 and 5000
  if (!content.reviewCount) {
    content.reviewCount = Math.floor(Math.random() * 4880) + 120;
  }

  // Ensure fiber, sugar, sodium, calcium
  if (content.nutrition) {
    content.nutrition.fiber = content.nutrition.fiber || Math.floor(Math.random() * 15) + 2;
    content.nutrition.sugar = content.nutrition.sugar || Math.floor(Math.random() * 20) + 1;
    content.nutrition.sodium = content.nutrition.sodium || Math.floor(Math.random() * 800) + 100;
    content.nutrition.calcium = content.nutrition.calcium || Math.floor(Math.random() * 200) + 20;
  }

  // Convert string steps to instructions array
  if (content.steps && (!content.instructions || content.instructions.length === 0)) {
    content.instructions = content.steps.map((stepDesc, index) => {
      let stepTitle = "Preparation";
      if (index === 0) stepTitle = "Prep Work";
      else if (index === content.steps.length - 1) stepTitle = "Finishing Touches";
      else stepTitle = "Cooking Process";
      
      return {
        stepNumber: index + 1,
        title: stepTitle,
        description: stepDesc,
        estimatedTime: `${Math.floor(Math.random() * 10) + 5} mins`
      };
    });
  }

  // Add cooking tips
  if (!content.cookingTips || content.cookingTips.length === 0) {
    content.cookingTips = [
      `For the best ${title}, always use fresh, high-quality ingredients.`,
      "Do not rush the cooking process; allow the flavors to meld naturally.",
      "Adjust the spices according to your personal taste preference."
    ];
  }

  // Add FAQ
  if (!content.faq || content.faq.length === 0) {
    content.faq = [
      {
        question: `Can I make ${title} ahead of time?`,
        answer: "Yes, you can prepare the ingredients in advance, but it's best served fresh."
      },
      {
        question: "How do I store the leftovers?",
        answer: "Store in an airtight container in the refrigerator for up to 3 days."
      },
      {
        question: "Can I freeze this dish?",
        answer: "It is generally not recommended to freeze this as it may alter the texture."
      }
    ];
  }

  // Add Related Recipes
  if (!content.relatedRecipes || content.relatedRecipes.length === 0) {
    // Generate some mock related recipes
    content.relatedRecipes = [
      {
        title: "Garlic Bread",
        slug: "garlic-bread",
        image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=400&auto=format&fit=crop"
      },
      {
        title: "Cold Coffee",
        slug: "cold-coffee",
        image: "https://images.unsplash.com/photo-1461023058943-07cb14a6edcb?q=80&w=400&auto=format&fit=crop"
      }
    ];
  }
  
  return content;
}

const files = fs.readdirSync(recipesDir);

files.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(recipesDir, file);
    let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    content = enrichRecipeData(content);
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`Enriched ${content.slug}`);
  }
});

console.log("Finished enriching all recipes with advanced fields.");
