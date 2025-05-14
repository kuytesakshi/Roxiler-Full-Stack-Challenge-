require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize , User} = require('./models');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoute');
const storeRoutes = require('./routes/storeRoutes');
const ratingRoutes = require('./routes/ratingRoute');
const adminRoutes = require('./routes/adminRoutes');
console.log("✅ DB_USER:", process.env.DB_USER);
console.log("✅ DB_PASSWORD:", process.env.DB_PASSWORD === '' ? '(empty)' : process.env.DB_PASSWORD);

const app = express();
app.use(cors());
app.use(express.json());

// Authenticate and sync DB before starting server
async function startServer() {
    try {
        console.log('Starting server...');
        await sequelize.authenticate(); // Check DB connection
        console.log('✅ DB Connected');
        
        await sequelize.sync({ alter: true }); // Sync DB schema
        console.log('✅ DB Synced');
        
        // Start server after DB sync
        const PORT = process.env.PORT || 5050;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

startServer();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes);