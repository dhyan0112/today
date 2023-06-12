const express=require('express');
const userRouter=express.Router();
const { UserModel }=require('../model/model');
const { client }=require('../cache');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


userRouter.post('/register',async(req,res)=>{
    const {name,email,password,age,location}=req.body;
    try{
        bcrypt.hash(password,5,async (err,hash)=>{
            if (err) {
                res.send({"msg":err.message});
            } else {
                const user=new UserModel({name,email,password:hash,age,location});
                await user.save();
                res.send({'msg':'New user has been registered'});
            }
        })
    }catch(err){
        res.send({'msg':err.message});
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.find({email});
        if (user.length>0) {
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if (result){
                    let token=jwt.sign({userID:user[0]._id},'secrete');
                    res.send({'msg': 'Successfully Logged in','token':token});
                } else {
                    res.send('Wrong Credentials');
                }
            })
        }else {
            res.send('Wrong Credentials');
        }
    }catch(err){
        res.send({'msg':err.message});
    }
})

module.exports={
    userRouter
}