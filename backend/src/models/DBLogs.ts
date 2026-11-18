import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface DBLogsAttributes {
  SNo?: number;
  FileType?: string | null;
  FileName?: string | null;
  CreateDate?: Date;
}

export class DBLogs extends Model<DBLogsAttributes> implements DBLogsAttributes {
  declare SNo: number;
  declare FileType: string | null;
  declare FileName: string | null;
  declare CreateDate: Date;
}

DBLogs.init(
  {
    SNo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    FileType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    FileName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CreateDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'DBLogs',
    timestamps: false,
  }
);
