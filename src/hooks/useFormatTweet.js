import { useState } from "react"

export const useFormatTweet = () =>{

    // Errors
    const [tweetFormarterError, setTweetFormarterError] = useState(false)
    const [tagsFormarterError, setTagsFormarterError] = useState(false)

    const formatTweet = (tweet, tags) => {
        setTweetFormarterError(false)
        setTagsFormarterError(false)

        const tweetContentFormarter = (tweet)=>{

            // If has an error in tweet formarter process, it will increment in this variable
            let errorInTweetProcess = 0

            // Check if isn't a blank content
            if(tweet.trim() === ''){
                setTweetFormarterError("Você não pode enviar um tweet vazio")
                errorInTweetProcess++
                return
            }

            // Removing unnecessary enters
            let tweetSplicedInEnters = tweet.split("\n")
            let filteredWithNoEnters = tweetSplicedInEnters.filter(word => word.length > 0)
            let finishedTweet = []

            filteredWithNoEnters.map(word => finishedTweet.push(word, "\n"))
            finishedTweet = finishedTweet.join("").trim()

            if(!errorInTweetProcess){
                return finishedTweet
            }
        }

        // Formatação de tags
        const hashesFormarter = (tags) =>{

            // Checking if has content
            if(!(tags.trim() === "")){
                
                // If has an error in tags formarter process, it will increment in this variable
                let errorInTagProcess = 0

                const tagsArr = tags.toLowerCase().trim().split(" ")

                // Adding 25 char limit
                tagsArr.forEach(tag => {
                    if(tag.length > 25){
                        setTagsFormarterError("Você não pode inserir uma hashtag com mais de 25 caracteres!")
                        errorInTagProcess++
                        return
                    }
                })

                // Removing blank spaces
                const filteredTagsArr = tagsArr.filter(tag => tag.trim().length > 0)

                // Removing all special chars and @
                let correctedTagsArr = []
                let hasSpecialChar = false
                

                filteredTagsArr.forEach(tag =>{

                    // Removing all special chars in the tag
                    hasSpecialChar = tag.replace(/[^a-z0-9]/gi,'')

                    if(hasSpecialChar === ''){
                        setTagsFormarterError("Suas hashtags não podem conter apenas caracteres especiais.")
                        errorInTagProcess++
                        return
                    }else if(tag.includes("@")){
                        setTagsFormarterError("As hashtags não podem conter @")
                        errorInTagProcess++
                        return
                    }else{
                        // Removing points and hashes
                        let correctedTag = tag.replace(/,/g,"").replace(/\./g, "").replace(/;/gi, "").replace(/#/gi, "").replace(/\\/gi, "")                        
                        correctedTagsArr.push(correctedTag)
                    }
                })

                // If doesn't have errors in process, return the formated tags
                if(!errorInTagProcess){
                    return correctedTagsArr
                }
            }else{
                return []
            }


        }

        // Calling tag and tweet formarter 
        const tweetOficial = tweetContentFormarter(tweet)
        const tagsOficial = hashesFormarter(tags)

        // Checking if has errors in process
        if(tweetOficial === undefined || tagsOficial === undefined){
            return undefined
        }else{
            const newTweet = {
                tweet: tweetOficial,
                tags: tagsOficial,
            }
            return newTweet
        }

    }

    return {
        formatTweet,
        tweetFormarterError,
        tagsFormarterError
    }

}