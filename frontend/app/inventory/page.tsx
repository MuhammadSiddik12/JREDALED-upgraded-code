'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function ManageInventoryPage() {
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    async function loadInventory() {
      const res = await api.get('/inventory');
      if (res.success) {
        setInventory(res.data);
      }
    }
    loadInventory();
  }, []);

  return (
    <LayoutWrapper pageTitle="Manage Inventory" breadcrumb={['Inventory', 'Manage Inventory']}>
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Warehouse Inventory & Telemetry Units</h5>
          <Link href="/inventory/add" className="btn btn-primary btn-sm waves-effect waves-light" style={{ backgroundColor: '#006', borderColor: '#006' }}>
            <i className="fa fa-plus" style={{ marginRight: 5 }}></i> Add Inventory
          </Link>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>SIM ID</th>
                  <th style={{ color: '#FFF' }}>SIM Provider</th>
                  <th style={{ color: '#FFF' }}>Controller Serial</th>
                  <th style={{ color: '#FFF' }}>Pump Category</th>
                  <th style={{ color: '#FFF' }}>Motor HP</th>
                  <th style={{ color: '#FFF' }}>Active On</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">No inventory records found</td>
                  </tr>
                ) : (
                  inventory.map((item, idx) => (
                    <tr key={item.SNo}>
                      <td>{idx + 1}</td>
                      <td><strong>{item.IMEINo}</strong></td>
                      <td>{item.SIMId || '-'}</td>
                      <td>{item.SIMProvider || '-'}</td>
                      <td>{item.ControllerSerialNo || '-'}</td>
                      <td>{item.PumpCategory || '-'}</td>
                      <td>{item.MotorHP || '-'} HP</td>
                      <td>{item.SIMActiveOn || '-'}</td>
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
