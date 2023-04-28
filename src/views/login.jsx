import { useNavigate } from 'react-router-dom'
import useServer from '../hooks/useServer.js'
import "./login.css"

function Login() {
  const { post, get } = useServer()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const credentials = Object.fromEntries(new FormData(e.target))
    const { data } = await post({ url: '/login', body: credentials })
    const usr = data && await get({ url: '/user' })
    if (usr) return navigate('/home')
  }

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
