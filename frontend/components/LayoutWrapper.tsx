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
    <div id="pcoded" className="pcoded">
      <div className="pcoded-overlay-box"></div>
      <div className="pcoded-container navbar-wrapper">
        <Navbar userName={userName} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="pcoded-main-container" style={{ margin: 0 }}>
          <div className="pcoded-wrapper">
            <Sidebar collapsed={sidebarCollapsed} />
            <div className="pcoded-content">
              <div className="pcoded-inner-content">
                <div className="main-body">
                  <div className="page-wrapper">
                    {pageTitle && (
                      <div className="page-header" style={{ marginBottom: 15 }}>
                        <div className="page-block">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="page-header-title">
                                <h5 className="m-b-10" style={{ color: '#006', fontWeight: 'bold' }}>
                                  {pageTitle}
                                </h5>
                              </div>
                            </div>
                            {breadcrumb && (
                              <div className="col-md-4">
                                <ul className="breadcrumb-title" style={{ float: 'right' }}>
                                  <li className="breadcrumb-item">
                                    <a href="/dashboard">
                                      <i className="fa fa-home"></i>
                                    </a>
                                  </li>
                                  {breadcrumb.map((b, i) => (
                                    <li key={i} className="breadcrumb-item">
                                      <span>{b}</span>
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
