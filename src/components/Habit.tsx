import { useHabits, type HabitData } from "../context/HabitContext";
import { Button } from "./Button";
import { format, isFuture, isSameDay, subDays } from "date-fns";

type HabitProps = {
  habit: HabitData;
  visibleDates: Date[];
};

export const Habit = ({ habit, visibleDates }: HabitProps) => {
  const { deleteHabit, toggleHabit } = useHabits();

  const streak = setStreak(habit.completions);

  return (
    <div className="w-full flex flex-col gap-2 rounded-xl bg-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-medium text-xl">{habit.name}</span>
          {streak !== 0 ? (
            <span className="text-sm text-amber-500">🔥 {streak}</span>
          ) : undefined}
        </div>
        <Button variant="ghost" onClick={() => deleteHabit(habit.id)}>
          Delete
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {visibleDates.map((date) => {
          return (
            <Button
              key={date.toISOString()}
              disabled={isFuture(date)}
              onClick={() => toggleHabit(habit.id, date)}
              variant={
                habit.completions.some((d) => isSameDay(d, date))
                  ? "primary"
                  : "secondary"
              }
              className="flex flex-1 flex-col items-center rounded-xl gap-0.5"
            >
              <span className="font-medium">{format(date, "EEE")}</span>
              <span>{format(date, "d")}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

function setStreak(completions: Date[]) {
  let streak = 0;
  let date = new Date();

  while (completions.some((completion) => isSameDay(completion, date))) {
    streak++;
    date = subDays(date, 1);
  }
  return streak;
}
