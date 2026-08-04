import { Apple, Dumbbell, Flame, Wheat } from "lucide-react";

export const defaultGoals = {
  calories: 2200,
  protein: 150,
  carbs: 260,
  fibre: 30,
};

export const macroStyles = {
  calories: { label: "Calories", color: "#ff7a45", icon: Flame, unit: "kcal" },
  protein: { label: "Protein", color: "#a77bf3", icon: Dumbbell, unit: "g" },
  carbs: { label: "Carbs", color: "#f2c94c", icon: Wheat, unit: "g" },
  fibre: { label: "Fibre", color: "#43d6a1", icon: Apple, unit: "g" },
};
