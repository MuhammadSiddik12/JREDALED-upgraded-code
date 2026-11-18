'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function AddOrganizationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    OrgName: '',
    OrgEmail: '',
    OrgMobile: '',
    OrgAddress: '',
    OrgState: 'Jharkhand',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const res = await api.post('/organizations', formData);
    if (res.success) {
      setMessage('Organization Details Added Sucsessfully !');
      setTimeout(() => router.push('/organizations'), 1500);
    } else {
      setError(res.message || 'Failed to add organization');
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper pageTitle="Add Organization" breadcrumb={['Organizations', 'Add Organization']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Create New Organization</h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Organization Name *</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.OrgName}
                  onChange={(e) => setFormData({ ...formData, OrgName: e.target.value })}
                  placeholder="Enter organization name"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Email Address</label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  value={formData.OrgEmail}
                  onChange={(e) => setFormData({ ...formData, OrgEmail: e.target.value })}
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
                  value={formData.OrgMobile}
                  onChange={(e) => setFormData({ ...formData, OrgMobile: e.target.value })}
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">State</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={formData.OrgState}
                  onChange={(e) => setFormData({ ...formData, OrgState: e.target.value })}
                  placeholder="State name"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Address</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows={3}
                  value={formData.OrgAddress}
                  onChange={(e) => setFormData({ ...formData, OrgAddress: e.target.value })}
                  placeholder="Physical office address"
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
                  {loading ? 'Saving...' : 'Add Organization'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
