const express=require("express")
const { NoteModel } = require("../model/note.model")
const { auth } = require("../middleware/auth.middleware")

const noteRouter=express.Router()

noteRouter.post("/",async(req,res)=>{
    try{
      const note=new NoteModel(req.body)
      await note.save()
      res.json({msg:"New NOte has been added"})
    }
    catch(err){
        res.json({err})
    }
})

noteRouter.get("/",auth,async(req,res)=>{
    try{
        //the id of the user who is making the request === userID present on the note document
        const notes=await NoteModel.find({userID:req.body.userID})
        res.json({notes})
    } catch(err){
        res.json({err})
    }
})

noteRouter.patch("./noteID",auth,async(req,res)=>{
    const payload=req.body
    const {noteID}=req.params
    try{
        //the id of the user who is making the request === userID present on the note document
        const note=await NoteModel.findOne({_id:noteID})
        if(req.body.userID===note.userID){
      await NoteModel.findByIdAndUpdate({_id:noteID},payload)
      res.json({msg:`The note with ID:${noteID} has been updated`})
        } else {
            res.json({msg:"Ypu don't have access to update someone else's notes"})
        }
    }
    catch (err){
       res.json({err})
    }
})

noteRouter.delete("./noteID",auth,async(req,res)=>{
    //const payload=req.body
    const {noteID}=req.params
    try{
        //the id of the user who is making the request === userID present on the note document
        const note=await NoteModel.findOne({_id:noteID})
        if(req.body.userID===note.userID){
      await NoteModel.findByIdAndDelete({_id:noteID})
      res.json({msg:`The note with ID:${noteID} has been deleted`})
        } else {
            res.json({msg:"Ypu don't have access to delete someone else's notes"})
        }
    }
    catch (err){
       res.json({err})
    }
})

module.exports={
    noteRouter
}