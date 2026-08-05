import { beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import type { Express } from 'express';

let app: Express;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.CLERK_SECRET_KEY = '';
  process.env.CLERK_PUBLISHABLE_KEY = '';
  process.env.ALLOWED_ORIGINS = 'http://localhost:5173';
  ({ app } = await import('./server.js'));
}, 30_000);

describe('API security boundary', () => {
  it('serves health with security and rate-limit headers', async () => {
    const response = await request(app).get('/health').expect(200);
    expect(response.body.status).toBe('ok');
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-request-id']).toMatch(/^[0-9a-f-]{36}$/);
    expect(response.body.requestId).toBe(response.headers['x-request-id']);
  });

  it('allows the configured frontend origin', async () => {
    const response = await request(app).get('/health').set('Origin', 'http://localhost:5173').expect(200);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });

  it('rejects malformed user sync payloads before database access', async () => {
    const response = await request(app).post('/api/v1/user/sync').send({ userId: '', xp: -5 }).expect(400);
    expect(response.body.error.code).toBe('INVALID_REQUEST');
  });

  it('rejects invalid level identifiers and impossible star awards', async () => {
    const response = await request(app).post('/api/v1/progress/level-complete').send({
      userId: 'test-user', levelId: '../admin', stars: 99,
    }).expect(400);
    expect(response.body.error.code).toBe('INVALID_REQUEST');
    expect(response.body.error.requestId).toBe(response.headers['x-request-id']);
  });

  it('requires a durable idempotency key before progress database access', async () => {
    const response = await request(app).post('/api/v1/progress/level-complete').send({ userId: 'test-user', levelId: 'level-1-arrays', stars: 3 }).expect(400);
    expect(response.body.error.code).toBe('IDEMPOTENCY_KEY_REQUIRED');
  });

  it('rejects untrusted origins without exposing an internal stack', async () => {
    const response = await request(app).get('/health').set('Origin', 'https://attacker.example').expect(500);
    expect(response.body.error.code).toBe('INTERNAL_ERROR');
    expect(response.body.error.requestId).toBe(response.headers['x-request-id']);
  });
});
