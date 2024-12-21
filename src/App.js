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
        <div className="max-w-[1400px] mx-auto p-8 flex justify-around items-center bg-[#1E1B48] rounded-2xl border-[3px] border-[#2D236B]" style={{ boxShadow: "4px 4px 4px 0 rgba(0,0,0,0.25)" }}>
          <div className="flex flex-col items-center gap-4">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#FFA500]">40%</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">higher chances to land a job</div>
          </div>
          <svg width="4" height="100" viewBox="0 0 4 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="100" fill="white" fillOpacity="0.3"/>
          </svg>
          <div className="flex flex-col items-center gap-4">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#00FF9D]">15</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">new connections on average</div>
          </div>
          <svg width="4" height="100" viewBox="0 0 4 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="100" fill="white" fillOpacity="0.3"/>
          </svg>
          <div className="flex flex-col items-center gap-4">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#FF0000]">1</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">new project in your cv</div>
          </div>
          <svg width="4" height="100" viewBox="0 0 4 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="100" fill="white" fillOpacity="0.3"/>
          </svg>
          <div className="flex flex-col items-center gap-4">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#FFD700]">50%</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">in real world projects</div>
          </div>
          <svg width="4" height="100" viewBox="0 0 4 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="100" fill="white" fillOpacity="0.3"/>
          </svg>
          <div className="flex flex-col items-center gap-4">
            <div className="text-[48px] font-['Press_Start_2P'] text-[#00BFFF]">10+</div>
            <div className="text-xl font-['Electrolize'] text-[#FFFFFF] max-w-[200px] text-center">skills learned every hackathon</div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto mt-8 p-6 flex justify-between items-center bg-[#1E1B48] rounded-2xl border-[3px] border-[#2D236B]" style={{ boxShadow: "4px 4px 4px 0 rgba(0,0,0,0.25)" }}>
          <div className="flex items-center gap-2">
            <span className="text-[#0088FF] font-['Electrolize'] text-xl">Learn</span>
            <span className="text-white font-['Electrolize'] text-xl">&</span>
            <span className="text-white font-['Electrolize'] text-xl">improve skills</span>
          </div>
          <div className="h-[40px] w-[2px] bg-white/30" />
          <div className="flex items-center gap-2">
            <span className="text-white font-['Electrolize'] text-xl">Build you</span>
            <span className="text-[#FF0000] font-['Electrolize'] text-xl">network</span>
          </div>
          <div className="h-[40px] w-[2px] bg-white/30" />
          <div className="flex items-center gap-2">
            <span className="text-white font-['Electrolize'] text-xl">Gain recognition</span>
            <span className="text-white font-['Electrolize'] text-xl">&</span>
            <span className="text-[#FFA500] font-['Electrolize'] text-xl">opportunities</span>
          </div>
          <div className="h-[40px] w-[2px] bg-white/30" />
          <div className="flex items-center gap-2">
            <span className="text-[#00FF9D] font-['Electrolize'] text-xl">Challenge</span>
            <span className="text-white font-['Electrolize'] text-xl">yourself</span>
          </div>
          <div className="h-[40px] w-[2px] bg-white/30" />
          <div className="flex items-center gap-2">
            <span className="text-[#FFD700] font-['Electrolize'] text-xl">Win prizes and have fun</span>
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
