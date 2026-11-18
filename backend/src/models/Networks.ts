import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface NetworksAttributes {
  NetworkId?: number;
  NetworkName?: string | null;
  DistrictId?: number | null;
  BlockId?: number | null;
  PanchayatId?: number | null;
  TotalLights?: number;
  CreatedOnDate?: Date;
}

export class Networks extends Model<NetworksAttributes> implements NetworksAttributes {
  public NetworkId!: number;
  public NetworkName!: string | null;
  public DistrictId!: number | null;
  public BlockId!: number | null;
  public PanchayatId!: number | null;
  public TotalLights!: number;
  public CreatedOnDate!: Date;
}

Networks.init(
  {
    NetworkId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NetworkName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    DistrictId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    BlockId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PanchayatId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TotalLights: {
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
    tableName: 'Networks',
    timestamps: false,
  }
);
