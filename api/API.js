require('dotenv').config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3002;
const VALID_API_KEYS = process.env.VALID_API_KEYS.split(',');

// Middleware to validate API keys
const validateApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || !VALID_API_KEYS.includes(apiKey)) {
    return res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }
  next();
};

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Define a schema for the userids "table" (sub-collection)
const userIdsSchema = new mongoose.Schema({
  id: Number,
  username: String,
  publickey: String,
  email: String,
  password: String,
  AccountType: String,
  offset: Number
});

const projectSchema = new mongoose.Schema({
  id: Number,
  name: String,
  location: String,
  CC: String,
  owner: String,
  publickey: String,
});

// Define a model based on the schema
const UserIds = mongoose.model("UserIds", userIdsSchema);
const Projects = mongoose.model("Projects", projectSchema);

// Create an Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use API key validation middleware for all routes
app.use(validateApiKey);

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/api/userids/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserIds.findOne({ username: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/publickey/:publickey", async (req, res) => {
  try {
    const { publickey } = req.params;
    const user = await UserIds.findOne({ publickey });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/add_user", async (req, res) => {
  console.log("Received POST request:", req.body);
  try {
    const collection = db.collection("userids");
    const { email, pwd, public_key, user_type } = req.body;
    const result = await collection.insertOne({ email: email, password: pwd, publickey: public_key, usertype: user_type });
    const insertedUser = await collection.findOne({ _id: result.insertedId });
    res.json(insertedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/get_projects", async (req, res) => {
  try {
    const user = await Projects.find({});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/project/:project", async (req, res) => {
  try {
    const { project } = req.params;
    const user = await Projects.findOne({ name: project });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/remove_project/:project", async (req, res) => {
  try {
    const { project } = req.params;
    const result = await Projects.deleteOne({ name: project });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/add_project", async (req, res) => {
  console.log("Received POST request:", req.body);
  try {
    const collection = db.collection("projects");
    const { id, name, location, CC, owner, publickey } = req.body;
    const result = await collection.insertOne({ id, name, location, CC, owner, publickey });
    const insertedProject = await collection.findOne({ _id: result.insertedId });
    res.json(insertedProject);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/Update_user_CC/:publickey/:cc", async (req, res) => {
  try {
    const { publickey, cc } = req.params;
    const user = await UserIds.findOne({ publickey });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedCarbonoffset = user.offset + parseInt(cc);
    const updatedUser = await UserIds.findOneAndUpdate(
      { publickey: publickey },
      { $set: { offset: updatedCarbonoffset } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/Update_project_CC/:publickey/:CCs", async (req, res) => {
  try {
    const { publickey, CCs } = req.params;
    const user = await Projects.findOne({ publickey });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedCarbonoffset = user.CC - parseInt(CCs);
    const updatedUser = await Projects.findOneAndUpdate(
      { publickey: publickey },
      { $set: { CC: updatedCarbonoffset } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
