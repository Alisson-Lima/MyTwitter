import { useState, useEffect } from "react";
import {updateProfile} from "@firebase/auth"

export const useUpdateUserInfo = () =>{

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    useEffect(()=>{
        return () => setCancelled(true)
    },[])

    const update = async(data) =>{
        checkIfIsCancelled()
        setError(null)
        setLoading(true)
        try {
            await updateProfile(data.user, {
                displayName: data.newName,
                photoURL: data.newAvatar
            })
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        }

    }



    return{update, loading, error}
}