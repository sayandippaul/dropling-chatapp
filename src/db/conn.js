require("dotenv").config();

const mongoose=require("mongoose");
var mongostringglobal=process.env.databasestring;
mongoose.connect(mongostringglobal,

{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    
    console.log(e);

})




// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sayandip:<sayandip2003>@dropling.beoaja8.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("dropling").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
