'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function PanchayatsPage({ params }: { params: { blockId: string } }) {
  const [districtName, setDistrictName] = useState('');
  const [blockName, setBlockName] = useState('Block');
  const [panchayats, setPanchayats] = useState<any[]>([]);

  useEffect(() => {
    async function loadPanchayats() {
      const res = await api.get(`/geo/panchayats?blockId=${params.blockId}`);
      if (res.success) {
        setDistrictName(res.districtName);
        setBlockName(res.blockName);
        setPanchayats(res.data);
      }
    }
    loadPanchayats();
  }, [params.blockId]);

  return (
    <LayoutWrapper
      pageTitle={`:: District: ${districtName}, Block: ${blockName} - Panchayats ::`}
      breadcrumb={['Dashboard', 'Blocks', `${blockName} Panchayats`]}
    >
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>
            {districtName} &gt; {blockName} - Panchayats
          </h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>Panchayat Name</th>
                  <th style={{ color: '#FFF' }}>Luminaries Installed</th>
                  <th style={{ color: '#FFF' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {panchayats.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">No panchayats found for this block</td>
                  </tr>
                ) : (
                  panchayats.map((p, idx) => (
                    <tr key={p.panchayatId}>
                      <td>{idx + 1}</td>
                      <td>
                        <strong>{p.panchayatName}</strong>
                      </td>
                      <td>{p.lightsCount}</td>
                      <td>
                        <Link
                          href={`/wards/${p.panchayatId}`}
                          className="btn btn-primary btn-sm waves-effect waves-light"
                          style={{ backgroundColor: '#164286', borderColor: '#164286' }}
                        >
                          View Wards <i className="ti-arrow-right" style={{ marginLeft: 5 }}></i>
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
