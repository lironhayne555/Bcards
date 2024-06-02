import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getUser, removeToken, removeUser } from "./auth/TokenManager";
import { User } from "./auth/SignUp";
import { Card } from "./components/RecipeReviewCard";
import { time } from "console";
import { number } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
interface Context {
  user: User | null;
  setUser: Function;
}

const AppContext = createContext<Context | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  let logoutTimerIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const theUser = getUser();

    if (theUser) {
      setUser(theUser);
    }
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) {
        removeUser();
        setUser(null);
        window.location.href = "/login";
      }
      clearTimeout(timeout);
    }, 14400000);

    const storedUser = localStorage.getItem("user");
    if (storedUser && !logoutTimerIdRef.current) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AppContext) as Context;
  if (!context) {
    throw new Error("The app was not wrapped with AppContextProvider!");
  }

  return context;
};
