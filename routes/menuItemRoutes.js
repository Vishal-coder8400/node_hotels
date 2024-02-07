const express = require("express");
const router = express.Router();
const MenuItem=require('../models/MenuItem');

//POST Method to add a Menu Item
router.post("/",async(req,res)=>{
    try {
        const data=req.body;
        const newMneu=new MenuItem(data)
        const response=await newMneu.save();
        console.log("data saved");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'}) 
    }
})

//Get Method
router.get('/',async(req,res)=>{
    try {
        const data=await MenuItem.find();
        console.log('data fatched');
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'}) 
    }
})

module.exports = router;
