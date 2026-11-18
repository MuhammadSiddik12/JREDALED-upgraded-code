import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface DBLogsAttributes {
  Sno?: number;
  FileName?: string | null;
  CreateDate?: Date;
}

export class DBLogs extends Model<DBLogsAttributes> implements DBLogsAttributes {
  public Sno!: number;
  public FileName!: string | null;
  public CreateDate!: Date;
}

DBLogs.init(
  {
    Sno: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
