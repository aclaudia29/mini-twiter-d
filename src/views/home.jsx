import { useEffect, useState } from "react"
import useServer from "../hooks/useServer.js"
import Homes from "../components/Homes.jsx"
import {apiURL} from '../config.js'
import useAuth from "../hooks/useAuth.js"

function Twitter() {
    const { get, post } = useServer()
    const { isAuthenticated, user } = useAuth() 
    const [twitters, setTwitter] = useState([])
    const [inputValue, setInputValue] = useState('')

    //aqui obterngo todos los twttes/retorna la data
    const getTwitts = async () => {
      const { data } = await get({ url: '/' })
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

    return <>
       
      <h1>Twitters</h1>

      <form onSubmit={createTodoHandler}>
        <input type="file" name="image" id="" />
        <div>

        <input type="text" name="text" value={inputValue} onChange={inputChangeHandler} />
        </div>
        <button type="submit">Agregar Twitter</button>
      </form>

      

      {twitters && twitters.map(item => (
        <div key={item.id}>
          <p>{item.nombre} </p>
          <a>{item.text} {item.email}</a>
          <img src={`${apiURL}/uploads/${item.image}`} alt=" " />
        </div>
      ))}
    </>
}

export default Twitter
