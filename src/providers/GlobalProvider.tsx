"use client";
"use client";

import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const GlobalContext = createContext<{
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};
