import { Request, Response } from 'express';
import { RMSControllerPump, PumpOnOffCycle, PumpLogs } from '../models/index.js';
import { current_datetime } from '../helpers/phpCompat.js';
import { rmsSchema } from '../validators/schemas.js';

export async function getRMSList(_req: Request, res: Response): Promise<void> {
  const list = await RMSControllerPump.findAll({
    where: { IsActive: 1 },
    order: [['SNo', 'DESC']],
  });
  res.json({ success: true, data: list });
}

export async function getRMSById(req: Request, res: Response): Promise<void> {
  const rms = await RMSControllerPump.findByPk(Number(req.params.id));
  if (!rms) {
    res.status(404).json({ success: false, message: 'RMS device not found' });
    return;
  }
  res.json({ success: true, data: rms });
}

export async function createRMS(req: Request, res: Response): Promise<void> {
  const parsed = rmsSchema.parse(req.body);
  const existing = await RMSControllerPump.findOne({ where: { IMEINo: parsed.IMEINo } });
  if (existing) {
    res.status(400).json({ success: false, message: 'IMEI No Already Exsist !' });
    return;
  }

  const rms = await RMSControllerPump.create({
    ...parsed,
    DistId: parsed.DistId ? Number(parsed.DistId) : 0,
    OrgId: parsed.OrgId ? Number(parsed.OrgId) : 0,
    MotorType: parsed.MotorType ? Number(parsed.MotorType) : 1,
    FrequencyCutOff: parsed.FrequencyCutOff ? Number(parsed.FrequencyCutOff) : 0,
    ProductType: parsed.ProductType ? Number(parsed.ProductType) : 3,
    IsActive: 1,
    CreatedBy: req.user?.sno || 0,
  });

  // Create initial on/off cycle record matching InsertRMS.php
  const now = new Date();
  await PumpOnOffCycle.create({
    DistId: rms.DistId,
    IMEINo: rms.IMEINo,
    PumpOnTime: now,
    PumpOffTime: now,
    CycleStatus: 1,
  });

  res.json({ success: true, message: 'RMS Details Added Sucsessfully !', data: rms });
}

export async function updateRMS(req: Request, res: Response): Promise<void> {
  const rms = await RMSControllerPump.findByPk(Number(req.params.id));
  if (!rms) {
    res.status(404).json({ success: false, message: 'RMS device not found' });
    return;
  }
  await rms.update(req.body);
  res.json({ success: true, message: 'RMS Details Updated Sucsessfully !', data: rms });
}

export async function deleteRMS(req: Request, res: Response): Promise<void> {
  const rms = await RMSControllerPump.findByPk(Number(req.params.id));
  if (!rms) {
    res.status(404).json({ success: false, message: 'RMS device not found' });
    return;
  }

  const imei = rms.IMEINo;
  await rms.destroy();
  await PumpLogs.destroy({ where: { IMEINo: imei } });
  await PumpOnOffCycle.destroy({ where: { IMEINo: imei } });

  res.json({ success: true, message: `${imei} RMS Deleted Sucsessfully !` });
}

export async function blockRMS(req: Request, res: Response): Promise<void> {
  const { SNo, RMSBlock } = req.body;
  const rms = await RMSControllerPump.findByPk(Number(SNo));
  if (!rms) {
    res.status(404).json({ success: false, message: 'RMS device not found' });
    return;
  }

  const blockStatus = Number(RMSBlock); // 1 = Block, 2 = Unblock
  await rms.update({ RMSBlock: blockStatus });
  const action = blockStatus === 1 ? 'Block' : 'Unblock';

  res.json({ success: true, message: `${rms.IMEINo} ${action} Sucsessfully !` });
}

export async function resetRMSTime(req: Request, res: Response): Promise<void> {
  const { IMEINo } = req.body;
  const rms = await RMSControllerPump.findOne({ where: { IMEINo } });
  if (!rms) {
    res.status(404).json({ success: false, message: 'IMEI No Not Exsist !' });
    return;
  }

  await rms.update({ CloudDelay: 0 });
  res.json({ success: true, message: `IMEI No ${IMEINo} Logs Time Reset Sucsessfully !` });
}

export async function resetAllCloudDelay(_req: Request, res: Response): Promise<void> {
  await RMSControllerPump.update({ CloudDelay: 30 }, { where: {} });
  res.json({ success: true, message: 'IMEI No CloudDelay Reset to 30 Sucsessfully !' });
}

export async function calibrateRMSAction(req: Request, res: Response): Promise<void> {
  const { SNo, CalibirateAction } = req.body;
  const rms = await RMSControllerPump.findByPk(Number(SNo));
  if (!rms) {
    res.status(404).json({ success: false, message: 'RMS device not found' });
    return;
  }

  const actionCode = Number(CalibirateAction); // 1 = Calibrated, 2 = Uncalibrate
  await rms.update({ Data_Calibration: actionCode });
  const actionName = actionCode === 1 ? 'Calibirated' : 'Uncalibirate';

  res.json({ success: true, message: `${rms.IMEINo} ${actionName} Sucsessfully !` });
}
