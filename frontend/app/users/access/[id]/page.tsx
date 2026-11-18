'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../../components/LayoutWrapper';
import { api } from '../../../../lib/api';

const GROUP_TITLES: Record<string, string> = {
  '1': 'Dashboard',
  '2': 'Distributors',
  '3': 'Customers',
  '7': 'Organizations',
  '8': 'Inventory',
  '4': 'RMS / Controller / Pump',
  '9': 'Testing Tool',
  '5': 'CMS Users',
  '6': 'Reports',
};

export default function AccessLevelPage({ params }: { params: { id: string } }) {
  const [categorizedMenus, setCategorizedMenus] = useState<Record<string, any[]>>({});
  const [accessMap, setAccessMap] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAccess() {
      const res = await api.get(`/users/${params.id}/access`);
      if (res.success && res.data) {
        setCategorizedMenus(res.data);
        const map: Record<string, boolean> = {};
        for (const items of Object.values(res.data) as any[][]) {
          for (const item of items) {
            map[item.menuId] = item.hasAccess;
          }
        }
        setAccessMap(map);
      }
    }
    loadAccess();
  }, [params.id]);

  const handleToggle = (menuId: number) => {
    setAccessMap((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await api.post(`/users/${params.id}/access`, { accessMap });
    if (res.success) {
      setMessage('Access rights updated successfully !');
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper pageTitle="User Access Level Permissions" breadcrumb={['CMS User', 'Access Level']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>
            Configure Granular Role Permissions
          </h5>
        </div>
        <div className="card-block" style={{ padding: '20px' }}>
          {message && <div className="alert alert-success">{message}</div>}

          <form onSubmit={handleSave}>
            {Object.entries(GROUP_TITLES).map(([groupId, groupTitle]) => {
              const menus = categorizedMenus[groupId] || [];
              if (menus.length === 0) return null;

              return (
                <div key={groupId} style={{ marginBottom: 25 }}>
                  <div
                    style={{
                      background: '#164286',
                      color: '#FFF',
                      padding: '8px 12px',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {groupTitle}
                  </div>
                  <table className="table table-bordered table-sm" style={{ marginBottom: 0 }}>
                    <tbody>
                      {menus.map((m, idx) => (
                        <tr key={m.menuId}>
                          <td width="60%" style={{ fontSize: '13px' }}>
                            {idx + 1}. &nbsp;{m.menuName}
                          </td>
                          <td width="40%">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`check-${m.menuId}`}
                                checked={!!accessMap[m.menuId]}
                                onChange={() => handleToggle(m.menuId)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`check-${m.menuId}`}
                                style={{ fontSize: '13px', color: '#4C0002', cursor: 'pointer' }}
                              >
                                Enable Access
                              </label>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}

            <div className="row">
              <div className="col-12">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary waves-effect waves-light"
                  style={{ backgroundColor: '#006', borderColor: '#006', padding: '10px 25px' }}
                >
                  {loading ? 'Saving...' : 'Save Permissions'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
