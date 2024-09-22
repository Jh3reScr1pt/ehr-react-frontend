import { useContext } from "react";
import { RoleContext } from "./RoleContext";

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRoles must be used within a RoleProvider");
  return context;
};