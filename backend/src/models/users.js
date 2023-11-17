const mongoose=require("mongoose");
const express=require("express");
const app=express();

const users=new mongoose.Schema({
    toid:{
        type:Number,
        required:true
    },chatbody:{
        type:String,
        required:true
    },time:{
        type:String,
        required:true
    },
})

var Messagemodel=new mongoose.model("user",users);
module.exports=Messagemodel;




  

