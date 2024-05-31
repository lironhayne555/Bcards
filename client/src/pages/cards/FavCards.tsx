import { Container, CssBaseline } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, RecipeReviewCard } from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import "../../css/CardsPage.css";
import { SearchContext } from "../../searchContext";

function FavCards() {
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);
  const [favsCards, setFavsCards] = useState<Array<Card>>([]);
  const cardsRef = useRef(favsCards);

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
          <div className="card-container">
            {favsCards.map((cardItem) => (
              <div className="card-wrapper" key={cardItem._id}>
                <RecipeReviewCard
                  card={cardItem}
                  handleDelete={() => {}}
                  handleUpdate={() => {}}
                  handleSetFavs={() => (cardItem._id ? cardItem._id : "")}
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
