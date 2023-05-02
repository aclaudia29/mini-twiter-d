import { Link } from 'react-router-dom';
import { apiURL } from "../config";
import useServer from "../hooks/useServer";
import { useState } from "react";
import styles from './Posts.module.css'; // importa el archivo CSS

function Posts({ post, deletePost , checkButton }) {
  const deleteButtonHandler = (e) => {
    deletePost(post.id);
  };

  return (
    <li className={styles.todo_item}>
      <span className={styles.content}>
        <Link className={styles.iconLink} onClick={checkButtonHandler}>
          <img src={icon} className={styles.icon} alt="" />
        </Link>
        {todo.content}
      </span>
      <button className={styles.delete_button} onClick={deleteButtonHandler}>
        Eliminar
      </button>
    </li>
  );
}

export default Posts;
