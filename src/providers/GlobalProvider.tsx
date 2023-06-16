"use client";
"use client";

import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export const GlobalContext = createContext<{
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
  mobileAsideLinksOpen: boolean;
  setMobileAsideLinksOpen: Dispatch<SetStateAction<boolean>>;
}>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  mobileFiltersOpen: false,
  setMobileFiltersOpen: () => {},
  mobileAsideLinksOpen: false,
  setMobileAsideLinksOpen: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileAsideLinksOpen, setMobileAsideLinksOpen] = useState(false);
  
  return (
    <GlobalContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        mobileFiltersOpen,
        setMobileFiltersOpen,
        mobileAsideLinksOpen,
        setMobileAsideLinksOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
