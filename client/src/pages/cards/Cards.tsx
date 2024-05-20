import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeReviewCard, { Card } from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import { getCards, getCardsByUser } from "../../services/CardServices";
import { Avatar, Button } from "@mui/material";
import { CardContext, CardContextProvider, useCardsContext } from "../../CardContext";
import { SearchContext } from "../../searchContext";
// interface CardContext {
//     onDelete: Function,
//     onCall: Function,
//     onUpdate: Function,
//     addFavorites: Function
// }

function Cards() {
const navigate = useNavigate();
// const [cards,setCards] = useState<Array<Card>>([]);
const {cards,setCards ,onDelete , setFavCardFunctionClick,isRedHeart,onUpdate,onClickPhone,onMoreDetails } = useCardsContext();
    return ( 
<>
      <Title mainText="Cards"
    subText="Here you can find business cards from all categories"></Title>
{ cards &&
      cards.map(cardItem => <RecipeReviewCard  handleDelete={()=> onDelete(cardItem._id)}  handleSetFave={ () => setFavCardFunctionClick(cardItem._id)} isRed={isRedHeart} handleUpdate={()=> onUpdate(cardItem._id)}
        
    handleWhatsapp={onClickPhone} handleShowDetails={onMoreDetails} key={cardItem._id} {...cardItem} showCruds={false} />)
}
 </>);
} 
export default Cards;