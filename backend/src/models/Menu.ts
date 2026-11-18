import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface MenuAttributes {
  MenuId: number;
  GroupMenuId?: number;
  MenuName?: string | null;
  MenuLink?: string | null;
  MenuOrder?: number;
  CreatedOnDate?: Date;
  UpdatedOnDate?: Date;
}

export class Menu extends Model<MenuAttributes> implements MenuAttributes {
  public MenuId!: number;
  public GroupMenuId!: number;
  public MenuName!: string | null;
  public MenuLink!: string | null;
  public MenuOrder!: number;
  public CreatedOnDate!: Date;
  public UpdatedOnDate!: Date;
}

Menu.init(
  {
    MenuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    GroupMenuId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    MenuName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    MenuLink: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    MenuOrder: {
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
    tableName: 'Menu',
    timestamps: false,
  }
);
