import {getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithEmailAndPassword, signOut, } from "@firebase/auth"
import { useState, useEffect } from "react"
// import {db} from "../firebase/config"

export const useAuthentication = () => {

    // Variáveis
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    useEffect(()=>{
        return () => setCancelled(true)
    },[])

    // Criar usuário
    const createUser = async (data) => {
        setLoading(true)
        setError("")
        checkIfIsCancelled()
        try{
            const {user} = await createUserWithEmailAndPassword(auth, data.email, data.pass)
            
            await sendEmailVerification(user);

            await updateProfile(user, {
                displayName: data.name,
                photoURL: data.avatar
            })
            setLoading(false)
            return user
        }catch (err){

            let systemErrorMessage = null
            
            if(err.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            }else if(err.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";
            }else if(err.message.includes("userInternal.getIdToken")){
                systemErrorMessage = "Erro interno do servidor, tente mais tarde"
            }else{
                systemErrorMessage = "Ocorreu um erro inesperado, por favor tentar mais tarde.";
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    // Logout
    const logout = () =>{
        checkIfIsCancelled()
        signOut(auth)
    }

    const login = async (data) =>{
        
        setLoading(true)
        checkIfIsCancelled()
        setError(null)

        try{
            await signInWithEmailAndPassword(auth, data.email, data.pass)
            setLoading(false)
        }catch(error){
            let systemErrorMessage;

            if(error.message.includes("user-not-found")){
                systemErrorMessage = "Usuário não encontrado"
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha ou usuário incorretos"
            }else{
                systemErrorMessage = "Ocorreu um erro. Por favor, tente mais tarte"
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    return {auth, createUser, logout, login, error, loading}
}