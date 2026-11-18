# 01 - PHP Project Audit: JREDALED

## Executive Summary

- **Project Name:** JREDALED (Smart GSM Solar Street Light & RMS Management System)
- **Source Location:** `C:\Apache24\htdocs\JREDALED\old-code`
- **Target Location:** `C:\Apache24\htdocs\JREDALED\project`
- **Client Organization:** Jharkhand Renewable Energy Development Agency (JREDA) & GEIE Corp
- **Original Technology Stack:**
  - PHP 5.6 / 7.x (Procedural PHP + procedural MySQLi)
  - MySQL (`smartled_jreda2` database)
  - MD5 Password Hashing
  - Apache Web Server (htdocs)
  - Frontend: Bootstrap 4, CodedThemes Mega Able Admin Dashboard, FontAwesome, Themify Icons, Google Charts, AmCharts 3, jQuery

---

## Directory Structure Analysis

```
JREDALED/
├── old-code/
│   ├── App/                       # Mobile-optimized views and AJAX handlers
│   │   ├── assets/                # App styling and plugins
│   │   ├── [CRUD and report files]
│   ├── assets/
│   │   ├── css/                   # Bootstrap 4, CodedThemes style.css
│   │   ├── icon/                  # themify-icons, font-awesome, icofont
│   │   ├── images/                # GEIELogo.png, favicon.png, avatars
│   │   ├── js/                    # jQuery, Popper, Bootstrap, PCoded navigation
│   │   └── pages/                 # widget charts, animations, waves.js
│   ├── Districts/                 # District boundary map images for Jharkhand
│   ├── Districts - Copy/          # Backup district images
│   ├── javascript/                # Helper JS scripts
│   ├── Maps/                      # Map overlays and charts
│   ├── *.php                      # 85+ Web pages, IoT receivers, and API endpoints
│   ├── *.png / *.jpg              # JharkhandMap.png, pump icons, status indicators
│   └── *.csv                      # CSV export templates
```

---

## PHP Entry Points & Architecture

### 1. Authentication & Session Management
- `index.php`: Login interface with client browser detection (`browser_detection.php`).
- `checklogin.php`: Authenticates against `Users` table via `UserId`, MD5(`UPassword`), and `IsActive=1`. Logs session IP, browser, and OS into `UserLoginHistory`. Sets `$_SESSION['SolarLight']`.
- `Logout.php`: Destroys session, deletes session cookies, redirects to `index.php`.
- `SessionExpire.php`: Included in protected pages to kick unauthorized visitors back to `index.php`.

### 2. Dashboard & Visualization
- `Dashboard.php`: Central portal featuring an interactive clickable map of Jharkhand's 24 districts (`JharkhandMap.png`), summary statistics cards (`Blocks2.php`), and real-time healthy vs faulty luminary donut chart (`Google Charts`).
- `Blocks.php`: District-filtered block breakdown.
- `Panchayat.php`: Block-filtered panchayat breakdown.
- `Ward.php`: Ward breakdown within a panchayat.
- `Lights.php`: Luminary device status view.

### 3. IoT Gateway Endpoints
- `k.php`: Gateway listener for GSM/GPRS data packets from solar street lights and remote monitoring systems (`f=IMEINo,PowerStatus,PumpStatus,PumpError,Voltage,Current,Frequency,Temperature,PowerMotor,PhaseCurrentRYB,GSMSignal,LogDateTime,ManualCommand,ControllerModel,ResetType,ResetCounter,SIMId`).
  - Writes to `PumpLogs` and updates `RMSControllerPump`.
  - Calculates flow LPM, checks morning/evening calibration windows.
  - Returns `In$RMSBlock$FrequencyCutOff$CloudDelay$AutoOnStatus$#`.
- `Cmd.php`: Command polling endpoint returning `Cmd$PumpCommand$#`.
- `PushDone.php` & `PumpCommand.php`: Manual toggle commands for remote pump activations.
- `RobotCLoudTime.php` & `ResetTimeNext.php`: Interval timing resets.

### 4. Core Management Modules
- **Distributor Management**: `AddDistributor.php`, `InsertDistributor.php`, `ManageDistributors.php`, `EditDistributor.php`, `DeleteDistributor.php`, `AllocateDistributor.php`, `ViewDistributors.php`.
- **Customer Management**: `AddCustomer.php`, `InsertCustomer.php`, `ManageCustomers.php`, `EditCustomer.php`, `DeleteCustomer.php`.
- **Organization Management**: `AddOrganization.php`, `InsertOrganization.php`, `ManageOrganizations.php`, `EditOrganization.php`, `DeleteOrganization.php`.
- **Inventory Management**: `AddInventory.php`, `InsertInventory.php`, `ManageInventory.php`, `EditInventory.php`, `DeleteInventory.php`, `AllocateHub.php`.
- **RMS / Controller Units**: `AddRMS.php`, `InsertRMS.php`, `ManageRMS.php`, `EditRMS.php`, `DeleteRMS.php`, `OnOffPump.php`, `ViewPumpStatus.php`, `CalibrateRMS.php`, `RMSCalibration.php`, `DataPush.php`, `BlockRMS.php`.
- **User & Access Management**: `AddUser.php`, `InsertUsers.php`, `ManageUser.php`, `EditUser.php`, `AccessLevel.php`, `UserLoginHistory.php`, `ChangePassword.php`.
- **Reporting Engine**: `CustomReport.php`, `OnOffReport.php`, `FaultReport.php`, `LatestLogReport.php`, `LogReport.php`, `RecentLogs.php`, `SIMStatus.php`, `SIMActiveOn.php`, `QRData.php`, `LPMCalculation.php`.

---

## Security Audit & Vulnerabilities in PHP Codebase

1. **SQL Injection Vulnerabilities**: Direct string concatenation in queries without parameter binding (`SELECT * FROM $tbl_name WHERE UserId='$myUserName'`).
2. **Weak Password Hashing**: MD5 hashing without salt.
3. **Missing CSRF Protection**: Form submissions lack anti-CSRF tokens.
4. **Unauthenticated Endpoints**: Several endpoints lacked rigorous session boundary verification.

*The Node.js + TypeScript target stack solves all of these using Sequelize parameterized queries, bcryptjs password hashing with backward-compatible MD5 verification, Helmet security headers, rate limiting, and HTTP-only JWT cookies.*
