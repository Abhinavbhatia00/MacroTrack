export default function MacroDistribution({ totals }) {
  const macroCalories = totals.protein * 4 + totals.carbs * 4 + totals.fibre * 2;

  return (
    <article className="card p-6">
      <p className="eyebrow text-[#f2c94c]">Distribution</p>
      <h2 className="mt-1 text-xl font-semibold">Macro calories</h2>
      <div className="mt-7 rounded-2xl bg-white/[.03] p-5">
        <p className="text-4xl font-bold">{Math.round(macroCalories)}</p>
        <p className="text-sm text-white/35">calories from tracked macros</p>
      </div>
      <div className="mt-5 space-y-3">
        {["protein", "carbs", "fibre"].map((key) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="capitalize text-white/50">{key}</span>
            <span>{Math.round(totals[key])} g</span>
          </div>
        ))}
      </div>
    </article>
  );
}
