import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface PumpLogsAttributes {
  SNo?: number;
  DistId?: number;
  IMEINo: string;
  SIMId?: string | null;
  PowerStatus?: number;
  PumpStatus?: number;
  PumpError?: string | null;
  Voltage?: string | null;
  Current?: string | null;
  Frequency?: string | null;
  Temperature?: string | null;
  PhaseCurrentRYB?: string | null;
  GSMSignal?: string | null;
  LPM?: string | null;
  Longitude?: string | null;
  Latitude?: string | null;
  ExtraReserved?: string | null;
  LogDateTime?: Date;
}

export class PumpLogs extends Model<PumpLogsAttributes> implements PumpLogsAttributes {
  declare SNo: number;
  declare DistId: number;
  declare IMEINo: string;
  declare SIMId: string | null;
  declare PowerStatus: number;
  declare PumpStatus: number;
  declare PumpError: string | null;
  declare Voltage: string | null;
  declare Current: string | null;
  declare Frequency: string | null;
  declare Temperature: string | null;
  declare PhaseCurrentRYB: string | null;
  declare GSMSignal: string | null;
  declare LPM: string | null;
  declare Longitude: string | null;
  declare Latitude: string | null;
  declare ExtraReserved: string | null;
  declare LogDateTime: Date;
}

PumpLogs.init(
  {
    SNo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DistId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    IMEINo: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    SIMId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    PowerStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    PumpStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    PumpError: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Voltage: {
      type: DataTypes.STRING(20),
      defaultValue: '0',
    },
    Current: {
      type: DataTypes.STRING(20),
      defaultValue: '0',
    },
    Frequency: {
      type: DataTypes.STRING(20),
      defaultValue: '0',
    },
    Temperature: {
      type: DataTypes.STRING(20),
      defaultValue: '0',
    },
    PhaseCurrentRYB: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    GSMSignal: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    LPM: {
      type: DataTypes.STRING(20),
      defaultValue: '0',
    },
    Longitude: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ExtraReserved: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    LogDateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'PumpLogs',
    timestamps: false,
  }
);
