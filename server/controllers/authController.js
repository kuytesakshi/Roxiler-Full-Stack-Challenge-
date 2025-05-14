const  User  = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../middleware/authMiddleware');

exports.register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name)
      return res.status(400).json({ msg: 'Name required' });

    if (!password.match(/^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/))
      return res.status(400).json({ msg: 'Password does not meet criteria' });

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed, address, role: 'user' });
    res.json({ msg: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ msg: 'Error in registration', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Incorrect password' });

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, role: user.role, name: user.name } });
  } catch (err) {
    res.status(500).json({ msg: 'Error in login', error: err.message });
  }
};
