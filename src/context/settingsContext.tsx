import { createContext, useContext, useEffect, useState } from "react";
import { TransitionBoard, TRANSITION_BOARD } from "../mock-data/settings";
import { TaskStatus } from "../models/TaskModel";

const EMPTY_TRANSITION_BOARD = {
  [TaskStatus.BACKLOG]: [],
  [TaskStatus.TODO]: [],
  [TaskStatus.IN_PROGRESS]: [],
  [TaskStatus.IN_REVIEW]: [],
  [TaskStatus.DONE]: [],
};
export const SettingsContext = createContext<{
  transitionBoard: TransitionBoard;
  updateTransitionBoard?: (transitionBoard: TransitionBoard) => void;
}>({
  transitionBoard: EMPTY_TRANSITION_BOARD,
});

export function SettingsContextProvider({ children }: any) {
  // state for transition board
  const [boardSettings, setSettings] = useState<TransitionBoard>(
    EMPTY_TRANSITION_BOARD
  );

  useEffect(() => {
    setSettings(TRANSITION_BOARD);
  }, []);
  return (
    <SettingsContext.Provider
      value={{
        transitionBoard: boardSettings,
        updateTransitionBoard: (transitionBoard: TransitionBoard) => {
          setSettings(transitionBoard);
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  return context;
}
