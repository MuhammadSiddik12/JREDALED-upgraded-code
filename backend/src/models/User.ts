import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface UserAttributes {
  Sno?: number;
  UserId: string;
  UPassword: string;
  Name?: string | null;
  MobileNo?: string | null;
  IsActive?: number;
  CMSUserType?: number;
  AppUserType?: number;
  VendorLogo?: number;
  UserType?: number;
  CreatedBy?: number;
  CreatedOnDate?: Date;
  UpdatedOnDate?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  declare Sno: number;
  declare UserId: string;
  declare UPassword: string;
  declare Name: string | null;
  declare MobileNo: string | null;
  declare IsActive: number;
  declare CMSUserType: number;
  declare AppUserType: number;
  declare VendorLogo: number;
  declare UserType: number;
  declare CreatedBy: number;
  declare CreatedOnDate: Date;
  declare UpdatedOnDate: Date;
}

User.init(
  {
    Sno: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    UPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    MobileNo: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    IsActive: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    CMSUserType: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    AppUserType: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    VendorLogo: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    UserType: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    CreatedOnDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UpdatedOnDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: false,
  }
);
