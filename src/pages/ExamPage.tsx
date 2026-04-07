import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Clock, Award, ArrowRight, CheckCircle,
  ChevronDown, ChevronUp, Users, Zap, Shield
} from 'lucide-react';
import styled, { keyframes, css } from 'styled-components';

/* ─────────────────────────────────────────
   TOKENS
───────────────────────────────────────── */
const C = {
  navy:      "#0d2b55",
  navyDark:  "#091e3e",
  navyLight: "#1a3f72",
  navyFaint: "#f0f4fa",
  accent:    "#c0392b",
  accentHov: "#a93226",
  white:     "#ffffff",
  offWhite:  "#f5f7fa",
  border:    "#dde3ed",
  text:      "#1a2533",
  muted:     "#5a6a80",
};

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(22px); }
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
  padding: 68px 0 60px;
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

const HeroCircleA = styled.div`
  position: absolute;
  top: -100px; right: -80px;
  width: 320px; height: 320px;
  border-radius: 50%;
  border: 52px solid rgba(192,57,43,0.1);
  animation: ${pulse} 6s ease-in-out infinite;
  pointer-events: none;
`;

const HeroCircleB = styled.div`
  position: absolute;
  bottom: -80px; left: -60px;
  width: 220px; height: 220px;
  border-radius: 50%;
  border: 36px solid rgba(255,255,255,0.03);
  pointer-events: none;
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
  margin-bottom: 18px;

  span {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${C.accent};
    display: inline-block;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 900;
  color: ${C.white};
  margin: 0 0 14px;
  letter-spacing: -0.02em;
  line-height: 1.22;
`;

const HeroSubtitle = styled.p`
  font-size: 16.5px;
  color: rgba(255,255,255,0.52);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.72;
`;

/* ─────────────────────────────────────────
   TRUST STRIP
───────────────────────────────────────── */
const TrustStrip = styled.div`
  background: ${C.navy};
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const TrustInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  height: 52px;
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.52);
  border-right: 1px solid rgba(255,255,255,0.08);

  &:last-child { border-right: none; }
  svg { color: #7fafd4; }

  @media (max-width: 600px) {
    padding: 0 14px;
    font-size: 12px;
  }
`;

/* ─────────────────────────────────────────
   SECTION ATOMS
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
  font-size: clamp(22px, 2.8vw, 30px);
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 10px;
  letter-spacing: -0.02em;
`;

const SectionSub = styled.p`
  font-size: 15.5px;
  color: ${C.muted};
  line-height: 1.7;
  margin: 0;
`;

/* ─────────────────────────────────────────
   EXAM GRID SECTION
───────────────────────────────────────── */
const ExamsSection = styled.section`
  padding: 72px 0 80px;
`;

const ExamsHeader = styled.div`
  margin-bottom: 48px;
  text-align: center;
`;

const ExamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;

  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

/* ── Single exam card ── */
const ExamCard = styled.div`
  background: ${C.white};
  border: 1.5px solid ${C.border};
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
  animation: ${fadeUp} 0.5s ease both;

  &:hover {
    border-color: ${C.navy};
    box-shadow: 0 12px 40px rgba(13,43,85,0.12);
    transform: translateY(-4px);
  }
`;

const ExamCardTop = styled.div`
  padding: 26px 26px 0;
`;

const ExamCardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ExamTypeBadge = styled.span<{ $fe?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  ${({ $fe }) => $fe ? css`
    background: rgba(29,78,216,0.1);
    color: #1d4ed8;
    border: 1px solid rgba(29,78,216,0.2);
  ` : css`
    background: rgba(192,57,43,0.1);
    color: ${C.accent};
    border: 1px solid rgba(192,57,43,0.2);
  `}
`;

const ExamPrice = styled.div`
  font-family: 'Merriweather', serif;
  font-size: 20px;
  font-weight: 900;
  color: ${C.navy};
`;

const ExamTitle = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 19px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 6px;
  line-height: 1.28;
`;

const ExamDescription = styled.p`
  font-size: 14px;
  color: ${C.muted};
  margin: 0 0 20px;
  line-height: 1.6;
`;

/* Stats row */
const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid ${C.border};
  border-bottom: 1px solid ${C.border};
`;

const StatCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 8px;
  border-right: 1px solid ${C.border};
  text-align: center;

  &:last-child { border-right: none; }
`;

const StatIcon = styled.div`
  color: ${C.navy};
  opacity: 0.6;
  margin-bottom: 5px;
`;

const StatVal = styled.div`
  font-family: 'Merriweather', serif;
  font-size: 15px;
  font-weight: 700;
  color: ${C.text};
`;

const StatLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${C.muted};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 2px;
`;

/* Topics */
const TopicsArea = styled.div`
  padding: 18px 26px 0;
`;

const TopicsLabel = styled.p`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0 0 10px;
`;

const TopicTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TopicTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 11px;
  background: ${C.navyFaint};
  border: 1px solid ${C.border};
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  color: ${C.navy};
  transition: background 0.15s, border-color 0.15s;

  ${ExamCard}:hover & {
    background: #e4ecf8;
    border-color: #b8cce4;
  }
`;

/* Card footer */
const CardFooter = styled.div`
  padding: 20px 26px 24px;
  margin-top: auto;
`;

const RegisterBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px 20px;
  background: ${C.navy};
  border-radius: 8px;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 14.5px;
  font-weight: 700;
  color: ${C.white};
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background: ${C.navyLight};
    box-shadow: 0 6px 20px rgba(13,43,85,0.22);
  }
