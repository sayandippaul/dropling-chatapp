const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const path=require("path");
const port=process.env.port||3000
require("./db/conn");
const Register=require("./models/users");
// const static_path=path.join(__dirname,"../public");
// app.use(express.static(static_path))
app.set("view engine","hbs");
var cors = require("cors");
const Messagemodel = require("./models/users");

app.get("/",(req,res)=>{
// res.send("hello")
res.render("index");
});
app.use(
    cors({
      origin: "*",
    })
  );
  
  app.post("/", async (req, res) => {
      
//   console.log("hit")
  {
    try {
    console.log("here" + req.body.chatbody);

    var data = new Messagemodel({
        chatbody: req.body.chatbody,
        time: req.body.time,
        toid:req.body.towhom
        
        
      });

      var dataToSave = await data.save();
      res.status(200).json(dataToSave);
      // res.json(1);
   
        
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  });
  app.post("/Sendmessage", bodyParser.json(), async (req, res) => {
    // console.log("here" + req.body.coursename);
      
  
  {
    try {
  
     console.log(req.body);
     var data = new Messagemodel({
        toid: req.body.towhom,
        chatbody: req.body.chatbody,
        time: req.body.time,
        });

      var dataToSave = await data.save();
      res.status(200).json(dataToSave);
     
  
       
      
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  });
  

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})
