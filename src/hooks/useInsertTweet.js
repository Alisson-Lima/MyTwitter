import { db } from "../firebase/config"
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
export const useInsertTweet = (docCollection) =>{

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cancelled, setCancelled] = useState(false)
    const [refresh, setRefresh] = useState(null)
    const [tweets, setTweets] = useState(null)

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
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"}
            const postDate = date.toLocaleDateString("pt-br", options)
            
            let q

            const newTweet = {...tweetData, createdAt: Timestamp.now(), postCreatedData: postDate}
            const res = await addDoc(collection(db, docCollection), newTweet)
            setRefresh(res)
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

    useEffect(()=>{
        const refreshData = async()=>{
            const collectionRef = await collection(db, docCollection)
            let q = await query(collectionRef, orderBy("createdAt", "desc"))
            await onSnapshot(q, (querySnapshot) =>{
                setTweets(
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
            })
        }
        refreshData()
    },[refresh])

    return {insertTweet, tweets, error, loading}
}