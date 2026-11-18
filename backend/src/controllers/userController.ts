import { Request, Response } from 'express';
import { User, Menu, UserAccessLevel, UserLoginHistory } from '../models/index.js';
import { md5 } from '../helpers/phpCompat.js';
import { userCreateSchema } from '../validators/schemas.js';

export async function getUsers(_req: Request, res: Response): Promise<void> {
  const users = await User.findAll({
    where: { IsActive: 1 },
    attributes: ['Sno', 'UserId', 'Name', 'MobileNo', 'UserType', 'CMSUserType', 'AppUserType', 'CreatedOnDate'],
    order: [['Sno', 'DESC']],
  });
  res.json({ success: true, data: users });
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  const user = await User.findByPk(Number(req.params.id), {
    attributes: ['Sno', 'UserId', 'Name', 'MobileNo', 'UserType', 'CMSUserType', 'AppUserType'],
  });
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }
  res.json({ success: true, data: user });
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const parsed = userCreateSchema.parse(req.body);
  const existing = await User.findOne({ where: { UserId: parsed.UserId } });
  if (existing) {
    res.status(400).json({ success: false, message: 'User ID already exsist !' });
    return;
  }

  const user = await User.create({
    Name: parsed.Name,
    UserId: parsed.UserId,
    UPassword: md5(parsed.UPassword),
    MobileNo: parsed.MobileNo || null,
    AppUserType: parsed.AppUserType ? Number(parsed.AppUserType) : 0,
    UserType: parsed.UserType ? Number(parsed.UserType) : 3,
    IsActive: 1,
    CreatedBy: req.user?.sno || 0,
  });

  // Assign access levels if provided
  if (parsed.accessLevels) {
    const entries = Object.entries(parsed.accessLevels);
    for (const [menuIdStr, val] of entries) {
      if (val) {
        const menuId = Number(menuIdStr);
        const menu = await Menu.findByPk(menuId);
        if (menu) {
          await UserAccessLevel.create({
            UserId: user.Sno,
            GroupMenuId: menu.GroupMenuId,
            MenuId: menu.MenuId,
            MenuOrder: menu.MenuOrder,
          });
        }
      }
    }
  }

  res.json({ success: true, message: 'User Details Added Sucsessfully !', data: user });
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const user = await User.findByPk(Number(req.params.id));
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }
  await user.update(req.body);
  res.json({ success: true, message: 'User updated successfully', data: user });
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const user = await User.findByPk(Number(req.params.id));
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }
  await user.update({ IsActive: 0 });
  res.json({ success: true, message: 'User deactivated successfully' });
}

export async function getUserAccessLevels(req: Request, res: Response): Promise<void> {
  const userId = Number(req.params.id);
  const menus = await Menu.findAll({ order: [['GroupMenuId', 'ASC'], ['MenuOrder', 'ASC']] });
  const accesses = await UserAccessLevel.findAll({ where: { UserId: userId } });
  const accessMenuIds = new Set(accesses.map((a) => a.MenuId));

  const categorized: Record<number, any[]> = {};
  for (const m of menus) {
    if (!categorized[m.GroupMenuId]) {
      categorized[m.GroupMenuId] = [];
    }
    categorized[m.GroupMenuId].push({
      menuId: m.MenuId,
      menuName: m.MenuName,
      menuLink: m.MenuLink,
      menuOrder: m.MenuOrder,
      hasAccess: accessMenuIds.has(m.MenuId),
    });
  }

  res.json({ success: true, data: categorized });
}

export async function updateUserAccessLevels(req: Request, res: Response): Promise<void> {
  const userId = Number(req.params.id);
  const { accessMap } = req.body; // e.g. { "1": true, "2": false, ... }

  if (!accessMap || typeof accessMap !== 'object') {
    res.status(400).json({ success: false, message: 'Invalid access map' });
    return;
  }

  await UserAccessLevel.destroy({ where: { UserId: userId } });

  for (const [menuIdStr, granted] of Object.entries(accessMap)) {
    if (granted) {
      const menuId = Number(menuIdStr);
      const menu = await Menu.findByPk(menuId);
      if (menu) {
        await UserAccessLevel.create({
          UserId: userId,
          GroupMenuId: menu.GroupMenuId,
          MenuId: menu.MenuId,
          MenuOrder: menu.MenuOrder,
        });
      }
    }
  }

  res.json({ success: true, message: 'Access levels updated successfully' });
}

export async function getUserLoginHistory(req: Request, res: Response): Promise<void> {
  const history = await UserLoginHistory.findAll({
    limit: 100,
    order: [['SNo', 'DESC']],
  });

  const enriched = await Promise.all(
    history.map(async (h) => {
      const user = await User.findByPk(h.UserId, { attributes: ['UserId', 'Name'] });
      return {
        ...h.toJSON(),
        userName: user?.Name || user?.UserId || 'Unknown',
      };
    })
  );

  res.json({ success: true, data: enriched });
}
