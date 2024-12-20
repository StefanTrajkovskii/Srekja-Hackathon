import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import hackathonImage from '../assets/image.png';

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
    background: linear-gradient(#17153B, #2E236C);
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  color: white;
  font-family: 'Press Start 2P', cursive;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 4rem;
  position: relative;
  margin: 6rem 0 6rem 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
`;

const HackathonTitle = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 5.5rem;
  color: white;
  margin-bottom: 3rem;
  letter-spacing: 2px;
  line-height: 1.2;

  @media (max-width: 1536px) {
    font-size: 3rem;
    text-align: center;
  }
`;

const Description = styled.p`
  font-family: 'Electrolize', sans-serif;
  font-size: 1.5rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;

  @media (max-width: 1536px) {
    text-align: center;
    margin: 0 auto;
    font-size: 1.2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 45%;
`;

const FaqBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  color: white;
  z-index: 2;
`;

const HackathonImage = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background: #1E1B45;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  .title {
    font-family: 'Press Start 2P', cursive;
    font-size: 2.5rem;
    color: #3B82F6;
    text-align: center;
    margin-bottom: 1rem;
    z-index: 1;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .year {
    font-family: 'Press Start 2P', cursive;
    font-size: 3rem;
    color: #3B82F6;
    z-index: 1;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const DetailsSection = styled.div`
  margin: 2rem 4rem;
  background: rgba(30, 27, 69, 0.5);
  border-radius: 15px;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  padding: 0 2rem;

  &:not(:last-child)::after {
    content: '|';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.2);
    font-size: 1.5rem;
  }
`;

const DetailLabel = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  color: ${props => props.color};
  text-align: center;
`;

const DetailValue = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  color: white;
  text-align: center;
`;

const RegisterSection = styled.div`
  margin: 6rem auto 6rem auto;
  max-width: 600px;
  background: rgba(30, 27, 69, 0.5);
  border-radius: 25px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const FormTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(30, 27, 69, 0.9);
  border: none;
  border-radius: 25px;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Press Start 2P', cursive;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: #FF0000;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 1rem 3rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: #D10000;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  margin-top: auto;
`;

const FooterLogo = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: white;
  font-size: 1.2rem;
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
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
`;

function HackathonDetails() {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <PageContainer>
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

        <MainContent>
          <ContentWrapper>
            <HackathonTitle>Hackathon Name</HackathonTitle>
            <Description>
              A hackathon is an intense, collaborative event where participants come together to innovate, solve problems, 
              and build projects in a limited amount of time—usually 24 to 48 hours. It brings together developers, designers, 
              entrepreneurs, and tech enthusiasts to brainstorm ideas and turn them into functioning prototypes or solutions.
            </Description>
          </ContentWrapper>
          
          <ImageSection>
            <FaqBadge>FAQ</FaqBadge>
            <HackathonImage>
              <img src={hackathonImage} alt="Hackathon" />
              <div className="title">SKP CODE</div>
              <div className="year">2024</div>
            </HackathonImage>
          </ImageSection>
        </MainContent>

        <DetailsSection>
          <DetailItem>
            <DetailLabel color="#0088FF">When?</DetailLabel>
            <DetailValue>20-12-2024, 9am</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel color="#00FF9D">Duration?</DetailLabel>
            <DetailValue>48 hours</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel color="#FFD700">Where?</DetailLabel>
            <DetailValue>Srekja Bar, Skopje</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel color="#FF0000">Difficulty?</DetailLabel>
            <DetailValue>Advanced</DetailValue>
          </DetailItem>
        </DetailsSection>

        <RegisterSection>
          <FormTitle>Start</FormTitle>
          <Input placeholder="People in your team, (3-5)" />
          <Input placeholder="Team name" />
          <Input placeholder="Tag your team members" />
          <SubmitButton>Submit</SubmitButton>
        </RegisterSection>

        <Footer>
          <FooterLogo>Hackathon Arena</FooterLogo>
          <FooterNav>
            <FooterLink className="hackatons">Hackatons</FooterLink>
            <FooterLink className="users">Users</FooterLink>
            <FooterLink className="account">Account</FooterLink>
          </FooterNav>
          <Copyright>Copyright 2024</Copyright>
        </Footer>
      </PageContainer>
    </>
  );
}

export default HackathonDetails;
