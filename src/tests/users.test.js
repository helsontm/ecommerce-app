const request = require('supertest');
const app = require('../app.js');
let id;
let token;


test("POST  /user debe crear un usuario", async()=>{
    const body={
        firstName:"Rojo",
        lastName: "Jhone",
        phone:"300020005",
        password:"wwww.4568",
        email:'analio@hotmail.com'

    }
    const res= await request(app).post('/user').send(body)
    
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.password).toBeFalsy()
});

test("POST  /user/login ", async()=>{
    const body={
        password:"wwww.4568",
        email:'analio@hotmail.com',
    }
    const res=await request(app).post('/user/login').send(body);
    token= res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toBeDefined();
    });


test("GET /user debe retornar status 200", async ()=>{
    const res= await request(app).get('/user').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /user/:id', async()=>{
    const body={
        firstName:'Rojo Update'
    }
    const res= await  request(app)
    .put(`/user/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
})


test("POST  /user/login con credenciales invalidas debe retornar error ", async()=>{
 const body={

    email:'invalid',
    password:'invalido789',
 }
 const res=await request(app).post('/user/login').send(body);
 expect(res.status).toBe(401);

})



test('DELETE /user/:id debe eliminar un usuario', async ()=>{
    const res=await request(app)
    .delete(`/user/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});



