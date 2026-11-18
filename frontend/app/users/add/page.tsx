'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function AddUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Name: '',
    UserId: '',
    UPassword: '',
    MobileNo: '',
    AppUserType: '0',
    UserType: '3',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const res = await api.post('/users', formData);
    if (res.success) {
      setMessage('User Details Added Sucsessfully !');
      setTimeout(() => router.push('/users'), 1500);
    } else {
      setError(res.message || 'Failed to create user');
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper pageTitle="Add CMS User" breadcrumb={['CMS User', 'Add User']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Register New User Profile</h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Full Name *</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.Name}
                  onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">User ID *</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.UserId}
                  onChange={(e) => setFormData({ ...formData, UserId: e.target.value })}
                  placeholder="Enter login username"
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
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Mobile Number</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={formData.MobileNo}
                  onChange={(e) => setFormData({ ...formData, MobileNo: e.target.value })}
                  placeholder="Enter mobile number"
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
                  {loading ? 'Saving...' : 'Add User'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
