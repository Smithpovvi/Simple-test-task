import React, { createContext, useReducer } from "react";
import { dispatchMiddleware, initState, reducer } from "./reducer.ts";
import { IAppState, TDispatch } from "./types.ts";
import { Selectors } from "./selectors.ts";

export interface IAppContext {
  state: IAppState;
  dispatch: TDispatch;
  selectors: Selectors;
}

export const AppContext = createContext<IAppContext>({
  state: initState,
  dispatch: () => null,
  selectors: new Selectors(),
});

export const ContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const selectors = new Selectors(state);
  return (
    <AppContext.Provider
      value={{ state, dispatch: dispatchMiddleware(dispatch), selectors }}
    >
      {children}
    </AppContext.Provider>
  );
};
