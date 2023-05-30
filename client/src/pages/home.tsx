import { Show } from "solid-js"
import { Header } from "../components/Header"
import LandingSection from "../components/Landing"
import { useAuth } from "../context/auth"

export default function Home() {
  const auth = useAuth()
  return (
    <div class="bg-gray-50 isolate min-h-screen">
      <Header />
      <Show when={!auth.data()}>
        <LandingSection />
      </Show>
    </div>
  )
}
