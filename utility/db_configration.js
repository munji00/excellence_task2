import { db_url } from "../config/config.js";
import { Sequelize } from "sequelize";
import mysql from 'mysql2'
import {app} from '../index.js'
import mongoose from "mongoose";

export const sequelize = new Sequelize('task1', 'siddiqui', '@Mu786Mu@', {
  host: 'localhost',
  dialect: 'mysql'
});

const db_connection = async()=>{
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully with task1 db.');
   } catch (error) {
    console.error('Unable to connect to the database:', error);
   }
    /*try {
        await mongoose.connect(db_url);
        console.log("database connected successfully");
        app.listen(port, ()=>{
    console.log(`server is running on port:${port}`);
})

    } catch (error) {
        console.log("error in database connection" ,error);
    }*/
}

export default db_connection;