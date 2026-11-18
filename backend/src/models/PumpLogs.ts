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
  public SNo!: number;
  public DistId!: number;
  public IMEINo!: string;
  public SIMId!: string | null;
  public PowerStatus!: number;
  public PumpStatus!: number;
  public PumpError!: string | null;
  public Voltage!: string | null;
  public Current!: string | null;
  public Frequency!: string | null;
  public Temperature!: string | null;
  public PhaseCurrentRYB!: string | null;
  public GSMSignal!: string | null;
  public LPM!: string | null;
  public Longitude!: string | null;
  public Latitude!: string | null;
  public ExtraReserved!: string | null;
  public LogDateTime!: Date;
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
