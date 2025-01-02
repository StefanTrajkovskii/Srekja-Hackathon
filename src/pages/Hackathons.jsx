import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';
import userAvatar from '../assets/users_avatar.png';

function Hackathons() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hackathons, setHackathons] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
    setCurrentUser(user);
    loadHackathons();
  }, []);

  const loadHackathons = () => {
    const storedHackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    setHackathons(storedHackathons);
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  const handleJoinHackathon = (hackathon) => {
    const storedHackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    const hackathonIndex = storedHackathons.findIndex(h => h.id === hackathon.id);

    if (hackathonIndex === -1) {
      setErrorMessage('Hackathon not found');
      return;
    }

    const isAlreadyRegistered = storedHackathons[hackathonIndex].participants?.some(
      participant => participant.email === currentUser.email
    );

    if (isAlreadyRegistered) {
      setErrorMessage('You are already registered for this hackathon');
      return;
    }

    const participant = {
      email: currentUser.email,
      username: currentUser.username,
      joinedAt: new Date().toISOString()
    };

    storedHackathons[hackathonIndex].participants = [
      ...(storedHackathons[hackathonIndex].participants || []),
      participant
    ];

    localStorage.setItem('hackathons', JSON.stringify(storedHackathons));
    setHackathons(storedHackathons);
    setErrorMessage('Successfully joined the hackathon!');
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleShowParticipants = (hackathon) => {
    setSelectedHackathon(hackathon);
    setShowParticipants(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('/')) return dateString;
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || hackathon.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="bg-gradient-to-b from-[#17153B] to-[#2E236C] min-h-screen text-white font-['Press_Start_2P']">
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
            </>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl text-center mb-12 text-[#FFE44D]">Hackathons</h1>

        {errorMessage && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg ${
            errorMessage.includes('Successfully') ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'
          } border font-['Press_Start_2P'] text-sm z-50`}>
            {errorMessage}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          <input
            type="text"
            placeholder="Search hackathons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1E1B48] text-white px-6 py-3 rounded-lg w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-[#00FF9D] transition-all"
          />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-[#1E1B48] text-white px-6 py-3 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#00FF9D] transition-all"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {filteredHackathons.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl mb-4">No Hackathons Found</h2>
              <p className="text-white/60">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredHackathons.map(hackathon => (
              <div
                key={hackathon.id}
                className="bg-[#1E1B48] rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF9D]/20"
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl text-[#00FF9D] mb-4">{hackathon.title}</h3>
                    <p className="text-white/80 mb-6">{hackathon.description}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-[#17153B] p-4 rounded-lg">
                      <p className="text-[#FFE44D] text-sm mb-2">Start Date</p>
                      <p className="text-white">{formatDate(hackathon.startDate)}</p>
                    </div>
                    <div className="bg-[#17153B] p-4 rounded-lg">
                      <p className="text-[#FFE44D] text-sm mb-2">End Date</p>
                      <p className="text-white">{formatDate(hackathon.endDate)}</p>
                    </div>
                    <div className="bg-[#17153B] p-4 rounded-lg">
                      <p className="text-[#FFE44D] text-sm mb-2">Participants</p>
                      <p className="text-white">{hackathon.participants?.length || 0} / {hackathon.maxParticipants}</p>
                    </div>
                    <div className="bg-[#17153B] p-4 rounded-lg">
                      <p className="text-[#FFE44D] text-sm mb-2">Status</p>
                      <p className="text-white capitalize">{hackathon.status}</p>
                    </div>
                    <div className="bg-[#17153B] p-4 rounded-lg">
                      <p className="text-[#FFE44D] text-sm mb-2">Difficulty</p>
                      <p className="text-white">{hackathon.difficulty}</p>
                    </div>
                    <div className="bg-[#17153B] p-4 rounded-lg">
                      <p className="text-[#FFE44D] text-sm mb-2">Duration</p>
                      <p className="text-white">{hackathon.duration}</p>
                    </div>
                    <div className="bg-[#17153B] p-4 rounded-lg">
                      <p className="text-[#FFE44D] text-sm mb-2">Prize</p>
                      <p className="text-white">{hackathon.prize}</p>
                    </div>
                    <div className="bg-[#17153B] p-4 rounded-lg">
                      <p className="text-[#FFE44D] text-sm mb-2">Location</p>
                      <p className="text-white">{hackathon.city}, {hackathon.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-2">
                    {hackathon.skillsRequired?.split(',').map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-[#2D236B] text-white/80 px-4 py-1 rounded-full text-xs"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <button
                      onClick={() => handleJoinHackathon(hackathon)}
                      className={`px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                        hackathon.participants?.some(p => p.email === currentUser?.email)
                          ? 'bg-[#2D236B] cursor-not-allowed'
                          : hackathon.participants?.length >= hackathon.maxParticipants
                          ? 'bg-[#2D236B] cursor-not-allowed'
                          : 'bg-[#00FF9D] text-[#17153B] hover:bg-[#33FEB1]'
                      }`}
                      disabled={
                        hackathon.participants?.some(p => p.email === currentUser?.email) ||
                        hackathon.participants?.length >= hackathon.maxParticipants
                      }
                    >
                      {hackathon.participants?.some(p => p.email === currentUser?.email)
                        ? 'Already Joined'
                        : hackathon.participants?.length >= hackathon.maxParticipants
                        ? 'Full'
                        : 'Join Now'}
                    </button>
                    <button
                      onClick={() => navigate('/hackathon', { state: { hackathon } })}
                      className="px-8 py-3 bg-[#FF3A8C] text-white rounded-lg hover:bg-[#FF3AFF] transition-all duration-200 transform hover:scale-105"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleShowParticipants(hackathon)}
                      className="px-8 py-3 bg-[#2D236B] text-white rounded-lg hover:bg-[#3D337B] transition-all duration-200 transform hover:scale-105"
                    >
                      View Participants ({hackathon.participants?.length || 0})
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Participants Modal */}
      {showParticipants && selectedHackathon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#1E1B48] rounded-xl p-8 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl text-[#00FF9D]">Participants</h3>
              <button
                onClick={() => setShowParticipants(false)}
                className="text-white/60 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            
            {selectedHackathon.participants && selectedHackathon.participants.length > 0 ? (
              <div className="space-y-4">
                {selectedHackathon.participants.map((participant, index) => (
                  <div 
                    key={index}
                    className="bg-[#17153B] rounded-lg p-4 hover:bg-[#1A1840] transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[#00FF9D]">{participant.username}</span>
                      <span className="text-white/60 text-sm">
                        Joined: {formatDate(participant.joinedAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/60">
                No participants yet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hackathons;
