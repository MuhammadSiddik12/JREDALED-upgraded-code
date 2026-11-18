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
  declare FaultId: number;
  declare LightId: number;
  declare IMEINo: string | null;
  declare FaultCode: string | null;
  declare FaultDesc: string | null;
  declare RestBy: number;
  declare LoggedDate: Date;
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
