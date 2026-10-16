import { type ReactNode } from "react";
import { isSameDay } from "date-fns";
import { HabitContext, type HabitData } from "./HabitContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

type HabitProviderProps = {
  children: ReactNode;
};

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<HabitData[]>(
    "Habits",
    [],
    deserializeHabits,
  );

  function addNewHabit(name: string) {
    setHabits((currentHabits) => [
      ...currentHabits,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  }

  function deleteHabit(habitId: string) {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== habitId),
    );
  }

  function toggleHabit(habitId: string, selectedDate: Date) {
    // The updater receives the latest state, so rapid clicks cannot use stale data.
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id !== habitId) return habit;

        // Compare calendar days rather than timestamps, which can include different times.
        const isCompleted = habit.completions.some((completionDate) =>
          isSameDay(completionDate, selectedDate),
        );
        const updatedCompletions = isCompleted
          ? habit.completions.filter(
              (completionDate) => !isSameDay(completionDate, selectedDate),
            )
          : [...habit.completions, selectedDate];

        return { ...habit, completions: updatedCompletions };
      }),
    );
  }

  return (
    <HabitContext value={{ habits, addNewHabit, toggleHabit, deleteHabit }}>
      {children}
    </HabitContext>
  );
}

function deserializeHabits(serializedHabits: string): HabitData[] {
  // Browser data is untyped, so validate it before treating it as HabitData.
  const parsedHabits: unknown = JSON.parse(serializedHabits);

  if (!Array.isArray(parsedHabits)) {
    throw new Error("Saved habits must be an array.");
  }

  return parsedHabits.map((habit: unknown) => {
    if (
      typeof habit !== "object" ||
      habit === null ||
      !("id" in habit) ||
      !("name" in habit) ||
      !("completions" in habit) ||
      typeof habit.id !== "string" ||
      typeof habit.name !== "string" ||
      !Array.isArray(habit.completions)
    ) {
      throw new Error("A saved habit has an invalid format.");
    }

    // JSON stores Date values as strings; restore real Date objects for date-fns.
    const completions = habit.completions.map((completion: unknown) => {
      if (typeof completion !== "string") {
        throw new Error("A saved completion date must be a string.");
      }

      const completionDate = new Date(completion);
      if (Number.isNaN(completionDate.getTime())) {
        throw new Error("A saved completion date is invalid.");
      }

      return completionDate;
    });

    return { id: habit.id, name: habit.name, completions };
  });
}
