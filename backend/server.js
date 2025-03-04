const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const http = require("http");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
const PORT = 5000;

// CORS configuration
app.use(cors({
  origin: process.env.ORIGIN || "http://localhost:5173", // Default to local dev if no env var
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(bodyParser.json());

// Serve static files (uploaded images)
app.use("/uploads", express.static(uploadDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only JPG, JPEG, and PNG images are allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// In-memory storage (replace with DB in production)
let profiles = [];
let listings = [];
let messages = [];

app.get("/", (req, res) => res.send("Biztoso Backend Running 🚀"));

// Profiles CRUD
app.post("/profiles", upload.single("imageUrl"), (req, res) => {
  const profile = {
    ...req.body,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
  };
  console.log("Profile:", profile);
  profiles.push(profile);
  res.status(201).json(profile);
});

// Listings CRUD
app.post("/listings", upload.array("images", 5), (req, res) => {
  const listing = {
    id: req.body.id || Date.now().toString(), // Use provided ID or generate new
    name: req.body.name,
    price: parseFloat(req.body.price),
    images: req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [],
  };
  listings.push(listing);
  console.log("New Listing:", listing);
  res.status(201).json(listing);
});

app.get("/listings", (req, res) => {
  res.json(listings);
});

app.put("/listings/:id", upload.array("images", 5), (req, res) => {
  const id = req.params.id;
  const index = listings.findIndex((l) => l.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Listing not found" });
  }

  // Preserve existing images if no new ones uploaded
  const existingImages = listings[index].images || [];
  const newImages = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

  const updatedListing = {
    ...listings[index],
    name: req.body.name || listings[index].name,
    price: parseFloat(req.body.price) || listings[index].price,
    images: newImages.length > 0 ? newImages : existingImages,
  };

  listings[index] = updatedListing;
  console.log("Updated Listing:", updatedListing);
  res.json(updatedListing);
});

app.delete("/listings/:id", (req, res) => {
  const id = req.params.id;
  const index = listings.findIndex((l) => l.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Listing not found" });
  }

  // Optionally delete image files from disk (not implemented here for simplicity)
  listings.splice(index, 1);
  console.log("Deleted Listing ID:", id);
  res.status(204).send();
});

// Socket.IO for Real-Time Messaging
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("sendMessage", (message) => {
    messages.push({ ...message, timestamp: new Date().toISOString() });
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));