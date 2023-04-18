import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useGetTweets = (docCollection, uid = null) =>{

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

                if(uid){
                    q = await query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"))
                }else{
                    q = await query(collectionRef, orderBy("createdAt", "desc"))
                }

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