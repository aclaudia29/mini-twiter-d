import { useEffect, useState } from "react"
import useServer from "../hooks/useServer.js"

import useAuth from "../hooks/useAuth.js"
//import Tweet from "../components/Tweet.jsx"
//import logo from '../image/logo nuevo.jpeg'
//import "../views/home.css"

function EditProfile() {
    const { put} = useServer()
    const { user } = useAuth() 
    const [twitters, setTwitter] = useState([])
    const [inputValue, setInputValue] = useState('')

    //aqui obterngo todos los twttes/retorna la data
   // const getTwitts = async () => {
   //   const { data } = await get({ url: '/' })
    //  setTwitter(data.data)
   // }
   

}

export default EditProfile
