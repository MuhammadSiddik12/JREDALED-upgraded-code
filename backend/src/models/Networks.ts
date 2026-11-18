import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface NetworksAttributes {
  NetworkId?: number;
  NetworkName?: string | null;
  StateId?: number | null;
  DistrictId?: number | null;
  BlockId?: number | null;
  PanchayatId?: number | null;
  Village?: string | null;
  VendorId?: number | null;
  IsActive?: number;
  CreatedBy?: number;
  CreatedOnDate?: Date;
}

export class Networks extends Model<NetworksAttributes> implements NetworksAttributes {
  declare NetworkId: number;
  declare NetworkName: string | null;
  declare StateId: number | null;
  declare DistrictId: number | null;
  declare BlockId: number | null;
  declare PanchayatId: number | null;
  declare Village: string | null;
  declare VendorId: number | null;
  declare IsActive: number;
  declare CreatedBy: number;
  declare CreatedOnDate: Date;
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
    StateId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
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
    Village: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    VendorId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    IsActive: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
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
    tableName: 'Networks',
    timestamps: false,
  }
);
