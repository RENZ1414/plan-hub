import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import loginPic from '../img/Untitled-1.png';

const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const responce = await fetch ('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username, password})
            });

            const data = await responce.json();

            if (responce.ok) {

                localStorage.setItem('user', JSON.stringify(data));
                navigate('/home');
            } else {
                setError(data || 'Invalid username or password');
            }
        } catch (err) {
            setError('Account not found.');
        }
    };

    return (
        <div className='ngilo-user'>
            <div className='login-wrapper'>
                <div className='login-image'>
                    <img src={loginPic} alt="login illustration" />
                </div>

                <div className='user-login'>
                    <h1>Log In</h1>
                    <form onSubmit={handleLogin}>
                        <label>Username</label>
                        <input
                         type="text"
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                         required
                        />

                        <label>Password</label>
                        <input
                         type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         required
                        />

                        <button className='user-btn' type="submit">log in</button>
                    </form>

                    {error && <p style={{ color: 'red'}}>{error}</p>}

                    <Link to={"/register"}> sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
