import { Request, Response } from 'express';
import { RMSControllerPump } from '../models/index.js';

export async function setPumpCommand(req: Request, res: Response): Promise<void> {
  const { SNo, PumpCommand } = req.body;
  const rms = await RMSControllerPump.findByPk(Number(SNo));
  if (!rms) {
    res.status(404).json({ success: false, message: 'RMS device not found' });
    return;
  }

  const cmd = Number(PumpCommand); // 1 = On, 2 = Off
  await rms.update({ PumpCommand: cmd });
  const actionName = cmd === 1 ? 'On' : 'Off';

  res.json({ success: true, message: `${rms.IMEINo} ${actionName} Sucsessfully !` });
}

export async function setDataPush(req: Request, res: Response): Promise<void> {
  const { SNo, DataPush } = req.body;
  const rms = await RMSControllerPump.findByPk(Number(SNo));
  if (!rms) {
    res.status(404).json({ success: false, message: 'RMS device not found' });
    return;
  }

  const pushStatus = Number(DataPush); // 1 = Data Push On, 2 = Data Push Off
  await rms.update({ DataPush: pushStatus });
  const actionName = pushStatus === 1 ? 'Data Push On' : 'Data Push Off';

  res.json({ success: true, message: `${rms.IMEINo} ${actionName} Sucsessfully !` });
}
