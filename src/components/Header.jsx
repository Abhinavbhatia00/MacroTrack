import { Activity, LogOut, UserRound } from "lucide-react";

export default function Header({ user, authReady, onLogin, onLogout }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[.06] bg-[#0d0f14]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-8">
        <a href="#dashboard" className="flex items-center gap-3 font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#43d6a1] text-[#0e1714]">
            <Activity />
          </span>
          Macro<span className="text-[#43d6a1]">Track</span>
        </a>

        <nav className="hidden gap-6 text-sm text-white/45 md:flex">
          <a href="#dashboard">Dashboard</a>
          <a href="#history">History</a>
          <a href="#weight">Weight</a>
        </nav>

        {!authReady && <div className="h-10 w-24 animate-pulse rounded-xl bg-white/[.06]" />}

        {authReady && user && (
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#43d6a1] font-bold text-black">
              {user.name.slice(0, 2).toUpperCase()}
            </span>
            <span className="hidden text-sm sm:block">{user.name}</span>
            <button className="icon-button" onClick={onLogout} aria-label="Log out">
              <LogOut size={18} />
            </button>
          </div>
        )}

        {authReady && !user && (
          <button onClick={onLogin} className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black">
            <UserRound size={17} />
            Log in
          </button>
        )}
      </div>
    </header>
  );
}
