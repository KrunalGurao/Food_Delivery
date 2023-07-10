const express= require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user")
const {restroRouter}= require("./routes/restro")
const {orderRouter}= require("./routes/order")
require("dotenv").config()




const app= express()
app.use(express.json())


app.use("/api", userRouter)
app.use("/api", restroRouter)
app.use("/api", orderRouter)



app.listen(process.env.port, async(req, res)=>{
   try {
    await connection
    console.log("***************CONNECTED TO SERVER***************")
   } catch (err) {
    console.log("SERVER NOT CONNECTED" , err)
   }
})

