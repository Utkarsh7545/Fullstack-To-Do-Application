import { useEffect, useState } from 'react';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../api';

interface Props {
  token: string;
  onLogout: () => void;
}

interface Todo {
  id: number;
  text: string;
}

export default function TodoApp({ token, onLogout }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await getTodos(token);
      setTodos(data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    try {
      await addTodo(token, text);
      setText('');
      loadTodos();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(token, id);
      loadTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleUpdate = async (id: number, newText: string) => {
    try {
      await updateTodo(token, id, newText);
      loadTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your To-Do List</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="New todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center border p-2 rounded">
            <input
              className="flex-1 mr-2"
              value={todo.text}
              onChange={(e) => handleUpdate(todo.id, e.target.value)}
            />
            <button onClick={() => handleDelete(todo.id)} className="text-red-500">
              ❌
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onLogout} className="mt-4 text-sm text-gray-500 underline">
        Logout
      </button>
    </div>
  );
}
