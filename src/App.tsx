import type { ReactElement } from "react";
import LoginPage from './features/auth/page/LoginPage/LoginPage.tsx';
import { AuthContextProvider } from "../context/authContext.tsx";

function App(): ReactElement {
  return (
    <AuthContextProvider>
      <LoginPage></LoginPage>
    </AuthContextProvider>

  )
}

export default App;
