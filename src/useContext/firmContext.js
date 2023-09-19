import { createContext , useContext } from "react";

const FirmContext = createContext(null);

export {
  FirmContext,
  useContext
}