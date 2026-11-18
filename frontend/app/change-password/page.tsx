'use client';

import React, { useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function ChangePasswordPage() {
  const [pwd1, setPwd1] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (pwd1 !== pwd2) {
      setError('Password is not same !');
      setLoading(false);
      return;
    }

    const res = await api.post('/auth/change-password', { pwd1, pwd2 });
    if (res.success) {
      setMessage('Password Changed Sucsessfully !');
      setPwd1('');
      setPwd2('');
    } else {
      setError(res.message || 'Failed to change password');
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper pageTitle="Change Password" breadcrumb={['Settings', 'Change Password']}>
      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Update Account Password</h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password *</label>
              <input
                type="password"
                required
                className="form-control"
                value={pwd1}
                onChange={(e) => setPwd1(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                required
                className="form-control"
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
                placeholder="Re-enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary waves-effect waves-light"
              style={{ backgroundColor: '#006', borderColor: '#006', marginTop: 10 }}
            >
              {loading ? 'Updating...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
