'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function ManageRMSPage() {
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

  const handleDelete = async (id: number, imei: string) => {
    if (confirm(`Are you sure you want to delete ${imei} RMS device?`)) {
      const res = await api.delete(`/rms/${id}`);
      if (res.success) {
        setMessage(res.message || 'RMS device deleted successfully');
        loadRMS();
      }
    }
  };

  return (
    <LayoutWrapper pageTitle="Manage RMS / Controller" breadcrumb={['RMS', 'Manage RMS']}>
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Registered RMS Controller Pumps</h5>
          <Link href="/rms/add" className="btn btn-primary btn-sm waves-effect waves-light" style={{ backgroundColor: '#006', borderColor: '#006' }}>
            <i className="fa fa-plus" style={{ marginRight: 5 }}></i> Add RMS
          </Link>
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
                  <th style={{ color: '#FFF' }}>Model</th>
                  <th style={{ color: '#FFF' }}>Location</th>
                  <th style={{ color: '#FFF' }}>Pump Status</th>
                  <th style={{ color: '#FFF' }}>Block Status</th>
                  <th style={{ color: '#FFF' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rmsList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">No RMS controllers found</td>
                  </tr>
                ) : (
                  rmsList.map((rms, idx) => (
                    <tr key={rms.SNo}>
                      <td>{idx + 1}</td>
                      <td><strong>{rms.IMEINo}</strong></td>
                      <td>{rms.ControllerSerialNo || '-'}</td>
                      <td>{rms.ControllerModel || '-'}</td>
                      <td>{rms.ControllerLocation || '-'}</td>
                      <td>
                        {rms.PumpStatus === 1 ? (
                          <span className="badge badge-success" style={{ backgroundColor: '#00D76B', padding: '4px 8px' }}>
                            ON
                          </span>
                        ) : (
                          <span className="badge badge-secondary" style={{ padding: '4px 8px' }}>
                            OFF
                          </span>
                        )}
                      </td>
                      <td>
                        {rms.RMSBlock === 1 ? (
                          <span className="badge badge-danger" style={{ backgroundColor: '#FF5370', padding: '4px 8px' }}>
                            Blocked
                          </span>
                        ) : (
                          <span className="badge badge-success" style={{ backgroundColor: '#00D76B', padding: '4px 8px' }}>
                            Active
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(rms.SNo, rms.IMEINo)}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '4px 8px' }}
                        >
                          <i className="fa fa-trash"></i>
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
