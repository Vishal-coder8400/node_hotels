const express = require("express");
const router = express.Router();
const personModel=require('./../models/Person')

//post route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //Create a new Person document using the mongoose model
    const newPerson = new personModel(data);

    //save the new person to the database
    const response = await newPerson.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get Method
router.get("/", async (req, res) => {
  try {
    const data = await personModel.find();
    console.log("data fatched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await personModel.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update
router.put('/:id',async(req,res)=>{
    try {
        const personId=req.params.id //extract the id from the url parameter
        const updatedPersonData=req.body; //updated data for the person

        const response=await personModel.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,//Return the updated document
            runValidators:true //Run Mongoose validation
        })
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log('data updated');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//delete

router.delete('/:id',async(req,res)=>{
    try {
        const personId=req.params.id //extract the id from the url parameter
    
        //Asuming you have PersonModel 
        const response=await personModel.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log('data updated');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
