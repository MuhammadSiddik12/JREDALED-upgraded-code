# 04 - Route Mapping: JREDALED

## Authentication & Session Routes

| Original PHP Page | Method | Express Backend Endpoint | Next.js Page Route | Description |
|-------------------|--------|--------------------------|---------------------|-------------|
| `index.php` | GET | `GET /api/auth/me` | `/` or `/login` | Login page with device info |
| `checklogin.php` | POST | `POST /api/auth/login` | Handled via API | Checks user & password, generates JWT cookie, logs history |
| `Logout.php` | GET/POST | `POST /api/auth/logout` | Handled via API | Clears authentication cookie |
| `ChangePassword.php` / `UpdatePwd.php` | POST | `POST /api/auth/change-password` | `/change-password` | Updates user password |

---

## Dashboard & Geographical Views

| Original PHP Page | Method | Express Backend Endpoint | Next.js Page Route | Description |
|-------------------|--------|--------------------------|---------------------|-------------|
| `Dashboard.php` | GET | `GET /api/dashboard/stats`, `GET /api/dashboard/map` | `/dashboard` | Interactive Jharkhand map and summary counters |
| `Blocks.php` | GET | `GET /api/geo/blocks?districtId=:id` | `/blocks/[districtId]` | Blocks list within chosen district |
| `Panchayat.php` | GET | `GET /api/geo/panchayats?blockId=:id` | `/panchayats/[blockId]` | Panchayats list within chosen block |
| `Ward.php` | GET | `GET /api/geo/wards?panchayatId=:id` | `/wards/[panchayatId]` | Wards list |
| `Lights.php` | GET | `GET /api/geo/lights` | `/lights` | Individual luminaries in ward/network |

---

## Management & CRUD Routes

| Original PHP Page | Method | Express Backend Endpoint | Next.js Page Route | Description |
|-------------------|--------|--------------------------|---------------------|-------------|
| `ManageDistributors.php` | GET | `GET /api/distributors` | `/distributors` | List distributors |
| `AddDistributor.php` / `InsertDistributor.php` | POST | `POST /api/distributors` | `/distributors/add` | Create distributor |
| `EditDistributor.php` | POST | `PUT /api/distributors/:id` | `/distributors/edit/[id]` | Update distributor |
| `DeleteDistributor.php` | DELETE/POST | `DELETE /api/distributors/:id` | Action handler | Remove distributor |
| `AllocateDistributor.php` | POST | `POST /api/distributors/allocate` | `/distributors/allocate` | Assign hub/devices |
| `ManageCustomers.php` | GET | `GET /api/customers` | `/customers` | List customers |
| `AddCustomer.php` / `InsertCustomer.php` | POST | `POST /api/customers` | `/customers/add` | Create customer |
| `EditCustomer.php` | POST | `PUT /api/customers/:id` | `/customers/edit/[id]` | Update customer |
| `DeleteCustomer.php` | DELETE/POST | `DELETE /api/customers/:id` | Action handler | Remove customer |
| `ManageOrganizations.php` | GET | `GET /api/organizations` | `/organizations` | List organizations |
| `AddOrganization.php` / `InsertOrganization.php` | POST | `POST /api/organizations` | `/organizations/add` | Create organization |
| `EditOrganization.php` | POST | `PUT /api/organizations/:id` | `/organizations/edit/[id]` | Update organization |
| `DeleteOrganization.php` | DELETE/POST | `DELETE /api/organizations/:id` | Action handler | Remove organization |
| `ManageInventory.php` | GET | `GET /api/inventory` | `/inventory` | List RMS inventory |
| `AddInventory.php` / `InsertInventory.php` | POST | `POST /api/inventory` | `/inventory/add` | Create inventory item |
| `EditInventory.php` | POST | `PUT /api/inventory/:id` | `/inventory/edit/[id]` | Update inventory |
| `DeleteInventory.php` | DELETE/POST | `DELETE /api/inventory/:id` | Action handler | Remove inventory |
| `ManageRMS.php` | GET | `GET /api/rms` | `/rms` | List RMS controllers |
| `AddRMS.php` / `InsertRMS.php` | POST | `POST /api/rms` | `/rms/add` | Create RMS controller |
| `EditRMS.php` | POST | `PUT /api/rms/:id` | `/rms/edit/[id]` | Update RMS controller |
| `DeleteRMS.php` | DELETE/POST | `DELETE /api/rms/:id` | Action handler | Remove RMS controller |
| `ManageUser.php` | GET | `GET /api/users` | `/users` | List CMS users |
| `AddUser.php` / `InsertUsers.php` | POST | `POST /api/users` | `/users/add` | Create user |
| `EditUser.php` | POST | `PUT /api/users/:id` | `/users/edit/[id]` | Update user |
| `AccessLevel.php` | GET/POST | `GET/POST /api/users/:id/access` | `/users/access/[id]` | Update menu permissions |
| `UserLoginHistory.php` | GET | `GET /api/users/login-history` | `/users/login-history` | User login audit logs |

---

## IoT Hardware Gateway & Remote Control Routes

| Original PHP Page | Method | Express Backend Endpoint | Next.js Page Route | Description |
|-------------------|--------|--------------------------|---------------------|-------------|
| `k.php` | GET/POST | `GET/POST /api/iot/k` | IoT Gateway | Telemetry frame ingest (`f=...`) |
| `Cmd.php` | GET | `GET /api/iot/cmd` | IoT Gateway | Device command polling |
| `OnOffPump.php` / `PumpCommand.php` | POST | `POST /api/rms/pump-command` | `/on-off-pump` | Remote ON/OFF pump control |
| `DataPush.php` / `PushDone.php` | POST | `POST /api/rms/data-push` | `/data-push` | Remote data push activation |
| `BlockRMS.php` / `RMSBlock.php` | POST | `POST /api/rms/block` | `/block-rms` | Remote blocking of RMS device |
| `RMSTime.php` / `ResetTimeNext.php` | POST | `POST /api/rms/reset-time` | `/rms-time` | Reset device clock / delay |
| `RMSCalibration.php` / `UpdateCalibiration.php` | POST | `POST /api/calibration` | `/calibration` | Update calibration limits |

---

## Reports Routes

| Original PHP Page | Method | Express Backend Endpoint | Next.js Page Route | Description |
|-------------------|--------|--------------------------|---------------------|-------------|
| `CustomReport.php` | GET | `GET /api/reports/custom` | `/reports/custom` | Custom multi-parameter report |
| `OnOffReport.php` | GET | `GET /api/reports/on-off` | `/reports/on-off` | Daily run hours report |
| `FaultReport.php` | GET | `GET /api/reports/faults` | `/reports/faults` | Hardware & network fault logs |
| `LatestLogReport.php` | GET | `GET /api/reports/latest-logs` | `/reports/latest-logs` | Real-time device logs |
| `LogReport.php` | GET | `GET /api/reports/logs` | `/reports/logs` | Historical device logs |
| `RecentLogs.php` | GET | `GET /api/reports/recent-logs` | `/reports/recent-logs` | Most recent telemetry reports |
| `SIMStatus.php` / `SIMActiveOn.php` | GET | `GET /api/reports/sim-status` | `/reports/sim-status` | SIM expiration & activation report |
| `QRData.php` | GET | `GET /api/reports/qr-data` | `/reports/qr-data` | QR codes audit report |
| `LPMCalculation.php` | GET | `GET /api/reports/lpm` | `/reports/lpm` | Water discharge LPM calculations |
