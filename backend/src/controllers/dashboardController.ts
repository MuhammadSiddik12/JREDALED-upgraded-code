import { Request, Response } from 'express';
import { Networks, Lights, Districts, Blocks, RMSInventory, FaultLogs } from '../models/index.js';

export async function getDashboardStats(_req: Request, res: Response): Promise<void> {
  const [
    totalNetworks,
    totalLights,
    healthyLights,
    faultyLights,
    dischargedBattery,
    energySaving,
    inventoryCount,
  ] = await Promise.all([
    Networks.count(),
    Lights.count(),
    Lights.count({ where: { FaultStatus: 0 } }),
    Lights.count({ where: { FaultStatus: 1 } }),
    Lights.count({ where: { BatStateCharge: 0 } }),
    Lights.sum('EnergyKWH'),
    RMSInventory.count(),
  ]);

  res.json({
    success: true,
    data: {
      networks: totalNetworks || 0,
      totalLuminary: totalLights || 0,
      healthyLuminary: healthyLights || 0,
      faultyLuminary: faultyLights || 0,
      dischargedBattery: dischargedBattery || 0,
      energySavingKwh: Math.round(Number(energySaving || 0)),
      luminaryInventory: inventoryCount || 0,
    },
  });
}

export async function getDashboardMap(_req: Request, res: Response): Promise<void> {
  const districts = await Districts.findAll({
    order: [['DistrictName', 'ASC']],
  });

  const districtsWithCounts = await Promise.all(
    districts.map(async (d) => {
      const lightsCount = await Lights.count({ where: { DistrictId: d.DistrictId } });
      return {
        districtId: d.DistrictId,
        districtName: d.DistrictName,
        districtCode: d.DistrictCode,
        lightsCount,
      };
    })
  );

  res.json({
    success: true,
    data: districtsWithCounts,
  });
}
