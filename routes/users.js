const router = require('express').Router();
let User = require('../models/user.model');
const { verify } = require('../auth');

router.route('/').get(async (req, res) => {
  try {
    let users = await User.find();
    users = await Promise.all(users.map(user => user.toClient()));
    res.json({ users });
  } catch (error) {
    console.log(error);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    user = await user.toClient();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      const isAuthenticated = await user.isValidPassword(password);
      if (isAuthenticated) {
        const userData = await user.toAuthJSON();
        return res.json(userData);
      }
      res.status(401).json({ error: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.route('/register').post(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email });
    await newUser.setPassword(password);

    const userData = await newUser.toAuthJSON();
    await newUser.save();
    return res.json(userData);
  } catch (error) {
    console.log(error);
  }
});

router.route('/verify').post(async (req, res) => {
  try {
    const { id } = await verify(req.body.token);
    const user = await User.findById(id);
    const userData = await user.toProfileJSON();
    res.json(userData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
