import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import useServer from '../hooks/useServer.js'
import useAuth from '../hooks/useAuth.js'
import logo from '../image/logo-nuevo.png'
import "./login.css"

function Login() {
  const { post, get } = useServer()
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const credentials = Object.fromEntries(new FormData(e.target))
    await post({ url: '/login', body: credentials })
  }

  const getUser = async () => {
    const { data } = await get({ url: '/user' })
   
    if (data.status === 'ok') {
      toast.success("Bienvenido"),1000
      return navigate('/')      
    }
  }
    
  useEffect(() => {
    if (!token) return

    getUser()
  }, [token])


  return (

    <form className='formLogin' onSubmit={handleSubmit}>
      <div>
        <img className='logo' src={logo} alt='logo twitter' />
          
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

      <div className='cuenta'>
        <p>¿No tienes cuenta?</p>
        <Link to='/register'>Registrate</Link>
      </div>
  
    </form>
  )
}
export default Login
