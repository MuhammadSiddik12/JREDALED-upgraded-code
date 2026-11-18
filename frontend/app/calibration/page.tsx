'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function RMSCalibrationPage() {
  const [formData, setFormData] = useState({
    MorningStartTime: '06:00:00',
    MorningStopTime: '10:00:00',
    EveningStartTime: '16:00:00',
    EveningStopTime: '19:00:00',
    VoltageValue: '220',
    CurrentValue: '10',
    FrequencyValue: '50',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCalibration() {
      const res = await api.get('/calibration');
      if (res.success && res.data) {
        setFormData({
          MorningStartTime: res.data.MorningStartTime || '06:00:00',
          MorningStopTime: res.data.MorningStopTime || '10:00:00',
          EveningStartTime: res.data.EveningStartTime || '16:00:00',
          EveningStopTime: res.data.EveningStopTime || '19:00:00',
          VoltageValue: res.data.VoltageValue || '220',
          CurrentValue: res.data.CurrentValue || '10',
          FrequencyValue: res.data.FrequencyValue || '50',
        });
      }
    }
    loadCalibration();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await api.post('/calibration', formData);
    if (res.success) {
      setMessage('RMS Calibration Updated Sucsessfully !');
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper pageTitle="RMS Calibration Settings" breadcrumb={['RMS', 'Calibration']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Configure Operating Windows & Threshold Limits</h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label>Morning Start Time (HH:MM:SS)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.MorningStartTime}
                  onChange={(e) => setFormData({ ...formData, MorningStartTime: e.target.value })}
                />
              </div>

              <div className="col-md-6 form-group">
                <label>Morning Stop Time (HH:MM:SS)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.MorningStopTime}
                  onChange={(e) => setFormData({ ...formData, MorningStopTime: e.target.value })}
                />
              </div>

              <div className="col-md-6 form-group">
                <label>Evening Start Time (HH:MM:SS)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.EveningStartTime}
                  onChange={(e) => setFormData({ ...formData, EveningStartTime: e.target.value })}
                />
              </div>

              <div className="col-md-6 form-group">
                <label>Evening Stop Time (HH:MM:SS)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.EveningStopTime}
                  onChange={(e) => setFormData({ ...formData, EveningStopTime: e.target.value })}
                />
              </div>

              <div className="col-md-4 form-group">
                <label>Voltage Threshold (V)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.VoltageValue}
                  onChange={(e) => setFormData({ ...formData, VoltageValue: e.target.value })}
                />
              </div>

              <div className="col-md-4 form-group">
                <label>Current Threshold (A)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.CurrentValue}
                  onChange={(e) => setFormData({ ...formData, CurrentValue: e.target.value })}
                />
              </div>

              <div className="col-md-4 form-group">
                <label>Frequency Threshold (Hz)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.FrequencyValue}
                  onChange={(e) => setFormData({ ...formData, FrequencyValue: e.target.value })}
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
                  {loading ? 'Saving...' : 'Update RMS Calibration'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
