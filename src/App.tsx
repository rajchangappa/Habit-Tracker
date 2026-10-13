import { HabitForm } from "./components/HabitForm";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="w-full max-w-3xl m-auto p-4 md:p-6">
      <Header />
      <HabitForm />
    </div>
  );
}
