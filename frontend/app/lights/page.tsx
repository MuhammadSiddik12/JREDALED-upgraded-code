'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

export default function LightsPage() {
  const [lights, setLights] = useState<any[]>([]);

  useEffect(() => {
    async function loadLights() {
      const res = await api.get('/geo/lights');
      if (res.success) {
        setLights(res.data);
      }
    }
    loadLights();
  }, []);

  return (
    <LayoutWrapper pageTitle="Smart Solar Street Lights Status" breadcrumb={['Dashboard', 'Luminaries']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>
            Luminaries Inventory & Live Status
          </h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>Light ID</th>
                  <th style={{ color: '#FFF' }}>Pole No</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>Ward No</th>
                  <th style={{ color: '#FFF' }}>Status</th>
                  <th style={{ color: '#FFF' }}>Battery State</th>
                  <th style={{ color: '#FFF' }}>Energy Saved (kWh)</th>
                </tr>
              </thead>
              <tbody>
                {lights.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">No luminaries found</td>
                  </tr>
                ) : (
                  lights.map((l) => (
                    <tr key={l.LightId}>
                      <td>{l.LightId}</td>
                      <td>{l.PoleNo || '-'}</td>
                      <td>{l.IMEINo || '-'}</td>
                      <td>Ward {l.WardNo}</td>
                      <td>
                        {l.FaultStatus === 0 ? (
                          <span className="badge badge-success" style={{ backgroundColor: '#00D76B', padding: '5px 10px' }}>
                            Healthy
                          </span>
                        ) : (
                          <span className="badge badge-danger" style={{ backgroundColor: '#FF5370', padding: '5px 10px' }}>
                            Faulty
                          </span>
                        )}
                      </td>
                      <td>
                        {l.BatStateCharge === 1 ? (
                          <span className="text-success"><i className="fa fa-battery-full"></i> Normal</span>
                        ) : (
                          <span className="text-danger"><i className="fa fa-battery-empty"></i> Discharged</span>
                        )}
                      </td>
                      <td>{l.EnergyKWH || '0.00'}</td>
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
