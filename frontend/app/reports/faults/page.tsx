'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function FaultReportPage() {
  const [faults, setFaults] = useState<any[]>([]);

  useEffect(() => {
    async function loadFaults() {
      const res = await api.get('/reports/faults');
      if (res.success) {
        setFaults(res.data);
      }
    }
    loadFaults();
  }, []);

  return (
    <LayoutWrapper pageTitle="Fault Diagnostic Report" breadcrumb={['Reports', 'Fault Report']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>System Hardware & Electrical Fault Logs</h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>Fault ID</th>
                  <th style={{ color: '#FFF' }}>Light / Controller ID</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>Fault Code</th>
                  <th style={{ color: '#FFF' }}>Fault Description</th>
                  <th style={{ color: '#FFF' }}>Logged Date</th>
                </tr>
              </thead>
              <tbody>
                {faults.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">No active hardware faults reported</td>
                  </tr>
                ) : (
                  faults.map((f) => (
                    <tr key={f.FaultId}>
                      <td>{f.FaultId}</td>
                      <td>{f.LightId}</td>
                      <td><strong>{f.IMEINo || '-'}</strong></td>
                      <td>
                        <span className="badge badge-danger" style={{ backgroundColor: '#FF5370', padding: '4px 8px' }}>
                          {f.FaultCode || 'ERR'}
                        </span>
                      </td>
                      <td>{f.FaultDesc || 'Hardware Fault / Communication Timeout'}</td>
                      <td>{f.LoggedDate ? new Date(f.LoggedDate).toLocaleString('en-IN') : '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
