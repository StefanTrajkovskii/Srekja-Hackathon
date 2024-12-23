import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';

function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('developer');
  const [focused, setFocused] = useState({});
  const [error, setError] = useState('');
  const [validations, setValidations] = useState({
    username: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
    password: { isValid: true, message: '' },
    confirmPassword: { isValid: true, message: '' }
  });
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    job: '',
    description: '',
    programmingLanguages: '',
    skills: ''
  });

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return { isValid: false, message: 'Password must be at least 8 characters' };
    }
    if (!hasUpperCase || !hasLowerCase) {
      return { isValid: false, message: 'Password must contain both upper and lowercase letters' };
    }
    if (!hasNumbers) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    if (!hasSpecialChar) {
      return { isValid: false, message: 'Password must contain at least one special character' };
    }
    return { isValid: true, message: '' };
  };

  const validateUsername = (username) => {
    if (username.length < 3) {
      return { isValid: false, message: 'Username must be at least 3 characters' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { isValid: false, message: 'Username can only contain letters, numbers, and underscores' };
    }
    if (checkUsernameExists(username)) {
      return { isValid: false, message: 'Username is already taken' };
    }
    return { isValid: true, message: '' };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    if (checkEmailExists(email)) {
      return { isValid: false, message: 'Email is already registered' };
    }
    return { isValid: true, message: '' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');

    // Real-time validation
    switch (name) {
      case 'username':
        setValidations(prev => ({ ...prev, username: validateUsername(value) }));
        break;
      case 'email':
        setValidations(prev => ({ ...prev, email: validateEmail(value) }));
        break;
      case 'password':
        const passwordValidation = validatePassword(value);
        setValidations(prev => ({ 
          ...prev, 
          password: passwordValidation,
          confirmPassword: value === formData.confirmPassword 
            ? { isValid: true, message: '' }
            : { isValid: false, message: 'Passwords do not match' }
        }));
        break;
      case 'confirmPassword':
        setValidations(prev => ({
          ...prev,
          confirmPassword: value === formData.password
            ? { isValid: true, message: '' }
            : { isValid: false, message: 'Passwords do not match' }
        }));
        break;
      default:
        break;
    }
  };

  const handleFocus = (field) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

  const checkUsernameExists = (username) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
  };

  const checkEmailExists = (email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check
    const usernameValidation = validateUsername(formData.username);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = formData.password === formData.confirmPassword
      ? { isValid: true, message: '' }
      : { isValid: false, message: 'Passwords do not match' };

    setValidations({
      username: usernameValidation,
      email: emailValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation
    });

    if (!usernameValidation.isValid || !emailValidation.isValid || 
        !passwordValidation.isValid || !confirmPasswordValidation.isValid) {
      return;
    }

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
              type="text"
              name="username"
              placeholder={!focused.username ? "Username" : ""}
              value={formData.username}
              onChange={handleChange}
              onFocus={() => handleFocus('username')}
              onBlur={() => handleBlur('username')}
              className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.username || formData.username ? 'text-left' : 'text-center'} focus:outline-none ${!validations.username.isValid ? 'border-red-500' : ''}`}
            />
            {!validations.username.isValid && (
              <p className="mt-2 text-xs text-red-500">{validations.username.message}</p>
            )}
          </div>

          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="email"
              name="email"
              placeholder={!focused.email ? "Email" : ""}
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.email || formData.email ? 'text-left' : 'text-center'} focus:outline-none ${!validations.email.isValid ? 'border-red-500' : ''}`}
            />
            {!validations.email.isValid && (
              <p className="mt-2 text-xs text-red-500">{validations.email.message}</p>
            )}
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
              className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.password || formData.password ? 'text-left' : 'text-center'} focus:outline-none ${!validations.password.isValid ? 'border-red-500' : ''}`}
            />
            {!validations.password.isValid && (
              <p className="mt-2 text-xs text-red-500">{validations.password.message}</p>
            )}
          </div>

          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder={!focused.confirmPassword ? "Confirm Password" : ""}
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => handleFocus('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              className={`w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white ${focused.confirmPassword || formData.confirmPassword ? 'text-left' : 'text-center'} focus:outline-none ${!validations.confirmPassword.isValid ? 'border-red-500' : ''}`}
            />
            {!validations.confirmPassword.isValid && (
              <p className="mt-2 text-xs text-red-500">{validations.confirmPassword.message}</p>
            )}
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
