import { User } from "./SignUp";

const tokenKey = 'token';
const userKey = "userData";

export function setToken(tokenValue?: string) {
    if (!tokenValue) return;
    localStorage.setItem(tokenKey, tokenValue);
}

export function getToken(): string {
    return localStorage.getItem(tokenKey) || '';
}

export function removeToken() {
    localStorage.removeItem(tokenKey);
}

export function verifyToken(): boolean {
    return getToken().length > 0;
}

export function setUser(user: User | null) {
  if (user) {
    const jsonUser = JSON.stringify(user);

    localStorage.setItem(userKey, jsonUser);
  }
}

export function getUser() {
  const jsonUser = localStorage.getItem(userKey);
  if (jsonUser) {
    const parsedUser = JSON.parse(jsonUser);
    return parsedUser;
  }
}

export function removeUser() {
  localStorage.removeItem("userData");
  localStorage.removeItem(tokenKey);
  window.location.reload()
}