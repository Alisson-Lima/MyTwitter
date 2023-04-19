import React from 'react'
import { useState } from 'react'
import { useGetTweets } from '../../hooks/useGetTweets'
import Tweet from "../../components/Tweet"
import styles from "./style.module.css"
const Explorer = () => {

  const [searchTag, setSearchTag] = useState("")
  const [searched, setSearched] = useState(false)
  const {tweets, search} = useGetTweets("tweets")
  
  const handleSearchTag = async() =>{
    await search(searchTag.toLowerCase())
    setSearched(true)
  }

  return (
    <main className="main_container">
        <div className={"main_container_inbox " + styles.container_search}>
            <h1>Explorer</h1>
            <div className={styles.search_inputs}>
              <input type="text" placeholder='Digite a hashtag que você quer buscar' onChange={(e) => {setSearchTag(e.target.value); setSearched(false)}} value={searchTag}/>
              <button onClick={() => handleSearchTag()}>Pesquisar</button>
            </div>
            <div className={styles.tweets_container}>
              {
                searched && <p className={styles.p_result}>Procurando por: <b>#{searchTag}</b></p>
              }
              {
                searched && tweets.map(tag => (
                  <Tweet key={tag.id} data={tag}/>
                ))
              }
              {
                searched && tweets.length === 0 && (
                  <>
                    <h3>Não foi possível encontrar essa tag</h3>
                  </>
                )
              }
              {
                !searched && (
                  ""
                )
              }
            </div>
        </div>
  </main>
  )
}

export default Explorer