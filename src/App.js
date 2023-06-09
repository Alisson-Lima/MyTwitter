import "./css/index.css"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";

import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext"
import {onAuthStateChanged} from "firebase/auth"
import { useAuthentication } from "./hooks/useAuthentication";
import Nav from "./components/Nav";
import Explorer from "./pages/Explorer";
import MyPerfil from "./pages/MyPerfil";

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
      
      <AuthProvider value={{user}}>
        <BrowserRouter>
        {user && <Nav/>}
          <Routes>
            <Route path="/" element={user ? <Navigate to="/home"/> : <LoginRegister/>}/>
            <Route path="/home" element={user ? <Home/> : <LoginRegister/>}/>
            <Route path="/explorer" element={user ? <Explorer/> : <LoginRegister/>}/>
            <Route path="/perfil" element={user ? <MyPerfil/> : <LoginRegister/>}/>
            <Route path="*" element={<p>Not found</p>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
