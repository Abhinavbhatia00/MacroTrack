import { useState } from "react";
import { X } from "lucide-react";

export default function GoalsModal({ goals, onSave, onClose }) {
  const [draft, setDraft] = useState(goals);
  const labels = { calories: "Calories (kcal)", protein: "Protein (g)", carbs: "Carbs (g)", fibre: "Fibre (g)" };
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm"><form onSubmit={(e) => { e.preventDefault(); onSave(Object.fromEntries(Object.entries(draft).map(([k, v]) => [k, Number(v)]))); }} className="card w-full max-w-lg p-6 sm:p-8"><div className="flex justify-between"><div><p className="eyebrow text-[#f2c94c]">Personal targets</p><h2 className="mt-2 text-3xl font-semibold">Set daily goals.</h2></div><button type="button" onClick={onClose} className="icon-button"><X /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{Object.entries(labels).map(([key, label]) => <label key={key} className="field-label">{label}<input className="field" type="number" min="1" value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} /></label>)}</div><button className="mt-6 h-12 w-full rounded-xl bg-[#43d6a1] font-bold text-[#0d1714]">Save targets</button></form></div>;
}
