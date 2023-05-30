import { Show } from "solid-js";
import { useAuth } from "../context/auth";
import { Button } from "./Button";

export const Profile = (props: { name: string, onLogout: () => void }) => (
  <div class="flex gap-3 items-center">
    <div class="w-9 aspect-square rounded-full overflow-hidden" >
      <img src={`https://api.dicebear.com/6.x/micah/svg?seed=${props.name}`} />
    </div>
    <span class="font-medium">
      {props.name}
    </span>
    <span class="w-[2px] bg-gray-300 py-3" />
    <Button 
    onClick={props.onLogout}
    class="px-3 py-1 text-sm bg-transparent text-gray-800 border border-gray-300 bg-gray-50 drop-shadow-sm hover:bg-gray-100 active:bg-gray-200"
    >
      logout
    </Button>
  </div>
)

export function Header() {
  const auth = useAuth()
  return (
    <header class="flex justify-between items-center px-4 py-3 sm:px-8">
      <span class="text-lg font-extrabold text-gray-800">
        Chat app
      </span>
      <Show when={auth.data?.user}>
        <Profile name={auth.data.user.name} onLogout={auth.logout} />
      </Show>
    </header>
  )
}
