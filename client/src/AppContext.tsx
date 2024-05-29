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
import { useNavigate } from "react-router-dom";
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

  let logoutTimerIdRef = useRef(0);

  //  const  [addFavorite,SetAddFavorite] = useState<Array<Card>>([])
  // const [redHurt,SetRedHurt] = useState('')

  useEffect(() => {
    const theUser = getUser();

    if (theUser) {
      setUser(theUser);
    }
  }, []);

  useEffect(() => {
    const autoLogout = () => {
      if (document.visibilityState === "hidden") {
        const timeOutId = window.setTimeout(() => {
          removeUser();
          setUser(null);
        }, 24 * 60 * 60 * 1000);
        logoutTimerIdRef.current = timeOutId;
      } else {
        window.clearTimeout(logoutTimerIdRef.current);
      }
    };
    const storedUser = localStorage.getItem("user");
    if (storedUser && !logoutTimerIdRef.current) {
      setUser(JSON.parse(storedUser));
    }
    document.addEventListener("visibilitychange", autoLogout);
    return () => {
      document.removeEventListener("visibilitychange", autoLogout);
    };
  }, []);

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
