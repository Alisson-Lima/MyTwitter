import styles from "./style.module.css"
import { useState } from "react"
const Tweet = ({data}) => {

  const [showTags, setShowTags] = useState(false)

  const handleShowTags = () =>{
    
    if(showTags){
      setShowTags(false)
      return
    }else{
      setShowTags(true)
    }
  }

  return (
    <div className={styles.tweet} onClickCapture={() => setShowTags(false)}>
        <div className={styles.header}>
        <div className="avatar">
            <img src={data.userAvatar} alt="" />
        </div>
        <span>
            <h4>{data.tweetedBy}</h4>
            <p className="small">{data.postCreatedData}</p>
        </span>
        </div>
        <p>{data.tweet}</p>
        <label className={styles.hash_button} onClickCapture={handleShowTags}>
          <div>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 0.75C4.5 0.335786 4.16421 0 3.75 0C3.33579 0 3 0.335786 3 0.75V3H0.75C0.335786 3 0 3.33579 0 3.75C0 4.16421 0.335786 4.5 0.75 4.5H3V8H0.75C0.335786 8 0 8.33579 0 8.75C0 9.16421 0.335786 9.5 0.75 9.5H3V11.75C3 12.1642 3.33579 12.5 3.75 12.5C4.16421 12.5 4.5 12.1642 4.5 11.75V9.5H8V11.75C8 12.1642 8.33579 12.5 8.75 12.5C9.16421 12.5 9.5 12.1642 9.5 11.75V9.5H11.75C12.1642 9.5 12.5 9.16421 12.5 8.75C12.5 8.33579 12.1642 8 11.75 8H9.5V4.5H11.75C12.1642 4.5 12.5 4.16421 12.5 3.75C12.5 3.33579 12.1642 3 11.75 3H9.5V0.75C9.5 0.335786 9.16421 0 8.75 0C8.33579 0 8 0.335786 8 0.75V3H4.5V0.75ZM4.5 4.5V8H8V4.5H4.5Z" fill="#6E6D73"/>
            </svg>
          </div>
          Hashtags
        </label>
          <ul className={styles.hash_container + " " + (showTags ? "show_hashes": "hidden_hashes")}>
            {data && data.tags != 0 && data.tags.map(tag =>(
              <li><b>#{tag}</b></li>
            ))}
            {data && data.tags == 0 && (
              <li>Esse post não tem hashtag.</li>
            )}
          </ul>
    </div>
  )
}

export default Tweet