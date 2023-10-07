"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./services/services";
import { Task } from "./services/types";

export interface AppContext {
  tasks: Task[];
  update: (context: Partial<Omit<AppContext, "update">>) => void;
}

let initialContext: AppContext = {
  tasks: [],
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

  const { isLoading, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  useEffect(() => {
    if (isLoading) return;
    update({ tasks: data });
  }, [data]);

  return (
    <AppContext.Provider value={{ ...context, update }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
``;
