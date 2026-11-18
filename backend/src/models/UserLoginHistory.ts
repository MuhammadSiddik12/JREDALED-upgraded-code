import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface UserLoginHistoryAttributes {
  SNo?: number;
  UserId?: number;
  LoginTime?: Date;
  SessionId?: string | null;
  PlatformInfo?: string | null;
  AppType?: number;
  AppIP?: string | null;
  Latitude?: string | null;
  Longitude?: string | null;
  Accuracy?: string | null;
}

export class UserLoginHistory extends Model<UserLoginHistoryAttributes> implements UserLoginHistoryAttributes {
  declare SNo: number;
  declare UserId: number;
  declare LoginTime: Date;
  declare SessionId: string | null;
  declare PlatformInfo: string | null;
  declare AppType: number;
  declare AppIP: string | null;
  declare Latitude: string | null;
  declare Longitude: string | null;
  declare Accuracy: string | null;
}

UserLoginHistory.init(
  {
    SNo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    LoginTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    SessionId: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    PlatformInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    AppType: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    AppIP: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Accuracy: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'UserLoginHistory',
    timestamps: false,
  }
);
