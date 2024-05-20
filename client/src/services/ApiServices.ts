import { error, log } from "console";
import { User } from "../auth/SignUp";
import { getToken, getUser } from "../auth/TokenManager";
import { Card } from "../components/RecipeReviewCard";
import { json } from "stream/consumers";
import { RssFeed } from "@mui/icons-material";
import { toast } from "react-toastify";


const serverUrl = 'http://localhost:8080/';
const usersUrl = `${serverUrl}users/`;

export async function signup(user: User): Promise<User> {
    const res = await fetch(`${usersUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (! res.ok){
        toast.error(" ");
        return res.json();
        }


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

