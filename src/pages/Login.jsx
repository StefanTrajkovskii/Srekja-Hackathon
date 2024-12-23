import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth';

function Login() {
  const [focused, setFocused] = useState({});
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleFocus = (name) => {
    setFocused(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name) => {
    setFocused(prev => ({ ...prev, [name]: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      loginUser(formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#17153B] to-[#2E236C] flex flex-col items-center">
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-[#1E1B48] rounded-3xl p-12 w-[580px] shadow-lg mb-8">
          <h1 className="font-['Press_Start_2P'] text-3xl text-white text-center mb-16">
            Log in
          </h1>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm text-center font-['Press_Start_2P']">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#17153B] rounded-2xl p-4">
              <input
                type="text"
                name="username"
                placeholder={!focused.username ? "Username" : ""}
                value={formData.username}
                onChange={handleChange}
                onFocus={() => handleFocus('username')}
                onBlur={() => handleBlur('username')}
                className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.username || formData.username ? 'text-left' : 'text-center'} focus:outline-none`}
              />
            </div>

            <div className="bg-[#17153B] rounded-2xl p-4">
              <input
                type="password"
                name="password"
                placeholder={!focused.password ? "Password" : ""}
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.password || formData.password ? 'text-left' : 'text-center'} focus:outline-none`}
              />
            </div>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-[#00FF00] font-['Press_Start_2P'] text-sm hover:text-[#33FF33] transition-colors">
                Forgot password?
              </Link>
            </div>

            <div className="flex gap-8 justify-center mt-16">
              <Link to="/register">
                <button 
                  type="button"
                  className="bg-gradient-to-r from-[#FF3A8C] to-[#FF3AFF] text-white font-['Press_Start_2P'] py-3 px-12 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,58,255,0.5)] active:scale-95"
                >
                  Sign Up
                </button>
              </Link>
              <button 
                type="submit"
                className="bg-gradient-to-r from-[#4A3AFF] to-[#7C3AFF] text-white font-['Press_Start_2P'] py-3 px-12 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,255,0.5)] active:scale-95"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center gap-8 text-sm font-['Press_Start_2P'] text-white py-8">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a href="#" className="transition-colors hover:text-gray-300">Privacy Policy</a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a href="#" className="transition-colors hover:text-gray-300">Terms of Service</a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a href="#" className="transition-colors hover:text-gray-300">Contact Us</a>
      </div>
    </div>
  );
}

export default Login;
