'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function LatestLogsReportPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    async function loadLatest() {
      const res = await api.get('/reports/latest-logs');
      if (res.success) {
        setLogs(res.data);
      }
    }
    loadLatest();
    const interval = setInterval(loadLatest, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LayoutWrapper pageTitle="Real-Time Latest Telemetry Logs" breadcrumb={['Reports', 'Latest Logs']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>
            Live Ingest Stream (Auto-Refreshing every 5s)
          </h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>SIM ID</th>
                  <th style={{ color: '#FFF' }}>Power</th>
                  <th style={{ color: '#FFF' }}>Pump</th>
                  <th style={{ color: '#FFF' }}>Voltage</th>
                  <th style={{ color: '#FFF' }}>Current</th>
                  <th style={{ color: '#FFF' }}>Freq</th>
                  <th style={{ color: '#FFF' }}>Temp</th>
                  <th style={{ color: '#FFF' }}>Signal</th>
                  <th style={{ color: '#FFF' }}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center">Awaiting incoming telemetry frames...</td>
                  </tr>
                ) : (
                  logs.map((l, idx) => (
                    <tr key={l.SNo || idx}>
                      <td>{idx + 1}</td>
                      <td><strong>{l.IMEINo}</strong></td>
                      <td>{l.SIMId || '-'}</td>
                      <td>{l.PowerStatus === 1 ? 'ON' : 'OFF'}</td>
                      <td>{l.PumpStatus === 1 ? 'Running' : 'Stopped'}</td>
                      <td>{l.Voltage} V</td>
                      <td>{l.Current} A</td>
                      <td>{l.Frequency} Hz</td>
                      <td>{l.Temperature} °C</td>
                      <td>{l.GSMSignal}</td>
                      <td>{l.LogDateTime ? new Date(l.LogDateTime).toLocaleTimeString('en-IN') : '-'}</td>
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
