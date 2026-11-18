'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function SIMStatusReportPage() {
  const [simList, setSimList] = useState<any[]>([]);

  useEffect(() => {
    async function loadSIM() {
      const res = await api.get('/reports/sim-status');
      if (res.success) {
        setSimList(res.data);
      }
    }
    loadSIM();
  }, []);

  return (
    <LayoutWrapper pageTitle="SIM Status & Subscription Validity" breadcrumb={['Reports', 'SIM Status']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>GPRS SIM Inventory & Renewal Status</h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>SIM ID</th>
                  <th style={{ color: '#FFF' }}>Telecom Provider</th>
                  <th style={{ color: '#FFF' }}>Activated Date</th>
                  <th style={{ color: '#FFF' }}>Expiration Date</th>
                  <th style={{ color: '#FFF' }}>Validity Status</th>
                </tr>
              </thead>
              <tbody>
                {simList.map((s, idx) => (
                  <tr key={s.SNo || idx}>
                    <td>{idx + 1}</td>
                    <td><strong>{s.IMEINo}</strong></td>
                    <td>{s.SIMId || '-'}</td>
                    <td>{s.SIMProvider || 'Airtel'}</td>
                    <td>{s.SIMActiveOn || '-'}</td>
                    <td>{s.SIMExpiredOn || '-'}</td>
                    <td>
                      <span className="badge badge-success" style={{ backgroundColor: '#00D76B', padding: '5px 10px' }}>
                        Active
                      </span>
                    </td>
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
