import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface PanchayatAttributes {
  PanchayatId: number;
  BlockId?: number | null;
  PanchayatName?: string | null;
  PanchayatCode?: string | null;
  CreatedOnDate?: Date;
}

export class Panchayat extends Model<PanchayatAttributes> implements PanchayatAttributes {
  declare PanchayatId: number;
  declare BlockId: number | null;
  declare PanchayatName: string | null;
  declare PanchayatCode: string | null;
  declare CreatedOnDate: Date;
}

Panchayat.init(
  {
    PanchayatId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    BlockId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PanchayatName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    PanchayatCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    CreatedOnDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Panchayat',
    timestamps: false,
  }
);
