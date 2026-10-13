import { Button } from "./Button";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-inherit">Habit Tracker</h1>
        <span className="text-sm text-zinc-400 font-medium">
          1 / 1 done today
        </span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-sm text-zinc-400 font-medium">
          Oct 15 - Oct 16
        </span>
        <div className="flex items-center gap-3">
          <Button>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
