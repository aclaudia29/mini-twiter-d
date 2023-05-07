import { useEffect, useState } from "react";
import { apiURL } from "../config";
import "./Tweet.css";
import "./layout.css"
import useServer from "../hooks/useServer";
import defaultAvatar from '../image/avatar.svg'

function Tweet({ tweet, deleteTweet, likeTweet, timeAgo, user }) {
  const [avatar, setAvatar] = useState('')
  const { get } = useServer()

  const deleteButtonHandler = (e) => {
    deleteTweet(tweet.id);
  };

  const likeButtonHandler = () => {
    likeTweet(tweet.id)
  }

  const getUser = async () => {
    const { data } = await get({ url: `/user/${tweet.user_id}` })
    setAvatar(data.data.avatar)
  }

  useEffect(() => {
    getUser()
  }, [])

  const avatarImage = avatar ? `${apiURL}/uploads/${avatar}` : defaultAvatar

  return (
    <div className="container">
      <div className="Sidebar"></div>
      <div className="Principal">
        <div className="layout">
          <div className="tweet">
            <div className="tweet__author-logo">
              <img src={avatarImage} alt="" />
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
