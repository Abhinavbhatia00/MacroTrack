import { SlidersHorizontal } from "lucide-react";

export default function DashboardHeader({ onEditGoals }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm text-white/35">Here is your nutrition overview.</p>
        <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">Today&apos;s dashboard</h1>
      </div>
      <button onClick={onEditGoals} className="secondary-button flex items-center gap-2">
        <SlidersHorizontal size={17} />
        Edit targets
      </button>
    </div>
  );
}
