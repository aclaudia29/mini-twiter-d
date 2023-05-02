import { useEffect, useState } from "react"
import useServer from "../hooks/useServer.js"
import Homes from "../components/Homes.jsx"
import {apiURL} from '../config.js'
import useAuth from "../hooks/useAuth.js"
import Tweet from "../components/Tweet.jsx"
import "../views/home.css"

function Twitter() {
    const { get, post, delete: destroy } = useServer()
    const { isAuthenticated, user } = useAuth() 
    const [twitters, setTwitter] = useState([])
    const [inputValue, setInputValue] = useState('')

    //aqui obterngo todos los twttes/retorna la data
    const getTwitts = async () => {
      const { data } = await get({ url: '/' })
      console.log({data})
      setTwitter(data.data)
    }

    const createTodoHandler = async (e) => {
      e.preventDefault()
  
      const TwitForm = new FormData(e.target)
      const { data } = await post({ url: '/', body: TwitForm, hasImage: true })
      setTwitter([ data.data, ...twitters ])
      setInputValue('')
    }
      
    const inputChangeHandler = ({ target }) => {
      setInputValue(target.value)
    }

    useEffect(() => {
      getTwitts()
    }, [])

    useEffect(() => {      
      console.log(twitters)
    }, [twitters]) 

    const likeTweetHandler = async (id) => {
      const response = await post({url: `/tweet/${id}/like`})
    }

    const deletePostHandler = async (id) => {
      const { data } = await destroy({ url: `/tweet/${id}` });
      if (data.status === "ok") {
        const newList = twitters.filter((twitter) => twitter.id !== id);
        setTwitter(newList);
      }
    };

    return <>
       
      {/* <h1>Twitters</h1> */}

      <form onSubmit={createTodoHandler}>
        <input type="file" name="image" id="" />
        <div>

        <input type="text" name="text" value={inputValue} onChange={inputChangeHandler} />
        </div>
        <button type="submit">Agregar Twitter</button>
      </form>

      

      {twitters && twitters.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} deleteTweet={deletePostHandler} likeTweet={likeTweetHandler}/>
      ))}
    </>

    
}

export default Twitter
