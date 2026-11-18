'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function AllocateDistributorPage() {
  const [distributors, setDistributors] = useState<any[]>([]);
  const [rmsList, setRmsList] = useState<any[]>([]);
  const [selectedDistId, setSelectedDistId] = useState('');
  const [selectedIMEIs, setSelectedIMEIs] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      const distRes = await api.get('/distributors');
      if (distRes.success) setDistributors(distRes.data);

      const rmsRes = await api.get('/rms');
      if (rmsRes.success) setRmsList(rmsRes.data);
    }
    loadData();
  }, []);

  const handleToggle = (imei: string) => {
    if (selectedIMEIs.includes(imei)) {
      setSelectedIMEIs(selectedIMEIs.filter((x) => x !== imei));
    } else {
      setSelectedIMEIs([...selectedIMEIs, imei]);
    }
  };

  const handleAllocate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDistId) {
      setError('Please select a distributor');
      return;
    }
    if (selectedIMEIs.length === 0) {
      setError('Please select at least one RMS IMEI unit');
      return;
    }

    const res = await api.post('/distributors/allocate', {
      DistId: selectedDistId,
      IMEINos: selectedIMEIs,
    });

    if (res.success) {
      setMessage('Distributor Allocated Sucsessfully !');
      setError('');
    } else {
      setError(res.message || 'Allocation failed');
    }
  };

  return (
    <LayoutWrapper pageTitle="Allocate Distributor" breadcrumb={['Distributor', 'Allocate Distributor']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Allocate RMS Units to Distributor</h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleAllocate}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Select Distributor *</label>
              <div className="col-sm-6">
                <select
                  required
                  className="form-control"
                  value={selectedDistId}
                  onChange={(e) => setSelectedDistId(e.target.value)}
                >
                  <option value="">-- Choose Distributor --</option>
                  {distributors.map((d) => (
                    <option key={d.DistId} value={d.DistId}>
                      {d.DistName} (ID: {d.DistId})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Select RMS IMEIs</label>
              <div className="col-sm-10">
                <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #CCC', padding: 10 }}>
                  {rmsList.map((rms) => (
                    <div key={rms.IMEINo} className="form-check" style={{ marginBottom: 5 }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`check-${rms.IMEINo}`}
                        checked={selectedIMEIs.includes(rms.IMEINo)}
                        onChange={() => handleToggle(rms.IMEINo)}
                      />
                      <label className="form-check-label" htmlFor={`check-${rms.IMEINo}`}>
                        IMEI: {rms.IMEINo} - Serial: {rms.ControllerSerialNo || 'N/A'} (Location: {rms.ControllerLocation || 'N/A'})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10 offset-sm-2">
                <button
                  type="submit"
                  className="btn btn-primary waves-effect waves-light"
                  style={{ backgroundColor: '#006', borderColor: '#006' }}
                >
                  Allocate Distributor
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
