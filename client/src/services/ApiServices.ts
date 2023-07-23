import { User } from "../auth/SignUp";
import { getToken } from "../auth/TokenManager";
import { Card } from "../pages/cards/AddCard";


const serverUrl = 'http://localhost:3000/';
const cardsUrl = `${serverUrl}cards`;
const usersUrl = `${serverUrl}users/`;

export async function signup(user: User): Promise<User> {
    const res = await fetch(`${usersUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}


export async function signin(user: User): Promise<User> {
    const res = await fetch(`${usersUrl}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}


export async function addCards(card: Card) :Promise<Card>{


console.log(getToken());
console.log(card);

 const res = await fetch(`${cardsUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        },
        body: JSON.stringify(card)
    });
    return res.json();

}