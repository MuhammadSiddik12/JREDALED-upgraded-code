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
  public OrgId!: number;
  public OrgName!: string;
  public OrgEmail!: string | null;
  public OrgMobile!: string | null;
  public OrgAddress!: string | null;
  public OrgState!: string | null;
  public IsActive!: number;
  public CreatedBy!: number;
  public CreatedOnDate!: Date;
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
