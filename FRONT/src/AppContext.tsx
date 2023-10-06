"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { Task } from "./App";
import { todos } from "./data";

export interface AppContext {
  tasks: Task[];
  update: (context: Partial<Omit<AppContext, "update">>) => void;
}

let initialContext: AppContext = {
  tasks: todos,
  update: () => {},
};

export function useAppContext() {
  return useContext(AppContext);
}

const AppContext = createContext<AppContext>(initialContext);

function AppProvider({ children }: { children: ReactNode }) {
  const [context, setContext] =
    useState<Omit<AppContext, "update">>(initialContext);

  const update = (context: Partial<Omit<AppContext, "update">>) => {
    setContext((oldContext) => ({ ...oldContext, ...context }));
  };

  return (
    <AppContext.Provider value={{ ...context, update }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
