import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface LightsAttributes {
  LightId?: number;
  VendorId?: number;
  NetworkId?: number;
  DistrictId?: number;
  BlockId?: number;
  PanchayatId?: number;
  Village?: string | null;
  PRDPoleId?: string | null;
  IMEINo?: string | null;
  LightSerialNo?: string | null;
  PanelSerialNo?: string | null;
  BatSerialNo?: string | null;
  RMSMobileNo?: string | null;
  BatVoltage?: number;
  BatCurrent?: number;
  BatPower?: number;
  PanelVoltage?: number;
  PanelCurrent?: number;
  PanelPower?: number;
  LoadVoltage?: number;
  LoadCurrent?: number;
  LoadPower?: number;
  BatStateCharge?: number;
  BatDepthDischarge?: number;
  SystemStatus?: number;
  LedStatus?: number;
  TodayOnTime?: number;
  TotalOnTime?: number;
  LedCommand?: number;
  BatteryFault?: number;
  SolarModuleFault?: number;
  LuminaryFault?: number;
  RMSFault?: number;
  FaultStatus?: number;
  Location?: string | null;
  Latitude?: string | null;
  Longitude?: string | null;
  Accuracy?: string | null;
  OnTime?: string | null;
  OffTime?: string | null;
  KWH?: number;
  HarvestedEnergy?: number;
  BrightnessLevel?: number;
  LastLogDateTime?: Date | null;
  IsActive?: number;
  SIMId?: string | null;
  FWVersion?: string | null;
  CreatedBy?: number;
  CreatedOnDate?: Date;
  UpdatedOnDate?: Date;
}

export class Lights extends Model<LightsAttributes> implements LightsAttributes {
  declare LightId: number;
  declare VendorId: number;
  declare NetworkId: number;
  declare DistrictId: number;
  declare BlockId: number;
  declare PanchayatId: number;
  declare Village: string | null;
  declare PRDPoleId: string | null;
  declare IMEINo: string | null;
  declare LightSerialNo: string | null;
  declare PanelSerialNo: string | null;
  declare BatSerialNo: string | null;
  declare RMSMobileNo: string | null;
  declare BatVoltage: number;
  declare BatCurrent: number;
  declare BatPower: number;
  declare PanelVoltage: number;
  declare PanelCurrent: number;
  declare PanelPower: number;
  declare LoadVoltage: number;
  declare LoadCurrent: number;
  declare LoadPower: number;
  declare BatStateCharge: number;
  declare BatDepthDischarge: number;
  declare SystemStatus: number;
  declare LedStatus: number;
  declare TodayOnTime: number;
  declare TotalOnTime: number;
  declare LedCommand: number;
  declare BatteryFault: number;
  declare SolarModuleFault: number;
  declare LuminaryFault: number;
  declare RMSFault: number;
  declare FaultStatus: number;
  declare Location: string | null;
  declare Latitude: string | null;
  declare Longitude: string | null;
  declare Accuracy: string | null;
  declare OnTime: string | null;
  declare OffTime: string | null;
  declare KWH: number;
  declare HarvestedEnergy: number;
  declare BrightnessLevel: number;
  declare LastLogDateTime: Date | null;
  declare IsActive: number;
  declare SIMId: string | null;
  declare FWVersion: string | null;
  declare CreatedBy: number;
  declare CreatedOnDate: Date;
  declare UpdatedOnDate: Date;
}

Lights.init(
  {
    LightId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    VendorId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    NetworkId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    DistrictId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    BlockId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    PanchayatId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Village: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    PRDPoleId: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    IMEINo: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    LightSerialNo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    PanelSerialNo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    BatSerialNo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    RMSMobileNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    BatVoltage: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    BatCurrent: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    BatPower: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    PanelVoltage: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    PanelCurrent: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    PanelPower: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    LoadVoltage: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    LoadCurrent: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    LoadPower: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    BatStateCharge: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    BatDepthDischarge: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    SystemStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    LedStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    TodayOnTime: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    TotalOnTime: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.0,
    },
    LedCommand: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    BatteryFault: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    SolarModuleFault: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    LuminaryFault: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    RMSFault: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    FaultStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Accuracy: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    OnTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    OffTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    KWH: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    HarvestedEnergy: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    BrightnessLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    LastLogDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    IsActive: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    SIMId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    FWVersion: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    CreatedOnDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UpdatedOnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Lights',
    timestamps: false,
  }
);
