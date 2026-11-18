import { Request, Response } from 'express';
import { RMSCalibration } from '../models/index.js';
import { calibrationSchema } from '../validators/schemas.js';

export async function getCalibration(_req: Request, res: Response): Promise<void> {
  let calibration = await RMSCalibration.findByPk(1);
  if (!calibration) {
    calibration = await RMSCalibration.create({
      SNo: 1,
      MorningStartTime: '06:00:00',
      MorningStopTime: '10:00:00',
      EveningStartTime: '16:00:00',
      EveningStopTime: '19:00:00',
      VoltageValue: '220',
      CurrentValue: '10',
      FrequencyValue: '50',
    });
  }
  res.json({ success: true, data: calibration });
}

export async function updateCalibration(req: Request, res: Response): Promise<void> {
  const parsed = calibrationSchema.parse(req.body);
  let calibration = await RMSCalibration.findByPk(1);

  if (!calibration) {
    calibration = await RMSCalibration.create({
      SNo: 1,
      ...parsed,
      UpdateBy: req.user?.sno || 0,
    });
  } else {
    await calibration.update({
      ...parsed,
      UpdateBy: req.user?.sno || 0,
      UpdatedOnDate: new Date(),
    });
  }

  res.json({ success: true, message: 'RMS Calibration Updated Sucsessfully !', data: calibration });
}
