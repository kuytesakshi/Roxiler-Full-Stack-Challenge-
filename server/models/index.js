const sequelize = require('../db/db');
const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Store, { foreignKey: 'userId' });
Store.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating);
Rating.belongsTo(Store);

module.exports={
    sequelize,
    User,
    Store,
    Rating
};