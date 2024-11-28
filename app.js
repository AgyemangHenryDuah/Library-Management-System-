const express = require("express");
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
