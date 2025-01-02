import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/slider.css';
import hackathonImage from '../assets/image.png';
import userAvatar from '../assets/users_avatar.png';
import { getCurrentUser, logoutUser } from '../utils/auth';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [hackathons, setHackathons] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
    setCurrentUser(user);
    loadHackathons();
    loadRegisteredUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadHackathons = () => {
    const storedHackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    setHackathons(storedHackathons);
  };

  const loadRegisteredUsers = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUserEmail = currentUser?.email;
    
    // Filter out current user and ensure all required fields exist
    const processedUsers = users
      .filter(user => user.email !== currentUserEmail)
      .map(user => ({

        ...user,
        username: user.username || 'Anonymous',
        skills: Array.isArray(user.skills) ? user.skills : ['Web Developer', 'Programming'],
        profilePicture: user.profilePicture || null,
        fullName: user.fullName || ''
      }));

    setRegisteredUsers(processedUsers);
  };

  const getUserStats = (userEmail) => {
    const allHackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    const participations = allHackathons.filter(h => h.participants?.some(p => p.email === userEmail)).length;
    const wins = allHackathons.filter(h => h.participants?.[0]?.email === userEmail).length;
    return { participations, wins };
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    className: 'center',
    arrows: true,
  };

  const handleEnterNow = (hackathon) => {
    navigate('/hackathon', { state: { hackathon } });
  };

  // eslint-disable-next-line no-unused-vars
  const handleViewUser = () => {
    navigate('/user');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // If it's already in DD/MM/YYYY format, return as is
    if (dateString.includes('/')) return dateString;
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-gradient-to-b from-[#17153B] to-[#2E236C] min-h-screen text-white font-['Press_Start_2P']">
      <header className="flex justify-between items-center px-16 py-8">
        <div className="text-xl text-white cursor-pointer whitespace-nowrap font-['Press_Start_2P']" onClick={() => navigate('/')} >
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
                  <span className="font-['Press_Start_2P'] text-[#00FF9D] text-sm">
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

      <section className="px-8 py-16 text-center">
        <h1 className="font-['Electrolize'] text-7xl mb-24 mt-16 leading-relaxed text-white font-normal">
          Find Hackathons You Love. Code.<br />
          Connect. Conquer.
        </h1>
        <div className="max-w-[1400px] mx-auto relative px-24">
          <Slider {...settings}>
            {hackathons.map((hackathon) => (
              <div key={hackathon.id} className="px-4">
                <div className="flex overflow-hidden relative flex-col rounded-2xl shadow-lg backdrop-blur-md bg-white/10">
                  <div className="relative w-full h-[300px]">
                    <img src={hackathon.image || hackathonImage} alt="Hackathon" className="object-cover absolute inset-0 w-full h-full" />
                    <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-lg font-['Press_Start_2P'] text-sm text-white">FAQ</div>
                  </div>
                  <div className="bg-[rgba(44,43,88,0.95)] p-6 flex-grow flex flex-col gap-2 rounded-b-2xl">
                    <h3 className="font-['Press_Start_2P'] text-white text-lg mb-4 tracking-wider">{hackathon.title}</h3>
                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex flex-col gap-2">
                        <div className="text-white/60 font-['Electrolize'] text-sm tracking-wider">{hackathon.city}, {hackathon.location}</div>
                        <div className="text-white/60 font-['Electrolize'] text-sm tracking-wider">{formatDate(hackathon.startDate)}</div>
                      </div>
                      <button 
                        onClick={() => handleEnterNow(hackathon)} 
                        className="bg-[#1E1B45] text-white px-6 py-2 rounded-lg font-['Press_Start_2P'] text-sm 
                        hover:bg-[#2A2B5F] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95"
                      >
                        Enter Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="px-4 py-8">
        <h2 className="font-['Electrolize'] text-6xl mb-24   mt-14 text-center text-white font-normal">Why participate in hackathons</h2>
        <div className="max-w-[1400px] mx-auto p-8 flex justify-around items-center bg-[#1E1B48] rounded-2xl border-[3px] border-[#2D236B]" style={{ boxShadow: "4px 4px 4px 0 rgba(0,0,0,0.25)" }}>
          <div className="flex flex-col gap-4 items-center">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#FFA500]">40%</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">higher chances to land a job</div>
          </div>
          <svg width="4" height="100" viewBox="0 0 4 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="100" fill="white" fillOpacity="0.3"/>
          </svg>
          <div className="flex flex-col gap-4 items-center">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#00FF9D]">15</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">new connections on average</div>
          </div>
          <svg width="4" height="100" viewBox="0 0 4 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="100" fill="white" fillOpacity="0.3"/>
          </svg>
          <div className="flex flex-col gap-4 items-center">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#FF0000]">1</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">new project in your cv</div>
          </div>
          <svg width="4" height="100" viewBox="0 0 4 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="100" fill="white" fillOpacity="0.3"/>
          </svg>
          <div className="flex flex-col gap-4 items-center">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#FFD700]">50%</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">in real world projects</div>
          </div>
          <svg width="4" height="100" viewBox="0 0 4 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="100" fill="white" fillOpacity="0.3"/>
          </svg>
          <div className="flex flex-col gap-4 items-center">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#00BFFF]">10+</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">skills learned every hackathon</div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto mt-8 p-6 flex justify-between items-center bg-[#1E1B48] rounded-2xl border-[3px] border-[#2D236B]" style={{ boxShadow: "4px 4px 4px 0 rgba(0,0,0,0.25)" }}>
          <div className="flex gap-2 items-center">
            <span className="text-[#0088FF] font-['Electrolize'] text-xl">Learn</span>
            <span className="text-white font-['Electrolize'] text-xl">&</span>
            <span className="text-white font-['Electrolize'] text-xl">improve skills</span>
          </div>
          <div className="h-[40px] w-[2px] bg-white/30" />
          <div className="flex gap-2 items-center">
            <span className="text-white font-['Electrolize'] text-xl">Build you</span>
            <span className="text-[#FF0000] font-['Electrolize'] text-xl">network</span>
          </div>
          <div className="h-[40px] w-[2px] bg-white/30" />
          <div className="flex gap-2 items-center">
            <span className="text-white font-['Electrolize'] text-xl">Gain recognition</span>
            <span className="text-white font-['Electrolize'] text-xl">&</span>
            <span className="text-[#FFA500] font-['Electrolize'] text-xl">opportunities</span>
          </div>
          <div className="h-[40px] w-[2px] bg-white/30" />
          <div className="flex gap-2 items-center">
            <span className="text-[#00FF9D] font-['Electrolize'] text-xl">Challenge</span>
            <span className="text-white font-['Electrolize'] text-xl">yourself</span>
          </div>
          <div className="h-[40px] w-[2px] bg-white/30" />
          <div className="flex gap-2 items-center">
            <span className="text-[#FFD700] font-['Electrolize'] text-xl">Win prizes and have fun</span>
          </div>
        </div>
      </section>

      <section className="px-8 py-16">
        <h2 className="font-['Electrolize'] text-6xl mb-8 mt-8 text-center text-white font-normal">Find your hackathon</h2>
        
        <div className="flex gap-8 justify-center items-center mt-24 mb-16">
          <span className="font-['Press_Start_2P'] text-xl text-white">Filter by</span>
          <button className="bg-white text-xl rounded-lg px-6 py-3 font-['Electrolize'] text-[#17153B] flex items-center gap-2 
          hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95">
            Newest
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="bg-white text-xl rounded-lg px-6 py-3 font-['Electrolize'] text-[#17153B] flex items-center gap-2 
          hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95">
            Difficulty
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="bg-white text-xl rounded-lg px-6 py-3 font-['Electrolize'] text-[#17153B] flex items-center gap-2 
          hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95">
            Longest
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="bg-white text-xl rounded-lg px-6 py-3 font-['Electrolize'] text-[#17153B] flex items-center gap-2 
          hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95">
            Capacity
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-24 max-w-[1200px] mx-auto">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex overflow-hidden relative flex-col rounded-2xl shadow-lg backdrop-blur-md bg-white/10">
              <div className="flex relative flex-col justify-center items-center text-center aspect-video">
                <img src={hackathonImage} alt="Hackathon" className="object-contain w-full h-full" />
                <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-lg font-['Press_Start_2P'] text-sm text-white">FAQ</div>
              </div>
              <div className="bg-[rgba(44,43,88,0.95)] p-6 flex-grow flex flex-col gap-2 rounded-b-2xl">
                <h3 className="font-['Press_Start_2P'] text-white text-lg mb-4 tracking-wider">Hackathon Name</h3>
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex flex-col gap-2">
                    <div className="text-white/60 font-['Electrolize'] text-sm tracking-wider">City, Location</div>
                    <div className="text-white/60 font-['Electrolize'] text-sm tracking-wider">01/01/2025</div>
                  </div>
                  <button onClick={handleEnterNow} className="bg-[#1E1B45] text-white px-6 py-2 rounded-lg font-['Press_Start_2P'] text-sm 
                  hover:bg-[#2A2B5F] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95">
                    Enter Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-16">
        <h2 className="font-['Electrolize'] text-6xl mb-8 mt-8 text-center text-white font-normal">Connect with another user</h2>
        
        <div className="flex gap-8 justify-center items-center mt-24 mb-16">
          <span className="font-['Press_Start_2P'] text-xl text-white">Filter by</span>
          <button className="bg-white text-xl rounded-lg px-6 py-3 font-['Electrolize'] text-[#17153B] flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95">
            Most Wins
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="bg-white text-xl rounded-lg px-6 py-3 font-['Electrolize'] text-[#17153B] flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95">
            Category
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-16 max-w-[1400px] mx-auto mb-12">
          {registeredUsers.slice(0, 6).map((user) => {
            const { participations, wins } = getUserStats(user.email);
            return (
              <div key={user.email} className="bg-[#1E1B48] rounded-3xl overflow-hidden flex flex-col items-center p-8 relative backdrop-blur-md shadow-lg border-[3px] border-[#2D236B] min-w-[380px]">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-6 bg-[#8BB9FF]">
                  <img src={user.profilePicture || userAvatar} alt={user.username} className="object-cover w-full h-full" />
                </div>
                <div className="text-center mb-6 w-[400px]">
                  <h3 className="font-['Press_Start_2P'] text-white text-base tracking-[0.2em]">{user.username}</h3>
                  <h3 className="font-['Press_Start_2P'] text-white text-base tracking-[0.2em]">{user.fullName || ''}</h3>
                </div>
                <div className="font-['Press_Start_2P'] text-white/60 text-sm mb-8 text-center leading-6 tracking-[0.2em] w-[400px]">
                  {Array.isArray(user.skills) ? user.skills.slice(0, 4).map((skill, index) => (
                    <React.Fragment key={index}>
                      {skill}<br />
                    </React.Fragment>
                  )) : (
                    <>
                      Web Developer<br />
                      Programming<br />
                    </>
                  )}
                </div>
                <div className="flex gap-16 justify-center mb-8">
                  <div className="flex flex-col items-center">
                    <span className="font-['Press_Start_2P'] text-[#0088FF] text-2xl mb-1">{participations}</span>
                    <span className="font-['Press_Start_2P'] text-white/60 text-[10px]">Participations</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-['Press_Start_2P'] text-[#00FF9D] text-2xl mb-1">{wins}</span>
                    <span className="font-['Press_Start_2P'] text-white/60 text-[10px]">Wins</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/user/${user.username}`)} 
                  className="bg-white text-[#17153B] w-40 py-2 rounded-lg font-['Press_Start_2P'] text-xs 
                  hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Connect
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/users')}
            className="bg-[#00FF9D] text-[#17153B] px-8 py-3 rounded-lg font-['Press_Start_2P'] text-lg hover:bg-[#33FEB1] transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-[#00FF9D]/20"
          >
            Show All Users
          </button>
        </div>
      </section>

      <footer className="flex justify-between items-center px-16 py-8">
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

export default App;