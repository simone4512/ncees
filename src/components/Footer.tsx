import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Mail, Shield, BookOpen, Phone,
  MapPin, ArrowRight, ExternalLink
} from 'lucide-react';
import styled, { keyframes } from 'styled-components';

/* ─────────────────────────────────────────
   TOKENS
───────────────────────────────────────── */
const C = {
  navy: "#0d2b55",
  navyDark: "#091e3e",
  navyLight: "#1a3f72",
  accent: "#c0392b",
  white: "#ffffff",
  border: "rgba(255,255,255,0.08)",
  text: "rgba(255,255,255,0.82)",
  muted: "rgba(255,255,255,0.42)",
  faint: "rgba(255,255,255,0.06)",
};

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
   FOOTER WRAPPER
───────────────────────────────────────── */
const FooterEl = styled.footer`
  background: ${C.navyDark};
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;

  /* Subtle grid overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  /* Decorative circle */
  &::after {
    content: '';
    position: absolute;
    bottom: -120px;
    right: -120px;
    width: 380px; height: 380px;
    border-radius: 50%;
    border: 60px solid rgba(192,57,43,0.07);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 28px;
  position: relative;
  z-index: 1;
`;

/* ─────────────────────────────────────────
   TOP CTA STRIP
───────────────────────────────────────── */
const CtaStrip = styled.div`
  border-bottom: 1px solid ${C.border};
  padding: 36px 0;
`;

const CtaStripInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

const CtaStripText = styled.div``;

const CtaStripTitle = styled.p`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: ${C.white};
  margin: 0 0 4px;
`;

const CtaStripSub = styled.p`
  font-size: 13.5px;
  color: ${C.muted};
  margin: 0;
`;

const CtaStripBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: ${C.accent};
  border-radius: 7px;
  font-size: 14px;
  font-weight: 700;
  color: ${C.white};
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.2s, transform 0.15s;

  &:hover {
    background: #a93226;
    transform: translateY(-1px);
  }
`;

/* ─────────────────────────────────────────
   MAIN GRID
───────────────────────────────────────── */
const MainGrid = styled(Container)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.4fr;
  gap: 48px;
  padding-top: 56px;
  padding-bottom: 52px;

  @media (max-width: 900px) { grid-template-columns: 1fr 1fr; gap: 36px; }
  @media (max-width: 540px) { grid-template-columns: 1fr; gap: 32px; }
`;

/* ─────────────────────────────────────────
   BRAND COLUMN
───────────────────────────────────────── */
const BrandCol = styled.div``;

const BrandLogo = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-bottom: 16px;
`;

const BrandIcon = styled.div`
  width: 38px; height: 38px;
  border-radius: 9px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.white};
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandMain = styled.span`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 15px;
  font-weight: 700;
  color: ${C.white};
`;

const BrandSub = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${C.muted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const BrandDesc = styled.p`
  font-size: 13.5px;
  color: ${C.muted};
  line-height: 1.72;
  margin: 0 0 20px;
  max-width: 260px;
`;

const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${C.muted};
  text-decoration: none;
  transition: color 0.16s;

  svg { flex-shrink: 0; opacity: 0.6; }

  &:hover { color: ${C.white}; svg { opacity: 1; } }
`;

const ContactItemPlain = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${C.muted};

  svg { flex-shrink: 0; opacity: 0.6; }
`;

/* ─────────────────────────────────────────
   LINK COLUMN
───────────────────────────────────────── */
const LinkCol = styled.div``;

const ColTitle = styled.h4`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 13px;
  font-weight: 700;
  color: ${C.white};
  margin: 0 0 18px;
  letter-spacing: 0.01em;
`;

const NavLinks = styled.ul`
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  font-size: 13.5px;
  color: ${C.muted};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.16s, gap 0.16s;

  &::before {
    content: '';
    display: inline-block;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(192,57,43,0.5);
    flex-shrink: 0;
    transition: background 0.16s;
  }

  &:hover {
    color: ${C.white};
    gap: 8px;
    &::before { background: ${C.accent}; }
  }
`;

const ExternalNavLink = styled.a`
  font-size: 13.5px;
  color: ${C.muted};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.16s;

  &::before {
    content: '';
    display: inline-block;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(192,57,43,0.5);
    flex-shrink: 0;
    transition: background 0.16s;
  }

  &:hover {
    color: ${C.white};
    &::before { background: ${C.accent}; }
  }

  svg { opacity: 0.5; }
`;

/* ─────────────────────────────────────────
   DIVIDER
───────────────────────────────────────── */
const Divider = styled.div`
  height: 1px;
  background: ${C.border};
  margin: 0 28px;

  @media (max-width: 1216px) { margin: 0 28px; }
`;

/* ─────────────────────────────────────────
   BOTTOM BAR
───────────────────────────────────────── */
const BottomBar = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 22px;
  padding-bottom: 22px;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 640px) { flex-direction: column; align-items: flex-start; }
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${C.muted};

  svg { color: rgba(255,255,255,0.25); }
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const LegalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  color: ${C.muted};
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 5px;
  transition: color 0.16s, background 0.16s;

  &:hover {
    color: ${C.white};
    background: ${C.faint};
  }
