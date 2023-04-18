import { db } from "../firebase/config"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { useState, useEffect } from "react"
export const useInsertTweet = (docCollection) =>{

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    const insertTweet = async(tweetData) =>{
        checkIfIsCancelled()
        setError(null)
        setLoading(true)

        try {
            const newTweet = {...tweetData, createdAt: Timestamp.now()}
            await addDoc(collection(db, docCollection), newTweet)
            setLoading(false)
        } catch (error) {
            console.log("Error")
            setLoading(false)
            setError(error.message)
        }

    }

    useEffect(()=>{
        return () => setCancelled(true)
    },[])

    return {insertTweet, error, loading}
}