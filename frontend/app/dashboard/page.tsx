'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutWrapper from '../../components/LayoutWrapper';
import { api } from '../../lib/api';

interface DashboardStats {
  networks: number;
  totalLuminary: number;
  healthyLuminary: number;
  faultyLuminary: number;
  dischargedBattery: number;
  energySavingKwh: number;
  luminaryInventory: number;
  districtCount: number;
  blockCount: number;
  panchayatCount: number;
  wardCount: number;
  vendorCount: number;
}

interface DistrictData {
  districtId: number;
  districtName: string;
  districtCode: string;
  luminaryTarget: number;
  lightsCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    networks: 0,
    totalLuminary: 0,
    healthyLuminary: 0,
    faultyLuminary: 0,
    dischargedBattery: 0,
    energySavingKwh: 0,
    luminaryInventory: 0,
    districtCount: 24,
    blockCount: 0,
    panchayatCount: 0,
    wardCount: 0,
    vendorCount: 1,
  });

  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [statsRes, mapRes] = await Promise.all([
          api.get<DashboardStats>('/dashboard/stats'),
          api.get<DistrictData[]>('/dashboard/map'),
        ]);

        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        }

        if (mapRes.success && mapRes.data) {
          setDistricts(mapRes.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const getDistrictLights = (id: number) => {
    const d = districts.find((x) => x.districtId === id);
    return d ? d.lightsCount : 0;
  };

  const getProgressBarColor = (percent: number) => {
    if (percent > 74) return { bg: '#28a745', text: '#090' };
    if (percent > 49) return { bg: '#17a2b8', text: '#0080FF' };
    if (percent > 24) return { bg: '#ffc107', text: '#F60' };
    return { bg: '#dc3545', text: '#F00' };
  };

  return (
    <LayoutWrapper pageTitle="Smart GSM Solar Street Light CMS - Dashboard" breadcrumb={['Dashboard']}>
      {/* ROW 1: Map and 12-Card Executive Metrics */}
      <div className="row">
        {/* Left Column: Interactive Jharkhand Map matching Dashboard.php */}
        <div className="col-xl-8 col-md-8">
          <div className="card" style={{ marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
            <div className="card-header" style={{ padding: '12px 20px', borderBottom: '1px solid #eee' }}>
              <h5 style={{ margin: 0, color: '#006', fontWeight: 'bold', fontSize: '15px' }}>
                Jharkhand State GIS Luminary Map
              </h5>
            </div>
            <div
              className="card-block"
              style={{
                padding: '10px 0',
                position: 'relative',
                backgroundImage: 'url(/JharkhandMap.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                width: '538px',
                height: '523px',
                margin: '0 auto',
              }}
            >

              {/* District clickable links matching exact original coordinates from Dashboard.php */}
              <Link href="/blocks/14" className="map-label" style={{ left: '35px', top: '150px' }} title={`${getDistrictLights(14)} Luminary Installed`}>
                Garhwa
              </Link>
              <Link href="/blocks/20" className="map-label" style={{ left: '100px', top: '140px' }} title={`${getDistrictLights(20)} Luminary Installed`}>
                Palamu
              </Link>
              <Link href="/blocks/4" className="map-label" style={{ left: '180px', top: '130px' }} title={`${getDistrictLights(4)} Luminary Installed`}>
                Chatra
              </Link>
              <Link href="/blocks/2" className="map-label" style={{ left: '235px', top: '140px' }} title={`${getDistrictLights(2)} Luminary Installed`}>
                Hazaribagh
              </Link>
              <Link href="/blocks/5" className="map-label" style={{ left: '263px', top: '70px' }} title={`${getDistrictLights(5)} Luminary Installed`}>
                Koderma
              </Link>
              <Link href="/blocks/18" className="map-label" style={{ left: '320px', top: '160px' }} title={`${getDistrictLights(18)} Luminary Installed`}>
                Giridih
              </Link>
              <Link href="/blocks/15" className="map-label" style={{ left: '380px', top: '140px' }} title={`${getDistrictLights(15)} Luminary Installed`}>
                Deoghar
              </Link>
              <Link href="/blocks/21" className="map-label" style={{ left: '435px', top: '140px' }} title={`${getDistrictLights(21)} Luminary Installed`}>
                Dumka
              </Link>
              <Link href="/blocks/16" className="map-label" style={{ left: '445px', top: '70px' }} title={`${getDistrictLights(16)} Luminary Installed`}>
                Godda
              </Link>
              <Link href="/blocks/17" className="map-label" style={{ left: '485px', top: '100px' }} title={`${getDistrictLights(17)} Luminary Installed`}>
                Sahebganj
              </Link>
              <Link href="/blocks/22" className="map-label" style={{ left: '490px', top: '170px' }} title={`${getDistrictLights(22)} Luminary Installed`}>
                Pakur
              </Link>
              <Link href="/blocks/10" className="map-label" style={{ left: '400px', top: '220px' }} title={`${getDistrictLights(10)} Luminary Installed`}>
                Jamtara
              </Link>
              <Link href="/blocks/23" className="map-label" style={{ left: '350px', top: '230px' }} title={`${getDistrictLights(23)} Luminary Installed`}>
                Dhanbad
              </Link>
              <Link href="/blocks/8" className="map-label" style={{ left: '300px', top: '240px' }} title={`${getDistrictLights(8)} Luminary Installed`}>
                Bokaro
              </Link>
              <Link href="/blocks/12" className="map-label" style={{ left: '236px', top: '234px' }} title={`${getDistrictLights(12)} Luminary Installed`}>
                Ramghar
              </Link>
              <Link href="/blocks/19" className="map-label" style={{ left: '136px', top: '194px' }} title={`${getDistrictLights(19)} Luminary Installed`}>
                Latehar
              </Link>
              <Link href="/blocks/7" className="map-label" style={{ left: '150px', top: '269px' }} title={`${getDistrictLights(7)} Luminary Installed`}>
                Lohardga
              </Link>
              <Link href="/blocks/3" className="map-label" style={{ left: '130px', top: '309px' }} title={`${getDistrictLights(3)} Luminary Installed`}>
                Gumla
              </Link>
              <Link href="/blocks/11" className="map-label" style={{ left: '130px', top: '379px' }} title={`${getDistrictLights(11)} Luminary Installed`}>
                Simdega
              </Link>
              <Link href="/blocks/1" className="map-label" style={{ left: '220px', top: '250px' }} title={`${getDistrictLights(1)} Luminary Installed`}>
                Ranchi
              </Link>
              <Link href="/blocks/24" className="map-label" style={{ left: '220px', top: '320px' }} title={`${getDistrictLights(24)} Luminary Installed`}>
                Khunti
              </Link>
              <Link href="/blocks/13" className="map-label" style={{ left: '220px', top: '400px' }} title={`${getDistrictLights(13)} Luminary Installed`}>
                West Singbhum
              </Link>
              <Link href="/blocks/9" className="map-label" style={{ left: '290px', top: '350px' }} title={`${getDistrictLights(9)} Luminary Installed`}>
                Saraikela
              </Link>
              <Link href="/blocks/6" className="map-label" style={{ left: '330px', top: '370px' }} title={`${getDistrictLights(6)} Luminary Installed`}>
                East Singbhum
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: 12 Statistics Blocks matching Blocks2.php + Donut Chart */}
        <div className="col-xl-4 col-md-4">
          <div className="card" style={{ marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
            <div className="card-header" style={{ padding: '12px 20px', borderBottom: '1px solid #eee' }}>
              <h5 style={{ margin: 0, color: '#006', fontWeight: 'bold', fontSize: '15px' }}>
                Executive Metrics
              </h5>
            </div>
            <div className="card-block" style={{ padding: 0 }}>
              {/* 12 Colored Metric Tiles matching Blocks2.php */}
              <div className="row no-gutters">
                {/* 1. Networks */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#00D76B', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.networks}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Networks</h6>
                </div>

                {/* 2. Total Luminary */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#00D7D7', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.totalLuminary}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Total Luminary</h6>
                </div>

                {/* 3. Healthy Luminary */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#F2C81E', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.healthyLuminary}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Healthy Luminary</h6>
                </div>

                {/* 4. Discharged Battery */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#6F00DD', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.dischargedBattery}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Discharged Battery</h6>
                </div>

                {/* 5. Faulty Luminary */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#cc6699', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.faultyLuminary}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Faulty Luminary</h6>
                </div>

                {/* 6. Energy Saving */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#F1948A', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>
                    {stats.energySavingKwh} <span style={{ fontSize: '11px', color: '#FFF' }}>KWH</span>
                  </h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Energy Saving</h6>
                </div>

                {/* 7. Luminary Inventory */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#A14189', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.luminaryInventory}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Luminary Inventory</h6>
                </div>

                {/* 8. District */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#9933ff', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.districtCount}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>District</h6>
                </div>

                {/* 9. Blocks */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#009999', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.blockCount}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Blocks</h6>
                </div>

                {/* 10. Panchayat */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#ff6600', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.panchayatCount}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Panchayat</h6>
                </div>

                {/* 11. Ward */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#996600', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.wardCount}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Ward</h6>
                </div>

                {/* 12. Vendor */}
                <div className="col-6" style={{ border: '1px solid #CCC', backgroundColor: '#0099e6', padding: '8px 12px' }}>
                  <h4 style={{ color: '#FFF', margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '18px' }}>{stats.vendorCount}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '11px', margin: 0, fontWeight: 500 }}>Vendor</h6>
                </div>
              </div>

              {/* Status Donut/Pie Chart matching Dashboard.php Google Chart */}
              <div style={{ padding: '15px 10px', textAlign: 'center', background: '#fafafa', borderTop: '1px solid #eee' }}>
                <h6 style={{ color: '#006', fontWeight: 'bold', fontSize: '13px', margin: '0 0 10px 0' }}>
                  Total Luminary: {stats.totalLuminary}
                </h6>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <svg width="150" height="150" viewBox="0 0 42 42">
                    <circle
                      cx="21"
                      cy="21"
                      r="15.91549430918954"
                      fill="transparent"
                      stroke="#cc6699"
                      strokeWidth="6"
                    ></circle>
                    <circle
                      cx="21"
                      cy="21"
                      r="15.91549430918954"
                      fill="transparent"
                      stroke="#F2C81E"
                      strokeWidth="6"
                      strokeDasharray={`${
                        stats.totalLuminary > 0
                          ? ((stats.healthyLuminary / stats.totalLuminary) * 100).toFixed(1)
                          : '100'
                      } ${
                        stats.totalLuminary > 0
                          ? ((stats.faultyLuminary / stats.totalLuminary) * 100).toFixed(1)
                          : '0'
                      }`}
                      strokeDashoffset="25"
                    ></circle>
                    <g className="chart-text">
                      <text x="50%" y="46%" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#333">
                        {stats.totalLuminary}
                      </text>
                      <text x="50%" y="60%" textAnchor="middle" fontSize="2.8" fill="#666">
                        Lights
                      </text>
                    </g>
                  </svg>
                </div>
                <div style={{ marginTop: 8, fontSize: '11px' }}>
                  <span style={{ color: '#B7950B', marginRight: 15, fontWeight: 'bold' }}>
                    <i className="fa fa-circle" style={{ marginRight: 4, color: '#F2C81E' }}></i>
                    Healthy ({stats.healthyLuminary})
                  </span>
                  <span style={{ color: '#900C3F', fontWeight: 'bold' }}>
                    <i className="fa fa-circle" style={{ marginRight: 4, color: '#cc6699' }}></i>
                    Faulty ({stats.faultyLuminary})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: District Installation Progress & District Luminary Bar Chart matching Dashboard.php lines 340-450 */}
      <div className="row">
        {/* Left: District Progress Bars */}
        <div className="col-xl-7 col-md-7">
          <div className="card" style={{ marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
            <div className="card-header" style={{ padding: '12px 20px', borderBottom: '1px solid #eee' }}>
              <h5 style={{ margin: 0, color: '#006', fontWeight: 'bold', fontSize: '15px' }}>
                District Installation Progress
              </h5>
            </div>
            <div className="card-block" style={{ padding: '15px', maxHeight: '420px', overflowY: 'auto' }}>
              {districts.length === 0 ? (
                <p style={{ color: '#888', fontStyle: 'italic', margin: 0 }}>Loading district target data...</p>
              ) : (
                districts
                  .filter((d) => d.luminaryTarget > 0 || d.lightsCount > 0)
                  .map((d) => {
                    const target = d.luminaryTarget || 1;
                    const installed = d.lightsCount || 0;
                    const percent = Math.min(100, Math.round((installed / target) * 100));
                    const colors = getProgressBarColor(percent);

                    return (
                      <div key={d.districtId} style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '11px', marginBottom: '3px' }}>
                          District: <span style={{ color: '#00D76B', fontWeight: 'bold' }}>{d.districtName}</span>,
                          Installation Target: <span style={{ color: '#009', fontWeight: 'bold', marginLeft: 4 }}>{target}</span>,
                          Installation Done: <span style={{ color: colors.text, fontWeight: 'bold', marginLeft: 4 }}>{installed}</span>
                        </div>
                        <div
                          style={{
                            height: '16px',
                            background: '#e9ecef',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${percent}%`,
                              height: '100%',
                              backgroundColor: colors.bg,
                              color: '#fff',
                              fontSize: '10px',
                              lineHeight: '16px',
                              textAlign: 'center',
                              fontWeight: 'bold',
                              transition: 'width 0.6s ease',
                            }}
                          >
                            {percent}% Installation Completed
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>

        {/* Right: District Wise Total Luminary Chart */}
        <div className="col-xl-5 col-md-5">
          <div className="card" style={{ marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
            <div className="card-header" style={{ padding: '12px 20px', borderBottom: '1px solid #eee' }}>
              <h5 style={{ margin: 0, color: '#006', fontWeight: 'bold', fontSize: '15px' }}>
                District Wise Total Luminary
              </h5>
            </div>
            <div className="card-block" style={{ padding: '15px', maxHeight: '420px', overflowY: 'auto' }}>
              {districts.length === 0 ? (
                <p style={{ color: '#888', fontStyle: 'italic', margin: 0 }}>Loading district luminary chart...</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {districts
                    .slice()
                    .sort((a, b) => b.lightsCount - a.lightsCount)
                    .map((d) => {
                      const maxLights = Math.max(...districts.map((x) => x.lightsCount), 1);
                      const barPercent = Math.round((d.lightsCount / maxLights) * 100);

                      return (
                        <div key={d.districtId} style={{ display: 'flex', alignItems: 'center', fontSize: '11px' }}>
                          <span style={{ width: '100px', fontWeight: 500, color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {d.districtName}
                          </span>
                          <div style={{ flex: 1, margin: '0 8px', background: '#f0f0f0', height: '14px', borderRadius: '2px', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${Math.max(barPercent, 2)}%`,
                                height: '100%',
                                backgroundColor: '#EB660B',
                              }}
                            ></div>
                          </div>
                          <span style={{ width: '40px', textAlign: 'right', fontWeight: 'bold', color: '#EB660B' }}>
                            {d.lightsCount}
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
