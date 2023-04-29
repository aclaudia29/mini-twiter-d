import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useServer from '../hooks/useServer.js'
import "./login.css"
import useAuth from '../hooks/useAuth.js'

function Login() {
  const { post, get } = useServer()
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const credentials = Object.fromEntries(new FormData(e.target))
    console.log(credentials)
    await post({ url: '/login', body: credentials })
  }
  
  useEffect(() => {
    if (!token) return
    
    const user = get({ url: '/user' })
    if (user) return navigate('/')
  }, [token])

  return (
    <form className='formLogin' onSubmit={handleSubmit}>
      <div>
        <div className='email'>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="ingresar email"
          />
        </div>

        <div className='password'>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            placeholder="ingresar contraseña"
          />
        </div>
      </div>

      <div >
        <button className='button' type="submit"> Iniciar Sesión </button>
      </div>
    </form>
  )
}

export default Login
