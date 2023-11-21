// src/components/Login.tsx

import { useState } from 'react';
import axios from 'axios';
import img from '../images/loginimage.avif'
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            // Gọi API login với thông tin đăng nhập
            const response = await axios.post('http://localhost:8000/api/login/', {
                username: username,
                password: password,
            });

            // Xử lý response từ API ở đây, có thể lưu token vào localStorage hoặc Redux state.
            console.log('Login Successful:', response.data);
            const {token,role} = response.data;
            localStorage.setItem('token', token);
            if(role==='User')
            {
                window.location.href='/homeuser'
            }
            else
            {
                window.location.href='/homeadmin'
            }
        } catch (err) {
            // Xử lý lỗi từ API ở đây
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center container justify-center mt-20 vh-100">
            <div className=''>
                <img src={img} alt="" />
            </div>
            <div>
                <h2 className="text-2xl text-center font-semibold leading-7 text-teal-400">Login</h2>
                <form className="space-y-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-9 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className=" bg-cyan-500 text-white rounded-full px-6 py-3 items-center justify-center"
                    >
                        Login
                    </button>
                    <div>
                        Don't have account? {''}
                        <Link to="/register" className="text-blue-500">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
