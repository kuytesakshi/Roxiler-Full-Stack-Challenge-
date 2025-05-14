const { Rating, Store, User } = require('../models');
const db = require('../db/db');
exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    const existing = await Rating.findOne({ where: { userId: req.user.id, storeId } });

    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json({ msg: 'Rating updated', rating: existing });
    }

    const newRating = await Rating.create({ userId: req.user.id, storeId, rating });
    res.json({ msg: 'Rating submitted', rating: newRating });
  } catch (err) {
    res.status(500).json({ msg: 'Error submitting rating', error: err.message });
  }
};
exports.getUserRatings = async (req, res) => {
  const userId = req.user.id;
console.log("Fetching ratings for userId:", req.user.id);
  try {
    const userRatings = await Rating.findAll({
      where: { userId },
      include: [
        {
          model: Store,
          include: [{ model: Rating, attributes: ['rating'] }]
        }
      ]
    });

     const response = userRatings.map(r => {
      const storeRatings = r.Store.Ratings.map(rate => rate.rating);
      const avgRating = storeRatings.reduce((a, b) => a + b, 0) / (storeRatings.length || 1);
      return {
        id: r.id,
        rating: r.rating,
        storeId: r.storeId,
        Store: {
          name: r.Store.name,
          email: r.Store.email,
          address: r.Store.address
        },
        averageRating: avgRating.toFixed(2),
        totalRatings: storeRatings.length
      };
    });

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching ratings', error: err.message });
  }
};
