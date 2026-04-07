import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Clock, BarChart3,
  BookOpen, ChevronRight, Award, Users, Shield
} from 'lucide-react';
import styled, { keyframes, css } from 'styled-components';

/* ─────────────────────────────────────────
   TOKENS
───────────────────────────────────────── */
const C = {
  navy:       "#0d2b55",
  navyDark:   "#091e3e",
  navyLight:  "#1a3f72",
  navyFaint:  "#f0f4fa",
  accent:     "#c0392b",
  accentHov:  "#a93226",
  white:      "#ffffff",
  offWhite:   "#f5f7fa",
  border:     "#dde3ed",
  text:       "#1a2533",
  muted:      "#5a6a80",
  gold:       "#d4a017",
};

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.05); }
`;
const shimmer = keyframes`
  from { background-position: -200% center; }
  to   { background-position:  200% center; }
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
      'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Source+Sans+3:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─────────────────────────────────────────
   GLOBAL PAGE
───────────────────────────────────────── */
const Page = styled.div`
  min-height: 100vh;
  background: ${C.white};
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  color: ${C.text};
  overflow-x: hidden;
`;

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 28px;
`;

/* ─────────────────────────────────────────
   ① HERO
───────────────────────────────────────── */
const Hero = styled.section`
  background: ${C.navyDark};
  position: relative;
  overflow: hidden;
  padding: 100px 0 90px;

  /* Subtle grid overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }
`;

/* Large decorative circles */
const HeroCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
`;
const HeroCircle1 = styled(HeroCircle)`
  width: 560px; height: 560px;
  top: -200px; right: -140px;
  border: 72px solid rgba(192,57,43,0.12);
  animation: ${pulse} 6s ease-in-out infinite;
`;
const HeroCircle2 = styled(HeroCircle)`
  width: 320px; height: 320px;
  bottom: -120px; left: -80px;
  border: 48px solid rgba(255,255,255,0.04);
