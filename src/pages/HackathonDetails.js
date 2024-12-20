import React from 'react';
import { useNavigate } from 'react-router-dom';
import hackathonImage from '../assets/image.png';

const DetailItem = ({ label, value, color, isLast = false }) => (
  <div className="flex flex-col items-start gap-2 relative">
    <div className={`font-['Press_Start_2P'] text-base text-[${color}]`}>{label}</div>
    <div className="font-['Press_Start_2P'] text-sm text-white">{value}</div>
    {!isLast && (
      <div className="absolute right-[-1rem] h-full flex items-center">
        <div className="h-8 w-[1px] bg-white/20"></div>
      </div>
    )}
  </div>
);

const Input = ({ placeholder, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full py-4 px-6 bg-[rgba(30,27,69,0.9)] border-none rounded-[25px] text-white font-['Press_Start_2P'] text-sm placeholder:text-white/70"
  />
);

function HackathonDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white font-['Press_Start_2P'] bg-gradient-to-b from-[#17153B] to-[#2E236C]">
      <header className="flex justify-between items-center p-16 relative ">
        <div className="text-xl text-white cursor-pointer whitespace-nowrap font-['Press_Start_2P']" onClick={() => navigate('/')}>
          Hackathon Arena
        </div>
        <nav className="flex gap-16 items-center">
          <a href="#about" className="font-['Press_Start_2P'] text-[#FFD700] hover:text-[#FFE44D] transition-colors" onClick={() => navigate('/hackathons')}>Hackatons</a>
          <a href="#prizes" className="font-['Press_Start_2P'] text-[#00FF9D] hover:text-[#33FEB1] transition-colors" onClick={() => navigate('/users')}>Users</a>
          <a href="#schedule" className="font-['Press_Start_2P'] text-[#FF0000] hover:text-[#FF3333] transition-colors" onClick={() => navigate('/account')}>Account</a>
        </nav>
      </header>

      <div className="flex justify-between items-start p-16 relative my-24">
        <div className="flex flex-col max-w-[50%]">
          <h1 className="font-['Press_Start_2P'] text-5xl text-white mb-12 tracking-wider leading-tight 2xl:text-3xl 2xl:text-center">
            Hackathon Name
          </h1>
          <p className="font-['Electrolize'] text-2xl leading-8 text-white/80 max-w-[700px] 2xl:text-center 2xl:mx-auto 2xl:text-lg">
            A hackathon is an intense, collaborative event where participants come together to innovate, solve problems, 
            and build projects in a limited amount of time—usually 24 to 48 hours. It brings together developers, designers, 
            entrepreneurs, and tech enthusiasts to brainstorm ideas and turn them into functioning prototypes or solutions.
          </p>
        </div>

        <div className="relative w-[45%]">
          <div className="absolute top-0 right-0 font-['Press_Start_2P'] text-base text-white z-10">
            FAQ
          </div>
          <div className="w-full aspect-video bg-[#1E1B45] rounded-lg flex flex-col justify-center items-center p-8 overflow-hidden relative">
            <img
              src={hackathonImage}
              alt="Hackathon"
              className="w-full h-full object-cover absolute top-0 left-0"
            />
            <div className="font-['Press_Start_2P'] text-4xl text-[#3B82F6] text-center mb-4 z-10 drop-shadow-lg">
              SKP CODE
            </div>
            <div className="font-['Press_Start_2P'] text-5xl text-[#3B82F6] z-10 drop-shadow-lg">
              2024
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto my-8 bg-[rgba(23,21,59,0.9)] rounded-xl py-6 px-12 flex justify-between items-center">
        <DetailItem
          label="When?"
          value="20-12-2024, 9am"
          color="#0088FF"
        />
        <DetailItem
          label="Duration?"
          value="48 hours"
          color="#00FF9D"
        />
        <DetailItem
          label="Where?"
          value="Srekja Bar, Skopje"
          color="#FFD700"
        />
        <DetailItem
          label="Difficulty?"
          value="Advanced"
          color="#FF0000"
          isLast
        />
      </div>

      <div className="mx-auto my-24 max-w-[600px] bg-[rgba(30,27,69,0.5)] rounded-[25px] p-12 flex flex-col items-center gap-6">
        <h2 className="font-['Press_Start_2P'] text-white text-4xl mb-4">
          Start
        </h2>
        <Input placeholder="People in your team, (3-5)" />
        <Input placeholder="Team name" />
        <Input placeholder="Tag your team members" />
        <button
          className="w-full py-4 px-6 bg-[#FF0000] rounded-[25px] text-white font-['Press_Start_2P'] text-sm hover:bg-[#D10000] transition-colors"
        >
          Submit
        </button>
      </div>

      <footer className="flex justify-between items-center px-16 py-8">
        <div className="text-lg">Hackathon Arena</div>
        <nav className="flex gap-8">
          <a href="#about" className="text-white hover:text-[#FFE44D] transition-colors">Hackatons</a>
          <a href="#prizes" className="text-white hover:text-[#33FEB1] transition-colors">Users</a>
          <a href="#schedule" className="text-white hover:text-[#FF3333] transition-colors">Account</a>
        </nav>
        <div className="text-sm">Copyright 2024</div>
      </footer>
    </div>
  );
}

export default HackathonDetails;
