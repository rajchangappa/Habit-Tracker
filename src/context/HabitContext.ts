import { createContext, useContext } from "react";

export type HabitData = {
  id: string;
  name: string;
  completions: Date[];
};

type HabitContextValue = {
  habits: HabitData[];
  addNewHabit: (name: string) => void;
  deleteHabit: (habitId: string) => void;
  toggleHabit: (habitId: string, selectedDate: Date) => void;
};

export const HabitContext = createContext<HabitContextValue | null>(null);

export function useHabits() {
  const habitContext = useContext(HabitContext);

  if (habitContext === null) {
    throw new Error("useHabits must be used inside a HabitProvider.");
  }

  return habitContext;
}
