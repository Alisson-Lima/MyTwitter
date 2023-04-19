import React from 'react'
import styles from "./style.module.css"
import Tweet from '../../components/Tweet'
import { useInsertTweet } from '../../hooks/useInsertTweet'
import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useGetTweets } from '../../hooks/useGetTweets'
import {Link} from "react-router-dom"
import "../../css/index.css"

const Home = () => {

  const {insertTweet, loading} = useInsertTweet("tweets")
  const [tweet, setTweet] = useState("")
  const [tags, setTags] = useState("")
  const {user} = useAuthValue()
  const [inputError, setInputError] = useState(false)
  const {tweets} = useGetTweets("tweets")
  const [tagsError, setTagsError] = useState(false)

  const handleAddTweet = async() => {

    if(tweet === ""){
      setInputError(true)
      return
    }

    setInputError(false)

    const formatHashes = (tagBruta) =>{
      
      const tagsArr = tagBruta.split(" ") 

      // Eliminando espaços em branco
      let whiteArr = tagsArr.indexOf("")
      for(let i = 0; tagsArr.includes("") ; i++){
        whiteArr = tagsArr.indexOf("")
        if(whiteArr > 0){
          tagsArr.splice(whiteArr, 1)
        }else{
          return
        }
      }

      const tagsArrBruto = tagBruta.split('')
      const tagsHashVerify = tagsArrBruto.includes("#")
      const tagsVirgVerify = tagsArrBruto.includes(",")

      if(!tagsHashVerify && !tagsVirgVerify){
        return tagsArr
      }

      setTagsError(true)
      return 

    }

    const tagsOficial = formatHashes(tags)
    if(tagsOficial === undefined){
      return
    }else{
      
      const newTweet = {
        tweet,
        tags: tagsOficial,
        tweetedBy: user.displayName,
        uid: user.uid,
        userAvatar: user.photoURL,
      }
  
      await insertTweet(newTweet)
  
      setTags("")
      setTweet("")
    }


  }

  return (
    <div>
      <main className="main_container">
        <div className="main_container_inbox">

          <div className={styles.type_tweet}>

            <Link to="/perfil" className="my_avatar">
              {user && <img src={user.photoURL} alt="Seu avatar" />}
            </Link>

            <div className={styles.inputs}>
              <input type="text" name="tweet" className={inputError === true ? (styles.inputError) : ""} placeholder='Type something' onChange={(e) => setTweet(e.target.value) } value={tweet} />

              <input type="text" name="tags" className={tagsError === true ? (styles.inputError) : ""} placeholder='Tags' onChange={(e) => {setTags(e.target.value); setTagsError(false)}} value={tags}/>
              {tagsError && <span>Não é necessário colocar <b>#</b> ou <b>,</b> nas tags.</span>}

              {!loading && (
                <button onClick={handleAddTweet}>
                  <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.6358 11.3235C22.6432 10.7502 22.3327 10.2232 21.8283 9.94659L10.0748 3.48888C9.54835 3.19135 8.92777 3.2279 8.43171 3.56664C7.92654 3.91108 7.66798 4.73103 7.8092 5.32324L8.90644 9.92026C9.01908 10.3916 9.44096 10.7236 9.92633 10.7215L16.4671 10.7012C16.8021 10.6945 17.0737 10.9661 17.067 11.3011C17.066 11.6303 16.7983 11.898 16.4634 11.9047L9.91637 11.9199C9.431 11.9208 9.00705 12.2542 8.89149 12.7263L7.75545 17.3416C7.61751 17.887 7.77477 18.4315 8.1596 18.8163C8.20487 18.8616 8.2558 18.9125 8.30677 18.9521C8.80513 19.3366 9.4578 19.3856 10.015 19.0887L21.8084 12.6942C22.3145 12.4258 22.6283 11.8969 22.6358 11.3235Z" fill="#D2D1D7"/>
                  </svg>
                </button>
              )}
              {loading && (
                <button className="btn-loading">
                  <span className="loadCircle"></span>
                </button>
              )}
              
            </div>

          </div>

          <hr />

          <div className={styles.tweets}>
              {
                tweets && tweets.map(tweetInfo =>(
                  <Tweet key={tweetInfo.id} data={tweetInfo}/>
                ))
              }
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home