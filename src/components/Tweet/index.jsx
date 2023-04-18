import styles from "./style.module.css"
const Tweet = ({data}) => {

  return (
    <div className={styles.tweet}>
        <div className={styles.header}>
        <div className="avatar">
            <img src={data.userAvatar} alt="" />
        </div>
        <span>
            <h4>{data.tweetedBy}</h4>
            <p className="small">{data.createdAt}</p>
        </span>
        </div>
        <p>{data.tweet}</p>
    </div>
  )
}

export default Tweet