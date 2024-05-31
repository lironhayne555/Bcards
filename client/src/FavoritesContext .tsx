import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForceUpdate } from "./components/useForceUpdate";
import { useAuth } from "./AppContext";
import { toast } from "react-toastify";
import { getFavorites } from "./services/CardServices";
import { Card } from "./components/RecipeReviewCard";
import React from "react";
interface FavoritesContextType {
  favorites: Array<Card>;
  cardsRef: React.MutableRefObject<Array<Card>>;
  handleAddFavs: (cardId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);
const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavoritesState] = useState<Array<Card>>([]);
  const cardsRef = useRef<Array<Card>>([]);
  const forceUpdate = useForceUpdate();
  const { user } = useAuth();
  useEffect(() => {
    if (user?._id) {
      getFavorites(user._id)
        .then((json) => {
          setFavoritesState(json);
          cardsRef.current = json;
        })
        .catch((error) => {
          toast.error("Failed to fetch favorites");
        });
    }
  }, [user]);

  const handleAddFavs = (cardId: string) => {
    const updatedFavorites = [...favorites, { _id: cardId } as Card]; // Mocking a new card addition
    cardsRef.current = updatedFavorites;
    if (user?._id)
      // setFavorites(user._id, updatedFavorites).then(() => {
      //   toast.success("Favorite added successfully");
      // }).catch(error => {
      //   toast.error("Failed to add favorite");
      // });

      forceUpdate();
  };
  return (
    <FavoritesContext.Provider value={{ favorites, handleAddFavs, cardsRef }}>
      {children}
    </FavoritesContext.Provider>
  );
};
const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export { FavoritesProvider, useFavorites };
