-- =============================================================================
-- Smart GSM Solar Street Light & RMS Database Schema
-- Database: smartled_jreda2 (MySQL 8.0)
-- Agency: Jharkhand Renewable Energy Development Agency (JREDA)
-- =============================================================================

CREATE DATABASE IF NOT EXISTS smartled_jreda2 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smartled_jreda2;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS Users (
    Sno INT AUTO_INCREMENT PRIMARY KEY,
    UserId VARCHAR(200) UNIQUE NOT NULL,
    UPassword VARCHAR(255) NOT NULL,
    Name VARCHAR(200) DEFAULT NULL,
    MobileNo VARCHAR(200) DEFAULT NULL,
    IsActive INT NOT NULL DEFAULT 1,
    CMSUserType INT DEFAULT 0,
    AppUserType INT NOT NULL DEFAULT 0,
    VendorLogo INT NOT NULL DEFAULT 1,
    UserType INT DEFAULT 0,
    CreatedBy INT DEFAULT 0,
    CreatedOnDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedOnDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. UserLoginHistory Table
CREATE TABLE IF NOT EXISTS UserLoginHistory (
    SNo INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT DEFAULT 0,
    LoginTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    SessionId VARCHAR(200) DEFAULT NULL,
    PlatformInfo TEXT DEFAULT NULL,
    AppType INT NOT NULL DEFAULT 1,
    AppIP VARCHAR(200) DEFAULT NULL,
    Latitude VARCHAR(20) DEFAULT NULL,
    Longitude VARCHAR(20) DEFAULT NULL,
    Accuracy VARCHAR(20) DEFAULT NULL
);

-- 3. Menu Table
CREATE TABLE IF NOT EXISTS Menu (
    MenuId INT PRIMARY KEY,
    GroupMenuId INT DEFAULT 0,
    MenuName VARCHAR(255) DEFAULT NULL,
    MenuLink VARCHAR(200) DEFAULT NULL,
    MenuOrder INT DEFAULT 0,
    CreatedOnDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedOnDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. UserAccessLevel Table
CREATE TABLE IF NOT EXISTS UserAccessLevel (
    SNo INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT DEFAULT 0,
    GroupMenuId INT DEFAULT 0,
    MenuId INT DEFAULT 0,
    MenuOrder INT DEFAULT 0,
    CreatedOnDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Distributor Table
CREATE TABLE IF NOT EXISTS Distributor (
    DistId INT AUTO_INCREMENT PRIMARY KEY,
    DistName VARCHAR(100) NOT NULL,
    DistEmail VARCHAR(100) DEFAULT NULL,
    DistMobile VARCHAR(20) DEFAULT NULL,
    DistAddress VARCHAR(255) DEFAULT NULL,
    LoginId VARCHAR(50) DEFAULT NULL,
    IsActive INT DEFAULT 1,
    CreatedBy INT DEFAULT 0,
    CreatedOnDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Customer Table
CREATE TABLE IF NOT EXISTS Customer (
    CustId INT AUTO_INCREMENT PRIMARY KEY,
    DistId INT DEFAULT 0,
    CustName VARCHAR(100) NOT NULL,
    CustEmail VARCHAR(100) DEFAULT NULL,
    CustMobile VARCHAR(20) DEFAULT NULL,
    CustAddress VARCHAR(255) DEFAULT NULL,
    LoginId VARCHAR(50) DEFAULT NULL,
    IsActive INT DEFAULT 1,
    CreatedBy INT DEFAULT 0,
    CreatedOnDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Organization Table
CREATE TABLE IF NOT EXISTS Organization (
    OrgId INT AUTO_INCREMENT PRIMARY KEY,
    OrgName VARCHAR(100) NOT NULL,
    OrgEmail VARCHAR(100) DEFAULT NULL,
    OrgMobile VARCHAR(20) DEFAULT NULL,
    OrgAddress VARCHAR(255) DEFAULT NULL,
    OrgState VARCHAR(50) DEFAULT NULL,
    IsActive INT DEFAULT 1,
    CreatedBy INT DEFAULT 0,
    CreatedOnDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. RMSControllerPump Table
CREATE TABLE IF NOT EXISTS RMSControllerPump (
    SNo INT AUTO_INCREMENT PRIMARY KEY,
    DistId INT DEFAULT 0,
    OrgId INT DEFAULT 0,
    CustId INT DEFAULT 0,
    IMEINo VARCHAR(30) UNIQUE NOT NULL,
    RMSMobileNo VARCHAR(20) DEFAULT NULL,
    ControllerSerialNo VARCHAR(50) DEFAULT NULL,
    ControllerLocation VARCHAR(255) DEFAULT NULL,
    ControllerModel VARCHAR(50) DEFAULT NULL,
    ControllerManufacturer VARCHAR(100) DEFAULT NULL,
    Longitude VARCHAR(50) DEFAULT '0',
    Latitude VARCHAR(50) DEFAULT '0',
    MotorType INT DEFAULT 1,
    PumpCategory VARCHAR(50) DEFAULT NULL,
    PumpSetSerialNo VARCHAR(50) DEFAULT NULL,
    MotorHP VARCHAR(20) DEFAULT NULL,
    MotorHeadSize VARCHAR(20) DEFAULT NULL,
    FrequencyCutOff INT DEFAULT 0,
    ProductType INT DEFAULT 3,
    PowerStatus INT DEFAULT 0,
    PumpStatus INT DEFAULT 0,
    PumpError VARCHAR(50) DEFAULT '',
    Voltage VARCHAR(20) DEFAULT '0',
    Current VARCHAR(20) DEFAULT '0',
    Frequency VARCHAR(20) DEFAULT '0',
    Temperature VARCHAR(20) DEFAULT '0',
    PhaseCurrentRYB VARCHAR(100) DEFAULT '',
    ExtraReserved VARCHAR(100) DEFAULT 'RRRR',
    GSMSignal VARCHAR(20) DEFAULT '',
    SIMId VARCHAR(50) DEFAULT '',
    RMSBlock INT DEFAULT 2,
    CloudDelay INT DEFAULT 0,
    AutoOnStatus INT DEFAULT 1,
    Data_Calibration INT DEFAULT 0,
    PumpCommand INT DEFAULT 0,
    DataPush INT DEFAULT 0,
    ServerDelay INT DEFAULT 0,
    LastLogDateTime DATETIME DEFAULT NULL,
    IsActive INT DEFAULT 1,
    CreatedBy INT DEFAULT 0,
    CreatedOnDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 9. PumpLogs Table
CREATE TABLE IF NOT EXISTS PumpLogs (
    SNo INT AUTO_INCREMENT PRIMARY KEY,
    DistId INT DEFAULT 0,
    IMEINo VARCHAR(30) NOT NULL,
    SIMId VARCHAR(50) DEFAULT NULL,
    PowerStatus INT DEFAULT 0,
    PumpStatus INT DEFAULT 0,
    PumpError VARCHAR(50) DEFAULT NULL,
    Voltage VARCHAR(20) DEFAULT '0',
    Current VARCHAR(20) DEFAULT '0',
    Frequency VARCHAR(20) DEFAULT '0',
    Temperature VARCHAR(20) DEFAULT '0',
    PhaseCurrentRYB VARCHAR(100) DEFAULT NULL,
    GSMSignal VARCHAR(20) DEFAULT NULL,
    LPM VARCHAR(20) DEFAULT '0',
    Longitude VARCHAR(50) DEFAULT NULL,
    Latitude VARCHAR(50) DEFAULT NULL,
    ExtraReserved VARCHAR(100) DEFAULT NULL,
    LogDateTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. PumpOnOffCycle Table
CREATE TABLE IF NOT EXISTS PumpOnOffCycle (
    SNo INT AUTO_INCREMENT PRIMARY KEY,
    DistId INT DEFAULT 0,
    IMEINo VARCHAR(30) NOT NULL,
    PumpOnTime DATETIME DEFAULT NULL,
    PumpOffTime DATETIME DEFAULT NULL,
    CycleStatus INT DEFAULT 1
);

-- 11. RMSInventory Table
CREATE TABLE IF NOT EXISTS RMSInventory (
    SNo INT AUTO_INCREMENT PRIMARY KEY,
    HubId INT DEFAULT 0,
    IMEINo VARCHAR(30) UNIQUE NOT NULL,
    RMSMobileNo VARCHAR(20) DEFAULT NULL,
    SIMId VARCHAR(50) DEFAULT NULL,
    SIMProvider VARCHAR(50) DEFAULT NULL,
    SIMActiveOn VARCHAR(50) DEFAULT NULL,
    SIMExpiredOn VARCHAR(50) DEFAULT NULL,
    ControllerSerialNo VARCHAR(50) DEFAULT NULL,
    ControllerModel VARCHAR(50) DEFAULT NULL,
    MotorType VARCHAR(50) DEFAULT NULL,
    PumpCategory VARCHAR(50) DEFAULT NULL,
    PumpSetSerialNo VARCHAR(50) DEFAULT NULL,
    MotorHP VARCHAR(20) DEFAULT NULL,
    MotorHeadSize VARCHAR(20) DEFAULT NULL,
    CreatedBy INT DEFAULT 0,
    CreatedOnDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 12. RMSCalibration Table
CREATE TABLE IF NOT EXISTS RMSCalibration (
    SNo INT AUTO_INCREMENT PRIMARY KEY,
    MorningStartTime VARCHAR(20) DEFAULT '06:00:00',
    MorningStopTime VARCHAR(20) DEFAULT '10:00:00',
    EveningStartTime VARCHAR(20) DEFAULT '16:00:00',
    EveningStopTime VARCHAR(20) DEFAULT '19:00:00',
    VoltageValue VARCHAR(20) DEFAULT '220',
    CurrentValue VARCHAR(20) DEFAULT '10',
    FrequencyValue VARCHAR(20) DEFAULT '50',
    UpdateBy INT DEFAULT 0,
    UpdatedOnDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 13. Geographic Hierarchy Tables
CREATE TABLE IF NOT EXISTS Districts (
    DistrictId INT PRIMARY KEY,
    DistrictName VARCHAR(200) DEFAULT NULL,
    DistrictCode VARCHAR(10) DEFAULT NULL,
    LuminaryTarget INT NOT NULL DEFAULT 0,
    CreatedOnDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Blocks (
    BlockId INT PRIMARY KEY,
    DistrictId INT DEFAULT NULL,
    BlockName VARCHAR(200) DEFAULT NULL,
    BlockCode VARCHAR(10) DEFAULT NULL,
    LuminaryTarget INT NOT NULL DEFAULT 0,
    CreatedOnDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Panchayat (
    PanchayatId INT PRIMARY KEY,
    BlockId INT DEFAULT NULL,
    PanchayatName VARCHAR(200) DEFAULT NULL,
    PanchayatCode VARCHAR(10) DEFAULT NULL,
    LuminaryTarget INT NOT NULL DEFAULT 0,
    CreatedOnDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 14. Street Light Tables
CREATE TABLE IF NOT EXISTS Networks (
    NetworkId INT AUTO_INCREMENT PRIMARY KEY,
    NetworkName VARCHAR(200) DEFAULT NULL,
    DistrictId INT DEFAULT NULL,
    BlockId INT DEFAULT NULL,
    PanchayatId INT DEFAULT NULL,
    TotalLights INT DEFAULT 0,
    CreatedOnDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Lights (
    LightId INT AUTO_INCREMENT PRIMARY KEY,
    NetworkId INT DEFAULT 0,
    DistrictId INT DEFAULT 0,
    BlockId INT DEFAULT 0,
    PanchayatId INT DEFAULT 0,
    WardNo VARCHAR(50) DEFAULT '1',
    PoleNo VARCHAR(100) DEFAULT NULL,
    IMEINo VARCHAR(30) DEFAULT NULL,
    Status INT DEFAULT 0,
    FaultStatus INT DEFAULT 0,
    BatStateCharge INT DEFAULT 1,
    EnergyKWH DECIMAL(10, 2) DEFAULT 0.00,
    CreatedOnDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS LuminaryInstall (
    InstallId INT AUTO_INCREMENT PRIMARY KEY,
    LightId INT DEFAULT 0,
    IMEINo VARCHAR(30) DEFAULT NULL,
    InstallDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    InstallerName VARCHAR(100) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS FaultLogs (
    FaultId INT AUTO_INCREMENT PRIMARY KEY,
    LightId INT DEFAULT 0,
    IMEINo VARCHAR(30) DEFAULT NULL,
    FaultCode VARCHAR(50) DEFAULT NULL,
    FaultDesc TEXT DEFAULT NULL,
    RestBy INT DEFAULT 0,
    LoggedDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 15. DBLogs Table
CREATE TABLE IF NOT EXISTS DBLogs (
    Sno INT AUTO_INCREMENT PRIMARY KEY,
    FileName VARCHAR(255) DEFAULT NULL,
    CreateDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initial seed data
INSERT IGNORE INTO Users (Sno, UserId, UPassword, Name, MobileNo, IsActive, CMSUserType, UserType)
VALUES (1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'System Administrator', '9876543210', 1, 1, 1);

INSERT IGNORE INTO RMSCalibration (SNo, MorningStartTime, MorningStopTime, EveningStartTime, EveningStopTime, VoltageValue, CurrentValue, FrequencyValue)
VALUES (1, '06:00:00', '10:00:00', '16:00:00', '19:00:00', '220', '10', '50');

-- 24 Districts of Jharkhand Seed Data
INSERT IGNORE INTO Districts (DistrictId, DistrictName, DistrictCode, LuminaryTarget) VALUES
(1, 'Ranchi', 'RAN', 5000),
(2, 'Hazaribagh', 'HAZ', 3500),
(3, 'Gumla', 'GUM', 2500),
(4, 'Chatra', 'CHA', 2000),
(5, 'Koderma', 'KOD', 2000),
(6, 'East Singbhum', 'ESB', 4500),
(7, 'Lohardga', 'LOH', 1800),
(8, 'Bokaro', 'BOK', 4000),
(9, 'Saraikela', 'SAR', 3000),
(10, 'Jamtara', 'JAM', 2000),
(11, 'Simdega', 'SIM', 2000),
(12, 'Ramghar', 'RAM', 2500),
(13, 'West Singbhum', 'WSB', 4000),
(14, 'Garhwa', 'GAR', 2500),
(15, 'Deoghar', 'DEO', 3500),
(16, 'Godda', 'GOD', 2500),
(17, 'Sahebganj', 'SAH', 3000),
(18, 'Giridih', 'GIR', 4000),
(19, 'Latehar', 'LAT', 2000),
(20, 'Palamu', 'PAL', 3500),
(21, 'Dumka', 'DUM', 3000),
(22, 'Pakur', 'PAK', 2000),
(23, 'Dhanbad', 'DHN', 5000),
(24, 'Khunti', 'KHU', 2000);

-- Menu items seed data
INSERT IGNORE INTO Menu (MenuId, GroupMenuId, MenuName, MenuLink, MenuOrder) VALUES
(1, 1, 'Dashboard', 'Dashboard.php', 1),
(2, 2, 'Add Distributor', 'AddDistributor.php', 1),
(3, 2, 'Manage Distributors', 'ManageDistributors.php', 2),
(4, 2, 'Allocate Distributor', 'AllocateDistributor.php', 3),
(5, 3, 'Add Customer', 'AddCustomer.php', 1),
(6, 3, 'Manage Customers', 'ManageCustomers.php', 2),
(7, 7, 'Add Organization', 'AddOrganization.php', 1),
(8, 7, 'Manage Organizations', 'ManageOrganizations.php', 2),
(9, 8, 'Add Inventory', 'AddInventory.php', 1),
(10, 8, 'Manage Inventory', 'ManageInventory.php', 2),
(11, 8, 'Allocate Hub', 'AllocateHub.php', 3),
(12, 4, 'Add RMS', 'AddRMS.php', 1),
(13, 4, 'Manage RMS', 'ManageRMS.php', 2),
(14, 4, 'On Off Pump', 'OnOffPump.php', 3),
(15, 4, 'View Pump Status', 'ViewPumpStatus.php', 4),
(16, 4, 'Calibrate RMS', 'CalibrateRMS.php', 5),
(17, 4, 'RMS Calibration', 'RMSCalibration.php', 6),
(18, 9, 'Reset RMS Log Time', 'RMSTime.php', 1),
(19, 9, 'Data Logs Automation', 'DataPush.php', 2),
(20, 5, 'Add CMS User', 'AddUser.php', 1),
(21, 5, 'Manage CMS User', 'ManageUser.php', 2),
(22, 5, 'User Login History', 'UserLoginHistory.php', 3),
(23, 6, 'Custom Report', 'CustomReport.php', 1),
(24, 6, 'On Off Report', 'OnOffReport.php', 2),
(25, 6, 'Fault Report', 'FaultReport.php', 3),
(26, 6, 'Latest Log Report', 'LatestLogReport.php', 4),
(27, 6, 'Log Report', 'LogReport.php', 5),
(28, 6, 'Recent Logs', 'RecentLogs.php', 6),
(29, 6, 'SIM Status', 'SIMStatus.php', 7),
(30, 6, 'SIM Active On', 'SIMActiveOn.php', 8),
(31, 6, 'QR Data', 'QRData.php', 9),
(32, 6, 'LPM Calculation', 'LPMCalculation.php', 10);
