import express from 'express';
import db_connection  from './utility/db_configration.js';
import { port } from './config/config.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './handlers/errorHandler.js';
import prodRoute from './routes/ecomProdRoutes.js';


//creating server
const app = express();

//application level middileware
app.use(express.json());

//assigning port num.
app.listen(port, ()=>{
    console.log(`server is running on port:${port}`);
})

//database connection
db_connection();

//all routes
app.use('/user', userRoutes);
app.use('/fetch' , prodRoute)
//global error handler
app.use(errorHandler)


//route for testing
app.get('/test', (req, res)=>{
    res.send("all is working");
})

