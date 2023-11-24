import {DataTypes } from 'sequelize';
import { sequelize } from '../utility/db_configration.js';

export const userAddress = sequelize.define('userAddress', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull:false
  },
  city:{
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING,
    allowNull:false
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull:false
  },
}, {
  tableName:"userAddress",
  timestamps:true
  // Other model options go here
});

userAddress.sync();

// `sequelize.define` also returns the model
console.log(userAddress === sequelize.models.userAddress); // true