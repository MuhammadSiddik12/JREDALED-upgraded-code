'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function UserLoginHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    async function loadHistory() {
      const res = await api.get('/users/login-history');
      if (res.success) {
        setHistory(res.data);
      }
    }
    loadHistory();
  }, []);

  return (
    <LayoutWrapper pageTitle="User Login History" breadcrumb={['CMS User', 'Login History']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>User Session & Security Audit Log</h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>User</th>
                  <th style={{ color: '#FFF' }}>IP Address</th>
                  <th style={{ color: '#FFF' }}>Platform Info (Browser / OS)</th>
                  <th style={{ color: '#FFF' }}>Login Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, idx) => (
                  <tr key={h.SNo}>
                    <td>{idx + 1}</td>
                    <td><strong>{h.userName}</strong></td>
                    <td>{h.AppIP || '-'}</td>
                    <td>{h.PlatformInfo ? h.PlatformInfo.split('$').join(' | ') : '-'}</td>
                    <td>{h.LoginTime ? new Date(h.LoginTime).toLocaleString('en-IN') : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
