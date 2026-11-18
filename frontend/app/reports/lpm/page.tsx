'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function LPMCalculationPage() {
  const [pumps, setPumps] = useState<any[]>([]);

  useEffect(() => {
    async function loadPumps() {
      const res = await api.get('/reports/lpm');
      if (res.success) {
        setPumps(res.data);
      }
    }
    loadPumps();
  }, []);

  const calculateLPM = (hpStr: string, headStr: string, freqStr: string) => {
    const hp = parseFloat(hpStr) || 3;
    const head = parseFloat(headStr) || 50;
    const freq = parseFloat(freqStr) || 50;
    // Standard solar pump hydraulic LPM calculation: (HP * 746 * 60 * (freq / 50)) / (head * 9.81 * 10)
    const factor = freq > 0 ? freq / 50 : 1;
    const lpm = (hp * 746 * 60 * factor) / (head * 9.81 * 10);
    return Math.round(lpm);
  };

  return (
    <LayoutWrapper pageTitle="LPM Water Discharge Calculation" breadcrumb={['Reports', 'LPM Calculation']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>
            Pump Discharge Rate (Litres Per Minute) & Hydraulic Performance
          </h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>Motor HP</th>
                  <th style={{ color: '#FFF' }}>Head Size (M)</th>
                  <th style={{ color: '#FFF' }}>Frequency (Hz)</th>
                  <th style={{ color: '#FFF' }}>Voltage (V)</th>
                  <th style={{ color: '#FFF' }}>Current (A)</th>
                  <th style={{ color: '#FFF' }}>Estimated LPM</th>
                </tr>
              </thead>
              <tbody>
                {pumps.map((p, idx) => {
                  const estLpm = calculateLPM(p.MotorHP, p.MotorHeadSize, p.Frequency);
                  return (
                    <tr key={p.SNo || idx}>
                      <td>{idx + 1}</td>
                      <td><strong>{p.IMEINo}</strong></td>
                      <td>{p.MotorHP || '3'} HP</td>
                      <td>{p.MotorHeadSize || '50'} M</td>
                      <td>{p.Frequency || '50'} Hz</td>
                      <td>{p.Voltage || '220'} V</td>
                      <td>{p.Current || '8.5'} A</td>
                      <td>
                        <span className="badge badge-success" style={{ backgroundColor: '#00D76B', padding: '6px 12px', fontSize: '13px' }}>
                          {estLpm} LPM
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
