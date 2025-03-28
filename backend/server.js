require("dotenv").config();
const express = require("express");
const { chats } = require("./data/data");
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes')
const uploadRoutes = require('./routes/uploadRoutes');
const chatRoutes = require("./routes/chatRoutes");
const path = require("path");
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const cors = require("cors");

connectDB();
const app = express();
app.use(cors({
    origin: "http://localhost:3000",   // React frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use('/api/user', userRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
