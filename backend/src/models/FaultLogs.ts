import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface FaultLogsAttributes {
  FaultId?: number;
  LightId?: number;
  IMEINo?: string | null;
  FaultCode?: string | null;
  FaultDesc?: string | null;
  RestBy?: number;
  LoggedDate?: Date;
}

export class FaultLogs extends Model<FaultLogsAttributes> implements FaultLogsAttributes {
  public FaultId!: number;
  public LightId!: number;
  public IMEINo!: string | null;
  public FaultCode!: string | null;
  public FaultDesc!: string | null;
  public RestBy!: number;
  public LoggedDate!: Date;
}

FaultLogs.init(
  {
    FaultId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    LightId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    IMEINo: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    FaultCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    FaultDesc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    RestBy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    LoggedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'FaultLogs',
    timestamps: false,
  }
);
