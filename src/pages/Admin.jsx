import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';
import defaultHackathonImage from '../assets/image.png';
import userAvatar from '../assets/users_avatar.png';

const Admin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [hackathons, setHackathons] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    maxParticipants: 4,
    skillsRequired: '',
    image: defaultHackathonImage,
    status: 'upcoming', // upcoming, active, completed
    prize: '',
    participants: []
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.username !== 'stif') {
      navigate('/');
      return;
    }
    setCurrentUser(user);
    loadHackathons();
  }, [navigate]);

  const loadHackathons = () => {
    const storedHackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    setHackathons(storedHackathons);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate' || name === 'endDate') {
      // Convert from YYYY-MM-DD to DD/MM/YYYY
      const [year, month, day] = value.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      setFormData(prev => ({
        ...prev,
        [name]: formattedDate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const showMessage = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  const handleAddHackathon = (e) => {
    e.preventDefault();
    const newHackathon = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      participants: []
    };

    const updatedHackathons = [...hackathons, newHackathon];
    localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
    setHackathons(updatedHackathons);
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      maxParticipants: 4,
      skillsRequired: '',
      image: defaultHackathonImage,
      status: 'upcoming',
      prize: '',
      participants: []
    });
    showMessage('Hackathon added successfully!');
  };

  const handleEditHackathon = (hackathon) => {
    setSelectedHackathon(hackathon);
    setFormData(hackathon);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdateHackathon = (e) => {
    e.preventDefault();
    const updatedHackathons = hackathons.map(h => 
      h.id === selectedHackathon.id ? { ...formData, participants: h.participants } : h
    );
    localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
    setHackathons(updatedHackathons);
    setShowForm(false);
    setIsEditing(false);
    setSelectedHackathon(null);
    showMessage('Hackathon updated successfully!');
  };

  const handleDeleteHackathon = (id) => {
    if (window.confirm('Are you sure you want to delete this hackathon?')) {
      const updatedHackathons = hackathons.filter(h => h.id !== id);
      localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
      setHackathons(updatedHackathons);
      showMessage('Hackathon deleted successfully!');
    }
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
                  {currentUser?.username} (Admin)
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
        {showSuccessMessage && (
          <div className="fixed top-24 right-8 bg-[#00FF9D] text-[#17153B] px-6 py-4 rounded-lg shadow-lg animate-fade-in">
            {showSuccessMessage}
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-[#00FF9D]">Hackathon Management</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setFormData({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                maxParticipants: 4,
                skillsRequired: '',
                image: defaultHackathonImage,
                status: 'upcoming',
                prize: '',
                participants: []
              });
            }}
            className="bg-[#00FF9D] hover:bg-[#00CC7D] text-[#17153B] px-6 py-3 rounded-lg transition-colors"
          >
            Add New Hackathon
          </button>
        </div>

        {showForm && (
          <div className="flex fixed inset-0 justify-center items-center p-4 bg-black bg-opacity-50">
            <div className="bg-[#1F1B4B] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl text-[#00FF9D] mb-6">
                {isEditing ? 'Edit Hackathon' : 'Add New Hackathon'}
              </h2>
              <form onSubmit={isEditing ? handleUpdateHackathon : handleAddHackathon}>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none h-32"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm text-gray-400">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formatDateForInput(formData.startDate)}
                        onChange={handleInputChange}
                        className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formatDateForInput(formData.endDate)}
                        onChange={handleInputChange}
                        className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm text-gray-400">Max Participants</label>
                      <input
                        type="number"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400">Prize</label>
                      <input
                        type="text"
                        name="prize"
                        value={formData.prize}
                        onChange={handleInputChange}
                        className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Skills Required</label>
                    <input
                      type="text"
                      name="skillsRequired"
                      value={formData.skillsRequired}
                      onChange={handleInputChange}
                      className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                      placeholder="e.g., React, Node.js, MongoDB"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                      required
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 justify-end mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setIsEditing(false);
                      setSelectedHackathon(null);
                    }}
                    className="px-6 py-2 bg-gray-600 rounded-lg transition-colors hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#00FF9D] hover:bg-[#00CC7D] text-[#17153B] rounded-lg transition-colors"
                  >
                    {isEditing ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {hackathons.map(hackathon => (
            <div
              key={hackathon.id}
              className="bg-[#1F1B4B] rounded-xl p-6 border border-[#3D3580]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl text-[#00FF9D] mb-2">{hackathon.title}</h3>
                  <p className="mb-4 text-sm text-gray-400">{hackathon.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Start Date:</p>
                      <p className="text-white">{formatDateForDisplay(hackathon.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">End Date:</p>
                      <p className="text-white">{formatDateForDisplay(hackathon.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Participants:</p>
                      <p className="text-white">{hackathon.participants.length} / {hackathon.maxParticipants}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Status:</p>
                      <p className="text-white capitalize">{hackathon.status}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditHackathon(hackathon)}
                    className="px-4 py-2 bg-[#00FF9D] hover:bg-[#00CC7D] text-[#17153B] rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteHackathon(hackathon.id)}
                    className="px-4 py-2 bg-[#FF3A8C] hover:bg-[#FF1A6C] text-white rounded-lg transition-colors"
                  >
                    Delete
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

export default Admin;
