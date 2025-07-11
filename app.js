const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const chalk = require("chalk");
const { profile } = require("console");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3030;
const log = console.log;
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Adham:K2pXYL82vrJsmqk4@cluster0.94gew.mongodb.net/events"
  )
  .then(() => log(chalk`{green [Success]} Connected to MongoDB`))
  .catch((err) => log(chalk`{red [Error]} ${err.message}`));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "views")));
app.use(
  session({
    secret: "VERYSECRETKEY",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Multer for profile picture upload

// Routes
app.get("/", async (req, res) => {
  const events = await Event.find().sort({ date: -1 });
  res.render("index", { events });
});

app.get("/contact", (req, res) => {
  const success = req.query.success === "1";
  res.render("contact", { success });
});


app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form submitted:", { name, email, message });

  // Redirect to contact with a success flag
  res.redirect("/contact?success=1");
});

app.get("/home", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.render("home", { events });
  } catch (err) {
    res.status(500).send("Failed to load events.");
  }
});

app.get("/about", (req, res) => res.render("about"));

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.render("events", { events });
  } catch (err) {
    res.status(500).send("Failed to load events.");
  }
});
// app.get('/test', (req, res) => res.render('loghome',  {
//     status : req.session.userId
// }));

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  artist: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Event = mongoose.model("Events", eventSchema);

// 404 Page

app.use((req, res) => res.status(404).render("404"));

// Start Server
server.listen(port, () =>
  log(chalk`{green [Success]} Listening on port {green ${port}}`)
);
