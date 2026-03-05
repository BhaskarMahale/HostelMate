import express, { Router } from "express"
const router = express.Router();
import Student from "../models/Student.js";

router.use("/StudentInfo",async (req,res)=>{
    try{
        await Student.create(req.body);
        res.status(200).send("Student Information");
    }catch{
        res.status(401).send("Fail");
    }
})


export default router;