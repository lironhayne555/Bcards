import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  FullCard,
  RecipeReviewCard,
} from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import { getCards, getCardsByUser } from "../../services/CardServices";
import { Avatar, Button, Container, CssBaseline, Grid } from "@mui/material";
import { SearchContext } from "../../searchContext";
import { useAuth } from "../../AppContext";
import "../../css/CardsPage.css";
import { useForceUpdate } from "../../components/useForceUpdate";
import { getUserDetails, setFavorites } from "../../services/ApiServices";
import { toast } from "react-toastify";
import { setUser as setLocalStorgaeUser } from "../../auth/TokenManager";

function Cards() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState<Array<FullCard>>([]);
  const [favorites, setLocalFavorites] = useState(user?.favorites);
  const [filteredCards, setFilteredCards] = useState<Array<FullCard>>([]);
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const fetchCards = async () => {
    try {
      if (user && !cards.length) {
        const cards = await getCards();
        const cardsWithUserDetails = await Promise.all(
          cards.map(async (card) => {
            if (user._id === card.userId) {
              return {
                ...card,
                user: {
                  email: user.email,
                  phone: user.phone,
                  country: user.country,
                  city: user.city,
                  street: user.street,
                  houseNumber: user.houseNumber,
                  zip: user.zip,
                },
              };
            } else {
              const userCard = await getUserDetails(card.userId);
              return {
                ...card,
                user: {
                  email: userCard.email,
                  phone: userCard.phone,
                  country: userCard.country,
                  city: userCard.city,
                  street: userCard.street,
                  houseNumber: userCard.houseNumber,
                  zip: userCard.zip,
                },
              };
            }
          })
        );
        console.log(cardsWithUserDetails);
        setFilteredCards(cardsWithUserDetails);
        setCards(cardsWithUserDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!cards.length) {
      fetchCards();
    }
  }, [user]);
  useEffect(() => {
    fetchCards();
    setFilteredCards(cards);
    setSearchValue("");
  }, [cards]);

  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filtered = cards.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(cards);
    }
  }, [searchValue]);

  useEffect(() => {
    if (user) {
      setUser({ ...user, favorites });
      setLocalStorgaeUser({ ...user, favorites });
    }
  }, [favorites]);

  const onFavCard = async (cardId?: string) => {
    if (!cardId || !user?._id || !user.favorites) return;
    updateLocalFav(cardId);

    await setFavorites(cardId, user._id);
  };

  const updateLocalFav = (cardId?: string) => {
    if (!cardId || !user?._id || !favorites || !user?.favorites) return;
    const favoriteIndex = favorites.findIndex((fav) => {
      return fav === cardId;
    });

    if (favoriteIndex !== -1) {
      const updatedFavorites = favorites.filter(
        (fav) => fav !== favorites[favoriteIndex]
      );
      setLocalFavorites([...updatedFavorites]);
    } else {
      const updatedFavorites = [...favorites, cardId];

      setLocalFavorites([...updatedFavorites]);
    }
  };

  const isCardFav = (cardId?: string) => {
    if (!cardId || !favorites) return false;

    return favorites.includes(cardId);
  };
  const handleDelete = () => {
    return;
  };
  const handleUpdate = () => {
    return;
  };
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <CssBaseline />
        <Title
          mainText="Cards"
          subText="Here you can find business cards from all categories"
        ></Title>
        {filteredCards.length === 0 ? (
          <span className="text-center">You don't have cards yet</span>
        ) : (
          <Grid justifyContent={"center"} container gridTemplateColumns={3}>
            {filteredCards.map((cardItem) => (
              <Grid item key={cardItem._id}>
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
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Cards;
