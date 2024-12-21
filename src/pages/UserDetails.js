import React from 'react';
import { useNavigate } from 'react-router-dom';
import userAvatar from '../assets/users_avatar.png';
import badgeIcon from '../assets/badge.svg';
import checkmarkIcon from '../assets/checkmark.svg';

const SkillProgress = ({ skill, percentage, color }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`w-32 h-32 rounded-full relative`}>
        <div className="w-full h-full rounded-full absolute"
          style={{
            background: `conic-gradient(${color} ${percentage}%, transparent ${percentage}%)`,
            transform: 'rotate(-90deg)'
          }}
        />
        <div className="w-28 h-28 rounded-full bg-[#17153B] absolute top-2 left-2 flex items-center justify-center">
          <span className="text-white text-xl">{percentage}%</span>
        </div>
      </div>
      <span className="text-white text-lg mt-2">{skill}</span>
    </div>
  );
};

const UserDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#17153B] to-[#2E236C] min-h-screen text-white font-['Press_Start_2P']">
      <header className="flex justify-between items-center px-16 py-8">
        <div className="text-xl text-white cursor-pointer whitespace-nowrap font-['Press_Start_2P']" onClick={() => navigate('/')}>
          Hackathon Arena
        </div>
        <nav className="flex gap-16 items-center">
          <a href="#about" className="font-['Press_Start_2P'] text-[#FFD700] hover:text-[#FFE44D] transition-colors" onClick={() => navigate('/hackathons')}>Hackatons</a>
          <a href="#prizes" className="font-['Press_Start_2P'] text-[#00FF9D] hover:text-[#33FEB1] transition-colors" onClick={() => navigate('/users')}>Users</a>
          <a href="#schedule" className="font-['Press_Start_2P'] text-[#FF0000] hover:text-[#FF3333] transition-colors" onClick={() => navigate('/account')}>Account</a>
        </nav>
      </header>

      <main className="container mx-auto px-16 py-12 mt-16">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-6">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-blue-200">
              <img 
                src={userAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-6 mt-4">
              <h1 className="text-4xl">John Collins</h1>
              <div className="flex gap-4">
                <img src={badgeIcon} alt="Badge" className="w-12 h-12" />
                <img src={badgeIcon} alt="Badge" className="w-12 h-12" />
              </div>
            </div>
          </div>

          <div className="flex gap-32 mt-8">
            <SkillProgress skill="React" percentage={78} color="#FF0000" />
            <SkillProgress skill="Node.js" percentage={75} color="#00FF9D" />
            <SkillProgress skill="PHP" percentage={90} color="#FFD700" />
            <SkillProgress skill="Python" percentage={30} color="#00A3FF" />
          </div>

          <div className="grid grid-cols-2 gap-20 w-full max-w-6xl mt-16 px-8">
            <div className="text-white text-3xl leading-relaxed font-['Electrolize']">
              I'm John Collins, a full-stack programmer with a passion for building efficient and user-friendly applications. I specialize in both frontend and backend development, working with technologies like React, Node.js, and Python. I enjoy solving complex problems and collaborating with teams to deliver high-quality projects on time.
            </div>

            <div className="flex flex-col justify-center gap-16">
              <div className="flex items-center gap-4">
                <img src={checkmarkIcon} alt="Skill" className="w-8" />
                <span className="text-white text-xl">Leadership Skills</span>
              </div>
              <div className="flex items-center gap-4">
                <img src={checkmarkIcon} alt="Skill" className="w-8" />
                <span className="text-white text-xl">Communication Skills</span>
              </div>
              <div className="flex items-center gap-4">
                <img src={checkmarkIcon} alt="Skill" className="w-8" />
                <span className="text-white text-xl">Project Management</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1B48] w-full max-w-8xl mt-24 p-12 rounded-lg flex justify-between items-center">
            <h2 className="text-2xl text-white font-['Electrolize']">
              Connect with John Collins and have a chance to join forces and conquer hackathons!
            </h2>
            <button className="bg-[#FF0000] text-white px-24 py-4 rounded-lg font-['Electrolize'] text-2xl hover:bg-[#CC0000] transition-colors">
              Connect
            </button>
          </div>
        </div>
      </main>

      <footer className="py-8 px-16 flex justify-between items-center mt-16">
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
};

export default UserDetails;