'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { api } from '../lib/api';

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    distributor: false,
    customer: false,
    organization: false,
    inventory: false,
    rms: false,
    testing: false,
    users: false,
    reports: false,
  });

  const toggleSubmenu = (menuKey: string) => {
    setOpenMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  const handleLogout = async () => {
    await api.post('/auth/logout');
    router.push('/');
  };

  return (
    <nav className="pcoded-navbar" style={{ display: collapsed ? 'none' : 'block' }}>
      <div className="pcoded-inner-navbar main-menu">
        <div className="pcoded-navigation-label">Navigation</div>
        <ul className="pcoded-item pcoded-left-item">
          {/* Dashboard */}
          <li className={pathname === '/dashboard' ? 'active' : ''}>
            <Link href="/dashboard" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="fa fa-tachometer" aria-hidden="true"></i>
                <b>D</b>
              </span>
              <span className="pcoded-mtext">Dashboard</span>
              <span className="pcoded-mcaret"></span>
            </Link>
          </li>

          {/* Distributor */}
          <li className={`pcoded-hasmenu ${openMenus.distributor ? 'pcoded-trigger active' : ''}`}>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu('distributor');
              }}
              className="waves-effect waves-dark"
            >
              <span className="pcoded-micon">
                <i className="fa fa-cubes" aria-hidden="true"></i>
              </span>
              <span className="pcoded-mtext">Distributor</span>
              <span className="pcoded-mcaret"></span>
            </a>
            {openMenus.distributor && (
              <ul className="pcoded-submenu" style={{ display: 'block' }}>
                <li>
                  <Link href="/distributors/add" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Add Distributor</span>
                  </Link>
                </li>
                <li>
                  <Link href="/distributors" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Manage Distributors</span>
                  </Link>
                </li>
                <li>
                  <Link href="/distributors/allocate" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Allocate Distributor</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Customer */}
          <li className={`pcoded-hasmenu ${openMenus.customer ? 'pcoded-trigger active' : ''}`}>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu('customer');
              }}
              className="waves-effect waves-dark"
            >
              <span className="pcoded-micon">
                <i className="fa fa-users" aria-hidden="true"></i>
              </span>
              <span className="pcoded-mtext">Customer</span>
              <span className="pcoded-mcaret"></span>
            </a>
            {openMenus.customer && (
              <ul className="pcoded-submenu" style={{ display: 'block' }}>
                <li>
                  <Link href="/customers/add" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Add Customer</span>
                  </Link>
                </li>
                <li>
                  <Link href="/customers" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Manage Customers</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Organizations */}
          <li className={`pcoded-hasmenu ${openMenus.organization ? 'pcoded-trigger active' : ''}`}>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu('organization');
              }}
              className="waves-effect waves-dark"
            >
              <span className="pcoded-micon">
                <i className="fa fa-university" aria-hidden="true"></i>
              </span>
              <span className="pcoded-mtext">Organizations</span>
              <span className="pcoded-mcaret"></span>
            </a>
            {openMenus.organization && (
              <ul className="pcoded-submenu" style={{ display: 'block' }}>
                <li>
                  <Link href="/organizations/add" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Add Organization</span>
                  </Link>
                </li>
                <li>
                  <Link href="/organizations" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Manage Organizations</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Inventory */}
          <li className={`pcoded-hasmenu ${openMenus.inventory ? 'pcoded-trigger active' : ''}`}>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu('inventory');
              }}
              className="waves-effect waves-dark"
            >
              <span className="pcoded-micon">
                <i className="fa fa-archive" aria-hidden="true"></i>
              </span>
              <span className="pcoded-mtext">Inventory</span>
              <span className="pcoded-mcaret"></span>
            </a>
            {openMenus.inventory && (
              <ul className="pcoded-submenu" style={{ display: 'block' }}>
                <li>
                  <Link href="/inventory/add" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Add Inventory</span>
                  </Link>
                </li>
                <li>
                  <Link href="/inventory" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Manage Inventory</span>
                  </Link>
                </li>
                <li>
                  <Link href="/inventory/allocate-hub" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Allocate Hub</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* RMS / Controller / Pump */}
          <li className={`pcoded-hasmenu ${openMenus.rms ? 'pcoded-trigger active' : ''}`}>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu('rms');
              }}
              className="waves-effect waves-dark"
            >
              <span className="pcoded-micon">
                <i className="fa fa-wrench" aria-hidden="true"></i>
              </span>
              <span className="pcoded-mtext">RMS / Controller</span>
              <span className="pcoded-mcaret"></span>
            </a>
            {openMenus.rms && (
              <ul className="pcoded-submenu" style={{ display: 'block' }}>
                <li>
                  <Link href="/rms/add" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Add RMS</span>
                  </Link>
                </li>
                <li>
                  <Link href="/rms" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Manage RMS</span>
                  </Link>
                </li>
                <li>
                  <Link href="/on-off-pump" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">On Off Pump</span>
                  </Link>
                </li>
                <li>
                  <Link href="/block-rms" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Block RMS</span>
                  </Link>
                </li>
                <li>
                  <Link href="/calibration" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">RMS Calibration</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Testing Tool */}
          <li className={`pcoded-hasmenu ${openMenus.testing ? 'pcoded-trigger active' : ''}`}>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu('testing');
              }}
              className="waves-effect waves-dark"
            >
              <span className="pcoded-micon">
                <i className="fa fa-cogs" aria-hidden="true"></i>
              </span>
              <span className="pcoded-mtext">Testing Tool</span>
              <span className="pcoded-mcaret"></span>
            </a>
            {openMenus.testing && (
              <ul className="pcoded-submenu" style={{ display: 'block' }}>
                <li>
                  <Link href="/rms-time" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Reset RMS Log Time</span>
                  </Link>
                </li>
                <li>
                  <Link href="/data-push" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Data Logs Automation</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* CMS User */}
          <li className={`pcoded-hasmenu ${openMenus.users ? 'pcoded-trigger active' : ''}`}>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu('users');
              }}
              className="waves-effect waves-dark"
            >
              <span className="pcoded-micon">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              </span>
              <span className="pcoded-mtext">CMS User</span>
              <span className="pcoded-mcaret"></span>
            </a>
            {openMenus.users && (
              <ul className="pcoded-submenu" style={{ display: 'block' }}>
                <li>
                  <Link href="/users/add" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Add User</span>
                  </Link>
                </li>
                <li>
                  <Link href="/users" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Manage Users</span>
                  </Link>
                </li>
                <li>
                  <Link href="/users/login-history" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">User Login History</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Reports */}
          <li className={`pcoded-hasmenu ${openMenus.reports ? 'pcoded-trigger active' : ''}`}>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu('reports');
              }}
              className="waves-effect waves-dark"
            >
              <span className="pcoded-micon">
                <i className="fa fa-line-chart" aria-hidden="true"></i>
              </span>
              <span className="pcoded-mtext">Reports</span>
              <span className="pcoded-mcaret"></span>
            </a>
            {openMenus.reports && (
              <ul className="pcoded-submenu" style={{ display: 'block' }}>
                <li>
                  <Link href="/reports/custom" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Custom Report</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reports/on-off" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">On Off Report</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reports/faults" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Fault Report</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reports/latest-logs" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">Latest Log Report</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reports/sim-status" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">SIM Status</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reports/qr-data" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">QR Data</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reports/lpm" className="waves-effect waves-dark">
                    <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                    <span className="pcoded-mtext">LPM Calculation</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Change Password */}
          <li className={pathname === '/change-password' ? 'active' : ''}>
            <Link href="/change-password" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="fa fa-cog" aria-hidden="true"></i>
                <b>C</b>
              </span>
              <span className="pcoded-mtext">Change Password</span>
              <span className="pcoded-mcaret"></span>
            </Link>
          </li>

          {/* Logout */}
          <li>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="waves-effect waves-dark"
            >
              <span className="pcoded-micon">
                <i className="fa fa-power-off" aria-hidden="true"></i>
                <b>L</b>
              </span>
              <span className="pcoded-mtext">Logout</span>
              <span className="pcoded-mcaret"></span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
