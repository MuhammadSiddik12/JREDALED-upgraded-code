import { Request, Response } from 'express';
import { Customer, User } from '../models/index.js';
import { md5 } from '../helpers/phpCompat.js';
import { customerSchema } from '../validators/schemas.js';

export async function getCustomers(_req: Request, res: Response): Promise<void> {
  const list = await Customer.findAll({
    where: { IsActive: 1 },
    order: [['CustId', 'DESC']],
  });
  res.json({ success: true, data: list });
}

export async function getCustomerById(req: Request, res: Response): Promise<void> {
  const cust = await Customer.findByPk(Number(req.params.id));
  if (!cust) {
    res.status(404).json({ success: false, message: 'Customer not found' });
    return;
  }
  res.json({ success: true, data: cust });
}

export async function createCustomer(req: Request, res: Response): Promise<void> {
  const parsed = customerSchema.parse(req.body);
  const { DistId, CustName, CustEmail, CustMobile, CustAddress, LoginId, UPassword } = parsed;

  const existingUser = await User.findOne({ where: { UserId: LoginId } });
  if (existingUser) {
    res.status(400).json({ success: false, message: 'Login Id Already Exsist !' });
    return;
  }

  const customer = await Customer.create({
    DistId: Number(DistId) || 0,
    CustName,
    CustEmail: CustEmail || null,
    CustMobile: CustMobile || null,
    CustAddress: CustAddress || null,
    LoginId,
    IsActive: 1,
    CreatedBy: req.user?.sno || 0,
  });

  await User.create({
    Name: CustName,
    UserId: LoginId,
    UPassword: md5(UPassword),
    MobileNo: CustMobile || null,
    UserType: 2,
    IsActive: 1,
    CreatedBy: req.user?.sno || 0,
  });

  res.json({ success: true, message: 'Customer Details Added Sucsessfully !', data: customer });
}

export async function updateCustomer(req: Request, res: Response): Promise<void> {
  const cust = await Customer.findByPk(Number(req.params.id));
  if (!cust) {
    res.status(404).json({ success: false, message: 'Customer not found' });
    return;
  }

  await cust.update(req.body);
  res.json({ success: true, message: 'Customer Details Updated Sucsessfully !', data: cust });
}

export async function deleteCustomer(req: Request, res: Response): Promise<void> {
  const cust = await Customer.findByPk(Number(req.params.id));
  if (!cust) {
    res.status(404).json({ success: false, message: 'Customer not found' });
    return;
  }

  await cust.update({ IsActive: 0 });
  if (cust.LoginId) {
    await User.update({ IsActive: 0 }, { where: { UserId: cust.LoginId } });
  }

  res.json({ success: true, message: 'Customer Deleted Sucsessfully !' });
}
