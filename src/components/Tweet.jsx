import { apiURL } from "../config";
import "./Tweet.css";

function Tweet({ tweet, deleteTweet, likeTweet }) {
  
  const deleteButtonHandler = (e) => {
    deleteTweet(tweet.id);
  };

  const likeButtonHandler = () => {
    likeTweet(tweet.id)
  }

  return (
    <div key={tweet.id} className="tweet">
      <p>{tweet.nombre}</p>
      <a>{tweet.text} {tweet.email}</a>
      <img src={`${apiURL}/uploads/${tweet.image}`} alt="" />
      <button className="tweet-delete" onClick={deleteButtonHandler}>
        Borrar Tweet  
      </button>
      <button className="tweet-like" onClick={likeButtonHandler}>
        Like
        <span>{tweet.likes}</span>
      </button>
    </div>
  );
}

export default Tweet;
