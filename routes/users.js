const router = require('express').Router();
let User = require('../models/user.model');
let Exercise = require('../models/exercise.model');
const { verify } = require('../auth');

router.route('/').get(async (req, res) => {
  try {
    let users = await User.find();
    users = await Promise.all(users.map((user) => user.toClient()));
    res.json({ users });
  } catch (error) {
    console.log(error);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      user = await user.toClient();
      return res.json(user);
    } else {
      return res.status(404).json({ error: { message: 'User not found', code: 404 } });
    }
  } catch (error) {
    console.log(error);
  }
});

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid Credentials', //  No account with this email has been found
      });
    } else {
      const isAuthenticated = await user.isValidPassword(password);
      if (!isAuthenticated) {
        return res.status(401).json({
          error: 'Invalid Credentials: Email and password are not correct',
        });
      }
      const userData = await user.toAuthJSON();
      return res.json(userData);
    }
  } catch (error) {
    console.log(error);
  }
});

router.route('/register').post(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.find({ email });

    if (userExists.length) {
      return res.status(409).json({ error: 'Email has already been taken' });
    }
    const newUser = new User({ username, email });
    await newUser.setPassword(password);
    newUser.save();
    const userData = await newUser.toAuthJSON();
    return res.json(userData);
  } catch (error) {
    console.log(error);
  }
});

router.route('/verify').post(async (req, res) => {
  try {
    const tokenData = await verify(req.body.token);
    if (tokenData) {
      const user = await User.findById(tokenData.id);
      if (user) {
        const userData = await user.toClient();
        return res.json(userData);
      } else {
        return res.status(401).json({ errror: { message: 'Unauthorized', code: 401 } }); // 401 // Unauthorized
      }
    } else {
      return res.status(401).json({ errror: { message: 'Unauthorized', code: 401 } });
    }
  } catch (error) {
    console.log(error);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    if (user) {
      await Exercise.deleteMany({ userId: id });
      user = await User.findByIdAndDelete(id);
      return res.status(204).json({ user }); // 204 : No Content
    }
    return res.status(404).json({ error: { message: 'User Not Found', code: 404 } });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
