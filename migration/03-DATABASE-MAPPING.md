# 03 - Database Mapping: JREDALED

## Overview

- **Source Database:** MySQL 5.7/8.0 (`smartled_jreda2`)
- **Target ORM:** Sequelize v6 + `mysql2` driver (Strict TypeScript models)
- **Target Database:** MySQL 8.0 (`smartled_jreda2`)
- **Zero Schema Redefinition Rule:** Table names, column names, column data types, defaults, and key constraints are preserved with 100% fidelity.

---

## Complete Table Mappings

### 1. `Users`
- **Primary Key:** `Sno` (INT, AUTO_INCREMENT)
- **Columns:**
  - `UserId` VARCHAR(200) UNIQUE
  - `UPassword` VARCHAR(255)
  - `Name` VARCHAR(200)
  - `MobileNo` VARCHAR(200)
  - `IsActive` INT DEFAULT 1
  - `CMSUserType` INT DEFAULT 0
  - `AppUserType` INT DEFAULT 0
  - `VendorLogo` INT DEFAULT 1
  - `UserType` INT DEFAULT 0
  - `CreatedBy` INT DEFAULT 0
  - `CreatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP
  - `UpdatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

### 2. `UserLoginHistory`
- **Primary Key:** `SNo` (INT, AUTO_INCREMENT)
- **Columns:**
  - `UserId` INT
  - `LoginTime` DATETIME DEFAULT CURRENT_TIMESTAMP
  - `SessionId` VARCHAR(200)
  - `PlatformInfo` TEXT
  - `AppType` INT DEFAULT 1
  - `AppIP` VARCHAR(200)
  - `Latitude` VARCHAR(20)
  - `Longitude` VARCHAR(20)
  - `Accuracy` VARCHAR(20)

### 3. `Menu`
- **Primary Key:** `MenuId` (INT)
- **Columns:**
  - `GroupMenuId` INT DEFAULT 0
  - `MenuName` VARCHAR(255)
  - `MenuLink` VARCHAR(200)
  - `MenuOrder` INT DEFAULT 0
  - `CreatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP
  - `UpdatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP

### 4. `UserAccessLevel`
- **Primary Key:** `SNo` (INT, AUTO_INCREMENT)
- **Columns:**
  - `UserId` INT
  - `GroupMenuId` INT
  - `MenuId` INT
  - `MenuOrder` INT
  - `CreatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP

### 5. `Distributor`
- **Primary Key:** `DistId` (INT, AUTO_INCREMENT)
- **Columns:**
  - `DistName` VARCHAR(100) NOT NULL
  - `DistEmail` VARCHAR(100)
  - `DistMobile` VARCHAR(20)
  - `DistAddress` VARCHAR(255)
  - `LoginId` VARCHAR(50)
  - `IsActive` INT DEFAULT 1
  - `CreatedBy` INT DEFAULT 0
  - `CreatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP

### 6. `Customer`
- **Primary Key:** `CustId` (INT, AUTO_INCREMENT)
- **Columns:**
  - `DistId` INT DEFAULT 0
  - `CustName` VARCHAR(100) NOT NULL
  - `CustEmail` VARCHAR(100)
  - `CustMobile` VARCHAR(20)
  - `CustAddress` VARCHAR(255)
  - `LoginId` VARCHAR(50)
  - `IsActive` INT DEFAULT 1
  - `CreatedBy` INT DEFAULT 0
  - `CreatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP

### 7. `Organization`
- **Primary Key:** `OrgId` (INT, AUTO_INCREMENT)
- **Columns:**
  - `OrgName` VARCHAR(100) NOT NULL
  - `OrgEmail` VARCHAR(100)
  - `OrgMobile` VARCHAR(20)
  - `OrgAddress` VARCHAR(255)
  - `OrgState` VARCHAR(50)
  - `IsActive` INT DEFAULT 1
  - `CreatedBy` INT DEFAULT 0
  - `CreatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP

