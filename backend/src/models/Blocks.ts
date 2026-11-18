import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface BlocksAttributes {
  BlockId: number;
  DistrictId?: number | null;
  BlockName?: string | null;
  BlockCode?: string | null;
  LuminaryTarget?: number;
  CreatedOnDate?: Date;
}

export class Blocks extends Model<BlocksAttributes> implements BlocksAttributes {
  public BlockId!: number;
  public DistrictId!: number | null;
  public BlockName!: string | null;
  public BlockCode!: string | null;
  public LuminaryTarget!: number;
  public CreatedOnDate!: Date;
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
    tableName: 'Blocks',
    timestamps: false,
  }
);
