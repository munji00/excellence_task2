import express from 'express';
import {db_connection }from './utility/db_configration';
import { redisConnection } from './configration/redisConnection';
import { port } from './configration/config';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './handlers/errorHandler'


//creating server
export const app = express();

//application level middileware
app.use(express.json());
app.listen(port, ()=> console.log(`server is running on port: ${port}`))


//database connection
db_connection();
redisConnection();

//all routes
app.use('/user', userRoutes);


//global error handler
app.use(errorHandler)


//route for testing
app.get('/test', (req, res)=>{
    res.send("all is working");
})

