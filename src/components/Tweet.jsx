import { apiURL } from "../config";
import "./Tweet.css";
import "./layout.css"
import authorLogo from '../image/avatar.svg'

function Tweet({ tweet, deleteTweet, likeTweet, timeAgo, users }) {
  
  const deleteButtonHandler = (e) => {
    deleteTweet(tweet.id);
  };

  const likeButtonHandler = () => {
    likeTweet(tweet.id)
  }

  return (

    <div className="container">

      <div className="columna1"></div>
      <div className="columna2">
        <div className="layout">
          <div className="tweet">
            <div className="tweet__author-logo">
              <img className='logo' src={authorLogo} alt='logo twitter' />
              {/* <img src={`${apiURL}/user/${users.avatar}`} alt="" />*/}
              {/* <input type="file" name="avatar" id="avatar" ref={fileRef} onChange={e => setFile(e.target.value)} accept="image/*" className="input" />
                            */}
            </div>

            <div className="tweet__author-name">
              {tweet.email}
            </div>
            <div className="tweet__publish-time">
              {timeAgo.format(new Date(tweet.created_at))}
            </div>
            <div className="tweet__content">
              {tweet.text}
            </div>
            <div>
              <img src={`${apiURL}/uploads/${tweet.image}`} alt="" />
            </div>
            <button className="tweet-delete" onClick={deleteButtonHandler}>
              Borrar Tweet
            </button>
            <button className="tweet-like" onClick={likeButtonHandler}>
              Like
              <span>{tweet.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    
  )
}
export default Tweet;
