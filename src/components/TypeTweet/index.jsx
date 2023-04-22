// React hooks
import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import {Link} from "react-router-dom"

// My hooks
import { useInsertTweet } from '../../hooks/useInsertTweet'
import { useAuthValue } from '../../context/AuthContext'

// styles
import styles from "./style.module.css"
import "../../css/index.css"

const TypeTweet = () => {

    // States
    // Tweet
    const [tweet, setTweet] = useState("")
    const [inputError, setInputError] = useState(false)
    const [counterTweet, setCounterTweet] = useState(0) 
    const [tweetCharColor, setTweetCharColor] = useState(0) 
    // Tags
    const [tags, setTags] = useState("")
    const [tagsError, setTagsError] = useState(false)
    const [counterTag, setCounterTag] = useState(0) 
    const [tagCharColor, setTagCharColor] = useState(0) 
    
    
    // Hooks
    const {insertTweet, loading} = useInsertTweet("tweets")
    const textareaRef = useRef(null)
    const textareaTagsRef = useRef(null)
    const {user} = useAuthValue()
  
    // Constants
    const tweetCharLimit = 280
    const tagCharLimit = 80
  
    const handleAddTweet = async() => {
      setInputError(false)
  
      // Verificação se tweet não está em branco
      if(tweet.trim() === ''){
        setInputError("Você não pode enviar um tweet vazio")
        return
      }
      
      // Formatação de tags
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
  
      // Post do tweet 
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
        setCounterTag(0)
        setCounterTweet(0)
      }
    }
  
    // useEffects
    const resizeTextAreaTweet = () => {
      textareaRef.current.style.height = 64+"px";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    };
    const resizeTextAreaTags = () => {
      textareaTagsRef.current.style.height = 32+"px";
      textareaTagsRef.current.style.height = textareaTagsRef.current.scrollHeight + "px";
    };
  
    // Functions
    const charCounter = (element, chars, limit) =>{
      
      if(chars >= Math.floor((limit / 4 )* 3)){
        element === "textareaTweet" ? setTweetCharColor("#FF3535") : setTagCharColor("#FF3535")
      }else if(chars > Math.floor(limit / 2)){
        element === "textareaTweet" ? setTweetCharColor("#FFD541") : setTagCharColor("#FFD541")
      }else if(chars <= Math.floor(limit / 2)){
        element === "textareaTweet" ? setTweetCharColor("#6E6D73") : setTagCharColor("#6E6D73")
      }
    }
  
    useEffect(() => {resizeTextAreaTweet(); charCounter("textareaTweet", counterTweet, tweetCharLimit)}, [tweet]);
    useEffect(() => {resizeTextAreaTags(); charCounter("textareaTag", counterTag, tagCharLimit)}, [tags]);
  return (
    <>
        <div className={styles.type_tweet}>

            {/* avatar e inputs */}
            <div className={styles.insert_tweets}>
                {/* avatar */}
                <Link to="/perfil" className={styles.avatar_tweet}>
                {user && <img src={user.photoURL} alt="Seu avatar" />}
                </Link>

                {/* input */}
                <div className={styles.inputs_tweets}>
                <label>
                    <textarea name="tweet" ref={textareaRef} className={styles.textarea_tweet +" "+ (inputError ? (styles.inputError) : "")} placeholder='Type something here.' onChange={(e) => {setTweet(e.target.value); setInputError(false); setCounterTweet(e.target.value.length)} } value={tweet} maxLength={tweetCharLimit} required ></textarea>

                    <span><span style={{color: tweetCharColor}}>{counterTweet}</span>/{tweetCharLimit}</span>
                </label>
                <label>
                    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.5 0.75C4.5 0.335786 4.16421 0 3.75 0C3.33579 0 3 0.335786 3 0.75V3H0.75C0.335786 3 0 3.33579 0 3.75C0 4.16421 0.335786 4.5 0.75 4.5H3V8H0.75C0.335786 8 0 8.33579 0 8.75C0 9.16421 0.335786 9.5 0.75 9.5H3V11.75C3 12.1642 3.33579 12.5 3.75 12.5C4.16421 12.5 4.5 12.1642 4.5 11.75V9.5H8V11.75C8 12.1642 8.33579 12.5 8.75 12.5C9.16421 12.5 9.5 12.1642 9.5 11.75V9.5H11.75C12.1642 9.5 12.5 9.16421 12.5 8.75C12.5 8.33579 12.1642 8 11.75 8H9.5V4.5H11.75C12.1642 4.5 12.5 4.16421 12.5 3.75C12.5 3.33579 12.1642 3 11.75 3H9.5V0.75C9.5 0.335786 9.16421 0 8.75 0C8.33579 0 8 0.335786 8 0.75V3H4.5V0.75ZM4.5 4.5V8H8V4.5H4.5Z" fill='transparent'/>
                    </svg>
                    <textarea name="tags" className={styles.textarea_tags + " " + (inputError ? "" : tagsError ? styles.inputError : "")} ref={textareaTagsRef} placeholder='Add your hashtags here' onChange={(e) => {setTags(e.target.value); setCounterTag(e.target.value.length);setTagsError(false)}} value={tags} maxLength={tagCharLimit}></textarea>
                </label>
                    <span className={styles.span_tags}><span style={{color: tagCharColor}}>{counterTag}</span>/{tagCharLimit}</span>
                <hr />
                </div>

            </div>
            {/* Button */}
            <div className={styles.submit_tweet}>
                {!loading && (
                    <button className={(inputError ? styles.button_error : tagsError ? styles.button_error : "")} onClick={handleAddTweet}>
                        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.6358 11.3235C22.6432 10.7502 22.3327 10.2232 21.8283 9.94659L10.0748 3.48888C9.54835 3.19135 8.92777 3.2279 8.43171 3.56664C7.92654 3.91108 7.66798 4.73103 7.8092 5.32324L8.90644 9.92026C9.01908 10.3916 9.44096 10.7236 9.92633 10.7215L16.4671 10.7012C16.8021 10.6945 17.0737 10.9661 17.067 11.3011C17.066 11.6303 16.7983 11.898 16.4634 11.9047L9.91637 11.9199C9.431 11.9208 9.00705 12.2542 8.89149 12.7263L7.75545 17.3416C7.61751 17.887 7.77477 18.4315 8.1596 18.8163C8.20487 18.8616 8.2558 18.9125 8.30677 18.9521C8.80513 19.3366 9.4578 19.3856 10.015 19.0887L21.8084 12.6942C22.3145 12.4258 22.6283 11.8969 22.6358 11.3235Z" fill="#D2D1D7"/>
                        </svg>
                    </button>
                )}
                {loading && (
                    <button className="btn-loading" style={{background: "#393640"}}>
                        <span className="loadCircle"></span>
                    </button>
                )}
            </div>

        </div>
        {inputError ? <p className={styles.insert_erro}>{inputError}</p> : tagsError && <p className={styles.insert_erro}>{tagsError}</p>}
    </>
  )
}

export default TypeTweet