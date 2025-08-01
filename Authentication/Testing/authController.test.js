const bcrypt = require('bcrypt');

jest.mock('../src/security/jwt-util.js', () => ({
  __esModule: true,
  generateToken: jest.fn(() => 'mock-token'),
}));

const jwtUtil = require('../src/security/jwt-util.js');
const { User } = require('../src/models/index.js');
const { authController } = require('../src/controller/auth/authController.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authController', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (console.log.mockRestore) {
      console.log.mockRestore();
    }
  });

  describe('login', () => {
    it('should return 200 and token when credentials are valid', async () => {
      const user = {
        id: 1,
        email: 'john@example.com',
        password: 'password123',
        name: 'John Doe',
        toJSON() {
          return {
            id: 1,
            email: 'john@example.com',
            name: 'John Doe',
          };
        }
      };

      User.findOne = jest.fn().mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123',
        }
      };
      const res = mockRes();

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });

      expect(jwtUtil.generateToken).toHaveBeenCalledWith({
        user: {
          id: 1,
          email: 'john@example.com',
          name: 'John Doe',
        }
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: {
          user: {
            id: 1,
            email: 'john@example.com',
            name: 'John Doe',
          },
          access_token: 'mock-token',
          isAdmin: false
        },
        message: "Successfully logged in"
      });

      expect(jwtUtil.generateToken).toHaveBeenCalledTimes(1);
    });

    it('should return 500 when email is missing', async () => {
      const req = { body: { password: 'password123' } };
      const res = mockRes();

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Credentials are required"
      });
    });

    it('should return 500 when password is missing', async () => {
      const req = { body: { email: 'john@example.com' } };
      const res = mockRes();

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Credentials are required"
      });
    });

    it('should return 500 when user not found', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const req = {
        body: {
          email: 'nonexistent@example.com',
          password: 'password123'
        }
      };
      const res = mockRes();

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "User not found"
      });
    });

    it('should return 401 when password is incorrect', async () => {
      const user = {
        id: 1,
        email: 'john@example.com',
        password: 'correctpassword',
        name: 'John Doe'
      };

      User.findOne = jest.fn().mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const req = {
        body: {
          email: 'john@example.com',
          password: 'wrongpassword'
        }
      };
      const res = mockRes();

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
      expect(jwtUtil.generateToken).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        message: "Invalid credentials"
      });
    });

    it('should return 500 if database fails', async () => {
      User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123'
        }
      };
      const res = mockRes();

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to login"
      });
    });
  });

  describe('adminSignup', () => {
    it('should create admin successfully', async () => {
      const req = {
        body: {
          email: 'admin@example.com',
          password: 'adminpassword'
        }
      };
      const res = mockRes();

      User.findOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockResolvedValue({
        toJSON: () => ({
          email: 'admin@example.com',
          role: 'admin'
        })
      });
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');

      await authController.adminSignup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'admin@example.com' } });
      expect(bcrypt.hash).toHaveBeenCalledWith('adminpassword', 10);
      expect(User.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: {
          user: {
            email: 'admin@example.com',
            role: 'admin'
          },
          access_token: 'mock-token'
        },
        message: "Successfully created admin"
      });
    });

    it('should return 500 if email or password missing', async () => {
      const req = { body: { email: 'admin@example.com' } };
      const res = mockRes();

      await authController.adminSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Email and password are required"
      });
    });

    it('should return 400 if admin already exists', async () => {
      const req = {
        body: {
          email: 'admin@example.com',
          password: 'adminpassword'
        }
      };
      const res = mockRes();

      User.findOne = jest.fn().mockResolvedValue(true);

      await authController.adminSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Admin already exists"
      });
    });

    it('should return 500 if admin creation fails', async () => {
      const req = {
        body: {
          email: 'admin@example.com',
          password: 'adminpassword'
        }
      };
      const res = mockRes();

      User.findOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');

      await authController.adminSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Failed to create admin"
      });
    });

    it('should return 500 if database error occurs', async () => {
      const req = {
        body: {
          email: 'admin@example.com',
          password: 'adminpassword'
        }
      };
      const res = mockRes();

      User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

      await authController.adminSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to create admin"
      });
    });
  });

  describe('init', () => {
    it('should return 201 and user data without password', async () => {
      const userData = {
        id: 1,
        email: 'john@example.com',
        name: 'John Doe',
        password: 'password123',
        role: 'user'
      };

      const req = {
        user: {
          user: userData
        }
      };
      const res = mockRes();

      await authController.init(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: {
          id: 1,
          email: 'john@example.com',
          name: 'John Doe',
          role: 'user'
        },
        message: "successfully fetched current  user"
      });
    });

    it('should return 201 with user data when password is already missing', async () => {
      const userData = {
        id: 1,
        email: 'john@example.com',
        name: 'John Doe',
        role: 'user'
      };

      const req = {
        user: {
          user: userData
        }
      };
      const res = mockRes();

      await authController.init(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: userData,
        message: "successfully fetched current  user"
      });
    });

    it('should return 500 if user data is missing', async () => {
      const req = { user: {} };
      const res = mockRes();

      await authController.init(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch users"
      });
    });

    it('should return 500 if database fails', async () => {
      const req = {
        user: {
          user: {
            id: 1,
            email: 'john@example.com',
            name: 'John Doe',
            password: 'password123'
          }
        }
      };
      const res = mockRes();

      const reqWithError = {
        get user() {
          throw new Error('Database connection failed');
        }
      };

      await authController.init(reqWithError, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch users"
      });
    });
  }
  );
});
