import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';
import userAvatar from '../assets/users_avatar.png';

const Hackathons = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [hackathons, setHackathons] = useState([]);

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
    if (hackathon.participants.includes(currentUser.username)) {
      return; // Already joined
    }

    if (hackathon.participants.length >= hackathon.maxParticipants) {
      alert('This hackathon is full');
      return;
    }

    const updatedHackathons = hackathons.map(h => {
      if (h.id === hackathon.id) {
        return {
          ...h,
          participants: [...h.participants, currentUser.username]
        };
      }
      return h;
    });

    localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
    setHackathons(updatedHackathons);
  };

  return (
    <div className="bg-gradient-to-b from-[#17153B] to-[#2E236C] min-h-screen text-white font-['Press_Start_2P']">
      {/* Navigation */}
      <header className="bg-[#17153B] border-b border-[#3D3580]">
        <nav className="container px-16 py-4 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-8 items-center">
              <button 
                onClick={() => navigate('/')}
                className="text-[#00FF9D] hover:text-[#00CC7D] transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/account')}
                className="text-[#FF3A8C] hover:text-[#FF3AFF] transition-colors"
              >
                Account
              </button>
            </div>
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
                className="text-white bg-[#FF0000] hover:bg-[#FF3333] transition-colors px-6 py-2 rounded-lg hover:scale-105 transform duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container px-16 py-12 mx-auto">
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
                  <p className="mb-4 text-sm text-gray-400">{hackathon.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Start Date:</p>
                      <p className="text-white">{hackathon.startDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">End Date:</p>
                      <p className="text-white">{hackathon.endDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Participants:</p>
                      <p className="text-white">{hackathon.participants.length} / {hackathon.maxParticipants}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Status:</p>
                      <p className="text-white capitalize">{hackathon.status}</p>
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
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleJoinHackathon(hackathon)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      hackathon.participants.includes(currentUser?.username)
                        ? 'bg-gray-600 cursor-not-allowed'
                        : hackathon.participants.length >= hackathon.maxParticipants
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-[#00FF9D] hover:bg-[#00CC7D] text-[#17153B]'
                    }`}
                    disabled={
                      hackathon.participants.includes(currentUser?.username) ||
                      hackathon.participants.length >= hackathon.maxParticipants
                    }
                  >
                    {hackathon.participants.includes(currentUser?.username)
                      ? 'Joined'
                      : hackathon.participants.length >= hackathon.maxParticipants
                      ? 'Full'
                      : 'Join Now'}
                  </button>
                  <button
                    onClick={() => navigate('/hackathon', { state: { hackathon } })}
                    className="px-6 py-2 bg-[#3D3580] hover:bg-[#4D45A0] rounded-lg transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Hackathons;
