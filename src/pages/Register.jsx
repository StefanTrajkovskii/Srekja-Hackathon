import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';

function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('developer');
  const [focused, setFocused] = useState({});
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    job: '',
    description: '',
    programmingLanguages: '',
    skills: ''
  });

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
      registerUser(formData);
      // Redirect to home page after successful registration
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#17153B] to-[#2E236C] flex flex-col items-center justify-center">
      <div className="bg-[#1E1B48] rounded-3xl p-12 w-[580px] shadow-lg mb-8">
        <h1 className="font-['Press_Start_2P'] text-3xl text-white text-center mb-16">
          Create account
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm text-center font-['Press_Start_2P']">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="email"
              name="email"
              placeholder={!focused.email ? "Email" : ""}
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.email || formData.email ? 'text-left' : 'text-center'} focus:outline-none`}
            />
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#17153B] rounded-2xl p-4">
              <input
                type="text"
                name="job"
                placeholder={!focused.job ? "Job" : ""}
                value={formData.job}
                onChange={handleChange}
                onFocus={() => handleFocus('job')}
                onBlur={() => handleBlur('job')}
                className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.job || formData.job ? 'text-left' : 'text-center'} focus:outline-none`}
              />
            </div>
            <div className="bg-[#17153B] rounded-2xl p-4">
              <input
                type="text"
                name="description"
                placeholder={!focused.description ? "Description" : ""}
                value={formData.description}
                onChange={handleChange}
                onFocus={() => handleFocus('description')}
                onBlur={() => handleBlur('description')}
                className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.description || formData.description ? 'text-left' : 'text-center'} focus:outline-none`}
              />
            </div>
          </div>

          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="text"
              name="programmingLanguages"
              placeholder={!focused.programmingLanguages ? "Programming Languages" : ""}
              value={formData.programmingLanguages}
              onChange={handleChange}
              onFocus={() => handleFocus('programmingLanguages')}
              onBlur={() => handleBlur('programmingLanguages')}
              className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.programmingLanguages || formData.programmingLanguages ? 'text-left' : 'text-center'} focus:outline-none`}
            />
          </div>

          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="text"
              name="skills"
              placeholder={!focused.skills ? "Skills" : ""}
              value={formData.skills}
              onChange={handleChange}
              onFocus={() => handleFocus('skills')}
              onBlur={() => handleBlur('skills')}
              className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.skills || formData.skills ? 'text-left' : 'text-center'} focus:outline-none`}
            />
          </div>

          <div className="flex bg-[#17153B] rounded-full p-1 mt-8 relative">
            <div 
              className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                userType === 'organizer' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            <button
              type="button"
              className={`flex-1 py-3 px-8 rounded-full font-['Press_Start_2P'] text-base transition-all relative z-10 ${
                userType === 'developer'
                  ? 'text-[#17153B]'
                  : 'text-[#666666] hover:text-white'
                }`}
              onClick={() => setUserType('developer')}
            >
              Developer
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-8 rounded-full font-['Press_Start_2P'] text-base transition-all relative z-10 ${
                userType === 'organizer'
                ? 'text-[#17153B]'
                  : 'text-[#666666] hover:text-white'
                }`}
              onClick={() => setUserType('organizer')}
            >
              Organizer
            </button>
          </div>

          <div className='flex justify-center mt-16'>        
            <button 
              type="submit"
              className="mt-12 bg-gradient-to-r from-[#4A3AFF] to-[#7C3AFF] text-white font-['Press_Start_2P'] py-3 px-12 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,255,0.5)] active:scale-95"
            >
              Create profile
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-center gap-8 text-sm font-['Press_Start_2P'] text-white">
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

export default Register;
