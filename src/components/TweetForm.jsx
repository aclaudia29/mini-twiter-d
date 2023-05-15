import { useState } from "react"
import { Link } from 'react-router-dom'

function TweetForm({ createTodoHandler }) {
  const [inputValue, setInputValue] = useState('')

  const inputChangeHandler = ({ target }) => {
    setInputValue(target.value)
  }

  return <form onSubmit={createTodoHandler}>
    {/*<input type="file" name="image" id="" />*/}
    <input type="file" name="image" id="file-input" className="file-input" />
    <div>
          <textarea name="text" value={inputValue} className="input-tweet" maxLength={250} placeholder="What is happening?!" onChange={inputChangeHandler} required />
    </div>
    <button type="submit">Agregar Twitter</button>
    
      
      <div className='perfil'>
          <Link to='/EditProfile' className='editar-perfil'>Editar Perfil</Link>
      </div>

    
  </form>
}

export default TweetForm
