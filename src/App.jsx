import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import ConfirmModal from './components/ConfirmModal';
import './TodoApp.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const addTodo = (text) => {
    const newTodos = [...todos, { id: Date.now(), text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDeleteRequest = (id) => {
    setTodoToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (todoToDelete) {
      const newTodos = todos.filter((todo) => todo.id !== todoToDelete);
      setTodos(newTodos);
      setIsModalOpen(false);
      setTodoToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setTodoToDelete(null);
  };

  const calculateProgress = () => {
    if (todos.length === 0) {
      return 0;
    }
    const completedTasks = todos.filter((todo) => todo.isCompleted).length;
    return (completedTasks / todos.length) * 100;
  };

  const progress = calculateProgress();

  return (
    <div className="app">
      <div className="todo-container">
        <h1 className="title">To-Do List</h1>
        <div className="progress-container">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{`${Math.round(progress)}%`}</span>
        </div>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          deleteTodo={handleDeleteRequest}
        />
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
}

export default App;
