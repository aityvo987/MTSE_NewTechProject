const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:5000",
  limit:"50mb",
};

app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
mongodb://
db.mongoose
  .connect(`mongodb+srv://dat:dat@atlascluster.kxtotbl.mongodb.net/new_tech?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(session({
    secret: 'my-secret', // a secret string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: false // don't create session until something stored
}))
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to New Tech application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/faculty.routes")(app);
require("./app/routes/major.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/lecture.routes")(app);
require("./app/routes/topic.routes")(app);
require("./app/routes/topicPeriod.routes")(app);
require("./app/routes/topicTask.routes")(app);
require("./app/routes/notification.routes")(app);
require("./app/routes/session.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/schoolYear.routes")(app);
// require("./app/routes/file.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
