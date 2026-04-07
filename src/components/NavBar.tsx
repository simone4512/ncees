import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, LogOut, User, ChevronDown, Menu, X, Phone } from "lucide-react";
import styled, { css, keyframes } from "styled-components";

/* ─────────────────────────────────────────
   TOKENS
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
  link: "#1a4a8a",
};

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* ─────────────────────────────────────────
   TOP UTILITY BAR
───────────────────────────────────────── */
const UtilityBar = styled.div`
  background: ${C.navyDark};
  border-bottom: 1px solid ${C.navyLight};
`;

const UtilityInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 36px;
  gap: 0;
`;

const UtilityLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255,255,255,0.72);
  font-size: 12px;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  padding: 0 14px;
  height: 100%;
  border-left: 1px solid rgba(255,255,255,0.1);
  transition: color 0.18s, background 0.18s;

  &:first-child { border-left: none; }

  &:hover {
    color: ${C.white};
    background: rgba(255,255,255,0.07);
  }

  svg { opacity: 0.8; }
`;

/* ─────────────────────────────────────────
   MAIN NAV WRAPPER
───────────────────────────────────────── */
const NavWrapper = styled.nav`
  background: ${C.white};
  box-shadow: 0 2px 12px rgba(13,43,85,0.10);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

/* ─────────────────────────────────────────
   LOGO
───────────────────────────────────────── */
const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
`;

const LogoIcon = styled.div`
  width: 38px;
  height: 38px;
  background: ${C.navy};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.white};
  transition: background 0.2s;

  ${LogoLink}:hover & { background: ${C.navyLight}; }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.15;
`;

const LogoMain = styled.span`
  font-family: 'Merriweather', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: ${C.navy};
  letter-spacing: -0.01em;
`;

const LogoSub = styled.span`
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  color: ${C.muted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

/* ─────────────────────────────────────────
   DESKTOP NAV LINKS
───────────────────────────────────────── */
const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 2px;

  @media (max-width: 900px) { display: none; }
`;

const NavLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 14px;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${C.text};
  text-decoration: none;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: color 0.18s;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 14px;
    right: 14px;
    height: 3px;
    background: ${C.accent};
    border-radius: 3px 3px 0 0;
    transform: scaleX(0);
    transition: transform 0.22s ease;
  }

  &:hover {
    color: ${C.navy};
    &::after { transform: scaleX(1); }
  }

  ${({ $active }) => $active && css`
    color: ${C.navy};
    &::after { transform: scaleX(1); }
  `}
`;

/* ─────────────────────────────────────────
   AUTH SECTION
───────────────────────────────────────── */
const AuthGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  padding-left: 16px;
  border-left: 1px solid ${C.border};

  @media (max-width: 900px) { display: none; }
`;

const UserChip = styled(Link)`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: 6px;
  background: ${C.offWhite};
  border: 1px solid ${C.border};
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${C.navy};
  text-decoration: none;
  transition: background 0.18s, border-color 0.18s;
  max-width: 180px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: #e8edf5;
    border-color: #b8c5d9;
  }
`;

const BtnOutline = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 6px;
  border: 1.5px solid ${C.navy};
  background: transparent;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${C.navy};
  text-decoration: none;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;

  &:hover {
    background: ${C.navy};
    color: ${C.white};
  }
`;

const BtnPrimary = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 18px;
  border-radius: 6px;
  background: ${C.accent};
  border: 1.5px solid ${C.accent};
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: ${C.white};
  text-decoration: none;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: background 0.18s, border-color 0.18s, transform 0.1s;

  &:hover {
    background: ${C.accentHov};
    border-color: ${C.accentHov};
    transform: translateY(-1px);
  }
  &:active { transform: translateY(0); }
`;

const BtnLogout = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 6px;
  border: 1.5px solid ${C.border};
  background: transparent;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${C.muted};
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border-color 0.18s;

  &:hover {
    background: #fef2f2;
    color: ${C.accent};
    border-color: ${C.accent};
  }
`;

/* ─────────────────────────────────────────
   HAMBURGER BUTTON
───────────────────────────────────────── */
const HamburgerBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1.5px solid ${C.border};
  background: transparent;
  color: ${C.navy};
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s;

  &:hover {
    background: ${C.offWhite};
    border-color: ${C.navyLight};
  }

  @media (max-width: 900px) { display: flex; }
`;

/* ─────────────────────────────────────────
   MOBILE DRAWER
───────────────────────────────────────── */
const MobileDrawer = styled.div`
  display: none;
  flex-direction: column;
  background: ${C.white};
  border-top: 1px solid ${C.border};
  animation: ${slideDown} 0.22s ease;
  padding-bottom: 8px;

  @media (max-width: 900px) {
    ${({ $open }) => $open ? 'display: flex;' : 'display: none;'}
  }
`;

