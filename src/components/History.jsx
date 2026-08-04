import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

function weekRange(offset) {
  const now = new Date(); now.setHours(12, 0, 0, 0);
  now.setDate(now.getDate() - ((now.getDay() + 6) % 7) + offset * 7);
  const end = new Date(now); end.setDate(end.getDate() + 6);
  return { start: now.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10), label: `${now.toLocaleDateString([], { month: "short", day: "numeric" })} – ${end.toLocaleDateString([], { month: "short", day: "numeric" })}` };
}

export default function History({ meals, weekOffset, setWeekOffset, onDelete }) {
  const week = weekRange(weekOffset);
  const rows = meals.filter((meal) => meal.date >= week.start && meal.date <= week.end).sort((a, b) => b.date.localeCompare(a.date));
  return <section id="history" className="card mt-6 scroll-mt-24 p-5 sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="eyebrow text-[#64a8ff]">History</p><h2 className="mt-1 text-xl font-semibold">Weekly food log</h2><p className="mt-1 text-xs text-white/30">{week.label}</p></div><div className="flex gap-2"><button onClick={() => setWeekOffset((v) => v - 1)} className="icon-button" aria-label="Previous week"><ChevronLeft /></button><button onClick={() => setWeekOffset(0)} className="secondary-button">Current week</button><button disabled={weekOffset === 0} onClick={() => setWeekOffset((v) => Math.min(v + 1, 0))} className="icon-button disabled:opacity-25" aria-label="Next week"><ChevronRight /></button></div></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="text-xs uppercase tracking-wider text-white/25"><tr><th>Date</th><th>Food</th><th>Meal</th><th>Quantity</th><th>Calories</th><th>Macros</th><th /></tr></thead><tbody>{rows.length ? rows.map((meal) => <tr key={meal.id} className="border-t border-white/[.06]"><td>{new Date(`${meal.date}T12:00:00`).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</td><td><span className="block text-white">{meal.name}</span><span className="text-xs text-white/25">{meal.time}</span></td><td>{meal.meal}</td><td>{meal.grams} g</td><td className="font-semibold text-[#ff7a45]">{Math.round(meal.nutrition.calories)} kcal</td><td>P {Math.round(meal.nutrition.protein)}g · C {Math.round(meal.nutrition.carbs)}g · F {Math.round(meal.nutrition.fibre)}g</td><td><button onClick={() => onDelete(meal.id)} className="icon-button text-red-400" aria-label={`Delete ${meal.name}`}><Trash2 size={16} /></button></td></tr>) : <tr><td colSpan="7" className="py-12 text-center">No meals logged this week.</td></tr>}</tbody></table></div></section>;
}
