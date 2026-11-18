'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function ManageCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const loadCustomers = async () => {
    const res = await api.get('/customers');
    if (res.success) {
      setCustomers(res.data);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      const res = await api.delete(`/customers/${id}`);
      if (res.success) {
        setMessage(res.message || 'Customer deleted successfully');
        loadCustomers();
      }
    }
  };

  return (
    <LayoutWrapper pageTitle="Manage Customers" breadcrumb={['Customer', 'Manage Customers']}>
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Registered Customers</h5>
          <Link href="/customers/add" className="btn btn-primary btn-sm waves-effect waves-light" style={{ backgroundColor: '#006', borderColor: '#006' }}>
            <i className="fa fa-plus" style={{ marginRight: 5 }}></i> Add Customer
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
                  <th style={{ color: '#FFF' }}>Cust ID</th>
                  <th style={{ color: '#FFF' }}>Customer Name</th>
                  <th style={{ color: '#FFF' }}>Login ID</th>
                  <th style={{ color: '#FFF' }}>Mobile No</th>
                  <th style={{ color: '#FFF' }}>Email</th>
                  <th style={{ color: '#FFF' }}>Address</th>
                  <th style={{ color: '#FFF' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">No customers found</td>
                  </tr>
                ) : (
                  customers.map((c) => (
                    <tr key={c.CustId}>
                      <td>{c.CustId}</td>
                      <td><strong>{c.CustName}</strong></td>
                      <td>{c.LoginId}</td>
                      <td>{c.CustMobile || '-'}</td>
                      <td>{c.CustEmail || '-'}</td>
                      <td>{c.CustAddress || '-'}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(c.CustId)}
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
