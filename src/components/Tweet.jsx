import { apiURL } from "../config"

function Tweet({ tweet, deleteTweet, likeTweet }) {
  
  const deleteButtonHandler = (e) => {
    deleteTweet(tweet.id);
  };

  const likeButtonHandler = () => {
    likeTweet(tweet.id)
  }

    return <div key={tweet.id}>
          <p>{tweet.nombre} </p>
          <a>{tweet.text} {tweet.email}</a>
          <img src={`${apiURL}/uploads/${tweet.image}`} alt=" " />
          <button className='' onClick={deleteButtonHandler}>
            Borrar Tweet  
          </button>
          <button className="tweet-like" onClick={likeButtonHandler}>
            Like
            <span>{tweet.likes}</span>
          </button>
        </div>
}

export default Tweet
