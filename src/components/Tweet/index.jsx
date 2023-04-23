// React hooks
import { useState, useEffect } from "react"

// My hooks
import { useRef } from "react"

// Styles
import styles from "./style.module.css"

const Tweet = ({data}) => {

  // States
  const [tweet, setTweet] = useState(data.tweet)
  const [showTags, setShowTags] = useState(false)
  const [seeMore, setSeeMore] = useState(false)
  const [seeMoreBtn, setSeeMoreBtn] = useState("See More")

  // Hooks
  const tweetTextRef = useRef(null)

  // Functions
  const handleShowTags = () =>{
    
    if(showTags){
      setShowTags(false)

      return
    }else{
      setShowTags(true)

    }
  }

  const handleSeeMore = ()=>{
    if(seeMore){
      setTweet(tweet.split("").slice(0, 149).concat("...").join(""))
      tweetHeight()
      setSeeMore(false) 
      setSeeMoreBtn("See More")   
    }else{
      setTweet(data.tweet)
      tweetHeight()
      setSeeMore(true)    
      setSeeMoreBtn("See less")
    }
  }

  const tweetHeight = () =>{
    tweetTextRef.current.style.height = 32+"px";
    tweetTextRef.current.style.height = tweetTextRef.current.scrollHeight + "px";
  }

  // useEffects
  useEffect(()=>{
    let tweet = data.tweet.split("")
      if(tweet.length > 150){
        let a = tweet.slice(0, 150).concat("...").join("")
        setTweet(a)
      }else{
        tweetHeight()
      }
  },[data.tweet])
  useEffect(tweetHeight, [tweet])

  return (
    <div className={styles.tweet} onClickCapture={() => setShowTags(false)}>
        <div className={styles.header}>
        <div className={styles.avatar}>
            <img src={data.userAvatar} alt={data.name} />
        </div>
        <span>
            <h4>{data.tweetedBy}</h4>
            <p className="small">{data.postCreatedData}</p>
        </span>
        </div>
        <textarea ref={tweetTextRef} value={tweet} readOnly></textarea>
        {
          (data.tweet.length > 150) && <span className={styles.see_more} onClick={handleSeeMore}>{seeMoreBtn}</span>
        }
        <label className={styles.hash_button} onClickCapture={handleShowTags}>
          <div>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 0.75C4.5 0.335786 4.16421 0 3.75 0C3.33579 0 3 0.335786 3 0.75V3H0.75C0.335786 3 0 3.33579 0 3.75C0 4.16421 0.335786 4.5 0.75 4.5H3V8H0.75C0.335786 8 0 8.33579 0 8.75C0 9.16421 0.335786 9.5 0.75 9.5H3V11.75C3 12.1642 3.33579 12.5 3.75 12.5C4.16421 12.5 4.5 12.1642 4.5 11.75V9.5H8V11.75C8 12.1642 8.33579 12.5 8.75 12.5C9.16421 12.5 9.5 12.1642 9.5 11.75V9.5H11.75C12.1642 9.5 12.5 9.16421 12.5 8.75C12.5 8.33579 12.1642 8 11.75 8H9.5V4.5H11.75C12.1642 4.5 12.5 4.16421 12.5 3.75C12.5 3.33579 12.1642 3 11.75 3H9.5V0.75C9.5 0.335786 9.16421 0 8.75 0C8.33579 0 8 0.335786 8 0.75V3H4.5V0.75ZM4.5 4.5V8H8V4.5H4.5Z" fill="#6E6D73"/>
            </svg>
          </div>
          Hashtags
        </label>
        <ul className={styles.hash_container + " " + (showTags ? "show": "hidden")}>
          {data && data.tags !== 0 && data.tags.map(tag =>(
            <li key={data.id + tag}><b>#{tag}</b></li>
          ))}
          {data && data.tags === 0 && (
            <li>Esse post não tem hashtag.</li>
          )}
        </ul>
    </div>
  )
}

export default Tweet