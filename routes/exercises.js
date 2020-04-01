const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// Get all Exercises from a User
router.route('/:userId').get(async (req, res) => {
  try {
    let exercises = await Exercise.find({ userId: req.params.userId }).sort({
      date: 'descending',
    });
    exercises = await Promise.all(exercises.map(exercise => exercise.toClient()));
    res.json({ exercises });
  } catch (error) {
    console.log(error);
  }
});

// Add Exercise
router.route('/add').post(async (req, res) => {
  try {
    // Required Properties

    const exerciseObj = {
      date: req.body.date,
      type: req.body.type,
      userId: req.body.userId,
    };

    // Optional Properties

    if (req.body.duration) {
      exerciseObj.duration = Number(req.body.duration); // min from midnight 00:00
    }

    if (req.body.note) {
      exerciseObj.note = req.body.note;
    }

    if (req.body.repetitions) {
      exerciseObj.repetitions = Number(req.body.repetitions);
    }

    if (req.body.time) {
      exerciseObj.time = Number(req.body.time.replace(/:/, '')); // min from midnight 00:00
    }

    if (req.body.distance > 0) {
      exerciseObj.distance = Number(req.body.distance);
    }

    const exercise = new Exercise(exerciseObj);
    exercise.setActivityType(exerciseObj.type).save();

    const exerciseData = await exercise.toClient();

    return res.json(exerciseData);
  } catch (error) {
    console.log(error);
  }
});

// Find One Exercise by Id
// =======================
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Exercise
// ===============
router.route('/:id').delete((req, res) => {
  try {
    Exercise.findByIdAndDelete(req.params.id)
      .then(exercise => res.json(`Exercise ${exercise.id} deleted.`))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (error) {
    console.log(error);
  }
});

// Update Exercise
// ===============
router.route('/update/:id').put(async (req, res) => {
  try {
    const { duration, note, date, distance, time, repetitions } = req.body;
    let exerciseObj = {
      duration,
      note,
      date,
      distance,
      repetitions,
    };
    if (time) {
      exerciseObj.time = Number(time.replace(/:/, '')); // min from midnight 00:00
    }
    let exercise = await Exercise.findByIdAndUpdate(req.params.id, exerciseObj, {
      new: true,
    });
    const exerciseData = await exercise.toClient();
    return res.json(exerciseData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
