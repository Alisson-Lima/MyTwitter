import { collection, query, orderBy, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useGetTweets = (docCollection) =>{

    const [tweets, setTweets] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    useEffect(()=>{

        const loadData = async() =>{
            if(cancelled) return 
            setLoading(true)
            const collectionRef = await collection(db, docCollection)
            try {    
                let q;

                q = await query(collectionRef, orderBy("createdAt", "desc"))

                await onSnapshot(q, (querySnapshot) =>{
                    setTweets(
                        querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                })

                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error.message)
                setLoading(false)
            }
        }

        loadData()

    }, [docCollection, cancelled])


    return {tweets, loading, error}
}