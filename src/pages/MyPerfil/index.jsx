import React, { useState } from 'react'
import styles from "./style.module.css"
import Tweet from '../../components/Tweet'
import {useAuthValue} from "../../context/AuthContext"
import { useGetTweets } from '../../hooks/useGetTweets'
import { Link } from 'react-router-dom'
import { useUpdateUserInfo } from '../../hooks/useUpdateUserInfo'
const MyPerfil = () => {

  const {user} = useAuthValue()
  const {tweets} = useGetTweets("tweets", user.uid)
  const {update} = useUpdateUserInfo()

  const [showUpdate, setShowUpdate] = useState(false)
  const [showURLSide, setShowURLSide] = useState(true)

  const [newName, setNewName] = useState("")
  const [newAvatar, setNewAvatar] = useState("")
  const [updateError, setUpdateError] = useState(false)


  const handleUpdateProfile = async() =>{

      
    if(newName === "" || newAvatar === ""){
      console.log("Todos os campos devem ser preenchidos de forma correta")
      // setUpdateError(true)
      return
    }else{
      if(!(newAvatar.includes("./img/"))){
        try {
          new URL(newAvatar)
        } catch (error) {
          // setUpdateError(true)
          console.log(error.message)
          return
        }
      }
    }

    const newUserInfo = {
      user, 
      newName,
      newAvatar
    }

    await update(newUserInfo)

    setNewAvatar("")
    setNewName("")
    setShowUpdate(false)

  }
  
  return (
    <main className="main_container">
        <div className="main_container_inbox">
            <div className={styles.perfil_card}>
              <div className={styles.avatar}>
                <img src={user.photoURL} alt="Seu avatar" />
              </div>
              <div className={styles.info_user}>
                <span>Nome de usuário</span>
                <h3>{user.displayName}</h3>

                <span>Email</span>
                <p>
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2791 0C14.4711 0 15.6178 0.471111 16.4613 1.31644C17.3058 2.16 17.7778 3.29778 17.7778 4.48889V11.5111C17.7778 13.9911 15.76 16 13.2791 16H4.49778C2.01689 16 0 13.9911 0 11.5111V4.48889C0 2.00889 2.008 0 4.49778 0H13.2791ZM14.2844 4.62222C14.0978 4.61244 13.92 4.67556 13.7858 4.8L9.77778 8C9.26222 8.42756 8.52356 8.42756 8 8L4 4.8C3.72356 4.59556 3.34133 4.62222 3.11111 4.86222C2.87111 5.10222 2.84444 5.48444 3.048 5.75111L3.16444 5.86667L7.20889 9.02222C7.70667 9.41333 8.31022 9.62667 8.94222 9.62667C9.57245 9.62667 10.1867 9.41333 10.6836 9.02222L14.6933 5.81333L14.7644 5.74222C14.9769 5.48444 14.9769 5.11111 14.7547 4.85333C14.6311 4.72089 14.4613 4.64 14.2844 4.62222Z" fill="#26232E"/>
                  </svg>
                  {user.email}
                </p>
                <span>Edit</span>
                <button className={styles.btn_edit} onClick={() => { showUpdate ? setShowUpdate(false) : setShowUpdate(true)}}>
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5821 0.62139L12.8932 1.66292C13.4309 2.08335 13.7893 2.63756 13.9119 3.22044C14.0534 3.8616 13.9025 4.49129 13.478 5.03595L5.66791 15.1359C5.30947 15.5946 4.78125 15.8526 4.2153 15.8621L1.10257 15.9003C0.932788 15.9003 0.7913 15.7857 0.75357 15.6232L0.046132 12.556C-0.0764907 11.9922 0.0461319 11.4093 0.404567 10.9602L5.94145 3.79375C6.03578 3.67909 6.20556 3.66094 6.31875 3.74598L8.64858 5.59971C8.7995 5.72393 9.00702 5.79082 9.22397 5.76215C9.68616 5.70482 9.99743 5.28438 9.95027 4.83528C9.92197 4.60596 9.80878 4.41485 9.65786 4.27152C9.6107 4.2333 7.39406 2.45601 7.39406 2.45601C7.25257 2.34135 7.22427 2.13113 7.33746 1.98876L8.21469 0.850717C9.02588 -0.190812 10.4408 -0.286365 11.5821 0.62139Z" fill="#26232E"/>
                  </svg>
                  Editar perfil
                </button>
              </div>
              <div className={styles.update_avatar_pop + " " + (showUpdate ? "show" : "hidden")} onClickCapture={()=> setShowUpdate(false)}>
                <div className={styles.select_avatar} onClickCapture={()=> setShowUpdate(true)}>
                  <h3>Atualizar Perfil</h3>
                  <input type="text" placeholder='Digite seu novo nome' onChange={(e)=>setNewName(e.target.value)} value={newName}/>
                  <button className={styles.btn_choose_side} onClick={()=> { showURLSide ? setShowURLSide(false) : setShowURLSide(true)}}>
                    { showURLSide ? "Escolher avatar do sistema" : "Digitar URL do avatar"}
                  </button>
                  {!showURLSide && (
                    <div className={styles.select_avatar_content}>
                    <label>
                        <input type="radio" name="avatar" value="./img/avatar1.png" onClick={(e) => setNewAvatar(e.target.value)} required/>
                        <img src="./img/avatar1.png" alt="Avatar 1" />
                    </label>
                    <label>
                        <input type="radio" name="avatar" value="./img/avatar2.png" onClick={(e) => setNewAvatar(e.target.value)} required/>
                        <img src="./img/avatar2.png" alt="Avatar 2" />
                    </label>
                    <label>
                        <input type="radio" name="avatar" value="./img/avatar3.png" onClick={(e) => setNewAvatar(e.target.value)} required/>
                        <img src="./img/avatar3.png" alt="Avatar 3" />
                    </label>
                    <label>
                        <input type="radio" name="avatar" value="./img/avatar4.png" onClick={(e) => setNewAvatar(e.target.value)} required/>
                        <img src="./img/avatar4.png" alt="Avatar 4" />
                    </label>
                    <label>
                        <input type="radio" name="avatar" value="./img/avatar5.png" onClick={(e) => setNewAvatar(e.target.value)} required/>
                        <img src="./img/avatar5.png" alt="Avatar 5" />
                    </label>
                    <label>
                        <input type="radio" name="avatar" value="./img/avatar6.png" onClick={(e) => setNewAvatar(e.target.value)} required/>
                        <img src="./img/avatar6.png" alt="Avatar 6" />
                    </label>
                    <label>
                        <input type="radio" name="avatar" value="./img/avatar7.png" onClick={(e) => setNewAvatar(e.target.value)} required/>
                        <img src="./img/avatar7.png" alt="Avatar 7" />
                    </label>
                    <label>
                        <input type="radio" name="avatar" value="./img/avatar8.png" onClick={(e) => setNewAvatar(e.target.value)} required/>
                        <img src="./img/avatar8.png" alt="Avatar 8" />
                    </label>
                    <label>
                        <input type="radio" name="avatar" value="./img/avatar9.png" onClick={(e) => setNewAvatar(e.target.value)} required/>
                        <img src="./img/avatar9.png" alt="Avatar 9" />
                    </label>
                  </div>
                  )}
                  {showURLSide && (
                    <input type="text"  placeholder='Coloque a URL do seu avatar' onChange={(e)=>setNewAvatar(e.target.value)} value={newAvatar} />
                  )}

                  <button onClick={() => handleUpdateProfile()}>Atualizar</button>
                
                </div>
              </div>
            </div>
            <h3>Meus Tweets</h3>
            <div className={styles.tweet_container}>
              {tweets && tweets.map(tweet =>(
                <Tweet key={tweet.id} data={tweet}/>
              ))}
              {
                tweets && tweets.length == 0 && (
                  <div className={styles.no_tweet}>
                    <h3>Faça seu primeiro tweet!</h3>
                    <p>Você ainda não fez nenhum tweet, vá para a pagina <b>home</b> e faça seu primeiro tweet!</p>
                    <Link to="/home">Ir para home</Link>
                  </div>
                )
              }
            </div>
        </div>
    </main>
  )
}

export default MyPerfil