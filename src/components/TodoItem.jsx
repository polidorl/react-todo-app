import React from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';

const TodoItem = ({ todo, completeTodo, deleteTodo }) => {
  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <p>{todo.text}</p>
      <div>
        <button onClick={() => completeTodo(todo.id)} className="complete-btn">
          <FaCheck />
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
