import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface DistributorAttributes {
  DistId?: number;
  DistName: string;
  DistEmail?: string | null;
  DistMobile?: string | null;
  DistAddress?: string | null;
  LoginId?: string | null;
  IsActive?: number;
  CreatedBy?: number;
  CreatedOnDate?: Date;
}

export class Distributor extends Model<DistributorAttributes> implements DistributorAttributes {
  declare DistId: number;
  declare DistName: string;
  declare DistEmail: string | null;
  declare DistMobile: string | null;
  declare DistAddress: string | null;
  declare LoginId: string | null;
  declare IsActive: number;
  declare CreatedBy: number;
  declare CreatedOnDate: Date;
}

Distributor.init(
  {
    DistId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DistName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    DistEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    DistMobile: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    DistAddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    LoginId: {
      type: DataTypes.STRING(50),
      allowNull: true,
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
    tableName: 'Distributor',
    timestamps: false,
  }
);
