import React from 'react'
import { useState } from 'react'
import { useGetTweets } from '../../hooks/useGetTweets'
import Tweet from "../../components/Tweet"
import styles from "./style.module.css"
const Explorer = () => {

  const [searchTag, setSearchTag] = useState("")
  const [searched, setSearched] = useState(false)
  const {tweets, search} = useGetTweets("tweets")
  const [invalidTag, setInvalidTag] = useState(false)
  const [tagsError, setTagsError] = useState(false)
  
  const handleSearchTag = async() =>{

    // Verifica se há algo escrito
    if(searchTag.trim() === ''){
      setTagsError("Preencha com alguma hashtag")
      return
    }

    const formatHashes = (tags) =>{
      setTagsError(false)

      const tagsArr = tags.toLowerCase().split(" ") 
      
      // Eliminando espaços em branco
      let whiteArr;
      for(let i = 0; tagsArr.includes("") ; i++){
        whiteArr = tagsArr.indexOf("")
        if(whiteArr >= 0){
          tagsArr.splice(whiteArr, 1)
        }
      }

      // Verificando se tem mais de 1 palavra 
      if(tagsArr.length > 1){
        setTagsError("Pesquise somente uma hashtag por vez")
        return
      }

      // transformando em string
      let tag =  tagsArr.toString()

      // Verificar se é uma hashtag válida
      if(tag.length === 1){
        const test = tag.replace(/[^a-z0-9]/gi,'')
        if(test === ""){
          setTagsError("Insira uma tag válida")
          return
        }
      }

      if(tag.includes("#")){
        tag = tag.replace(/#/g, "")
      }

      return tagsArr

    }

    const tag = formatHashes(searchTag)
    if(tag === undefined){
      setInvalidTag(true)
      return
    }
    await search(tag.toString())
    setSearchTag(tag)
    setSearched(true)

  }

  return (
    <main className="main_container">
        <div className={"main_container_inbox " + styles.container_search}>
            <h1>Explorer</h1>
            <div className={styles.search_inputs}>
              <input type="text" placeholder='Digite a hashtag que você quer buscar' onChange={(e) => {setSearchTag(e.target.value); setSearched(false); setTagsError(false); setInvalidTag(false)}} value={searchTag}/>
              <button onClick={() => handleSearchTag()}>Pesquisar</button>
            </div>
            {tagsError && <p>{tagsError}</p>}
            <div className={styles.tweets_container}>
              {
                searched && <p className={styles.p_result}>Procurando por: <b>#{searchTag}</b></p>
              }
              {
                searched && tweets && tweets.map(tag => (
                  <Tweet key={tag.id} data={tag}/>
                ))
              }
              {
                searched && tweets && tweets.length === 0 && (
                  <>
                    <h3>Não foi possível encontrar essa hashtag</h3>
                  </>
                )
              }
              {
                !searched && (
                  ""
                )
              }
              {
                invalidTag && (
                  <>
                    <h3>Hmm, essa hashtag não é valida</h3>
                    <p>Para explorar as hashtags, você precisa colocar somente uma hashtag por pesquisa.</p>
                    <p>Coloque uma hashtag que seja válida, ou seja, que não tenha somente: <b>.</b> <b>,</b> <b>#</b> e etc.</p>
                  </>
                )
              }
            </div>
        </div>
  </main>
  )
}

export default Explorer