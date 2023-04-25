// Hooks
import { useGetTweets } from '../../hooks/useGetTweets'

// Components
import TypeTweet from '../../components/TypeTweet'
import Tweet from '../../components/Tweet'

// styles
import "../../css/index.css"
import styles from "./style.module.css"

const Home = () => {

  // hooks
  const {tweets, loading} = useGetTweets("tweets")

  return (
    <div>
      <main className="main_container">
        <div className="main_container_inbox">

          <TypeTweet/>

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
              tweets && tweets.length === 0 && <p>Seja o primeiro a fazer um post na plataforma!</p>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home