import {useAuthValue} from "../../context/AuthContext"
import { Link } from "react-router-dom"

import styles from "./style.module.css"
const VerifyEmail = () => {

    const {user} = useAuthValue()

  return (
    <div className={styles.verify_container}>
      
        <article className={styles.article_container}>
          <svg xmlns="http://www.w3.org/2000/svg" width="98" height="90" viewBox="0 0 98 90" fill="none">
            <path d="M73.2011 0.899902C79.772 0.899902 86.093 3.4969 90.7431 8.1568C95.3981 12.8069 98 19.0789 98 25.6449V64.3549C98 78.0259 86.877 89.0999 73.2011 89.0999H24.794C11.1181 89.0999 0 78.0259 0 64.3549V25.6449C0 11.9739 11.0691 0.899902 24.794 0.899902H73.2011ZM78.743 26.3799C77.714 26.326 76.734 26.6739 75.9941 27.3599L53.9 44.9999C51.058 47.3568 46.9861 47.3568 44.1 44.9999L22.05 27.3599C20.5261 26.2329 18.4191 26.3799 17.15 27.7029C15.827 29.0259 15.68 31.1329 16.8021 32.6029L17.444 33.2399L39.739 50.6349C42.483 52.7909 45.8101 53.9669 49.294 53.9669C52.7681 53.9669 56.154 52.7909 58.8931 50.6349L80.997 32.9459L81.389 32.5539C82.5601 31.1329 82.5601 29.0749 81.3351 27.6539C80.654 26.9238 79.7181 26.4779 78.743 26.3799Z" fill="url(#paint0_linear_907_7)"/>
            <defs>
              <linearGradient id="paint0_linear_907_7" x1="0" y1="44.9999" x2="130.34" y2="44.9999" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5B29E5"/>
                <stop offset="1" stopColor="#291266"/>
              </linearGradient>
            </defs>
          </svg>
            <h1>Verifique o seu email</h1>
            <p>Enviamos um link para o email: <b>{user.email}</b>. No momento em que você verificar o email, volte para esta página e <Link to="/home" className={styles.link}>Clique Aqui</Link>.</p>
            <Link to="/" className={styles.refresh_button}>Voltar para login</Link>
        </article>
    </div>
  )
}

export default VerifyEmail