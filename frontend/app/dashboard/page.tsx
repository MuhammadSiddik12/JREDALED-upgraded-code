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
  });

  const [districts, setDistricts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboard() {
      const statsRes = await api.get<DashboardStats>('/dashboard/stats');
      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }

      const mapRes = await api.get('/dashboard/map');
      if (mapRes.success && mapRes.data) {
        setDistricts(mapRes.data);
      }
    }
    fetchDashboard();
  }, []);

  const getDistrictLights = (id: number) => {
    const d = districts.find((x) => x.districtId === id);
    return d ? d.lightsCount : 0;
  };

  return (
    <LayoutWrapper pageTitle="Smart GSM Solar Street Light CMS - Dashboard" breadcrumb={['Dashboard']}>
      <div className="row">
        {/* Left Column: Interactive Jharkhand Map matching Dashboard.php */}
        <div className="col-xl-8 col-md-8">
          <div className="card">
            <div className="card-header" style={{ padding: '10px 15px' }}>
              <h5 style={{ margin: 0, color: '#006', fontWeight: 'bold' }}>
                Jharkhand State GIS Luminary Map
              </h5>
            </div>
            <div
              className="card-block"
              style={{
                padding: 0,
                position: 'relative',
                backgroundImage: 'url(/JharkhandMap.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                width: '100%',
                maxWidth: '538px',
                height: '523px',
                margin: '0 auto',
              }}
            >
              <style jsx>{`
                .map-link {
                  color: #006;
                  font-size: 10px;
                  font-weight: bold;
                  text-decoration: none;
                  background: rgba(255, 255, 255, 0.7);
                  padding: 1px 4px;
                  border-radius: 3px;
                }
                .map-link:hover {
                  color: #d9534f;
                  background: #fff;
                  font-size: 11px;
                }
              `}</style>

              {/* District clickable links matching exact original coordinates from Dashboard.php */}
              <div style={{ position: 'absolute', left: '35px', top: '150px' }}>
                <Link href="/blocks/14" className="map-link" title={`${getDistrictLights(14)} Luminary Installed`}>
                  Garhwa
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '100px', top: '140px' }}>
                <Link href="/blocks/20" className="map-link" title={`${getDistrictLights(20)} Luminary Installed`}>
                  Palamu
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '180px', top: '130px' }}>
                <Link href="/blocks/4" className="map-link" title={`${getDistrictLights(4)} Luminary Installed`}>
                  Chatra
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '235px', top: '140px' }}>
                <Link href="/blocks/2" className="map-link" title={`${getDistrictLights(2)} Luminary Installed`}>
                  Hazaribagh
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '263px', top: '70px' }}>
                <Link href="/blocks/5" className="map-link" title={`${getDistrictLights(5)} Luminary Installed`}>
                  Koderma
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '320px', top: '160px' }}>
                <Link href="/blocks/18" className="map-link" title={`${getDistrictLights(18)} Luminary Installed`}>
                  Giridih
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '380px', top: '140px' }}>
                <Link href="/blocks/15" className="map-link" title={`${getDistrictLights(15)} Luminary Installed`}>
                  Deoghar
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '435px', top: '140px' }}>
                <Link href="/blocks/21" className="map-link" title={`${getDistrictLights(21)} Luminary Installed`}>
                  Dumka
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '445px', top: '70px' }}>
                <Link href="/blocks/16" className="map-link" title={`${getDistrictLights(16)} Luminary Installed`}>
                  Godda
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '485px', top: '100px' }}>
                <Link href="/blocks/17" className="map-link" title={`${getDistrictLights(17)} Luminary Installed`}>
                  Sahebganj
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '490px', top: '170px' }}>
                <Link href="/blocks/22" className="map-link" title={`${getDistrictLights(22)} Luminary Installed`}>
                  Pakur
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '400px', top: '220px' }}>
                <Link href="/blocks/10" className="map-link" title={`${getDistrictLights(10)} Luminary Installed`}>
                  Jamtara
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '350px', top: '230px' }}>
                <Link href="/blocks/23" className="map-link" title={`${getDistrictLights(23)} Luminary Installed`}>
                  Dhanbad
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '300px', top: '240px' }}>
                <Link href="/blocks/8" className="map-link" title={`${getDistrictLights(8)} Luminary Installed`}>
                  Bokaro
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '236px', top: '234px' }}>
                <Link href="/blocks/12" className="map-link" title={`${getDistrictLights(12)} Luminary Installed`}>
                  Ramghar
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '136px', top: '194px' }}>
                <Link href="/blocks/19" className="map-link" title={`${getDistrictLights(19)} Luminary Installed`}>
                  Latehar
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '150px', top: '269px' }}>
                <Link href="/blocks/7" className="map-link" title={`${getDistrictLights(7)} Luminary Installed`}>
                  Lohardga
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '130px', top: '309px' }}>
                <Link href="/blocks/3" className="map-link" title={`${getDistrictLights(3)} Luminary Installed`}>
                  Gumla
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '130px', top: '379px' }}>
                <Link href="/blocks/11" className="map-link" title={`${getDistrictLights(11)} Luminary Installed`}>
                  Simdega
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '220px', top: '250px' }}>
                <Link href="/blocks/1" className="map-link" title={`${getDistrictLights(1)} Luminary Installed`}>
                  Ranchi
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '220px', top: '320px' }}>
                <Link href="/blocks/24" className="map-link" title={`${getDistrictLights(24)} Luminary Installed`}>
                  Khunti
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '220px', top: '400px' }}>
                <Link href="/blocks/13" className="map-link" title={`${getDistrictLights(13)} Luminary Installed`}>
                  West Singbhum
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '290px', top: '350px' }}>
                <Link href="/blocks/9" className="map-link" title={`${getDistrictLights(9)} Luminary Installed`}>
                  Saraikela
                </Link>
              </div>

              <div style={{ position: 'absolute', left: '330px', top: '370px' }}>
                <Link href="/blocks/6" className="map-link" title={`${getDistrictLights(6)} Luminary Installed`}>
                  East Singbhum
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Statistics Cards matching Blocks2.php + Google Donut Chart */}
        <div className="col-xl-4 col-md-4">
          <div className="card">
            <div className="card-header" style={{ padding: '10px 15px' }}>
              <h5 style={{ margin: 0, color: '#006', fontWeight: 'bold' }}>
                Executive Metrics
              </h5>
            </div>
            <div className="card-block" style={{ padding: 0 }}>
              <div className="row no-gutters">
                <div
                  className="col-6"
                  style={{ border: '1px solid #CCC', backgroundColor: '#00D76B', padding: '10px' }}
                >
                  <h4 style={{ color: '#FFF', margin: 0, fontWeight: 'bold' }}>{stats.networks}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '12px', margin: 0 }}>Networks</h6>
                </div>

                <div
                  className="col-6"
                  style={{ border: '1px solid #CCC', backgroundColor: '#00D7D7', padding: '10px' }}
                >
                  <h4 style={{ color: '#FFF', margin: 0, fontWeight: 'bold' }}>{stats.totalLuminary}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '12px', margin: 0 }}>Total Luminary</h6>
                </div>

                <div
                  className="col-6"
                  style={{ border: '1px solid #CCC', backgroundColor: '#F2C81E', padding: '10px' }}
                >
                  <h4 style={{ color: '#FFF', margin: 0, fontWeight: 'bold' }}>{stats.healthyLuminary}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '12px', margin: 0 }}>Healthy Luminary</h6>
                </div>

                <div
                  className="col-6"
                  style={{ border: '1px solid #CCC', backgroundColor: '#6F00DD', padding: '10px' }}
                >
                  <h4 style={{ color: '#FFF', margin: 0, fontWeight: 'bold' }}>{stats.dischargedBattery}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '12px', margin: 0 }}>Discharged Battery</h6>
                </div>

                <div
                  className="col-6"
                  style={{ border: '1px solid #CCC', backgroundColor: '#cc6699', padding: '10px' }}
                >
                  <h4 style={{ color: '#FFF', margin: 0, fontWeight: 'bold' }}>{stats.faultyLuminary}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '12px', margin: 0 }}>Faulty Luminary</h6>
                </div>

                <div
                  className="col-6"
                  style={{ border: '1px solid #CCC', backgroundColor: '#F1948A', padding: '10px' }}
                >
                  <h4 style={{ color: '#FFF', margin: 0, fontWeight: 'bold' }}>
                    {stats.energySavingKwh} <span style={{ fontSize: '12px' }}>KWH</span>
                  </h4>
                  <h6 style={{ color: '#FFF', fontSize: '12px', margin: 0 }}>Energy Saving</h6>
                </div>

                <div
                  className="col-12"
                  style={{ border: '1px solid #CCC', backgroundColor: '#A14189', padding: '10px' }}
                >
                  <h4 style={{ color: '#FFF', margin: 0, fontWeight: 'bold' }}>{stats.luminaryInventory}</h4>
                  <h6 style={{ color: '#FFF', fontSize: '12px', margin: 0 }}>Luminary Inventory</h6>
                </div>
              </div>

              {/* Status Donut Chart */}
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h6 style={{ color: '#006', fontWeight: 'bold', marginBottom: 15 }}>
                  Luminary Health Distribution
                </h6>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <svg width="180" height="180" viewBox="0 0 42 42">
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
                      <text x="50%" y="45%" className="chart-number" textAnchor="middle" fontSize="5" fontWeight="bold">
                        {stats.totalLuminary}
                      </text>
                      <text x="50%" y="60%" className="chart-label" textAnchor="middle" fontSize="2.8" fill="#666">
                        Total Lights
                      </text>
                    </g>
                  </svg>
                </div>
                <div style={{ marginTop: 10, fontSize: '12px' }}>
                  <span style={{ color: '#F2C81E', marginRight: 15 }}>
                    <i className="fa fa-circle" style={{ marginRight: 4 }}></i>
                    Healthy ({stats.healthyLuminary})
                  </span>
                  <span style={{ color: '#cc6699' }}>
                    <i className="fa fa-circle" style={{ marginRight: 4 }}></i>
                    Faulty ({stats.faultyLuminary})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
