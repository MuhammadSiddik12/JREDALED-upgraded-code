import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface RMSCalibrationAttributes {
  SNo?: number;
  MorningStartTime?: string;
  MorningStopTime?: string;
  EveningStartTime?: string;
  EveningStopTime?: string;
  VoltageValue?: string;
  CurrentValue?: string;
  FrequencyValue?: string;
  UpdateBy?: number;
  UpdatedOnDate?: Date;
}

export class RMSCalibration extends Model<RMSCalibrationAttributes> implements RMSCalibrationAttributes {
  declare SNo: number;
  declare MorningStartTime: string;
  declare MorningStopTime: string;
  declare EveningStartTime: string;
  declare EveningStopTime: string;
  declare VoltageValue: string;
  declare CurrentValue: string;
  declare FrequencyValue: string;
  declare UpdateBy: number;
  declare UpdatedOnDate: Date;
}

RMSCalibration.init(
  {
    SNo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    MorningStartTime: {
      type: DataTypes.STRING(20),
      defaultValue: '06:00:00',
    },
    MorningStopTime: {
      type: DataTypes.STRING(20),
      defaultValue: '10:00:00',
    },
    EveningStartTime: {
      type: DataTypes.STRING(20),
      defaultValue: '16:00:00',
    },
    EveningStopTime: {
      type: DataTypes.STRING(20),
      defaultValue: '19:00:00',
    },
    VoltageValue: {
      type: DataTypes.STRING(20),
      defaultValue: '220',
    },
    CurrentValue: {
      type: DataTypes.STRING(20),
      defaultValue: '10',
    },
    FrequencyValue: {
      type: DataTypes.STRING(20),
      defaultValue: '50',
    },
    UpdateBy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    UpdatedOnDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'RMSCalibration',
    timestamps: false,
  }
);
