const { register } = require('../../controllers/registerController'); // Replace with the actual path
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockedToken'),
}));

describe('register controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
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

  it('should create a new user and return a token', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword',
    };

    User.create = jest.fn().mockResolvedValue(mockUser);
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

    await register(req, res, next);

    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword',
    });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);

    expect(res.json).toHaveBeenCalledWith({
      user: mockUser,
      token: 'mockedToken',
    });
  });

  it('should handle internal server error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Internal Server Error');
    User.create = jest.fn().mockRejectedValue(error);

    await register(req, res, next);

    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
