import CalorieBalance from "./CalorieBalance";
import MacroDistribution from "./MacroDistribution";
import WeightCard from "./WeightCard";

export default function DashboardOverview({ totals, goals, weights, onAddWeight }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <CalorieBalance consumed={totals.calories} goal={goals.calories} />
      <MacroDistribution totals={totals} />
      <div className="md:col-span-2">
        <WeightCard weights={weights} onAdd={onAddWeight} />
      </div>
    </div>
  );
}
