import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface DistrictsAttributes {
  DistrictId: number;
  DistrictName?: string | null;
  DistrictCode?: string | null;
  LuminaryTarget?: number;
  CreatedOnDate?: Date;
}

export class Districts extends Model<DistrictsAttributes> implements DistrictsAttributes {
  public DistrictId!: number;
  public DistrictName!: string | null;
  public DistrictCode!: string | null;
  public LuminaryTarget!: number;
  public CreatedOnDate!: Date;
}

Districts.init(
  {
    DistrictId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    DistrictName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    DistrictCode: {
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
    tableName: 'Districts',
    timestamps: false,
  }
);
