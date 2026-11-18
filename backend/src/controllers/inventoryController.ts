import { Request, Response } from 'express';
import { RMSInventory, RMSControllerPump } from '../models/index.js';
import { inventorySchema } from '../validators/schemas.js';

export async function getInventory(_req: Request, res: Response): Promise<void> {
  const list = await RMSInventory.findAll({ order: [['SNo', 'DESC']] });
  res.json({ success: true, data: list });
}

export async function getInventoryById(req: Request, res: Response): Promise<void> {
  const item = await RMSInventory.findByPk(Number(req.params.id));
  if (!item) {
    res.status(404).json({ success: false, message: 'Inventory item not found' });
    return;
  }
  res.json({ success: true, data: item });
}

export async function createInventory(req: Request, res: Response): Promise<void> {
  const parsed = inventorySchema.parse(req.body);
  const existing = await RMSInventory.findOne({ where: { IMEINo: parsed.IMEINo } });
  if (existing) {
    res.status(400).json({ success: false, message: 'IMEI No Already Exsist !' });
    return;
  }

  const item = await RMSInventory.create({
    ...parsed,
    HubId: parsed.HubId ? Number(parsed.HubId) : 0,
    CreatedBy: req.user?.sno || 0,
  });

  // Sync to controller pump if exists matching PHP InsertInventory.php
  const controller = await RMSControllerPump.findOne({ where: { IMEINo: parsed.IMEINo } });
  if (controller) {
    await controller.update({
      RMSMobileNo: parsed.RMSMobileNo,
      SIMId: parsed.SIMId,
      ControllerSerialNo: parsed.ControllerSerialNo,
      ControllerModel: parsed.ControllerModel,
      MotorType: parsed.MotorType ? Number(parsed.MotorType) : undefined,
      PumpCategory: parsed.PumpCategory,
      PumpSetSerialNo: parsed.PumpSetSerialNo,
      MotorHP: parsed.MotorHP,
      MotorHeadSize: parsed.MotorHeadSize,
    });
  }

  res.json({ success: true, message: 'RMS Inventory Details Added Sucsessfully !', data: item });
}

export async function updateInventory(req: Request, res: Response): Promise<void> {
  const item = await RMSInventory.findByPk(Number(req.params.id));
  if (!item) {
    res.status(404).json({ success: false, message: 'Inventory item not found' });
    return;
  }
  await item.update(req.body);
  res.json({ success: true, message: 'Inventory Details Updated Sucsessfully !', data: item });
}

export async function deleteInventory(req: Request, res: Response): Promise<void> {
  const item = await RMSInventory.findByPk(Number(req.params.id));
  if (!item) {
    res.status(404).json({ success: false, message: 'Inventory item not found' });
    return;
  }
  await item.destroy();
  res.json({ success: true, message: 'Inventory item deleted successfully' });
}

export async function allocateHub(req: Request, res: Response): Promise<void> {
  const { HubId, IMEINos } = req.body;
  if (!HubId || !Array.isArray(IMEINos)) {
    res.status(400).json({ success: false, message: 'Invalid allocation parameters' });
    return;
  }
  await RMSInventory.update({ HubId: Number(HubId) }, { where: { IMEINo: IMEINos } });
  res.json({ success: true, message: 'Hub Allocated Sucsessfully !' });
}
