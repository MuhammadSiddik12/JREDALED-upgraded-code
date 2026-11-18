import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface RMSInventoryAttributes {
  SNo?: number;
  HubId?: number;
  IMEINo: string;
  RMSMobileNo?: string | null;
  SIMId?: string | null;
  SIMProvider?: string | null;
  SIMActiveOn?: string | null;
  SIMExpiredOn?: string | null;
  ControllerSerialNo?: string | null;
  ControllerModel?: string | null;
  MotorType?: string | null;
  PumpCategory?: string | null;
  PumpSetSerialNo?: string | null;
  MotorHP?: string | null;
  MotorHeadSize?: string | null;
  CreatedBy?: number;
  CreatedOnDate?: Date;
}

export class RMSInventory extends Model<RMSInventoryAttributes> implements RMSInventoryAttributes {
  public SNo!: number;
  public HubId!: number;
  public IMEINo!: string;
  public RMSMobileNo!: string | null;
  public SIMId!: string | null;
  public SIMProvider!: string | null;
  public SIMActiveOn!: string | null;
  public SIMExpiredOn!: string | null;
  public ControllerSerialNo!: string | null;
  public ControllerModel!: string | null;
  public MotorType!: string | null;
  public PumpCategory!: string | null;
  public PumpSetSerialNo!: string | null;
  public MotorHP!: string | null;
  public MotorHeadSize!: string | null;
  public CreatedBy!: number;
  public CreatedOnDate!: Date;
}

RMSInventory.init(
  {
    SNo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    HubId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    IMEINo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    RMSMobileNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    SIMId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    SIMProvider: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    SIMActiveOn: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    SIMExpiredOn: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ControllerSerialNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ControllerModel: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    MotorType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    PumpCategory: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    PumpSetSerialNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    MotorHP: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    MotorHeadSize: {
      type: DataTypes.STRING(20),
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
  },
  {
    sequelize,
    tableName: 'RMSInventory',
    timestamps: false,
  }
);
