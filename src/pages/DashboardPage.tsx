import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import {
  Calendar, CheckCircle, AlertCircle, ArrowRight,
  BarChart3, BookOpen, FileText, HelpCircle, ChevronRight,
  Clock, Target, TrendingUp, Mail, ExternalLink
} from 'lucide-react';
import styled, { keyframes, css } from 'styled-components';

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
  green: "#16a34a",
  greenBg: "#f0fdf4",
  greenBdr: "#bbf7d0",
  amber: "#d97706",
  amberBg: "#fffbeb",
  amberBdr: "#fde68a",
  blue: "#1d4ed8",
  blueBg: "#eff6ff",
  blueBdr: "#bfdbfe",
};

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const growWidth = keyframes`
  from { width: 0; }
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
   PAGE HEADER BAND
───────────────────────────────────────── */
const HeaderBand = styled.div`
  background: ${C.navyDark};
  padding: 44px 0 40px;
  position: relative;
  overflow: hidden;

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

const HeaderCircle = styled.div`
  position: absolute;
  top: -80px; right: -80px;
  width: 260px; height: 260px;
  border-radius: 50%;
  border: 44px solid rgba(192,57,43,0.1);
  animation: ${pulse} 6s ease-in-out infinite;
  pointer-events: none;
`;

const HeaderInner = styled(Container)`
  position: relative;
  z-index: 1;
  animation: ${fadeUp} 0.5s ease both;
`;

const GreetingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin-bottom: 8px;
`;

const GreetingName = styled.h1`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 900;
  color: ${C.white};
  margin: 0 0 6px;
  letter-spacing: -0.02em;
`;

const GreetingSub = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,0.48);
  margin: 0;
`;

/* ─────────────────────────────────────────
   BODY GRID
───────────────────────────────────────── */
const Body = styled.div`
  padding: 36px 0 72px;
`;

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;

  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;

const MainCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const SideCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/* ─────────────────────────────────────────
   SHARED CARD
───────────────────────────────────────── */
const Card = styled.div`
  background: ${C.white};
  border: 1.5px solid ${C.border};
  border-radius: 12px;
  padding: 28px 28px 26px;
  animation: ${fadeUp} 0.5s ease both;
`;

const CardTitle = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg { color: ${C.navy}; flex-shrink: 0; }
`;

const Divider = styled.div`
  height: 1px;
  background: ${C.border};
  margin: 20px 0;
`;

/* ─────────────────────────────────────────
   STATUS CARD
───────────────────────────────────────── */
const StatusHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const StatusBadge = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 14px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;

  ${({ $status }) => $status === 'Approved' && css`
    background: ${C.greenBg};
    border: 1.5px solid ${C.greenBdr};
    color: ${C.green};
  `}
  ${({ $status }) => $status === 'Scheduled' && css`
    background: ${C.blueBg};
    border: 1.5px solid ${C.blueBdr};
    color: ${C.blue};
  `}
  ${({ $status }) => $status === 'Pending' && css`
    background: ${C.amberBg};
    border: 1.5px solid ${C.amberBdr};
    color: ${C.amber};
  `}

  span {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: currentColor;
    display: inline-block;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 28px;
  margin-bottom: 22px;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const InfoItem = styled.div``;

const InfoLabel = styled.p`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0 0 4px;
`;

const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${C.text};
  display: flex;
  align-items: center;
  gap: 8px;

  svg { color: ${C.navy}; }
`;

const CountdownValue = styled.span`
  font-family: 'Merriweather', serif;
  font-size: 22px;
  font-weight: 900;
  color: ${C.navy};
`;

const NoticeBand = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  background: ${C.blueBg};
  border-left: 4px solid ${C.blue};
  border-radius: 0 8px 8px 0;
  font-size: 13.5px;
  color: #1e3a8a;
  line-height: 1.6;

  svg { flex-shrink: 0; color: ${C.blue}; margin-top: 1px; }
  strong { font-weight: 700; }
