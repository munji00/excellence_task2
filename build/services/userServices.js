var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { secretKey } from '../configration/config.js';
import { sql_connection } from '../utility/db_configration.js';
export const userServices = {
    insertData: (data) => sql_connection.query('INSERT INTO users SET ?', data),
    findData: (value) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield new Promise((resolve, reject) => {
                const sql_query = `SELECT * FROM users WHERE email =?`;
                sql_connection.query(sql_query, value, (err, result) => {
                    if (err)
                        reject(err);
                    resolve(result ? result[0] : null);
                });
            });
            console.log(data);
            return data; // Assuming data is of type userInter
        }
        catch (error) {
            console.error(error);
            return null; // Return void in case of an error
        }
    }),
    delete_user: (value) => {
        let sql_query = "DELETE FROM users WHERE email=?";
        sql_connection.query(sql_query, value, (err, result) => {
            if (err)
                throw new Error(err.message);
        });
    },
    updateUser: (email, newPassword) => {
        let sql_query = "UPDATE users SET password = ? WHERE email = ?";
        sql_connection.query(sql_query, [newPassword, email]);
    },
    dataWithPage: (page_no) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const st_index = (page_no - 1) * 10;
            const data = yield new Promise((resolve, reject) => {
                let sql_query = "SELECT * FROM users ORDER BY userName LIMIT 10 OFFSET ?";
                sql_connection.query(sql_query, st_index, (err, result) => {
                    if (err)
                        reject(err);
                    resolve(result);
                });
            });
            console.log(data);
            return data; // Assuming data is of type userInter
        }
        catch (error) {
            console.error(error);
            return null; // Return null in case of an error
        }
    }),
    createAdd: (addData) => sql_connection.query('INSERT INTO userAddress SET ?', addData),
    deleteAddresses: (addressIds) => {
        let minValue = Math.min(...addressIds);
        let maxValue = Math.max(...addressIds);
        let sql_query = "DELETE FROM userAddress WHERE id BETWEEN ? AND ?";
        sql_connection.query(sql_query, [minValue, maxValue], (err, result) => {
            if (err) {
                console.log(err);
                throw new Error(err.message);
            }
        });
    },
    matchPassword: (password, confirmPassword) => password === confirmPassword,
    generateToken: (obj, time = '1h') => jwt.sign(obj, secretKey, { expiresIn: time })
};
