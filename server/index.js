import { Express } from "express";

const app = Express()

const USERS = []
const PROBLEMS =[]

app.get("/", (req,res)=>{
    res.send("hello world")
})


app.listen(3000, ()=>{
    console.log("server started at port 3000")
})
