import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, RecipeReviewCard } from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import { getCards, getCardsByUser } from "../../services/CardServices";
import { Avatar, Button, Container, CssBaseline } from "@mui/material";
import { SearchContext } from "../../searchContext";
import { useAuth } from "../../AppContext";
import "../../css/CardsPage.css";

function Cards() {
const navigate = useNavigate();
const [cards, setCards] = useState<Array<Card>>([]);
const { searchValue } = useContext(SearchContext);

const {user } = useAuth();
 const fetchCards = async () => {
        try {
            const allCards = await getCards();
            setCards(allCards);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    useEffect(() => {
        if(user)
{
        fetchCards();
}
    }, [user]); 

    useEffect(() => {
        if (searchValue.trim() !== '') {
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
    return ( 
<>
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
              <CssBaseline />
      <Title mainText="Cards"
    subText="Here you can find business cards from all categories"></Title>
{ cards &&
      cards.map(cardItem => <RecipeReviewCard  
         key={cardItem._id} {...cardItem}/>)
}</Container>
 </> );
} 
export default Cards;