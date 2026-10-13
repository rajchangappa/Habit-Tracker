import { Button } from "./Button";

export const HabitForm = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Learn programming.."
        className="h-full flex-1 bg-gray-800 px-3 py-2 rounded-md placeholder:text-zinc-400 text-inherit outline-none ring-2 ring-gray-700 focus-visible:ring-2 focus-visible:ring-violet-800"
      />
      <Button>Add Habit</Button>
    </form>
  );
};
