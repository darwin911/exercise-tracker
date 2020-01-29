const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// Find All Exercises
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add Exercise
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const note = req.body.note;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, note, duration, date });

  newExercise
    .save()
    .then(() => res.json('Exercise addeed!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Find One Exercise by Id
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Exercise
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json(`Exercise ${exercise.id} deleted.`))
    .catch(err => res.status(400).json('Error: ' + err));
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
