import { useEffect, useMemo, useState } from "react";
import { ChevronDown, LoaderCircle, Search } from "lucide-react";
import { searchFoods } from "../services/usda";

const colors = {
  calories: "#ff7a45",
  protein: "#a77bf3",
  carbs: "#f2c94c",
  fibre: "#43d6a1",
};

export default function FoodForm({ onAdd }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [grams, setGrams] = useState(100);
  const [meal, setMeal] = useState("Breakfast");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim().length < 2 || selected?.name === query) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        setResults(await searchFoods(query.trim()));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [query, selected]);

  const nutrition = useMemo(() => {
    const factor = Number(grams || 0) / 100;

    return Object.fromEntries(
      Object.keys(colors).map((key) => [
        key,
        Number(((selected?.[key] || 0) * factor).toFixed(1)),
      ]),
    );
  }, [selected, grams]);

  function submit(event) {
    event.preventDefault();

    if (!selected) {
      setError("Select a food from the search results.");
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      fdcId: selected.id,
      name: selected.name,
      grams: Number(grams),
      meal,
      nutrition,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    });

    setQuery("");
    setSelected(null);
    setResults([]);
    setGrams(100);
  }

  return (
    <section className="card p-5 sm:p-6">
      <p className="eyebrow text-[#43d6a1]">USDA food search</p>
      <h2 className="mt-1 text-xl font-semibold">Log your food</h2>

      <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="field-label relative sm:col-span-2">
          Food item
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/25"
            />
            <input
              className="field !pl-11 !pr-11"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelected(null);
                setResults([]);
              }}
              placeholder="Search cooked rice, eggs, banana…"
            />
            {loading && (
              <span className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#43d6a1]">
                <LoaderCircle size={18} className="animate-spin" />
              </span>
            )}
          </div>
          {results.length > 0 && (
            <div className="absolute left-0 right-0 top-[72px] z-20 max-h-64 overflow-auto rounded-xl border border-white/10 bg-[#111319] p-2 shadow-2xl">
              {results.map((food) => (
                <button
                  type="button"
                  key={food.id}
                  onClick={() => {
                    setSelected(food);
                    setQuery(food.name);
                    setResults([]);
                  }}
                  className="block w-full rounded-lg p-3 text-left hover:bg-white/[.06]"
                >
                  <span className="block text-sm text-white">{food.name}</span>
                  <span className="text-xs text-white/35">
                    {Math.round(food.calories)} kcal per 100 g · {food.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </label>

        {error && (
          <p className="text-sm text-[#ff8c72] sm:col-span-2">{error}</p>
        )}

        <label className="field-label">
          Quantity (g)
          <input
            className="field"
            type="number"
            min="1"
            value={grams}
            onChange={(event) => setGrams(event.target.value)}
          />
        </label>

        <label className="field-label">
          Meal
          <div className="relative">
            <select
              className="field appearance-none !pr-12"
              value={meal}
              onChange={(event) => setMeal(event.target.value)}
            >
              {["Breakfast", "Lunch", "Snack", "Dinner"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-white/70"
            />
          </div>
        </label>

        <div className="grid grid-cols-4 gap-2 rounded-xl bg-white/[.03] p-3 text-center sm:col-span-2">
          {Object.entries(nutrition).map(([key, value]) => (
            <div key={key}>
              <p className="font-semibold" style={{ color: colors[key] }}>
                {Math.round(value)}
              </p>
              <p className="text-[10px] capitalize text-white/35">{key}</p>
            </div>
          ))}
        </div>

        <button
          disabled={!selected}
          className="h-12 rounded-xl bg-[#43d6a1] font-bold text-[#0d1714] disabled:opacity-35 sm:col-span-2"
        >
          Add to today
        </button>
      </form>
    </section>
  );
}
