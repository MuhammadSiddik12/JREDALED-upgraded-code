'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { api } from '../lib/api';

interface LayoutWrapperProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadcrumb?: string[];
}

export default function LayoutWrapper({ children, pageTitle, breadcrumb }: LayoutWrapperProps) {
  const [userName, setUserName] = useState('System Administrator');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const res = await api.get('/auth/me');
      if (res.success && res.user?.Name) {
        setUserName(res.user.Name);
      }
    }
    loadUser();
  }, []);

  return (
    <div
      id="pcoded"
      className="pcoded"
      {...({
        'theme-layout': 'vertical',
        'vertical-placement': 'left',
        'vertical-layout': 'wide',
        'pcoded-device-type': 'desktop',
        'vertical-nav-type': sidebarCollapsed ? 'collapsed' : 'expanded',
        'vertical-effect': 'shrink',
        'vnavigation-view': 'view1',
        'nav-type': 'st2',
        'fream-type': 'theme1',
        'layout-type': 'light',
      } as any)}
    >
      <div className="pcoded-overlay-box"></div>
      <div className="pcoded-container navbar-wrapper">
        <Navbar userName={userName} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="pcoded-main-container" style={{ margin: 0 }}>
          <div className="pcoded-wrapper">
            <Sidebar collapsed={sidebarCollapsed} />
            <div className="pcoded-content">
              <div className="pcoded-inner-content">
                <div className="main-body">
                  <div className="page-wrapper" style={{ padding: '15px 20px' }}>
                    {pageTitle && (
                      <div className="page-header" style={{ marginBottom: 15, padding: 0, background: 'transparent', boxShadow: 'none' }}>
                        <div className="page-block" style={{ padding: 0 }}>
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="page-header-title">
                                <h5 className="m-b-10" style={{ color: '#006', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>
                                  {pageTitle}
                                </h5>
                              </div>
                            </div>
                            {breadcrumb && (
                              <div className="col-md-4">
                                <ul className="breadcrumb-title" style={{ float: 'right', margin: 0, padding: 0, listStyle: 'none' }}>
                                  <li className="breadcrumb-item" style={{ display: 'inline-block', marginRight: '5px' }}>
                                    <a href="/dashboard" style={{ color: '#666' }}>
                                      <i className="fa fa-home"></i>
                                    </a>
                                  </li>
                                  {breadcrumb.map((b, i) => (
                                    <li key={i} className="breadcrumb-item" style={{ display: 'inline-block' }}>
                                      <span style={{ color: '#999', margin: '0 5px' }}>/</span>
                                      <span style={{ color: '#333', fontSize: '13px' }}>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="page-body">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
