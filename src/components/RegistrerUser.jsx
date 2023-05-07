import { Link } from 'react-router-dom'


function RegisterUser({ Register }) {

  // //const deleteButtonHandler = () => {
  //   deleteTodo(todo.id)
  // }

  return <li className={styles.todo_item}>
    <span className={styles.content}>
      <Link className={styles.iconLink} onClick={checkButtonHandler}>
        <img src={icon} className={styles.icon} alt="" />
      </Link>
      {todo.content}
    </span>

  </li>
}
export default RegisterUser