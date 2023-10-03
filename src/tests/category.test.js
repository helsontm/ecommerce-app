const request = require('supertest');
const app = require('../app.js');
let id;
let token;

beforeAll( async()=>{
    const body={
        password:"wwww.4568",
        email:'analia@hotmail.com',
    }
    const res=await request(app).post('/user/login').send(body)
    token=res.body.token;
})

test("GET /category debe retornar status 200", async ()=>{
    const res= await request(app).get('/category')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST  /category debe crear una categoria", async()=>{
    const body={
      name:'tecnology' 
    }
    const res= await request(app).post('/category').send(body)
    .set('Authorization', `Bearer ${token}`);
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /category/:id', async()=>{
    const body={
        name:'tecnology Update'
    }
    const res= await  request(app)
    .put(`/category/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /category/:id debe eliminar un usuario', async ()=>{
    const res=await request(app)
    .delete(`/category/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
