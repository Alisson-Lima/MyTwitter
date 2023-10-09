import { useState } from "react"

const CharCounter = ({charsLenght}) => {

    // States
    const [tweetCharColor, setTweetCharColor] = useState(0) 

    // Chars limit
    const tweetCharLimit = 280

    const charCounter = (element, chars, limit) =>{
      
        if(chars >= Math.floor((limit / 10 )* 9)){
          element === "textareaTweet" && setTweetCharColor("#FF3535")
        }else if(chars > Math.floor(limit / 2)){
          element === "textareaTweet" && setTweetCharColor("#FFD541")
        }else if(chars <= Math.floor(limit / 2)){
          element === "textareaTweet" && setTweetCharColor("#6E6D73")
        }
      }

  return (
    <span><span style={{color: tweetCharColor}}>{charsLenght}</span>/{tweetCharLimit}</span>
  )
}

export default CharCounter