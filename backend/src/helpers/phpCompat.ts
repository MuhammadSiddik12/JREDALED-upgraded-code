import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export function md5(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex');
}

export function current_datetime(): string {
  const d = new Date(Date.now() + 5.5 * 3600 * 1000);
  return d.toISOString().replace('T', ' ').substring(0, 19);
}

export function current_time(): string {
  const d = new Date(Date.now() + 5.5 * 3600 * 1000);
  return d.toISOString().substring(11, 19);
}

export function display_time(): string {
  const d = new Date(Date.now() + 5.5 * 3600 * 1000);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const time = d.toISOString().substring(11, 19);
  return `${day}-${month}-${year} ${time}`;
}

export function form_date(): string {
  const d = new Date(Date.now() + 5.5 * 3600 * 1000);
  return d.toISOString().substring(0, 10);
}

export function m2h(mins: number): string {
  const d = Math.floor(mins / 1440);
  const h = Math.floor((mins - d * 1440) / 60);
  const m = mins - d * 1440 - h * 60;
  return `${h} Hours ${m} Minutes`;
}

export function time_diff_minutes(start: string | Date, stop: string | Date): number {
  const t1 = new Date(start).getTime();
  const t2 = new Date(stop).getTime();
  return Math.round(Math.abs(t2 - t1) / 60000);
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  if (stored.startsWith('$2a$') || stored.startsWith('$2b$')) {
    return await bcrypt.compare(plain, stored);
  }
  return md5(plain) === stored;
}

export async function hashPassword(plain: string): Promise<string> {
  return await bcrypt.hash(plain, 10);
}

export function detectPlatform(userAgent = ''): { os: string; browser: string } {
  let os = 'Unknown OS';
  if (/windows nt 10/i.test(userAgent)) os = 'Windows 10/11';
  else if (/windows nt 6\.3/i.test(userAgent)) os = 'Windows 8.1';
  else if (/windows nt 6\.1/i.test(userAgent)) os = 'Windows 7';
  else if (/windows/i.test(userAgent)) os = 'Windows';
  else if (/android/i.test(userAgent)) os = 'Android';
  else if (/iphone|ipad/i.test(userAgent)) os = 'iOS';
  else if (/linux/i.test(userAgent)) os = 'Linux';
  else if (/mac/i.test(userAgent)) os = 'macOS';

  let browser = 'Unknown Browser';
  if (/chrome|crios/i.test(userAgent) && !/edg/i.test(userAgent)) browser = 'Chrome';
  else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
  else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
  else if (/edg/i.test(userAgent)) browser = 'Edge';

  return { os, browser };
}
