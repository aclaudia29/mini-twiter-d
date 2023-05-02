import { useEffect, useState } from "react"
//import useServer from "../hooks/useServer.js"
//import Homes from "../components/Homes.jsx"
//import {apiURL} from '../config.js'
//import useAuth from "../hooks/useAuth.js"

import { useNavigate } from 'react-router-dom'
import useServer from '../hooks/useServer.js'


function Register() {
    const { post, get } = useServer()
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        const credentials = Object.fromEntries(new FormData(e.target))
        const { data } = await post({ url: '/user', body: credentials })
        ///console.log(credentials)
                
        if ({data}) return navigate('/login')
    }



    const inputChangeHandler = ({ target }) => {
        setInputValue(target.value)
      }
  
     return <>
                   
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
        <input type="text" name="email" value={inputValue} onChange={inputChangeHandler}  placeholder="jus@example.com" />
        
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id= "password" placeholder="123456"/>

        </div>
            <button type="submit">Agregar usuario</button>
      </form>
      
    </>
}

export default Register
