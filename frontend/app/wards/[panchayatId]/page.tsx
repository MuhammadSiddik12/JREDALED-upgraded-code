'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function WardsPage({ params }: { params: { panchayatId: string } }) {
  const [districtName, setDistrictName] = useState('');
  const [blockName, setBlockName] = useState('');
  const [panchayatName, setPanchayatName] = useState('Panchayat');
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    async function loadWards() {
      const res = await api.get(`/geo/wards?panchayatId=${params.panchayatId}`);
      if (res.success) {
        setDistrictName(res.districtName);
        setBlockName(res.blockName);
        setPanchayatName(res.panchayatName);
        setWards(res.data);
      }
    }
    loadWards();
  }, [params.panchayatId]);

  return (
    <LayoutWrapper
      pageTitle={`:: ${panchayatName} - Wards ::`}
      breadcrumb={['Dashboard', `${blockName}`, `${panchayatName} Wards`]}
    >
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>
            {districtName} &gt; {blockName} &gt; {panchayatName} - Wards
          </h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>Ward No</th>
                  <th style={{ color: '#FFF' }}>Total Luminaries</th>
                  <th style={{ color: '#FFF' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {wards.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">No wards registered for this panchayat</td>
                  </tr>
                ) : (
                  wards.map((w, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <strong>Ward {w.wardNo}</strong>
                      </td>
                      <td>{w.lightsCount}</td>
                      <td>
                        <Link
                          href={`/lights?panchayatId=${params.panchayatId}&wardNo=${w.wardNo}`}
                          className="btn btn-primary btn-sm waves-effect waves-light"
                          style={{ backgroundColor: '#164286', borderColor: '#164286' }}
                        >
                          View Luminaries <i className="ti-arrow-right" style={{ marginLeft: 5 }}></i>
                        </Link>
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
