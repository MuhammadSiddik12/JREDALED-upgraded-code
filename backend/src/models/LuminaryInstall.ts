import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface LuminaryInstallAttributes {
  InstallId?: number;
  LightId?: number;
  IMEINo?: string | null;
  InstallDate?: Date;
  InstallerName?: string | null;
}

export class LuminaryInstall extends Model<LuminaryInstallAttributes> implements LuminaryInstallAttributes {
  public InstallId!: number;
  public LightId!: number;
  public IMEINo!: string | null;
  public InstallDate!: Date;
  public InstallerName!: string | null;
}

LuminaryInstall.init(
  {
    InstallId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    LightId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    IMEINo: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    InstallDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    InstallerName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'LuminaryInstall',
    timestamps: false,
  }
);
