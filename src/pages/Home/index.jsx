import React from 'react'
import styles from "./style.module.css"
const Home = () => {
  return (
    <div>
      <main className="main_container">
        <div className="main_container_inbox">

          <div className={styles.type_tweet}>

            <div className="my_avatar">
              <img src="./img/avatar1.png" alt="Seu avatar" />
            </div>

            <input type="text" name="tweet" placeholder='Type something' />
            
            <button>
              <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6358 11.3235C22.6432 10.7502 22.3327 10.2232 21.8283 9.94659L10.0748 3.48888C9.54835 3.19135 8.92777 3.2279 8.43171 3.56664C7.92654 3.91108 7.66798 4.73103 7.8092 5.32324L8.90644 9.92026C9.01908 10.3916 9.44096 10.7236 9.92633 10.7215L16.4671 10.7012C16.8021 10.6945 17.0737 10.9661 17.067 11.3011C17.066 11.6303 16.7983 11.898 16.4634 11.9047L9.91637 11.9199C9.431 11.9208 9.00705 12.2542 8.89149 12.7263L7.75545 17.3416C7.61751 17.887 7.77477 18.4315 8.1596 18.8163C8.20487 18.8616 8.2558 18.9125 8.30677 18.9521C8.80513 19.3366 9.4578 19.3856 10.015 19.0887L21.8084 12.6942C22.3145 12.4258 22.6283 11.8969 22.6358 11.3235Z" fill="#D2D1D7"/>
              </svg>

            </button>

          </div>

          <hr />

          <div className={styles.tweets}>
            <div className={styles.tweet}>
              <div className={styles.header}>
                <div className="avatar">
                  <img src="./img/avatar2.png" alt="" />
                </div>
                <span>
                  <h4>User name</h4>
                  <p className="small">1 sec ago</p>
                </span>
              </div>
              <p>Aprenda com os erros dos outros. Você não consegue viver tempo suficiente para cometer todos por si mesmo.</p>
            </div>
            <div className={styles.tweet}>
              <div className={styles.header}>
                <div className="avatar">
                  <img src="./img/avatar3.png" alt="" />
                </div>
                <span>
                  <h4>User name</h4>
                  <p className="small">2 min ago</p>
                </span>
              </div>
              <p>Eu gosto muito de sorvete, mais que açaí</p>
            </div>
            <div className={styles.tweet}>
              <div className={styles.header}>
                <div className="avatar">
                  <img src="./img/avatar1.png" alt="" />
                </div>
                <span>
                  <h4>User name</h4>
                  <p className="small">5 min ago</p>
                </span>
              </div>
              <p>Não existe um caminho para a felicidade. A felicidade é o caminho.</p>
            </div>
            <div className={styles.tweet}>
              <div className={styles.header}>
                <div className="avatar">
                  <img src="./img/avatar2.png" alt="" />
                </div>
                <span>
                  <h4>User name</h4>
                  <p className="small">6 min ago</p>
                </span>
              </div>
              <p>Eu não gosto de tomar banho</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default Home