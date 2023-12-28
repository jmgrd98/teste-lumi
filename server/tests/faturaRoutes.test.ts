import { it, describe, expect } from 'vitest';
import request from 'supertest';
import {app} from '../index';

describe('GET /faturas', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/faturas')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);

  });
});