`;

/* ─────────────────────────────────────────
   COMPARISON TABLE SECTION
───────────────────────────────────────── */
const TableSection = styled.section`
  padding: 0 0 80px;
`;

const TableCard = styled.div`
  background: ${C.white};
  border: 1.5px solid ${C.border};
  border-radius: 14px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 26px 28px 22px;
  border-bottom: 1px solid ${C.border};
`;

const CompareTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Thead = styled.thead`
  background: ${C.navyFaint};
`;

const Th = styled.th`
  padding: 13px 20px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${C.muted};
  border-bottom: 1px solid ${C.border};

  &:not(:first-child) { text-align: center; }
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${C.border};
  transition: background 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: ${C.navyFaint}; }
`;

const Td = styled.td`
  padding: 13px 20px;
  color: ${C.text};
  font-weight: 500;

  &:not(:first-child) {
    text-align: center;
    font-weight: 600;
  }

  &:first-child { color: ${C.muted}; font-size: 13.5px; }
`;

const Check = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #16a34a;
`;

const Dash = styled.span`
  color: ${C.border};
  font-size: 18px;
  font-weight: 300;
`;

/* ─────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────── */
const FaqSection = styled.section`
  padding: 0 0 88px;
`;

const FaqHeader = styled.div`
  margin-bottom: 36px;
`;

const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 680px) { grid-template-columns: 1fr; }
`;

const FaqItem = styled.div<{ $open: boolean }>`
  background: ${C.white};
  border: 1.5px solid ${({ $open }) => $open ? C.navy : C.border};
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.2s;
`;

const FaqQuestion = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 14.5px;
  font-weight: 700;
  color: ${({ $open }) => $open ? C.navy : C.text};
  transition: color 0.18s, background 0.18s;

  &:hover { background: ${C.navyFaint}; color: ${C.navy}; }
  svg { flex-shrink: 0; color: ${C.muted}; }
`;

const FaqAnswer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => $open ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const FaqAnswerInner = styled.div`
  padding: 14px 18px 18px;
  font-size: 14px;
  color: ${C.muted};
  line-height: 1.72;
  border-top: 1px solid ${C.border};
`;

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
const CtaSection = styled.section`
  padding: 0 0 88px;
`;

const CtaBanner = styled.div`
  background: ${C.navyDark};
  border-radius: 16px;
  padding: 58px 52px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -70px; right: -70px;
    width: 280px; height: 280px;
    border-radius: 50%;
    border: 48px solid rgba(192,57,43,0.12);
    pointer-events: none;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    padding: 40px 30px;
    text-align: center;
  }
`;

const CtaText = styled.div` position: relative; z-index: 1; `;

const CtaTitle = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 700;
  color: ${C.white};
  margin: 0 0 8px;
  letter-spacing: -0.02em;
`;

const CtaSub = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,0.5);
  margin: 0;
  line-height: 1.65;
`;

const CtaActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  position: relative; z-index: 1;
  flex-shrink: 0;

  @media (max-width: 720px) { align-items: center; }
