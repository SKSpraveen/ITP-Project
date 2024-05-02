const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const host = 'localhost';


const PORT = process.env.PORT || 8070

app.use(cors())
app.use(bodyParser.json())

const uri ='mongodb+srv://mynamesasindu:sasindu123@protonsdb.zcrftue.mongodb.net/protonsDB?retryWrites=true&w=majority';

const connect = async () =>{
    try{
        await mongoose.connect(uri);
        console.log('Connected to mongoDB !!..');
    }
    catch(error) {
        console.log('MongoDB Error: ', error);
    }
};
connect();

const server =app.listen(PORT,host,()=>{

    console.log(`Node server is listening to ${server.address().port}`)
    
});
const advertisementRouter = require("./routes/Sasindu/Advertisement.js");
app.use("/Advertisement",advertisementRouter);

const stockRouter = require("./routes/Sasindu/Stock.js");
app.use("/Stock",stockRouter);

const repairtRouter = require("./routes/Samidi/repair.js");
app.use("/repair",repairtRouter);

const cartRouter = require("./routes/Samidi/Cart.js");
app.use("/Cart",cartRouter);

const ExpencesRouter = require("./routes/Rasindu/Expence.js");
app.use("/Expence",ExpencesRouter);

