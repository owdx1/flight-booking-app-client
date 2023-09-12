import { createContext , useContext } from "react";

const firmContext = createContext(null);

export {
  firmContext,
  useContext
}