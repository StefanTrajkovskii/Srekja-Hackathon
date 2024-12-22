import React from 'react';
import { useNavigate } from 'react-router-dom';
import hackathonImage from '../assets/image.png';

function HackathonDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white font-['Press_Start_2P'] bg-gradient-to-b from-[#17153B] to-[#2E236C]">
      <header className="flex justify-between items-center p-16 relative">
        <div className="text-xl text-white cursor-pointer whitespace-nowrap font-['Press_Start_2P']" onClick={() => navigate('/')}>
          Hackathon Arena
        </div>
        <nav className="flex gap-16 items-center">
          <a href="#about" className="font-['Press_Start_2P'] text-[#FFD700] hover:text-[#FFE44D] transition-colors" onClick={() => navigate('/hackathons')}>Hackatons</a>
          <a href="#prizes" className="font-['Press_Start_2P'] text-[#00FF9D] hover:text-[#33FEB1] transition-colors" onClick={() => navigate('/users')}>Users</a>
          <a href="#schedule" className="font-['Press_Start_2P'] text-[#FF0000] hover:text-[#FF3333] transition-colors" onClick={() => navigate('/account')}>Account</a>
        </nav>
      </header>

      <div className="flex justify-between items-center px-16 py-12 gap-12">
        <div className="w-1/2 flex flex-col justify-center h-[600px]">
          <h1 className="font-['Press_Start_2P'] text-5xl text-white mb-4">
            Hackathon Name
          </h1>
          <p className="font-['Electrolize'] text-2xl leading-relaxed text-white/80">
            A hackathon is an intense, collaborative event where participants come together to innovate, solve problems, and build projects in a limited amount of time—usually 24 to 48 hours. It brings together developers, designers, entrepreneurs, and tech enthusiasts to brainstorm ideas and turn them into functioning prototypes or solutions.
          </p>
        </div>
        <div className="w-1/2">
          <img src={hackathonImage} alt="Hackathon" className="w-full h-[600px] object-cover rounded-3xl" />
        </div>
      </div>

      <div className="flex justify-center mt-32">
        <div className="bg-[#1E1B48] rounded-2xl p-8 flex justify-between items-center w-[1200px] border-[3px] border-[#2D236B]" style={{ boxShadow: "4px 4px 4px 0 rgba(0,0,0,0.25)" }}>
          <div>
            <div className="font-['Press_Start_2P'] text-[#00A3FF] text-xl mb-2">When?</div>
            <div className="font-['Electrolize'] text-white text-xl">20-12-2024, 9am</div>
          </div>
          <div className="w-px h-12 bg-gray-700"></div>
          <div>
            <div className="font-['Press_Start_2P'] text-[#00FF9D] text-xl mb-2">Duration?</div>
            <div className="font-['Electrolize'] text-white text-xl">48 hours</div>
          </div>
          <div className="w-px h-12 bg-gray-700"></div>
          <div>
            <div className="font-['Press_Start_2P'] text-[#FFD700] text-xl mb-2">Where?</div>
            <div className="font-['Electrolize'] text-white text-xl">Srekja Bar, Skopje</div>
          </div>
          <div className="w-px h-12 bg-gray-700"></div>
          <div>
            <div className="font-['Press_Start_2P'] text-[#FF0000] text-xl mb-2">Difficulty?</div>
            <div className="font-['Electrolize'] text-white text-xl">Advanced</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HackathonDetails;