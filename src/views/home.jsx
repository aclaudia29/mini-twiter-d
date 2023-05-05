import { useEffect, useState } from "react"
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'
import { useNavigate, Link } from 'react-router-dom'


import useServer from "../hooks/useServer.js"
import useAuth from "../hooks/useAuth.js"
import Tweet from "../components/Tweet.jsx"
import logo from '../image/logo nuevo.jpeg'
import "../views/home.css"
import { useImperativeHandle } from "react"

TimeAgo.addDefaultLocale(es)
const timeAgo = new TimeAgo('es-ES')

function Twitter() {
    const { get, post, delete: destroy } = useServer()
    const { isAuthenticated, user } = useAuth() 
    const [twitters, setTwitter] = useState([])
    const [users, setUsers] = useState([])
    const [inputValue, setInputValue] = useState('')

    //aqui obterngo todos los twttes/retorna la data
    const getTwitts = async () => {
      const { data } = await get({ url: '/' })
      setTwitter(data.data)
    }

    const getUser = async () => {
      const { data } = await get({ url: '/user/' })
      setUsers(data.data)
    }

    useEffect(() => {
      getUser()
    }, [])

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
      const {data} = await post({url: `/tweet/${id}/like`})
      if (data.status !== 'ok') return

      const twitt = data.data
      const twittIndex = twitters.findIndex(t => t.id === twitt.id)
      twitters[twittIndex] = twitt
      setTwitter([...twitters])
    }

    const deletePostHandler = async (id) => {
      const { data } = await destroy({ url: `/tweet/${id}` });
      if (data.status === "ok") {
        const newList = twitters.filter((twitter) => twitter.id !== id);
        setTwitter(newList);
      }
    };

    return <>
      <div>
        <img className='logo' src={logo} alt='logo twitter' />
      </div>

     { /*<div>
        <button1>Edit Perfil</button1>
  </div> */}

      {/*<button type="submit" className="editeProfile-btn" onClick={handleEditProfile} >
            <i className="fa-solid fa-user-pen">Editar Perfil</i>
  </button>*/ }

   

      <form onSubmit={createTodoHandler}>      

         <input type="file" name="image" id="" />

          <div>
            <input type="text" name="text" value={inputValue} onChange={inputChangeHandler} />
          </div>

          <button type="submit">Agregar Twitter</button>

          <div  className='perfil'>        
              <Link to='/EditProfile'>Editar Perfil</Link>
          </div>
      </form>

        {twitters && twitters.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} users={users} deleteTweet={deletePostHandler} likeTweet={likeTweetHandler} timeAgo={timeAgo} />
        ))}


    </>

}

export default Twitter
