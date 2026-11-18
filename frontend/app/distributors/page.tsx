'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function ManageDistributorsPage() {
  const [distributors, setDistributors] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const loadDistributors = async () => {
    const res = await api.get('/distributors');
    if (res.success) {
      setDistributors(res.data);
    }
  };

  useEffect(() => {
    loadDistributors();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this distributor?')) {
      const res = await api.delete(`/distributors/${id}`);
      if (res.success) {
        setMessage(res.message || 'Distributor deleted successfully');
        loadDistributors();
      }
    }
  };

  return (
    <LayoutWrapper pageTitle="Manage Distributors" breadcrumb={['Distributor', 'Manage Distributors']}>
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Registered Distributors</h5>
          <Link href="/distributors/add" className="btn btn-primary btn-sm waves-effect waves-light" style={{ backgroundColor: '#006', borderColor: '#006' }}>
            <i className="fa fa-plus" style={{ marginRight: 5 }}></i> Add Distributor
          </Link>
        </div>

        {message && (
          <div className="alert alert-success m-15" style={{ margin: '15px 15px 0 15px' }}>
            {message}
          </div>
        )}

        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>Dist ID</th>
                  <th style={{ color: '#FFF' }}>Distributor Name</th>
                  <th style={{ color: '#FFF' }}>Login ID</th>
                  <th style={{ color: '#FFF' }}>Mobile No</th>
                  <th style={{ color: '#FFF' }}>Email</th>
                  <th style={{ color: '#FFF' }}>Address</th>
                  <th style={{ color: '#FFF' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {distributors.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">No distributors found</td>
                  </tr>
                ) : (
                  distributors.map((d) => (
                    <tr key={d.DistId}>
                      <td>{d.DistId}</td>
                      <td><strong>{d.DistName}</strong></td>
                      <td>{d.LoginId}</td>
                      <td>{d.DistMobile || '-'}</td>
                      <td>{d.DistEmail || '-'}</td>
                      <td>{d.DistAddress || '-'}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(d.DistId)}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '4px 8px' }}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
