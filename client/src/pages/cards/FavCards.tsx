import { Container, CssBaseline } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, RecipeReviewCard } from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import "../../css/CardsPage.css";
import { SearchContext } from "../../searchContext";
import { useForceUpdate } from "../../components/useForceUpdate";
import { getFavorites } from "../../services/ApiServices";
import { useAuth } from "../../AppContext";
import { setFavorites } from "../../services/ApiServices";

function FavCards() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);
  const [favsCards, setFavsCards] = useState<Array<Card>>([]);
  const [favorites, setLocalFavorites] = useState(user?.favorites);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef(favsCards);
  const forceUpdate = useForceUpdate();
  const fetchCards = async () => {
    try {
      if (user) {
        const cards = await getFavorites(user._id || "");
        cardsRef.current = cards;
        //forceUpdate()   ;
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
      {
        const filtered = favsCards.filter(
          (item) =>
            item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchValue.toLowerCase())
        );
        cardsRef.current = filtered;
      }
    }
  }, [searchValue, cardsRef.current]);

  const onFavCard = async (cardId?: string) => {
    if (!cardId || !user?._id || !user.favorites) return;
    updateLocalFav(cardId);
    localStorage.setItem("userData", JSON.stringify(user));
    await setFavorites(cardId, user._id);
    forceUpdate();
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
        {cardsRef.current.length === 0 ? (
          <span className="text-center">You don't have cards yet</span>
        ) : (
          <div className="card-container">
            {cardsRef.current.map((cardItem) => (
              <div className="card-wrapper" key={cardItem._id}>
                <RecipeReviewCard
                  card={cardItem}
                  isFav={isCardFav(cardItem?._id)}
                  handleDelete={() => {
                    handleDelete();
                  }}
                  handleUpdate={() => {
                    handleUpdate();
                  }}
                  handleSetFavs={() => onFavCard(cardItem._id)}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

export default FavCards;
