import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface RMSControllerPumpAttributes {
  SNo?: number;
  DistId?: number;
  OrgId?: number;
  CustId?: number;
  IMEINo: string;
  RMSMobileNo?: string | null;
  ControllerSerialNo?: string | null;
  ControllerLocation?: string | null;
  ControllerModel?: string | null;
  ControllerManufacturer?: string | null;
  Longitude?: string | null;
  Latitude?: string | null;
  MotorType?: number;
  PumpCategory?: string | null;
  PumpSetSerialNo?: string | null;
  MotorHP?: string | null;
  MotorHeadSize?: string | null;
  FrequencyCutOff?: number;
  ProductType?: number;
  PowerStatus?: number;
  PumpStatus?: number;
  PumpError?: string | null;
  Voltage?: string | null;
  Current?: string | null;
  Frequency?: string | null;
  Temperature?: string | null;
  PhaseCurrentRYB?: string | null;
  ExtraReserved?: string | null;
  GSMSignal?: string | null;
  SIMId?: string | null;
  RMSBlock?: number;
  CloudDelay?: number;
  AutoOnStatus?: number;
  Data_Calibration?: number;
  PumpCommand?: number;
  DataPush?: number;
  ServerDelay?: number;
  LastLogDateTime?: Date | null;
  IsActive?: number;
  CreatedBy?: number;
  CreatedOnDate?: Date;
}

export class RMSControllerPump extends Model<RMSControllerPumpAttributes> implements RMSControllerPumpAttributes {
  public SNo!: number;
  public DistId!: number;
  public OrgId!: number;
  public CustId!: number;
  public IMEINo!: string;
  public RMSMobileNo!: string | null;
  public ControllerSerialNo!: string | null;
  public ControllerLocation!: string | null;
  public ControllerModel!: string | null;
  public ControllerManufacturer!: string | null;
  public Longitude!: string | null;
  public Latitude!: string | null;
  public MotorType!: number;
  public PumpCategory!: string | null;
  public PumpSetSerialNo!: string | null;
  public MotorHP!: string | null;
  public MotorHeadSize!: string | null;
  public FrequencyCutOff!: number;
  public ProductType!: number;
  public PowerStatus!: number;
  public PumpStatus!: number;
  public PumpError!: string | null;
  public Voltage!: string | null;
  public Current!: string | null;
  public Frequency!: string | null;
  public Temperature!: string | null;
  public PhaseCurrentRYB!: string | null;
  public ExtraReserved!: string | null;
  public GSMSignal!: string | null;
  public SIMId!: string | null;
  public RMSBlock!: number;
  public CloudDelay!: number;
  public AutoOnStatus!: number;
  public Data_Calibration!: number;
  public PumpCommand!: number;
  public DataPush!: number;
  public ServerDelay!: number;
  public LastLogDateTime!: Date | null;
  public IsActive!: number;
  public CreatedBy!: number;
  public CreatedOnDate!: Date;
}

RMSControllerPump.init(
  {
    SNo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DistId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    OrgId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    CustId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    IMEINo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    RMSMobileNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ControllerSerialNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ControllerLocation: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ControllerModel: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ControllerManufacturer: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.STRING(50),
      defaultValue: '0',
    },
    Latitude: {
      type: DataTypes.STRING(50),
      defaultValue: '0',
    },
    MotorType: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    PumpCategory: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    PumpSetSerialNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    MotorHP: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    MotorHeadSize: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    FrequencyCutOff: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ProductType: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    PowerStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    PumpStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    PumpError: {
      type: DataTypes.STRING(50),
      defaultValue: '',
    },
    Voltage: {
      type: DataTypes.STRING(20),
      defaultValue: '0',
    },
    Current: {
      type: DataTypes.STRING(20),
      defaultValue: '0',
    },
    Frequency: {
      type: DataTypes.STRING(20),
      defaultValue: '0',
    },
    Temperature: {
      type: DataTypes.STRING(20),
      defaultValue: '0',
    },
    PhaseCurrentRYB: {
      type: DataTypes.STRING(100),
      defaultValue: '',
    },
    ExtraReserved: {
      type: DataTypes.STRING(100),
      defaultValue: 'RRRR',
    },
    GSMSignal: {
      type: DataTypes.STRING(20),
      defaultValue: '',
    },
    SIMId: {
      type: DataTypes.STRING(50),
      defaultValue: '',
    },
    RMSBlock: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    CloudDelay: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    AutoOnStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    Data_Calibration: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    PumpCommand: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    DataPush: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ServerDelay: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    LastLogDateTime: {
      type: DataTypes.DATE,
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
    tableName: 'RMSControllerPump',
    timestamps: false,
  }
);
