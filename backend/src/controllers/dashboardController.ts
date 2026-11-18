import { Request, Response } from 'express';
import { Networks, Lights, Districts, Blocks, RMSInventory } from '../models/index.js';

export async function getDashboardStats(_req: Request, res: Response): Promise<void> {
  try {
    const [
      totalNetworks,
      totalLights,
      healthyLights,
      faultyLights,
      dischargedBattery,
      energySaving,
      inventoryCount,
      totalDistricts,
      totalBlocks,
    ] = await Promise.all([
      Networks.count().catch(() => 0),
      Lights.count().catch(() => 0),
      Lights.count({ where: { FaultStatus: 0 } }).catch(() => 0),
      Lights.count({ where: { FaultStatus: 1 } }).catch(() => 0),
      Lights.count({ where: { BatStateCharge: 0 } }).catch(() => 0),
      Lights.sum('KWH').catch(() => 0),
      RMSInventory.count().catch(() => 0),
      Districts.count().catch(() => 0),
      Blocks.count().catch(() => 0),
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
        districtCount: totalDistricts || 24,
        blockCount: totalBlocks || 0,
        panchayatCount: 0,
        wardCount: 0,
        vendorCount: 1,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Error fetching dashboard stats',
    });
  }
}

export async function getDashboardMap(_req: Request, res: Response): Promise<void> {
  try {
    const districts = await Districts.findAll({
      order: [['DistrictName', 'ASC']],
    });

    const districtsWithCounts = await Promise.all(
      districts.map(async (d) => {
        const lightsCount = await Lights.count({ where: { DistrictId: d.DistrictId } }).catch(() => 0);
        return {
          districtId: d.DistrictId,
          districtName: d.DistrictName,
          districtCode: d.DistrictCode,
          luminaryTarget: d.LuminaryTarget || 0,
          lightsCount: lightsCount || 0,
        };
      })
    );

    res.json({
      success: true,
      data: districtsWithCounts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Error fetching dashboard map data',
    });
  }
}
