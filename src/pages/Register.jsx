import React, { useState } from 'react';

function Register() {
  const [userType, setUserType] = useState('developer');
  
  return (
    <div className="h-screen bg-gradient-to-b from-[#17153B] to-[#2E236C] flex flex-col items-center justify-center">
      <div className="bg-[#1E1B48] rounded-3xl p-12 w-[580px] shadow-lg mb-8">
        <h1 className="font-['Press_Start_2P'] text-3xl text-white text-center mb-16">
          Create account
        </h1>

        <div className="space-y-4">
          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white text-center focus:outline-none"
            />
          </div>

          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white text-center focus:outline-none"
              />
          </div>

          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white text-center focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#17153B] rounded-2xl p-4">
              <input
                type="text"
                placeholder="Job"
                className="w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white text-center focus:outline-none"
              />
            </div>
            <div className="bg-[#17153B] rounded-2xl p-4">
              <input
                type="text"
                placeholder="Description"
                className="w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white text-center focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="text"
              placeholder="Programming Languages"
              className="w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white text-center focus:outline-none"
              />
          </div>

          <div className="bg-[#17153B] rounded-2xl p-4">
            <input
              type="text"
              placeholder="Skills"
              className="w-full bg-transparent font-['Press_Start_2P'] text-white placeholder-white text-center focus:outline-none"
              />
          </div>
        </div>

        <div className="flex bg-[#17153B] rounded-full p-1 mt-8 relative">
          <div 
            className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full transition-transform duration-300 ease-in-out ${
              userType === 'organizer' ? 'translate-x-full' : 'translate-x-0'
            }`}
          />
          <button
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

        <div className='flex justify-center'>        
          <button className=" bg-white text-[#17153B] font-['Press_Start_2P'] py-3 px-4 rounded-full mt-8">
            Create profile
          </button>
        </div>
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
