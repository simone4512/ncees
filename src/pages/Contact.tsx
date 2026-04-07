import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  MessageSquare, FileText, HelpCircle, ChevronDown, ChevronUp
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
  inputBg:   "#fcfdff",
  green:     "#16a34a",
  greenBg:   "#f0fdf4",
  greenBdr:  "#bbf7d0",
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
const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const popIn = keyframes`
  0%   { opacity: 0; transform: scale(0.85) translateY(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
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
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.72;
`;

/* ─────────────────────────────────────────
   BODY
───────────────────────────────────────── */
const Body = styled.div`
  padding: 52px 0 88px;
`;

const BodyGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 28px;
  align-items: start;

  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;

/* ─────────────────────────────────────────
   CONTACT FORM CARD
───────────────────────────────────────── */
const FormCard = styled.div`
  background: ${C.white};
  border: 1.5px solid ${C.border};
  border-radius: 14px;
  padding: 36px 36px 32px;
  animation: ${fadeUp} 0.55s ease both;

  @media (max-width: 560px) { padding: 26px 20px 22px; }
`;

const FormTitle = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 6px;
`;

const FormSubtitle = styled.p`
  font-size: 14px;
  color: ${C.muted};
  margin: 0 0 28px;
  line-height: 1.6;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
`;

const Label = styled.label`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.text};
`;

const inputBase = css`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid ${C.border};
  border-radius: 8px;
  background: ${C.inputBg};
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 14.5px;
  color: ${C.text};
  outline: none;
  transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
  box-sizing: border-box;

  &::placeholder { color: #b0bac8; }

  &:focus {
    border-color: ${C.navyLight};
    background: ${C.white};
    box-shadow: 0 0 0 3px rgba(13,43,85,0.08);
  }

  &:disabled {
    background: #f0f2f5;
    cursor: not-allowed;
  }
`;

const Input = styled.input`${inputBase}`;

const Select = styled.select`
  ${inputBase}
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235a6a80' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
`;

const Textarea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 130px;
  line-height: 1.65;
`;

const SubmitBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 24px;
  margin-top: 6px;
  background: ${C.navy};
  border: none;
  border-radius: 8px;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: ${C.white};
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover:not(:disabled) {
    background: ${C.navyLight};
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(13,43,85,0.22);
  }
  &:active:not(:disabled) { transform: none; box-shadow: none; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const Spinner = styled.span`
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: ${C.white};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

/* Success state */
const SuccessBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 24px;
  animation: ${popIn} 0.4s ease both;
`;

const SuccessIcon = styled.div`
  width: 64px; height: 64px;
  border-radius: 50%;
  background: ${C.greenBg};
  border: 2px solid ${C.greenBdr};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.green};
  margin-bottom: 20px;
`;

const SuccessTitle = styled.h3`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 10px;
`;

const SuccessBody = styled.p`
  font-size: 14.5px;
  color: ${C.muted};
  line-height: 1.7;
  margin: 0 0 24px;
  max-width: 340px;
`;

const ResetBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border: 1.5px solid ${C.border};
  border-radius: 8px;
  background: transparent;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${C.muted};
  cursor: pointer;
  transition: border-color 0.18s, color 0.18s, background 0.18s;

  &:hover {
    border-color: ${C.navy};
    color: ${C.navy};
    background: ${C.navyFaint};
  }
`;

/* ─────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────── */
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/* Contact info card */
const InfoCard = styled.div`
  background: ${C.navyDark};
  border-radius: 14px;
  padding: 28px 26px;
  position: relative;
  overflow: hidden;
  animation: ${fadeUp} 0.55s ease 0.1s both;

  &::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    border: 36px solid rgba(192,57,43,0.12);
    pointer-events: none;
  }
`;

const InfoCardTitle = styled.h3`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 16px;
  font-weight: 700;
  color: ${C.white};
  margin: 0 0 22px;
  position: relative; z-index: 1;
`;

const InfoItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative; z-index: 1;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
`;

const InfoIconBox = styled.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f08080;
  flex-shrink: 0;
`;

const InfoItemText = styled.div``;

const InfoItemLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 3px;
`;

const InfoItemValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.82);
  line-height: 1.5;
`;

/* Quick contact options */
const QuickCard = styled.div`
  background: ${C.white};
  border: 1.5px solid ${C.border};
  border-radius: 14px;
  padding: 22px 22px 18px;
  animation: ${fadeUp} 0.55s ease 0.15s both;
