const {Store, Rating,User} = require('../models')
const { Op} = require('sequelize')
const { hashPassword } = require('../middleware/authMiddleware');

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, userId } = req.body;

    if (!userId)
      return res.status(400).json({ msg: 'userId (Store Owner ID) is required' });

    const store = await Store.create({ name, email, address, userId:req.user.id });
    res.json({ msg: 'Store created', store });
  } catch (err) {
    res.status(500).json({ msg: 'Error creating store', error: err.message });
  }
};
exports.getAllStores = async(req,res)=>{
    try{
        const {name, address} =req.query;
        const where = {};
        if (name) where.name = {[Op.like]: `%${name}%`};
        if (address) where.address = {[Op.like]: `%${address}%`};
        
        const stores = await Store.findAll({
            where,
            include: [ {
                model: Rating,
                attributes: ['rating']
            }]
               });
              // Add averageRating to each store
    const storesWithAvgRating = stores.map(store => {
      const ratings = store.Ratings.map(r => r.rating);
      const avgRating =
        ratings.reduce((acc, curr) => acc + curr, 0) / (ratings.length || 1);
      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating: avgRating.toFixed(2),
        totalRatings: ratings.length,
      };
    });

    res.json(storesWithAvgRating);

    }catch(err){
        res.status(500).json({msg:'Error getting stores', error: err.message})

    }
}
exports.getStoreRatings = async (req, res) => {
    try {
      const storeId = req.user.id; // store_owner's storeId must match user.id
      console.log('Store ID:', storeId);
      const store = await Store.findByPk(storeId, {
        include: [
          {
            model: Rating,
            include: [{ model: User, attributes: ['name', 'email'] }]
          }
        ]
      });
  
      if (!store) return res.status(404).json({ msg: 'Store not found' });
      res.json(store);
    } catch (err) {
      res.status(500).json({ msg: 'Error fetching ratings', error: err.message });
    }
  };
exports.getDashboard = async (req, res) => {
  try {
    const storeOwnerId = req.user.id; // Store owner's user ID
    
    // Find the store owned by the logged-in user
   
    const store = await Store.findOne({ where: { userId: storeOwnerId } });
  
    if (!store) return res.status(404).json({ msg: 'Store not found for this user' });

    // Get ratings for the store
    const ratings = await Rating.findAll(
      { where: { storeId: store.id }, 
      include: [User] });

    // Calculate average rating
    const averageRating =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / (ratings.length || 1);

    res.json({
      storeName: store.name,
      averageRating: averageRating.toFixed(2),
      totalRatings: ratings.length,
      ratings: ratings.map(r => ({
        user: r.User.name,
        rating: r.rating,
        comment: r.comment || '',
      }))
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching dashboard', error: err.message });
  }
};


exports.updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password.match(/^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/)) {
      return res.status(400).json({ msg: 'Password must be 8–16 chars with uppercase and special character' });
    }
    const hashed = await hashPassword(password);
    await User.update({ password: hashed }, { where: { id: req.user.id } });
    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating password', error: err.message });
  }
};
