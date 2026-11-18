'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';

interface NavbarProps {
  userName?: string;
  onToggleSidebar?: () => void;
}

export default function Navbar({ userName = 'System User', onToggleSidebar }: NavbarProps) {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await api.post('/auth/logout');
    router.push('/');
  };

  return (
    <nav className="navbar header-navbar pcoded-header" style={{ background: '#FFF', margin: 0, padding: 0 }}>
      <div className="navbar-wrapper">
        <div className="navbar-logo">
          <a
            className="mobile-menu waves-effect waves-light"
            id="mobile-collapse"
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              if (onToggleSidebar) onToggleSidebar();
            }}
          >
            <i className="ti-menu" style={{ color: '#000' }}></i>
          </a>

          <Link href="/dashboard">
            <img className="img-fluid" src="/assets/images/GEIELogo.png" alt="GEIE" style={{ margin: '2px' }} />
          </Link>
          <a className="mobile-options waves-effect waves-light">
            <i className="ti-more"></i>
          </a>
        </div>

        <div className="navbar-container container-fluid">
          <ul className="nav-left">
            <li>
              <div className="sidebar_toggle">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onToggleSidebar) onToggleSidebar();
                  }}
                  style={{ color: '#000' }}
                >
                  <i className="ti-menu" style={{ color: '#000' }}></i>
                </a>
              </div>
            </li>
            <li>
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }}
                className="waves-effect waves-light"
                style={{ color: '#000' }}
              >
                <i className="ti-fullscreen"></i>
              </a>
            </li>
          </ul>
          <ul className="nav-right">
            <li className="header-notification">
              <a href="#!" className="waves-effect waves-light">
                <span style={{ color: '#006', fontSize: '18px', fontWeight: 'bold' }}>
                  Jharkhand Renewable Energy Development Agency (JREDA)
                </span>
              </a>
            </li>
            <li
              className={`user-profile header-notification ${profileOpen ? 'active' : ''}`}
              onClick={() => setProfileOpen(!profileOpen)}
              style={{ position: 'relative', cursor: 'pointer' }}
            >
              <a href="#!" className="waves-effect waves-light" onClick={(e) => e.preventDefault()}>
                <span style={{ color: '#000', fontSize: '12px', fontStyle: 'normal', fontWeight: 200 }}>
                  Welcome, {userName}
                </span>
                <i className="ti-angle-down" style={{ marginLeft: 5 }}></i>
              </a>
              {profileOpen && (
                <ul
                  className="show-notification profile-notification"
                  style={{ display: 'block', position: 'absolute', right: 0, top: '100%', background: '#FFF' }}
                >
                  <li className="waves-effect waves-light" style={{ padding: '10px 15px' }}>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      <i className="fa fa-power-off" aria-hidden="true" style={{ marginRight: 8 }}></i> Logout
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
