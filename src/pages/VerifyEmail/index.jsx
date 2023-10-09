import {useAuthValue} from "../../context/AuthContext"

import styles from "./style.module.css"
const VerifyEmail = () => {

    const {user} = useAuthValue()

  return (
    <div className="main_container">
        <article className={styles.article_container}>
            <h1>Verifique o seu email</h1>
            <h4>Enviamos um link para o email: <b>{user.email}</b>. No momento em que você verificar o email, volte para o app e clique no botão abaixo.</h4>
            <a href="/home" className={styles.refresh_button}>Recarregar a página</a>
        </article>
    </div>
  )
}

export default VerifyEmail