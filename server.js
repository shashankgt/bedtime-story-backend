require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Bedroom Stories backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/member.routes.js")(app);
require("./app/routes/story.routes.js")(app);
require("./app/routes/genre.routes.js")(app);
require("./app/routes/language.routes.js")(app);
require("./app/routes/session.routes.js")(app);
require("./app/routes/role.routes.js")(app);
require("./app/routes/settings.routes.js")(app);
require("./app/routes/theme.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3200;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
