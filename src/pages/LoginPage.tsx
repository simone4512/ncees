import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AlertCircle, Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight } from 'lucide-react';
import styled, { keyframes, css } from 'styled-components';

/* ─────────────────────────────────────────
   TOKENS — same system as Navbar
───────────────────────────────────────── */
const C = {
  navy: "#0d2b55",
  navyDark: "#091e3e",
  navyLight: "#1a3f72",
  accent: "#c0392b",
  accentHov: "#a93226",
  white: "#ffffff",
  offWhite: "#f5f7fa",
  border: "#dde3ed",
  text: "#1a2533",
  muted: "#5a6a80",
  inputBg: "#fcfdff",
  errorBg: "#fff5f5",
  errorBorder: "#fca5a5",
  errorText: "#b91c1c",
};

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/* ─────────────────────────────────────────
   LAYOUT
───────────────────────────────────────── */
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${C.offWhite};
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
`;

/* Left decorative panel */
const SidePanel = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 440px;
  flex-shrink: 0;
  background: ${C.navy};
  padding: 48px 52px;
  position: relative;
  overflow: hidden;

  @media (min-width: 960px) { display: flex; }

  /* Decorative geometric shapes */
  &::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    border: 48px solid rgba(255,255,255,0.04);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -120px;
    left: -60px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 64px solid rgba(255,255,255,0.04);
  }
`;

const SideLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  z-index: 1;
`;

const SideLogoIcon = styled.div`
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.white};
`;

const SideLogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideLogoMain = styled.span`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: ${C.white};
`;

const SideLogoSub = styled.span`
  font-size: 10.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SideContent = styled.div`
  z-index: 1;
  animation: ${fadeUp} 0.6s ease both;
  animation-delay: 0.2s;
`;

const SideHeading = styled.h2`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: ${C.white};
  line-height: 1.35;
  margin: 0 0 16px;
`;

const SideBody = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,0.62);
  line-height: 1.7;
  margin: 0;
`;

const SideFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 32px 0 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SideFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: rgba(255,255,255,0.78);
  font-weight: 500;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${C.accent};
    flex-shrink: 0;
  }
`;

const SideFooter = styled.div`
  z-index: 1;
  font-size: 12px;
  color: rgba(255,255,255,0.32);
`;

/* Right form panel */
const FormPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 440px;
  animation: ${fadeUp} 0.5s ease both;
`;

/* ─────────────────────────────────────────
   CARD HEADER
───────────────────────────────────────── */
const CardHeader = styled.div`
  margin-bottom: 32px;
`;

const MobileLogo = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-bottom: 28px;

  @media (min-width: 960px) { display: none; }
`;

const MobileLogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background: ${C.navy};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.white};
`;

const MobileLogoText = styled.span`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 16px;
  font-weight: 700;
  color: ${C.navy};
`;

const CardTitle = styled.h1`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 27px;
  font-weight: 700;
  color: ${C.text};
  margin: 0 0 8px;
  letter-spacing: -0.02em;
`;

const CardSubtitle = styled.p`
  font-size: 15px;
  color: ${C.muted};
  margin: 0;
`;

/* ─────────────────────────────────────────
   ERROR BANNER
───────────────────────────────────────── */
const ErrorBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  background: ${C.errorBg};
  border: 1px solid ${C.errorBorder};
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 13.5px;
  color: ${C.errorText};
  line-height: 1.5;
  animation: ${shake} 0.4s ease;

  svg { flex-shrink: 0; margin-top: 1px; }
`;

/* ─────────────────────────────────────────
   FORM ELEMENTS
───────────────────────────────────────── */
const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 20px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: ${C.text};
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  color: ${C.muted};
  display: flex;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 11px 14px 11px 42px;
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
    color: ${C.muted};
  }
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 13px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${C.muted};
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;

  &:hover { color: ${C.navy}; }
`;

const RowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13.5px;
`;

const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${C.muted};
  cursor: pointer;
  font-weight: 500;
  user-select: none;
`;

const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  accent-color: ${C.navy};
  cursor: pointer;
`;

const ForgotLink = styled.a`
  color: ${C.navyLight};
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s;

  &:hover { color: ${C.accent}; text-decoration: underline; }
`;

/* ─────────────────────────────────────────
   SUBMIT BUTTON
───────────────────────────────────────── */
const SubmitBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 24px;
  background: ${C.navy};
  border: none;
  border-radius: 8px;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: ${C.white};
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.12s, box-shadow 0.2s;
  margin-top: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    background: ${C.navyLight};
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(13,43,85,0.25);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: ${C.white};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

/* ─────────────────────────────────────────
   DIVIDER
───────────────────────────────────────── */
const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  color: ${C.border};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #b0bac8;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${C.border};
  }