### 8. `RMSControllerPump`
- **Primary Key:** `SNo` (INT, AUTO_INCREMENT)
- **Columns:**
  - `DistId` INT DEFAULT 0
  - `OrgId` INT DEFAULT 0
  - `CustId` INT DEFAULT 0
  - `IMEINo` VARCHAR(30) UNIQUE NOT NULL
  - `RMSMobileNo` VARCHAR(20)
  - `ControllerSerialNo` VARCHAR(50)
  - `ControllerLocation` VARCHAR(255)
  - `ControllerModel` VARCHAR(50)
  - `ControllerManufacturer` VARCHAR(100)
  - `Longitude` VARCHAR(50) DEFAULT '0'
  - `Latitude` VARCHAR(50) DEFAULT '0'
  - `MotorType` INT DEFAULT 1
  - `PumpCategory` VARCHAR(50)
  - `PumpSetSerialNo` VARCHAR(50)
  - `MotorHP` VARCHAR(20)
  - `MotorHeadSize` VARCHAR(20)
  - `FrequencyCutOff` INT DEFAULT 0
  - `ProductType` INT DEFAULT 3
  - `PowerStatus` INT DEFAULT 0
  - `PumpStatus` INT DEFAULT 0
  - `PumpError` VARCHAR(50) DEFAULT ''
  - `Voltage` VARCHAR(20) DEFAULT '0'
  - `Current` VARCHAR(20) DEFAULT '0'
  - `Frequency` VARCHAR(20) DEFAULT '0'
  - `Temperature` VARCHAR(20) DEFAULT '0'
  - `PhaseCurrentRYB` VARCHAR(100) DEFAULT ''
  - `ExtraReserved` VARCHAR(100) DEFAULT 'RRRR'
  - `GSMSignal` VARCHAR(20) DEFAULT ''
  - `SIMId` VARCHAR(50) DEFAULT ''
  - `RMSBlock` INT DEFAULT 2
  - `CloudDelay` INT DEFAULT 0
  - `AutoOnStatus` INT DEFAULT 1
  - `Data_Calibration` INT DEFAULT 0
  - `PumpCommand` INT DEFAULT 0
  - `DataPush` INT DEFAULT 0
  - `ServerDelay` INT DEFAULT 0
  - `LastLogDateTime` DATETIME
  - `IsActive` INT DEFAULT 1
  - `CreatedBy` INT DEFAULT 0
  - `CreatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP

### 9. `PumpLogs`
- **Primary Key:** `SNo` (INT, AUTO_INCREMENT)
- **Columns:**
  - `DistId` INT DEFAULT 0
  - `IMEINo` VARCHAR(30) NOT NULL
  - `SIMId` VARCHAR(50)
  - `PowerStatus` INT DEFAULT 0
  - `PumpStatus` INT DEFAULT 0
  - `PumpError` VARCHAR(50)
  - `Voltage` VARCHAR(20)
  - `Current` VARCHAR(20)
  - `Frequency` VARCHAR(20)
  - `Temperature` VARCHAR(20)
  - `PhaseCurrentRYB` VARCHAR(100)
  - `GSMSignal` VARCHAR(20)
  - `LPM` VARCHAR(20)
  - `Longitude` VARCHAR(50)
  - `Latitude` VARCHAR(50)
  - `ExtraReserved` VARCHAR(100)
  - `LogDateTime` DATETIME DEFAULT CURRENT_TIMESTAMP

### 10. `PumpOnOffCycle`
- **Primary Key:** `SNo` (INT, AUTO_INCREMENT)
- **Columns:**
  - `DistId` INT DEFAULT 0
  - `IMEINo` VARCHAR(30) NOT NULL
  - `PumpOnTime` DATETIME
  - `PumpOffTime` DATETIME
  - `CycleStatus` INT DEFAULT 1

### 11. `RMSInventory`
- **Primary Key:** `SNo` (INT, AUTO_INCREMENT)
- **Columns:**
  - `HubId` INT DEFAULT 0
  - `IMEINo` VARCHAR(30) UNIQUE NOT NULL
  - `RMSMobileNo` VARCHAR(20)
  - `SIMId` VARCHAR(50)
  - `SIMProvider` VARCHAR(50)
  - `SIMActiveOn` VARCHAR(50)
  - `SIMExpiredOn` VARCHAR(50)
  - `ControllerSerialNo` VARCHAR(50)
  - `ControllerModel` VARCHAR(50)
  - `MotorType` VARCHAR(50)
  - `PumpCategory` VARCHAR(50)
  - `PumpSetSerialNo` VARCHAR(50)
  - `MotorHP` VARCHAR(20)
  - `MotorHeadSize` VARCHAR(20)
  - `CreatedBy` INT DEFAULT 0
  - `CreatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP

### 12. `RMSCalibration`
- **Primary Key:** `SNo` (INT, AUTO_INCREMENT)
- **Columns:**
  - `MorningStartTime` VARCHAR(20)
  - `MorningStopTime` VARCHAR(20)
  - `EveningStartTime` VARCHAR(20)
  - `EveningStopTime` VARCHAR(20)
  - `VoltageValue` VARCHAR(20)
  - `CurrentValue` VARCHAR(20)
  - `FrequencyValue` VARCHAR(20)
  - `UpdateBy` INT DEFAULT 0
  - `UpdatedOnDate` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

### 13. `Districts`, `Blocks`, `Panchayat`
- Geographic reference tables for the 24 districts of Jharkhand, with hierarchical child blocks and panchayats.

### 14. `Lights`, `LuminaryInstall`, `FaultLogs`
- Tables tracking solar street lights, network controllers, installation dates, and real-time fault records.

### 15. `DBLogs`
- **Columns:** `Sno`, `FileName`, `CreateDate`.
