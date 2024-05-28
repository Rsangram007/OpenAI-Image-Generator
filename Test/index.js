const express=require('express')

const app = express()

app.use("/",(req,res)=>{
res.send("console.log Server Running")
})

app.listen(3000,console.log("sever is running" + 3000))