`;

const CtaBtnPrimary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 26px;
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

const CtaBtnOutline = styled(Link)`
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;

  &:hover { color: ${C.white}; }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const EXAMS = [
  {
    id: 1,
    type: 'PE',
    title: 'PE Water Resources',
    duration: '8 hours',
    questions: 80,
    cost: '$399',
    description: 'Professional Engineer exam for Water Resources specialists — hydraulics, hydrology, water quality, and infrastructure systems.',
    topics: ['Hydraulics', 'Hydrology', 'Water Quality', 'Infrastructure'],
  },
  {
    id: 2,
    type: 'PE',
    title: 'PE Structural',
    duration: '8 hours',
    questions: 80,
    cost: '$399',
    description: 'Professional Engineer exam for Structural specialists — steel design, concrete, foundation analysis, and structural systems.',
    topics: ['Steel Design', 'Concrete', 'Foundations', 'Analysis'],
  },
  {
    id: 3,
    type: 'FE',
    title: 'FE General (Fundamentals)',
    duration: '5.5 hours',
    questions: 110,
    cost: '$199',
    description: 'Fundamentals of Engineering exam for general disciplines — mathematics, physics, chemistry, and core engineering principles.',
    topics: ['Mathematics', 'Physics', 'Chemistry', 'Engineering Principles'],
  },
  {
    id: 4,
    type: 'PE',
    title: 'PE Civil',
    duration: '8 hours',
    questions: 80,
    cost: '$399',
    description: 'Professional Engineer exam for Civil Engineering — transportation, water resources, geotechnical, and structural systems.',
    topics: ['Transportation', 'Water Resources', 'Geotechnical', 'Structures'],
  },
];

const COMPARE_ROWS = [
  { feature: 'Exam Duration',      pe: '8 hours',    fe: '5.5 hours' },
  { feature: 'Total Questions',    pe: '80',          fe: '110' },
  { feature: 'Registration Fee',   pe: '$399',        fe: '$199' },
  { feature: 'Reference Handbook', pe: true,          fe: true },
  { feature: 'Timed Practice',     pe: true,          fe: true },
  { feature: 'Score Report',       pe: true,          fe: true },
  { feature: 'Unlimited Retakes',  pe: true,          fe: true },
  { feature: 'Topic Breakdown',    pe: true,          fe: true },
];

