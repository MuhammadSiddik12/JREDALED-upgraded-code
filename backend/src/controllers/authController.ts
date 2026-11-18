import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserLoginHistory } from '../models/index.js';
import { env } from '../config/env.js';
import { verifyPassword, hashPassword, current_datetime, md5 } from '../helpers/phpCompat.js';
import { loginSchema, changePasswordSchema } from '../validators/schemas.js';

export async function login(req: Request, res: Response): Promise<void> {
  const parsed = loginSchema.parse(req.body);
  const { myUserName, mypassword, ip_address, browser, os } = parsed;

  const user = await User.findOne({
    where: {
      UserId: myUserName,
      IsActive: 1,
    },
  });

  if (!user) {
    res.status(401).json({ success: false, message: 'User Name or password is incorrect !' });
    return;
  }

  const isPasswordValid = await verifyPassword(mypassword, user.UPassword);
  if (!isPasswordValid) {
    res.status(401).json({ success: false, message: 'User Name or password is incorrect !' });
    return;
  }

  // Record login history matching PHP checklogin.php
  const clientIp = ip_address || req.ip || req.socket.remoteAddress || '';
  const platformInfo = `${clientIp}$${browser || ''}$${os || ''}`;
  const loginTime = new Date();
  const sessionId = (req as any).sessionID || md5(`${user.UserId}-${Date.now()}`);

  await UserLoginHistory.create({
    UserId: user.Sno,
    LoginTime: loginTime,
    SessionId: sessionId,
    PlatformInfo: platformInfo,
    AppType: 1,
    AppIP: String(clientIp),
  });

  const tokenPayload = {
    userId: user.UserId,
    sno: user.Sno,
    userType: user.UserType,
    cmsUserType: user.CMSUserType,
    name: user.Name || user.UserId,
  };

  const token = jwt.sign(tokenPayload, env.JWT_SECRET, { expiresIn: '7d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: tokenPayload,
  });
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Not authenticated' });
    return;
  }

  const user = await User.findOne({
    where: { Sno: req.user.sno, IsActive: 1 },
    attributes: ['Sno', 'UserId', 'Name', 'MobileNo', 'UserType', 'CMSUserType'],
  });

  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  res.json({ success: true, user });
}

export async function changePassword(req: Request, res: Response): Promise<void> {
  const parsed = changePasswordSchema.parse(req.body);
  const { pwd1, pwd2, UserId } = parsed;

  if (pwd1 !== pwd2) {
    res.status(400).json({ success: false, message: 'Password is not same !' });
    return;
  }

  const targetUserId = UserId || req.user?.userId;
  if (!targetUserId) {
    res.status(400).json({ success: false, message: 'User ID missing' });
    return;
  }

  const user = await User.findOne({ where: { UserId: targetUserId } });
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  // Update password with modern hash
  const hashedPassword = await hashPassword(pwd1);
  await user.update({ UPassword: hashedPassword });

  res.json({ success: true, message: 'Password Changed Sucsessfully !' });
}
