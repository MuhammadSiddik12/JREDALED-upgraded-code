'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function OnOffPumpPage() {
  const [rmsList, setRmsList] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const loadRMS = async () => {
    const res = await api.get('/rms');
    if (res.success) {
      setRmsList(res.data);
    }
  };

  useEffect(() => {
    loadRMS();
  }, []);

  const handleCommand = async (sno: number, cmd: number) => {
    const res = await api.post('/rms/pump-command', {
      SNo: sno,
      PumpCommand: cmd,
    });
    if (res.success) {
      setMessage(res.message || 'Command executed successfully !');
      loadRMS();
    }
  };

  return (
    <LayoutWrapper pageTitle="On Off Pump Remote Control" breadcrumb={['RMS', 'On Off Pump']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Remote Pump Command Management</h5>
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
                  <th style={{ color: '#FFF' }}>Current Pump Status</th>
                  <th style={{ color: '#FFF' }}>Remote Command</th>
                </tr>
              </thead>
              <tbody>
                {rmsList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">No pumps available</td>
                  </tr>
                ) : (
                  rmsList.map((rms, idx) => (
                    <tr key={rms.SNo}>
                      <td>{idx + 1}</td>
                      <td><strong>{rms.IMEINo}</strong></td>
                      <td>{rms.ControllerSerialNo || '-'}</td>
                      <td>{rms.ControllerLocation || '-'}</td>
                      <td>
                        {rms.PumpStatus === 1 ? (
                          <span className="badge badge-success" style={{ backgroundColor: '#00D76B', padding: '5px 10px' }}>
                            <i className="fa fa-play"></i> Running (ON)
                          </span>
                        ) : (
                          <span className="badge badge-secondary" style={{ padding: '5px 10px' }}>
                            <i className="fa fa-stop"></i> Stopped (OFF)
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleCommand(rms.SNo, 1)}
                          className="btn btn-success btn-sm"
                          style={{ marginRight: 8, backgroundColor: '#00D76B', borderColor: '#00D76B' }}
                        >
                          <i className="fa fa-play"></i> Turn ON
                        </button>
                        <button
                          onClick={() => handleCommand(rms.SNo, 2)}
                          className="btn btn-danger btn-sm"
                          style={{ backgroundColor: '#FF5370', borderColor: '#FF5370' }}
                        >
                          <i className="fa fa-stop"></i> Turn OFF
                        </button>
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
