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

const allowedOrigins = [
  "http://localhost:3000",
  "https://tic-tac-toe-game-seven-blond.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
    origin: allowedOrigins,
    credentials: true,
  },
});

require("./controllers/socketController")(io);

httpServer.listen(5000, () => {
  console.log("Server is running.....");
});
