'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../../components/LayoutWrapper';
import { api } from '../../../lib/api';

export default function BlocksPage({ params }: { params: { districtId: string } }) {
  const [districtName, setDistrictName] = useState('District');
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    async function loadBlocks() {
      const res = await api.get(`/geo/blocks?districtId=${params.districtId}`);
      if (res.success) {
        setDistrictName(res.district);
        setBlocks(res.data);
      }
    }
    loadBlocks();
  }, [params.districtId]);

  return (
    <LayoutWrapper
      pageTitle={`:: ${districtName} Blocks ::`}
      breadcrumb={['Dashboard', `${districtName} Blocks`]}
    >
      <div className="card">
        <div className="card-header" style={{ padding: '15px' }}>
          <h5 style={{ color: '#006', fontWeight: 'bold', margin: 0 }}>
            {districtName} - Blocks Breakdown
          </h5>
        </div>
        <div className="card-block table-border-style" style={{ padding: '15px' }}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead style={{ backgroundColor: '#164286', color: '#FFF' }}>
                <tr>
                  <th style={{ color: '#FFF' }}>S.No</th>
                  <th style={{ color: '#FFF' }}>Block Name</th>
                  <th style={{ color: '#FFF' }}>Luminaries Installed</th>
                  <th style={{ color: '#FFF' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {blocks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">No blocks found for this district</td>
                  </tr>
                ) : (
                  blocks.map((b, idx) => (
                    <tr key={b.blockId}>
                      <td>{idx + 1}</td>
                      <td>
                        <strong>{b.blockName}</strong>
                      </td>
                      <td>{b.lightsCount}</td>
                      <td>
                        <Link
                          href={`/panchayats/${b.blockId}`}
                          className="btn btn-primary btn-sm waves-effect waves-light"
                          style={{ backgroundColor: '#164286', borderColor: '#164286' }}
                        >
                          View Panchayats <i className="ti-arrow-right" style={{ marginLeft: 5 }}></i>
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
