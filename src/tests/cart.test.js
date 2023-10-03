const request = require('supertest');
const app = require('../app.js');
require('../models');

let token;
let id;

beforeAll( async()=>{
    const body={
        password:"wwww.4568",
        email:'analia@hotmail.com',
    }
    const res=await request(app).post('/user/login').send(body)
    token=res.body.token;
});

test('GET /cart', async () => {
  const res= await request(app)
  .get('/cart') 
  .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /cart', async () => {
    const body={quantity: 2}
    const res= await request(app)
    .post('/cart')
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    id=res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.rate).toBe(body.rate);
});

test('PUT /cart/:id', async()=>{
    const body={
        quantity: 3
    }
    const res= await  request(app)
    .put(`/cart/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});


test('DELETE /cart/:id', async () => {
   const res= await request(app)
   .delete(`/cart/${id}`)
   .set('Authorization', `Bearer ${token}`)
   expect(res.status).toBe(204);
})

