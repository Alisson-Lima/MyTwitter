import React, { useRef } from 'react'
import styles from "./style.module.css"
import Tweet from '../../components/Tweet'
import { useInsertTweet } from '../../hooks/useInsertTweet'
import { useState, useEffect } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import {Link} from "react-router-dom"
import "../../css/index.css"

const Home = () => {

  const {insertTweet, tweets, loading} = useInsertTweet("tweets")
  const [tweet, setTweet] = useState("")
  const [tags, setTags] = useState("")
  const {user} = useAuthValue()
  const [inputError, setInputError] = useState(false)
  const [tagsError, setTagsError] = useState(false)

  const textareaRef = useRef(null)

  const handleAddTweet = async() => {
    setInputError(false)
    
    // Verificação se tweet não está em branco
    if(tweet.trim() === ''){
      setInputError("Você não pode enviar um tweet vazio")
      return
    }

    const formatHashes = (tagBruta) =>{
      
      const tagsArr = tagBruta.toLowerCase().trim().split(" ")


      // Eliminando espaços em branco
      let whiteArr;
      for(let i = 0; tagsArr.includes("") ; i++){
        whiteArr = tagsArr.indexOf("")
        if(whiteArr >= 0){
          tagsArr.splice(whiteArr, 1)
        }
      }

      // Verificar se é uma hashtag válida e adiciona em um array de hashtags validas
      let testEspecialChar
      let tagsArrRef = tagsArr
      let tagsOficialFormated = []
      for(let i=0; i < tagsArr.length ;i++){
        testEspecialChar = tagsArrRef[i].replace(/[^a-z0-9]/gi,'')
        if(tagsArrRef[i].length > 1 && testEspecialChar === ""){
          setTagsError("Não insira somente caracteres especiais em suas hashtags.")
          i = tagsArr.length
          return
        }else if(tagsArrRef[i].length === 1 && testEspecialChar === ""){
          setTagsError("Não insira caracteres especiais isolados.")
          i = tagsArr.length
          return
        }else if(tagsArrRef[i].includes("@")){
          setTagsError("As hashtags não podem conter @")
          i = tagsArr.length
          return
        }

        let corrected = tagsArrRef[i].replace(/,/g,"").replace(/\./g, "").replace(/#/gi, "").replace(/#/gi, "")
        tagsOficialFormated.push(corrected)       
        
      }
      
      // Retorna um array de hashtags válidas
      return tagsOficialFormated

    }

    const tagsOficial = formatHashes(tags)
    if(tagsOficial === undefined){
        return
    }else{
      
      const newTweet = {
        tweet: tweet.trim(),
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

  const resizeTextArea = () => {
    textareaRef.current.style.height = 64+"px";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  useEffect(resizeTextArea, [tweet]);


  return (
    <div>
      <main className="main_container">
        <div className="main_container_inbox">

          <div className={styles.type_tweet}>

            {/* avatar e inputs */}
            <div className={styles.insert_tweets}>
                {/* avatar */}
                <Link to="/perfil" className={styles.avatar_tweet}>
                  {user && <img src={user.photoURL} alt="Seu avatar" />}
                </Link>

                {/* input */}
                <div className={styles.inputs_tweets}>
                  <textarea name="tweet" ref={textareaRef} className={styles.textarea_tweet +" "+ (inputError ? (styles.inputError) : "")} placeholder='Type something here.' onChange={(e) => {setTweet(e.target.value);} } value={tweet} maxLength="280" required ></textarea>

                  <label className={inputError ? "" : tagsError ? (styles.inputError) : "" } >
                    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.5 0.75C4.5 0.335786 4.16421 0 3.75 0C3.33579 0 3 0.335786 3 0.75V3H0.75C0.335786 3 0 3.33579 0 3.75C0 4.16421 0.335786 4.5 0.75 4.5H3V8H0.75C0.335786 8 0 8.33579 0 8.75C0 9.16421 0.335786 9.5 0.75 9.5H3V11.75C3 12.1642 3.33579 12.5 3.75 12.5C4.16421 12.5 4.5 12.1642 4.5 11.75V9.5H8V11.75C8 12.1642 8.33579 12.5 8.75 12.5C9.16421 12.5 9.5 12.1642 9.5 11.75V9.5H11.75C12.1642 9.5 12.5 9.16421 12.5 8.75C12.5 8.33579 12.1642 8 11.75 8H9.5V4.5H11.75C12.1642 4.5 12.5 4.16421 12.5 3.75C12.5 3.33579 12.1642 3 11.75 3H9.5V0.75C9.5 0.335786 9.16421 0 8.75 0C8.33579 0 8 0.335786 8 0.75V3H4.5V0.75ZM4.5 4.5V8H8V4.5H4.5Z" fill='transparent'/>
                    </svg>
                    <textarea name="tags" placeholder='Add your hashtags here' onChange={(e) => {setTags(e.target.value); setTagsError(false)}} value={tags} maxLength="80"></textarea>
                  </label>

                  <hr />
                </div>

            </div>
            {/* Button */}
            <div className={styles.submit_tweet}>
              {!loading && (
                  <button className={inputError ? styles.button_error : tagsError ? styles.button_error : ""} onClick={handleAddTweet}>
                    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.6358 11.3235C22.6432 10.7502 22.3327 10.2232 21.8283 9.94659L10.0748 3.48888C9.54835 3.19135 8.92777 3.2279 8.43171 3.56664C7.92654 3.91108 7.66798 4.73103 7.8092 5.32324L8.90644 9.92026C9.01908 10.3916 9.44096 10.7236 9.92633 10.7215L16.4671 10.7012C16.8021 10.6945 17.0737 10.9661 17.067 11.3011C17.066 11.6303 16.7983 11.898 16.4634 11.9047L9.91637 11.9199C9.431 11.9208 9.00705 12.2542 8.89149 12.7263L7.75545 17.3416C7.61751 17.887 7.77477 18.4315 8.1596 18.8163C8.20487 18.8616 8.2558 18.9125 8.30677 18.9521C8.80513 19.3366 9.4578 19.3856 10.015 19.0887L21.8084 12.6942C22.3145 12.4258 22.6283 11.8969 22.6358 11.3235Z" fill="#D2D1D7"/>
                    </svg>
                  </button>
              )}
              {loading && (
                <button className={"btn-loading"}>
                  <span className="loadCircle"></span>
                </button>
              )}
            </div>

          </div>
            {inputError ? <p className={styles.insert_erro}>{inputError}</p> : tagsError && <p className={styles.insert_erro}>{tagsError}</p>}

          <hr />

          <div className={styles.tweets}>
            {
              loading && <span className='load_tweets'><div className="loadCircle"></div></span>
            }
              {
                tweets && (tweets.map(tweetInfo =>(
                  <Tweet key={tweetInfo.id} data={tweetInfo}/>
                )))
              }
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home