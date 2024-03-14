const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/user.routes.js")
const {noteRouter}=require("./routes/note.routes.js")
const cors=require("cors");

const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(8080,async()=>{
    await connection
    console.log("Connected to DB")
    console.log("Server is running at port 8080")
})