"use client";
"use client";

import React, { Dispatch, createContext, useReducer } from "react";

interface StateType {
  isOpen: boolean;
}

interface ActionType {
  type: "toggle";
}

const initialState: StateType = {
  isOpen: false,
};

const reducer = (state: StateType) => {
  return { ...state, isOpen: !state.isOpen };
};

export const SidebarContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SidebarContext.Provider value={{ state, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};
