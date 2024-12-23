import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';
import defaultAvatar from '../assets/users_avatar.png';

const Account = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    skills: '',
    githubUrl: '',
    linkedinUrl: '',
    discordUsername: '',
    preferredRole: 'Full Stack',
    experience: 'Intermediate',
    availability: 'Weekends',
    profilePicture: null
  });

  const roleOptions = ['Full Stack', 'Frontend', 'Backend', 'UI/UX', 'DevOps', 'Mobile'];
  const experienceOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings', 'Flexible'];

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setIsLoggedIn(true);
    setCurrentUser(user);
    setFormData(prev => ({
      ...prev,
      ...user,
      password: ''
    }));
    if (user.profilePicture) {
      setImagePreview(user.profilePicture);
    }
  }, [navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setFormData(prev => ({
      ...prev,
      ...currentUser,
      password: ''
    }));
    setIsEditing(false);
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.username || !formData.email) {
      alert('Username and email are required');
      return;
    }

    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    // Get all users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find and update current user
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        const updatedUser = {
          ...user,
          ...formData,
          password: formData.password || user.password,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        return updatedUser;
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setIsEditing(false);
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="bg-gradient-to-b from-[#17153B] to-[#2E236C] min-h-screen text-white font-['Press_Start_2P']">
      <header className="flex justify-between items-center px-16 py-8">
        <div className="text-xl text-white cursor-pointer" onClick={() => navigate('/')}>
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
              <div className="flex items-center gap-4">
                <span className="font-['Press_Start_2P'] text-[#00FF9D] text-sm">
                  {currentUser?.username}
                </span>
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

      <main className="container mx-auto px-16 py-12">
        {showSuccessMessage && (
          <div className="fixed top-24 right-8 bg-[#00FF9D] text-[#17153B] px-6 py-4 rounded-lg shadow-lg animate-fade-in">
            Profile updated successfully!
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-[#1F1B4B] rounded-t-2xl p-8 mb-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-[#2A2456] border-2 border-[#00FF9D]">
                    <img 
                      src={imagePreview || defaultAvatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <button
                      onClick={triggerFileInput}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <span className="text-xs text-white">Change Photo</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <h1 className="text-2xl text-[#00FF9D] mb-4">Profile Settings</h1>
                  <p className="text-sm text-gray-400">
                    Last updated: {new Date(currentUser?.lastUpdated || currentUser?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="font-['Press_Start_2P'] text-white bg-[#FF3A8C] hover:bg-[#FF3AFF] transition-colors px-6 py-2 rounded-lg hover:scale-105 transform duration-200 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="font-['Press_Start_2P'] text-white bg-[#4A3AFF] hover:bg-[#7C3AFF] transition-colors px-6 py-2 rounded-lg hover:scale-105 transform duration-200 text-sm"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="font-['Press_Start_2P'] text-white bg-[#4A3AFF] hover:bg-[#7C3AFF] transition-colors px-6 py-2 rounded-lg hover:scale-105 transform duration-200 text-sm"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-[#1F1B4B] rounded-b-2xl p-8 shadow-xl">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[#00FF9D] text-sm mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[#00FF9D] text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {isEditing && (
                  <div>
                    <label className="block text-[#00FF9D] text-sm mb-2">New Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Leave blank to keep current"
                      className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[#00FF9D] text-sm mb-2">Preferred Role</label>
                  <select
                    name="preferredRole"
                    value={formData.preferredRole}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {roleOptions.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#00FF9D] text-sm mb-2">Experience Level</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {experienceOptions.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[#00FF9D] text-sm mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                    className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-[#00FF9D] text-sm mb-2">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="e.g., React, Node.js, Python"
                    className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[#00FF9D] text-sm mb-2">Availability</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {availabilityOptions.map(avail => (
                      <option key={avail} value={avail}>{avail}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#00FF9D] text-sm mb-2">Discord Username</label>
                  <input
                    type="text"
                    name="discordUsername"
                    value={formData.discordUsername}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="username#0000"
                    className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#00FF9D] text-sm mb-2">GitHub URL</label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[#00FF9D] text-sm mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-[#2A2456] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00FF9D] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
