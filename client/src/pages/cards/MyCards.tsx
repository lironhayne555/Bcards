import { Avatar, Button } from "@mui/material";
import FormLayout from "../../components/FormLayout";
import RecipeReviewCard, { Card } from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCards } from "../../services/CardServices";
import { useAuth } from "../../AppContext";
import { useCardsContext } from "../../CardContext";


function MyCard() {
const {cards,setCards ,onDelete , setFavCardFunctionClick,isRedHeart ,onUpdate, onClickPhone,onMoreDetails} = useCardsContext();
const navigate = useNavigate();
//const [cards,setCards] =useState<Array<Card>>([]);
const {user} = useAuth();

let length = cards.length === 0
function handleClick()
{
navigate('/addCard')
}
     return ( 
<>
      <Title mainText="Cards"
    subText="Here you can find business cards from all categories"></Title>
 <div className="avatar-container addWrap">
<Button onClick={handleClick}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AddIcon/>
          </Avatar>
</Button>
          </div>
{
  length  && 
<span className="text-center">You dont have cards yet</span>
}
{ cards &&

      cards.map(cardItem => <RecipeReviewCard handleDelete={()=>onDelete(cardItem._id)}  handleSetFave={ () => setFavCardFunctionClick(cardItem._id)} isRed={isRedHeart} handleUpdate={()=> onUpdate(cardItem._id)}
        
      handleWhatsapp={onClickPhone} handleShowDetails={onMoreDetails}  key={cardItem._id} {...cardItem} showCruds={true}/>)
}

 </>);
}

export default MyCard;