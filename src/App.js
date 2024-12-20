import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hackathonImage from './assets/image.png';

function App() {
  const navigate = useNavigate();
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  const handleEnterNow = () => {
    navigate('/hackathon');
  };

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

      <section className="text-center py-16 px-8">
        <h1 className="font-['Electrolize'] text-4xl mb-24 mt-16 leading-relaxed text-white font-normal">
          Find Hackathons You Love. Code.<br />
          Connect. Conquer.
        </h1>
        <div className="max-w-[1200px] mx-auto relative p-0">
          <Slider {...settings}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="px-[60px] opacity-50 transition-opacity duration-300 hover:opacity-100">
                <div className="bg-white/10 rounded-2xl overflow-hidden flex flex-col relative backdrop-blur-md shadow-lg">
                  <div className="relative aspect-video flex flex-col justify-center items-center text-center">
                    <img src={hackathonImage} alt="Hackathon" className="w-full h-full object-contain" />
                    <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-lg font-['Press_Start_2P'] text-sm text-white">FAQ</div>
                  </div>
                  <div className="bg-[rgba(44,43,88,0.95)] p-6 flex-grow flex flex-col gap-2 rounded-b-2xl">
                    <h3 className="font-['Press_Start_2P'] text-white text-lg mb-4 tracking-wider">Hackathon Name</h3>
                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex flex-col gap-2">
                        <div className="text-white/60 font-['Electrolize'] text-sm tracking-wider">City, Location</div>
                        <div className="text-white/60 font-['Electrolize'] text-sm tracking-wider">01/01/2025</div>
                      </div>
                      <button onClick={handleEnterNow} className="bg-[#1E1B45] text-white px-6 py-2 rounded-lg font-['Press_Start_2P'] text-sm hover:bg-[#2A2B5F] transition-colors">
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

      <section className="py-8 px-4">
        <h2 className="font-['Electrolize'] text-3xl mb-8 mt-8 text-center text-white font-normal">Why participate in hackathons</h2>
        <div className="max-w-[1200px] mx-auto p-4 flex justify-around items-center bg-white/5 rounded-2xl">
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-['Press_Start_2P'] text-[#FFA500]">40%</div>
            <div className="text-sm font-['Electrolize'] text-[#8a8b9f]">higher chances to land a job</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-['Press_Start_2P'] text-[#00FF9D]">15</div>
            <div className="text-sm font-['Electrolize'] text-[#8a8b9f]">new connections on average</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-['Press_Start_2P'] text-[#FF0000]">1</div>
            <div className="text-sm font-['Electrolize'] text-[#8a8b9f]">new project in your cv</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-['Press_Start_2P'] text-[#FFD700]">50%</div>
            <div className="text-sm font-['Electrolize'] text-[#8a8b9f]">in real world projects</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-['Press_Start_2P'] text-[#00BFFF]">10+</div>
            <div className="text-sm font-['Electrolize'] text-[#8a8b9f]">skills learned every hackathon</div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto p-4 flex justify-around items-center bg-white/5 rounded-2xl mt-8">
          <div className="flex items-center gap-2">
            <div className="text-sm font-['Electrolize'] text-[#0088FF]">Learn</div>
            <div className="text-sm font-['Electrolize'] text-white">&</div>
            <div className="text-sm font-['Electrolize'] text-white">improve skills</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-['Electrolize'] text-white">Build you</div>
            <div className="text-sm font-['Electrolize'] text-[#FF0000]">network</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-['Electrolize'] text-white">Gain recognition</div>
            <div className="text-sm font-['Electrolize'] text-white">&</div>
            <div className="text-sm font-['Electrolize'] text-[#FFA500]">opportunities</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-['Electrolize'] text-[#00FF9D]">Challenge</div>
            <div className="text-sm font-['Electrolize'] text-white">yourself</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-['Electrolize'] text-[#FFD700]">Win prizes and have fun</div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8">
        <h2 className="font-['Electrolize'] text-3xl mb-8 mt-8 text-center text-white font-normal">Find your hackathon</h2>
        <div className="grid grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="bg-white/10 rounded-2xl overflow-hidden flex flex-col relative backdrop-blur-md shadow-lg">
              <div className="relative aspect-video flex flex-col justify-center items-center text-center">
                <img src={hackathonImage} alt="Hackathon" className="w-full h-full object-contain" />
                <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-lg font-['Press_Start_2P'] text-sm text-white">FAQ</div>
              </div>
              <div className="bg-[rgba(44,43,88,0.95)] p-6 flex-grow flex flex-col gap-2 rounded-b-2xl">
                <h3 className="font-['Press_Start_2P'] text-white text-lg mb-4 tracking-wider">Hackathon Name</h3>
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex flex-col gap-2">
                    <div className="text-white/60 font-['Electrolize'] text-sm tracking-wider">City, Location</div>
                    <div className="text-white/60 font-['Electrolize'] text-sm tracking-wider">01/01/2025</div>
                  </div>
                  <button onClick={handleEnterNow} className="bg-[#1E1B45] text-white px-6 py-2 rounded-lg font-['Press_Start_2P'] text-sm hover:bg-[#2A2B5F] transition-colors">
                    Enter Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 px-16 flex justify-between items-center">
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
