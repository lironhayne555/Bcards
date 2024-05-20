
import { Context, createContext, useContext, useEffect, useState } from "react";
import { Card } from "./components/RecipeReviewCard";
import { deleteCard, getCardById, getCards, getFavorites, setFavorites } from "./services/CardServices";
import { boolean } from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Console, log } from "console";
import { useAuth } from "./AppContext";
import { User } from "./auth/SignUp";
import { getUser } from "./auth/TokenManager";
import { json } from "stream/consumers";
import { SearchContext } from "./searchContext";



interface CardContext {
cards: Array<Card>,
setCards: Function,
onAdd: Function,
favsCards: Array<Card>,
setFavsCards: Function,
setFavCardFunctionClick: Function,
isRedHeart: boolean,
setIsRedHeart: Function,
onDelete: Function,
showCrud:boolean,
setShowCruds:Function,
onUpdate: Function,
onClickPhone: Function,
onMoreDetails:Function
} 

export const CardContext = createContext<CardContext | null>(null);
export const CardContextProvider = ({children} : {children:React.ReactNode}) => {
const [cards, setCards] = useState<Array<Card>>([]);
const [favsCards, setFavsCards] = useState<Array<Card>>([]);
const [showCrud,setShowCruds] = useState(false);
const [filteredData, setFilteredData] = useState<Array<Card>>([]);
const [isRedHeart, setIsRedHeart] = useState(false);
const navigate = useNavigate();
const { searchValue } = useContext(SearchContext);

  const fetchCards =()=> getCards().then((json)=> {
      setCards(json);
      setFilteredData(json);
  });
  useEffect(()=>{
    fetchCards();
  })

  // useEffect(() => {
  //   const filtered = cards.filter(
  //     (item) =>
  //       item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       item.description?.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  //   setCards(filtered);
  // }, [searchValue, cards]);

async function onDelete(_id: string)
{
    console.log(_id);
if (window.confirm(`Are you sure to delete ${_id}?`)) {
    deleteCard(_id);
      const updated = [...cards].filter((card) => card._id !== _id);
      setCards(updated);

      toast.success("Card has been deleted.");
    }
}

function onUpdate(_id:string)
{
    navigate(`/editCard/${_id}`);
}
async function onAdd (){ 
       await getCards()
         .then(json => {
                setCards(json);
            })
}
function onClickPhone(_id: string) {
console.log("go to whatsapp");

}
function onMoreDetails(_id: string) {
 getCardById(_id).then((json) => {
navigate(`/cardDetails/${_id}`)
})


}

 async function handleSetFavs(_id: string, user:User) {
    await setFavorites(_id,user).then((json) => {});
  }

 const toggleRed = () => {
    setIsRedHeart(!isRedHeart);
  };
async function setFavCardFunctionClick(_id: string)
{
    console.log(_id + "set fave")
    handleSetFavs(_id, JSON.parse(localStorage.userData));
    toggleRed();
}


return <CardContext.Provider value={{ cards,setCards,onAdd, favsCards,setFavsCards,setFavCardFunctionClick,isRedHeart,setIsRedHeart, onDelete ,showCrud,setShowCruds,onUpdate,onClickPhone,onMoreDetails}}>
        {children}
    </CardContext.Provider>
}

export const useCardsContext = () => {
    const cardContext = useContext(CardContext);
    if(!cardContext) {
        throw new Error("The app was not wrapped with CardContextProvider!")
    }

    return cardContext;
}