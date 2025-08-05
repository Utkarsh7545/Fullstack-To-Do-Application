import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

function handleError(error: unknown, defaultMessage: string) {
  if (axios.isAxiosError(error)) {
    console.error(`${defaultMessage}:`, error.response?.data || error.message);
    throw error.response?.data || { error: defaultMessage };
  }
  console.error(`${defaultMessage}:`, error);
  throw { error: defaultMessage };
}

export async function loginUser(username: string, password: string) {
  try {
    const res = await API.post('/auth/login', { username, password });
    return res.data;
  } catch (error: unknown) {
    handleError(error, 'Login failed');
  }
}

export async function registerUser(username: string, password: string) {
  try {
    const res = await API.post('/auth/register', { username, password });
    return res.data;
  } catch (error: unknown) {
    handleError(error, 'Registration failed');
  }
}

export async function getTodos(token: string) {
  try {
    const res = await API.get('/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: unknown) {
    handleError(error, 'Fetching todos failed');
  }
}

export async function addTodo(token: string, text: string) {
  try {
    const res = await API.post(
      '/todos',
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error: unknown) {
    handleError(error, 'Adding todo failed');
  }
}

export async function updateTodo(token: string, id: number, text: string) {
  try {
    const res = await API.put(
      `/todos/${id}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error: unknown) {
    handleError(error, 'Updating todo failed');
  }
}

export async function deleteTodo(token: string, id: number) {
  try {
    const res = await API.delete(`/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: unknown) {
    handleError(error, 'Deleting todo failed');
  }
}
