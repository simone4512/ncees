import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Zap, TrendingUp, Users, ArrowRight,
  CheckCircle, ChevronRight, Flag, Clock, BarChart2, Repeat
} from 'lucide-react';
import styled, { keyframes } from 'styled-components';

/* ─────────────────────────────────────────
   TOKENS
───────────────────────────────────────── */
const C = {
  navy: "#0d2b55",
  navyDark: "#091e3e",
  navyLight: "#1a3f72",
  navyFaint: "#f0f4fa",
  accent: "#c0392b",
  accentHov: "#a93226",
  white: "#ffffff",
  offWhite: "#f5f7fa",
  border: "#dde3ed",
  text: "#1a2533",
  muted: "#5a6a80",
};

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.05); }
`;

/* ─────────────────────────────────────────
   FONT LOADER
───────────────────────────────────────── */
const FontLoader = () => {
  useEffect(() => {
    const id = 'ncees-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=Source+Sans+3:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─────────────────────────────────────────
   LAYOUT
───────────────────────────────────────── */
const Page = styled.div`
  min-height: 100vh;
  background: ${C.offWhite};
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  color: ${C.text};
`;

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 28px;
`;

/* ─────────────────────────────────────────
   PAGE HERO
───────────────────────────────────────── */
const PageHero = styled.section`
  background: ${C.navyDark};
  padding: 72px 0 64px;
  position: relative;
  overflow: hidden;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }
`;

const HeroCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  width: 400px; height: 400px;
  top: -160px; right: -100px;
  border: 60px solid rgba(192,57,43,0.1);
  animation: ${pulse} 6s ease-in-out infinite;
`;

const HeroInner = styled(Container)`
  position: relative;
  z-index: 1;
  animation: ${fadeUp} 0.6s ease both;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: rgba(192,57,43,0.18);
  border: 1px solid rgba(192,57,43,0.35);
  border-radius: 100px;
  font-size: 11.5px;
  font-weight: 700;
  color: #f08080;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;

  span {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${C.accent};
    display: inline-block;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  color: ${C.white};
  margin: 0 0 16px;
  letter-spacing: -0.02em;
  line-height: 1.22;
`;

const HeroSubtitle = styled.p`
  font-size: 17px;
  color: rgba(255,255,255,0.55);
  max-width: 560px;
  margin: 0 auto 36px;
  line-height: 1.72;
`;

const HeroCtas = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const BtnPrimary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 28px;
  background: ${C.accent};
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  color: ${C.white};
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    background: ${C.accentHov};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(192,57,43,0.35);
  }
  &:active { transform: none; }
`;

const BtnOutline = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  border: 2px solid rgba(255,255,255,0.22);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.55);
    background: rgba(255,255,255,0.07);
    color: ${C.white};
  }
`;

/* ─────────────────────────────────────────
   SHARED SECTION ATOMS
───────────────────────────────────────── */
const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${C.accent};
  margin-bottom: 10px;

  &::before {
    content: '';
    display: inline-block;
    width: 22px; height: 2px;
    background: ${C.accent};
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(22px, 2.8vw, 32px);
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 12px;
  letter-spacing: -0.02em;
  line-height: 1.28;
`;

const SectionSub = styled.p`
  font-size: 15.5px;
  color: ${C.muted};
  line-height: 1.7;
  margin: 0 auto;
`;

/* ─────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────── */
const FeaturesSection = styled.section`
  padding: 88px 0 80px;
  background: ${C.white};
`;

const FeaturesHeader = styled.div`
  text-align: center;
  margin-bottom: 56px;
  ${SectionSub} { max-width: 520px; }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled.div`
  display: flex;
  gap: 22px;
  align-items: flex-start;
  padding: 28px 26px;
  background: ${C.offWhite};
  border: 1.5px solid ${C.border};
  border-radius: 12px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover {
    border-color: ${C.navy};
    box-shadow: 0 8px 28px rgba(13,43,85,0.09);
    transform: translateY(-3px);
  }
`;

const FeatureIconBox = styled.div`
  width: 52px; height: 52px;
  flex-shrink: 0;
  background: ${C.navyFaint};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.navy};
  transition: background 0.2s;

  ${FeatureCard}:hover & {
    background: ${C.navy};
    color: ${C.white};
  }
`;

const FeatureText = styled.div``;

const FeatureTitle = styled.h3`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 16.5px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 8px;
`;

const FeatureBody = styled.p`
  font-size: 14.5px;
  color: ${C.muted};
  line-height: 1.68;
  margin: 0;
`;

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
const HowSection = styled.section`
  padding: 88px 0;
  background: ${C.offWhite};
`;

const HowHeader = styled.div`
  margin-bottom: 56px;
  text-align: center;