`;

const HeroInner = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const HeroLeft = styled.div`
  animation: ${fadeUp} 0.7s ease both;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(192,57,43,0.18);
  border: 1px solid rgba(192,57,43,0.35);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  color: #f08080;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 24px;

  span {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${C.accent};
    display: inline-block;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(32px, 4vw, 50px);
  font-weight: 900;
  color: ${C.white};
  line-height: 1.22;
  margin: 0 0 20px;
  letter-spacing: -0.02em;

  em {
    font-style: normal;
    color: transparent;
    background: linear-gradient(135deg, #e87c6c 0%, #f4a78a 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 17px;
  color: rgba(255,255,255,0.62);
  line-height: 1.75;
  margin: 0 0 36px;
  max-width: 480px;
`;

const HeroCtas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 44px;
`;

const CtaPrimary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 26px;
  background: ${C.accent};
  border: 2px solid ${C.accent};
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  color: ${C.white};
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    background: ${C.accentHov};
    border-color: ${C.accentHov};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(192,57,43,0.35);
  }
  &:active { transform: translateY(0); }
`;

const CtaOutline = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 26px;
  background: transparent;
  border: 2px solid rgba(255,255,255,0.25);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.6);
    background: rgba(255,255,255,0.07);
    color: ${C.white};
  }
`;

const HeroTrust = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.55);

  svg { color: #7fafd4; flex-shrink: 0; }
`;

/* Hero right: floating mock exam card */
const HeroRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeUp} 0.7s ease 0.15s both;

  @media (max-width: 860px) { display: none; }
`;

const MockCard = styled.div`
  width: 320px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  padding: 28px;
  backdrop-filter: blur(12px);
  animation: ${float} 5s ease-in-out infinite;
`;

const MockCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
`;

const MockCardIcon = styled.div`
  width: 40px; height: 40px;
  background: rgba(192,57,43,0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f08080;
`;

const MockCardTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${C.white};
`;

const MockCardSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.45);
`;

const MockProgress = styled.div`
  margin-bottom: 18px;
`;

const MockProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 8px;
  font-weight: 600;
`;

const MockProgressBar = styled.div`
  height: 6px;
  background: rgba(255,255,255,0.1);
  border-radius: 100px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: 62%;
    height: 100%;
    background: linear-gradient(90deg, ${C.accent}, #e87c6c);
    border-radius: 100px;
  }
`;

const MockStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const MockStat = styled.div`
  background: rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 10px 8px;
  text-align: center;
`;

const MockStatVal = styled.div`
  font-family: 'Merriweather', serif;
  font-size: 20px;
  font-weight: 700;
  color: ${C.white};
`;

const MockStatLabel = styled.div`
  font-size: 10px;
  color: rgba(255,255,255,0.42);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 2px;
`;

/* ─────────────────────────────────────────
   SECTION SHARED
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
  margin-bottom: 12px;

  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 2px;
    background: ${C.accent};
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(26px, 3vw, 36px);
  font-weight: 700;
  color: ${C.text};
  line-height: 1.28;
  margin: 0 0 14px;
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  font-size: 16px;
  color: ${C.muted};
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto;
`;

/* ─────────────────────────────────────────
   ② STATS STRIP
───────────────────────────────────────── */
const StatsStrip = styled.section`
  background: ${C.navy};
  padding: 0;
`;

const StatsInner = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  divide-x: 1px solid rgba(255,255,255,0.1);

  @media (max-width: 680px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatBox = styled.div`
  padding: 28px 24px;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.08);

  &:last-child { border-right: none; }
`;

const StatNumber = styled.div`
  font-family: 'Merriweather', serif;
  font-size: 30px;
  font-weight: 900;
  color: ${C.white};
  letter-spacing: -0.02em;
`;

const StatDesc = styled.div`
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 4px;
`;

/* ─────────────────────────────────────────
   ③ FEATURES
───────────────────────────────────────── */
const FeaturesSection = styled.section`
  padding: 96px 0;
  background: ${C.offWhite};
`;

const FeaturesHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled.div`
  background: ${C.white};
  border: 1.5px solid ${C.border};
  border-radius: 12px;
  padding: 32px 28px;
  transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
  cursor: default;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 36px rgba(13,43,85,0.10);
    border-color: ${C.navy};
  }
`;

const FeatureIconBox = styled.div`
  width: 48px; height: 48px;
  background: ${C.navyFaint};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.navy};
  margin-bottom: 20px;
  transition: background 0.2s;

  ${FeatureCard}:hover & {
    background: ${C.navy};
    color: ${C.white};
  }
`;

const FeatureTitle = styled.h3`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 10px;
`;

const FeatureBody = styled.p`
  font-size: 14.5px;
  color: ${C.muted};
  line-height: 1.7;
  margin: 0;
`;

/* ─────────────────────────────────────────
   ④ EXAM TYPES
───────────────────────────────────────── */
const ExamsSection = styled.section`
  padding: 96px 0;
  background: ${C.white};
`;

const ExamsHeader = styled.div`
  text-align: center;
  margin-bottom: 56px;
`;

const ExamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const ExamCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 26px 22px;
  background: ${C.navyFaint};
  border: 1.5px solid ${C.border};
  border-radius: 12px;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    background: ${C.navy};
    border-color: ${C.navy};
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(13,43,85,0.18);

    h3, p, div { color: ${C.white}; }
    span { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); }
  }
`;

const ExamBadge = styled.span`
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.accent};
  background: rgba(192,57,43,0.1);
  padding: 3px 10px;
  border-radius: 100px;
  transition: background 0.2s, color 0.2s;
`;

const ExamName = styled.h3`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 16px;
  font-weight: 700;
  color: ${C.text};
  margin: 0;
  line-height: 1.3;
  transition: color 0.2s;
`;

const ExamMeta = styled.p`
  font-size: 13px;
  color: ${C.muted};
  margin: 0;
  transition: color 0.2s;
`;

const ExamArrow = styled.div`
  margin-top: auto;
  color: ${C.muted};
  display: flex;
  align-items: center;
  transition: color 0.2s, transform 0.2s;

  ${ExamCard}:hover & {
    color: rgba(255,255,255,0.7);
    transform: translateX(4px);
  }
`;

/* ─────────────────────────────────────────
   ⑤ HOW IT WORKS
───────────────────────────────────────── */
const HowSection = styled.section`
  padding: 96px 0;
  background: ${C.navyDark};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }
`;

const HowHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;

  ${SectionLabel} { color: #f08080; &::before { background: #f08080; } }
  ${SectionTitle} { color: ${C.white}; }
  ${SectionSubtitle} { color: rgba(255,255,255,0.5); }
`;

const HowSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
  z-index: 1;

  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const HowStep = styled.div`
  text-align: center;
  padding: 36px 28px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.16);
  }
`;

const StepNumber = styled.div`
  width: 52px; height: 52px;
  border-radius: 50%;
  background: rgba(192,57,43,0.2);
  border: 2px solid rgba(192,57,43,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Merriweather', serif;
  font-size: 20px;
  font-weight: 900;
  color: #f08080;
  margin: 0 auto 20px;
`;

const StepTitle = styled.h3`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: ${C.white};
  margin: 0 0 10px;
`;

