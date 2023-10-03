const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app.js');
const User = require('../models/Users');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

// solo en caso de error
const user=await User.findOne({where:{email:'analia@hotmail.com'}})
if(!user){
   
    const userT={
        firstName:"Rojo",
        lastName: "Jhone",
        phone:"300020005",
        password:"wwww.4568",
        email:'analia@hotmail.com'  
    }
    await request(app).post('/user').send(userT)
}
       
        


        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();