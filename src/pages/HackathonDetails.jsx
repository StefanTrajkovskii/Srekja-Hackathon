import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hackathonImage from '../assets/image.png';

function HackathonDetails() {
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);

  const placeholders = {
    team: "People in your team, (3-5)",
    name: "Team name",
    members: "Tag your team members"
  };

  return (
    <div className="min-h-screen text-white font-['Press_Start_2P'] bg-gradient-to-b from-[#17153B] to-[#2E236C]">
      <header className="flex relative justify-between items-center p-16">
        <div className="text-xl text-white cursor-pointer whitespace-nowrap font-['Press_Start_2P']" onClick={() => navigate('/')}>
          Hackathon Arena
        </div>
        <nav className="flex gap-16 items-center">
          <a href="#about" className="font-['Press_Start_2P'] text-[#FFD700] hover:text-[#FFE44D] transition-colors" onClick={() => navigate('/hackathons')}>Hackatons</a>
          <a href="#prizes" className="font-['Press_Start_2P'] text-[#00FF9D] hover:text-[#33FEB1] transition-colors" onClick={() => navigate('/users')}>Users</a>
          <a href="#schedule" className="font-['Press_Start_2P'] text-[#FF0000] hover:text-[#FF3333] transition-colors" onClick={() => navigate('/account')}>Account</a>
        </nav>
      </header>

      <div className="flex gap-24 justify-between items-center px-16 py-32">
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

      <div className="flex justify-center mt-32">
        <div className="bg-[#1E1B48] rounded-[32px] p-16 w-[700px] border-[3px] border-[#2D236B]" style={{ boxShadow: "4px 4px 4px 0 rgba(0,0,0,0.25)" }}>
          <h2 className="font-['Press_Start_2P'] text-5xl text-white text-center mb-16">Start</h2>
          <form className="flex flex-col gap-6">
            <div className="bg-[#17153C] rounded-[24px] p-5">
              <input 
                type="text" 
                placeholder={focusedInput === 'team' ? '' : placeholders.team}
                onFocus={() => setFocusedInput('team')}
                onBlur={(e) => {
                  if (!e.target.value) setFocusedInput(null);
                }}
                className="w-full bg-transparent font-['Press_Start_2P'] text-lg text-white/70 placeholder-white/70 outline-none text-left placeholder:text-center"
              />
            </div>
            <div className="bg-[#17153C] rounded-[24px] p-5">
              <input 
                type="text" 
                placeholder={focusedInput === 'name' ? '' : placeholders.name}
                onFocus={() => setFocusedInput('name')}
                onBlur={(e) => {
                  if (!e.target.value) setFocusedInput(null);
                }}
                className="w-full bg-transparent font-['Press_Start_2P'] text-lg text-white/70 placeholder-white/70 outline-none text-left placeholder:text-center"
              />
            </div>
            <div className="bg-[#17153C] rounded-[24px] p-5">
              <input 
                type="text" 
                placeholder={focusedInput === 'members' ? '' : placeholders.members}
                onFocus={() => setFocusedInput('members')}
                onBlur={(e) => {
                  if (!e.target.value) setFocusedInput(null);
                }}
                className="w-full bg-transparent font-['Press_Start_2P'] text-lg text-white/70 placeholder-white/70 outline-none text-left placeholder:text-center"
              />
            </div>
            <div className="flex justify-center mt-8">
              <button 
                type="submit" 
                className="bg-[#FF0000] text-white font-['Press_Start_2P'] text-xl px-16 py-4 rounded-[16px] hover:bg-[#CC0000] transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="flex justify-between items-center px-16 py-8 mt-32">
        <div className="font-['Press_Start_2P'] text-white text-lg">Hackathon Arena</div>
        <nav className="flex flex-col gap-4 items-center">
          <a href="#about" className="font-['Press_Start_2P'] text-white hover:text-[#FFE44D] transition-colors" onClick={() => navigate('/hackathons')}>Hackatons</a>
          <a href="#prizes" className="font-['Press_Start_2P'] text-white hover:text-[#33FEB1] transition-colors" onClick={() => navigate('/users')}>Users</a>
          <a href="#schedule" className="font-['Press_Start_2P'] text-[#FF0000] hover:text-[#FF3333] transition-colors" onClick={() => navigate('/account')}>Account</a>
        </nav>
        <div className="font-['Press_Start_2P'] text-white text-sm">Copyright 2024</div>
      </footer>
    </div>
  );
}

export default HackathonDetails;