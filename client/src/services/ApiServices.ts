import { error, log } from "console";
import { User } from "../auth/SignUp";
import { getToken } from "../auth/TokenManager";
import { Card, FullCard } from "../components/RecipeReviewCard";
import { json } from "stream/consumers";
import { RssFeed } from "@mui/icons-material";
import { toast } from "react-toastify";

const serverUrl = "http://localhost:8080/";
const usersUrl = `${serverUrl}users/`;

export async function setFavorites(_id: string, userId: String): Promise<Card> {
  const res = await fetch(`${usersUrl}${_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getToken(),
    },
    body: JSON.stringify({ userId }),
  });

  return res.json();
}

export async function signup(userForm: User): Promise<User> {
  userForm.favorites = [];
  const res = await fetch(`${usersUrl}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm),
  });
  if (!res.ok) {
    toast.error(" ");
    return res.json();
  }

  return res.json();
}
export async function signin(userForm: User): Promise<User> {
  const res = await fetch(`${usersUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm),
  });
  return res.json();
}

export async function getFavorites(_id: string): Promise<Array<FullCard>> {
  const res = await fetch(`${usersUrl}${_id}/favs`, {
    method: "GET",
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return res.json();
}

export async function getUsers(): Promise<Array<User>> {
  const res = await fetch(`${usersUrl}`);
  return res.json();
}
export async function getUserDetails(userId:string):Promise<User> {
   const res = await fetch(`${usersUrl}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId)
});
  return res.json();
}
export async function editUserFunction(_id: string, user: User): Promise<User> {
  const res = await fetch(`${usersUrl}${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getToken(),
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    toast.error("error edit user");
    return res.json();
  }
  return res.json();
}
export async function deleteUser(_id: string): Promise<User> {
  const res = await fetch(`${usersUrl}${_id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    toast.error("error delete user");
    return res.json();
  }
  return res.json();
}
