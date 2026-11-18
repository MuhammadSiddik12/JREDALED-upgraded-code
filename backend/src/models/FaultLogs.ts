import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface FaultLogsAttributes {
  SNo?: number;
  VendorId?: number;
  NetworkId?: number;
  StateId?: number;
  DistrictId?: number;
  BlockId?: number;
  PanchayatId?: number;
  Village?: string | null;
  LightId?: number;
  IMEINo?: string | null;
  FaultTypeId?: number;
  FaultDateTime?: Date;
  RestBy?: number;
  RestDateTime?: Date | null;
  UpdatedOnDate?: Date | null;
}

export class FaultLogs extends Model<FaultLogsAttributes> implements FaultLogsAttributes {
  declare SNo: number;
  declare VendorId: number;
  declare NetworkId: number;
  declare StateId: number;
  declare DistrictId: number;
  declare BlockId: number;
  declare PanchayatId: number;
  declare Village: string | null;
  declare LightId: number;
  declare IMEINo: string | null;
  declare FaultTypeId: number;
  declare FaultDateTime: Date;
  declare RestBy: number;
  declare RestDateTime: Date | null;
  declare UpdatedOnDate: Date | null;
}

FaultLogs.init(
  {
    SNo: {
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
    StateId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
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
    LightId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    IMEINo: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    FaultTypeId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    FaultDateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    RestBy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    RestDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    UpdatedOnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'FaultLogs',
    timestamps: false,
  }
);
