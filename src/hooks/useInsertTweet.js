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

            let date = new Date()

            const postDate = date.toLocaleDateString("pt-br", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric"
            })

            const newTweet = {...tweetData, createdAt: postDate}
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