`;

const QuickCardTitle = styled.h4`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 14.5px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 14px;
`;

const QuickOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuickOption = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1.5px solid ${C.border};
  text-decoration: none;
  transition: border-color 0.18s, background 0.18s, transform 0.15s;

  &:hover {
    border-color: ${C.navy};
    background: ${C.navyFaint};
    transform: translateX(3px);
  }
`;

const QuickOptionIcon = styled.div`
  width: 34px; height: 34px;
  border-radius: 7px;
  background: ${C.navyFaint};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.navy};
  flex-shrink: 0;
  transition: background 0.18s;

  ${QuickOption}:hover & {
    background: ${C.navy};
    color: ${C.white};
  }
`;

const QuickOptionText = styled.div``;

const QuickOptionLabel = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: ${C.text};
`;

const QuickOptionSub = styled.div`
  font-size: 12px;
  color: ${C.muted};
`;

/* ─────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────── */
const FaqSection = styled.section`
  padding: 0 0 88px;
`;

const FaqInner = styled(Container)``;

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

const FaqHeader = styled.div`
  margin-bottom: 36px;
`;

const FaqTitle = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: clamp(22px, 2.8vw, 30px);
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 10px;
  letter-spacing: -0.02em;
`;

const FaqSubtitle = styled.p`
  font-size: 15.5px;
  color: ${C.muted};
  margin: 0;
  line-height: 1.65;
`;

const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 680px) { grid-template-columns: 1fr; }
`;

const FaqItem = styled.div`
  background: ${C.white};
  border: 1.5px solid ${C.border};
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.2s;

  ${({ $open }: { $open: boolean }) => $open && css`
    border-color: ${C.navy};
  `}
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

  svg { flex-shrink: 0; color: ${C.muted}; transition: color 0.18s; }
  &:hover svg { color: ${C.navy}; }
`;

const FaqAnswer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const FaqAnswerInner = styled.div`
  padding: 0 18px 18px;
  font-size: 14px;
  color: ${C.muted};
  line-height: 1.72;
  border-top: 1px solid ${C.border};
  padding-top: 14px;
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const CONTACT_INFO = [
  { icon: <Mail size={16} />,    label: 'Email Support',   value: 'support@ncees-exam.com' },
  { icon: <Phone size={16} />,   label: 'Phone',           value: '1-800-555-0199\nMon–Fri, 8am–6pm EST' },
  { icon: <MapPin size={16} />,  label: 'Mailing Address', value: '300 Venture Way\nHadley, MA 01035' },
  { icon: <Clock size={16} />,   label: 'Response Time',   value: 'Within 1–2 business days' },
];

const QUICK_OPTIONS = [
  { icon: <Mail size={16} />,        label: 'Email Us Directly',    sub: 'support@ncees-exam.com',  href: 'mailto:support@ncees-exam.com' },
  { icon: <MessageSquare size={16} />, label: 'Live Chat',           sub: 'Available 8am–6pm EST',  href: '#' },
  { icon: <FileText size={16} />,    label: 'Submit a Ticket',      sub: 'Track your request',      href: '#' },
];

const FAQS = [
  {
    q: 'How do I register for an exam?',
    a: 'Create a free account, then visit the Exams page to select your discipline and begin the registration process. You will need to provide your engineering credentials for verification.',
  },
  {
    q: 'How many times can I retake the exam?',
    a: 'You are limited to five attempts per certification exam. Each testing session counts as one attempt. Contact your educator preparation program for retake approval if applicable.',
  },
  {
    q: 'When will I receive my score report?',
    a: 'Score reports are typically available within 7–10 business days after your exam date. You will receive an email notification when your report is ready on your dashboard.',
  },
  {
    q: 'Can I reschedule my exam appointment?',
    a: 'Yes, you can reschedule up to 3 business days before your scheduled exam date through your dashboard. Rescheduling fees may apply depending on how close you are to the exam date.',
  },
  {
    q: 'Are alternative testing arrangements available?',
    a: 'Yes. Candidates who require accommodations can apply through the Alternative Testing Arrangements section. Allow extra time for approval — coordination with test centers may be required.',
  },
  {
    q: 'Is my practice exam data saved to my account?',
    a: 'Yes. All practice exam sessions are linked to your account. Your scores, progress, and study time are tracked and visible from your dashboard at any time.',
  },
];