`;

const HowSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  position: relative;

  /* connector line */
  &::before {
    content: '';
    position: absolute;
    top: 26px;
    left: calc(12.5% + 26px);
    right: calc(12.5% + 26px);
    height: 2px;
    background: ${C.border};
    z-index: 0;
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
    &::before { display: none; }
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const HowStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 16px;
  position: relative;
  z-index: 1;
`;

const StepNum = styled.div`
  width: 52px; height: 52px;
  border-radius: 50%;
  background: ${C.navy};
  border: 3px solid ${C.white};
  box-shadow: 0 0 0 2px ${C.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Merriweather', serif;
  font-size: 18px;
  font-weight: 900;
  color: ${C.white};
  margin-bottom: 18px;
`;

const StepIcon = styled.div`
  color: rgba(255,255,255,0.7);
  margin-bottom: 4px;
`;

const StepTitle = styled.h3`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 15px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 8px;
`;

const StepDesc = styled.p`
  font-size: 13.5px;
  color: ${C.muted};
  line-height: 1.65;
  margin: 0;
`;

/* ─────────────────────────────────────────
   BENEFITS
───────────────────────────────────────── */
const BenefitsSection = styled.section`
  padding: 88px 0;
  background: ${C.white};
`;

const BenefitsHeader = styled.div`
  text-align: center;
  margin-bottom: 52px;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const BenefitCard = styled.div`
  padding: 30px 28px;
  background: ${C.navyFaint};
  border: 1.5px solid ${C.border};
  border-radius: 12px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: ${C.navyLight};
    box-shadow: 0 6px 24px rgba(13,43,85,0.08);
  }
`;

const BenefitTitle = styled.h3`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 16.5px;
  font-weight: 700;
  color: ${C.navy};
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: inline-block;
    width: 4px; height: 18px;
    background: ${C.accent};
    border-radius: 2px;
    flex-shrink: 0;
  }
`;

const BenefitList = styled.ul`
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 11px;
  font-size: 14.5px;
  color: ${C.muted};
  line-height: 1.55;

  svg { flex-shrink: 0; color: ${C.navy}; margin-top: 1px; }
`;

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
const CtaSection = styled.section`
  padding: 72px 0 88px;
  background: ${C.offWhite};
`;

const CtaBanner = styled.div`
  background: ${C.navyDark};
  border-radius: 16px;
  padding: 60px 52px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 300px; height: 300px;
    border-radius: 50%;
    border: 56px solid rgba(192,57,43,0.1);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -100px; left: -60px;
    width: 260px; height: 260px;
    border-radius: 50%;
    border: 40px solid rgba(255,255,255,0.03);
    pointer-events: none;
  }
`;

const CtaTitle = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(22px, 2.8vw, 30px);
  font-weight: 700;
  color: ${C.white};
  margin: 0 0 12px;
  letter-spacing: -0.02em;
  position: relative; z-index: 1;
`;

const CtaSub = styled.p`
  font-size: 16px;
  color: rgba(255,255,255,0.52);
  margin: 0 auto 32px;
  max-width: 500px;
  line-height: 1.7;
  position: relative; z-index: 1;
`;

const CtaBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 30px;
  background: ${C.accent};
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  color: ${C.white};
  text-decoration: none;
  letter-spacing: 0.02em;
  position: relative; z-index: 1;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    background: ${C.accentHov};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(192,57,43,0.4);
  }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const FEATURES = [
  {
    icon: <BookOpen size={22} />,
    title: 'Full-Length Exams',
    description: 'Practice with complete 80-question exams exactly like the real NCEES CBT — nothing cut short.',
  },
  {
    icon: <Clock size={22} />,
    title: 'Timed Experience',
    description: '8-hour countdown timer with real-time progress tracking and per-question time metrics.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Performance Analytics',
    description: 'Detailed scoring breakdown by topic with diagnostic insights and targeted study recommendations.',
  },
  {
    icon: <Repeat size={22} />,
    title: 'Unlimited Attempts',
    description: 'Take as many practice exams as you want. No caps, no cooldown — just practice until you\'re ready.',
  },
];

const STEPS = [
  { n: '1', icon: <BookOpen size={14} />, title: 'Select Exam', desc: 'Choose your discipline — PE Water Resources, PE Civil, FE General, and more.' },
  { n: '2', icon: <Clock size={14} />, title: 'Start Session', desc: 'Begin the 8-hour timed exam in a distraction-free interface.' },
  { n: '3', icon: <Flag size={14} />, title: 'Answer & Flag', desc: '80 questions with navigation, flagging, and reference handbook access.' },
  { n: '4', icon: <BarChart2 size={14} />, title: 'Review Results', desc: 'Instant scoring with a detailed topic-by-topic breakdown.' },
];

