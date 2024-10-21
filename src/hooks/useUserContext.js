import { useContext } from "react";
import { UserContext } from "../context/UserContext/UserContext";

function useUserContext() {
  return useContext(UserContext);
}

export default useUserContext;
