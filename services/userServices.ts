
import jwt from 'jsonwebtoken';
import { secretKey } from '../configration/config';
import { sql_connection } from '../utility/db_configration';
import { userInter, addInter } from '../interfaces.td';
import { jsonDataInter } from '../interfaces.td';
import { RowDataPacket } from 'mysql2';


export const userServices = {
    insertData :(data:userInter) => sql_connection.query('INSERT INTO users SET ?', data ),

    findData : async (value: string | undefined): Promise<userInter | null> => {
    try {
        const data = await new Promise((resolve, reject)=> {
            const sql_query = `SELECT * FROM users WHERE email ='${value}'`
            sql_connection.query(sql_query ,(err:Error, result:RowDataPacket | null) => {
                if (err) reject(err);
                resolve(result? result[0]:null);
            });
        });

        console.log(data);
        return data as userInter ; // Assuming data is of type userInter
      } catch (error) {
        console.error(error);
        return null; // Return null in case of an error
      }
    },


    delete_user:(value:string | undefined) => {
        let sql_query = "DELETE FROM users WHERE email=?"
        sql_connection.query(sql_query, value, (err, result)=> {
            if(err) throw new Error(err.message)
        });
    },

    updateUser:(email:string | undefined,  newPassword:string)=> {
        let sql_query ="UPDATE users SET password = ? WHERE email = ?"
        sql_connection.query(sql_query, [newPassword, email])
    },

    dataWithPage:async(page_no:number): Promise<userInter[] | null> => {
    try {
            const st_index = (page_no -1)*10
            const data = await new Promise((resolve, reject) => {
            let sql_query = "SELECT * FROM users ORDER BY userName LIMIT 10 OFFSET ?"
            sql_connection.query(sql_query, st_index ,(err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        console.log(data);
        return data as userInter[]; // Assuming data is of type userInter
       } catch (error) {
        console.error(error);
        return null; // Return null in case of an error
       }
    },

    createAdd:(addData:addInter) => sql_connection.query('INSERT INTO userAddress SET ?', addData ),

    deleteAddresses:(addressIds:number[]) => {
        let minValue = Math.min(...addressIds);
        let maxValue = Math.max(...addressIds)
        let sql_query = "DELETE FROM userAddress WHERE id BETWEEN ? AND ?"
        sql_connection.query(sql_query, [minValue, maxValue],(err, result)=>{
            if(err){
                console.log(err)
                throw new Error(err.message)
            }
        })
    },

    matchPassword :(password:string, confirmPassword:string)=> password===confirmPassword,

    generateToken:(obj:jsonDataInter, time='1h') => jwt.sign(obj, secretKey , {expiresIn:time})
}