const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 13px 24px;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${C.text};
  text-decoration: none;
  border-left: 3px solid transparent;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    background: ${C.offWhite};
    color: ${C.navy};
    border-left-color: ${C.accent};
  }

  ${({ $active }) => $active && css`
    color: ${C.navy};
    border-left-color: ${C.accent};
    background: #f0f4f9;
  `}
`;

const MobileDivider = styled.div`
  height: 1px;
  background: ${C.border};
  margin: 8px 24px;
`;

const MobileAuthRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 24px 6px;
`;

const MobilePrimary = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border-radius: 6px;
  background: ${C.accent};
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: ${C.white};
  text-decoration: none;
`;

const MobileOutline = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border-radius: 6px;
  border: 1.5px solid ${C.navy};
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${C.navy};
  text-decoration: none;
`;

const MobileLogout = styled.button`
  width: calc(100% - 48px);
  margin: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border-radius: 6px;
  border: 1.5px solid ${C.border};
  background: transparent;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${C.muted};
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    background: #fef2f2;
    color: ${C.accent};
    border-color: ${C.accent};
  }
`;

const MobileUserLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${C.muted};
  letter-spacing: 0.01em;

  span {
    font-size: 14px;
    color: ${C.navy};
    font-weight: 700;
  }
`;

/* ─────────────────────────────────────────
   GOOGLE FONTS INJECTION
───────────────────────────────────────── */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=Source+Sans+3:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

/* ─────────────────────────────────────────
   NAV ITEMS
───────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Exams", to: "/exams" },
  { label: "Practice", to: "/practice" },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Navbar({ user, handleLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <FontLoader />

      {/* ── Utility Bar ── */}
      <UtilityBar>
        <UtilityInner>
          <UtilityLink to="/contact">
            <Phone size={12} />
            Contact Us
          </UtilityLink>
          {user ? (
            <UtilityLink to="/dashboard">
              <User size={12} />
              My Account
            </UtilityLink>
          ) : (
            <UtilityLink to="/login">
              <User size={12} />
              Sign In
            </UtilityLink>
          )}
        </UtilityInner>
      </UtilityBar>

      {/* ── Main Nav ── */}
      <NavWrapper>
        <NavInner>

          {/* Logo */}
          <LogoLink to="/">
            <LogoIcon>
              <BookOpen size={20} />
            </LogoIcon>
            <LogoText>
              <LogoMain>NCEES Exam</LogoMain>
              <LogoSub>Certification Portal</LogoSub>
            </LogoText>
          </LogoLink>

          {/* Desktop Links */}
          <DesktopLinks>
            {NAV_ITEMS.map(({ label, to }) => (
              <NavLink key={to} to={to} $active={pathname === to}>
                {label}
              </NavLink>
            ))}

            {/* Auth */}
            <AuthGroup>
              {user ? (
                <>
                  <UserChip to="/dashboard">
                    <User size={14} />
                    <span>{user.email}</span>
                  </UserChip>
                  <BtnLogout onClick={handleLogout}>
                    <LogOut size={14} />
                    Logout
                  </BtnLogout>
                </>
              ) : (
                <>
                  <BtnOutline to="/login">Login</BtnOutline>
                  <BtnPrimary to="/register">Register</BtnPrimary>
                </>
              )}
            </AuthGroup>
          </DesktopLinks>

          {/* Hamburger */}
          <HamburgerBtn
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </HamburgerBtn>

        </NavInner>

        {/* Mobile Drawer */}
        <MobileDrawer $open={mobileOpen}>
          {NAV_ITEMS.map(({ label, to }) => (
            <MobileLink key={to} to={to} $active={pathname === to}>
              {label}
            </MobileLink>
          ))}

          <MobileDivider />

          {user ? (
            <>
              <MobileUserLabel>
                <User size={15} />
                Signed in as <span>{user.email}</span>
              </MobileUserLabel>
              <MobileLink to="/dashboard" $active={pathname === "/dashboard"}>
                Dashboard
              </MobileLink>
              <MobileDivider />
              <MobileLogout onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </MobileLogout>
            </>
          ) : (
            <MobileAuthRow>
              <MobileOutline to="/login">Login</MobileOutline>
              <MobilePrimary to="/register">Register</MobilePrimary>
            </MobileAuthRow>
          )}
        </MobileDrawer>

      </NavWrapper>
    </>
  );
}