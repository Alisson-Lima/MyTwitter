import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useGetTweets = (docCollection, uid = null) =>{

    const [tweets, setTweets] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    useEffect(()=>{

        const loadData = async() =>{
            checkIfIsCancelled()
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

    useEffect(()=>{
        return () => setCancelled(true)
    },[])

    const search = async(tag) =>{
        checkIfIsCancelled()
        setError(null)
        setLoading(true)
        try {
            const collectionRef = await collection(db, docCollection)
            let q = await query(collectionRef, where("tags", "array-contains", tag), orderBy("createdAt", "desc"))
            await onSnapshot(q, (querySnapshot) =>{
                setTweets(
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
            })
        } catch (error) {
            console.log(error.message)
        }
        
    }


    return {tweets, loading, error, search}
}