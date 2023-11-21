// src/components/Register.tsx

import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import img from '../images/loginimage.avif'
import hide from '../images/hide.png'
import view from '../images/view.png'

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleTogglePassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async () => {
        try {
            // Clear previous errors
            setError(null);

            // Check if passwords match
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            // Call the registration API with user information
            const response = await axios.post('http://localhost:8000/api/register/', {
                username: username,
                email: email,
                phone: phone,
                address: address,
                password: password,
            });
            alert("Registration Successful:")
            window.location.href='/'
            console.log('Registration Successful:', response.data);
        } catch (err) {
            // Handle API errors
            setError('Registration failed. Please check your information.');
        }
    };

    return (
        <div className="flex items-center container justify-center mt-20 vh-100">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h2 className="text-2xl text-center font-semibold leading-7 text-teal-400">Register</h2>
                <form className="space-y-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        />
                    </div>
                    <div>
      <label className="block text-sm font-medium text-gray-700">
        Password:
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />
        <button
          type="button"
          className="absolute top-2 right-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <img
              src={hide}
              alt="Hide"
              className="w-4 h-4"
            />
          ) : (
            <img
              src={view}
              alt="Show"
              className="w-4 h-4"
            />
          )}
        </button>
      </div>
    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password:
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            />
                            <button
                                type="button"
                                className="absolute top-2 right-2"
                                onClick={handleTogglePassword}
                            >
                                {showConfirmPassword ? (
                                    <img
                                        src={hide}
                                        alt="Hide"
                                        className="w-4 h-4"
                                    />
                                ) : (
                                    <img
                                        src={view}
                                        alt="Show"
                                        className="w-4 h-4"
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleRegister}
                        className=" bg-cyan-500 text-white rounded-full px-6 py-3 items-center justify-center"
                    >
                        Register
                    </button>
                    <div>
                        Already have an account?{' '}
                        <Link to="/" className="text-blue-500">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
