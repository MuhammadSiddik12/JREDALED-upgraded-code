# 07 - Testing Report: JREDALED

## Overview

- **Test Framework:** Jest 29.7.0, ts-jest 29.1.5
- **Execution Target:** Node.js v26.13.0, TypeScript 5.9.3 (strict mode)
- **Scope:** Protocol parsers, telemetry ingest, command polling, password backward compatibility, authentication validation, error states.

---

## Test Execution Summary

```
PASS tests/api.test.ts
PASS tests/phpCompat.test.ts

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        2.389 s
```

### Detailed Test Results

| Test Suite | Test Case | Category | Result | Details |
|------------|-----------|----------|--------|---------|
| `phpCompat.test.ts` | MD5 Hashing Parity | Security / Compat | PASS | Verified `md5('admin') === '21232f297a57a5a743894a0e4a801fc3'` matching PHP `md5()` |
| `phpCompat.test.ts` | IST Timezone & Date Formatting | System / Compat | PASS | Generates `YYYY-MM-DD HH:mm:ss` with `+05:30` IST offset matching `$zone=3600*5.5` |
| `phpCompat.test.ts` | Minutes to Hours Calculation (`m2h`) | Business Logic | PASS | `m2h(150)` returns `"2 Hours 30 Minutes"` matching original procedural function |
| `phpCompat.test.ts` | Time Duration Calculation (`time_diff_minutes`) | Business Logic | PASS | Calculated timestamp difference in exact minutes |
| `phpCompat.test.ts` | Password Verification Dual-Stack | Security | PASS | Verifies legacy MD5 hashes transparently with fallback to bcryptjs |
| `phpCompat.test.ts` | Client Platform & Browser Sniffing | Utility | PASS | Accurately extracts OS and browser names matching `browser_detection.php` |
| `api.test.ts` | Zod Validation Schema | Validation | PASS | Rejects missing username/password with detailed error payloads |
| `api.test.ts` | IoT Command Protocol Polling (`Cmd.php`) | Hardware IoT Gateway | PASS | Responds with exact packet structure `Cmd$0$#` matching hardware controller expectations |
| `api.test.ts` | Authentication Failure Handling | Security | PASS | Returns HTTP 401 with identical user-facing error message `"User Name or password is incorrect !"` |
| `api.test.ts` | Dual-Stack Authentication Parity | Security | PASS | Authenticates legacy MD5 password hash, issues JWT HTTP-only cookie, and logs login history |

---

## Production Build Verification

### Backend Production Build
- Command: `npm run build` (`node node_modules/typescript/bin/tsc`)
- Result: **SUCCESS (Exit code 0)**. Generated pure ES2022 JavaScript distribution into `dist/`.

### Frontend Production Build
- Command: `npm run build` (`node node_modules/next/dist/bin/next build`)
- Result: **SUCCESS (Exit code 0)**. All 34 Next.js App Router routes generated and compiled statically without errors.
