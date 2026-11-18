'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function AddRMSPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    DistId: '0',
    OrgId: '0',
    IMEINo: '',
    RMSMobileNo: '',
    ControllerSerialNo: '',
    ControllerLocation: '',
    ControllerModel: 'Proxys-4G',
    ControllerManufacturer: 'GEIE',
    Longitude: '85.3096',
    Latitude: '23.3441',
    MotorType: '1',
    PumpCategory: 'Submersible',
    PumpSetSerialNo: '',
    MotorHP: '3',
    MotorHeadSize: '50',
    FrequencyCutOff: '50',
    ProductType: '3',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const res = await api.post('/rms', formData);
    if (res.success) {
      setMessage('RMS Details Added Sucsessfully !');
      setTimeout(() => router.push('/rms'), 1500);
    } else {
      setError(res.message || 'Failed to add RMS controller');
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper pageTitle="Add RMS Controller" breadcrumb={['RMS', 'Add RMS']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Register New RMS Controller</h5>
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
                  placeholder="SIM Mobile number"
                />
              </div>

              <div className="col-md-6 form-group">
                <label>Controller Serial Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.ControllerSerialNo}
                  onChange={(e) => setFormData({ ...formData, ControllerSerialNo: e.target.value })}
                  placeholder="Controller serial"
                />
              </div>

              <div className="col-md-6 form-group">
                <label>Controller Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.ControllerLocation}
                  onChange={(e) => setFormData({ ...formData, ControllerLocation: e.target.value })}
                  placeholder="Installation village / site"
                />
              </div>

              <div className="col-md-3 form-group">
                <label>Latitude</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.Latitude}
                  onChange={(e) => setFormData({ ...formData, Latitude: e.target.value })}
                />
              </div>

              <div className="col-md-3 form-group">
                <label>Longitude</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.Longitude}
                  onChange={(e) => setFormData({ ...formData, Longitude: e.target.value })}
                />
              </div>

              <div className="col-md-3 form-group">
                <label>Motor HP</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.MotorHP}
                  onChange={(e) => setFormData({ ...formData, MotorHP: e.target.value })}
                />
              </div>

              <div className="col-md-3 form-group">
                <label>Frequency Cut Off (Hz)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.FrequencyCutOff}
                  onChange={(e) => setFormData({ ...formData, FrequencyCutOff: e.target.value })}
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
                  {loading ? 'Saving...' : 'Add RMS Controller'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
