import mysql2 from 'mysql2';

export const sql_connection = mysql2.createConnection({
  host: 'localhost',
  user: 'siddiqui',
  password:'@Mu786Mu@',
  database: 'task1'
});

export const db_connection = async()=> {
   try {
    await sql_connection.connect()
    var userTable = `CREATE TABLE IF NOT EXISTS users(
    user_id int AUTO_INCREMENT NOT NULL,    
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    userName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (user_id))`

    var userAddressTable = `CREATE TABLE IF NOT EXISTS userAddress(
    address_id int AUTO_INCREMENT NOT NULL,
    user_id int,    
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    pinCode VARCHAR(255),
    mobileNumber VARCHAR(255),
    PRIMARY KEY (address_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL)`

    sql_connection.query(userTable);
    sql_connection.query(userAddressTable);

    console.log("db connection established");
   } catch (error) {
    console.log(error);
   }
}