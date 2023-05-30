import { Show, createSignal } from "solid-js";
import { TextInput } from "../components/TextInput";
import { useAuth } from "../context/auth";
import { FormError } from "../lib/formError";
import { SignupPayload } from "../services/auth";
import { useNavigate } from "@solidjs/router";
import { Button } from "../components/Button";

export default function SigninPage() {
  const [name, setName] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal<FormError<SignupPayload>>({})
  const [loading, setLoading] = createSignal(false)
  const navigate = useNavigate()
  const auth = useAuth()

  const onSubmit = (e: Event) => {
    e.preventDefault()
    setLoading(true)
    auth.signin({ name: name(), password: password() })
      .then(res => {
        if (res.success === false) {
          setError(res.error)
          return
        }
        navigate('/')
      })
      .catch(() => {
        setError({ error: 'Something went grong :(' })
      })
      .finally(() => setLoading(false))
  }

  return (
    <div class="bg-gray-50">
      <div class="flex justify-center items-center h-[100dvh]">
        <div class="grid max-w-[280px]">
          <h1 class="text-center text-3xl font-extrabold text-slate-800">Sign in</h1>
          <Show when={error().error}>
            <p class="text-sm mt-3 bg-red-50 py-1 px-3 rounded drop-shadow-sm text-red-600 mx-auto text-center inline">
              {error().error}
            </p>
          </Show>
          <form onSubmit={onSubmit}>
            <div class="p-3 space-y-6">
              <TextInput
                label="Name"
                id="UserName"
                type="text"
                value={name()}
                onChange={e => setName(e.currentTarget.value)}
                error={error().fieldError?.name}
              />
              <TextInput
                label="Password"
                id="Password"
                type="password"
                value={password()}
                onChange={e => setPassword(e.currentTarget.value)}
                error={error().fieldError?.password}
              />
              <div class="flex justify-center">
                <Button loading={loading()} class="w-full sm:w-auto" >
                  Sign in
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
