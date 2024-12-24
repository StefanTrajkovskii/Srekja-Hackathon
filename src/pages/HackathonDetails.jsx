import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hackathonImage from '../assets/image.png';
import userAvatar from '../assets/users_avatar.png';
import { getCurrentUser, logoutUser } from '../utils/auth';

function HackathonDetails() {
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  const placeholders = {
    team: "People in your team, (3-5)",
    name: "Team name",
    members: "Tag your team members"
  };

  return (
    <div className="min-h-screen text-white font-['Press_Start_2P'] bg-gradient-to-b from-[#17153B] to-[#2E236C]">
      <header className="flex justify-between items-center px-16 py-8">
        <div className="text-xl text-white cursor-pointer whitespace-nowrap font-['Press_Start_2P']" onClick={() => navigate('/')}>
          Hackathon Arena
        </div>
        <nav className="flex gap-8 items-center">
          {isLoggedIn ? (
            <>
              <button 
                onClick={() => navigate('/hackathons')}
                className="font-['Press_Start_2P'] text-[#FFD700] hover:text-[#FFE44D] transition-colors px-4 py-2 rounded-lg hover:bg-[#17153B]"
              >
                Hackathons
              </button>
              <button 
                onClick={() => navigate('/users')}
                className="font-['Press_Start_2P'] text-[#00FF9D] hover:text-[#33FEB1] transition-colors px-4 py-2 rounded-lg hover:bg-[#17153B]"
              >
                Users
              </button>
              <button 
                onClick={() => navigate('/account')}
                className="font-['Press_Start_2P'] text-[#FF3A8C] hover:text-[#FF3AFF] transition-colors px-4 py-2 rounded-lg hover:bg-[#17153B]"
              >
                Account
              </button>
              <div className="flex gap-4 items-center">
                <div className="flex gap-3 items-center">
                  <img 
                    src={currentUser?.profilePicture || userAvatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border border-[#00FF9D] object-cover cursor-pointer hover:border-2 transition-all duration-200"
                    onClick={() => navigate('/account')}
                  />
                  <span className="text-[#00FF9D] text-sm">
                    {currentUser?.username}{currentUser?.username === 'stif' ? ' (admin)' : ''}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="font-['Press_Start_2P'] text-white bg-[#FF0000] hover:bg-[#FF3333] transition-colors px-6 py-2 rounded-lg hover:scale-105 transform duration-200"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="font-['Press_Start_2P'] text-white bg-[#4A3AFF] hover:bg-[#7C3AFF] transition-colors px-6 py-2 rounded-lg hover:scale-105 transform duration-200"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="font-['Press_Start_2P'] text-white bg-gradient-to-r from-[#FF3A8C] to-[#FF3AFF] hover:from-[#FF3AFF] hover:to-[#FF3A8C] transition-all px-6 py-2 rounded-lg hover:scale-105 transform duration-200"
              >
                Register
              </button>
            </>
          )}
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