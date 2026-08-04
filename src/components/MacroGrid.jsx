import MacroCard from "./MacroCard";
import { macroStyles } from "../constants/nutrition";

export default function MacroGrid({ totals, goals }) {
  return (
    <section className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {Object.keys(macroStyles).map((type) => (
        <MacroCard key={type} type={type} value={totals[type]} goal={goals[type]} />
      ))}
    </section>
  );
}
