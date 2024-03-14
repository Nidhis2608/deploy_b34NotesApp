const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../model/user.model")
const userRouter=express.Router()

userRouter.post("/register", async(req,res)=>{
  const {username,email,password}=req.body
  try{
   bcrypt.hash(password,5,async(err,hash)=>{
    if(err){
        res.json({err})
    } else {
        const user=new UserModel({username,email,password:hash})
        await user.save()
        res.json({msg:"A new user has been registerd"})
    }
   })
  }
  catch(err){
    res.json({err})
  }
})


userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try{
       const user=await UserModel.findOne({email})
       bcrypt.compare(password,hash,(err,result)=>{
        if(result){
          const token = jwt.sign({userID:user._id,username:user.username},"masai")
          res.json({msg:"Login successfull",token})
        } else {
          res.json({err})
        }
       })
    }
    catch(err){
      res.json({err})
    }
  })

module.exports={
    userRouter
}