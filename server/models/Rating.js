const {DataTypes} =require('sequelize');
const sequelize = require('../db/db');

const Rating = sequelize.define('Rating',{
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
           
            min:1,
            max:5
        }
    }
})
module.exports = Rating;