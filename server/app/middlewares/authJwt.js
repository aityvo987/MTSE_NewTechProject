const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log("Check Token",token);

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

authorize = (req, res, next, roles) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, userRoles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        const authorized = roles.some(role => userRoles.some(userRole => userRole.name === role));

        if (authorized) {
          next();
        } else {
          res.status(403).send({ message: `Require one of the roles: ${roles.join(', ')}!` });
        }
      }
    );
  });
};

isStudent = (req, res, next) => {
  authorize(req, res, next, ["Student"]);
}

isAdmin = (req, res, next) => {
  authorize(req, res, next, ["Admin"]);
};

isLecture = (req, res, next) => {
  authorize(req, res, next, ["Lecture"]);
};

isFacultyHead = (req, res, next) => {
  authorize(req, res, next, ["Faculty Head"]);
};

isLectureOrFacultyHead = (req, res, next) => {
  authorize(req, res, next, ["Lecture", "Faculty Head"]);
};

isStudentOrLectureOrFacultyHead = (req, res, next) => {
  authorize(req, res, next, ["Student", "Lecture", "Faculty Head"]);
};

const authJwt = {
  verifyToken,
  isStudent,
  isAdmin,
  isLecture,
  isFacultyHead,
  isLectureOrFacultyHead,
  isStudentOrLectureOrFacultyHead,
};
module.exports = authJwt;
