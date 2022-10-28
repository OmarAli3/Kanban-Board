import { SettingsContextProvider } from "./context/settingsContext";
import { TasksBoard } from "./views/tasks-board/TasksBoard";

function App() {
  return (
    <SettingsContextProvider>
      <div className="w-full flex overflow-auto">
        <div className="mx-auto">
          <TasksBoard />
        </div>
      </div>
    </SettingsContextProvider>
  );
}

export default App;
