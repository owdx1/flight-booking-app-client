import { createContext , useContext } from "react";

const PasswordContext = createContext(null);

export {
  PasswordContext,
  useContext
}