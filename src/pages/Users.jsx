import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';
import userAvatar from '../assets/users_avatar.png';

function Users() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [skills, setSkills] = useState(['All']);

  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
    setCurrentUser(user);
    loadUsers();
  }, []);

  const loadUsers = () => {
    let allUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log('All users from localStorage:', allUsers);

    const currentUserEmail = getCurrentUser()?.email;
    const processedUsers = allUsers
      .filter(user => user.email !== currentUserEmail)
      .map(user => ({
        ...user,
        username: user.username || 'Anonymous',
        skills: Array.isArray(user.skills) ? user.skills : ['Web Developer'],
        fullName: user.fullName || '',
        profilePicture: user.profilePicture || null
      }));

    // Extract unique skills
    const uniqueSkills = new Set(['All']);
    processedUsers.forEach(user => {
      user.skills.forEach(skill => uniqueSkills.add(skill));
    });
    setSkills(Array.from(uniqueSkills));
    setUsers(processedUsers);
  };

  const getStats = (userEmail) => {
    const hackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    const participated = hackathons.filter(h => h.participants?.some(p => p.email === userEmail)).length;
    const wins = hackathons.filter(h => h.participants?.[0]?.email === userEmail).length;
    return { participated, wins };
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'All' || user.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
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
        <h1 className="text-4xl text-center mb-12 text-[#FFE44D]">Users</h1>
        
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1E1B48] text-white px-6 py-3 rounded-lg w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-[#00FF9D] transition-all"
          />
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="bg-[#1E1B48] text-white px-6 py-3 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#00FF9D] transition-all"
          >
            {skills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUsers.length === 0 ? (
            <div className="col-span-3 text-center py-16">
              <h2 className="text-2xl mb-4">No Users Found</h2>
              <p className="text-white/60">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredUsers.map(user => {
              const { participated, wins } = getStats(user.email);
              return (
                <div 
                  key={user.email}
                  className="bg-[#1E1B48] rounded-xl p-8 flex flex-col items-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF9D]/20"
                >
                  <img 
                    src={user.profilePicture || userAvatar} 
                    alt={user.username}
                    className="w-24 h-24 rounded-full mb-6 border-2 border-[#00FF9D] object-cover"
                  />
                  <h3 className="text-xl mb-2 text-[#00FF9D]">{user.username}</h3>
                  {user.fullName && (
                    <p className="text-white/60 mb-4">{user.fullName}</p>
                  )}
                  <div className="flex gap-8 mb-6">
                    <div className="text-center">
                      <p className="text-2xl text-[#00FF9D]">{participated}</p>
                      <p className="text-white/60 text-xs mt-1">Participated</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl text-[#FFE44D]">{wins}</p>
                      <p className="text-white/60 text-xs mt-1">Wins</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {user.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-[#2D236B] text-white/80 px-4 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/user/${user.username}`)}
                    className="bg-[#00FF9D] text-[#17153B] px-8 py-3 rounded-lg hover:bg-[#33FEB1] transition-colors w-full text-center"
                  >
                    View Profile
                  </button>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

export default Users;
