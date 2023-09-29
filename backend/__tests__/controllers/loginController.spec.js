const { login } = require('../../controllers/loginController'); // Replace with the actual path
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockedToken'),
}));

describe('login controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('should return a token and user on successful login', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: '$2a$10$VS7FyGpJKZi0R64ZQFyF5Oho7JnlmM92PNvAr.rrJg/cpEaObDde', // bcrypt hashed password for "password123"
    };
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    await login(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);

    expect(res.json).toHaveBeenCalledWith({
      token: 'mockedToken',
      user: {
        id: mockUser.id,
        email: mockUser.email,
        password: mockUser.password,
      },
    });
  });

  it('should return 404 when user is not found', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    await login(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should return 401 on invalid password', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: '$2a$10$InvalidHash', // Invalid hash to simulate invalid password
    };
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(false);

    await login(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password' });
  });

  it('should handle internal server error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Internal Server Error');
    User.findOne = jest.fn().mockRejectedValue(error);

    await login(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
