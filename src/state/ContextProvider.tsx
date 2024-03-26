import React, { createContext, useReducer } from "react";
import { dispatchMiddleware, initState, reducer } from "./reducer.ts";
import { TDispatch } from "./types.ts";
import { State } from "./state.ts";

export interface IAppContext {
  state: State;
  dispatch: TDispatch;
}

export const AppContext = createContext<IAppContext>({
  dispatch: () => null,
  state: new State(),
});

export const ContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <AppContext.Provider
      value={{
        dispatch: dispatchMiddleware(dispatch),
        state: new State(state),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
