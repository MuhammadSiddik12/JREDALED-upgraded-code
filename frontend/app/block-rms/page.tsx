'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function BlockRMSPage() {
  const [rmsList, setRmsList] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const loadRMS = async () => {
    const res = await api.get('/rms');
    if (res.success) setRmsList(res.data);
  };

  useEffect(() => {
    loadRMS();
  }, []);

  const handleBlockToggle = async (sno: number, currentBlock: number) => {
    const newStatus = currentBlock === 1 ? 2 : 1; // 1 = Block, 2 = Unblock
    const res = await api.post('/rms/block', {
      SNo: sno,
      RMSBlock: newStatus,
    });
    if (res.success) {
      setMessage(res.message || 'Updated block status');
      loadRMS();
    }
  };

  return (
    <LayoutWrapper pageTitle="Block / Unblock RMS" breadcrumb={['RMS', 'Block RMS']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Device Authorization & Field Lockdown</h5>
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
                  <th style={{ color: '#FFF' }}>Serial No</th>
                  <th style={{ color: '#FFF' }}>Location</th>
                  <th style={{ color: '#FFF' }}>Status</th>
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
                      {rms.RMSBlock === 1 ? (
                        <span className="badge badge-danger" style={{ backgroundColor: '#FF5370', padding: '5px 10px' }}>
                          Blocked
                        </span>
                      ) : (
                        <span className="badge badge-success" style={{ backgroundColor: '#00D76B', padding: '5px 10px' }}>
                          Unblocked (Active)
                        </span>
                      )}
                    </td>
                    <td>
                      {rms.RMSBlock === 1 ? (
                        <button
                          onClick={() => handleBlockToggle(rms.SNo, 1)}
                          className="btn btn-success btn-sm"
                          style={{ backgroundColor: '#00D76B', borderColor: '#00D76B' }}
                        >
                          <i className="fa fa-unlock"></i> Unblock Device
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockToggle(rms.SNo, 2)}
                          className="btn btn-danger btn-sm"
                          style={{ backgroundColor: '#FF5370', borderColor: '#FF5370' }}
                        >
                          <i className="fa fa-lock"></i> Block Device
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
