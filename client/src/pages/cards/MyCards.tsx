import { Avatar, Button } from "@mui/material";
import FormLayout from "../../components/FormLayout";
import RecipeReviewCard from "../../components/RecipeReviewCard";
import Title from "../../components/Title";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

function MyCard() {
const navigate = useNavigate();
function handleClick()
{
navigate('/addCard')
}
    return (  <>
      <Title mainText="Cards"
    subText="Here you can find business cards from all categories"></Title>
    <RecipeReviewCard></RecipeReviewCard>

     <div className="avatar-container">
<Button onClick={handleClick}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AddIcon/>
          </Avatar>
</Button>
          </div>

        </>
);
}

export default MyCard;