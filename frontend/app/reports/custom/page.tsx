'use client';

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function CustomReportPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [imei, setImei] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const loadReport = async () => {
    let url = '/reports/custom?';
    if (imei) url += `imei=${imei}&`;
    if (startDate) url += `startDate=${startDate}&`;
    if (endDate) url += `endDate=${endDate}&`;

    const res = await api.get(url);
    if (res.success) {
      setLogs(res.data);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const exportCSV = () => {
    if (logs.length === 0) return;
    const headers = ['S.No', 'IMEI No', 'Voltage', 'Current', 'Frequency', 'Temp', 'Signal', 'Log Date Time'];
    const rows = logs.map((l, i) => [
      i + 1,
      l.IMEINo,
      l.Voltage,
      l.Current,
      l.Frequency,
      l.Temperature,
      l.GSMSignal,
      l.LogDateTime,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CustomReport_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <LayoutWrapper pageTitle="Custom Telemetry Report" breadcrumb={['Reports', 'Custom Report']}>
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>Filter Telemetry & Performance Logs</h5>
        </div>
        <div className="card-block" style={{ padding: '15px' }}>
          <div className="row m-b-20" style={{ marginBottom: 20 }}>
            <div className="col-md-3">
              <label>IMEI Filter</label>
              <input
                type="text"
                className="form-control"
                placeholder="All IMEIs"
                value={imei}
                onChange={(e) => setImei(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-3" style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <button
                onClick={loadReport}
                className="btn btn-primary waves-effect waves-light"
                style={{ backgroundColor: '#006', borderColor: '#006' }}
              >
                Search
              </button>
              <button onClick={exportCSV} className="btn btn-success waves-effect waves-light">
                <i className="fa fa-download" style={{ marginRight: 5 }}></i> Export CSV
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>IMEI No</th>
                  <th style={{ color: '#FFF' }}>Voltage (V)</th>
                  <th style={{ color: '#FFF' }}>Current (A)</th>
                  <th style={{ color: '#FFF' }}>Frequency (Hz)</th>
                  <th style={{ color: '#FFF' }}>Temp (°C)</th>
                  <th style={{ color: '#FFF' }}>Signal</th>
                  <th style={{ color: '#FFF' }}>Log Date Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">No logs found</td>
                  </tr>
                ) : (
                  logs.map((l, idx) => (
                    <tr key={l.SNo || idx}>
                      <td>{idx + 1}</td>
                      <td><strong>{l.IMEINo}</strong></td>
                      <td>{l.Voltage}</td>
                      <td>{l.Current}</td>
                      <td>{l.Frequency}</td>
                      <td>{l.Temperature}</td>
                      <td>{l.GSMSignal}</td>
                      <td>{l.LogDateTime ? new Date(l.LogDateTime).toLocaleString('en-IN') : '-'}</td>
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
