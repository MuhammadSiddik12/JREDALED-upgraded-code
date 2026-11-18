import { Request, Response } from 'express';
import { RMSControllerPump, PumpLogs, RMSCalibration } from '../models/index.js';
import { current_datetime } from '../helpers/phpCompat.js';

export async function handleTelemetry(req: Request, res: Response): Promise<void> {
  const frame = (req.query.f || req.body.f || '') as string;
  if (!frame) {
    res.status(400).send('Invalid frame');
    return;
  }

  const pieces = frame.split(',');
  const imeiNo = pieces[0]?.trim();

  if (!imeiNo) {
    res.status(400).send('Missing IMEI');
    return;
  }

  let rms = await RMSControllerPump.findOne({ where: { IMEINo: imeiNo } });
  if (!rms) {
    rms = await RMSControllerPump.create({
      IMEINo: imeiNo,
      RMSBlock: 2,
      FrequencyCutOff: 50,
      CloudDelay: 0,
      AutoOnStatus: 1,
      IsActive: 1,
    });
  }

  const rmsBlock = rms.RMSBlock ?? 2;
  const frequencyCutOff = String(rms.FrequencyCutOff ?? 0).padStart(4, '0');
  const cloudDelay = String(rms.CloudDelay ?? 0).padStart(2, '0');
  const autoOnStatus = rms.AutoOnStatus ?? 1;

  // Extract packet values matching k.php
  const powerStatus = parseInt(pieces[1] || '0', 10);
  const pumpStatus = parseInt(pieces[2] || '0', 10);
  const pumpError = pieces[3] || '';
  const voltage = pieces[4] || '0';
  const current = pieces[5] || '0';
  const frequency = pieces[6] || '0';
  const temperature = pieces[7] || '0';
  const phaseCurrentRYB = pieces[9] || '';
  const gsmSignal = pieces[10] || '';
  const manualCommand = parseInt(pieces[12] || '0', 10);
  const controllerModel = pieces[13] || '';
  const simId = pieces[16] || '';
  const extraReserved = 'RRRR';

  const now = new Date();

  // Log into PumpLogs
  await PumpLogs.create({
    DistId: rms.DistId,
    IMEINo: imeiNo,
    SIMId: simId || rms.SIMId,
    PowerStatus: powerStatus,
    PumpStatus: pumpStatus,
    PumpError: pumpError,
    Voltage: voltage,
    Current: current,
    Frequency: frequency,
    Temperature: temperature,
    PhaseCurrentRYB: phaseCurrentRYB,
    GSMSignal: gsmSignal,
    LPM: '0',
    Longitude: rms.Longitude,
    Latitude: rms.Latitude,
    ExtraReserved: extraReserved,
    LogDateTime: now,
  });

  // Update RMS controller state
  await rms.update({
    PowerStatus: powerStatus,
    PumpStatus: pumpStatus,
    PumpError: pumpError,
    Voltage: voltage,
    Current: current,
    Frequency: frequency,
    Temperature: temperature,
    PhaseCurrentRYB: phaseCurrentRYB,
    GSMSignal: gsmSignal,
    LastLogDateTime: now,
    ...(controllerModel ? { ControllerModel: controllerModel } : {}),
    ...(simId ? { SIMId: simId } : {}),
  });

  // Respond with exact PHP IoT protocol string
  const responseStr = `In$${rmsBlock}$${frequencyCutOff}$${cloudDelay}$${autoOnStatus}$#`;
  res.setHeader('Content-Type', 'text/plain');
  res.send(responseStr);
}

export async function handleCommandPoll(req: Request, res: Response): Promise<void> {
  const frame = (req.query.f || req.body.f || '') as string;
  if (!frame) {
    res.status(400).send('Invalid command frame');
    return;
  }

  const pieces = frame.split(',');
  const imeiNo = pieces[0]?.trim();
  const pumpStatus = parseInt(pieces[1] || '0', 10);
  const manualCommand = parseInt(pieces[2] || '0', 10);

  if (!imeiNo) {
    res.status(400).send('Missing IMEI');
    return;
  }

  const rms = await RMSControllerPump.findOne({ where: { IMEINo: imeiNo } });
  if (!rms) {
    res.send('Cmd$0$#');
    return;
  }

  await rms.update({
    PumpStatus: pumpStatus,
    ...(manualCommand === 1 || manualCommand === 2 ? { PumpCommand: manualCommand } : {}),
  });

  const responseStr = `Cmd$${rms.PumpCommand ?? 0}$#`;
  res.setHeader('Content-Type', 'text/plain');
  res.send(responseStr);
}
