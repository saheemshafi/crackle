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
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
}>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  mobileFiltersOpen: false,
  setMobileFiltersOpen: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        mobileFiltersOpen,
        setMobileFiltersOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
