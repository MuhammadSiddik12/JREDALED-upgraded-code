import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface LightsAttributes {
  LightId?: number;
  NetworkId?: number;
  DistrictId?: number;
  BlockId?: number;
  PanchayatId?: number;
  WardNo?: string | null;
  PoleNo?: string | null;
  IMEINo?: string | null;
  Status?: number;
  FaultStatus?: number;
  BatStateCharge?: number;
  EnergyKWH?: number;
  CreatedOnDate?: Date;
}

export class Lights extends Model<LightsAttributes> implements LightsAttributes {
  public LightId!: number;
  public NetworkId!: number;
  public DistrictId!: number;
  public BlockId!: number;
  public PanchayatId!: number;
  public WardNo!: string | null;
  public PoleNo!: string | null;
  public IMEINo!: string | null;
  public Status!: number;
  public FaultStatus!: number;
  public BatStateCharge!: number;
  public EnergyKWH!: number;
  public CreatedOnDate!: Date;
}

Lights.init(
  {
    LightId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    WardNo: {
      type: DataTypes.STRING(50),
      defaultValue: '1',
    },
    PoleNo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    IMEINo: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    FaultStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    BatStateCharge: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    EnergyKWH: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    CreatedOnDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Lights',
    timestamps: false,
  }
);
