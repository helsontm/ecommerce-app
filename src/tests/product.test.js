const request = require('supertest');
const app = require('../app.js');
const Category=require('../models/Category.js');
const Image = require('../models/Image.js');
require('../models');

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


test("GET /product debe retornar status 200", async ()=>{
    const res= await request(app).get('/product')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /product', async()=>{
    const category= await Category.create({name:'test'});
    const body={
        title:'test',
        description:'test description',
        brand:'test brand',
        price:'10000',
        categoryId: category.id,
    }
    const res= await request(app).post('/product').send(body)
    .set('Authorization', `Bearer ${token}`);
    id=res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.headline).toBe(body.headline);
    
});

test('PUT /product/:id', async()=>{
    const body={
        title:'test update'
    }
    const res= await  request(app)
    .put(`/product/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(body.title);
});

test("GET /product/:id debe retornar status 200", async ()=>{
    const res= await request(app).get(`/product/${id}`)
    expect(res.status).toBe(200);
    
    
});

test('POST /product/:id/images', async()=>{
    const image= await Image.create({url:'url', publicId:'IdImage' })
    const res= await request(app)
    .post(`/product/${id}/images`)
    .send([image.id])
    .set('Authorization', `Bearer ${token}`);
    console.log(res.body)
    await image.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
})

test('DELETE /product/:id debe eliminar un producto', async ()=>{
    const res=await request(app)
    .delete(`/product/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});

