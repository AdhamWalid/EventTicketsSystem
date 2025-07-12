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

// Routes
app.get("/", async (req, res) => {
  const events = await Event.find().sort({ date: -1 });
  res.render("home", { events });
});

const adminPassword = "secret123";

function checkAdmin(req, res, next) {
  const isAdmin = req.query.admin === adminPassword;
  if (isAdmin) {
    next();
  } else {
    res
      .status(403)
      .send(
        "Access denied: Admins only , if you think this is a mistake contact website adminstrators."
      );
  }
}

app.get("/add-event", checkAdmin, (req, res) => {
  res.render("add-event");
});

// POST: Handle New Event Submission
app.post("/add-event", checkAdmin, async (req, res) => {
  try {
    const newEvent = new Event({
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      country: req.body.country,
      description: req.body.description,
      price: req.body.price,
      artist: req.body.artist,
      imageUrl: req.body.imageUrl,
    });

    await newEvent.save();
    res.redirect("/events");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add event.");
  }
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

app.post("/purchase", async (req, res) => {
  const { eventTitle, name, email, ticketCount } = req.body;

  try {
    const event = await Event.findOne({ title: eventTitle });

    if (!event) {
      return res.status(404).send("Event not found.");
    }

    res.render("purchase-panel", {
      name,
      email,
      ticketCount,
      event,
      total: ticketCount * event.price,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

app.post("/confirm-purchase", (req, res) => {
  const { name, email, eventTitle, ticketCount } = req.body;

  // Here you would normally save to a database
  console.log(
    `Purchase confirmed: ${ticketCount} x ${eventTitle} for ${name} (${email})`
  );

  res.send(
    `<h1>Thank you, ${name}!</h1><p>Your purchase for ${ticketCount} tickets to <strong>${eventTitle}</strong> is confirmed.<br>See you there.</p>`
  );
});

// 404 Page

app.use((req, res) => res.status(404).render("404"));

// Start Server
server.listen(port, () =>
  log(chalk`{green [Success]} Listening on port {green ${port}}`)
);
