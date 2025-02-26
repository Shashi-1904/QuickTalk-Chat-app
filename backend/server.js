require("dotenv").config(); // Load before using process.env

const express = require("express");
const { chats } = require("./data/data");
const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/chat/", (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    const singlechats = chats.find((c) => c._id === req.params.id);
    res.send(singlechats);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
