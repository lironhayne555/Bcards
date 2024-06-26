import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button, Container, CssBaseline, Grid } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../AppContext";
import {
  Card,
  FullCard,
  RecipeReviewCard,
} from "../../components/RecipeReviewCard";
import SkeletonCard from "../../components/Skelton";
import Title from "../../components/Title";
import { useForceUpdate } from "../../components/useForceUpdate";
import "../../css/CardsPage.css";
import { SearchContext } from "../../searchContext";
import { deleteCard, getMyCards } from "../../services/CardServices";
import { setFavorites } from "../../services/ApiServices";
import { setUser as setLocalStorgaeUser } from "../../auth/TokenManager";
import { User } from "../../auth/SignUp";
import ConfirmDialog from "../../components/ConfirmDialog";
function MyCard() {
  const [myCards, setMyCards] = useState<Array<FullCard>>([]);
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [filteredCards, setFilteredCards] = useState<Array<FullCard>>([]);
  const [isDeleteDialog, setIsDeleteDialog] = useState("");
  const [favorites, setLocalFavorites] = useState(user?.favorites);
  const [loading, setLoading] = useState(true);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  const attachUserDetails = (cards: FullCard[], user: User) => {
    if (!user) return cards as FullCard[];
    return cards.map((card) => {
      return {
        ...card,
        user: {
          phone: user.phone || "",
          country: user.country || "",
          city: user.city || "",
          street: user.street || "",
          houseNumber: user.houseNumber || 0,
          zip: user.zip || "",
        },
      } as FullCard;
    });
  };
  const fetchCards = async () => {
    try {
      if (user && !myCards.length) {
        const cards = await getMyCards(user._id || "");
        const cardsWithDetails = attachUserDetails(cards, user);
        setFilteredCards(cardsWithDetails);
        setMyCards(cardsWithDetails);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  const onCloseDeleteDialog = () => {
    setIsDeleteDialog("");
  };
  async function onDelete(_id?: string) {
    if (_id) {
      setIsDeleteDialog(_id);
    }
  }

  function onUpdate(_id?: string) {
    if (_id) {
      navigate(`/editCard/${_id}`);
    } else {
      toast.error("No Card to delete");
    }
  }
  useEffect(() => {
    if (!myCards.length) {
      fetchCards();
    }
  }, [user]);

  useEffect(() => {
    fetchCards();
    setFilteredCards(myCards);
    setSearchValue("");
  }, [myCards]);
  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filtered = myCards.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(myCards);
    }
  }, [searchValue]);
  function handleClick() {
    navigate("/addCard");
  }

  useEffect(() => {
    if (user) {
      setUser({ ...user, favorites });
      setLocalStorgaeUser({ ...user, favorites });
      // fetchCards();
    }
  }, [favorites]);

  const onFavCard = async (cardId?: string) => {
    if (!cardId || !user?._id || !user.favorites) return;
    updateLocalFav(cardId);

    await setFavorites(cardId, user._id)
      .then((res) => {
        toast.success("Favorite list Update");
      })
      .catch((err) => {
        toast.error("Erorr upadta list favorites");
      });
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
  const onDeleteConfirmed = async () => {
    try {
      if (isDeleteDialog) {
        await deleteCard(isDeleteDialog);
        const updated = myCards.filter(
          (card: Card) => card._id !== isDeleteDialog
        );
        setMyCards(updated);
        setIsDeleteDialog("");
        forceUpdate();
        toast.success("Card has been deleted.");
      } else {
        toast.error("No Card to delete");
      }
    } catch (error) {
      toast.error("Failed to delete card.");
    }
  };
  function sendWhatsApp(number: any) {
    window.open(`https://wa.me/972${number}`, "_blank");
  }
  return (
    <>
      <ConfirmDialog
        onConfirm={onDeleteConfirmed}
        title="Would you like to delete the card?"
        onClose={onCloseDeleteDialog}
        isOpen={!!isDeleteDialog}
      />
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CssBaseline />
        <Title
          mainText="Cards"
          subText="Here you can find business cards from all categories"
        ></Title>
        <div className="avatar-container addWrap">
          <Button onClick={handleClick}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <AddIcon />
            </Avatar>
          </Button>
        </div>
        {filteredCards.length === 0 ? (
          <span className="text-center">You don't have cards yet</span>
        ) : (
          <Grid justifyContent={"center"} container gridTemplateColumns={3}>
            {filteredCards.map((cardItem) => (
              <Grid item key={cardItem._id}>
                <div className="card-wrapper">
                  <RecipeReviewCard
                    card={cardItem}
                    isFav={isCardFav(cardItem?._id)}
                    handleSetFavs={() => onFavCard(cardItem._id)}
                    handleDelete={() => onDelete(cardItem._id)}
                    handleUpdate={() => onUpdate(cardItem._id)}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        )}{" "}
      </Container>
    </>
  );
}

export default MyCard;
