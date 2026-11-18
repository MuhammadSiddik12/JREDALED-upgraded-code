import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface PumpOnOffCycleAttributes {
  SNo?: number;
  DistId?: number;
  IMEINo: string;
  PumpOnTime?: Date | null;
  PumpOffTime?: Date | null;
  CycleStatus?: number;
}

export class PumpOnOffCycle extends Model<PumpOnOffCycleAttributes> implements PumpOnOffCycleAttributes {
  public SNo!: number;
  public DistId!: number;
  public IMEINo!: string;
  public PumpOnTime!: Date | null;
  public PumpOffTime!: Date | null;
  public CycleStatus!: number;
}

PumpOnOffCycle.init(
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
    PumpOnTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    PumpOffTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    CycleStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'PumpOnOffCycle',
    timestamps: false,
  }
);
