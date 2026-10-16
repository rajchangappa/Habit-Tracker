import { format, isToday } from "date-fns";
import { useHabits } from "../context/HabitContext";
import { Button } from "./Button";

type HeaderProps = {
  visibleDates: Date[];
  onPrevious: () => void;
  onNext: () => void;
};

const Header = ({ visibleDates, onPrevious, onNext }: HeaderProps) => {
  const { habits } = useHabits();

  const doneToday = habits.filter((habit) =>
    habit.completions.some((c) => isToday(c)),
  ).length;

  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`;

  return (
    <header className="w-full flex items-center justify-between mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-inherit">Habit Tracker</h1>
        <span className="text-sm text-zinc-400 font-medium">
          {doneToday} / {habits.length} done today
        </span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-sm text-zinc-400 font-medium">{dateRange}</span>
        <div className="flex items-center gap-1.5">
          <Button
            onClick={onPrevious}
            className="text-sm bg-zinc-800 py-1.5 px-3 hover:bg-zinc-700"
          >
            Prev
          </Button>
          <Button
            onClick={onNext}
            disabled={visibleDates.some((date) => isToday(date))}
            className="text-sm bg-zinc-800 py-1.5 px-3 hover:bg-zinc-700"
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
