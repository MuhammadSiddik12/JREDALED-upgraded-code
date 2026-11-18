import { Request, Response } from 'express';
import { Districts, Blocks, Panchayat, Lights } from '../models/index.js';

export async function getDistricts(_req: Request, res: Response): Promise<void> {
  const list = await Districts.findAll({ order: [['DistrictName', 'ASC']] });
  res.json({ success: true, data: list });
}

export async function getBlocks(req: Request, res: Response): Promise<void> {
  const districtId = req.query.districtId ? Number(req.query.districtId) : undefined;
  const where = districtId ? { DistrictId: districtId } : {};

  const blocks = await Blocks.findAll({
    where,
    order: [['BlockName', 'ASC']],
  });

  const district = districtId ? await Districts.findByPk(districtId) : null;

  const blocksWithCounts = await Promise.all(
    blocks.map(async (b) => {
      const lightsCount = await Lights.count({ where: { BlockId: b.BlockId } });
      return {
        blockId: b.BlockId,
        blockName: b.BlockName,
        districtId: b.DistrictId,
        lightsCount,
      };
    })
  );

  res.json({
    success: true,
    district: district?.DistrictName || 'All Districts',
    data: blocksWithCounts,
  });
}

export async function getPanchayats(req: Request, res: Response): Promise<void> {
  const blockId = req.query.blockId ? Number(req.query.blockId) : undefined;
  const where = blockId ? { BlockId: blockId } : {};

  const panchayats = await Panchayat.findAll({
    where,
    order: [['PanchayatName', 'ASC']],
  });

  const block = blockId ? await Blocks.findByPk(blockId) : null;
  const district = block?.DistrictId ? await Districts.findByPk(block.DistrictId) : null;

  const panchayatsWithCounts = await Promise.all(
    panchayats.map(async (p) => {
      const lightsCount = await Lights.count({ where: { PanchayatId: p.PanchayatId } });
      return {
        panchayatId: p.PanchayatId,
        panchayatName: p.PanchayatName,
        blockId: p.BlockId,
        lightsCount,
      };
    })
  );

  res.json({
    success: true,
    blockName: block?.BlockName || '',
    districtName: district?.DistrictName || '',
    data: panchayatsWithCounts,
  });
}

export async function getWards(req: Request, res: Response): Promise<void> {
  const panchayatId = req.query.panchayatId ? Number(req.query.panchayatId) : undefined;
  const where = panchayatId ? { PanchayatId: panchayatId } : {};

  const panchayat = panchayatId ? await Panchayat.findByPk(panchayatId) : null;
  const block = panchayat?.BlockId ? await Blocks.findByPk(panchayat.BlockId) : null;
  const district = block?.DistrictId ? await Districts.findByPk(block.DistrictId) : null;

  const lights = await Lights.findAll({
    where,
    attributes: ['WardNo'],
    group: ['WardNo'],
  });

  const wardsWithCounts = await Promise.all(
    lights.map(async (l) => {
      const wardNo = l.WardNo || '1';
      const count = await Lights.count({ where: { ...where, WardNo: wardNo } });
      return {
        wardNo,
        panchayatId,
        lightsCount: count,
      };
    })
  );

  res.json({
    success: true,
    panchayatName: panchayat?.PanchayatName || '',
    blockName: block?.BlockName || '',
    districtName: district?.DistrictName || '',
    data: wardsWithCounts,
  });
}

export async function getLights(req: Request, res: Response): Promise<void> {
  const { districtId, blockId, panchayatId, wardNo } = req.query;
  const where: any = {};

  if (districtId) where.DistrictId = Number(districtId);
  if (blockId) where.BlockId = Number(blockId);
  if (panchayatId) where.PanchayatId = Number(panchayatId);
  if (wardNo) where.WardNo = String(wardNo);

  const lights = await Lights.findAll({
    where,
    order: [['LightId', 'ASC']],
  });

  res.json({ success: true, data: lights });
}
