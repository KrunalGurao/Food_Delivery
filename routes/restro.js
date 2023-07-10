const express= require("express")
const {restroModel}= require("../module/restaurant")
const restroRouter= express.Router()


restroRouter.post("/restro", async(req,res)=>{
    const restro= new restroModel(req.body)
    await restro.save()
    res.send("Restaurant has been created")
})


//********************************************************************************* */


restroRouter.get("/restaurants", async(req, res)=>{
    try {
        const restro= await restroModel.find()
        res.status(200).send(restro)
    } catch (err) {
        res.status(400).send("ERROR OCCURED")
    }
})


//********************************************************************************* */


restroRouter.get("/restaurants/:id", async(req, res)=>{
    const {id}= req.params
    try {
        const restro = await restroModel.findById(id)
        if(!restro)
        {
            res.status(400).send("Restaurant not found")
        }
        res.status(200).send(restro)
    } catch (err) {
        res.status(400).send("ERROR OCCURED")
    }
})


//******************************************************************************** */


restroRouter.post("/restaurants/:id/menu", async(req,res)=>{
    const id = req.params.id
    const {name, description, price, image}= req.body
    const restro= await restroModel.findOne({_id:id})
    const newitem= {
        name,
        description,
        price,
        image
    }
    restro.menu.push(newitem)
    await restro.save()
    res.status(201).send("menu updated successfully")
})



//******************************************************************************* */

restroRouter.delete("/restaurants/:id/menu/:mid", async(req, res)=>{
    const id= req.params.id
    const mid= req.params.mid
   try {
    const menu= await restroModel.findById(id)
    if(menu)
    {
        await restroModel.findByIdAndDelete(mid)
    }
    res.status(202).send("item deleted from menu successfully")
   } catch (err) {
    res.status(400).send("item not deleted")
   }
   
})





module.exports={restroRouter}