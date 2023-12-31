require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000
const http = require("http").Server(app);

require("./db/conn");

var nowuser="null";
var online=0;
// console.log("hi"+http);
const io = require("socket.io")(http);
var usp = io.of("/user");
usp.on("connection", async function (socket) {
  console.log("user connected toid=" +socket.handshake.auth.toid);

  const updatemsg = await Messagemodel.findOneAndUpdate(
    { 'userid': socket.handshake.auth.token }, {
    $set: { online: 1 },

  });
  const setnowuser = await Messagemodel.findOneAndUpdate(
    { 'userid': socket.handshake.auth.token }, {
    $set: { nowuser: socket.handshake.auth.toid  },

  })
  nowuser=socket.handshake.auth.toid;

  socket.broadcast.emit("onlineuser", { userid: socket.handshake.auth.token })


  socket.on("disconnect", async function () {
    console.log("user disconnected");
    const updatemsg = await Messagemodel.findOneAndUpdate(
      { 'userid': socket.handshake.auth.token }, {
      $set: { "online": 0}

    });
    
     nowuser=socket.handshake.auth.toid;
    
    
  
    socket.broadcast.emit("offlineuser", { userid: socket.handshake.auth.token })


  });


  
  socket.on("setonlinebynet", async function (ds) {
    console.log("user disconnected");
    const updatemsg = await Messagemodel.findOneAndUpdate(
      { 'userid': ds.userid }, {
      $set: { "online": 1}

    });
    
     nowuser=ds.userid;
    
    
  
    socket.broadcast.emit("onlineuser", { userid: nowuser})


  });

  
  socket.on("setofflinebynet", async function (ds) {
    console.log("user disconnected");
    const updatemsg = await Messagemodel.findOneAndUpdate(
      { 'userid': ds.userid }, {
      $set: { "online": 0}

    });
    
     nowuser=ds.userid;
    
    
  
    socket.broadcast.emit("offlineuser", { userid: nowuser})


  });

  
  socket.on("newchat", async function (ds) {







    try {
      ownuserid = ds.ownid;

      var finduserid = await Messagemodel.findOne({ "userid": ownuserid });

      // console.log(findtoid);

      if (finduserid != null) {

        // console.log(findtoid);
        // var toiddetailsfromapi = await Messagemodel.find({userid:req.body.toid});
        //     var toidname=toiddetailsfromapi[0].username;
        var toidname = ds.toname;
        // console.log("hi"+toidname);
        var msgdesc = {
          chatbody: ds.chatbody,
          time: ds.time,
          tagged: ds.swipe,
          msgid: "s" + "1",
        };

        var toiddetails = {
          toname: toidname,
          unseen: 0,
          toid: ds.toid,
          lastmessage: [msgdesc],

          msgdetails: [msgdesc],
        };









        //   console.log(toiddetails);



        //  console.log(req.body);
        var data = new Messagemodel({
          totaltoid: toiddetails,
        });
        // console.log("data");
        // var findtoid = await Messagemodel.findOne({ "totaltoid.toid": req.body.toid,"userid":ownuserid });
        var findtoid = await Messagemodel.findOne(
          {
            $and: [{ "userid": ownuserid, "totaltoid": { $elemMatch: { "toid": ds.toid } } }]

          }
        );
        // console.log(findtoid);
        if (findtoid == null) {
          // console.log("msgdesc");
          // console.log("userid not chat before");
          await Messagemodel.findByIdAndUpdate(finduserid._id, {
            $push: { totaltoid: toiddetails },
          });


        }
        else {
          // console.log(findtoid);
          // console.log("userid chat before");

          // console.log(msgdesc);
          // await Messagemodel.findByIdAndUpdate(findtoid._id,{toid:req.body.toid}, {

          //     $push: {msgdetails: msgdesc },
          //   });
          const updatemsg = await Messagemodel.findOneAndUpdate(
           // { 'userid': ownuserid, 'totaltoid.toid': ds.toid },
           {
            $and: [{ "userid": ownuserid, "totaltoid": { $elemMatch: { "toid": ds.toid } } }]

          },
       
            {
            $push: { "totaltoid.$.msgdetails": msgdesc },
            $set: { "totaltoid.$.lastmessage": msgdesc }

          })
          //  console.log(updatemsg);


        }
        // var toiddetailsfromapi = await Messagemodel.find({userid:req.body.toid});
        //     var toidname=toiddetailsfromapi[0].username;


        var msgdesc = {
          chatbody: ds.chatbody,
          tagged: ds.swipe,
          time: ds.time,
          msgid: "r" + "1",
        };

        var toiddetails = {
          toname: ds.ownname,
          lastmessage: [msgdesc],
          toid: ownuserid,
          unseen: 1,
          msgdetails: [msgdesc],
        };






        //   console.log(toiddetails);



        //  console.log(req.body);
        var data = new Messagemodel({
          totaltoid: toiddetails,
        });

        var finduserid = await Messagemodel.findOne({ "userid": ds.toid });
        // console.log(finduserid);
        // var findtoid = await Messagemodel.findOne({ "userid":req.body.toid,"totaltoid.toid": ownuserid,});
        var findtoid = await Messagemodel.findOne(
          {
            $and: [{ "userid": ds.toid, "totaltoid": { $elemMatch: { "toid": ownuserid } } }]

          }
        );
        // console.log(findtoid);
        if (findtoid == null) {
          // console.log("toid not chat before");

          await Messagemodel.findByIdAndUpdate(finduserid._id, {
            $push: { totaltoid: toiddetails },
          });


        }
        else {
          // console.log("toid  chat before");

          // console.log(findtoid);
          // console.log(msgdesc);
          // await Messagemodel.findByIdAndUpdate(findtoid._id,{toid:req.body.toid}, {

          //     $push: {msgdetails: msgdesc },
          //   });
          console.log(ds.ownid)



          if(findtoid.nowuser!=ds.ownid){
console.log("usermessaged but not in screen");
          
            const updatemsg = await Messagemodel.findOneAndUpdate(
              // { 'userid': req.body.toid, 'totaltoid.toid': ownuserid },
               {
                 $and: [{ "userid": ds.toid, "totaltoid": { $elemMatch: { "toid": ownuserid } } }]
     
               },
                {
               $push: { "totaltoid.$.msgdetails": msgdesc },
               $set: { "totaltoid.$.lastmessage": msgdesc },
               $inc: { "totaltoid.$.unseen": 1 } 
              // $cond: { if: {$eq:["nowuser",nowuser] }, then:{$set: { "totaltoid.$.unseen": 0 } }, else: {$inc: { "totaltoid.$.unseen": 1 } } }
             // $set:{ "totaltoid.$.unseen":{$cond:{"if":{$eq:["nowuser",nowuser]},{then:0},else:{"inc":1}}}},
              //here we have to write the unseen or seen code
  
              
               
             })
  
            }
            else{
console.log("usermessaged and in screen");

  
              const updatemsg = await Messagemodel.findOneAndUpdate(
                // { 'userid': req.body.toid, 'totaltoid.toid': ownuserid },
                 {
                   $and: [{ "userid": ds.toid, "totaltoid": { $elemMatch: { "toid": ownuserid } } }]
       
                 },
                  {
                 $push: { "totaltoid.$.msgdetails": msgdesc },
                 $set: { "totaltoid.$.lastmessage": msgdesc , "totaltoid.$.unseen": 0 },
                // $cond: { if: {$eq:["nowuser",nowuser] }, then:{$set: { "totaltoid.$.unseen": 0 } }, else: {$inc: { "totaltoid.$.unseen": 1 } } }
               // $set:{ "totaltoid.$.unseen":{$cond:{"if":{$eq:["nowuser",nowuser]},{then:0},else:{"inc":1}}}},
                //here we have to write the unseen or seen code
    
                
                 
               })
    
  
            }
          
            //  console.log(updatemsg);


        }

        // var dataToSave = await data.save();
        // res.status(200).json(dataToSave);

      }
      else {
        console.log("user not found");

      }







    } catch (error) {
     // res.status(400).json({ message: error.message });
    }




    var ownuserid = ds.ownid;

var unseenforthisuser=0;
var nowuser=" null";
var datasend="";

    try {



      var findtoid = await Messagemodel.findOne({ $and: [{ "userid": ds.toid, "totaltoid": { $elemMatch: { "toid": ownuserid } } }] });
      // var findtoid = await Messagemodel.findOne({ "totaltoid.toid": req.body.toid,"userid":ownuserid });
      if (findtoid != null) {


        for (var i = 0; i < findtoid.totaltoid.length; i++) {
          if (findtoid.totaltoid[i].toid == ownuserid) {
           // res.status(200).json();
            unseenforthisuser=findtoid.totaltoid[i].unseen;
            nowuser=findtoid.nowuser;
            online=findtoid.online;
            break;

          }

        }
      }
      else {

      }


    } catch (error) {
    }



    try {
      var issend = 0;
      var data = await Messagemodel.find({ userid: ds.toid });
      for (var i = 0; i < data[0].totaltoid.length; i++) {


        if (data[0].totaltoid[i].toid == ds.ownid) {
          issend = 1;

          // res.json(data[0].totaltoid[i].msgdetails);
          datasend=data[0].totaltoid[i].msgdetails;


        }
      }
      if (issend == 0) {

      }
    } catch (error) {
    }


    ownuserid = ds.ownid;

    var finduserid = await Messagemodel.findOne({ "userid": ownuserid });


    const updatemsg = await Messagemodel.findOneAndUpdate(
      { 'userid': ownuserid, 'totaltoid.toid': ds.toid }, {
      $set: { "totaltoid.$.unseen": 0 },
    })


    socket.emit("showchattome",{obj:ds,unseen:unseenforthisuser,nowuser:nowuser,online:online})
    socket.broadcast.emit("showchat",{data:datasend,unseenforthisuser:unseenforthisuser,userid:ds.ownid,toid:ds.toid,lastmessage:ds} );

  })


  socket.on("gotouser",async function(ds){

try {
      ownuserid = ds.ownid;



      const updatemsg = await Messagemodel.findOneAndUpdate(
        { 'userid': ownuserid }, {
        $set: { "totaltoid.$.unseen": 0,  "nowuser":ds.toid },

      })
      console.log("hitted  " +updatemsg);

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
 



    socket.broadcast.emit("iamenteredchat",{userid:ds.userid,toid:ds.toid});
  })




  socket.on("setdpbysocket",async function(ds){

    try {
          ownuserid = ds.ownid;
    
          const updatemsg = await Messagemodel.findOneAndUpdate(
            { 'userid': ds.ownid }, 
           { $set: { "dp":  ds.dp }},
      
      
          );
          
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
     
    
    
    
        socket.broadcast.emit("dpchanged",ds);
      })
      
      
      
      
      socket.on("typingstart",async function(ds){

         
        
        
        
            socket.broadcast.emit("showtypingstart",ds);
          })
          socket.on("typingend",async function(ds){

         
        
        
        
            socket.broadcast.emit("showtypingend",ds);
          })



});
// if (typeof window !== 'undefined') {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');

//     // Perform localStorage action
//      }



if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');

  localStorage.setItem('myFirstKey', 'myFirstValue');
  // console.log(localStorage.getItem('myFirstKey'));

  // console.log("username");
  var username = localStorage.getItem('username');


}

//   var username=localStorage.getItem("username");
var ownuserid = localStorage.getItem("userid");
// console.log("hi"+username);
// require("../views");
// const Register=require("./models/users");
const static_path = path.join(__dirname, "../public");
// app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(static_path));
app.set("view engine", "hbs");
// app.set("view engine");
var cors = require("cors");
const Messagemodel = require("./models/users");
const { Socket } = require("socket.io");

// var ownuserid=4;
app.get("/", (req, res) => {
  // res.send("hello")
  res.render("login");
});
app.get("/chat", (req, res) => {
  // res.send("hello")
  res.render("chat");
});
app.get("/login", (req, res) => {
  // res.send("hello")
  res.render("login");
});

app.get("/register", (req, res) => {
  // res.send("hello")
  res.render("register");
});
app.get("/contact", (req, res) => {
  // res.send("hello")
  res.render("contact");
});
app.get("/settings", (req, res) => {
  // res.send("hello")
  res.render("settings");
});
app.get("/demo", (req, res) => {
  // res.send("hello")
  res.render("demo");
});




app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({
  extended: true
}));




