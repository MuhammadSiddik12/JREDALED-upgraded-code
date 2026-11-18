'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function OnOffReportPage() {
  const [cycles, setCycles] = useState<any[]>([]);

  useEffect(() => {
    async function loadCycles() {
      const res = await api.get('/reports/on-off');
      if (res.success) {
        setCycles(res.data);
      }
    }
    loadCycles();
  }, []);

  return (
    <LayoutWrapper pageTitle="On Off Runtime Cycles Report" breadcrumb={['Reports', 'On Off Report']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Operating On/Off Run Cycle Logs</h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>Pump On Time</th>
                  <th style={{ color: '#FFF' }}>Pump Off Time</th>
                  <th style={{ color: '#FFF' }}>Cycle Status</th>
                </tr>
              </thead>
              <tbody>
                {cycles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">No runtime cycles recorded</td>
                  </tr>
                ) : (
                  cycles.map((c, idx) => (
                    <tr key={c.SNo || idx}>
                      <td>{idx + 1}</td>
                      <td><strong>{c.IMEINo}</strong></td>
                      <td>{c.PumpOnTime ? new Date(c.PumpOnTime).toLocaleString('en-IN') : '-'}</td>
                      <td>{c.PumpOffTime ? new Date(c.PumpOffTime).toLocaleString('en-IN') : '-'}</td>
                      <td>
                        <span className="badge badge-success" style={{ backgroundColor: '#00D76B', padding: '4px 8px' }}>
                          Completed
                        </span>
                      </td>
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
