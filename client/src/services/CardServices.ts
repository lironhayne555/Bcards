import { toast } from "react-toastify";
import { User } from "../auth/SignUp";
import { getToken } from "../auth/TokenManager";
import { Card } from "../components/RecipeReviewCard";

const serverUrl = 'http://localhost:8080/';
const cardsUrl = `${serverUrl}cards/`;


export async function addCards(cardForm: FormData) :Promise<Card>{
 const res = await fetch(`${cardsUrl}`, {
        method: 'POST',
        headers: {
            'x-auth-token': getToken()
        },
        body: cardForm
    })
if (! res.ok){
toast.error(res.statusText);
return res.json();
}
console.log(res)
return res.json();

}

export async function editCards(cardForm: FormData) :Promise<Card>{
 const res = await fetch(`${cardsUrl}`, {
        method: 'PATCH',
        headers: {
            'x-auth-token': getToken()
        },
        body: cardForm
    });
    return res.json();

}
export async function getCards(): Promise<Array<Card>> {
    const res = await fetch(`${cardsUrl}`);
    return res.json();
}

export async function getCardsByUser(userId: string): Promise<Card> {
    const res = await fetch(`${cardsUrl}user/${userId}`, {
        method: 'GET',
        headers: {
            'x-auth-token': getToken()
        }
    });
    return res.json();
}
export async function deleteCard(_id: string): Promise<Card>{
    const res = await fetch(`${cardsUrl}${_id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': getToken()
        },
    })
    return res.json()

}

export async function getCardById(_id: string): Promise<Card> {
    const res = await fetch(`${cardsUrl}${_id}`, {
        method: 'GET',
        headers: {
            'x-auth-token': getToken()
        }
    });
    return res.json();
}

export async function getFavorites(user: string): Promise<any> {
  const res = await fetch(`${cardsUrl}${user}/favs`, {
    method: 'GET',
    headers: {
      'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function setFavorites(_id: string, user: User ): Promise<Card> {
  const res = await fetch(`${cardsUrl}${_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    },
    body: JSON.stringify(user),
  });
  return res.json();
}