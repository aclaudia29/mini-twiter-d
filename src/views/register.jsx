import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import useServer from '../hooks/useServer.js'

import logo from '../image/logo-nuevo.jpeg'

function Register() {
    const { post, get } = useServer()
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        const credentials = Object.fromEntries(new FormData(e.target))
        const { data } = await post({ url: '/user', body: credentials })
        //console.log(credentials)

        if ({ data }) return navigate('/login')
    }
    const inputChangeHandler = ({ target }) => {
        setInputValue(target.value)
    }

    return <>

        <div>
            <img className='logo' src={logo} alt='logo twitter' />
        </div>

        <form onSubmit={handleSubmit}>
            <div className='email' >
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={inputValue} onChange={inputChangeHandler} placeholder="jus@example.com" />
            </div>

            <div className='password' >
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="123456" />
            </div>

            <button type="submit">Agregar usuario</button>
        </form>

    </>
}

export default Register
