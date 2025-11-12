import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import bg from '../assets/bg.png'; // Add this import

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch (`${process.env.REACT_APP_API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem('user', JSON.stringify(data));
                navigate('/home');
            } else {
                setError(data || 'Invalid Username or Password');
            }
        }catch (err) {
            setError('Invalid Credentials.');
        }
    };

    return (
        <div className="ngilo-user" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className="user-login" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                width: '100%',
                maxWidth: '400px',
                border: '6px solid skyblue',
                backdropFilter: 'blur(5px)'
            }}>
                <h2 className="SignUp">Log In</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required    
                        />
                    </div>

                    <button className="signupbtn" type="submit">Log In</button>
                </form>

                {error && <p style={{ color : 'red'}}>{error}</p>}

                <p>
                    Don't have an account? <Link to={"/register"} className="linkLogin">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;