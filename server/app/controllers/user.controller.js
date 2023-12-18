exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.studentBoard = (req, res) => {
  res.status(200).send("Student Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.lectureBoard = (req, res) => {
  res.status(200).send("Lecture Content.");
};

exports.facultyHeadBoard = (req, res) => {
  res.status(200).send("Faculty Head Content.");
};