const BENEFITS = [
  {
    title: 'Identify Weak Areas',
    points: [
      'See exactly which topics need more study',
      'Topic-specific performance metrics after each session',
      'Focus your preparation where it counts most',
    ],
  },
  {
    title: 'Build Test-Taking Skills',
    points: [
      'Practice proven time management strategies',
      'Get comfortable with the CBT exam interface',
      'Develop question-pacing and review habits',
    ],
  },
  {
    title: 'Track Progress Over Time',
    points: [
      'Compare scores across multiple attempts',
      'Monitor improvement in previously weak areas',
      'Build confidence as your scores trend upward',
    ],
  },
  {
    title: 'Official Exam Simulation',
    points: [
      'Reference handbook access, just like the real exam',
      'Flag questions for later review within the session',
      'Same question structure and format as NCEES CBT',
    ],
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const PracticePage: React.FC = () => {
  return (
    <>
      <FontLoader />
      <Page>

        {/* PAGE HERO */}
        <PageHero>
          <HeroCircle />
          <HeroInner>
            <HeroBadge><span />Full-Length Simulated Exams</HeroBadge>
            <HeroTitle>Practice Exams</HeroTitle>
            <HeroSubtitle>
              Unlimited access to full-length, timed practice exams under realistic conditions —
              built to match the official NCEES computer-based test experience.
            </HeroSubtitle>
            <HeroCtas>
              <BtnPrimary to="/login">
                Login to Start Practice <ArrowRight size={17} />
              </BtnPrimary>
              <BtnOutline to="/exams">
                Browse Exam Types <ChevronRight size={17} />
              </BtnOutline>
            </HeroCtas>
          </HeroInner>
        </PageHero>

        {/* FEATURES */}
        <FeaturesSection>
          <Container>
            <FeaturesHeader>
              <SectionLabel>What's Included</SectionLabel>
              <SectionTitle>Everything in Every Session</SectionTitle>
              <SectionSub>
                Each practice exam is a complete simulation — no shortened versions, no missing features.
              </SectionSub>
            </FeaturesHeader>
            <FeaturesGrid>
              {FEATURES.map(({ icon, title, description }) => (
                <FeatureCard key={title}>
                  <FeatureIconBox>{icon}</FeatureIconBox>
                  <FeatureText>
                    <FeatureTitle>{title}</FeatureTitle>
                    <FeatureBody>{description}</FeatureBody>
                  </FeatureText>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </Container>
        </FeaturesSection>

        {/* HOW IT WORKS */}
        <HowSection>
          <Container>
            <HowHeader>
              <SectionLabel>The Process</SectionLabel>
              <SectionTitle>How It Works</SectionTitle>
              <SectionSub>Four steps from login to score report.</SectionSub>
            </HowHeader>
            <HowSteps>
              {STEPS.map(({ n, icon, title, desc }) => (
                <HowStep key={n}>
                  <StepNum>{n}</StepNum>
                  <StepTitle>{title}</StepTitle>
                  <StepDesc>{desc}</StepDesc>
                </HowStep>
              ))}
            </HowSteps>
          </Container>
        </HowSection>

        {/* BENEFITS */}
        <BenefitsSection>
          <Container>
            <BenefitsHeader>
              <SectionLabel>Why Practice Here</SectionLabel>
              <SectionTitle>Built Around Your Success</SectionTitle>
              <SectionSub style={{ maxWidth: 520, margin: '0 auto' }}>
                Every feature is designed around one goal — helping you pass your exam on exam day.
              </SectionSub>
            </BenefitsHeader>
            <BenefitsGrid>
              {BENEFITS.map(({ title, points }) => (
                <BenefitCard key={title}>
                  <BenefitTitle>{title}</BenefitTitle>
                  <BenefitList>
                    {points.map((pt) => (
                      <BenefitItem key={pt}>
                        <CheckCircle size={15} />
                        {pt}
                      </BenefitItem>
                    ))}
                  </BenefitList>
                </BenefitCard>
              ))}
            </BenefitsGrid>
          </Container>
        </BenefitsSection>

        {/* CTA */}
        <CtaSection>
          <Container>
            <CtaBanner>
              <CtaTitle>Ready to Test Your Knowledge?</CtaTitle>
              <CtaSub>
                Start a full 8-hour practice exam with 80 questions, a countdown timer,
                and the same interface as the real CBT.
              </CtaSub>
              <CtaBtn to="/login">
                Login to Start Practice <ArrowRight size={17} />
              </CtaBtn>
            </CtaBanner>
          </Container>
        </CtaSection>

      </Page>
    </>
  );
};

export default PracticePage;