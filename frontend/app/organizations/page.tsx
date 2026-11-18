'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function ManageOrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const loadOrgs = async () => {
    const res = await api.get('/organizations');
    if (res.success) {
      setOrganizations(res.data);
    }
  };

  useEffect(() => {
    loadOrgs();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this organization?')) {
      const res = await api.delete(`/organizations/${id}`);
      if (res.success) {
        setMessage(res.message || 'Organization deleted successfully');
        loadOrgs();
      }
    }
  };

  return (
    <LayoutWrapper pageTitle="Manage Organizations" breadcrumb={['Organizations', 'Manage Organizations']}>
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Registered Organizations</h5>
          <Link href="/organizations/add" className="btn btn-primary btn-sm waves-effect waves-light" style={{ backgroundColor: '#006', borderColor: '#006' }}>
            <i className="fa fa-plus" style={{ marginRight: 5 }}></i> Add Organization
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
                  <th style={{ color: '#FFF' }}>Org ID</th>
                  <th style={{ color: '#FFF' }}>Organization Name</th>
                  <th style={{ color: '#FFF' }}>State</th>
                  <th style={{ color: '#FFF' }}>Mobile No</th>
                  <th style={{ color: '#FFF' }}>Email</th>
                  <th style={{ color: '#FFF' }}>Address</th>
                  <th style={{ color: '#FFF' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {organizations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">No organizations found</td>
                  </tr>
                ) : (
                  organizations.map((o) => (
                    <tr key={o.OrgId}>
                      <td>{o.OrgId}</td>
                      <td><strong>{o.OrgName}</strong></td>
                      <td>{o.OrgState || 'Jharkhand'}</td>
                      <td>{o.OrgMobile || '-'}</td>
                      <td>{o.OrgEmail || '-'}</td>
                      <td>{o.OrgAddress || '-'}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(o.OrgId)}
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