const StepBody = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  margin: 0;
`;

/* ─────────────────────────────────────────
   ⑥ CTA BANNER
───────────────────────────────────────── */
const CtaSection = styled.section`
  padding: 96px 0;
  background: ${C.white};
`;

const CtaBanner = styled.div`
  background: ${C.navy};
  border-radius: 16px;
  padding: 64px 52px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 300px; height: 300px;
    border-radius: 50%;
    border: 56px solid rgba(192,57,43,0.12);
    pointer-events: none;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 44px 32px;
    text-align: center;
  }
`;

const CtaText = styled.div`
  position: relative;
  z-index: 1;
`;

const CtaBannerTitle = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(22px, 2.5vw, 30px);
  font-weight: 700;
  color: ${C.white};
  margin: 0 0 10px;
  letter-spacing: -0.02em;
`;

const CtaBannerSub = styled.p`
  font-size: 15.5px;
  color: rgba(255,255,255,0.55);
  margin: 0;
  line-height: 1.65;
`;

const CtaBannerActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
  position: relative;
  z-index: 1;
  flex-shrink: 0;

  @media (max-width: 760px) { align-items: center; flex-direction: row; justify-content: center; }
`;

const CtaBig = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: ${C.accent};
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  color: ${C.white};
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    background: ${C.accentHov};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(192,57,43,0.4);
  }
`;

