/**
 * =============================================
 * API test code
 * =============================================
 */

const request = require('supertest');
const app = require('./../modules/app');
const req = request(app);

/**
 * Sample test code
 */
describe('Sample Test', () => {
  it('should test that true === true', () => {
      expect(true).toBe(true)
  })
});

/**
 * Get method test code
 */
/*
describe('Get Endpoints (not mocking)', () => {
  it('/api/balance/IDQ', async () => {
    const res = await req
      .get('/api/balance/IDQ')
      .set('Accept', 'application/json')
      .send({
        addr: "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
      });
    // check
    expect(res.status).toEqual(200)
    expect(res.body).toEqual(0)
  })

  it('/api/resolve', async () => {
    const res = await req
      .get('/api/resolve')
      .set('Accept', 'application/json')
      .send({
        uri: "",
      });
    // check
    expect(res.status).toEqual(200)
    expect(res.body.cities[0].name).toEqual('Abashiri')
  })
});
*/