app.post("/", async (req, res) => {

  //   console.log("hit")
  {
    try {
      // console.log("here" + req.body.chatbody);

      var data = new Messagemodel({
        chatbody: req.body.chatbody,
        time: req.body.time,
        toid: req.body.towhom


      });

      var dataToSave = await data.save();
      res.status(200).json(dataToSave);
      // res.json(1);


    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});




app.post("/Setunseentozero", bodyParser.json(), async (req, res) => {
  // console.log("here" + req.body.coursename);


  {
    try {
      ownuserid = req.body.ownid;

      var finduserid = await Messagemodel.findOne({ "userid": ownuserid });


      const updatemsg = await Messagemodel.findOneAndUpdate(
        { 'userid': ownuserid, 'totaltoid.toid': req.body.toid }, {
        $set: { "totaltoid.$.unseen": 0 },

      })

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});





app.post("/Setonline", bodyParser.json(), async (req, res) => {
  // console.log("here" + req.body.coursename);


  {
    try {
      ownuserid = req.body.ownid;
      value = req.body.value;





    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});
app.post("/getunseenno", bodyParser.json(), async (req, res) => {
  // console.log("here" + req.body.coursename);


  {
    try {
      ownuserid = req.body.ownid;



      var findtoid = await Messagemodel.findOne({ $and: [{ "userid": req.body.toid, "totaltoid": { $elemMatch: { "toid": ownuserid } } }] });
      // var findtoid = await Messagemodel.findOne({ "totaltoid.toid": req.body.toid,"userid":ownuserid });
      if (findtoid != null) {


        for (var i = 0; i < findtoid.totaltoid.length; i++) {
          if (findtoid.totaltoid[i].toid == ownuserid) {
            res.status(200).json({unseen:findtoid.totaltoid[i].unseen,"nowuser":findtoid.nowuser});
            break;

          }

        }
      }
      else {
        res.status(200).json(null);

      }


    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

app.post("/gettoidonlinestatus", bodyParser.json(), async (req, res) => {
  // console.log("here" + req.body.coursename);


  {
    try {
      ownuserid = req.body.ownid;



      // var findtoid = await Messagemodel.findOne({$and:[{ "userid":req.body.toid ,"totaltoid":{$elemMatch:{"toid" : ownuserid}}}]});
      // var findtoid = await Messagemodel.findOne({ "totaltoid.toid": req.body.toid,"userid":ownuserid });
      var finduserid = await Messagemodel.findOne({ "userid": req.body.toid });

      res.status(200).json(finduserid);



    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});




app.post("/Sendmessage", bodyParser.json(), async (req, res) => {
  // console.log("here" + req.body.coursename);


  {







    try {
      ownuserid = req.body.ownid;

      var finduserid = await Messagemodel.findOne({ "userid": ownuserid });

      // console.log(findtoid);

      if (finduserid != null) {

        // console.log(findtoid);
        // var toiddetailsfromapi = await Messagemodel.find({userid:req.body.toid});
        //     var toidname=toiddetailsfromapi[0].username;
        var toidname = req.body.toname;
        // console.log("hi"+toidname);
        var msgdesc = {
          chatbody: req.body.chatbody,
          time: req.body.time,
          tagged: req.body.swipe,
          msgid: "s" + "1",
        };

        var toiddetails = {
          toname: toidname,
          unseen: 0,
          toid: req.body.toid,
          lastmessage: [msgdesc],

          msgdetails: [msgdesc],
        };






        //   console.log(toiddetails);



        //  console.log(req.body);
        var data = new Messagemodel({
          totaltoid: toiddetails,
        });
        // console.log("data");
        // var findtoid = await Messagemodel.findOne({ "totaltoid.toid": req.body.toid,"userid":ownuserid });
        var findtoid = await Messagemodel.findOne(
          {
            $and: [{ "userid": ownuserid, "totaltoid": { $elemMatch: { "toid": req.body.toid } } }]

          }
        );
        // console.log(findtoid);
        if (findtoid == null) {
          // console.log("msgdesc");
          // console.log("userid not chat before");
          await Messagemodel.findByIdAndUpdate(finduserid._id, {
            $push: { totaltoid: toiddetails },
          });


        }
        else {
          // console.log(findtoid);
          // console.log("userid chat before");

          // console.log(msgdesc);
          // await Messagemodel.findByIdAndUpdate(findtoid._id,{toid:req.body.toid}, {

          //     $push: {msgdetails: msgdesc },
          //   });
          const updatemsg = await Messagemodel.findOneAndUpdate(
            { 'userid': ownuserid, 'totaltoid.toid': req.body.toid }, {
            $push: { "totaltoid.$.msgdetails": msgdesc },
            $set: { "totaltoid.$.lastmessage": msgdesc }

          })
          //  console.log(updatemsg);


        }
        // var toiddetailsfromapi = await Messagemodel.find({userid:req.body.toid});
        //     var toidname=toiddetailsfromapi[0].username;


        var msgdesc = {
          chatbody: req.body.chatbody,
          tagged: req.body.swipe,
          time: req.body.time,
          msgid: "r" + "1",
        };

        var toiddetails = {
          toname: req.body.ownname,
          lastmessage: [msgdesc],
          toid: ownuserid,
          unseen: 1,
          msgdetails: [msgdesc],
        };






        //   console.log(toiddetails);



        //  console.log(req.body);
        var data = new Messagemodel({
          totaltoid: toiddetails,
        });

        var finduserid = await Messagemodel.findOne({ "userid": req.body.toid });
        // console.log(finduserid);
        // var findtoid = await Messagemodel.findOne({ "userid":req.body.toid,"totaltoid.toid": ownuserid,});
        var findtoid = await Messagemodel.findOne(
          {
            $and: [{ "userid": req.body.toid, "totaltoid": { $elemMatch: { "toid": ownuserid } } }]

          }
        );
        // console.log(findtoid);
        if (findtoid == null) {
          // console.log("toid not chat before");

          await Messagemodel.findByIdAndUpdate(finduserid._id, {
            $push: { totaltoid: toiddetails },
          });


        }
        else {
          // console.log("toid  chat before");

          // console.log(findtoid);
          // console.log(msgdesc);
          // await Messagemodel.findByIdAndUpdate(findtoid._id,{toid:req.body.toid}, {

          //     $push: {msgdetails: msgdesc },
          //   });

          const updatemsg = await Messagemodel.findOneAndUpdate(
           // { 'userid': req.body.toid, 'totaltoid.toid': ownuserid },
            {
              $and: [{ "userid": req.body.toid,"nowuser":nowuser, "totaltoid": { $elemMatch: { "toid": ownuserid } } }]
  
            },
             {
            $push: { "totaltoid.$.msgdetails": msgdesc },
            $set: { "totaltoid.$.lastmessage": msgdesc },
            $cond: { if: { "nowuser": nowuser }, then:{$set: { "totaltoid.$.unseen": 0 } }, else: {$inc: { "totaltoid.$.unseen": 1 } } }

          })
          //  console.log(updatemsg);


        }

        // var dataToSave = await data.save();
        // res.status(200).json(dataToSave);

      }
      else {
        console.log("user not found");

      }







    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});





app.post("/registernew", bodyParser.json(), async (req, res) => {

  //   console.log("hit")
  {
    try {
      // console.log("here" + req.body.name);
      var useriddata = await Messagemodel.find().sort({ _id: -1 }).limit(1);
      //   console.log(useriddata);
      var useriddatanow = 0;
      if (useriddata == null || useriddata.length == 0) {
        useriddatanow = 0;
      }
      else {
        useriddatanow = useriddata[0].userid;
      }
      // console.log(useriddata.userid);
      // console.log(req.body.name);

      var data = new Messagemodel({
        userid: useriddatanow + 1,
        username: req.body.name,
        email: req.body.email,
        online: 0,
        dp: req.body.dp,
        about: "Hi,Myself " + req.body.name + ".Wanna talk with me?",
        password: req.body.pass,
      });
      // console.log("hey "+data);

      var finduser = await Messagemodel.findOne({ email: req.body.email });
      if (finduser != null) {
        // alert("user already exist");
        //  res.send(null);
        res.status(200).json(null);


        // res.redirect("/login");

      }
      else {
        var dataToSave = await data.save();
        // location.href("http://localhost:3000");
        res.status(200).json(dataToSave);
        //  res.send(body);
        // res.redirect("/");
      }

      //   res.status(200).json(data);
      //   res.json(1);



    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


});


app.post("/loginuser", bodyParser.json(), async (req, res) => {

  //   console.log("hit")
  {
    try {
      // console.log("here" + req.body.email);

      if(req.body.value==0){

      
      var finduser = await Messagemodel.findOne({ email: req.body.email });
      if (finduser != null && finduser.password == req.body.pass) {
        // alert("user already exist");
        // res.redirect("/");
        // console.log( "hedxei"+finduser);
        res.status(200).json(finduser);

      }
      else {
        // var dataToSave = await data.save();
        // location.href("http://localhost:3000");
        // res.status(200).json(dataToSave);
        res.status(200).json(null);

        // res.redirect("/");
      }

      //   res.status(200).json(data);
      //   res.json(1);
    }
    else{
      var finduser = await Messagemodel.findOne({ email: req.body.email });
      if (finduser != null) {
        // alert("user already exist");
        // res.redirect("/");
        // console.log( "hedxei"+finduser);
        res.status(200).json(finduser);
      }
      else {
        // var dataToSave = await data.save();
        // location.href("http://localhost:3000");
        // res.status(200).json(dataToSave);
        res.status(200).json(null);

        // res.redirect("/");
      }


    }


    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


});


app.post("/Getuser", async (req, res) => {
  try {
    var data = await Messagemodel.find();
    // console.log(data);
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/Getinboxcontacts", bodyParser.json(), async (req, res) => {
  try {
    var data = await Messagemodel.find({ userid: req.body.userid });
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/deletefullchat", bodyParser.json(), async (req, res) => {
  try {
    // console.log("atleast hotted");



    const updatemsg = await Messagemodel.findOneAndUpdate(
      { 'userid': req.body.ownid }, {
      $pull: { "totaltoid": { toid: req.body.toid } },


    });
    //  console.log(updatemsg);


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/setfavorites", bodyParser.json(), async (req, res) => {
  try {
    var data = await Messagemodel.find({ userid: req.body.ownid });

    if (req.body.set == 0) {
      var details = await Messagemodel.findByIdAndUpdate(data[0]._id, {
        $push: { favourites: req.body.toid },
      });

    }
    else {
      await Messagemodel.findByIdAndUpdate(data[0]._id, {
        $pull: { favourites: req.body.toid },
      });



    }
    // console.log(data[0].favourites);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/Showmessage", bodyParser.json(), async (req, res) => {
  try {
    var issend = 0;
    var data = await Messagemodel.find({ userid: req.body.ownid });
    for (var i = 0; i < data[0].totaltoid.length; i++) {


      if (data[0].totaltoid[i].toid == req.body.toid) {
        issend = 1;

        res.json(data[0].totaltoid[i].msgdetails);
      }
    }
    if (issend == 0) {
      res.json(null);
    }
    //console.log(data)
  } catch (error) {
    //   res.status(500).json({ message: error.message });
  }


  ownuserid = req.body.ownid;

  var finduserid = await Messagemodel.findOne({ "userid": ownuserid });


  const updatemsg = await Messagemodel.findOneAndUpdate(
{    $and: [{ "userid": ownuserid, "totaltoid": { $elemMatch: { "toid": req.body.toid } } }]},

   // { 'userid': ownuserid, 'totaltoid.toid': req.body.toid }, {
   {$set: { "totaltoid.$.unseen": 0 },

  })


});


app.post("/updateabout", bodyParser.json(), async (req, res) => {
  try {
    // console.log("atleast hotted");



    const updatemsg = await Messagemodel.findOneAndUpdate(
      { 'userid': req.body.ownid }, {
      $set: { "about":  req.body.about },


    });
    //  console.log(updatemsg);


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/setdp", bodyParser.json(), async (req, res) => {
  try {
    // console.log("atleast hotted");



    const updatemsg = await Messagemodel.findOneAndUpdate(
      { 'userid': req.body.ownid }, 
     { $set: { "dp":  req.body.dp }},


    );
     console.log(updatemsg);


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/sendmailreg", bodyParser.json(),async (req, res) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.gmail,
      pass: process.env.password,
    },
  });
  // document.getElementById("show").innerHTML=showbatch;
  let x=req.body.otp;
  var mailOptions = {
    from: process.env.gmail,
    to: req.body.email,
    subject: "Subject",

    html:
      `<div>
        <h1>Dear ` +
      req.body.name +
      `,</h1>
        <p>Welcome to Chat app.you have registered through this email id.</p>
        <article>Kindly register through your OTP.</article>
        <div>
            <p><strong>OTP</strong>:` +
      x +
      `</p>
           
        </div>

        
    </div>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      //   break;
      // do something useful
    }
  });
});

app.post("/sendmailforgotpassword", bodyParser.json(),async (req, res) => {

var user="";
  try {



    // var findtoid = await Messagemodel.findOne({$and:[{ "userid":req.body.toid ,"totaltoid":{$elemMatch:{"toid" : ownuserid}}}]});
    // var findtoid = await Messagemodel.findOne({ "totaltoid.toid": req.body.toid,"userid":ownuserid });
    var finduserid = await Messagemodel.findOne({ "email": req.body.email });

    // res.status(200).json(finduserid);
    
    console.log(finduserid.password);
    user=finduserid;



  } catch (error) {
    res.status(400).json({ message: error.message });
  }
var mailbody="";

if(user==null || user=="null" || user==undefined || user=="undefined"){
  mailbody=`No email registered with our app.`;
}
else{
mailbody=`<div>
<h1>Dear `+user.username+` 
,</h1>Your account password is  
<p>password:`+user.password+`</p>
   
</div>


</div>`
}


  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.gmail,
      pass: process.env.password,
    },
  });
  // document.getElementById("show").innerHTML=showbatch;
  var mailOptions = {
    from: process.env.gmail,
    to: req.body.email,
    subject: "Subject",

    html:
      mailbody,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      //   break;
      // do something useful
    }
  });
});


http.listen(port, () => {
  // console.log(`server is running at port no ${port}`);
})
