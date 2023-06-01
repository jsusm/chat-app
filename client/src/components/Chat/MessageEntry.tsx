import { Component } from "solid-js"
import { useAuth } from "../../context/auth"
import { Message } from "../../services/messages"

export const MessageEntry: Component<Message> = (props) => {
  const auth = useAuth()
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    timeStyle: 'short'
  }
  return (
    <div classList={{
          "self-end text-end": auth.data().user.id === props.authorId,
          "self-start": auth.data().user.id !== props.authorId,
      }}>
      <div
        class="px-3 py-1.5 rounded-md max-w-[300px] drop-shadow"
        classList={{
          "bg-blue-600 text-gray-50": auth.data().user.id === props.authorId,
          "text-gray-800 border border-gray-300": auth.data().user.id !== props.authorId,
        }}>
        <p class="font-medium">
          {props.content}
        </p>
      </div>
        <p class="text-xs pt-1 text-gray-500">
          {new Intl.DateTimeFormat('en-US', dateFormatOptions).format(props.createdAt)}
        </p>
    </div>
  )
}
