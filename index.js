import express from 'express';
import { db_connection } from './config.js';
import userRoutes from './routes/userRoutes.js';

const PORT = 6005;

//creating server
const app = express();

//assigning port num.
app.listen(PORT, ()=>{
    console.log(`server is running on port:${PORT}`);
})

//database connection
db_connection();

//application level middileware
app.use(express.json());

//all routes
app.use('/user', userRoutes);


//route for testing

app.get('/test', (req, res)=>{
    res.send("all is working");
})

