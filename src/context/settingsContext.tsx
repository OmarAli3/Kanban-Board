import { createContext, useContext, useEffect, useState } from "react";
import { TransitionBoard, TRANSITION_BOARD } from "../mock-data/settings";

export const SettingsContext = createContext<TransitionBoard | null>(null);

export function SettingsContextProvider({ children }: any) {
  // state for transition board
  const [boardSettings, setSettings] = useState<TransitionBoard | null>(null);

  useEffect(() => {
    setSettings(TRANSITION_BOARD);
  }, []);
  return (
    <SettingsContext.Provider value={boardSettings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  return context;
}
