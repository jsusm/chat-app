import { Show } from "solid-js"
import LandingSection from "../components/Landing"
import Chat from "../components/Chat/chat"
import { useAuth } from "../context/auth"

export default function Home() {
  const auth = useAuth()
  return (
    <div class="bg-gray-50 isolate h-screen max-h-screen flex flex-col">
      <Show when={auth.data().user} fallback={<LandingSection />}>
        <Chat />
      </Show>
    </div>
  )
}
