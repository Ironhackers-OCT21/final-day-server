// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// ---------------------------------------------------
//      EXPRESS-SESSION CONFIG
// ---------------------------------------------------

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: 'SQU14TL3', //Ideally this will be in you env file
  resave: false,
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 24* 60 * 60 // your cookie will be cleared after these seconds
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/ReactTodos",
    // Time to Live for sessions in DB. After that time it will delete it!
    ttl: 24* 60 * 60 // your session will be cleared after these seconds
  })
}));

// ---------------------------------------------------
//      EXPRESS-SESSION CONFIG
// ---------------------------------------------------


// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const todoRoutes = require('./routes/todo.routes');
app.use('/api', todoRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
