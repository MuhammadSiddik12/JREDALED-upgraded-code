'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function AddInventoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    HubId: '1',
    IMEINo: '',
    RMSMobileNo: '',
    SIMId: '',
    SIMProvider: 'Airtel',
    SIMActiveOn: '',
    SIMExpiredOn: '',
    ControllerSerialNo: '',
    ControllerModel: '',
    MotorType: '1',
    PumpCategory: 'Submersible',
    PumpSetSerialNo: '',
    MotorHP: '3',
    MotorHeadSize: '50',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const res = await api.post('/inventory', formData);
    if (res.success) {
      setMessage('RMS Inventory Details Added Sucsessfully !');
      setTimeout(() => router.push('/inventory'), 1500);
    } else {
      setError(res.message || 'Failed to add inventory');
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper pageTitle="Add Inventory" breadcrumb={['Inventory', 'Add Inventory']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Register Inventory Unit</h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label>IMEI Number *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.IMEINo}
                  onChange={(e) => setFormData({ ...formData, IMEINo: e.target.value })}
                  placeholder="15-digit IMEI"
                />
              </div>

              <div className="col-md-6 form-group">
                <label>RMS Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.RMSMobileNo}
                  onChange={(e) => setFormData({ ...formData, RMSMobileNo: e.target.value })}
                  placeholder="Mobile number"
                />
              </div>

              <div className="col-md-6 form-group">
                <label>SIM ID (ICCID)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.SIMId}
                  onChange={(e) => setFormData({ ...formData, SIMId: e.target.value })}
                  placeholder="SIM ID"
                />
              </div>

              <div className="col-md-6 form-group">
                <label>SIM Provider</label>
                <select
                  className="form-control"
                  value={formData.SIMProvider}
                  onChange={(e) => setFormData({ ...formData, SIMProvider: e.target.value })}
                >
                  <option value="Airtel">Airtel</option>
                  <option value="Jio">Jio</option>
                  <option value="Vodafone">Vodafone</option>
                  <option value="BSNL">BSNL</option>
                </select>
              </div>

              <div className="col-md-6 form-group">
                <label>Controller Serial No</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.ControllerSerialNo}
                  onChange={(e) => setFormData({ ...formData, ControllerSerialNo: e.target.value })}
                  placeholder="Serial number"
                />
              </div>

              <div className="col-md-6 form-group">
                <label>Pump Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.PumpCategory}
                  onChange={(e) => setFormData({ ...formData, PumpCategory: e.target.value })}
                  placeholder="e.g. Submersible / Surface"
                />
              </div>

              <div className="col-md-6 form-group">
                <label>Motor HP</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.MotorHP}
                  onChange={(e) => setFormData({ ...formData, MotorHP: e.target.value })}
                  placeholder="HP rating (e.g. 3, 5)"
                />
              </div>

              <div className="col-md-6 form-group">
                <label>Motor Head Size (Meters)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.MotorHeadSize}
                  onChange={(e) => setFormData({ ...formData, MotorHeadSize: e.target.value })}
                  placeholder="Head size (e.g. 50, 70)"
                />
              </div>
            </div>

            <div className="row m-t-20">
              <div className="col-md-12">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary waves-effect waves-light"
                  style={{ backgroundColor: '#006', borderColor: '#006' }}
                >
                  {loading ? 'Saving...' : 'Add Inventory'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
