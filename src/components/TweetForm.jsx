import { useState } from "react"
import { Link } from 'react-router-dom'

import styles from './TweetForm.module.css'

function TweetForm({ createTodoHandler }) {
  const [inputValue, setInputValue] = useState('')

  const inputChangeHandler = ({ target }) => {
    setInputValue(target.value)
  }

  return <form onSubmit={createTodoHandler} className={styles.form}>
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
