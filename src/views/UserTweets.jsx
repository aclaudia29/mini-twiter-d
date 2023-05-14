import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import "../views/UserTweets.css"

import useServer from "../hooks/useServer.js"
import Tweet from "../components/Tweet.jsx"
import defaultAvatar from '../image/avatar.svg'

import { apiURL } from '../config.js';


function UserTweets() {
  const { id } = useParams()
  const { get, post, delete: destroy } = useServer()
  const [tweets, setTweets] = useState([])
  const [tweetsUser, setTweetsUser] = useState([])
  const [avatar, setAvatar] = useState('')

  const getTweets = async () => {
    
    const { data } = await get({ url: `/user/${id}/tweets` })
    setTweets(data?.data)   
  }
 
  const getTweetsUser = async () => {
    const { data } = await get({ url: `/user/${id}` })
    const datosUser = data.data    
    setTweetsUser(data.data)
  }

  const likeTweetHandler = async (id) => {
    const { data } = await post({ url: `/tweet/${id}/like` })
    if (data.status !== 'ok') return
    const twitt = data.data   
    const twittIndex = tweets.findIndex(t => t.id === twitt.id)
    tweets[twittIndex] = twitt
    setTweets([...tweets])
  }

  const deletePostHandler = async (id) => {
    const { data } = await destroy({ url: `/tweet/${id}` });
    if (data.status === "ok") {
      const newList = tweets.filter((twitter) => twitter.id !== id);
      setTweets(newList);
    }
  };

  const getUser = async () => {
    const { data } = await get({ url: `/user/${id}` })
    setAvatar(data.data.avatar)
   
  }

  useEffect(() => {
    getUser()    
  }, [])

  useEffect(() => {
    getTweets()     
  }, [id])

useEffect(() => {
    getTweetsUser()     
    
  }, [ ])

  
const avatarImage = avatar ? `${apiURL}/uploads/${avatar}` : defaultAvatar

  if (!tweetsUser) {
    return <div>Loading...</div>
  }

  return (
    
    <>

      <div className="container">
        <div className="tweet__author-user">
          <img src={avatarImage} alt="" />
          <div className="user-info">
            <div className="user-email">{tweetsUser.email}</div>
            <div className="user-info">({id}) {tweetsUser.name}</div>
          </div>
        </div>
      </div>

      {tweets && tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          deleteTweet={deletePostHandler}
          likeTweet={likeTweetHandler}
        />
      ))}

      {!tweetsUser && <div className="loading">Loading...</div>}
    </>


  )
}

export default UserTweets
