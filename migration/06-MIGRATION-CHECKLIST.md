# 06 - Migration Checklist: JREDALED

| Module / Area | Original PHP Source | Target Implementation | Status | Verification Plan |
|---------------|---------------------|-----------------------|--------|-------------------|
| Database Schema & Seeder | `conn.php`, `DB.php` | `backend/src/database/init.sql`, Sequelize Models | Implemented | Docker / local DB verification, table and column parity |
| Database Connection & Config | `conn.php` | `backend/src/config/database.ts` | Implemented | Sequelize connectivity test |
| Compatibility Helpers | `functions.php`, `browser_detection.php` | `backend/src/helpers/phpCompat.ts` | Implemented | Timezone IST UTC+5:30, MD5 check, formatters test |
| JWT & Auth Middlewares | `checklogin.php`, `SessionExpire.php` | `backend/src/middlewares/auth.ts` | Implemented | Protected endpoints reject unauthenticated requests |
| Auth API | `index.php`, `checklogin.php`, `Logout.php` | `backend/src/controllers/authController.ts` | Implemented | Supertest login/logout/me endpoints |
| Password API | `ChangePassword.php`, `UpdatePwd.php` | `backend/src/controllers/authController.ts` | Implemented | Supertest change password endpoint |
| Users & Access Control API | `AddUser.php`, `ManageUser.php`, `AccessLevel.php` | `backend/src/controllers/userController.ts` | Implemented | CRUD & permission matrix test |
| Geographic Hierarchy API | `Blocks.php`, `Panchayat.php`, `Ward.php`, `Lights.php` | `backend/src/controllers/geoController.ts` | Implemented | Hierarchy drilldown API test |
| Dashboard API | `Dashboard.php`, `Blocks2.php` | `backend/src/controllers/dashboardController.ts` | Implemented | Summary counters & status chart data API test |
| Distributor API | `AddDistributor.php`, `ManageDistributors.php` | `backend/src/controllers/distributorController.ts` | Implemented | CRUD & allocation tests |
| Customer API | `AddCustomer.php`, `ManageCustomers.php` | `backend/src/controllers/customerController.ts` | Implemented | CRUD tests |
| Organization API | `AddOrganization.php`, `ManageOrganizations.php` | `backend/src/controllers/organizationController.ts` | Implemented | CRUD tests |
| Inventory API | `AddInventory.php`, `ManageInventory.php` | `backend/src/controllers/inventoryController.ts` | Implemented | Inventory tracking tests |
| RMS Controller API | `AddRMS.php`, `ManageRMS.php`, `BlockRMS.php` | `backend/src/controllers/rmsController.ts` | Implemented | CRUD, blocking, timing tests |
| IoT Telemetry Gateway | `k.php`, `Cmd.php` | `backend/src/controllers/iotController.ts` | Implemented | Packet parsing & command protocol test |
| Pump Control API | `OnOffPump.php`, `PumpCommand.php`, `DataPush.php` | `backend/src/controllers/pumpController.ts` | Implemented | Command toggle tests |
| Calibration API | `RMSCalibration.php`, `UpdateCalibiration.php` | `backend/src/controllers/calibrationController.ts` | Implemented | Threshold update tests |
| Reports API | `CustomReport.php`, `OnOffReport.php`, etc. | `backend/src/controllers/reportController.ts` | Implemented | CSV export & telemetry queries tests |
| Frontend Auth State & Shell | `Header.php`, `SideMenu.php` | `frontend/components/Navbar.tsx`, `Sidebar.tsx` | Implemented | Visual layout parity check |
| Frontend Login Page | `index.php` | `frontend/app/page.tsx` | Implemented | Pixel & functionality match |
| Frontend Dashboard Page | `Dashboard.php` | `frontend/app/dashboard/page.tsx` | Implemented | Map & charts visual verification |
| Frontend Geographic Pages | `Blocks.php`, `Panchayat.php`, `Ward.php` | `frontend/app/blocks/`, `panchayats/`, `wards/` | Implemented | Drilldown navigation test |
| Frontend Management Pages | `ManageDistributors.php`, `ManageRMS.php`, etc. | `frontend/app/distributors/`, `rms/`, etc. | Implemented | Form and data table verification |
| Frontend Report Pages | `CustomReport.php`, `OnOffReport.php`, etc. | `frontend/app/reports/*` | Implemented | Filter bar & table display test |
| Backend Automated Tests | None | `backend/tests/*.test.ts` | Implemented | Jest unit & integration test run |
| Production Build Verification | N/A | `npm run build` in backend & frontend | Implemented | TypeScript strict build passes |
