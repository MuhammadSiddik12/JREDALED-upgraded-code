'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function AllocateHubPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [hubId, setHubId] = useState('1');
  const [selectedIMEIs, setSelectedIMEIs] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      const res = await api.get('/inventory');
      if (res.success) setInventory(res.data);
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
    if (selectedIMEIs.length === 0) {
      setError('Please select at least one unit');
      return;
    }

    const res = await api.post('/inventory/allocate-hub', {
      HubId: hubId,
      IMEINos: selectedIMEIs,
    });

    if (res.success) {
      setMessage('Hub Allocated Sucsessfully !');
      setError('');
    } else {
      setError(res.message || 'Allocation failed');
    }
  };

  return (
    <LayoutWrapper pageTitle="Allocate Hub" breadcrumb={['Inventory', 'Allocate Hub']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Assign Warehouse Hub to Inventory</h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleAllocate}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Hub ID / Warehouse *</label>
              <div className="col-sm-6">
                <select className="form-control" value={hubId} onChange={(e) => setHubId(e.target.value)}>
                  <option value="1">Central Warehouse Ranchi (Hub 1)</option>
                  <option value="2">North Chotanagpur Hub (Hub 2)</option>
                  <option value="3">Santhal Pargana Hub (Hub 3)</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Select Units</label>
              <div className="col-sm-10">
                <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #CCC', padding: 10 }}>
                  {inventory.map((item) => (
                    <div key={item.IMEINo} className="form-check" style={{ marginBottom: 5 }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`check-${item.IMEINo}`}
                        checked={selectedIMEIs.includes(item.IMEINo)}
                        onChange={() => handleToggle(item.IMEINo)}
                      />
                      <label className="form-check-label" htmlFor={`check-${item.IMEINo}`}>
                        IMEI: {item.IMEINo} | Controller Serial: {item.ControllerSerialNo || 'N/A'} (Current Hub: {item.HubId})
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
                  Allocate Hub
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
