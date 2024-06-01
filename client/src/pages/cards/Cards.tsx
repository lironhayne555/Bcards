import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, RecipeReviewCard } from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import { getCards, getCardsByUser } from "../../services/CardServices";
import { Avatar, Button, Container, CssBaseline } from "@mui/material";
import { SearchContext } from "../../searchContext";
import { useAuth } from "../../AppContext";
import "../../css/CardsPage.css";
import { useForceUpdate } from "../../components/useForceUpdate";
import { setFavorites } from "../../services/ApiServices";
import { toast } from "react-toastify";

function Cards() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState<Array<Card>>([]);
  const [favorites, setLocalFavorites] = useState(user?.favorites);
  const { searchValue } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef(cards);
  const forceUpdate = useForceUpdate();
  const fetchCards = async () => {
    try {
      if (user) {
        const cards = await getCards();
        cardsRef.current = cards;
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  useEffect(() => {
    fetchCards();
  }, [cardsRef.current]);
  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filtered = cards.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCards(filtered);
    } else {
      fetchCards();
    }
  }, [searchValue, cards]);

  const onFavCard = async (cardId?: string) => {
    if (!cardId || !user?._id || !user.favorites) return;
    updateLocalFav(cardId);
    // localStorage.setItem("userData", JSON.stringify(user));
    await setFavorites(cardId, user._id)
      .then(() => {
        localStorage.setItem("userDate", JSON.stringify(user));
        forceUpdate();
      })
      .catch(() => {
        toast.error("error Update Favorite");
      });
  };

  const updateLocalFav = (cardId?: string) => {
    if (!cardId || !user?._id || !favorites || !user?.favorites) return;
    const favoriteIndex = favorites.findIndex((fav) => fav === cardId);

    if (favoriteIndex !== -1) {
      const updatedFavorites = user?.favorites.splice(favoriteIndex, 1);

      setLocalFavorites([...updatedFavorites]);
    } else {
      setLocalFavorites([...favorites, cardId]);
    }
  };
  const handleDelete = () => {
    return;
  };
  const handleUpdate = () => {
    return;
  };
  const isCardFav = (cardId?: string) => {
    if (!cardId || !favorites) return false;
    return favorites.includes(cardId);
  };
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <CssBaseline />
        <Title
          mainText="Cards"
          subText="Here you can find business cards from all categories"
        ></Title>
        {cardsRef.current &&
          cardsRef.current.map((cardItem) => (
            <RecipeReviewCard
              key={cardItem._id}
              card={cardItem}
              isFav={isCardFav(cardItem?._id)}
              handleDelete={() => handleDelete()}
              handleSetFavs={() => onFavCard(cardItem._id)}
              handleUpdate={() => handleUpdate()}
            />
          ))}
      </Container>
    </>
  );
}
export default Cards;
