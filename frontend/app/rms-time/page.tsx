'use client';

import React, { useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function RMSTimePage() {
  const [imeiNo, setImeiNo] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const res = await api.post('/rms/reset-time', { IMEINo: imeiNo });
    if (res.success) {
      setMessage(res.message || `IMEI No ${imeiNo} Logs Time Reset Sucsessfully !`);
      setImeiNo('');
    } else {
      setError(res.message || 'IMEI No Not Exsist !');
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper pageTitle="Reset RMS Log Time" breadcrumb={['Testing Tool', 'Reset RMS Time']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Reset Device Cloud Delay & Logging Window</h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleReset} className="row">
            <div className="col-md-6 form-group">
              <label>Target IMEI Number *</label>
              <input
                type="text"
                required
                className="form-control"
                value={imeiNo}
                onChange={(e) => setImeiNo(e.target.value)}
                placeholder="Enter 15-digit IMEI"
              />
            </div>
            <div className="col-md-4 form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary waves-effect waves-light"
                style={{ backgroundColor: '#006', borderColor: '#006', width: '100%' }}
              >
                {loading ? 'Resetting...' : 'Reset RMS Log Time'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
