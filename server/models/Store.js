const {DataTypes} = require('sequelize');
const sequelize =require('../db/db')
const User = require('./User') 
const Store = sequelize.define('Store',{
    name: DataTypes.STRING,
    email:DataTypes.STRING,
    address: DataTypes.STRING(400),
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'id',
    },
}
})
module.exports = Store;
