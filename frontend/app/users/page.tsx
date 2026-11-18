'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await api.get('/users');
      if (res.success) {
        setUsers(res.data);
      }
    }
    loadUsers();
  }, []);

  return (
    <LayoutWrapper pageTitle="Manage CMS Users" breadcrumb={['CMS User', 'Manage Users']}>
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>System Users & Operators</h5>
          <Link href="/users/add" className="btn btn-primary btn-sm waves-effect waves-light" style={{ backgroundColor: '#006', borderColor: '#006' }}>
            <i className="fa fa-plus" style={{ marginRight: 5 }}></i> Add User
          </Link>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>User ID</th>
                  <th style={{ color: '#FFF' }}>Name</th>
                  <th style={{ color: '#FFF' }}>Mobile No</th>
                  <th style={{ color: '#FFF' }}>Role Type</th>
                  <th style={{ color: '#FFF' }}>Permissions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={u.Sno}>
                    <td>{idx + 1}</td>
                    <td><strong>{u.UserId}</strong></td>
                    <td>{u.Name || '-'}</td>
                    <td>{u.MobileNo || '-'}</td>
                    <td>
                      {u.UserType === 1 ? 'Administrator' : u.UserType === 2 ? 'Customer' : 'Staff Operator'}
                    </td>
                    <td>
                      <Link
                        href={`/users/access/${u.Sno}`}
                        className="btn btn-info btn-sm waves-effect waves-light"
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                      >
                        <i className="fa fa-key" style={{ marginRight: 4 }}></i> Access Rights
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
