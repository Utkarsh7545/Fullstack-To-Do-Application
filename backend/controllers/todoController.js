import { db } from '../models/db.js';

export const getTodos = async (req, res) => {
  try {
    const [todos] = await db.execute(
      'SELECT * FROM todos WHERE user_id = ?',
      [req.userId]
    );
    res.status(200).json(todos);
  } catch (error) {
    console.error('Get Todos Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Todo text is required' });
    }

    const [result] = await db.execute(
      'INSERT INTO todos (user_id, text) VALUES (?, ?)',
      [req.userId, text]
    );

    res.status(201).json({ message: 'Todo added', id: result.insertId });
  } catch (error) {
    console.error('Add Todo Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Todo text is required' });
    }

    const [result] = await db.execute(
      'UPDATE todos SET text = ? WHERE id = ? AND user_id = ?',
      [text, id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found or not owned by user' });
    }

    res.json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error('Update Todo Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found or not owned by user' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete Todo Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
