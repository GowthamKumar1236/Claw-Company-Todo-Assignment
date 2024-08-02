import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const register = async () => {
        await axios.post('http://localhost:5000/register', { username, password });
    };

    const login = async () => {
        const response = await axios.post('http://localhost:5000/login', { username, password });
        setToken(response.data.token);
    };

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:5000/todos', {
            headers: { Authorization: token }
        });
        setTodos(response.data);
    };

    const createTodo = async () => {
        await axios.post('http://localhost:5000/todos', { description, status }, {
            headers: { Authorization: token }
        });
        fetchTodos();
    };

    useEffect(() => {
        if (token) fetchTodos();
        // eslint-disable-next-line
    }, [token]);

    return (
        <div>
            <h1>To-Do App</h1>
            <div>
                <h2>Register</h2>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={register}>Register</button>
            </div>
            <div>
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={login}>Login</button>
            </div>
            {token && (
                <div>
                    <h2>Create To-Do</h2>
                    <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <input type="text" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} />
                    <button onClick={createTodo}>Create</button>
                    <h2>Your To-Dos</h2>
                    <ul>
                        {todos.map(todo => (
                            <li key={todo.id}>{todo.description} - {todo.status}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
