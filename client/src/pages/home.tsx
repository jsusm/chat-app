import { Show } from "solid-js"
import LandingSection from "../components/Landing"
import Chat from "../components/Chat"
import { useAuth } from "../context/auth"

export default function Home() {
  const auth = useAuth()
  return (
    <Show when={auth.data()} fallback={<LandingSection />}>
      <Chat />
    </Show>
  )
}
