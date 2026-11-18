'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function AddDistributorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    DistName: '',
    DistEmail: '',
    DistMobile: '',
    DistAddress: '',
    LoginId: '',
    UPassword: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const res = await api.post('/distributors', formData);
    if (res.success) {
      setMessage('Distributor Details Added Sucsessfully !');
      setTimeout(() => router.push('/distributors'), 1500);
    } else {
      setError(res.message || 'Failed to add distributor');
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper pageTitle="Add Distributor" breadcrumb={['Distributor', 'Add Distributor']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Create New Distributor</h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Distributor Name *</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.DistName}
                  onChange={(e) => setFormData({ ...formData, DistName: e.target.value })}
                  placeholder="Enter distributor name"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Email Address</label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  value={formData.DistEmail}
                  onChange={(e) => setFormData({ ...formData, DistEmail: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Mobile Number</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={formData.DistMobile}
                  onChange={(e) => setFormData({ ...formData, DistMobile: e.target.value })}
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Address</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows={3}
                  value={formData.DistAddress}
                  onChange={(e) => setFormData({ ...formData, DistAddress: e.target.value })}
                  placeholder="Enter physical address"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Login User ID *</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.LoginId}
                  onChange={(e) => setFormData({ ...formData, LoginId: e.target.value })}
                  placeholder="Enter unique login ID"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Password *</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  required
                  className="form-control"
                  value={formData.UPassword}
                  onChange={(e) => setFormData({ ...formData, UPassword: e.target.value })}
                  placeholder="Enter secure password"
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10 offset-sm-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary waves-effect waves-light"
                  style={{ backgroundColor: '#006', borderColor: '#006' }}
                >
                  {loading ? 'Saving...' : 'Add Distributor'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
