import { handleCommandPoll } from '../src/controllers/iotController';
import { login } from '../src/controllers/authController';
import { loginSchema } from '../src/validators/schemas';
import { User, RMSControllerPump, UserLoginHistory } from '../src/models/index';

describe('API Route & Protocol Tests (Unit & Functional)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('validates input parameters with Zod on login', () => {
    expect(() => {
      loginSchema.parse({
        myUserName: '',
        mypassword: '',
      });
    }).toThrow();

    const valid = loginSchema.parse({
      myUserName: 'admin',
      mypassword: 'password123',
    });
    expect(valid.myUserName).toBe('admin');
  });

  it('handles IoT command frame via handleCommandPoll matching legacy PHP protocol', async () => {
    jest.spyOn(RMSControllerPump, 'findOne').mockResolvedValue(null as any);

    let responseText = '';
    let responseCode = 200;

    const mockReq = {
      query: { f: '869270049552002,1,0' },
      body: {},
    } as any;

    const mockRes = {
      status: (code: number) => {
        responseCode = code;
        return mockRes;
      },
      setHeader: () => mockRes,
      send: (text: string) => {
        responseText = text;
        return mockRes;
      },
    } as any;

    await handleCommandPoll(mockReq, mockRes);
    expect(responseCode).toBe(200);
    expect(responseText).toBe('Cmd$0$#');
  });

  it('handles bad login attempts appropriately', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null as any);

    let statusCode = 200;
    let jsonBody: any = null;

    const mockReq = {
      body: {
        myUserName: 'non_existent_user_9999',
        mypassword: 'bad_password',
      },
      ip: '127.0.0.1',
      socket: {},
    } as any;

    const mockRes = {
      status: (code: number) => {
        statusCode = code;
        return mockRes;
      },
      json: (data: any) => {
        jsonBody = data;
        return mockRes;
      },
    } as any;

    await login(mockReq, mockRes);
    expect(statusCode).toBe(401);
    expect(jsonBody?.success).toBe(false);
    expect(jsonBody?.message).toContain('incorrect');
  });

  it('authenticates user with legacy MD5 hash and returns JWT token and user info', async () => {
    const mockUser = {
      Sno: 1,
      UserId: 'admin',
      UPassword: '21232f297a57a5a743894a0e4a801fc3', // md5('admin')
      Name: 'Administrator',
      MobileNo: '9999999999',
      UserType: 0,
      CMSUserType: 1,
      IsActive: 1,
    };

    jest.spyOn(User, 'findOne').mockResolvedValue(mockUser as any);
    jest.spyOn(UserLoginHistory, 'create').mockResolvedValue({} as any);

    let statusCode = 200;
    let jsonBody: any = null;
    const cookiesSet: Record<string, any> = {};

    const mockReq = {
      body: {
        myUserName: 'admin',
        mypassword: 'admin',
      },
      ip: '127.0.0.1',
      socket: {},
    } as any;

    const mockRes = {
      status: (code: number) => {
        statusCode = code;
        return mockRes;
      },
      cookie: (name: string, val: string, opts: any) => {
        cookiesSet[name] = { val, opts };
        return mockRes;
      },
      json: (data: any) => {
        jsonBody = data;
        return mockRes;
      },
    } as any;

    await login(mockReq, mockRes);
    expect(statusCode).toBe(200);
    expect(jsonBody?.success).toBe(true);
    expect(jsonBody?.token).toBeDefined();
    expect(jsonBody?.user?.userId).toBe('admin');
    expect(cookiesSet['token']).toBeDefined();
  });
});

