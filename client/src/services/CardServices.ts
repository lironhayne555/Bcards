import { toast } from "react-toastify";
import { User } from "../auth/SignUp";
import { getToken } from "../auth/TokenManager";
import { Card } from "../components/RecipeReviewCard";

const serverUrl = "http://localhost:8080/";
const cardsUrl = `${serverUrl}cards/`;

export async function addCards(cardForm: Card): Promise<Card> {
  console.log(cardForm);

  const res = await fetch(`${cardsUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getToken(),
    },
    body: JSON.stringify(cardForm),
  });
  console.log(res);

  if (!res.ok) {
    toast.error("error add card");
    return res.json();
  }
  return res.json();
}

export async function editCards(_id: any, cardForm: FormData): Promise<Card> {
  const res = await fetch(`${cardsUrl}${_id}`, {
    method: "PATCH",
    headers: {
      //'Content-Type': 'multipart/form-data',
      "x-auth-token": getToken(),
    },
    body: cardForm,
  });
  if (!res.ok) {
    toast.error("error edit card");
    return res.json();
  }
  return res.json();
}
export async function getCards(): Promise<Array<Card>> {
  const res = await fetch(`${cardsUrl}`);
  return res.json();
}

export async function getCardsByUser(_id: string): Promise<Card> {
  const res = await fetch(`${cardsUrl}user/${_id}`, {
    method: "GET",
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return res.json();
}
export async function deleteCard(_id: string): Promise<Card> {
  const res = await fetch(`${cardsUrl}${_id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": getToken(),
    },
  });
  if (!res.ok) {
    toast.error("error delete card");
    return res.json();
  }
  return res.json();
}

export async function getCardById(_id: string): Promise<Card> {
  const res = await fetch(`${cardsUrl}${_id}`, {
    method: "GET",
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return res.json();
}

export async function getFavorites(_id: string): Promise<Array<Card>> {
  const res = await fetch(`${cardsUrl}${_id}/favs`, {
    method: "GET",
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return res.json();
}
export async function getMyCards(_id: string): Promise<Array<Card>> {
  const res = await fetch(`${cardsUrl}${_id}/myCards`, {
    method: "GET",
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return res.json();
}
export async function setFavorites(_id: string, userId: String): Promise<Card> {
  const res = await fetch(`${cardsUrl}${_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getToken(),
    },
    body: JSON.stringify(userId),
  });
  return res.json();
}