const TOPICS = [
  'General Inquiry',
  'Exam Registration',
  'Technical Support',
  'Score Report',
  'Accommodations',
  'Account & Billing',
  'Other',
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const ContactPage: React.FC = () => {
  const [form, setForm]       = useState({ name: '', email: '', topic: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — replace with real API call
    await new Promise(res => setTimeout(res, 1600));
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      <FontLoader />
      <Page>

        {/* ── HERO ── */}
        <PageHero>
          <HeroCircleA />
          <HeroCircleB />
          <HeroInner>
            <HeroBadge><span />We're Here to Help</HeroBadge>
            <HeroTitle>Contact Us</HeroTitle>
            <HeroSubtitle>
              Have a question about your exam, application, or account?
              Reach out and our team will respond within one business day.
            </HeroSubtitle>
          </HeroInner>
        </PageHero>

        {/* ── BODY ── */}
        <Body>
          <BodyGrid>

            {/* FORM */}
            <FormCard>
              {sent ? (
                <SuccessBanner>
                  <SuccessIcon><CheckCircle size={30} /></SuccessIcon>
                  <SuccessTitle>Message Sent!</SuccessTitle>
                  <SuccessBody>
                    Thank you for reaching out. Our support team will get back to you at{' '}
                    <strong>{form.email}</strong> within 1–2 business days.
                  </SuccessBody>
                  <ResetBtn onClick={() => { setSent(false); setForm({ name: '', email: '', topic: '', message: '' }); }}>
                    <MessageSquare size={14} />
                    Send Another Message
                  </ResetBtn>
                </SuccessBanner>
              ) : (
                <>
                  <FormTitle>Send a Message</FormTitle>
                  <FormSubtitle>Fill out the form below and we'll get back to you as soon as possible.</FormSubtitle>

                  <form onSubmit={handleSubmit} noValidate>
                    <FieldRow>
                      <Field>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Field>
                      <Field>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Field>
                    </FieldRow>

                    <Field>
                      <Label htmlFor="topic">Topic</Label>
                      <Select
                        id="topic"
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        disabled={loading}
                        required
                      >
                        <option value="" disabled>Select a topic…</option>
                        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                      </Select>
                    </Field>

                    <Field>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Describe your question or issue in as much detail as possible…"
                        value={form.message}
                        onChange={handleChange}
                        disabled={loading}
                        required
                      />
                    </Field>

                    <SubmitBtn type="submit" disabled={loading || !form.name || !form.email || !form.topic || !form.message}>
                      {loading ? (
                        <><Spinner /> Sending…</>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </SubmitBtn>
                  </form>
                </>
              )}
            </FormCard>

            {/* SIDEBAR */}
            <Sidebar>
              <InfoCard>
                <InfoCardTitle>Contact Information</InfoCardTitle>
                <InfoItems>
                  {CONTACT_INFO.map(({ icon, label, value }) => (
                    <InfoItem key={label}>
                      <InfoIconBox>{icon}</InfoIconBox>
                      <InfoItemText>
                        <InfoItemLabel>{label}</InfoItemLabel>
                        <InfoItemValue style={{ whiteSpace: 'pre-line' }}>{value}</InfoItemValue>
                      </InfoItemText>
                    </InfoItem>
                  ))}
                </InfoItems>
              </InfoCard>

              <QuickCard>
                <QuickCardTitle>Other Ways to Reach Us</QuickCardTitle>
                <QuickOptions>
                  {QUICK_OPTIONS.map(({ icon, label, sub, href }) => (
                    <QuickOption key={label} href={href}>
                      <QuickOptionIcon>{icon}</QuickOptionIcon>
                      <QuickOptionText>
                        <QuickOptionLabel>{label}</QuickOptionLabel>
                        <QuickOptionSub>{sub}</QuickOptionSub>
                      </QuickOptionText>
                    </QuickOption>
                  ))}
                </QuickOptions>
              </QuickCard>
            </Sidebar>
          </BodyGrid>
        </Body>

        {/* ── FAQ ── */}
        <FaqSection>
          <FaqInner>
            <FaqHeader>
              <SectionLabel>Common Questions</SectionLabel>
              <FaqTitle>Frequently Asked Questions</FaqTitle>
              <FaqSubtitle>
                Find quick answers to the most common questions about exams, registration, and the platform.
              </FaqSubtitle>
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
          </FaqInner>
        </FaqSection>

      </Page>
    </>
  );
};

export default ContactPage;