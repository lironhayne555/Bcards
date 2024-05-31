import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AppContext";
import { getCardById } from "../services/CardServices";
import { Card } from "./RecipeReviewCard";

export const useRecipeReviewCard = () => {
  const [stateChange, setStateChange] = useState(true);
  const [showCrud, setShowCruds] = useState(false);
  const [favsCards, setFavsCards] = useState<Array<Card>>([]);
  //const [myCards, setMyCards] = useState<Array<Card>>([]);
  const [favsStatus, setFavsStatus] = useState<{ [key: string]: boolean }>({});

  const navigate = useNavigate();
  const { user } = useAuth();

  function onClickPhone(_id: string) {
    console.log("go to whatsapp");
  }

  function onMoreDetails(_id: string) {
    getCardById(_id).then((json) => {
      navigate(`/cardDetails/${_id}`);
    });
  }

  return {
    stateChange,
    setStateChange,
    showCrud,
    setShowCruds,
    favsStatus,
    setFavsStatus,
    onClickPhone,
    onMoreDetails,
  };
};
