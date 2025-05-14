const sequelize = require('../db/db');
const { hashPassword } = require('../middleware/authMiddleware');
const { QueryTypes } = require('sequelize');

const addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  if (!name || !email || !password || !address || !role) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  if (name.length < 20 || name.length > 60) {
    return res.status(400).json({ msg: 'Name must be 20-60 characters' });
  }

  if (address.length > 400) {
    return res.status(400).json({ msg: 'Address must be <= 400 characters' });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
  if (password.length < 8 || password.length > 16 || !passwordRegex.test(password)) {
    return res.status(400).json({ msg: 'Password must be 8-16 chars, include 1 uppercase and 1 special character' });
  }

  try {
    const existing = await sequelize.query(
      'SELECT id FROM users WHERE email = :email',
      {
        replacements: { email },
        type: QueryTypes.SELECT
      }
    );

    if (existing.length > 0) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    const hashed = await hashPassword(password);

    await sequelize.query(
      'INSERT INTO users (name, email, password, address, role) VALUES (:name, :email, :password, :address, :role)',
      {
        replacements: { name, email, password: hashed, address, role },
        type: QueryTypes.INSERT
      }
    );

    res.json({ msg: 'User added successfully' });

  } catch (err) {
    console.error(err);

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
};


module.exports = {
  addUser
};
