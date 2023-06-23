import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [stateChange, setStateChange] = useState(false);

  return <AppContext.Provider value={{ stateChange, setStateChange }}>{children}</AppContext.Provider>;
};
