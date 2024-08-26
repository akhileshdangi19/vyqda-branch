
const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const db = require("./src/models");
db.sequelize.sync().then(() => {
  console.log("Synced with the database.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

// Routes
const todoRoutes = require("./src/routes/todo.routes");
app.use("/api/todo", todoRoutes);

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Todo API." });
});

// Set Port, Listen for Requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
