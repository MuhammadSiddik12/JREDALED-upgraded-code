'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function DataPushPage() {
  const [rmsList, setRmsList] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const loadRMS = async () => {
    const res = await api.get('/rms');
    if (res.success) setRmsList(res.data);
  };

  useEffect(() => {
    loadRMS();
  }, []);

  const handleToggle = async (sno: number, currentPush: number) => {
    const newStatus = currentPush === 1 ? 2 : 1; // 1 = Push On, 2 = Push Off
    const res = await api.post('/rms/data-push', {
      SNo: sno,
      DataPush: newStatus,
    });
    if (res.success) {
      setMessage(res.message || 'Telemetry push updated');
      loadRMS();
    }
  };

  return (
    <LayoutWrapper pageTitle="Data Logs Automation Tool" breadcrumb={['Testing Tool', 'Data Push']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Automated Live Telemetry Streaming</h5>
        </div>

        {message && (
          <div className="alert alert-success m-15" style={{ margin: '15px 15px 0 15px' }}>
            {message}
          </div>
        )}

        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>Controller Serial</th>
                  <th style={{ color: '#FFF' }}>Location</th>
                  <th style={{ color: '#FFF' }}>Stream Status</th>
                  <th style={{ color: '#FFF' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rmsList.map((rms, idx) => (
                  <tr key={rms.SNo}>
                    <td>{idx + 1}</td>
                    <td><strong>{rms.IMEINo}</strong></td>
                    <td>{rms.ControllerSerialNo || '-'}</td>
                    <td>{rms.ControllerLocation || '-'}</td>
                    <td>
                      {rms.DataPush === 1 ? (
                        <span className="badge badge-success" style={{ backgroundColor: '#00D76B', padding: '5px 10px' }}>
                          Streaming Active
                        </span>
                      ) : (
                        <span className="badge badge-secondary" style={{ padding: '5px 10px' }}>
                          Streaming Paused
                        </span>
                      )}
                    </td>
                    <td>
                      {rms.DataPush === 1 ? (
                        <button
                          onClick={() => handleToggle(rms.SNo, 1)}
                          className="btn btn-danger btn-sm"
                          style={{ backgroundColor: '#FF5370', borderColor: '#FF5370' }}
                        >
                          Disable Push
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggle(rms.SNo, 2)}
                          className="btn btn-success btn-sm"
                          style={{ backgroundColor: '#00D76B', borderColor: '#00D76B' }}
                        >
                          Enable Push
                        </button>
                      )}
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
