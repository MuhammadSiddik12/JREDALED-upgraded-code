import { md5, current_datetime, current_time, form_date, m2h, time_diff_minutes, verifyPassword, detectPlatform } from '../src/helpers/phpCompat';

describe('PHP Compatibility Helpers', () => {
  it('correctly hashes strings with MD5 matching PHP md5()', () => {
    expect(md5('admin')).toBe('21232f297a57a5a743894a0e4a801fc3');
    expect(md5('123456')).toBe('e10adc3949ba59abbe56e057f20f883e');
  });

  it('generates IST formatted dates with correct format', () => {
    const dt = current_datetime();
    expect(dt).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

    const t = current_time();
    expect(t).toMatch(/^\d{2}:\d{2}:\d{2}$/);

    const fd = form_date();
    expect(fd).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('converts minutes to hours and minutes matching PHP m2h()', () => {
    expect(m2h(150)).toBe('2 Hours 30 Minutes');
    expect(m2h(60)).toBe('1 Hours 0 Minutes');
    expect(m2h(45)).toBe('0 Hours 45 Minutes');
  });

  it('computes time differences accurately', () => {
    const diff = time_diff_minutes('2026-11-18 10:00:00', '2026-11-18 10:45:00');
    expect(diff).toBe(45);
  });

  it('verifies passwords with backwards-compatible MD5 or modern bcrypt', async () => {
    const isValidMd5 = await verifyPassword('admin', '21232f297a57a5a743894a0e4a801fc3');
    expect(isValidMd5).toBe(true);

    const isInvalid = await verifyPassword('wrongpassword', '21232f297a57a5a743894a0e4a801fc3');
    expect(isInvalid).toBe(false);
  });

  it('detects user platforms and browsers', () => {
    const win = detectPlatform('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0');
    expect(win.os).toBe('Windows 10/11');
    expect(win.browser).toBe('Chrome');
  });
});
