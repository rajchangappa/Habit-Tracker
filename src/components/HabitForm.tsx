import { useState, type SubmitEvent } from "react";
import { Button } from "./Button";
import { useHabits } from "../context/HabitContext";

export const HabitForm = () => {
  const [name, setName] = useState("");
  const { addNewHabit } = useHabits();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    if (trimmedName === "") return;

    addNewHabit(trimmedName);
    setName("");
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Learn programming.."
        className="h-full flex-1 bg-gray-800 px-3 py-2 rounded-md placeholder:text-zinc-400 text-inherit outline-none ring-2 ring-gray-700 focus-visible:ring-2 focus-visible:ring-violet-800"
      />
      <Button
        disabled={name.trim() === ""}
        className="bg-blue-700 border-2 border-blue-700 px-4"
      >
        Add Habit
      </Button>
    </form>
  );
};
