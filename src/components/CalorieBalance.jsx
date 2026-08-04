export default function CalorieBalance({ consumed, goal }) {
  const percent = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);

  return (
    <article className="card p-6">
      <p className="eyebrow text-[#ff7a45]">Energy balance</p>
      <h2 className="mt-1 text-xl font-semibold">Calories left</h2>
      <div
        className="mx-auto mt-7 grid h-44 w-44 place-items-center rounded-full"
        style={{ background: `conic-gradient(#ff7a45 ${percent}%, #252a34 0)` }}
      >
        <div className="grid h-36 w-36 place-items-center rounded-full bg-[#171a21] text-center">
          <div>
            <p className="text-3xl font-bold">{Math.round(remaining)}</p>
            <p className="text-xs text-white/35">kcal remaining</p>
          </div>
        </div>
      </div>
    </article>
  );
}
