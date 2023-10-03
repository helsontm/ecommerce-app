const request = require('supertest');
const app = require('../app.js');
require('../models');

test("GET /product_images debe retornar status 200", async ()=>{
    const res= await request(app).get('/product_images')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

