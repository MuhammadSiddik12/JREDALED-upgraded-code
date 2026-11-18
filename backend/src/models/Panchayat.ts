import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface PanchayatAttributes {
  PanchayatId: number;
  BlockId?: number | null;
  PanchayatName?: string | null;
  PanchayatCode?: string | null;
  LuminaryTarget?: number;
  CreatedOnDate?: Date;
}

export class Panchayat extends Model<PanchayatAttributes> implements PanchayatAttributes {
  public PanchayatId!: number;
  public BlockId!: number | null;
  public PanchayatName!: string | null;
  public PanchayatCode!: string | null;
  public LuminaryTarget!: number;
  public CreatedOnDate!: Date;
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
    LuminaryTarget: {
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
    tableName: 'Panchayat',
    timestamps: false,
  }
);
