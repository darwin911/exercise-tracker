const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    const isAuthenticated = await user.isValidPassword(password);
    if (isAuthenticated) {
      const userData = await user.toJSON();
      return res.json(userData);
    }
    res.status(401).json({ error: 'Invalid Credentials' });
  }
});

router.route('/register').post(async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({ username, email });
  await newUser.setPassword(password);

  const userData = await newUser.toJSON();
  newUser
    .save()
    .then(() => res.json(userData))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
