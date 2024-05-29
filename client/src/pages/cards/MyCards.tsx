import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import FormLayout from "../../components/FormLayout";
import { Card, RecipeReviewCard } from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { deleteCard, getCards, getMyCards } from "../../services/CardServices";
import { useAuth } from "../../AppContext";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ListIcon from "@mui/icons-material/List";
import React from "react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { SearchContext } from "../../searchContext";
import "../../css/CardsPage.css";
import SkeletonCard from "../../components/Skelton";
import { useRecipeReviewCard } from "../../components/useRecipeReviewCard";
import { log } from "console";
import { toast } from "react-toastify";
import { useForceUpdate } from "../../components/useForceUpdate";
function MyCard() {
  const [myCards, setMyCards] = useState<Array<Card>>([]);
  const { searchValue } = useContext(SearchContext);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef(myCards);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const fetchCards = async () => {
    try {
      if (user) {
        const cards = await getMyCards(user._id || "");
        cardsRef.current = cards;
        //forceUpdate()   ;
      }
      console.log(cardsRef.current);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  async function onDelete(_id: string) {
    console.log(_id);
    if (window.confirm(`Are you sure to delete ${_id}?`)) {
      try {
        await deleteCard(_id);
        const updated = cardsRef.current.filter(
          (card: Card) => card._id !== _id
        );
        console.log(updated);
        //setMyCards(updated);
        cardsRef.current = updated;
        forceUpdate();
        toast.success("Card has been deleted.");
      } catch (error) {
        console.error("Error deleting card:", error);
        toast.error("Failed to delete card.");
      }
    }
  }

  function onUpdate(_id: string) {
    navigate(`/editCard/${_id}`);
  }
  useEffect(() => {
    fetchCards();
  }, [cardsRef.current]);
  useEffect(() => {
    fetchCards();
    if (searchValue.trim() !== "") {
      const filtered = myCards.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchValue.toLowerCase())
      );
      cardsRef.current = filtered;
    } else {
      fetchCards();
    }
  }, [searchValue, cardsRef.current]);
  let length = myCards.length === 0;
  function handleClick() {
    navigate("/addCard");
  }
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
        {cardsRef.current.length === 0 ? (
          <span className="text-center">You don't have cards yet</span>
        ) : (
          <Grid justifyContent="center" container>
            {cardsRef.current.map((cardItem) => (
              <Grid item key={cardItem._id} xs={11} sm={6} md={4}>
                <div className="card-wrapper">
                  {loading ? (
                    <SkeletonCard />
                  ) : (
                    <RecipeReviewCard
                      {...cardItem}
                      handleDelete={onDelete}
                      handleUpdate={onUpdate}
                    />
                  )}
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
