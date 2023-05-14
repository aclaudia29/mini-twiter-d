import { useEffect, useState } from "react";
import { apiURL } from "../config";
import "./Tweet.css";
import "./layout.css"
import useServer from "../hooks/useServer";
import defaultAvatar from '../image/avatar.svg'
import useAuth from "../hooks/useAuth.js";
import { Link } from "react-router-dom";

import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es)
const timeAgo = new TimeAgo('es-ES')

function Tweet({ tweet, deleteTweet, likeTweet }) {
  const { isAuthenticated, user } = useAuth()
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
            <Link to={'/users/' + tweet.user_id}>
              <div className="tweet__author-logo">
                <img src={avatarImage} alt="" />
              </div>
              <div className="tweet__author-name">
                {tweet.email}
              </div>
            </Link>
            <div className="tweet__publish-time">
              {timeAgo.format(new Date(tweet.created_at))}
            </div>
            <div className="tweet__content">
              {tweet.text}
            </div>
            <div>
              <img src={`${apiURL}/uploads/${tweet.image}`} alt="" />
            </div>
            </div>
            { isAuthenticated && user.id === tweet.user_id && <button className="tweet-delete" onClick={deleteButtonHandler}>Borrar Tweet</button>}
            { isAuthenticated ? 
              <button className="tweet-like" onClick={likeButtonHandler}>Like <span>{tweet.likes}</span></button> :
              <p className="tweet-like">Like <span>{tweet.likes}</span></p>} 
          </div>
            </div>
          </div>
          )
}
export default Tweet;
