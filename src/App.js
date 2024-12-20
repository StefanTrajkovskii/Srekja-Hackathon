import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hackathonImage from './assets/image.png';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

const AppContainer = styled.div`
  background: linear-gradient(#17153B, #2E236C);
  min-height: 100vh;
  color: white;
  font-family: 'Press Start 2P', cursive;
`;

const CarouselContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0;
`;

const GridCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .image-container {
    position: relative;
    aspect-ratio: 16/9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .card-content {
    background: rgba(44, 43, 88, 0.95);
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 0 0 15px 15px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: auto;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const GridCardTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  color: white;
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  letter-spacing: 1px;
`;

const GridCardInfo = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Electrolize', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

const GridEnterButton = styled.button`
  background: #1E1B45;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  letter-spacing: 1px;
  transition: background-color 0.2s;

  &:hover {
    background: #2A2B5F;
  }
`;

const FaqBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  color: white;
  backdrop-filter: blur(5px);
  letter-spacing: 1px;
`;

const StatsSection = styled.section`
  padding: 2rem;
  margin-top: 2rem;
`;

const StatsTitle = styled.h2`
  font-family: 'Electrolize', sans-serif;
  text-align: center;
  color: white;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  font-weight: normal;
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
`;

const StatItem = styled.div`
  position: relative;
  padding: 0 2rem;
  text-align: center;
  
  &:not(:last-child)::after {
    content: '|';
    color: #666;
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
  }
`;

const StatValue = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: ${props => props.color || 'white'};
`;

const StatLabel = styled.div`
  color: #8a8b9f;
  font-size: 0.9rem;
  font-family: 'Electrolize', sans-serif;
  max-width: 120px;
`;

const BenefitsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  font-family: 'Electrolize', sans-serif;
  
  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const BenefitText = styled.span`
  color: ${props => props.color || 'white'};
`;

const GridSection = styled.section`
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Electrolize', sans-serif;
  text-align: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 4rem;
  font-weight: normal;
`;

const HackathonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Footer = styled.footer`
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const FooterLogo = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  height: 100%;
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  flex: 1;
`;

const FooterLink = styled.a`
  font-family: 'Press Start 2P', cursive;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;

  &.hackatons {
    color: white;
  }

  &.users {
    color: white;
  }

  &.account {
    color: #FF0000;
  }
`;

const Copyright = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: white;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  height: 100%;
`;

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
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const handleEnterNow = (e) => {
    e.stopPropagation();
    navigate('/hackathon');
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
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
          <CarouselContainer>
            <style jsx>{`
              .slick-slide {
                padding: 0 60px;
                opacity: 0.5;
                transition: opacity 0.3s ease;
              }
              .slick-slide > div {
                overflow: hidden;
              }
              .slick-center {
                opacity: 1;
                transform: scale(1.05);
                transition: all 0.3s ease;
              }
              .slick-center > div {
                border-radius: 15px;
                overflow: hidden;
              }
              .slick-list {
                margin: 0 -60px;
              }
              .slick-prev, .slick-next {
                width: 50px;
                height: 50px;
                z-index: 1;
              }
              .slick-prev:before, .slick-next:before {
                content: '';
                width: 30px;
                height: 30px;
                border: solid white;
                border-width: 0 4px 4px 0;
                display: inline-block;
                position: absolute;
                top: 50%;
                left: 50%;
              }
              .slick-prev {
                left: calc(33.33% - 80px);
              }
              .slick-prev:before {
                transform: translate(-25%, -50%) rotate(135deg);
              }
              .slick-next {
                right: calc(33.33% - 80px);
              }
              .slick-next:before {
                transform: translate(-75%, -50%) rotate(-45deg);
              }
            `}</style>
            <Slider {...settings}>
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <GridCard>
                    <div className="image-container">
                      <FaqBadge>FAQ</FaqBadge>
                      <img src={hackathonImage} alt="Hackathon" />
                    </div>
                    <div className="card-content">
                      <GridCardTitle>Hackathon Name</GridCardTitle>
                      <div className="card-bottom">
                        <div className="info-container">
                          <GridCardInfo>City, Location</GridCardInfo>
                          <GridCardInfo>01/01/2025</GridCardInfo>
                        </div>
                        <GridEnterButton onClick={handleEnterNow}>Enter Now</GridEnterButton>
                      </div>
                    </div>
                  </GridCard>
                </div>
              ))}
            </Slider>
          </CarouselContainer>
        </section>

        <StatsSection>
          <StatsTitle>Why participate in hackathons</StatsTitle>
          <StatsGrid>
            <StatItem>
              <StatValue color="#FFA500">40%</StatValue>
              <StatLabel>higher chances to land a job</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue color="#00FF9D">15</StatValue>
              <StatLabel>new connections on average</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue color="#FF0000">1</StatValue>
              <StatLabel>new project in your cv</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue color="#FFD700">50%</StatValue>
              <StatLabel>in real world projects</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue color="#00BFFF">10+</StatValue>
              <StatLabel>skills learned every hackathon</StatLabel>
            </StatItem>
          </StatsGrid>

          <BenefitsBar>
            <div>
              <BenefitText color="#0088FF">Learn</BenefitText>
              <BenefitText>&</BenefitText>
              <BenefitText>improve skills</BenefitText>
            </div>
            <div>
              <BenefitText>Build you</BenefitText>
              <BenefitText color="#FF0000">network</BenefitText>
            </div>
            <div>
              <BenefitText>Gain recognition</BenefitText>
              <BenefitText>&</BenefitText>
              <BenefitText color="#FFA500">opportunities</BenefitText>
            </div>
            <div>
              <BenefitText color="#00FF9D">Challenge</BenefitText>
              <BenefitText>yourself</BenefitText>
            </div>
            <div>
              <BenefitText color="#FFD700">Win prizes and have fun</BenefitText>
            </div>
          </BenefitsBar>
        </StatsSection>

        <GridSection>
          <SectionTitle>Find your hackathon</SectionTitle>
          <HackathonGrid>
            {Array(9).fill().map((_, index) => (
              <GridCard key={index}>
                <div className="image-container">
                  <FaqBadge>FAQ</FaqBadge>
                  <img src={hackathonImage} alt="Hackathon" />
                </div>
                <div className="card-content">
                  <GridCardTitle>Hackathon Name</GridCardTitle>
                  <div className="card-bottom">
                    <div className="info-container">
                      <GridCardInfo>City, Location</GridCardInfo>
                      <GridCardInfo>01/01/2025</GridCardInfo>
                    </div>
                    <GridEnterButton onClick={handleEnterNow}>Enter Now</GridEnterButton>
                  </div>
                </div>
              </GridCard>
            ))}
          </HackathonGrid>
        </GridSection>

        <Footer>
          <FooterLogo>Hackathon Arena</FooterLogo>
          <FooterNav>
            <FooterLink className="hackatons">Hackatons</FooterLink>
            <FooterLink className="users">Users</FooterLink>
            <FooterLink className="account">Account</FooterLink>
          </FooterNav>
          <Copyright>Copyright 2024</Copyright>
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;
