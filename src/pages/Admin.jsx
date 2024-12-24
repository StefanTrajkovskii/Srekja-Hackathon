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
    imageUrl: '',
    image: null,
    status: 'upcoming',
    prize: '',
    city: '',
    location: '',
    difficulty: 'Intermediate',
    duration: '48 hours',
    participants: []
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      maxParticipants: 4,
      skillsRequired: '',
      imageUrl: '',
      image: null,
      status: 'upcoming',
      prize: '',
      city: '',
      location: '',
      difficulty: 'Intermediate',
      duration: '48 hours',
      participants: []
    });
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

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
    const { name, value, files } = e.target;
    if (name === 'startDate' || name === 'endDate') {
      const [year, month, day] = value.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      setFormData(prev => ({
        ...prev,
        [name]: formattedDate
      }));
    } else if (name === 'image' && files && files[0]) {
      const file = files[0];
      compressImage(file).then(compressedDataUrl => {
        setFormData(prev => ({
          ...prev,
          imageUrl: compressedDataUrl,
          image: file
        }));
      });
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
    try {
      const newHackathon = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        participants: [],
        image: formData.imageUrl || defaultHackathonImage
      };

      const updatedHackathons = [...hackathons, newHackathon];
      localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
      setHackathons(updatedHackathons);
      setShowForm(false);
      resetForm();
      showMessage('Hackathon added successfully!');
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        showMessage('Error: Image is too large. Please use a smaller image.');
      } else {
        showMessage('Error adding hackathon. Please try again.');
      }
    }
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
              resetForm();
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
                        value={formData.startDate ? formatDateForInput(formData.startDate) : ''}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-white/70 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate ? formatDateForInput(formData.endDate) : ''}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-white/70 outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm text-gray-400">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm text-gray-400">Difficulty</label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                        required
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-400">Duration</label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full bg-[#2A2456] rounded-lg px-4 py-2 text-white border border-[#3D3580] focus:border-[#00FF9D] outline-none"
                        required
                      >
                        <option value="24 hours">24 hours</option>
                        <option value="48 hours">48 hours</option>
                        <option value="72 hours">72 hours</option>
                      </select>
                    </div>
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
                  <div className="bg-[#17153B] rounded-[24px] p-5 mb-6">
                    <div className="flex flex-col gap-4">
                      <label className="text-[#00FF9D] text-sm">Hackathon Image (Max size: 2MB, Recommended: 800x600px)</label>
                      <input 
                        type="file" 
                        name="image"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="text-white/70"
                      />
                      {formData.imageUrl && (
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="w-full h-[300px] object-cover rounded-lg mt-2"
                        />
                      )}
                    </div>
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
                    <div>
                      <p className="text-gray-400">City:</p>
                      <p className="text-white">{hackathon.city}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Location:</p>
                      <p className="text-white">{hackathon.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Difficulty:</p>
                      <p className="text-white">{hackathon.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Duration:</p>
                      <p className="text-white">{hackathon.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditHackathon(hackathon)}
                    className="bg-[#00FF9D] text-[#17153B] px-4 py-2 rounded-lg hover:bg-[#00CC7D] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteHackathon(hackathon.id)}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg transition-colors hover:bg-red-600"
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
