import { ActionType } from "../lib/actions";
import { FormError, ApiFormError, parseFormError } from "../lib/formError";

export interface User {
  id: number,
  name: string,
}

export interface SignupPayload {
  name: string,
  password: string,
}

export interface SigninPayload {
  name: string,
  password: string,
}

const serverURL = 'http://localhost:8080/api'

export type AuthData = {
  user: User;
  token: string;
}

export async function signup(payload: SignupPayload): Promise<ActionType<AuthData, FormError<SignupPayload>>> {
  const res = await fetch(`${serverURL}/auth/signup`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  console.log({res})
  if (!res.ok) {
    if (res.status === 400) {
      console.log('Bad Request')
      const json: ApiFormError<SignupPayload> = await res.json()
      const formError = parseFormError(json)
      return { success: false, error: formError }
    }
    return { success: false, error: { error: 'Something went wrong.' } }
  }
  const json: { token: string, user: User } = await res.json()
  saveUserToLocal(json.user, json.token)
  return { success: true, result: json }
}

export async function signin(payload: SigninPayload): Promise<ActionType<AuthData, FormError<SigninPayload>>> {
  const res = await fetch(`${serverURL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    if (res.status === 400) {
      const json: ApiFormError<SignupPayload> = await res.json()
      const formError = parseFormError(json)
      return { success: false, error: formError }
    }
    return { success: false, error: { error: 'Something went wrong.' } }
  }
  const json: { token: string, user: User } = await res.json()
  saveUserToLocal(json.user, json.token)
  return { success: true, result: json }
}

export function saveUserToLocal(user: User, token: string) {
  window.localStorage.setItem('user', JSON.stringify(user))
  window.localStorage.setItem('token', JSON.stringify(token))
}

export function getUserfromLocal() {
  const rawUser = window.localStorage.getItem('user')
  if (rawUser == '') {
    return undefined
  }
  const user: User = JSON.parse(rawUser)
  const token = window.localStorage.getItem('token')
  return { user, token }
}
export function clearUserData() {
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('token')
}
