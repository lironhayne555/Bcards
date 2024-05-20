import { Avatar, Button } from "@mui/material";
import FormLayout from "../../components/FormLayout";
import RecipeReviewCard, { Card } from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCards } from "../../services/CardServices";
import { useAuth } from "../../AppContext";
import { CardContext, CardContextProvider, useCardsContext } from "../../CardContext";


function FavCards() {
const navigate = useNavigate();
//const [cards,setCards] =useState<Array<Card>>([]);
const {user} = useAuth();
const {favsCards,setFavsCards ,onDelete , setFavCardFunctionClick,isRedHeart, onUpdate, onClickPhone,onMoreDetails } = useCardsContext();
let length = favsCards.length === 0
     return ( 
<>
      <Title mainText="Cards"
    subText="Here you can find business cards from all categories"></Title>
{
  length   && 
<span className="text-center">You dont have cards yet</span>
}
{  favsCards.length > 0   &&
      favsCards.map(cardItem => <RecipeReviewCard handleDelete={()=>onDelete(cardItem._id)}  handleSetFave={ () => setFavCardFunctionClick(cardItem._id)} isRed={isRedHeart}handleUpdate={()=> onUpdate(cardItem._id)}
        
     handleWhatsapp={onClickPhone} handleShowDetails={onMoreDetails} key={cardItem._id} {...cardItem} showCruds={true}/>)
}
 </>);
}

export default FavCards;