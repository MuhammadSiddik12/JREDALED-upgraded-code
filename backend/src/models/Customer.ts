import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface CustomerAttributes {
  CustId?: number;
  DistId?: number;
  CustName: string;
  CustEmail?: string | null;
  CustMobile?: string | null;
  CustAddress?: string | null;
  LoginId?: string | null;
  IsActive?: number;
  CreatedBy?: number;
  CreatedOnDate?: Date;
}

export class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  declare CustId: number;
  declare DistId: number;
  declare CustName: string;
  declare CustEmail: string | null;
  declare CustMobile: string | null;
  declare CustAddress: string | null;
  declare LoginId: string | null;
  declare IsActive: number;
  declare CreatedBy: number;
  declare CreatedOnDate: Date;
}

Customer.init(
  {
    CustId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DistId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    CustName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    CustEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    CustMobile: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    CustAddress: {
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
    tableName: 'Customer',
    timestamps: false,
  }
);
