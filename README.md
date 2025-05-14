
This project is a FullStack web application built with React.js (Frontend), Node.js + Express (Backend), and MySQL (Database).

PROJECT STRUCTURE
root/
│
├── client/           # React Frontend
├── server/           # Node.js + Express Backend
└── database/         # MySQL (via XAMPP)

 client/ (React Frontend)
client/
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── AdminDashboard.js
│   │   ├── StoreOwnerDashboard.js
│   │   ├── UserHomePage.js
│   │   ├── AllStoresPages.jsx
│   │   ├── UserRatingsPage.jsx
│   │   └── UpdatePassword.jsx
|   |   └── UserHomePage.jsx
│   │   └── UserList.jsx
|   |   └── RateStorePage.jsx
|   |   └── StoreList.jsx
│   │   └── AddUserPage.jsx
|   |   └── AddStoarePage.jsx
|   |  
│   ├── services/
│   │   ├── authService.jsx
│   │   ├── userService.jsx
│   │   └── storeService.jsx
│   │   └── ratingService.jsx
|   |   
│   │
│   ├── App.jsx
│   ├── index.jsx
│   
│
├── vite.config.js           # If using Vite
└── package.json


server/ (Node.js + Express Backend)

server/
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── storeController.js
│   └── ratingController.js
│   ├── adminController.js
│   
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── storeRoutes.js
│   └── ratingRoutes.js
│   ├── adminRoutes.js
│  
├── middleware/
│   ├── authMiddleware.js
│   
│
├── config/
│   └── db.js                # MySQL connection
│
├── models/
│   └── index.js             # If you use ORM like Sequelize (optional)
│   ├── User.js
│   └── Store.js
|   ├── Rating.js
│   
├── .env                     # Environment variables (DB credentials, JWT secret)
├── app.js                   # Entry point
├
└── package.json


