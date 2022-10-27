import { SettingsContextProvider } from "./context/settingsContext";
import { TasksBoard } from "./views/tasks-board/TasksBoard";

function App() {
  return (
    <SettingsContextProvider>
      <TasksBoard />
    </SettingsContextProvider>
  );
}

export default App;