const CtaSecondary = styled(Link)`
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover { color: ${C.white}; }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const FEATURES = [
  {
    icon: <Clock size={22} />,
    title: "Timed Exams",
    body: "Practice under real exam conditions with a built-in countdown timer and per-question time tracking.",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Detailed Analytics",
    body: "Track performance across topics with diagnostic breakdowns and visual progress charts.",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Reference Materials",
    body: "Toggle the reference handbook during exams — just like the real NCEES computer-based test.",
  },
  {
    icon: <Shield size={22} />,
    title: "Realistic Questions",
    body: "Questions written and reviewed to NCEES standards, covering the full breadth of exam topics.",
  },
  {
    icon: <Award size={22} />,
    title: "Performance Reports",
    body: "Receive a detailed score report after every session, pinpointing weak areas to target.",
  },
  {
    icon: <Users size={22} />,
    title: "Candidate Community",
    body: "Learn from peers who have passed. Discussion boards and tips are available on your dashboard.",
  },
];

const EXAMS = [
  { label: "PE", name: "PE Water Resources", meta: "80 Questions · 8 Hours", to: "/exams" },
  { label: "PE", name: "PE Structural",       meta: "80 Questions · 8 Hours", to: "/exams" },
  { label: "FE", name: "FE General",          meta: "110 Questions · 6 Hours", to: "/exams" },
  { label: "PE", name: "PE Civil",            meta: "80 Questions · 8 Hours", to: "/exams" },
];

const STEPS = [
  { n: "1", title: "Create an Account", body: "Sign up in under a minute. No credit card required for your first practice session." },
  { n: "2", title: "Choose Your Exam", body: "Select your engineering discipline and exam type from our growing library." },
  { n: "3", title: "Practice & Improve", body: "Take timed exams, review your results, and track your progress to exam day." },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const LandingPage: React.FC = () => {
  return (
    <>
      <FontLoader />
      <Page>

        {/* ① HERO */}
        <Hero>
          <HeroCircle1 />
          <HeroCircle2 />
          <HeroInner>
            <HeroLeft>
              <HeroBadge><span />NCEES-Aligned Practice Platform</HeroBadge>
              <HeroTitle>
                Prepare for Your <em>Engineering Licensure</em> Exam
              </HeroTitle>
              <HeroSubtitle>
                Master the PE and FE exams with our professional computer-based testing platform.
                Practice with realistic exam conditions and track your progress to exam day.
              </HeroSubtitle>
              <HeroCtas>
                <CtaPrimary to="/practice">
                  Start Practice Exam <ArrowRight size={18} />
                </CtaPrimary>
                <CtaOutline to="/exams">
                  View Exam Specs <ChevronRight size={18} />
                </CtaOutline>
              </HeroCtas>
              <HeroTrust>
                <TrustItem><CheckCircle size={16} />Professional Standards</TrustItem>
                <TrustItem><CheckCircle size={16} />80-Question Exams</TrustItem>
                <TrustItem><CheckCircle size={16} />Instant Score Reports</TrustItem>
              </HeroTrust>
            </HeroLeft>

            <HeroRight>
              <MockCard>
                <MockCardHeader>
                  <MockCardIcon><BookOpen size={20} /></MockCardIcon>
                  <div>
                    <MockCardTitle>PE Civil — Session 2</MockCardTitle>
                    <MockCardSub>Question 50 of 80</MockCardSub>
                  </div>
                </MockCardHeader>
                <MockProgress>
                  <MockProgressLabel>
                    <span>Progress</span>
                    <span>62%</span>
                  </MockProgressLabel>
                  <MockProgressBar />
                </MockProgress>
                <MockStats>
                  <MockStat>
                    <MockStatVal>50</MockStatVal>
                    <MockStatLabel>Done</MockStatLabel>
                  </MockStat>
                  <MockStat>
                    <MockStatVal>78%</MockStatVal>
                    <MockStatLabel>Score</MockStatLabel>
                  </MockStat>
                  <MockStat>
                    <MockStatVal>2:14</MockStatVal>
                    <MockStatLabel>Left</MockStatLabel>
                  </MockStat>
                </MockStats>
              </MockCard>
            </HeroRight>
          </HeroInner>
        </Hero>

        {/* ② STATS STRIP */}
        <StatsStrip>
          <StatsInner>
            {[
              { n: "500+", d: "Practice Questions" },
              { n: "4",    d: "Exam Disciplines" },
              { n: "98%",  d: "Candidate Satisfaction" },
              { n: "24/7", d: "Access, Any Device" },
            ].map(({ n, d }) => (
              <StatBox key={d}>
                <StatNumber>{n}</StatNumber>
                <StatDesc>{d}</StatDesc>
              </StatBox>
            ))}
          </StatsInner>
        </StatsStrip>

        {/* ③ FEATURES */}
        <FeaturesSection>
          <Container>
            <FeaturesHeader>
              <SectionLabel>Platform Features</SectionLabel>
              <SectionTitle>Everything You Need to Pass</SectionTitle>
              <SectionSubtitle>
                Built around the exact conditions and standards of the official NCEES computer-based exam.
              </SectionSubtitle>
            </FeaturesHeader>
            <FeaturesGrid>
              {FEATURES.map(({ icon, title, body }) => (
                <FeatureCard key={title}>
                  <FeatureIconBox>{icon}</FeatureIconBox>
                  <FeatureTitle>{title}</FeatureTitle>
                  <FeatureBody>{body}</FeatureBody>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </Container>
        </FeaturesSection>

        {/* ④ EXAM TYPES */}
        <ExamsSection>
          <Container>
            <ExamsHeader>
              <SectionLabel>Disciplines</SectionLabel>
              <SectionTitle>Choose Your Exam</SectionTitle>
              <SectionSubtitle>
                Select your engineering discipline and get started with targeted practice.
              </SectionSubtitle>
            </ExamsHeader>
            <ExamsGrid>
              {EXAMS.map(({ label, name, meta, to }) => (
                <ExamCard key={name} to={to}>
                  <ExamBadge>{label} Exam</ExamBadge>
                  <ExamName>{name}</ExamName>
                  <ExamMeta>{meta}</ExamMeta>
                  <ExamArrow><ChevronRight size={18} /></ExamArrow>
                </ExamCard>
              ))}
            </ExamsGrid>
          </Container>
        </ExamsSection>

        {/* ⑤ HOW IT WORKS */}
        <HowSection>
          <Container>
            <HowHeader>
              <SectionLabel>How It Works</SectionLabel>
              <SectionTitle>Get Exam-Ready in 3 Steps</SectionTitle>
              <SectionSubtitle>
                Start practicing in minutes — no complicated setup required.
              </SectionSubtitle>
            </HowHeader>
            <HowSteps>
              {STEPS.map(({ n, title, body }) => (
                <HowStep key={n}>
                  <StepNumber>{n}</StepNumber>
                  <StepTitle>{title}</StepTitle>
                  <StepBody>{body}</StepBody>
                </HowStep>
              ))}
            </HowSteps>
          </Container>
        </HowSection>

        {/* ⑥ CTA BANNER */}
        <CtaSection>
          <Container>
            <CtaBanner>
              <CtaText>
                <CtaBannerTitle>Ready to Pass Your Exam?</CtaBannerTitle>
                <CtaBannerSub>
                  Join hundreds of engineers who've used our platform to earn their PE and FE licenses.
                </CtaBannerSub>
              </CtaText>
              <CtaBannerActions>
                <CtaBig to="/register">
                  Create Free Account <ArrowRight size={18} />
                </CtaBig>
                <CtaSecondary to="/practice">
                  Try a practice exam first <ChevronRight size={14} />
                </CtaSecondary>
              </CtaBannerActions>
            </CtaBanner>
          </Container>
        </CtaSection>

      </Page>
    </>
  );
};

export default LandingPage;