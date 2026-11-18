import { Request, Response } from 'express';
import { Distributor, User, RMSControllerPump } from '../models/index.js';
import { md5 } from '../helpers/phpCompat.js';
import { distributorSchema } from '../validators/schemas.js';

export async function getDistributors(_req: Request, res: Response): Promise<void> {
  const list = await Distributor.findAll({
    where: { IsActive: 1 },
    order: [['DistId', 'DESC']],
  });
  res.json({ success: true, data: list });
}

export async function getDistributorById(req: Request, res: Response): Promise<void> {
  const dist = await Distributor.findByPk(Number(req.params.id));
  if (!dist) {
    res.status(404).json({ success: false, message: 'Distributor not found' });
    return;
  }
  res.json({ success: true, data: dist });
}

export async function createDistributor(req: Request, res: Response): Promise<void> {
  const parsed = distributorSchema.parse(req.body);
  const { DistName, DistEmail, DistMobile, DistAddress, LoginId, UPassword } = parsed;

  const existingUser = await User.findOne({ where: { UserId: LoginId } });
  if (existingUser) {
    res.status(400).json({ success: false, message: 'Login Id Already Exsist !' });
    return;
  }

  const distributor = await Distributor.create({
    DistName,
    DistEmail: DistEmail || null,
    DistMobile: DistMobile || null,
    DistAddress: DistAddress || null,
    LoginId,
    IsActive: 1,
    CreatedBy: req.user?.sno || 0,
  });

  await User.create({
    Name: DistName,
    UserId: LoginId,
    UPassword: md5(UPassword),
    MobileNo: DistMobile || null,
    UserType: 1,
    IsActive: 1,
    CreatedBy: req.user?.sno || 0,
  });

  res.json({ success: true, message: 'Distributor Details Added Sucsessfully !', data: distributor });
}

export async function updateDistributor(req: Request, res: Response): Promise<void> {
  const dist = await Distributor.findByPk(Number(req.params.id));
  if (!dist) {
    res.status(404).json({ success: false, message: 'Distributor not found' });
    return;
  }

  await dist.update(req.body);
  res.json({ success: true, message: 'Distributor Details Updated Sucsessfully !', data: dist });
}

export async function deleteDistributor(req: Request, res: Response): Promise<void> {
  const dist = await Distributor.findByPk(Number(req.params.id));
  if (!dist) {
    res.status(404).json({ success: false, message: 'Distributor not found' });
    return;
  }

  await dist.update({ IsActive: 0 });
  if (dist.LoginId) {
    await User.update({ IsActive: 0 }, { where: { UserId: dist.LoginId } });
  }

  res.json({ success: true, message: 'Distributor Deleted Sucsessfully !' });
}

export async function allocateDistributor(req: Request, res: Response): Promise<void> {
  const { DistId, IMEINos } = req.body;
  if (!DistId || !Array.isArray(IMEINos)) {
    res.status(400).json({ success: false, message: 'Invalid allocation parameters' });
    return;
  }

  await RMSControllerPump.update(
    { DistId: Number(DistId) },
    { where: { IMEINo: IMEINos } }
  );

  res.json({ success: true, message: 'Distributor Allocated Sucsessfully !' });
}
