import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useT } from '../lib/i18n';
import {
  LayoutDashboard, Users, MapPin, FileText, Wallet, Clock, LogOut, Sparkles,
} from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();
  const { t, lang, setLang } = useT();
  const navigate = useNavigate();

  const NAV = [
    { to: '/dashboard', icon: LayoutDashboard, label: t.nav.dashboard },
    { to: '/clients',   icon: Users,           label: t.nav.clients },
    { to: '/visits',    icon: MapPin,          label: t.nav.visits },
    { to: '/invoices',  icon: FileText,        label: t.nav.invoices },
    { to: '/cash',      icon: Wallet,          label: t.nav.cash },
    { to: '/timelog',   icon: Clock,           label: t.nav.timelog },
    { to: '/ai',        icon: Sparkles,        label: lang === 'es' ? 'Asistente IA' : 'AI Assistant' },
  ];

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A192F' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, minHeight: '100vh', background: '#112240',
        display: 'flex', flexDirection: 'column',
        borderRight: '1px solid #1a2f50', flexShrink: 0,
      }}>
        {/* Logo + lang toggle */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid #1a2f50' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#FF8C00' }}>
                OmniPulse
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#8892B0', marginTop: 2 }}>
                OPS v2.0
              </div>
            </div>
            {/* Language toggle */}
            <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
              {(['en','es'] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: '2px 7px', borderRadius: 4, border: 'none',
                  fontSize: 10, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  background: lang === l ? '#FF8C00' : '#1a2f50',
                  color: lang === l ? '#0A192F' : '#8892B0',
                }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 20px', margin: '2px 8px', borderRadius: 8,
              textDecoration: 'none', fontSize: 14,
              fontFamily: 'DM Sans, sans-serif', fontWeight: isActive ? 600 : 400,
              color: isActive ? '#FF8C00' : '#8892B0',
              background: isActive ? 'rgba(255,140,0,0.1)' : 'transparent',
              transition: 'all 0.15s',
            })}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1a2f50' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#FF8C00', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#0A192F',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              {user?.initials || '?'}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#E8F0FE' }}>{user?.name}</div>
              <div style={{ fontSize: 10, color: '#8892B0', fontFamily: 'JetBrains Mono, monospace' }}>
                {user?.role}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 6, border: 'none',
            background: 'rgba(255,71,87,0.1)', color: '#FF4757',
            cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif',
          }}>
            <LogOut size={14} /> {t.nav.logout}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px', maxWidth: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
}
