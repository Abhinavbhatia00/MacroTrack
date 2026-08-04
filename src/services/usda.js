const nutrients = { calories: [1008, 2047, 2048], protein: [1003], carbs: [1005], fibre: [1079] };

function value(food, ids) {
  return Number(food.foodNutrients?.find((item) => ids.includes(Number(item.nutrientId)))?.value || 0);
}

export async function searchFoods(query) {
  const key = import.meta.env.VITE_USDA_API_KEY || "DEMO_KEY";
  const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, pageSize: 12, dataType: ["Foundation", "SR Legacy", "Survey (FNDDS)"] }),
  });
  if (!response.ok) throw new Error("USDA food search is unavailable.");
  const data = await response.json();
  return (data.foods || []).map((food) => ({
    id: food.fdcId,
    name: food.description,
    category: food.foodCategory || food.dataType,
    calories: value(food, nutrients.calories),
    protein: value(food, nutrients.protein),
    carbs: value(food, nutrients.carbs),
    fibre: value(food, nutrients.fibre),
  })).filter((food) => food.calories || food.protein || food.carbs || food.fibre);
}
