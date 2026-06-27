import { createContext, type ReactNode, useContext, useState } from "react";
import { type User, type UserLogin } from "../src/models/User";
import { loginUser } from "../src/features/auth/services/userService.ts";
import { useMutation } from "../src/hooks/useMutation.ts"
import { type AuthResponse } from "../src/models/AuthResponse.ts"

interface ContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => {};

}


const AuthContext = createContext<ContextType | undefined>(undefined);

interface authProps {
  children: ReactNode;
}



export const AuthContextProvider = ({ children }: authProps) => {

  //POST fetch hook
  const { mutantAsync, error, loading } = useMutation<AuthResponse, UserLogin>(loginUser);

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (username: string, password: string) => {
    try {
      //get a AuthResponse from server
      const res = await mutantAsync({ username, password });

      //Update auth state
      setAccessToken(res.accessToken);
      setUser(res.user);
      //save accessToken to local storage
      localStorage.setItem("accessToken", res.accessToken)
      setIsAuthenticated(true);
    } catch (err: any) {
      console.log("Something went wrong: " + err.message);
    }
  }

  const logout = async () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
  }


  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, logout, error, loading }}>{children}</AuthContext.Provider>

  )
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw Error("Povider is not defined in the scope")

  }
  return context;

}
