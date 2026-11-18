import { sequelize } from '../config/database.js';
import { User } from './User.js';
import { UserLoginHistory } from './UserLoginHistory.js';
import { Menu } from './Menu.js';
import { UserAccessLevel } from './UserAccessLevel.js';
import { Distributor } from './Distributor.js';
import { Customer } from './Customer.js';
import { Organization } from './Organization.js';
import { RMSControllerPump } from './RMSControllerPump.js';
import { PumpLogs } from './PumpLogs.js';
import { PumpOnOffCycle } from './PumpOnOffCycle.js';
import { RMSInventory } from './RMSInventory.js';
import { RMSCalibration } from './RMSCalibration.js';
import { Districts } from './Districts.js';
import { Blocks } from './Blocks.js';
import { Panchayat } from './Panchayat.js';
import { Networks } from './Networks.js';
import { Lights } from './Lights.js';
import { LuminaryInstall } from './LuminaryInstall.js';
import { FaultLogs } from './FaultLogs.js';
import { DBLogs } from './DBLogs.js';

// Define relationships
Blocks.belongsTo(Districts, { foreignKey: 'DistrictId', targetKey: 'DistrictId' });
Districts.hasMany(Blocks, { foreignKey: 'DistrictId', sourceKey: 'DistrictId' });

Panchayat.belongsTo(Blocks, { foreignKey: 'BlockId', targetKey: 'BlockId' });
Blocks.hasMany(Panchayat, { foreignKey: 'BlockId', sourceKey: 'BlockId' });

UserAccessLevel.belongsTo(Menu, { foreignKey: 'MenuId', targetKey: 'MenuId' });
Menu.hasMany(UserAccessLevel, { foreignKey: 'MenuId', sourceKey: 'MenuId' });

export {
  sequelize,
  User,
  UserLoginHistory,
  Menu,
  UserAccessLevel,
  Distributor,
  Customer,
  Organization,
  RMSControllerPump,
  PumpLogs,
  PumpOnOffCycle,
  RMSInventory,
  RMSCalibration,
  Districts,
  Blocks,
  Panchayat,
  Networks,
  Lights,
  LuminaryInstall,
  FaultLogs,
  DBLogs,
};
