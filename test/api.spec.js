const request = require('supertest');
const app = require('../app');

describe('API', () => {
  test('Should return a 404 status code when an endpoint doesn\'t exists', (done) => {
    request(app).get('/suspiciousRoute').expect(404).end(done());
  });
});
