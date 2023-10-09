export const useCharCounter = () =>{

    // elemento, limite de caracteres, state externo para ser alterado internamente
    const charCounter = (elem, limit, func)=>{

        const atualChars = elem.current.value.length

        if(atualChars >= Math.floor((limit / 10 )* 9)){
            func("#FF3535")
        }else if(atualChars > Math.floor(limit / 2)){
            func("#FFD541")
        }else if(atualChars <= Math.floor(limit / 2)){
            func("#6E6D73")
        }

    }

    // Elemento, limite de caracteres
    const charLimiter = (elem, limit) =>{
        
        const elementLength = elem.current.value.length
        if(elementLength >= limit){
          elem.current.value.substring(0, limit-1)
        }
        
    }

    return {
        charCounter,
        charLimiter
    }
}