// React Router Dom
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

// Hooks
import { useEffect, useState } from "react";

// Authentication
import { AuthProvider } from "./context/AuthContext"
import { onAuthStateChanged } from "@firebase/auth"
import { useAuthentication } from "./hooks/useAuthentication";

// Components
import Nav from "./components/Nav";

// Pages
import Explorer from "./pages/Explorer";
import MyPerfil from "./pages/MyPerfil";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import VerifyEmail from "./pages/VerifyEmail";

// Styles
import "./css/index.css"

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => setUser(user))
  },[auth])

  if(loadingUser){
    return <div className="loadCircle"></div>
  }

  return (
    <div id="App">
          <AuthProvider value={{ user }}>
            <BrowserRouter>
              {user && <Nav />}
              <Routes>
                <Route
                  path="/verifyemail"
                  element={
                    user ? (
                      user.emailVerified ? (
                        <Navigate to="/home" />
                      ) : (
                        <VerifyEmail />
                      )
                    ) : (
                      <LoginRegister />
                    )
                  }
                />
                <Route
                  path="/"
                  element={
                    user ? (
                      user.emailVerified ? (
                        <Navigate to="/home" />
                      ) : (
                        <Navigate to="/verifyemail" />
                      )
                    ) : (
                      <LoginRegister />
                    )
                  }
                />
                <Route
                  path="/home"
                  element={
                    user ? (
                      user.emailVerified ? (
                        <Home />
                      ) : (
                        <Navigate to="/verifyemail" />
                      )
                    ) : (
                      <LoginRegister />
                    )
                  }
                />
                <Route
                  path="/explorer"
                  element={
                    user ? (
                      user.emailVerified ? (
                        <Explorer />
                      ) : (
                        <Navigate to="/verifyemail" />
                      )
                    ) : (
                      <LoginRegister />
                    )
                  }
                />
                <Route
                  path="/perfil"
                  element={
                    user ? (
                      user.emailVerified ? (
                        <MyPerfil />
                      ) : (
                        <Navigate to="/verifyemail" />
                      )
                    ) : (
                      <LoginRegister />
                    )
                  }
                />
                <Route path="*" element={<p>Not found</p>} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
    </div>
  );
}

export default App;