const FAQS = [
  {
    q: 'How are these exams structured?',
    a: 'Our exams follow the official NCEES structure with 80 questions for PE exams or 110 questions for FE exams. Practice sessions are fully timed and simulate real exam conditions.',
  },
  {
    q: 'What is the passing score?',
    a: 'The passing score is 70% for all PE exams. FE exams use a competency-based scoring methodology evaluated topic by topic.',
  },
  {
    q: 'Can I retake practice exams?',
    a: 'Yes — practice exams are unlimited. We recommend taking multiple sessions to build confidence and systematically close weak areas before your scheduled date.',
  },
  {
    q: 'Is a reference handbook provided?',
    a: 'Yes. A reference handbook is available during every exam session, exactly as it is in the official NCEES CBT environment.',
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const ExamsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <FontLoader />
      <Page>

        {/* HERO */}
        <PageHero>
          <HeroCircleA />
          <HeroCircleB />
          <HeroInner>
            <HeroBadge><span />NCEES-Aligned Exams</HeroBadge>
            <HeroTitle>Available Exams</HeroTitle>
            <HeroSubtitle>
              Choose from our selection of professional engineering exams, each built
              to replicate the official NCEES computer-based testing experience.
            </HeroSubtitle>
          </HeroInner>
        </PageHero>

        {/* TRUST STRIP */}
        <TrustStrip>
          <TrustInner>
            <TrustItem><CheckCircle size={14} />NCEES-Aligned Content</TrustItem>
            <TrustItem><CheckCircle size={14} />Unlimited Practice</TrustItem>
            <TrustItem><CheckCircle size={14} />Instant Score Reports</TrustItem>
            <TrustItem><CheckCircle size={14} />Reference Handbook Included</TrustItem>
          </TrustInner>
        </TrustStrip>

        {/* EXAM CARDS */}
        <ExamsSection>
          <Container>
            <ExamsHeader>
              <SectionLabel>Disciplines</SectionLabel>
              <SectionTitle>Select Your Exam</SectionTitle>
              <SectionSub>
                All exams include a timed practice environment, score report, and reference handbook access.
              </SectionSub>
            </ExamsHeader>

            <ExamGrid>
              {EXAMS.map((exam, i) => (
                <ExamCard key={exam.id} style={{ animationDelay: `${i * 0.08}s` }}>
                  <ExamCardTop>
                    <ExamCardMeta>
                      <ExamTypeBadge $fe={exam.type === 'FE'}>
                        {exam.type} Exam
                      </ExamTypeBadge>
                      <ExamPrice>{exam.cost}</ExamPrice>
                    </ExamCardMeta>
                    <ExamTitle>{exam.title}</ExamTitle>
                    <ExamDescription>{exam.description}</ExamDescription>
                  </ExamCardTop>

                  <StatRow>
                    <StatCell>
                      <StatIcon><Clock size={16} /></StatIcon>
                      <StatVal>{exam.duration}</StatVal>
                      <StatLabel>Duration</StatLabel>
                    </StatCell>
                    <StatCell>
                      <StatIcon><BookOpen size={16} /></StatIcon>
                      <StatVal>{exam.questions}</StatVal>
                      <StatLabel>Questions</StatLabel>
                    </StatCell>
                    <StatCell>
                      <StatIcon><Award size={16} /></StatIcon>
                      <StatVal>70%</StatVal>
                      <StatLabel>Pass Mark</StatLabel>
                    </StatCell>
                  </StatRow>

                  <TopicsArea>
                    <TopicsLabel>Key Topics</TopicsLabel>
                    <TopicTags>
                      {exam.topics.map(t => <TopicTag key={t}>{t}</TopicTag>)}
                    </TopicTags>
                  </TopicsArea>

                  <CardFooter>
                    <RegisterBtn to="/practice">
                      Start Practice Exam <ArrowRight size={17} />
                    </RegisterBtn>
                  </CardFooter>
                </ExamCard>
              ))}
            </ExamGrid>
          </Container>
        </ExamsSection>

        {/* COMPARISON TABLE */}
        <TableSection>
          <Container>
            <SectionLabel>Compare</SectionLabel>
            <SectionTitle style={{ marginBottom: 6 }}>PE vs FE at a Glance</SectionTitle>
            <SectionSub style={{ marginBottom: 28 }}>
              Not sure which exam fits your career stage? Here's a side-by-side breakdown.
            </SectionSub>
            <TableCard>
              <TableHeader>
                <SectionLabel style={{ margin: 0 }}>Feature Comparison</SectionLabel>
              </TableHeader>
              <CompareTable>
                <Thead>
                  <tr>
                    <Th style={{ width: '40%' }}>Feature</Th>
                    <Th>PE Exams</Th>
                    <Th>FE Exam</Th>
                  </tr>
                </Thead>
                <tbody>
                  {COMPARE_ROWS.map(({ feature, pe, fe }) => (
                    <Tr key={feature}>
                      <Td>{feature}</Td>
                      <Td>
                        {typeof pe === 'boolean'
                          ? pe ? <Check><CheckCircle size={16} /></Check> : <Dash>—</Dash>
                          : pe}
                      </Td>
                      <Td>
                        {typeof fe === 'boolean'
                          ? fe ? <Check><CheckCircle size={16} /></Check> : <Dash>—</Dash>
                          : fe}
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </CompareTable>
            </TableCard>
          </Container>
        </TableSection>

        {/* FAQ */}
        <FaqSection>
          <Container>
            <FaqHeader>
              <SectionLabel>Exam FAQs</SectionLabel>
              <SectionTitle>Common Questions</SectionTitle>
              <SectionSub>
                Quick answers to the most common questions about exam structure and practice.
              </SectionSub>
            </FaqHeader>
            <FaqGrid>
              {FAQS.map(({ q, a }, i) => (
                <FaqItem key={i} $open={openFaq === i}>
                  <FaqQuestion
                    $open={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {q}
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </FaqQuestion>
                  <FaqAnswer $open={openFaq === i}>
                    <FaqAnswerInner>{a}</FaqAnswerInner>
                  </FaqAnswer>
                </FaqItem>
              ))}
            </FaqGrid>
          </Container>
        </FaqSection>

        {/* CTA */}
        <CtaSection>
          <Container>
            <CtaBanner>
              <CtaText>
                <CtaTitle>Ready to Start Practicing?</CtaTitle>
                <CtaSub>
                  Create a free account and take your first full-length practice exam today.
                </CtaSub>
              </CtaText>
              <CtaActions>
                <CtaBtnPrimary to="/register">
                  Create Free Account <ArrowRight size={17} />
                </CtaBtnPrimary>
                <CtaBtnOutline to="/practice">
                  Try a practice exam first →
                </CtaBtnOutline>
              </CtaActions>
            </CtaBanner>
          </Container>
        </CtaSection>

      </Page>
    </>
  );
};

export default ExamsPage;