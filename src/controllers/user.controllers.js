const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = catchError(async(req, res) => {
    const results = await Users.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const{password, firstName, lastName,email, phone }=req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // salt
    const result = await Users.create({
        firstName, 
        lastName,
        email,
         phone,
         password:hashedPassword    
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Users.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Users.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const{firstName, lastName, phone}=req.body;
    const result = await Users.update(
       {firstName, lastName, phone} ,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const {email, password}=req.body;
    const user=await Users.findOne({where:{email}});
    if(!user)return res.status(401).json({message:'invalid credencial'})
    const isValid=await bcrypt.compare(password,user.password);
if(!isValid) return res.status(401).json({message:'Invalid Credential'});
const token = jwt.sign(
    {user},
    process.env.TOKEN_SECRET,
    { expiresIn: '1d' }
)
return res.json({user, token});

});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}