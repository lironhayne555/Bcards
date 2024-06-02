import { Container, CssBaseline, Grid } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  FullCard,
  RecipeReviewCard,
} from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import "../../css/CardsPage.css";
import { SearchContext } from "../../searchContext";
import { useForceUpdate } from "../../components/useForceUpdate";
import { getFavorites, getUserDetails } from "../../services/ApiServices";
import { useAuth } from "../../AppContext";
import { setFavorites } from "../../services/ApiServices";
import { error } from "console";
import { setUser as setLocalStorgaeUser } from "../../auth/TokenManager";
function FavCards() {
  const { user, setUser } = useAuth();
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [filteredCards, setFilteredCards] = useState<Array<FullCard>>([]);
  const [favsCards, setFavsCards] = useState<Array<FullCard>>([]);
  const [favorites, setLocalFavorites] = useState(user?.favorites);
  const fetchCards = async () => {
    try {
      if (user && !favsCards.length) {
        const cards = await getFavorites(user._id || "");
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
        setFilteredCards(cardsWithUserDetails);
        setFavsCards(cardsWithUserDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCards();
    setFilteredCards(favsCards);
    setSearchValue("");
  }, [FavCards]);
  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filtered = favsCards.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(favsCards);
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
    const favoriteIndex = favsCards.findIndex((fav) => {
      return fav._id === cardId;
    });

    if (favoriteIndex !== -1) {
      const updatedFavorites = favsCards.filter((fav) => fav._id !== cardId);
      user.favorites = updatedFavorites.map((fav) => fav._id || "");
      setLocalStorgaeUser(user);
      setUser(user);
      setFavsCards([...updatedFavorites]);
      setFilteredCards([...updatedFavorites]);
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

export default FavCards;
