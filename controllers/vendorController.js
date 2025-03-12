const Vendor=require('../models/Vendor')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
exports.vendorRegister=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const vendorEmail=await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json({
                success:false,
                message:'Email already exists'
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newVendor=new Vendor({
            username,
            email,
            password:hashedPassword
        });
        await newVendor.save();
        return res.status(201).json({
            success:true,
            message:'Vendor Registered Successfully'
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'Vendor not Registered '
        })
    }
}

exports.vendorLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const vendor=await Vendor.findOne({email});
        if(!vendor){
            return res.status(400).json({
                success:false,
                message:"Email not exists"
            })
        }
        if(!await bcrypt.compare(password,vendor.password)){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            })
        }
        const payload={
            vendorId:vendor._id,
            email:vendor.email
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"})
        console.log("Vendor Logged In Successfully");
        return res.status(200).json({
            success:true,
            message:"Vendor LoggedIn Successfully",
            token
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'Login Failed '
        })
    }
}

exports.getAllVendors=async(req,res)=>{
    try{
        const vendors=await Vendor.find({}).populate('firm');
        return res.status(200).json({
            success:true,
            message:"All vendors fetched Successfully",
            vendors
        })
    }
    catch(err){
        return res.status(200).json({
            success:false,
            message:'failed to get all vendor details'
        })

    }
}

exports.getVendorById=async(req,res)=>{
    try{
        const {id}=req.params;
        const vendor=await Vendor.findById(id);
        if(!vendor){
            return res.status(404).json({
                success:false,
                message:"vendor not found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"vendor fetched Successfully",
            vendor
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'failed to get vendor details'
        })

    }
}