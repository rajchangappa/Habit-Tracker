# Habit Tracker

Habit Tracker is a small React and TypeScript app for keeping a list of habits,
marking which days they were completed, and seeing a current completion streak.
The habits are saved in the browser so they remain available after reloading the
page.

## Project structure

```text
src/
  components/
    Button.tsx       Shared button used by the form, list, and header
    Habit.tsx        One habit, its completion buttons, and its streak
    HabitForm.tsx    Form for adding a habit
    HabitList.tsx    Reads habits and displays one Habit per item
    Header.tsx       Today's progress and week navigation
  context/
    HabitContext.ts  Habit data types and the context hook
    HabitProvider.tsx Owns habit state and shares habit actions
  hooks/
    useLocalStorage.ts Loads and saves state in browser localStorage
  App.tsx            Sets up the week view and combines the components
  main.tsx           Mounts the React app in the browser
  index.css          Global styles
public/              Static assets such as icons
```

## React and TypeScript concepts

- **Components** are functions that return JSX, the markup-like syntax used to
  describe the interface.
- **Props** pass values and callbacks from a parent component to a child. For
  example, `App` passes the visible week and navigation callbacks to `Header`.
- **State** stores values that can change while the app is open. `useState`
  makes React render again when that state changes.
- **Context** shares the habit list and its actions with components below
  `HabitProvider`, without passing those values through every component's
  props. `useHabits` also reports a clear error if it is used outside the
  provider.
- **TypeScript types** describe the shape of habit data and component props.
  They help catch mistakes while developing; they do not validate JSON read
  from the browser, so the saved habit data is checked when it is loaded.
- **`useEffect`** runs code after React renders. The storage hook uses effects
  because `localStorage` is a browser API and should not be accessed while
  rendering (which also makes the hook safe to render on a server).

## State and localStorage

`HabitProvider` owns the habit list. Adding, deleting, or toggling a completion
uses a state setter based on the previous list. This makes each update use the
latest state instead of a value captured by an earlier render.

The `useLocalStorage` hook manages loading and saving:

1. React starts with the provided initial value. The hook does not read browser
   storage during rendering.
2. After mounting, a `useEffect` reads the `Habits` entry from
   `localStorage`. The provider converts saved completion date strings back to
   `Date` objects and checks the saved habit shape.
3. A second `useEffect` saves state changes as JSON. It waits for the first
   read to finish so the initial empty list cannot overwrite existing data.
4. If storage is unavailable or saved data cannot be read, the error is logged
   and the app continues with the initial empty list. If a save fails, the
   error is logged and the in-memory app state remains usable.

This app stores data in the current browser and origin only; clearing site data
or using a different browser removes or hides the saved habits.

## How the components work together

`main.tsx` mounts `App`. `App` creates the visible week and places `Header`,
`HabitForm`, and `HabitsListContainer` inside `HabitProvider`. The provider
publishes the habit list and the add, delete, and toggle actions through
`HabitContext`. The form adds habits, the list renders each `Habit`, and each
habit uses the context actions to mark a date or delete itself. The header
calculates today's completed habits from the same shared state.

## Install and run

You need Node.js and npm installed.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run
`npm run build`. To check the code with ESLint, run `npm run lint`.

## Try the functionality

1. Add a habit using the text field.
2. Mark a day complete. Future days are disabled.
3. Check the streak and today's progress in the header.
4. Reload the page. The habit and completion should still be present.
5. Delete a habit and reload to confirm the deletion is saved.

For a direct storage check, open the browser's developer tools and inspect
**Application/Storage > Local Storage** for the current site. The `Habits`
entry contains a JSON array; completion dates are stored as strings and restored
as `Date` objects when the app starts.

## Troubleshooting

- **The app does not start:** Confirm that dependencies are installed and that
  the terminal is in the project folder before running `npm run dev`.
- **A saved habit does not appear:** Check that the page is using the same
  browser and site origin as before. Inspect the developer console for a
  storage or invalid-data error.
- **Saved habits look invalid:** Remove the `Habits` entry from this site's
  Local Storage in developer tools, then reload and add the habits again.
- **Lint or build reports an error:** Run `npm run lint` or `npm run build` and
  use the reported file and line to locate the issue.
- **There is no automated test command:** This project currently defines lint
  and build scripts, but no test script. Use the manual steps above to check
  the existing behavior.
