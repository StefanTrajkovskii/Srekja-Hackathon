import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';
import userAvatar from '../assets/users_avatar.png';

const Hackathons = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [hackathons, setHackathons] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
    loadHackathons();
  }, [navigate]);

  const loadHackathons = () => {
    const storedHackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    setHackathons(storedHackathons);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleJoinHackathon = (hackathon) => {
    const storedHackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    const hackathonIndex = storedHackathons.findIndex(h => h.id === hackathon.id);

    if (hackathonIndex === -1) {
      setErrorMessage('Hackathon not found');
      return;
    }

    // Check if user is already registered
    const isAlreadyRegistered = storedHackathons[hackathonIndex].participants?.some(
      participant => participant.email === currentUser.email
    );

    if (isAlreadyRegistered) {
      setErrorMessage('You are already registered for this hackathon');
      return;
    }

    // Add user to participants
    const participant = {
      email: currentUser.email,
      username: currentUser.username,
      joinedAt: new Date().toISOString()
    };

    storedHackathons[hackathonIndex].participants = [
      ...(storedHackathons[hackathonIndex].participants || []),
      participant
    ];

    // Save updated hackathons
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
        <div className="text-xl text-white cursor-pointer whitespace-nowrap font-['Press_Start_2P']" onClick={() => navigate('/')}>
          Hackathon Arena
        </div>
        <nav className="flex gap-8 items-center">
          {currentUser ? (
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

      <main className="container px-16 py-12 mx-auto">
        {errorMessage && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg ${
            errorMessage.includes('Successfully') ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'
          } border font-['Press_Start_2P'] text-sm`}>
            {errorMessage}
          </div>
        )}

        <h1 className="text-2xl text-[#00FF9D] mb-8">Available Hackathons</h1>

        <div className="grid grid-cols-1 gap-6">
          {hackathons.map(hackathon => (
            <div
              key={hackathon.id}
              className="bg-[#1F1B4B] rounded-xl p-6 border border-[#3D3580] hover:border-[#00FF9D] transition-colors duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl text-[#00FF9D] mb-2">{hackathon.title}</h3>
                  <p className="mb-4 text-gray-400">{hackathon.description}</p>
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <div>
                      <p className="text-gray-400">Start Date:</p>
                      <p className="text-white">{formatDate(hackathon.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">End Date:</p>
                      <p className="text-white">{formatDate(hackathon.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Participants:</p>
                      <p className="text-white">{hackathon.participants?.length || 0} / {hackathon.maxParticipants}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Status:</p>
                      <p className="text-white capitalize">{hackathon.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Difficulty:</p>
                      <p className="text-white">{hackathon.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Duration:</p>
                      <p className="text-white">{hackathon.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">City:</p>
                      <p className="text-white">{hackathon.city}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Location:</p>
                      <p className="text-white">{hackathon.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Prize:</p>
                      <p className="text-white">{hackathon.prize}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Skills Required:</p>
                      <p className="text-white">{hackathon.skillsRequired}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => handleJoinHackathon(hackathon)}
                    className={`px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                      hackathon.participants?.some(p => p.email === currentUser?.email)
                        ? 'bg-gray-600 cursor-not-allowed'
                        : hackathon.participants?.length >= hackathon.maxParticipants
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#00FF9D] to-[#00CC7D] hover:from-[#00CC7D] hover:to-[#00AA5D] hover:shadow-[0_0_15px_rgba(0,255,157,0.5)]'
                    }`}
                    disabled={
                      hackathon.participants?.some(p => p.email === currentUser?.email) ||
                      hackathon.participants?.length >= hackathon.maxParticipants
                    }
                  >
                    {hackathon.participants?.some(p => p.email === currentUser?.email)
                      ? 'Joined'
                      : hackathon.participants?.length >= hackathon.maxParticipants
                      ? 'Full'
                      : 'Join Now'}
                  </button>
                  <button
                    onClick={() => navigate('/hackathon', { state: { hackathon } })}
                    className="px-6 py-2 bg-gradient-to-r from-[#FF3A8C] to-[#FF1A6C] text-white rounded-lg transition-all duration-200 hover:from-[#FF1A6C] hover:to-[#FF0A5C] hover:shadow-[0_0_15px_rgba(255,58,140,0.5)] transform hover:scale-105"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleShowParticipants(hackathon)}
                    className="px-6 py-2 bg-gradient-to-r from-[#3D3580] to-[#2D2660] text-white rounded-lg transition-all duration-200 hover:from-[#2D2660] hover:to-[#1D1640] hover:shadow-[0_0_15px_rgba(61,53,128,0.5)] transform hover:scale-105"
                  >
                    Participants ({hackathon.participants?.length || 0})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Participants Modal */}
      {showParticipants && selectedHackathon && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black/50">
          <div className="bg-[#1F1B4B] rounded-xl p-8 w-[600px] border border-[#3D3580] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl text-[#00FF9D]">
                Participants
              </h3>
              <button
                onClick={() => setShowParticipants(false)}
                className="transition-all duration-200 transform text-white/60 hover:text-white hover:scale-105"
              >
                ✕
              </button>
            </div>
            
            {selectedHackathon.participants && selectedHackathon.participants.length > 0 ? (
              <div className="space-y-4">
                {selectedHackathon.participants.map((participant, index) => (
                  <div key={index} className="bg-[#17153C] rounded-lg p-4 border border-[#3D3580]">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-[#00FF9D] mb-1">{participant.username}</div>
                      </div>
                      <div className="text-sm text-gray-400">
                        Joined: {formatDate(participant.joinedAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-white/60">
                No participants yet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hackathons;
