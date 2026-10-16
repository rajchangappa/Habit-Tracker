import { Habit } from "./Habit";
import { useHabits } from "../context/HabitContext";

type HabitListProps = {
  visibleDates: Date[];
};

export const HabitsListContainer = ({ visibleDates }: HabitListProps) => {
  const { habits } = useHabits();
  if (habits.length === 0) {
    return (
      <p className="w-full py-12 text-center text-base text-zinc-400">
        Add a habit to get started.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 py-12 text-zinc-200">
      {habits.map((item) => {
        return <Habit key={item.id} habit={item} visibleDates={visibleDates} />;
      })}
    </div>
  );
};
