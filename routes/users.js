const router = require('express').Router();
let User = require('../models/user.model');
const { hash, compare } = require('../auth');

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
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({ email }).select('+passwordDigest');

  if (user) {
    const isAuthenticated = await compare(password, user.passwordDigest);

    if (isAuthenticated) {
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email
      };
      res.json(userData);
    } else {
      console.log('invalid credentials');
      res.status(401).json({ error: 'Invalid Credentials' });
    }
  } else {
    res.status(401).json({ error: 'Invalid Credentials' });
  }
});

router.route('/register').post(async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({ username, email });
  await newUser.setPassword(password);

  newUser
    .save()
    .then(() => res.json('User registered!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