`;

/* ─────────────────────────────────────────
   LAUNCH EXAM CARD
───────────────────────────────────────── */
const LaunchCard = styled.div`
  background: ${C.navyDark};
  border: 1.5px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 30px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  overflow: hidden;
  animation: ${fadeUp} 0.5s ease 0.1s both;

  &::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    border: 36px solid rgba(192,57,43,0.12);
    pointer-events: none;
  }

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LaunchText = styled.div`
  position: relative; z-index: 1;
`;

const LaunchTitle = styled.h3`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 19px;
  font-weight: 700;
  color: ${C.white};
  margin: 0 0 6px;
`;

const LaunchSub = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  margin: 0;
  line-height: 1.6;
`;

const LaunchBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  background: ${C.accent};
  border: none;
  border-radius: 8px;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 14.5px;
  font-weight: 700;
  color: ${C.white};
  cursor: pointer;
  white-space: nowrap;
  position: relative; z-index: 1;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${C.accentHov};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(192,57,43,0.35);
  }
  &:active { transform: none; }
`;

/* ─────────────────────────────────────────
   PROGRESS CARD
───────────────────────────────────────── */
const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: ${C.text};
  margin-bottom: 10px;
`;

const ProgressCount = styled.span`
  font-size: 13px;
  color: ${C.muted};
  font-weight: 500;
`;

const ProgressTrack = styled.div`
  height: 8px;
  background: ${C.border};
  border-radius: 100px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, ${C.navy} 0%, ${C.navyLight} 100%);
  border-radius: 100px;
  animation: ${growWidth} 0.8s ease both;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const StatBox = styled.div`
  background: ${C.navyFaint};
  border: 1.5px solid ${C.border};
  border-radius: 10px;
  padding: 16px 14px;
  text-align: center;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: ${C.navy};
    box-shadow: 0 4px 16px rgba(13,43,85,0.08);
  }
`;

const StatIcon = styled.div`
  color: ${C.navy};
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
  opacity: 0.6;
`;

const StatVal = styled.div`
  font-family: 'Merriweather', serif;
  font-size: 24px;
  font-weight: 900;
  color: ${C.navy};
  line-height: 1.1;
`;

const StatLabel = styled.div`
  font-size: 11.5px;
  font-weight: 600;
  color: ${C.muted};
  margin-top: 4px;
  letter-spacing: 0.03em;
`;

/* ─────────────────────────────────────────
   SIDEBAR CARDS
───────────────────────────────────────── */
const SideCard = styled(Card)`
  padding: 22px 22px 20px;
`;

const SideCardTitle = styled.h4`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 14.5px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 16px;
`;

/* Quick Stats */
const QuickStatRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const QuickItem = styled.div``;

const QuickItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const QuickItemLabel = styled.span`
  font-size: 13.5px;
  color: ${C.muted};
  font-weight: 500;
`;

const QuickItemValue = styled.span`
  font-size: 13.5px;
  font-weight: 700;
  color: ${C.text};
`;

const MiniTrack = styled.div`
  height: 5px;
  background: ${C.border};
  border-radius: 100px;
  overflow: hidden;
`;

const MiniFill = styled.div<{ $pct: number; $color?: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color || C.green};
  border-radius: 100px;
  animation: ${growWidth} 0.8s ease both;
`;

/* Resources */
const ResourceList = styled.ul`
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ResourceItem = styled.li``;

const ResourceLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 7px;
  font-size: 13.5px;
  font-weight: 600;
  color: ${C.navy};
  text-decoration: none;
  transition: background 0.15s, color 0.15s;

  svg { color: ${C.muted}; transition: color 0.15s; flex-shrink: 0; }

  &:hover {
    background: ${C.navyFaint};
    color: ${C.navy};
    svg { color: ${C.navy}; }
  }

  span { flex: 1; }
`;

/* Support */
const SupportCard = styled.div`
  background: ${C.navyDark};
  border-radius: 12px;
  padding: 22px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: -40px; right: -40px;
    width: 140px; height: 140px;
    border-radius: 50%;
    border: 24px solid rgba(192,57,43,0.15);
    pointer-events: none;
  }
