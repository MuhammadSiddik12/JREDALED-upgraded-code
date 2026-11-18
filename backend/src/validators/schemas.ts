import { z } from 'zod';

export const loginSchema = z.object({
  myUserName: z.string().min(1, 'Username is required'),
  mypassword: z.string().min(1, 'Password is required'),
  ip_address: z.string().optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
});

export const changePasswordSchema = z.object({
  pwd1: z.string().min(1, 'Password is required'),
  pwd2: z.string().min(1, 'Password confirmation is required'),
  UserId: z.string().optional(),
});

export const distributorSchema = z.object({
  DistName: z.string().min(1, 'Distributor name is required'),
  DistEmail: z.string().email().optional().or(z.literal('')),
  DistMobile: z.string().optional(),
  DistAddress: z.string().optional(),
  LoginId: z.string().min(1, 'Login ID is required'),
  UPassword: z.string().min(1, 'Password is required'),
});

export const customerSchema = z.object({
  DistId: z.union([z.string(), z.number()]).optional(),
  CustName: z.string().min(1, 'Customer name is required'),
  CustEmail: z.string().email().optional().or(z.literal('')),
  CustMobile: z.string().optional(),
  CustAddress: z.string().optional(),
  LoginId: z.string().min(1, 'Login ID is required'),
  UPassword: z.string().min(1, 'Password is required'),
});

export const organizationSchema = z.object({
  OrgName: z.string().min(1, 'Organization name is required'),
  OrgEmail: z.string().email().optional().or(z.literal('')),
  OrgMobile: z.string().optional(),
  OrgAddress: z.string().optional(),
  OrgState: z.string().optional(),
});

export const inventorySchema = z.object({
  HubId: z.union([z.string(), z.number()]).optional(),
  IMEINo: z.string().min(1, 'IMEI number is required'),
  RMSMobileNo: z.string().optional(),
  SIMId: z.string().optional(),
  SIMProvider: z.string().optional(),
  SIMActiveOn: z.string().optional(),
  SIMExpiredOn: z.string().optional(),
  ControllerSerialNo: z.string().optional(),
  ControllerModel: z.string().optional(),
  MotorType: z.string().optional(),
  PumpCategory: z.string().optional(),
  PumpSetSerialNo: z.string().optional(),
  MotorHP: z.string().optional(),
  MotorHeadSize: z.string().optional(),
});

export const rmsSchema = z.object({
  DistId: z.union([z.string(), z.number()]).optional(),
  OrgId: z.union([z.string(), z.number()]).optional(),
  IMEINo: z.string().min(1, 'IMEI number is required'),
  RMSMobileNo: z.string().optional(),
  ControllerSerialNo: z.string().optional(),
  ControllerLocation: z.string().optional(),
  ControllerModel: z.string().optional(),
  ControllerManufacturer: z.string().optional(),
  Longitude: z.string().optional(),
  Latitude: z.string().optional(),
  MotorType: z.union([z.string(), z.number()]).optional(),
  PumpCategory: z.string().optional(),
  PumpSetSerialNo: z.string().optional(),
  MotorHP: z.string().optional(),
  MotorHeadSize: z.string().optional(),
  FrequencyCutOff: z.union([z.string(), z.number()]).optional(),
  ProductType: z.union([z.string(), z.number()]).optional(),
});

export const userCreateSchema = z.object({
  Name: z.string().min(1, 'Name is required'),
  UserId: z.string().min(1, 'User ID is required'),
  UPassword: z.string().min(1, 'Password is required'),
  MobileNo: z.string().optional(),
  AppUserType: z.union([z.string(), z.number()]).optional(),
  UserType: z.union([z.string(), z.number()]).optional(),
  accessLevels: z.record(z.string(), z.any()).optional(),
});

export const calibrationSchema = z.object({
  MorningStartTime: z.string().optional(),
  MorningStopTime: z.string().optional(),
  EveningStartTime: z.string().optional(),
  EveningStopTime: z.string().optional(),
  VoltageValue: z.string().optional(),
  CurrentValue: z.string().optional(),
  FrequencyValue: z.string().optional(),
});
