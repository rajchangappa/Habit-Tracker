import { HabitForm } from "./components/HabitForm";
import { HabitsListContainer } from "./components/HabitList";
import { HabitProvider } from "./context/HabitProvider";
import Header from "./components/Header";
import { useState } from "react";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export default function App() {
  const [weekOffSet, setWeekOffSet] = useState(0);
  const week = addWeeks(new Date(), weekOffSet);

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  return (
    <div className="w-full max-w-3xl m-auto p-4 md:p-6">
      <HabitProvider>
        <Header
          visibleDates={visibleDates}
          onNext={() => setWeekOffSet((of) => of + 1)}
          onPrevious={() => setWeekOffSet((of) => of - 1)}
        />
        <HabitForm />
        <HabitsListContainer visibleDates={visibleDates}/>
      </HabitProvider>
    </div>
  );
}
