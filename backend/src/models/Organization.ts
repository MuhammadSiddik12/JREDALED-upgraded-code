import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface OrganizationAttributes {
  OrgId?: number;
  OrgName: string;
  OrgEmail?: string | null;
  OrgMobile?: string | null;
  OrgAddress?: string | null;
  OrgState?: string | null;
  IsActive?: number;
  CreatedBy?: number;
  CreatedOnDate?: Date;
}

export class Organization extends Model<OrganizationAttributes> implements OrganizationAttributes {
  declare OrgId: number;
  declare OrgName: string;
  declare OrgEmail: string | null;
  declare OrgMobile: string | null;
  declare OrgAddress: string | null;
  declare OrgState: string | null;
  declare IsActive: number;
  declare CreatedBy: number;
  declare CreatedOnDate: Date;
}

Organization.init(
  {
    OrgId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    OrgName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    OrgEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    OrgMobile: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    OrgAddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    OrgState: {
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
    tableName: 'Organization',
    timestamps: false,
  }
);
