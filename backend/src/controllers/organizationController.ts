import { Request, Response } from 'express';
import { Organization } from '../models/index.js';
import { organizationSchema } from '../validators/schemas.js';

export async function getOrganizations(_req: Request, res: Response): Promise<void> {
  const list = await Organization.findAll({
    where: { IsActive: 1 },
    order: [['OrgId', 'DESC']],
  });
  res.json({ success: true, data: list });
}

export async function getOrganizationById(req: Request, res: Response): Promise<void> {
  const org = await Organization.findByPk(Number(req.params.id));
  if (!org) {
    res.status(404).json({ success: false, message: 'Organization not found' });
    return;
  }
  res.json({ success: true, data: org });
}

export async function createOrganization(req: Request, res: Response): Promise<void> {
  const parsed = organizationSchema.parse(req.body);
  const org = await Organization.create({
    ...parsed,
    IsActive: 1,
    CreatedBy: req.user?.sno || 0,
  });
  res.json({ success: true, message: 'Organization Details Added Sucsessfully !', data: org });
}

export async function updateOrganization(req: Request, res: Response): Promise<void> {
  const org = await Organization.findByPk(Number(req.params.id));
  if (!org) {
    res.status(404).json({ success: false, message: 'Organization not found' });
    return;
  }
  await org.update(req.body);
  res.json({ success: true, message: 'Organization Details Updated Sucsessfully !', data: org });
}

export async function deleteOrganization(req: Request, res: Response): Promise<void> {
  const org = await Organization.findByPk(Number(req.params.id));
  if (!org) {
    res.status(404).json({ success: false, message: 'Organization not found' });
    return;
  }
  await org.update({ IsActive: 0 });
  res.json({ success: true, message: 'Organization Deleted Sucsessfully !' });
}
