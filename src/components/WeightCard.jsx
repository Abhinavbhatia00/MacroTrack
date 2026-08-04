import { useState } from "react";

export default function WeightCard({ weights, onAdd }) {
  const [input, setInput] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!input) return;
    onAdd({
      id: crypto.randomUUID(),
      value: Number(input),
      date: new Date().toISOString().slice(0, 10),
    });
    setInput("");
  }

  return (
    <section id="weight" className="card p-5 sm:p-6">
      <p className="eyebrow text-[#a77bf3]">Body weight</p>
      <h2 className="mt-1 text-xl font-semibold">Daily check-in</h2>
      <div className="mt-5 rounded-2xl bg-[#a77bf3]/[.07] p-5">
        <p className="text-xs text-white/35">Latest weight</p>
        <p className="mt-2 text-4xl font-bold">
          {weights.at(-1)?.value || "—"}
          <span className="ml-2 text-sm font-normal text-white/35">kg</span>
        </p>
      </div>
      <form className="mt-4 flex gap-2" onSubmit={submit}>
        <input
          className="field"
          type="number"
          step="0.1"
          placeholder="Today's weight"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="rounded-xl bg-[#a77bf3] px-4 font-bold">Save</button>
      </form>
    </section>
  );
}
