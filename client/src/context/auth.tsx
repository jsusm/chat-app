import { ParentProps, createContext, createSignal, useContext } from "solid-js";
import { AuthData, SigninPayload, SignupPayload, signin as _signin, signup as _signup, clearUserData } from "../services/auth";

export const AuthContext = createContext<
  {
    data: AuthData | undefined
    signup(payload: SignupPayload): ReturnType<typeof _signup>
    signin(payload: SigninPayload): ReturnType<typeof _signin>
    logout(): void
  }
>()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider(props: ParentProps) {
  const [auth, setAuth] = createSignal<AuthData | undefined>(undefined)
  const signup = async (payload: SignupPayload) => {
    const res = await _signup(payload)
    if (!res.success) {
      return res
    }
    setAuth(res.result)
    return res
  }
  const signin = async (payload: SigninPayload) => {
    const res = await _signin(payload)
    if (!res.success) {
      return res
    }
    setAuth(res.result)
    return res
  }
  const logout = () => {
    clearUserData()
    setAuth(undefined)
  }
  return (
    <AuthContext.Provider value={{ data: auth(), signup, signin, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}