`;

const LegalDot = styled.span`
  color: ${C.border};
  font-size: 16px;
  line-height: 1;
`;

/* ─────────────────────────────────────────
   DISCLAIMER
───────────────────────────────────────── */
const Disclaimer = styled.div`
  border-top: 1px solid ${C.border};
  padding: 16px 0 24px;
`;

const DisclaimerText = styled.p`
  font-size: 11.5px;
  color: rgba(255,255,255,0.22);
  text-align: center;
  margin: 0;
  line-height: 1.7;
  max-width: 680px;
  margin: 0 auto;
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Practice Exams', to: '/practice' },
  { label: 'Exam Specs', to: '/exams' },
  { label: 'Dashboard', to: '/dashboard' },
];

const SUPPORT_LINKS = [
  { label: 'Contact Us', to: '/contact' },
  { label: 'Help Center', href: '#' },
  { label: 'Status Page', href: '#' },
  { label: 'Feedback', href: '#' },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <FontLoader />
      <FooterEl>

        {/* CTA STRIP */}
        <CtaStrip>
          <CtaStripInner>
            <CtaStripText>
              <CtaStripTitle>Ready to start practicing?</CtaStripTitle>
              <CtaStripSub>Create a free account and take your first full-length exam today.</CtaStripSub>
            </CtaStripText>
            <CtaStripBtn to="/register">
              Get Started <ArrowRight size={15} />
            </CtaStripBtn>
          </CtaStripInner>
        </CtaStrip>

        {/* MAIN GRID */}
        <MainGrid>

          {/* Brand */}
          <BrandCol>
            <BrandLogo to="/">
              <BrandIcon><BookOpen size={19} /></BrandIcon>
              <BrandText>
                <BrandMain>NCEES Exam</BrandMain>
                <BrandSub>Certification Portal</BrandSub>
              </BrandText>
            </BrandLogo>
            <BrandDesc>
              Professional engineering exam preparation platform. Practice with realistic,
              timed CBT conditions and track your progress to exam day.
            </BrandDesc>
            <ContactItems>
              <ContactItem href="mailto:support@ncees-exam.com">
                <Mail size={14} />
                support@ncees-exam.com
              </ContactItem>
              <ContactItem href="tel:18005550199">
                <Phone size={14} />
                1-800-555-0199
              </ContactItem>
              <ContactItemPlain>
                <MapPin size={14} />
                300 Venture Way, Hadley MA 01035
              </ContactItemPlain>
            </ContactItems>
          </BrandCol>

          {/* Quick Links */}
          <LinkCol>
            <ColTitle>Platform</ColTitle>
            <NavLinks>
              {QUICK_LINKS.map(({ label, to }) => (
                <NavItem key={label}>
                  <NavLink to={to}>{label}</NavLink>
                </NavItem>
              ))}
            </NavLinks>
          </LinkCol>

          {/* Support */}
          <LinkCol>
            <ColTitle>Support</ColTitle>
            <NavLinks>
              {SUPPORT_LINKS.map(({ label, to, href }) => (
                <NavItem key={label}>
                  {to ? (
                    <NavLink to={to}>{label}</NavLink>
                  ) : (
                    <ExternalNavLink href={href}>
                      {label}
                    </ExternalNavLink>
                  )}
                </NavItem>
              ))}
            </NavLinks>
          </LinkCol>

          {/* Hours */}
          <LinkCol>
            <ColTitle>Office Hours</ColTitle>
            <NavLinks>
              {[
                { day: 'Monday – Friday', hours: '8:00 am – 6:00 pm EST' },
                { day: 'Saturday', hours: '9:00 am – 1:00 pm EST' },
                { day: 'Sunday', hours: 'Closed' },
              ].map(({ day, hours }) => (
                <NavItem key={day}>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>
                    <span style={{ display: 'block', fontWeight: 600, color: 'rgba(255,255,255,0.68)', marginBottom: 1 }}>{day}</span>
                    {hours}
                  </div>
                </NavItem>
              ))}
            </NavLinks>
          </LinkCol>

        </MainGrid>

        <Divider />

        {/* BOTTOM BAR */}
        <BottomBar>
          <Copyright>
            <BookOpen size={15} />
            © {year} NCEES Exam Portal. All rights reserved.
          </Copyright>

          <LegalLinks>
            <LegalLink href="#">
              <Shield size={13} /> Privacy Policy
            </LegalLink>
            <LegalDot>·</LegalDot>
            <LegalLink href="#">Terms of Service</LegalLink>
            <LegalDot>·</LegalDot>
            <LegalLink href="#">
              <Heart size={13} /> Accessibility
            </LegalLink>
          </LegalLinks>
        </BottomBar>

        {/* DISCLAIMER */}
        <Disclaimer>
          <Container>
            <DisclaimerText>
              This is an independent exam preparation platform and is not affiliated with
              or endorsed by NCEES. NCEES® is a registered trademark. All content is provided
              for educational purposes only.
            </DisclaimerText>
          </Container>
        </Disclaimer>

      </FooterEl>
    </>
  );
};

export default Footer;