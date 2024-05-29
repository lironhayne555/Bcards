import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useForceUpdate } from "./components/useForceUpdate";
import { useAuth } from "./AppContext";
import { toast } from "react-toastify";
import { getFavorites, setFavorites } from "./services/CardServices";
import { Card } from "./components/RecipeReviewCard";
import React from "react";
interface FavoritesContextType {
  cardsRef : 
  favorites: any;
  handleAddFavs: (cardId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavoritesState] = useState<Array<Card>>([]);
  const forceUpdate = useForceUpdate();

  const fetchFavorites = async () => {
    try {
      if (user) {
        const cards = await getFavorites(user._id ? user._id : "");
        setFavoritesState(cards);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const addToFavorites = async (cardId: string) => {
    try {
      if (user) {
        await setFavorites(cardId, user._id ? user._id : "");
        //  setFavoritesState((prev) => [...prev, cardId]); // Update state with the new favorite
        toast.success("Added to favorites!");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add to favorites.");
    }
  };
  return (
    <FavoritesContext.Provider value={{}}>{children}</FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
