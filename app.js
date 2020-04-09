const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const mongoose= require('mongoose');
const postRoute=require('./routes/post')
const getParkedRoute=require('./routes/Get_Parked/getParked');
const getParkedWebAppRoute=require('./routes/Get_Parked/getParkedWebApp');

require('dotenv/config');

//MiddleWares
app.use(cors());
app.use(bodyParser.json());
app.use('/post', postRoute);
app.use('/get_parked', getParkedRoute);
app.use('/get_parked/web_app', getParkedWebAppRoute);

//Routes
app.get('/', (req, res)=>{
    res.send("I m ON or OFF");
});

//Connect To DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,  useUnifiedTopology: true } , 
    (error)=>{
        console.log(error);
});

app.listen(process.env.PORT||3000);