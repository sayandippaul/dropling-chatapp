const mongoose=require("mongoose");
const express=require("express");
const app=express();

  var msgdesc = new mongoose.Schema({
    chatbody: {
      required: false,
      type: String,
    },
    time: {
      required: false,
      type:String,
    },
    tagged:{
      required:false,
      type:String,
    },
    msgid:{
        required: false,
      type:String,
   
    }
    
  });
  

  var todetails = new mongoose.Schema(
    {
    toid: {
      required: false,
      type: Number,
    },
    unseen: {
      required: false,
      type: Number,
    },
    toname:{
      required: true,
      type: String,
    
    },
    lastmessage:{
      required: false,
      type: [msgdesc],
   
    },
    msgdetails: {
      required: false,
      type: [msgdesc],
    },

  },
  {
    timestamps: true

  }
    
  

    
  );
  
const users=new mongoose.Schema({
    userid:{
        type:Number,
        required:false,
    },
    username:{
        type:String,
        required:false
    },email:{
        type:String,
        required:false
    },password:{
      type:String,
      required:false
  },
  favourites:{
    type:Array,
    required:false,
  },
  about:{
    type:String,
    required:false
},
nowuser:{
  type:String,
    required:false
},
online:{
  type:Number,
  required:false
},
    totaltoid:{
        type:[todetails],
        required:false
    },
    dp:{
      type:String,
        required:false
    },
})

var Messagemodel=new mongoose.model("user",users);
module.exports=Messagemodel;




  

