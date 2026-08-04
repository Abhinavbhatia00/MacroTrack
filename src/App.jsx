import { useMemo, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import DashboardOverview from "./components/DashboardOverview";
import FoodForm from "./components/FoodForm";
import GoalsModal from "./components/GoalsModal";
import Header from "./components/Header";
import History from "./components/History";
import LoginModal from "./components/LoginModal";
import MacroGrid from "./components/MacroGrid";
import { defaultGoals } from "./constants/nutrition";
import useAuth from "./hooks/useAuth";
import useStoredState from "./hooks/useStoredState";

export default function App() {
  const [meals, setMeals] = useStoredState("macrotrack-meals", []);
  const [weights, setWeights] = useStoredState("macrotrack-weights", []);
  const [goals, setGoals] = useStoredState("macrotrack-goals", defaultGoals);
  const [loginOpen, setLoginOpen] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const { user, authReady, logout } = useAuth();

  const today = new Date().toISOString().slice(0, 10);
  const totals = useMemo(() => {
    const todayMeals = meals.filter((meal) => meal.date === today);
    return todayMeals.reduce(
      (sum, meal) => ({
        calories: sum.calories + Number(meal.nutrition.calories || 0),
        protein: sum.protein + Number(meal.nutrition.protein || 0),
        carbs: sum.carbs + Number(meal.nutrition.carbs || 0),
        fibre: sum.fibre + Number(meal.nutrition.fibre || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fibre: 0 },
    );
  }, [meals, today]);

  return (
    <main className="min-h-screen bg-[#0d0f14] text-white">
      <Header user={user} authReady={authReady} onLogin={() => setLoginOpen(true)} onLogout={logout} />

      <div id="dashboard" className="mx-auto max-w-[1440px] scroll-mt-24 p-4 sm:p-8">
        <DashboardHeader onEditGoals={() => setGoalsOpen(true)} />
        <MacroGrid totals={totals} goals={goals} />

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_.85fr]">
          <DashboardOverview
            totals={totals}
            goals={goals}
            weights={weights}
            onAddWeight={(entry) => setWeights([...weights, entry])}
          />
          <FoodForm onAdd={(meal) => setMeals([meal, ...meals])} />
        </section>

        <History
          meals={meals}
          weekOffset={weekOffset}
          setWeekOffset={setWeekOffset}
          onDelete={(id) => setMeals(meals.filter((meal) => meal.id !== id))}
        />
      </div>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      {goalsOpen && (
        <GoalsModal
          goals={goals}
          onClose={() => setGoalsOpen(false)}
          onSave={(newGoals) => {
            setGoals(newGoals);
            setGoalsOpen(false);
          }}
        />
      )}
    </main>
  );
}
