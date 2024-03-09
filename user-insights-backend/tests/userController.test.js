// backend/tests/userController.test.js
const request = require('supertest');
const app = require('../app');

let server;

beforeAll(async () => {
  server = await app.listen(3000);
});

afterAll(async () => {
  await server.close();
});

describe('User Controller', () => {
  describe('GET /users', () => {
    it('should return all users when no filters are applied', async () => {
      const res = await request(app).get('/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return filtered users when name filter is applied', async () => {
      const res = await request(app).get('/users?name=John');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.every(user => user.name.toLowerCase().includes('john'))).toBe(true);
    });

    it('should return filtered users when active filter is applied', async () => {
      const res = await request(app).get('/users?active=true');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.every(user => user.active)).toBe(true);
    });
  });

  describe('GET /users/insights', () => {
    it('should return user insights', async () => {
      const res = await request(app).get('/users/insights');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('active_users_count');
      expect(res.body).toHaveProperty('inactive_users_count');
      expect(res.body).toHaveProperty('average_age');
    });
  });
});
