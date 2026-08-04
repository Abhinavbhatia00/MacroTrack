import { macroStyles } from "../constants/nutrition";

export default function MacroCard({ type, value, goal }) {
  const macro = macroStyles[type];
  const Icon = macro.icon;
  const percent = Math.min((value / goal) * 100, 100);

  return (
    <article className="card p-5">
      <div className="flex justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ color: macro.color, background: `${macro.color}18` }}>
          <Icon size={18} />
        </span>
        <span className="text-xs text-white/35">{Math.round(percent)}%</span>
      </div>
      <p className="mt-4 text-sm text-white/45">{macro.label}</p>
      <p className="mt-1 text-2xl font-bold">
        {Math.round(value)} <span className="text-sm font-normal text-white/30">/ {goal} {macro.unit}</span>
      </p>
      <div className="mt-4 h-1.5 rounded-full bg-white/[.07]">
        <div className="h-full rounded-full" style={{ width: `${percent}%`, background: macro.color }} />
      </div>
    </article>
  );
}
