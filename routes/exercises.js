const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// Get All User Exercises
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
    const exerciseObj = {
      userId: req.body.userId,
      type: req.body.type,
      duration: Number(req.body.duration),
      date: Date.parse(req.body.date),
      note: req.body.note,
    };
    if (req.body.distance > 0) {
      exerciseObj.distance = Number(req.body.distance);
    }
    const exercise = new Exercise(exerciseObj);
    exercise.save();
    const exerciseData = await exercise.toClient();
    return res.json(exerciseData);
  } catch (error) {
    console.log(error);
  }
});

// Find One Exercise by Id
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Exercise
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
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.note = req.body.note;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(exercise => res.json(`Exercise ${exercise.id} updated!`))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
