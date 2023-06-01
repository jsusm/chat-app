import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { Show, createSignal } from "solid-js";
import { CreateChatPayload } from "../services/chats";
import { FormError } from "../lib/formError";
import { useChats } from "../context/chats";
import { useNavigate } from "@solidjs/router";

export default function CreateChat() {
  const [name, setName] = createSignal('')
  const [error, setError] = createSignal<FormError<CreateChatPayload>>({})
  const [loading, setLoading] = createSignal(false)
  const chats = useChats()
  const navigate = useNavigate()
  const onSubmit = (e: Event) => {
    e.preventDefault()
    setLoading(true)
    chats.create({ coupleName: name() })
      .then(res => {
        if (res.success === false) {
          setError(res.error)
          return
        }
        navigate('/')
      })
      .catch(() => setError({ error: 'Something went wrong.' }))
      .finally(() => setLoading(false))
  }
  return (
    <div class="bg-gray-50">
      <div class="flex justify-center items-center h-[100dvh]">
        <div class="grid max-w-[300px]">
          <h1 class="px-3 text-center text-xl font-extrabold text-slate-800">Who do you want to talk to?</h1>
          <Show when={error().error}>
            <p class="text-sm mt-3 bg-red-50 py-1 px-3 rounded drop-shadow-sm text-red-600 mx-auto text-center inline">
              {error().error}
            </p>
          </Show>
          <form onSubmit={onSubmit}>
            <div class="p-3 space-y-6">
              <TextInput
                label="Name"
                id="CoupleName"
                type="text"
                value={name()}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Andy"
                error={error().fieldError?.coupleName}
              />
              <div class="flex justify-center">
                <Button loading={loading()} class="w-full sm:w-auto" >
                  Start Chatting
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
