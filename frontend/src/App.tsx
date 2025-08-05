import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TodoApp from './components/TodoApp';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [view, setView] = useState<'login' | 'register'>('login');

  if (!token) {
    return (
      <div className="p-4 max-w-md mx-auto my-20 border rounded shadow-md">
        {view === 'login' ? (
          <>
            <LoginForm onLogin={(t) => setToken(t)} />
            <p className="text-sm mt-2">
              Don't have an account?{' '}
              <button
                className="text-blue-600 underline"
                onClick={() => setView('register')}
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm onRegister={() => setView('login')} />
            <p className="text-sm mt-2">
              Already have an account?{' '}
              <button
                className="text-blue-600 underline"
                onClick={() => setView('login')}
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  return <TodoApp token={token} onLogout={() => setToken(null)} />;
}

export default App;
