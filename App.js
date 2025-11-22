import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import { isAuthenticated, getUser } from './utils/auth';

function App() {
  const [auth, setAuth] = useState(isAuthenticated());
  const [view, setView] = useState('home');

  const user = getUser();

  function handleLogin() {
    setAuth(true);
    setView('home');
  }

  function handleLogout() {
    setAuth(false);
    setView('login');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>PlanHub</h1>
        <nav>
          <button onClick={() => setView('home')}>Home</button>
          {!auth && <button onClick={() => setView('login')}>Log In</button>}
          {auth && <button onClick={() => setView('logout')}>Log Out</button>}
        </nav>
        {auth && <div className="user">Signed in as: {user?.email}</div>}
      </header>

      <main>
        {view === 'home' && <Home />}
        {view === 'login' && <Login onLogin={handleLogin} />}
        {view === 'logout' && <Logout onLoggedOut={handleLogout} />}
      </main>
    </div>
  );
}

export default App;
