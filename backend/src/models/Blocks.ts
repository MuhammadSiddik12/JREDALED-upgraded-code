import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface BlocksAttributes {
  BlockId: number;
  DistrictId?: number | null;
  BlockName?: string | null;
  BlockCode?: string | null;
  CreatedOnDate?: Date;
}

export class Blocks extends Model<BlocksAttributes> implements BlocksAttributes {
  declare BlockId: number;
  declare DistrictId: number | null;
  declare BlockName: string | null;
  declare BlockCode: string | null;
  declare CreatedOnDate: Date;
}

Blocks.init(
  {
    BlockId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    DistrictId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    BlockName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    BlockCode: {
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
    tableName: 'Blocks',
    timestamps: false,
  }
);