`;

const SupportTitle = styled.h4`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 15px;
  font-weight: 700;
  color: ${C.white};
  margin: 0 0 8px;
`;

const SupportBody = styled.p`
  font-size: 13px;
  color: rgba(255,255,255,0.48);
  line-height: 1.65;
  margin: 0 0 14px;
`;

const SupportLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13.5px;
  font-weight: 700;
  color: #f08080;
  text-decoration: none;
  position: relative; z-index: 1;
  transition: color 0.15s;

  &:hover { color: ${C.white}; }
`;

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
interface CandidateProfile {
  name: string;
  examType: string;
  status: 'Approved' | 'Pending' | 'Scheduled';
  scheduledDate: string;
  completedPracticeExams: number;
}

const STATUS_ICONS: Record<string, JSX.Element> = {
  Approved: <CheckCircle size={15} />,
  Scheduled: <Calendar size={15} />,
  Pending: <AlertCircle size={15} />,
};

const RESOURCES = [
  { icon: <FileText size={14} />, label: 'Exam Specifications', href: '#' },
  { icon: <BookOpen size={14} />, label: 'Reference Handbook', href: '#' },
  { icon: <TrendingUp size={14} />, label: 'Study Guide', href: '#' },
  { icon: <HelpCircle size={14} />, label: 'FAQ', href: '#' },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const DashboardPage: React.FC = () => {
  const { user } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  const [candidateData, setCandidateData] = useState<CandidateProfile>({
    name: 'Engineer Candidate',
    examType: 'PE Water Resources',
    status: 'Approved',
    scheduledDate: '2026-03-15',
    completedPracticeExams: 3,
  });

  useEffect(() => {
    if (user?.name) {
      setCandidateData(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const daysUntil = Math.ceil(
    (new Date(candidateData.scheduledDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const progressPct = (candidateData.completedPracticeExams / 10) * 100;

  return (
    <>
      <FontLoader />
      <Page>

        {/* HEADER BAND */}
        <HeaderBand>
          <HeaderCircle />
          <HeaderInner>
            <GreetingBadge>
              <CheckCircle size={12} /> Candidate Dashboard
            </GreetingBadge>
            <GreetingName>Welcome back, {candidateData.name}</GreetingName>
            <GreetingSub>Here's a summary of your exam status and practice progress.</GreetingSub>
          </HeaderInner>
        </HeaderBand>

        <Body>
          <Grid>

            {/* ── MAIN COLUMN ── */}
            <MainCol>

              {/* APPLICATION STATUS */}
              <Card>
                <StatusHeader>
                  <CardTitle style={{ margin: 0 }}>
                    <Calendar size={18} />
                    Application Status
                  </CardTitle>
                  <StatusBadge $status={candidateData.status}>
                    {STATUS_ICONS[candidateData.status]}
                    <span />
                    {candidateData.status}
                  </StatusBadge>
                </StatusHeader>

                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Exam Type</InfoLabel>
                    <InfoValue>{candidateData.examType}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Scheduled Date</InfoLabel>
                    <InfoValue>
                      <Calendar size={15} />
                      {new Date(candidateData.scheduledDate).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Registered Email</InfoLabel>
                    <InfoValue style={{ fontSize: 14 }}>{user?.email ?? '—'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Time Until Exam</InfoLabel>
                    <InfoValue>
                      <Clock size={15} />
                      <CountdownValue>{daysUntil}</CountdownValue>
                      <span style={{ fontSize: 14, color: C.muted, fontWeight: 500 }}>days</span>
                    </InfoValue>
                  </InfoItem>
                </InfoGrid>

                <NoticeBand>
                  <CheckCircle size={16} />
                  <span>
                    <strong>Application approved.</strong> You may launch the actual exam once your
                    scheduled date arrives. Practice exams are available now and unlimited.
                  </span>
                </NoticeBand>
              </Card>

              {/* LAUNCH CARD */}
              <LaunchCard>
                <LaunchText>
                  <LaunchTitle>Ready to Take the Exam?</LaunchTitle>
                  <LaunchSub>
                    Launch a full 80-question, 8-hour practice session under realistic conditions.
                  </LaunchSub>
                </LaunchText>
                <LaunchBtn onClick={() => navigate('/exam')}>
                  Launch Exam <ArrowRight size={17} />
                </LaunchBtn>
              </LaunchCard>

              {/* PRACTICE PROGRESS */}
              <Card>
                <CardTitle>
                  <BarChart3 size={18} />
                  Practice Progress
                </CardTitle>

                <ProgressLabel>
                  Practice Exams Completed
                  <ProgressCount>{candidateData.completedPracticeExams} / 10</ProgressCount>
                </ProgressLabel>
                <ProgressTrack>
                  <ProgressFill $pct={progressPct} />
                </ProgressTrack>

                <Divider />

                <StatsGrid>
                  <StatBox>
                    <StatIcon><Target size={16} /></StatIcon>
                    <StatVal>78%</StatVal>
                    <StatLabel>Avg. Score</StatLabel>
                  </StatBox>
                  <StatBox>
                    <StatIcon><FileText size={16} /></StatIcon>
                    <StatVal>42</StatVal>
                    <StatLabel>Questions Done</StatLabel>
                  </StatBox>
                  <StatBox>
                    <StatIcon><Clock size={16} /></StatIcon>
                    <StatVal>12h</StatVal>
                    <StatLabel>Study Time</StatLabel>
                  </StatBox>
                </StatsGrid>
              </Card>

            </MainCol>

            {/* ── SIDEBAR ── */}
            <SideCol>

              {/* QUICK STATS */}
              <SideCard>
                <SideCardTitle>Quick Stats</SideCardTitle>
                <QuickStatRow>
                  <QuickItem>
                    <QuickItemHeader>
                      <QuickItemLabel>Profile Complete</QuickItemLabel>
                      <QuickItemValue>100%</QuickItemValue>
                    </QuickItemHeader>
                    <MiniTrack><MiniFill $pct={100} $color={C.green} /></MiniTrack>
                  </QuickItem>
                  <QuickItem>
                    <QuickItemHeader>
                      <QuickItemLabel>Practice Progress</QuickItemLabel>
                      <QuickItemValue>{Math.round(progressPct)}%</QuickItemValue>
                    </QuickItemHeader>
                    <MiniTrack><MiniFill $pct={progressPct} $color={C.navy} /></MiniTrack>
                  </QuickItem>
                  <QuickItem>
                    <QuickItemHeader>
                      <QuickItemLabel>Application</QuickItemLabel>
                      <QuickItemValue style={{ color: C.green }}>Approved</QuickItemValue>
                    </QuickItemHeader>
                    <MiniTrack><MiniFill $pct={100} $color={C.green} /></MiniTrack>
                  </QuickItem>
                </QuickStatRow>
              </SideCard>

              {/* RESOURCES */}
              <SideCard>
                <SideCardTitle>Resources</SideCardTitle>
                <ResourceList>
                  {RESOURCES.map(({ icon, label, href }) => (
                    <ResourceItem key={label}>
                      <ResourceLink href={href}>
                        {icon}
                        <span>{label}</span>
                        <ExternalLink size={11} />
                      </ResourceLink>
                    </ResourceItem>
                  ))}
                </ResourceList>
              </SideCard>

              {/* SUPPORT */}
              <SupportCard>
                <SupportTitle>Need Help?</SupportTitle>
                <SupportBody>
                  Contact our support team for any questions about your exam or the platform.
                </SupportBody>
                <SupportLink href="mailto:support@ncees-exam.com">
                  <Mail size={14} />
                  support@ncees-exam.com
                </SupportLink>
              </SupportCard>

            </SideCol>
          </Grid>
        </Body>

      </Page>
    </>
  );
};

export default DashboardPage;