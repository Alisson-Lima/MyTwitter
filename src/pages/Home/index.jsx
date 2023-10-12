// Hooks
import { useGetTweets } from '../../hooks/useGetTweets'

// Components
import TypeTweet from '../../components/TypeTweet'
import Tweet from '../../components/Tweet'

// styles
import "../../css/index.css"
import styles from "./style.module.css"
import FirstTweetMessage from '../../components/FirstTweetMessage'
import { useRef, useState, useEffect } from 'react'

const Home = () => {

  const mainContainerRef = useRef(); // Use mainContainerRef em vez de pageScrollElementRef
  const [showScrollButton, setShowScrollButton] = useState(false);

  // hooks
  const {tweets, loading} = useGetTweets("tweets")

  const handleScrollTop = ()=>{
    mainContainerRef.current.scrollTo(0,0)
  }

    // Verifique a posição da timeline no elemento .main_container
    const handleScroll = () => {
      const mainContainer = mainContainerRef.current;
      if (mainContainer.scrollTop > mainContainer.clientHeight) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
  
    useEffect(() => {
      const mainContainer = mainContainerRef.current;
      mainContainer.addEventListener('scroll', handleScroll);
  
      return () => {
        mainContainer.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <div>
      <main className="main_container" ref={mainContainerRef}>
        <div className="main_container_inbox">

          <TypeTweet id="type"/>

          <hr />

          <div className={styles.tweets}>
            {
              loading && <span className='load_tweets'><div className="loadCircle"></div></span>
            }
            {
              tweets && tweets.map(tweetInfo =>(
                <Tweet key={tweetInfo.id} data={tweetInfo}/>
              ))
            }
            {
              tweets && tweets.length === 0 && <FirstTweetMessage/>
            }
          </div>
        </div>

        <button
          onClick={() => handleScrollTop()}
          className={styles.scrollTopButton + " " + (showScrollButton && styles.show)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
            <path d="M2 18.4161L10 11.708L18 18.4161M2 8.70807L10 2L18 8.70807" stroke="#393640" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
      </main>
    </div>
  )
}

export default Home