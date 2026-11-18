'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function QRDataReportPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const res = await api.get('/reports/qr-data');
      if (res.success) {
        setData(res.data);
      }
    }
    loadData();
  }, []);

  return (
    <LayoutWrapper pageTitle="QR Data & GPS Asset Coordinates" breadcrumb={['Reports', 'QR Data']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>QR Coded Controllers & Asset GIS Locations</h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>Controller Serial</th>
                  <th style={{ color: '#FFF' }}>Model</th>
                  <th style={{ color: '#FFF' }}>Latitude</th>
                  <th style={{ color: '#FFF' }}>Longitude</th>
                  <th style={{ color: '#FFF' }}>Map Pin</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item.SNo || idx}>
                    <td>{idx + 1}</td>
                    <td><strong>{item.IMEINo}</strong></td>
                    <td>{item.ControllerSerialNo || '-'}</td>
                    <td>{item.ControllerModel || '-'}</td>
                    <td>{item.Latitude || '0.00'}</td>
                    <td>{item.Longitude || '0.00'}</td>
                    <td>
                      <a
                        href={`https://maps.google.com/?q=${item.Latitude},${item.Longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-info btn-sm"
                        style={{ padding: '4px 8px' }}
                      >
                        <i className="fa fa-map-marker"></i> View on Map
                      </a>
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
