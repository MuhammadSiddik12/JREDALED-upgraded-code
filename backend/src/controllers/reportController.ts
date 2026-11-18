import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { PumpLogs, PumpOnOffCycle, FaultLogs, RMSInventory, RMSControllerPump } from '../models/index.js';

export async function getCustomReport(req: Request, res: Response): Promise<void> {
  const { startDate, endDate, imei } = req.query;
  const where: any = {};

  if (imei) where.IMEINo = String(imei);
  if (startDate && endDate) {
    where.LogDateTime = {
      [Op.between]: [new Date(String(startDate)), new Date(String(endDate) + ' 23:59:59')],
    };
  }

  const logs = await PumpLogs.findAll({
    where,
    limit: 500,
    order: [['SNo', 'DESC']],
  });

  res.json({ success: true, data: logs });
}

export async function getOnOffReport(req: Request, res: Response): Promise<void> {
  const { startDate, endDate, imei } = req.query;
  const where: any = {};

  if (imei) where.IMEINo = String(imei);
  if (startDate && endDate) {
    where.PumpOnTime = {
      [Op.between]: [new Date(String(startDate)), new Date(String(endDate) + ' 23:59:59')],
    };
  }

  const cycles = await PumpOnOffCycle.findAll({
    where,
    limit: 500,
    order: [['SNo', 'DESC']],
  });

  res.json({ success: true, data: cycles });
}

export async function getFaultReport(req: Request, res: Response): Promise<void> {
  const { imei } = req.query;
  const where: any = {};
  if (imei) where.IMEINo = String(imei);

  const faults = await FaultLogs.findAll({
    where,
    limit: 500,
    order: [['FaultId', 'DESC']],
  });

  res.json({ success: true, data: faults });
}

export async function getLatestLogs(_req: Request, res: Response): Promise<void> {
  const logs = await PumpLogs.findAll({
    limit: 100,
    order: [['SNo', 'DESC']],
  });
  res.json({ success: true, data: logs });
}

export async function getLogs(req: Request, res: Response): Promise<void> {
  const { page = 1, limit = 50, imei } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  const where: any = {};
  if (imei) where.IMEINo = String(imei);

  const { count, rows } = await PumpLogs.findAndCountAll({
    where,
    limit: Number(limit),
    offset,
    order: [['SNo', 'DESC']],
  });

  res.json({
    success: true,
    total: count,
    page: Number(page),
    limit: Number(limit),
    data: rows,
  });
}

export async function getSIMStatus(_req: Request, res: Response): Promise<void> {
  const inventory = await RMSInventory.findAll({
    attributes: ['SNo', 'IMEINo', 'SIMId', 'SIMProvider', 'SIMActiveOn', 'SIMExpiredOn'],
    order: [['SNo', 'DESC']],
  });
  res.json({ success: true, data: inventory });
}

export async function getQRData(_req: Request, res: Response): Promise<void> {
  const list = await RMSControllerPump.findAll({
    attributes: ['SNo', 'IMEINo', 'ControllerSerialNo', 'ControllerModel', 'Longitude', 'Latitude'],
    order: [['SNo', 'DESC']],
  });
  res.json({ success: true, data: list });
}

export async function getLPMCalculation(_req: Request, res: Response): Promise<void> {
  const pumps = await RMSControllerPump.findAll({
    attributes: ['SNo', 'IMEINo', 'MotorHP', 'MotorHeadSize', 'FrequencyCutOff', 'Voltage', 'Current', 'Frequency'],
    order: [['SNo', 'DESC']],
  });
  res.json({ success: true, data: pumps });
}