`;

/* ─────────────────────────────────────────
   DEMO BUTTON
───────────────────────────────────────── */
const DemoBtn = styled.button`
  width: 100%;
  padding: 11px 24px;
  background: transparent;
  border: 1.5px dashed ${C.border};
  border-radius: 8px;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: ${C.muted};
  cursor: pointer;
  transition: border-color 0.18s, color 0.18s, background 0.18s;

  span { color: ${C.navyLight}; }

  &:hover {
    border-color: ${C.navyLight};
    color: ${C.navy};
    background: #f0f4fa;
  }
`;

/* ─────────────────────────────────────────
   FOOTER LINK
───────────────────────────────────────── */
const FooterText = styled.p`
  text-align: center;
  margin: 24px 0 0;
  font-size: 14px;
  color: ${C.muted};
`;

const FooterLink = styled(Link)`
  color: ${C.accent};
  font-weight: 700;
  text-decoration: none;

  &:hover { text-decoration: underline; }
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
   COMPONENT
───────────────────────────────────────── */
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      const messages: Record<string, string> = {
        'auth/user-not-found': 'No account found with this email. Please register first.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-email': 'Invalid email address format.',
        'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
      };
      setError(messages[err.code] ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@example.com');
    setPassword('demo123456');
  };

  return (
    <>
      <FontLoader />
      <PageWrapper>

        {/* ── Left Panel ── */}
        <SidePanel>
          <SideLogo to="/">
            <SideLogoIcon><BookOpen size={22} /></SideLogoIcon>
            <SideLogoText>
              <SideLogoMain>NCEES Exam</SideLogoMain>
              <SideLogoSub>Certification Portal</SideLogoSub>
            </SideLogoText>
          </SideLogo>

          <SideContent>
            <SideHeading>Your certification journey starts here.</SideHeading>
            <SideBody>
              Access your exams, preparation materials, scores, and registration history — all in one place.
            </SideBody>
            <SideFeatures>
              <SideFeature>Track your exam registrations</SideFeature>
              <SideFeature>Access preparation materials</SideFeature>
              <SideFeature>View score reports instantly</SideFeature>
              <SideFeature>Manage your candidate profile</SideFeature>
            </SideFeatures>
          </SideContent>

          <SideFooter>
            © {new Date().getFullYear()} NCEES Exam Portal. All rights reserved.
          </SideFooter>
        </SidePanel>

        {/* ── Right Panel ── */}
        <FormPanel>
          <Card>
            <CardHeader>
              {/* Mobile logo (hidden on desktop where side panel shows) */}
              <MobileLogo to="/">
                <MobileLogoIcon><BookOpen size={18} /></MobileLogoIcon>
                <MobileLogoText>NCEES Exam</MobileLogoText>
              </MobileLogo>

              <CardTitle>Welcome back</CardTitle>
              <CardSubtitle>Sign in to your account to continue</CardSubtitle>
            </CardHeader>

            {error && (
              <ErrorBanner>
                <AlertCircle size={17} />
                {error}
              </ErrorBanner>
            )}

            <form onSubmit={handleLogin} noValidate>
              <FieldGroup>
                {/* Email */}
                <Field>
                  <Label htmlFor="email">Email Address</Label>
                  <InputWrapper>
                    <InputIcon><Mail size={16} /></InputIcon>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      disabled={loading}
                      autoComplete="email"
                    />
                  </InputWrapper>
                </Field>

                {/* Password */}
                <Field>
                  <Label htmlFor="password">Password</Label>
                  <InputWrapper>
                    <InputIcon><Lock size={16} /></InputIcon>
                    <Input
                      type={showPwd ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={loading}
                      autoComplete="current-password"
                      style={{ paddingRight: '44px' }}
                    />
                    <ToggleBtn
                      type="button"
                      onClick={() => setShowPwd((v) => !v)}
                      aria-label={showPwd ? 'Hide password' : 'Show password'}
                    >
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </ToggleBtn>
                  </InputWrapper>
                </Field>
              </FieldGroup>

              <RowBetween>
                <CheckLabel>
                  <Checkbox type="checkbox" />
                  Remember me
                </CheckLabel>
                <ForgotLink href="#">Forgot password?</ForgotLink>
              </RowBetween>

              <SubmitBtn type="submit" disabled={loading}>
                {loading ? (
                  <><Spinner /> Signing in…</>
                ) : (
                  <>Sign In <ArrowRight size={16} /></>
                )}
              </SubmitBtn>
            </form>

            <Divider>or</Divider>

            <DemoBtn type="button" onClick={handleDemoLogin}>
              Fill demo credentials —{' '}
              <span>demo@example.com</span>
            </DemoBtn>

            <FooterText>
              Don't have an account?{' '}
              <FooterLink to="/register">Create one →</FooterLink>
            </FooterText>
          </Card>
        </FormPanel>

      </PageWrapper>
    </>
  );
};

export default LoginPage;