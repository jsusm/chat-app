import { ActionType } from "../lib/actions";
import { serverUrl } from "./shared";

export type RawMessage = {
  id: number;
  authorId: number;
  createdAt: number;
  content: string;
}

export type Message = {
  id: number;
  authorId: number;
  createdAt: Date;
  content: string;
}

export async function fetchMessages(token: string, chatId: number): Promise<ActionType<Message[]>> {
  const res = await fetch(`${serverUrl}/messages/${chatId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  if (!res.ok) {
    return { success: false, error: { message: 'Something went wrong.' } }
  }
  const json: RawMessage[] = await res.json()
  const messages = json.map((x) => ({ ...x, createdAt: new Date(x.createdAt) }))
  return { success: true, result: messages }
}

export type CreateMessagePayload = {
  content: string
}

export async function createMessage(token: string, chatId: number, payload: CreateMessagePayload,): Promise<ActionType<Message>> {
  const res = await fetch(`${serverUrl}/messages/${chatId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    return { success: false, error: { message: 'Something went wrong.' } }
  }
  const json: RawMessage = await res.json()
  const messages = { ...json, createdAt: new Date(json.createdAt) }
  return { success: true, result: messages }
}
