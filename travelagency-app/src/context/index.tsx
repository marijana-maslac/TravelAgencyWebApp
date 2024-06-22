import { createContext } from "react";

export const RoleContext = createContext({
  isAdmin: true,
  setIsAdmin: (value: ((prevState: boolean) => boolean) | boolean) => {},
});
