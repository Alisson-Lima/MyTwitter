import styles from "./style.module.css"

const Tweet = () => {
  return (
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
  )
}

export default Tweet