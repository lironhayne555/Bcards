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
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);
  const [favsCards, setFavsCards] = useState<Array<FullCard>>([]);
  const [favorites, setLocalFavorites] = useState(user?.favorites);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef(favsCards);
  const forceUpdate = useForceUpdate();
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
        console.log(cardsWithUserDetails);

        setFavsCards(cardsWithUserDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [FavCards]);
  useEffect(() => {
    if (searchValue.trim() !== "") {
      {
        const filtered = favsCards.filter(
          (item) =>
            item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchValue.toLowerCase())
        );
        //cardsRef.current = filtered;
        setFavsCards(filtered);
      }
    }
  }, [searchValue, favsCards]);
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
    //forceUpdate();
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
      //setFavsCards(updatedFavorites);
    }
  };

  const isCardFav = (cardId?: string) => {
    if (!cardId || !favorites) return false;
    console.log(favorites.includes(cardId));

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
        {favsCards.length === 0 ? (
          <span className="text-center">You don't have cards yet</span>
        ) : (
          <Grid justifyContent={"center"} container gridTemplateColumns={3}>
            {favsCards.map((cardItem) => (
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
