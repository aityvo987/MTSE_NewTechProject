const mongoose = require('mongoose');
const Topic = require('../models/topic.model');

// Controller to add a new topic
exports.addTopic = async (req, res) => {
    try {
        const {
            topicName,
            description,
            students,
            faculty,
            major,
        } = req.body;

        const areStudentsValid = students.every(studentId => mongoose.Types.ObjectId.isValid(studentId));

        if (!areStudentsValid) {
            return res.status(400).json({ error: 'Invalid studentId in the students array' });
        }

        if (!mongoose.Types.ObjectId.isValid(faculty)) {
            return res.status(400).json({ error: `Invalid facultyId ${faculty}` });
        }

        if (!mongoose.Types.ObjectId.isValid(major)) {
            return res.status(400).json({ error: `Invalid majorId ${major}` });
        }

        const newTopic = new Topic({
            topicName,
            description,
            students,
            faculty,
            major,
            createAt: new Date(),
        });

        const savedTopic = await newTopic.save();
        res.status(201).json(savedTopic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to get all topics
exports.getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find()
            .populate('lecture')
            .populate('students')
            .populate('faculty')
            .populate('major');
        res.status(200).json(topics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const submit = (payload, setinvalidFields) => {
    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, ...data } = payload
        const invalids = isRegister ? validate(payload, setinvalidFields) : validate(data, setinvalidFields)
        if (invalids === 0) {
          if (isRegister) {
            const response = await apiRegister(payload)
            if (response.success) {
              setisVerifiedEmail(true)
            } else {
              Swal.fire('Oops!', response.mes, 'error')
            }
          } else {
            const rs = await apiLogin(data)
            if (rs.success) {
              dispatch(login({ isLoggedIn: true, token: rs.accessToken, userData: rs.userData }))
              navigate(`/${path.HOME}`)
            } else {
              Swal.fire('Oops!', rs.mes, 'error')
            }
          }
        }
    }
}