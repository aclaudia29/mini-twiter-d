import { useEffect, useState } from "react"
//import TimeAgo from 'javascript-time-ago'
//import es from 'javascript-time-ago/locale/es'
import { Link } from 'react-router-dom'

import useServer from "../hooks/useServer.js"
import useAuth from "../hooks/useAuth.js"
import Tweet from "../components/Tweet.jsx"
import logo from '../image/logo-nuevo.jpeg'
import "../views/home.css"
import TweetForm from "../components/TweetForm.jsx"

//TimeAgo.addDefaultLocale(es)
//const timeAgo = new TimeAgo('es-ES')

function Twitter() {
  const { get, post, delete: destroy } = useServer()
  const { isAuthenticated, user } = useAuth()
  const [tweets, setTweets] = useState([])
  const [users, setUsers] = useState([])
  const [inputValue, setInputValue] = useState('')

  // aqui obterngo todos los twttes/retorna la data
  const getTwitts = async () => {
    const { data } = await get({ url: '/' })
    setTweets(data.data)
  }

  const createTodoHandler = async (e) => {
    e.preventDefault()

    const twitForm = new FormData(e.target)
    const { data } = await post({ url: '/', body: twitForm, hasImage: true })
    setTweets([data.data, ...tweets])
    setInputValue('')
  }

  useEffect(() => {
    getTwitts()
  }, [])

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

  return <>
    <div>
      <img className='logo' src={logo} alt='logo twitter' />
    </div>

    {isAuthenticated && <TweetForm createTodoHandler={createTodoHandler} />}

    {tweets && tweets.map((tweet) => (
      <Tweet key={tweet.id} tweet={tweet} deleteTweet={deletePostHandler} likeTweet={likeTweetHandler} />
    ))}
  </>
}

             
export default Twitter
