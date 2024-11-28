#!/bin/bash

# Create main directories
mkdir controllers middlewares models routes views

# Create subdirectories inside views for Pug templates
mkdir views/layouts views/partials views/librarian views/user views/auth

# Create files for controllers
touch controllers/bookController.js controllers/userController.js controllers/authController.js

# Create files for middlewares
touch middlewares/authMiddleware.js middlewares/validation.js

# Create files for models
touch models/book.js models/user.js models/loan.js

# Create files for routes
touch routes/bookRoutes.js routes/userRoutes.js routes/authRoutes.js

# Create files for views
touch views/layouts/main.pug
touch views/partials/header.pug views/partials/footer.pug
touch views/librarian/dashboard.pug views/librarian/addBook.pug views/librarian/report.pug
touch views/user/browse.pug views/user/loanHistory.pug views/user/search.pug
touch views/auth/login.pug views/auth/register.pug

# Create .env and main files
touch .env .gitignore app.js db.js package.json README.md

# Create default content for .env
echo "PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=library
JWT_SECRET=your_jwt_secret" > .env

# Create default content for .gitignore
echo "node_modules/
.env" > .gitignore

# Create default content for package.json
echo '{
  "name": "library-management-system",
  "version": "1.0.0",
  "description": "A Library Management System",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mysql2": "^2.3.3",
    "sequelize": "^6.6.5",
    "dotenv": "^10.0.0",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "bcrypt": "^5.0.1",
    "jsonwebtoken": "^8.5.1",
    "ejs": "^3.1.6"
  },
  "devDependencies": {
    "nodemon": "^2.0.7",
    "eslint": "^7.32.0"
  },
  "author": "",
  "license": "ISC"
}' > package.json

# Create default content for app.js
echo 'const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const sequelize = require("./db");

// Routes
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Database Sync
sequelize.sync({ force: false })
  .then(() => console.log("Database synchronized"))
  .catch(err => console.error("Database sync error:", err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));' > app.js

# Create default content for db.js
echo 'const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.error("Database connection failed:", err));

module.exports = sequelize;' > db.js

# Done
echo "Library Management System folder structure created successfully!"
