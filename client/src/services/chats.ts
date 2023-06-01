import { ActionType } from "../lib/actions";
import { ApiFormError, FormError, parseFormError } from "../lib/formError";
import { serverUrl } from "./shared";

export type ChatInstance = {
  id: number;
  subId: number;
  member: {
    id: number;
    name: string;
  }
}

export async function fetchChats(token: string): Promise<ActionType<ChatInstance[]>> {
  const res = await fetch(`${serverUrl}/chats`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if (!res.ok) {
    return { success: false, error: { message: 'Something went wrong.' } }
  }

  const json: ChatInstance[] = await res.json()
  return { success: true, result: json }
}

export type CreateChatPayload = {
  coupleName: string
}

export async function createChat(token: string, payload: CreateChatPayload): Promise<ActionType<null, FormError<CreateChatPayload>>> {
  const res = await fetch(`${serverUrl}/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
  if(!res.ok || res.status !== 201){
    if(res.status === 400){
      const json: ApiFormError<CreateChatPayload> = await res.json()
      const formError = parseFormError(json)
      return { success: false, error: formError }
    }
    return { success: false, error: { error: 'Something went wrong.' }}
  }
  return { success: true, result: null}
}
