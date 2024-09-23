const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://dvkrishna142000:WKJs8WzDoPLPFf75@cluster0.cfbds.mongodb.net/TicTacToe?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected....");
  })
  .catch((err) => {
    console.log(err);
  });

const userRoutes = require("./routes/user.route");
app.use("/api/users", userRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

require("./controllers/socketController")(io);

httpServer.listen(5000, () => {
  console.log("Server is running on port 5000....");
});
