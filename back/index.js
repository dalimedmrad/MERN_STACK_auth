console.clear()
require('dotenv').config();
const express = require('express')
const app = express();
const connectDB = require('./config/dbConnect');




connectDB();
app.use(express.json());
app.use("/api/user",require('./routes/user'));




const PORT = process.env.PORT
app.listen(PORT,(err) => err ? console.log(err): console.log(`server is runnig ${PORT}`));