import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface UserAccessLevelAttributes {
  SNo?: number;
  UserId: number;
  GroupMenuId: number;
  MenuId: number;
  MenuOrder: number;
  CreatedOnDate?: Date;
}

export class UserAccessLevel extends Model<UserAccessLevelAttributes> implements UserAccessLevelAttributes {
  declare SNo: number;
  declare UserId: number;
  declare GroupMenuId: number;
  declare MenuId: number;
  declare MenuOrder: number;
  declare CreatedOnDate: Date;
}

UserAccessLevel.init(
  {
    SNo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    GroupMenuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MenuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MenuOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CreatedOnDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'UserAccessLevel',
    timestamps: false,
  }
);
